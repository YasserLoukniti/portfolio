import { NextRequest } from 'next/server';
import { validateAdmin, signToken } from '@/lib/auth';
import { handleCors, jsonResponse, errorResponse } from '@/lib/cors';

export async function OPTIONS(request: NextRequest) {
  return handleCors(request) || jsonResponse({});
}

export async function POST(request: NextRequest) {
  const corsResponse = handleCors(request);
  if (corsResponse) return corsResponse;

  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
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
