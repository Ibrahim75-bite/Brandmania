import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { ApplicationError } from '../../application/errors/application.error';
import { DomainError, DomainValidationError } from '../../domain/errors/domain.error';
import { apiError, ApiErrorEnvelope } from './api-response';

export function handleHttpError(err: unknown, requestId: string): NextResponse<ApiErrorEnvelope> {
  // 1. Zod Schema Validation Errors
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((e) => ({
      path: e.path.join('.'),
      message: e.message,
    }));

    return apiError(
      {
        code: 'VALIDATION_ERROR',
        message: 'Request input validation failed',
        details: formattedErrors,
      },
      requestId,
      400
    );
  }

  // 2. Application Layer Errors (with explicit status codes)
  if (err instanceof ApplicationError) {
    const headers = new Headers();
    if (err.code === 'RATE_LIMIT_ERROR' && err.details && typeof err.details === 'object') {
      const details = err.details as { retryAfterSeconds?: number };
      if (details.retryAfterSeconds) {
        headers.set('Retry-After', String(details.retryAfterSeconds));
      }
    }

    return apiError(
      {
        code: err.code,
        message: err.message,
        details: err.details,
      },
      requestId,
      err.statusCode,
      headers
    );
  }

  // 3. Domain Invariant Violations
  if (err instanceof DomainError) {
    const statusCode = err instanceof DomainValidationError ? 400 : 422;
    return apiError(
      {
        code: err.code,
        message: err.message,
      },
      requestId,
      statusCode
    );
  }

  // 4. Unhandled / Internal Errors (Redact stack and internal implementation)
  const isProd = process.env.NODE_ENV === 'production';
  const message = isProd ? 'An unexpected internal error occurred' : String(err);

  return apiError(
    {
      code: 'INTERNAL_ERROR',
      message,
    },
    requestId,
    500
  );
}
