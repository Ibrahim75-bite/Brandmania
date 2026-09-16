import { IInquiryRepository } from '../../domain/repositories/inquiry.repository.interface';
import { IRateLimiter } from '../ports/rate-limiter.port';
import { IClock } from '../ports/clock.port';
import { HealthCheckDto, ReadinessCheckDto } from '../dtos/system-health.dto';

const PROCESS_START_TIME = Date.now();

export class GetSystemHealthUseCase {
  constructor(
    private readonly inquiryRepository: IInquiryRepository,
    private readonly rateLimiter: IRateLimiter,
    private readonly clock: IClock,
    private readonly appVersion = '1.0.0'
  ) {}

  public getLiveness(): HealthCheckDto {
    const uptimeSeconds = Math.floor((Date.now() - PROCESS_START_TIME) / 1000);
    return {
      status: 'healthy',
      uptimeSeconds,
      timestamp: this.clock.now().toISOString(),
      version: this.appVersion,
    };
  }

  public async getReadiness(): Promise<ReadinessCheckDto> {
    const memory = process.memoryUsage();
    const heapUsedMb = Math.round((memory.heapUsed / 1024 / 1024) * 100) / 100;
    const heapTotalMb = Math.round((memory.heapTotal / 1024 / 1024) * 100) / 100;

    let memoryStatus: 'ok' | 'warning' | 'critical' = 'ok';
    if (heapUsedMb > 1024) memoryStatus = 'critical';
    else if (heapUsedMb > 512) memoryStatus = 'warning';

    let persistenceStatus: 'ok' | 'error' = 'ok';
    let persistenceMessage: string | undefined;

    try {
      await this.inquiryRepository.count();
    } catch (err) {
      persistenceStatus = 'error';
      persistenceMessage = err instanceof Error ? err.message : 'Repository access failed';
    }

    let rateLimiterStatus: 'ok' | 'error' = 'ok';
    try {
      await this.rateLimiter.checkLimit('health_probe_check', 1000, 1000);
    } catch {
      rateLimiterStatus = 'error';
    }

    const isReady =
      memoryStatus !== 'critical' &&
      persistenceStatus === 'ok' &&
      rateLimiterStatus === 'ok';

    return {
      status: isReady ? 'ready' : 'not_ready',
      checks: {
        memory: {
          status: memoryStatus,
          heapUsedMb,
          heapTotalMb,
        },
        persistence: {
          status: persistenceStatus,
          message: persistenceMessage,
        },
        rateLimiter: {
          status: rateLimiterStatus,
        },
      },
      timestamp: this.clock.now().toISOString(),
    };
  }
}
