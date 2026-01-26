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

    const { searchParams } = new URL(request.url);
    const includeArchived = searchParams.get('archived') === 'true';

    const filter = includeArchived ? {} : { archived: { $ne: true } };

    const sessions = await ChatSession.find(filter)
      .sort({ lastActivity: -1 })
      .limit(50)
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

    // Count new (unviewed) sessions
    const newCount = sessionsWithCounts.filter((s: any) => !s.viewed).length;

    return jsonResponse({ sessions: sessionsWithCounts, newCount });
  } catch (error) {
    console.error('Sessions error:', error);
    return jsonResponse({ error: 'Une erreur est survenue' }, 500);
  }
}

export async function PATCH(request: NextRequest) {
  const corsResponse = handleCors(request);
  if (corsResponse) return corsResponse;

  const { error } = validateAuth(request);
  if (error) return error;

  try {
    await connectDB();

    const body = await request.json();
    const { sessionIds, action } = body;

    if (!action) {
      return jsonResponse({ error: 'action requise' }, 400);
    }

    // Actions globales (pas besoin de sessionIds)
    if (action === 'markAllViewed') {
      // $ne: true inclut les sessions avec viewed: false ET celles sans le champ viewed
      await ChatSession.updateMany({ viewed: { $ne: true } }, { viewed: true });
      return jsonResponse({ success: true, message: 'Toutes les sessions marquées comme vues' });
    }

    // Actions sur des sessions spécifiques
    if (!sessionIds || !Array.isArray(sessionIds) || sessionIds.length === 0) {
      return jsonResponse({ error: 'sessionIds requis' }, 400);
    }

    let update = {};
    if (action === 'archive') {
      update = { archived: true };
    } else if (action === 'unarchive') {
      update = { archived: false };
    } else if (action === 'markViewed') {
      update = { viewed: true };
    } else {
      return jsonResponse({ error: 'Action invalide' }, 400);
    }

    await ChatSession.updateMany(
      { _id: { $in: sessionIds } },
      update
    );

    return jsonResponse({ success: true });
  } catch (error) {
    console.error('Sessions update error:', error);
    return jsonResponse({ error: 'Une erreur est survenue' }, 500);
  }
}
