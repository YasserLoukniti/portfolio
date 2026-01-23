import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { ChatSession } from '@/lib/models';
import { validateAuth } from '@/lib/protected-route';
import { handleCors, jsonResponse } from '@/lib/cors';
import { getGeoFromIP, parseUserAgent } from '@/lib/geo';

export async function OPTIONS(request: NextRequest) {
  return handleCors(request) || jsonResponse({});
}

// POST: Enrich sessions that are missing geo data
export async function POST(request: NextRequest) {
  const corsResponse = handleCors(request);
  if (corsResponse) return corsResponse;

  const { error } = validateAuth(request);
  if (error) return error;

  try {
    await connectDB();

    // Find sessions missing geo data
    const sessionsToEnrich = await ChatSession.find({
      $or: [
        { country: { $exists: false } },
        { country: null },
        { country: '' },
      ],
    }).limit(50); // Limit to avoid rate limiting from ip-api

    let enriched = 0;
    let failed = 0;

    for (const session of sessionsToEnrich) {
      try {
        // Get geo info
        const geoInfo = await getGeoFromIP(session.ip);
        const uaInfo = parseUserAgent(session.userAgent);

        // Update session
        await ChatSession.updateOne(
          { _id: session._id },
          {
            $set: {
              country: geoInfo?.country || 'Unknown',
              countryCode: geoInfo?.countryCode || '??',
              city: geoInfo?.city || 'Unknown',
              region: geoInfo?.region || '',
              device: uaInfo.device,
              browser: uaInfo.browser,
            },
          }
        );

        enriched++;

        // Small delay to respect ip-api rate limits (45 req/min)
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } catch (err) {
        console.error(`Failed to enrich session ${session._id}:`, err);
        failed++;
      }
    }

    const remaining = await ChatSession.countDocuments({
      $or: [
        { country: { $exists: false } },
        { country: null },
        { country: '' },
      ],
    });

    return jsonResponse({
      success: true,
      enriched,
      failed,
      remaining,
      message: `${enriched} sessions enrichies, ${remaining} restantes`,
    });
  } catch (error) {
    console.error('Enrich sessions error:', error);
    return jsonResponse({ error: 'Une erreur est survenue' }, 500);
  }
}
