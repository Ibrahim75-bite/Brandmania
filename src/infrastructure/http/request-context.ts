import { NextRequest } from 'next/server';

export interface RequestContext {
  requestId: string;
  clientIp: string;
  userAgent: string;
}

export function extractRequestContext(req: NextRequest): RequestContext {
  const requestId =
    req.headers.get('x-request-id') ||
    `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  const clientIp =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    '127.0.0.1';

  const userAgent = req.headers.get('user-agent') || 'unknown';

  return {
    requestId,
    clientIp,
    userAgent,
  };
}
