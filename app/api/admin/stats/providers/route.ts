import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { TokenUsage } from '@/lib/models';
import { validateAuth } from '@/lib/protected-route';
import { handleCors, jsonResponse } from '@/lib/cors';
import { PROVIDER_CONFIGS, ProviderName } from '@/lib/providers';
import { getTodayParis } from '@/lib/providers/quota';

export async function OPTIONS(request: NextRequest) {
  return handleCors(request) || jsonResponse({});
}

// GET: Return stats per provider
export async function GET(request: NextRequest) {
  const corsResponse = handleCors(request);
  if (corsResponse) return corsResponse;

  const { error } = validateAuth(request);
  if (error) return error;

  try {
    await connectDB();

    const today = getTodayParis();

    // Get today's usage per provider
    const todayUsage = await TokenUsage.find({ date: { $gte: today } });

    // Get last 7 days usage per provider
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const last7DaysUsage = await TokenUsage.find({ date: { $gte: sevenDaysAgo } }).sort({ date: -1 });

    // Aggregate stats by provider
    const providerStats: Record<string, {
      provider: string;
      displayName: string;
      todayRequests: number;
      todayTokensIn: number;
      todayTokensOut: number;
      weekRequests: number;
      weekTokensIn: number;
      weekTokensOut: number;
    }> = {};

    // Initialize all providers
    for (const name of Object.keys(PROVIDER_CONFIGS) as ProviderName[]) {
      providerStats[name] = {
        provider: name,
        displayName: PROVIDER_CONFIGS[name].displayName,
        todayRequests: 0,
        todayTokensIn: 0,
        todayTokensOut: 0,
        weekRequests: 0,
        weekTokensIn: 0,
        weekTokensOut: 0,
      };
    }

    // Fill today's stats
    for (const usage of todayUsage) {
      const provider = usage.provider || 'gemini';
      if (providerStats[provider]) {
        providerStats[provider].todayRequests += usage.requests;
        providerStats[provider].todayTokensIn += usage.tokensIn;
        providerStats[provider].todayTokensOut += usage.tokensOut;
      }
    }

    // Fill weekly stats
    for (const usage of last7DaysUsage) {
      const provider = usage.provider || 'gemini';
      if (providerStats[provider]) {
        providerStats[provider].weekRequests += usage.requests;
        providerStats[provider].weekTokensIn += usage.tokensIn;
        providerStats[provider].weekTokensOut += usage.tokensOut;
      }
    }

    return jsonResponse({
      providers: Object.values(providerStats),
      todayUsage,
      last7DaysUsage,
    });
  } catch (error) {
    console.error('Provider stats error:', error);
    return jsonResponse({ error: 'Une erreur est survenue' }, 500);
  }
}
