import { NextResponse } from 'next/server';

export function corsHeaders() {
  const origins = process.env.CORS_ORIGINS?.split(',').map((o) => o.trim()) || ['http://localhost:3000'];

  return {
    'Access-Control-Allow-Origin': origins[0],
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };
}

export function handleCors(request: Request) {
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers: corsHeaders() });
  }
  return null;
}

export function jsonResponse(data: any, status = 200) {
  return NextResponse.json(data, { status, headers: corsHeaders() });
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status, headers: corsHeaders() });
}
