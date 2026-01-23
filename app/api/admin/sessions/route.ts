import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { ChatSession, ChatMessage } from '@/lib/models';
import { validateAuth } from '@/lib/protected-route';
import { handleCors, jsonResponse } from '@/lib/cors';

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

    const sessions = await ChatSession.find()
      .sort({ lastActivity: -1 })
      .limit(20)
      .lean();

    // Get message counts for each session
    const sessionsWithCounts = await Promise.all(
      sessions.map(async (session: any) => {
        const sessionIdStr = session._id.toString();
        const messageCount = await ChatMessage.countDocuments({
          sessionId: sessionIdStr,
        });
        return {
          ...session,
          messageCount,
        };
      })
    );

    return jsonResponse(sessionsWithCounts);
  } catch (error) {
    console.error('Sessions error:', error);
    return jsonResponse({ error: 'Une erreur est survenue' }, 500);
  }
}
