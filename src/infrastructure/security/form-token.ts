import { env } from '../config/env';

const SECRET_SALT = env.API_SECRET_KEY;

export async function generateFormToken(timestamp: number = Date.now()): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(`${timestamp}:${SECRET_SALT}`);
  const buf = await globalThis.crypto.subtle.digest('SHA-256', data);
  const sig = Array.from(new Uint8Array(buf))
    .slice(0, 16)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return `${timestamp}.${sig}`;
}

export async function verifyFormToken(token?: string | null): Promise<{
  valid: boolean;
  issuedAt?: number;
  elapsedMs?: number;
}> {
  if (!token || typeof token !== 'string') {
    return { valid: false };
  }
  const parts = token.split('.');
  if (parts.length !== 2) {
    return { valid: false };
  }
  const timestamp = parseInt(parts[0], 10);
  if (Number.isNaN(timestamp) || timestamp <= 0) {
    return { valid: false };
  }
  const expectedToken = await generateFormToken(timestamp);
  if (expectedToken !== token) {
    return { valid: false };
  }
  const now = Date.now();
  const elapsedMs = now - timestamp;
  return {
    valid: true,
    issuedAt: timestamp,
    elapsedMs,
  };
}
