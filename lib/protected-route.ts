import { NextRequest } from 'next/server';
import { verifyToken } from './auth';
import { errorResponse } from './cors';

export function getAuthToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.slice(7);
}

export function validateAuth(request: NextRequest) {
  const token = getAuthToken(request);
  if (!token) {
    return { error: errorResponse('Unauthorized', 401), payload: null };
  }

  const payload = verifyToken(token);
  if (!payload) {
    return { error: errorResponse('Invalid token', 401), payload: null };
  }

  return { error: null, payload };
}
