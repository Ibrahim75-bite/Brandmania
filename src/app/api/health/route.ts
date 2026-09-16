import { NextRequest } from 'next/server';
import { container } from '@/infrastructure/container';
import { extractRequestContext } from '@/infrastructure/http/request-context';
import { apiSuccess } from '@/infrastructure/http/api-response';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const ctx = extractRequestContext(req);
  const healthData = container.getSystemHealthUseCase.getLiveness();
  return apiSuccess(healthData, ctx.requestId, 200);
}
