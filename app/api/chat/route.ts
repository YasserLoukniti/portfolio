import { NextRequest } from 'next/server';
import { isValidObjectId } from 'mongoose';
import { connectDB } from '@/lib/mongodb';
import { ChatSession, ChatMessage, TokenUsage, ProviderError, getSettings } from '@/lib/models';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { generateChatResponse } from '@/lib/chat-service';
import { handleCors, jsonResponse, errorResponse } from '@/lib/cors';
import { getTodayParis } from '@/lib/providers/quota';
import { getGeoFromIP, parseUserAgent } from '@/lib/geo';
import { sendChatNotification } from '@/lib/email';

const MAX_MESSAGE_LENGTH = 1000;
const HISTORY_SIZE = 6;

export async function OPTIONS(request: NextRequest) {
  return handleCors(request) || jsonResponse({});
}

export async function POST(request: NextRequest) {
  const corsResponse = handleCors(request);
  if (corsResponse) return corsResponse;

  try {
    const ip = getClientIp(request);

    // Check rate limit
    const rateLimitResult = await checkRateLimit(ip);
    if (!rateLimitResult.allowed) {
      return jsonResponse({
        error: rateLimitResult.reason,
        retryAfterSeconds: rateLimitResult.retryAfterSeconds,
      }, 429);
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return errorResponse('Invalid JSON body');
    }
    const { message, sessionId } = body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return errorResponse('Message is required');
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return errorResponse(`Message trop long (${MAX_MESSAGE_LENGTH} caractères maximum)`);
    }

    await connectDB();

    // Get settings for provider configuration
    const settings = await getSettings();

    // Get or create session
    let session;
    if (sessionId && isValidObjectId(sessionId)) {
      session = await ChatSession.findById(sessionId);
    }

    const userAgent = request.headers.get('user-agent') || undefined;

    const isNewSession = !session;

    if (!session) {
      // Get geo info and parse user agent for new sessions
      const [geoInfo, uaInfo] = await Promise.all([
        getGeoFromIP(ip),
        Promise.resolve(parseUserAgent(userAgent)),
      ]);

      session = await ChatSession.create({
        ip,
        userAgent,
        country: geoInfo?.country,
        countryCode: geoInfo?.countryCode,
        city: geoInfo?.city,
        region: geoInfo?.region,
        device: uaInfo.device,
        browser: uaInfo.browser,
      });

      // Envoyer notification email (fire and forget)
      sendChatNotification({
        sessionId: session._id.toString(),
        message,
        userAgent,
        ip,
        location: {
          city: geoInfo?.city,
          country: geoInfo?.country,
        },
      }).catch((err) => console.error('[Email] Notification error:', err));
    } else {
      session.lastActivity = new Date();
      await session.save();
    }

    // Historique : les 6 derniers messages, remis dans l'ordre chronologique
    const previousMessages = (
      await ChatMessage.find({ sessionId: session._id.toString() })
        .sort({ createdAt: -1 })
        .limit(HISTORY_SIZE)
    ).reverse();

    const conversationHistory = previousMessages.map((msg) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }));

    // Generate response with provider and fallback
    const { response, tokensIn, tokensOut, provider, errors } = await generateChatResponse(
      message,
      conversationHistory,
      settings.activeProvider,
      settings.fallbackOrder
    );

    // Log provider errors if any fallback happened
    if (errors.length > 0) {
      await Promise.all(
        errors.map((err) =>
          ProviderError.create({
            provider: err.provider,
            errorType: err.errorType,
            errorMessage: err.error,
            fallbackUsed: provider,
          })
        )
      );
    }

    // Save messages
    await ChatMessage.create({
      sessionId: session._id.toString(),
      role: 'user',
      content: message,
      tokensIn: 0,
      tokensOut: 0,
    });

    await ChatMessage.create({
      sessionId: session._id.toString(),
      role: 'assistant',
      content: response,
      tokensIn,
      tokensOut,
      provider,
    });

    // Update token usage for today with provider tracking (Paris timezone)
    const today = getTodayParis();

    await TokenUsage.findOneAndUpdate(
      { date: today, provider },
      {
        $inc: { tokensIn, tokensOut, requests: 1 },
      },
      { upsert: true }
    );

    return jsonResponse({
      message: response,
      sessionId: session._id.toString(),
      provider,
    });
  } catch (error) {
    console.error('Chat error:', error);
    return errorResponse('Une erreur est survenue', 500);
  }
}
