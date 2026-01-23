import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Settings, getSettings } from '@/lib/models';
import { validateAuth } from '@/lib/protected-route';
import { handleCors, jsonResponse } from '@/lib/cors';
import { PROVIDER_CONFIGS, getAvailableProviders, getAllProvidersQuota, ProviderName } from '@/lib/providers';

export async function OPTIONS(request: NextRequest) {
  return handleCors(request) || jsonResponse({});
}

// GET: Return active provider and list of available providers with quota
export async function GET(request: NextRequest) {
  const corsResponse = handleCors(request);
  if (corsResponse) return corsResponse;

  const { error } = validateAuth(request);
  if (error) return error;

  try {
    await connectDB();

    const settings = await getSettings();
    const availableProviders = getAvailableProviders();

    // Get quota status for all available providers
    const quotaStatuses = await getAllProvidersQuota(availableProviders);

    const providers = Object.values(PROVIDER_CONFIGS).map((config) => {
      const quota = quotaStatuses[config.name];
      return {
        name: config.name,
        displayName: config.displayName,
        model: config.model,
        description: config.description,
        limits: config.limits,
        available: availableProviders.includes(config.name),
        quota: quota ? {
          requestsUsed: quota.requestsUsed,
          tokensUsed: quota.tokensUsed,
          requestsLimit: quota.requestsLimit,
          tokensLimit: quota.tokensLimit,
          percentRequests: quota.percentRequests,
          percentTokens: quota.percentTokens,
          hasQuota: quota.available,
        } : null,
      };
    });

    return jsonResponse({
      activeProvider: settings.activeProvider,
      fallbackOrder: settings.fallbackOrder,
      providers,
    });
  } catch (error) {
    console.error('Provider GET error:', error);
    return jsonResponse({ error: 'Une erreur est survenue' }, 500);
  }
}

// POST: Change active provider
export async function POST(request: NextRequest) {
  const corsResponse = handleCors(request);
  if (corsResponse) return corsResponse;

  const { error } = validateAuth(request);
  if (error) return error;

  try {
    const body = await request.json();
    const { activeProvider, fallbackOrder } = body;

    await connectDB();

    const settings = await getSettings();
    const availableProviders = getAvailableProviders();

    // Validate active provider
    if (activeProvider) {
      if (!PROVIDER_CONFIGS[activeProvider as ProviderName]) {
        return jsonResponse({ error: `Provider inconnu: ${activeProvider}` }, 400);
      }
      if (!availableProviders.includes(activeProvider as ProviderName)) {
        return jsonResponse({ error: `Provider non configure: ${activeProvider}` }, 400);
      }
      settings.activeProvider = activeProvider;
    }

    // Validate fallback order
    if (fallbackOrder && Array.isArray(fallbackOrder)) {
      const validOrder = fallbackOrder.filter(
        (p: string) => PROVIDER_CONFIGS[p as ProviderName]
      ) as ProviderName[];
      settings.fallbackOrder = validOrder;
    }

    await settings.save();

    return jsonResponse({
      success: true,
      activeProvider: settings.activeProvider,
      fallbackOrder: settings.fallbackOrder,
    });
  } catch (error) {
    console.error('Provider POST error:', error);
    return jsonResponse({ error: 'Une erreur est survenue' }, 500);
  }
}
