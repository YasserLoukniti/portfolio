import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { ChatSession, ChatMessage, TokenUsage, getSettings } from '@/lib/models';
import { checkRateLimit } from '@/lib/rate-limit';
import { generateChatResponse } from '@/lib/chat-service';
import { handleCors, jsonResponse, errorResponse } from '@/lib/cors';

export async function OPTIONS(request: NextRequest) {
  return handleCors(request) || jsonResponse({});
}

export async function POST(request: NextRequest) {
  const corsResponse = handleCors(request);
  if (corsResponse) return corsResponse;

  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Check rate limit
    const rateLimitResult = checkRateLimit(ip);
    if (!rateLimitResult.allowed) {
      return jsonResponse({
        error: rateLimitResult.reason,
        retryAfterSeconds: rateLimitResult.retryAfterSeconds,
      }, 429);
    }

    const body = await request.json();
    const { message, sessionId } = body;

    if (!message || typeof message !== 'string') {
      return errorResponse('Message is required');
    }

    await connectDB();

    // Get settings for provider configuration
    const settings = await getSettings();

    // Get or create session
    let session;
    if (sessionId) {
      session = await ChatSession.findById(sessionId);
    }

    if (!session) {
      session = await ChatSession.create({
        ip,
        userAgent: request.headers.get('user-agent') || undefined,
      });
    } else {
      session.lastActivity = new Date();
      await session.save();
    }

    // Get conversation history (reduced to 6 messages for better performance)
    const previousMessages = await ChatMessage.find({ sessionId: session._id.toString() })
      .sort({ createdAt: 1 })
      .limit(6);

    const conversationHistory = previousMessages.map((msg) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }));

    // Generate response with provider and fallback
    const { response, tokensIn, tokensOut, provider } = await generateChatResponse(
      message,
      conversationHistory,
      settings.activeProvider,
      settings.fallbackOrder
    );

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

    // Update token usage for today with provider tracking
    const today = new Date();
    today.setHours(0, 0, 0, 0);

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
