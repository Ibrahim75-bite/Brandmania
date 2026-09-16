import { NextRequest } from 'next/server';
import { z } from 'zod';
import { container } from '@/infrastructure/container';
import { extractRequestContext } from '@/infrastructure/http/request-context';
import { apiSuccess } from '@/infrastructure/http/api-response';
import { handleHttpError } from '@/infrastructure/http/error-handler';
import { RateLimitError } from '@/application/errors/application.error';

export const dynamic = 'force-dynamic';

const submitInquirySchema = z.object({
  clientName: z.string().trim().min(2, 'Client name must be at least 2 characters').max(100),
  companyName: z.string().trim().min(2, 'Company name must be at least 2 characters').max(100),
  email: z.string().trim().email('Invalid business email address'),
  companyTier: z.enum(['EMERGING_ENTERPRISE', 'MID_MARKET', 'GLOBAL_ENTERPRISE', 'HAUTE_LUXURY']),
  budgetRange: z.enum(['TIER_50K_100K', 'TIER_100K_250K', 'TIER_250K_500K', 'TIER_500K_PLUS']),
  services: z.array(z.string()).min(1, 'Please select at least one service category'),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000),
});

export async function POST(req: NextRequest) {
  const ctx = extractRequestContext(req);

  try {
    // 1. Rate Limiting Check
    const rateLimit = await container.rateLimiter.checkLimit(ctx.clientIp);
    if (!rateLimit.allowed) {
      throw new RateLimitError(
        'Too many inquiry submissions from this IP. Please try again shortly.',
        rateLimit.retryAfterSeconds
      );
    }

    // 2. Parse & Validate Payload
    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      throw new z.ZodError([
        {
          code: 'custom',
          message: 'Malformed JSON payload in request body',
          path: [],
        },
      ]);
    }

    const validatedInput = submitInquirySchema.parse(rawBody);

    // 3. Execute Application Use Case
    const result = await container.submitInquiryUseCase.execute(validatedInput);

    // 4. Return Standard API Success Envelope
    return apiSuccess(result, ctx.requestId, 201);
  } catch (err) {
    return handleHttpError(err, ctx.requestId);
  }
}
