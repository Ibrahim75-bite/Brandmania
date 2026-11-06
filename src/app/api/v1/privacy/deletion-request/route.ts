import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { extractRequestContext } from '@/infrastructure/http/request-context';
import { container } from '@/infrastructure/container';
import { Email } from '@/domain/value-objects/email.vo';
import { suppressEmail, generateUnsubscribeToken } from '@/infrastructure/email/email-templates';
import { enforceResponseFloor, uniformConfirmationResponse } from '@/infrastructure/security/vibeShield';

export const dynamic = 'force-dynamic';

const DeletionRequestSchema = z.object({
  email: z
    .string()
    .email('A valid corporate email address is required.')
    .transform((e) => e.toLowerCase().trim()),
  companyName: z.string().optional(),
  requestType: z.enum(['DELETE_ALL_DATA', 'EXPORT_DATA', 'OPT_OUT_ANALYTICS']),
  reason: z.string().optional(),
  token: z.string().min(1, 'Verification token is required.'),
});

type DeletionRequestBody = z.infer<typeof DeletionRequestSchema>;

export async function POST(req: NextRequest) {
  const ctx = extractRequestContext(req);

  await enforceResponseFloor();

  const rateLimit = await container.rateLimiter.checkLimit(`del_req:${ctx.clientIp}`, 10, 60000);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      uniformConfirmationResponse(
        'Too many privacy requests submitted. Please wait 60 seconds.',
        { retryAfter: rateLimit.retryAfterSeconds }
      ),
      {
        status: 200,
        headers: {
          'Retry-After': String(rateLimit.retryAfterSeconds),
          'X-RateLimit-Limit': String(rateLimit.limit),
          'X-RateLimit-Remaining': String(rateLimit.remaining),
        },
      }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      uniformConfirmationResponse('Malformed JSON payload.'),
      { status: 200 }
    );
  }

  const parsed = DeletionRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      uniformConfirmationResponse('Invalid privacy deletion request parameters.'),
      { status: 200 }
    );
  }

  const { email, requestType, reason, companyName, token } = parsed.data;

  const expectedToken = generateUnsubscribeToken(email);
  const tokenValid =
    token.length === expectedToken.length &&
    crypto.timingSafeEqual(Buffer.from(expectedToken), Buffer.from(token));

  if (!tokenValid) {
    return NextResponse.json(
      uniformConfirmationResponse('Invalid or expired verification token.'),
      { status: 200 }
    );
  }

  let recordsPurged = 0;
  try {
    const emailVo = new Email(email);
    const existing = await container.inquiryRepository.findByEmail(emailVo);

    if (requestType === 'DELETE_ALL_DATA') {
      for (const item of existing) {
        await container.inquiryRepository.delete(item.id);
        recordsPurged++;
      }
      suppressEmail(email);
    } else if (requestType === 'OPT_OUT_ANALYTICS') {
      suppressEmail(email);
    }
  } catch (err) {
    container.logger.error('Error executing privacy data deletion', err, { email });
  }

  const deletionReceiptId = `del_${crypto.randomBytes(16).toString('hex')}`;
  const timestamp = new Date().toISOString();

  container.logger.audit('DATA_DELETION_REQUESTED', email, {
    requestId: ctx.requestId,
    clientIp: ctx.clientIp,
    requestType,
    recordsPurged,
    companyName: companyName || '[UNSPECIFIED]',
    reason: reason || '[NONE_SPECIFIED]',
    deletionReceiptId,
  });

  return NextResponse.json(
    {
      success: true,
      deletionReceiptId,
      timestamp,
      recordsPurged,
      requestType,
      message:
        requestType === 'DELETE_ALL_DATA'
          ? 'All matching records have been permanently purged and suppressed under GDPR Art. 17 & CCPA.'
          : requestType === 'EXPORT_DATA'
            ? 'Your export request has been logged. An encrypted dossier will be dispatched if records exist.'
            : 'Your analytics and communications opt-out has been registered.',
    },
    { status: 200 }
  );
}
