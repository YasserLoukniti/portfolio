import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { ProviderError } from '@/lib/models';
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

    // Get last 50 errors
    const errors = await ProviderError.find()
      .sort({ createdAt: -1 })
      .limit(50);

    // Get error stats by provider and type
    const stats = await ProviderError.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // Last 24h
        },
      },
      {
        $group: {
          _id: { provider: '$provider', errorType: '$errorType' },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: '$_id.provider',
          errors: {
            $push: {
              type: '$_id.errorType',
              count: '$count',
            },
          },
          total: { $sum: '$count' },
        },
      },
    ]);

    return jsonResponse({
      errors,
      stats,
    });
  } catch (error) {
    console.error('Provider errors GET error:', error);
    return jsonResponse({ error: 'Une erreur est survenue' }, 500);
  }
}
