import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyCsrfOrigin } from './infrastructure/security/guards';
import {
  isAllowedHost,
  isValidSlug,
  ALLOWED_HOSTS,
} from './infrastructure/security/vibeShield';

export function middleware(request: NextRequest) {
  const proto = request.headers.get('x-forwarded-proto');
  const host = request.headers.get('host') || '';
  const hostname = host.split(':')[0].toLowerCase();
  const pathname = request.nextUrl.pathname;

  if (
    process.env.NODE_ENV === 'production' &&
    hostname.endsWith('.vercel.app')
  ) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return response;
  }

  if (
    proto === 'http' &&
    !hostname.startsWith('localhost') &&
    !hostname.startsWith('127.0.0.1')
  ) {
    if (!isAllowedHost(host)) {
      return new NextResponse(null, { status: 400 });
    }
    const httpsUrl = new URL(request.url);
    httpsUrl.protocol = 'https:';
    return NextResponse.redirect(httpsUrl, 301);
  }

  const sensitivePathRegex = /^\/(\.git|\.env|\.agents|\.next\/server|supabase|docker|package\.json|tsconfig\.json)/i;
  if (
    sensitivePathRegex.test(pathname) ||
    (process.env.NODE_ENV === 'production' && pathname.endsWith('.map'))
  ) {
    return new NextResponse(null, { status: 404 });
  }

  if (request.headers.get('x-middleware-subrequest')) {
    return new NextResponse(null, { status: 403 });
  }

  const isApiRoute = pathname.startsWith('/api/');
  const isStateChanging = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method);
  const isWebhook = pathname.startsWith('/api/v1/webhooks');

  if (isApiRoute && isStateChanging && !isWebhook) {
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');

    const isValidCsrf = verifyCsrfOrigin(origin, referer);
    if (!isValidCsrf) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'CSRF_REJECTED',
            message: 'Cross-origin state-changing requests are strictly forbidden.',
          },
        },
        { status: 403 },
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [

    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)',
  ],
};
