import { NextResponse } from 'next/server';

export interface ApiResponseMeta {
  requestId: string;
  timestamp: string;
}

export interface ApiSuccessEnvelope<T> {
  success: true;
  data: T;
  meta: ApiResponseMeta;
}

export interface ApiErrorPayload {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiErrorEnvelope {
  success: false;
  error: ApiErrorPayload;
  meta: ApiResponseMeta;
}

export function apiSuccess<T>(
  data: T,
  requestId: string,
  statusCode = 200,
  headers?: HeadersInit
): NextResponse<ApiSuccessEnvelope<T>> {
  const meta: ApiResponseMeta = {
    requestId,
    timestamp: new Date().toISOString(),
  };

  const responseHeaders = new Headers(headers);
  responseHeaders.set('x-request-id', requestId);

  return NextResponse.json(
    {
      success: true,
      data,
      meta,
    },
    {
      status: statusCode,
      headers: responseHeaders,
    }
  );
}

export function apiError(
  error: ApiErrorPayload,
  requestId: string,
  statusCode = 500,
  headers?: HeadersInit
): NextResponse<ApiErrorEnvelope> {
  const meta: ApiResponseMeta = {
    requestId,
    timestamp: new Date().toISOString(),
  };

  const responseHeaders = new Headers(headers);
  responseHeaders.set('x-request-id', requestId);

  return NextResponse.json(
    {
      success: false,
      error,
      meta,
    },
    {
      status: statusCode,
      headers: responseHeaders,
    }
  );
}
