
import { NextRequest } from 'next/server';
import { extractRequestContext } from '@/infrastructure/http/request-context';
import { verifyWebhookSignature } from '@/infrastructure/security/webhook-verifier';
import { idempotencyStore } from '@/infrastructure/security/idempotency';
import { container } from '@/infrastructure/container';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const ctx = extractRequestContext(req);
  const signatureHeader =
    req.headers.get('Stripe-Signature') ||
    req.headers.get('X-Webhook-Signature') ||
    req.headers.get('x-signature');

  const webhookSecret = process.env.PAYMENT_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return new Response(
      JSON.stringify({ success: false, error: { code: 'WEBHOOK_SECRET_NOT_CONFIGURED', message: 'Payment webhook secret is not configured.' } }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let rawPayload: string;
  try {
    rawPayload = await req.text();
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: 'FAILED_TO_READ_PAYLOAD' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const verification = verifyWebhookSignature({
    payload: rawPayload,
    signatureHeader,
    secret: webhookSecret,
    toleranceSeconds: 300,
  });

  if (!verification.isValid) {
    container.logger.warn('Payment webhook signature verification failed', {
      error: verification.error,
      requestId: ctx.requestId,
      ip: ctx.clientIp,
    });
    return new Response(
      JSON.stringify({
        success: false,
        error: { code: 'INVALID_WEBHOOK_SIGNATURE', message: verification.error },
      }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let event: { id?: string; type?: string; data?: unknown };
  try {
    event = JSON.parse(rawPayload);
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: 'INVALID_JSON_PAYLOAD' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const eventId = event.id || `evt_${Date.now()}`;

  const isFresh = idempotencyStore.markInFlight(`webhook:${eventId}`);
  if (!isFresh) {
    const existing = idempotencyStore.get(`webhook:${eventId}`);
    if (existing?.status === 'RESOLVED') {
      return new Response(
        JSON.stringify({ success: true, deduplicated: true, eventId }),
        { status: 200, headers: { 'Content-Type': 'application/json', 'X-Webhook-Deduplicated': 'true' } }
      );
    }
    return new Response(
      JSON.stringify({ success: false, error: 'WEBHOOK_EVENT_CURRENTLY_PROCESSING' }),
      { status: 409, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    container.logger.audit(
      event.type || 'PAYMENT_EVENT',
      ctx.clientIp,
      {
        eventId,
        eventType: event.type,
        requestId: ctx.requestId,
      }
    );

    const responsePayload = {
      success: true,
      received: true,
      eventId,
      eventType: event.type || 'unknown',
      processedAt: new Date().toISOString(),
    };

    idempotencyStore.resolve(`webhook:${eventId}`, 200, responsePayload);

    return new Response(JSON.stringify(responsePayload), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    idempotencyStore.release(`webhook:${eventId}`);
    return new Response(
      JSON.stringify({
        success: false,
        error: err instanceof Error ? err.message : 'INTERNAL_PROCESSING_ERROR',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
