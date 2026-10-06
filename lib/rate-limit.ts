import { NextRequest } from 'next/server';
import { connectDB } from './mongodb';
import { RateLimit } from './models';

const MAX_PER_MINUTE = 10;
const MAX_PER_DAY = 50;

const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

export interface RateLimitResult {
  allowed: boolean;
  reason?: string;
  retryAfterSeconds?: number;
  remainingMinute: number;
  remainingDay: number;
}

/**
 * IP du client. Sur Vercel, `request.ip` et `x-real-ip` sont fixés par le proxy
 * et ne peuvent pas être forgés par le client.
 */
export function getClientIp(request: NextRequest): string {
  return (
    request.ip ||
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    'unknown'
  );
}

/**
 * Incrémente le compteur d'une fenêtre fixe et renvoie sa nouvelle valeur.
 * Stocké en base pour être partagé entre toutes les instances serverless.
 */
async function hit(key: string, windowMs: number): Promise<{ count: number; resetTime: number }> {
  const windowStart = Math.floor(Date.now() / windowMs) * windowMs;
  const resetTime = windowStart + windowMs;
  const update = {
    $inc: { count: 1 },
    $setOnInsert: { expiresAt: new Date(resetTime) },
  };
  const options = { upsert: true, new: true };
  const bucketKey = `${key}:${windowStart}`;

  try {
    const entry = await RateLimit.findOneAndUpdate({ key: bucketKey }, update, options);
    return { count: entry.count, resetTime };
  } catch (error: any) {
    // Deux upserts simultanés sur une nouvelle clé : le second échoue, on réessaie une fois
    if (error?.code !== 11000) throw error;
    const entry = await RateLimit.findOneAndUpdate({ key: bucketKey }, update, options);
    return { count: entry.count, resetTime };
  }
}

export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  await connectDB();

  const [minute, day] = await Promise.all([
    hit(`chat:m:${ip}`, 60 * 1000),
    hit(`chat:d:${ip}`, 24 * 60 * 60 * 1000),
  ]);

  const remainingMinute = Math.max(0, MAX_PER_MINUTE - minute.count);
  const remainingDay = Math.max(0, MAX_PER_DAY - day.count);

  if (day.count > MAX_PER_DAY) {
    return {
      allowed: false,
      reason: 'Limite journalière atteinte. Revenez demain !',
      remainingMinute,
      remainingDay: 0,
    };
  }

  if (minute.count > MAX_PER_MINUTE) {
    const retryAfterSeconds = Math.max(1, Math.ceil((minute.resetTime - Date.now()) / 1000));
    return {
      allowed: false,
      reason: `Trop de requêtes. Réessayez dans ${retryAfterSeconds} secondes.`,
      retryAfterSeconds,
      remainingMinute: 0,
      remainingDay,
    };
  }

  return { allowed: true, remainingMinute, remainingDay };
}

export async function checkLoginRateLimit(ip: string): Promise<{ allowed: boolean; retryAfterSeconds?: number }> {
  await connectDB();

  const { count, resetTime } = await hit(`login:${ip}`, LOGIN_WINDOW_MS);
  if (count > LOGIN_MAX_ATTEMPTS) {
    return { allowed: false, retryAfterSeconds: Math.ceil((resetTime - Date.now()) / 1000) };
  }
  return { allowed: true };
}
