import { NextRequest } from 'next/server';
import { container } from '@/infrastructure/container';
import { extractRequestContext } from '@/infrastructure/http/request-context';
import { apiSuccess } from '@/infrastructure/http/api-response';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const ctx = extractRequestContext(req);
  const readinessData = await container.getSystemHealthUseCase.getReadiness();
  const statusCode = readinessData.status === 'ready' ? 200 : 503;
  return apiSuccess(readinessData, ctx.requestId, statusCode);
}
