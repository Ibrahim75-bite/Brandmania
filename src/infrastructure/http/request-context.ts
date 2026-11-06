import { NextRequest } from 'next/server';

export interface RequestContext {
  requestId: string;
  clientIp: string;
  userAgent: string;
}

function isTrustedProxy(): boolean {
  return process.env.VERCEL === '1' || process.env.TRUST_PROXY === 'true';
}

function extractClientIp(req: NextRequest): string {
  if (isTrustedProxy()) {
    const forwardedFor = req.headers.get('x-forwarded-for');
    if (forwardedFor) {
      const firstIp = forwardedFor.split(',')[0].trim();
      if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$|^[0-9a-fA-F:]+$/.test(firstIp)) {
        return firstIp;
      }
    }
    const realIp = req.headers.get('x-real-ip');
    if (realIp && /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$|^[0-9a-fA-F:]+$/.test(realIp.trim())) {
      return realIp.trim();
    }
    const vercelFor = req.headers.get('x-vercel-forwarded-for');
    if (vercelFor) {
      const firstIp = vercelFor.split(',')[0].trim();
      if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$|^[0-9a-fA-F:]+$/.test(firstIp)) {
        return firstIp;
      }
    }
  }
  return '127.0.0.1';
}

export function extractRequestContext(req: NextRequest): RequestContext {
  const requestId =
    req.headers.get('x-request-id') ||
    `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  const clientIp = extractClientIp(req);

  const userAgent = req.headers.get('user-agent') || 'unknown';

  return {
    requestId,
    clientIp,
    userAgent,
  };
}
