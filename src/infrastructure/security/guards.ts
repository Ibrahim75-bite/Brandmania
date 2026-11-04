
import crypto from 'crypto';

export function verifyCsrfOrigin(
  origin: string | null,
  referer: string | null,
  allowedOrigins: string[] = []
): boolean {
  const allowed = new Set(
    [
      process.env.APP_URL,
      process.env.NEXT_PUBLIC_APP_URL,
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      ...allowedOrigins,
    ]
      .filter(Boolean)
      .map((url) => {
        try {
          return new URL(url as string).origin.toLowerCase();
        } catch {
          return (url as string).toLowerCase();
        }
      })
  );

  const headerSource = origin || referer;
  if (!headerSource) {
    return process.env.NODE_ENV !== 'production';
  }

  try {
    const sourceOrigin = new URL(headerSource).origin.toLowerCase();
    return allowed.has(sourceOrigin);
  } catch {
    return false;
  }
}

export function verifyJsonContentType(contentType: string | null): boolean {
  if (!contentType) return false;
  const normalized = contentType.toLowerCase().split(';')[0].trim();
  return normalized === 'application/json';
}

export function verifyResourceAccess(
  actorId: string,
  resourceOwnerId: string,
  role?: string
): boolean {
  if (!actorId || !resourceOwnerId) return false;

  if (role === 'service_role' || role === 'admin' || role === 'system') {
    return true;
  }

  return actorId.trim() === resourceOwnerId.trim();
}

export interface SessionClaims {
  sub: string;
  role: string;
  [key: string]: unknown;
}

export interface SessionPayload extends SessionClaims {
  iat: number;
  exp: number;
}

export function createSessionToken(
  claims: SessionClaims,
  secret: string,
  expiresInSeconds: number = 3600
): string {
  const now = Math.floor(Date.now() / 1000);
  const fullPayload: SessionPayload = {
    ...claims,
    sub: claims.sub,
    role: claims.role,
    iat: now,
    exp: now + expiresInSeconds,
  };

  const encodedHeader = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const encodedPayload = Buffer.from(JSON.stringify(fullPayload)).toString('base64url');
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;

  const signature = crypto
    .createHmac('sha256', secret)
    .update(unsignedToken)
    .digest('base64url');

  return `${unsignedToken}.${signature}`;
}

export function verifySessionToken<T = SessionPayload>(
  token: string,
  secret: string
): { valid: boolean; payload?: T; error?: string } {
  if (!token || typeof token !== 'string') {
    return { valid: false, error: 'TOKEN_MISSING' };
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return { valid: false, error: 'TOKEN_MALFORMED' };
  }

  const [encodedHeader, encodedPayload, signature] = parts;
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(unsignedToken)
    .digest('base64url');

  const sigBuffer = Buffer.from(signature);
  const expectedSigBuffer = Buffer.from(expectedSignature);

  if (sigBuffer.length !== expectedSigBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedSigBuffer)) {
    return { valid: false, error: 'INVALID_SIGNATURE' };
  }

  let payload: SessionPayload;
  try {
    payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf-8'));
  } catch {
    return { valid: false, error: 'PAYLOAD_CORRUPT' };
  }

  const now = Math.floor(Date.now() / 1000);

  if (payload.iat && payload.iat > now + 60) {
    return { valid: false, error: 'TOKEN_ISSUED_IN_FUTURE' };
  }

  if (payload.exp && payload.exp <= now) {
    return { valid: false, error: 'SESSION_EXPIRED' };
  }

  return { valid: true, payload: payload as unknown as T };
}
