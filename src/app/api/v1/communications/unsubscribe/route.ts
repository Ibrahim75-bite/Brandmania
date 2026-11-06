import { NextRequest, NextResponse } from 'next/server';
import { extractRequestContext } from '@/infrastructure/http/request-context';
import { container } from '@/infrastructure/container';
import {
  verifyUnsubscribeToken,
  suppressEmail,
  extractEmailFromToken,
} from '@/infrastructure/email/email-templates';
import { enforceResponseFloor, uniformConfirmationResponse } from '@/infrastructure/security/vibeShield';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

async function parseEmailAndToken(
  req: NextRequest
): Promise<{ email: string | null; token: string | null }> {
  const { searchParams } = new URL(req.url);
  let email = searchParams.get('email');
  let token = searchParams.get('token');

  if (!email && token) {
    email = extractEmailFromToken(token);
  }

  if ((!email || !token) && req.method === 'POST') {
    const contentType = req.headers.get('content-type') || '';
    try {
      if (contentType.includes('application/json')) {
        const body = await req.json();
        email = email || body.email || (body.token ? extractEmailFromToken(body.token) : null);
        token = token || body.token;
      } else if (contentType.includes('application/x-www-form-urlencoded')) {
        const formData = await req.formData();
        email = email || (formData.get('email') as string | null) || (formData.get('token') ? extractEmailFromToken(formData.get('token') as string) : null);
        token = token || (formData.get('token') as string | null);
      }
    } catch {
    }
  }

  return { email, token };
}

async function handleUnsubscribe(
  req: NextRequest,
  email: string,
  token: string,
  ctx: Awaited<ReturnType<typeof extractRequestContext>>
) {
  await enforceResponseFloor();

  const isValid = verifyUnsubscribeToken(email, token);
  if (!isValid) {
    return NextResponse.json(
      uniformConfirmationResponse('Invalid or expired unsubscribe token.'),
      { status: 200 }
    );
  }

  suppressEmail(email);
  container.logger.audit('EMAIL_UNSUBSCRIBED', email, {
    clientIp: ctx.clientIp,
    requestId: ctx.requestId,
    method: req.method,
  });

  return NextResponse.json(
    {
      success: true,
      message: 'Successfully unsubscribed from executive communications.',
      deletionReceiptId: `del_${crypto.randomBytes(6).toString('hex')}_${Date.now().toString(36)}`,
    },
    { status: 200 }
  );
}

export async function GET(req: NextRequest) {
  const ctx = extractRequestContext(req);
  const { email, token } = await parseEmailAndToken(req);

  if (!email || !token) {
    return NextResponse.json(
      uniformConfirmationResponse('Email address and token are required.'),
      { status: 200 }
    );
  }

  const acceptHeader = req.headers.get('accept') || '';
  if (acceptHeader.includes('text/html')) {
    await enforceResponseFloor();

    const htmlResponse = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Unsubscribed — BRANDMANIA</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      background-color: #070709;
      color: #EAE6F0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 24px;
    }
    .card {
      border: 1px solid rgba(255, 255, 255, 0.12);
      background-color: rgba(255, 255, 255, 0.02);
      max-width: 500px;
      padding: 40px;
      text-align: center;
    }
    .badge {
      font-family: monospace;
      font-size: 11px;
      color: #C882FF;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 16px;
      display: inline-block;
    }
    h1 {
      font-size: 24px;
      margin: 0 0 16px;
      color: #FFFFFF;
      font-weight: 500;
    }
    p {
      color: #A8A0B8;
      font-size: 14px;
      line-height: 1.6;
      margin: 0 0 24px;
    }
    a {
      color: #FFFFFF;
      text-decoration: underline;
      font-size: 13px;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">RFC 8058 PROTOCOL</span>
    <h1>Unsubscribed Successfully</h1>
    <p>The address <strong>${email}</strong> has been removed from executive briefings and communications.</p>
    <a href="/">← Return to BRANDMANIA</a>
  </div>
</body>
</html>
    `.trim();

    return new Response(htmlResponse, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  return handleUnsubscribe(req, email, token, ctx);
}

export async function POST(req: NextRequest) {
  const ctx = extractRequestContext(req);
  const { email, token } = await parseEmailAndToken(req);

  if (!email || !token) {
    return NextResponse.json(
      uniformConfirmationResponse('Email address and token are required.'),
      { status: 200 }
    );
  }

  return handleUnsubscribe(req, email, token, ctx);
}
