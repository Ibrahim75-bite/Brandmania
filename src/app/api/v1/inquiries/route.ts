import { NextRequest } from 'next/server';
import { z } from 'zod';
import { container } from '@/infrastructure/container';
import { extractRequestContext } from '@/infrastructure/http/request-context';
import { apiSuccess } from '@/infrastructure/http/api-response';
import { handleHttpError } from '@/infrastructure/http/error-handler';
import { withTimeout } from '@/infrastructure/http/timeout';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const ctx = extractRequestContext(req);
  const idempotencyKey = req.headers.get('Idempotency-Key') || req.headers.get('idempotency-key');

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return handleHttpError(
      new z.ZodError([
        {
          code: 'custom',
          message: 'Malformed JSON payload in request body',
          path: [],
        },
      ]),
      ctx.requestId
    );
  }

  try {
    const intakeResult = await withTimeout(
      container.submitInquiryUseCase.processIntake({
        payload: rawBody,
        context: {
          clientIp: ctx.clientIp,
          requestId: ctx.requestId,
          idempotencyKey,
        },
      }),
      8000,
      'SubmitInquiryIntakePipeline'
    );

    if (intakeResult.status === 'IDEMPOTENT_REPLAY') {
      return new Response(JSON.stringify(intakeResult.body), {
        status: intakeResult.statusCode,
        headers: {
          'Content-Type': 'application/json',
          ...intakeResult.headers,
        },
      });
    }

    if (
      intakeResult.status === 'CONCURRENT_IN_FLIGHT' ||
      intakeResult.status === 'RATE_LIMIT_EXCEEDED' ||
      intakeResult.status === 'SPAM_REJECTED' ||
      intakeResult.status === 'TIME_LOCK_VIOLATION'
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          error: intakeResult.error,
        }),
        {
          status: intakeResult.statusCode,
          headers: {
            'Content-Type': 'application/json',
            'X-Request-Id': ctx.requestId,
            ...intakeResult.headers,
          },
        }
      );
    }

    const response = apiSuccess(intakeResult.data, ctx.requestId, 201);
    for (const [key, value] of Object.entries(intakeResult.headers)) {
      response.headers.set(key, value);
    }
    return response;
  } catch (err) {
    return handleHttpError(err, ctx.requestId);
  }
}
