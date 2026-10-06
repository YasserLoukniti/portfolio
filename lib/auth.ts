import jwt from 'jsonwebtoken';
import { createHash, timingSafeEqual } from 'crypto';

export interface JWTPayload {
  sub: string;
  username: string;
}

/**
 * Lit une variable d'environnement obligatoire. Pas de valeur par défaut :
 * mieux vaut échouer que tourner avec un secret connu de tous.
 */
function requireEnv(name: 'JWT_SECRET' | 'ADMIN_USER' | 'ADMIN_PASSWORD'): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`La variable d'environnement ${name} doit être définie`);
  }
  return value;
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, requireEnv('JWT_SECRET'), { expiresIn: '24h' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, requireEnv('JWT_SECRET')) as JWTPayload;
  } catch {
    return null;
  }
}

// Comparaison en temps constant (les hash ont toujours la même longueur)
function safeEqual(a: string, b: string): boolean {
  const hashA = createHash('sha256').update(a).digest();
  const hashB = createHash('sha256').update(b).digest();
  return timingSafeEqual(hashA, hashB);
}

export function validateAdmin(username: string, password: string): boolean {
  const userOk = safeEqual(username, requireEnv('ADMIN_USER'));
  const passwordOk = safeEqual(password, requireEnv('ADMIN_PASSWORD'));
  return userOk && passwordOk;
}
