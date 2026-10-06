import { NextRequest } from 'next/server';
import { validateAdmin, signToken } from '@/lib/auth';
import { handleCors, jsonResponse, errorResponse } from '@/lib/cors';
import { checkLoginRateLimit, getClientIp } from '@/lib/rate-limit';

export async function OPTIONS(request: NextRequest) {
  return handleCors(request) || jsonResponse({});
}

export async function POST(request: NextRequest) {
  const corsResponse = handleCors(request);
  if (corsResponse) return corsResponse;

  try {
    // Protection contre le brute force : 5 tentatives par 15 minutes et par IP
    const rateLimit = await checkLoginRateLimit(getClientIp(request));
    if (!rateLimit.allowed) {
      return jsonResponse({
        error: 'Trop de tentatives. Réessayez plus tard.',
        retryAfterSeconds: rateLimit.retryAfterSeconds,
      }, 429);
    }

    const body = await request.json().catch(() => null);
    const { username, password } = body || {};

    if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
      return errorResponse('Username and password are required');
    }

    if (!validateAdmin(username, password)) {
      return errorResponse('Invalid credentials', 401);
    }

    const token = signToken({ sub: 'admin', username });

    return jsonResponse({ access_token: token });
  } catch (error) {
    console.error('Login error:', error);
    return errorResponse('Une erreur est survenue', 500);
  }
}
