import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { ChatMessage, ChatSession } from '@/lib/models';
import { validateAuth } from '@/lib/protected-route';
import { handleCors, jsonResponse } from '@/lib/cors';

export async function OPTIONS(request: NextRequest) {
  return handleCors(request) || jsonResponse({});
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const corsResponse = handleCors(request);
  if (corsResponse) return corsResponse;

  const { error } = validateAuth(request);
  if (error) return error;

  try {
    await connectDB();
    const { id } = await params;

    // Mark session as viewed
    await ChatSession.findByIdAndUpdate(id, { viewed: true });

    const messages = await ChatMessage.find({ sessionId: id })
      .sort({ createdAt: 1 })
      .lean();

    return jsonResponse(messages);
  } catch (error) {
    console.error('Messages error:', error);
    return jsonResponse({ error: 'Une erreur est survenue' }, 500);
  }
}
