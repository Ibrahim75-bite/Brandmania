import { env } from './config/env';
import { StructuredLogger } from './logging/logger';
import { MemoryRateLimiter } from './security/rate-limiter';
import { MemoryCacheStore } from './cache/memory-cache';
import { InMemoryJobQueue } from './jobs/memory-job-queue';
import { InMemoryInquiryRepository } from './persistence/in-memory-inquiry.repository';
import { SystemClock } from '../application/ports/clock.port';
import { SubmitInquiryUseCase } from '../application/use-cases/submit-inquiry.use-case';
import { GetSystemHealthUseCase } from '../application/use-cases/get-system-health.use-case';
import { TelemetryMonitor, telemetryMonitor } from './observability/telemetry-monitor';
import { FeatureFlagService, featureFlagService } from './config/feature-flags';
import { BackupRestoreService, backupRestoreService } from './persistence/backup-restore.service';
import { KeyedMutex, keyedMutex } from './security/mutex';
import { IdempotencyStore, idempotencyStore } from './security/idempotency';

export class Container {
  private static instance: Container;

  public readonly clock: SystemClock;
  public readonly logger: StructuredLogger;
  public readonly rateLimiter: MemoryRateLimiter;
  public readonly cache: MemoryCacheStore;
  public readonly jobQueue: InMemoryJobQueue;
  public readonly inquiryRepository: InMemoryInquiryRepository;
  public readonly telemetryMonitor: TelemetryMonitor;
  public readonly featureFlags: FeatureFlagService;
  public readonly backupRestore: BackupRestoreService;
  public readonly mutex: KeyedMutex;
  public readonly idempotency: IdempotencyStore;

  // Use Cases
  public readonly submitInquiryUseCase: SubmitInquiryUseCase;
  public readonly getSystemHealthUseCase: GetSystemHealthUseCase;

  private constructor() {
    this.clock = new SystemClock();
    this.logger = new StructuredLogger(env.LOG_LEVEL as any, 'brandmania-platform');
    this.rateLimiter = new MemoryRateLimiter(
      env.RATE_LIMIT_MAX_REQUESTS,
      env.RATE_LIMIT_WINDOW_MS
    );
    this.cache = new MemoryCacheStore(env.CACHE_DEFAULT_TTL_MS);
    this.jobQueue = new InMemoryJobQueue();
    this.inquiryRepository = new InMemoryInquiryRepository();
    this.telemetryMonitor = telemetryMonitor;
    this.featureFlags = featureFlagService;
    this.backupRestore = backupRestoreService;
    this.mutex = keyedMutex;
    this.idempotency = idempotencyStore;

    // Register async background worker handlers
    this.jobQueue.registerHandler('SEND_INQUIRY_NOTIFICATION', async (job) => {
      this.logger.info(`Processing async notification for inquiry:`, {
        jobId: job.id,
        data: job.data,
      });
    });

    // Instantiate Use Cases
    this.submitInquiryUseCase = new SubmitInquiryUseCase(
      this.inquiryRepository,
      this.logger,
      this.jobQueue,
      this.clock,
      this.rateLimiter,
      this.cache,
      this.idempotency
    );

    this.getSystemHealthUseCase = new GetSystemHealthUseCase(
      this.inquiryRepository,
      this.rateLimiter,
      this.clock,
      '1.0.0',
      this.jobQueue,
      () => this.telemetryMonitor.isCircuitBreakerTripped(),
      () => this.featureFlags.getAllFlags()
    );
  }

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }
}

export const container = Container.getInstance();
