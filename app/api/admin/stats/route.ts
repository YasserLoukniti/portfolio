import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { ChatSession, ChatMessage, TokenUsage } from '@/lib/models';
import { validateAuth } from '@/lib/protected-route';
import { handleCors, jsonResponse } from '@/lib/cors';
import { getTodayParis } from '@/lib/providers/quota';

export async function OPTIONS(request: NextRequest) {
  return handleCors(request) || jsonResponse({});
}

export async function GET(request: NextRequest) {
  const corsResponse = handleCors(request);
  if (corsResponse) return corsResponse;

  const { error } = validateAuth(request);
  if (error) return error;

  try {
    await connectDB();

    const today = getTodayParis();

    const [totalSessions, totalMessages, todayUsageRaw, last7DaysUsage] = await Promise.all([
      ChatSession.countDocuments(),
      ChatMessage.countDocuments(),
      TokenUsage.find({ date: { $gte: today } }),
      TokenUsage.find({
        date: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      }).sort({ date: -1 }),
    ]);

    // Aggregate today's usage across all providers
    const todayUsage = todayUsageRaw.reduce(
      (acc, usage) => ({
        tokensIn: acc.tokensIn + usage.tokensIn,
        tokensOut: acc.tokensOut + usage.tokensOut,
        requests: acc.requests + usage.requests,
      }),
      { tokensIn: 0, tokensOut: 0, requests: 0 }
    );

    return jsonResponse({
      totalSessions,
      totalMessages,
      todayUsage,
      last7DaysUsage,
    });
  } catch (error) {
    console.error('Stats error:', error);
    return jsonResponse({ error: 'Une erreur est survenue' }, 500);
  }
}
