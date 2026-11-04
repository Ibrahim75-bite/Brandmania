/**
 * In-Memory Asynchronous Job Queue with Exponential Backoff, Timeouts, and DLQ
 * Standards: #17 (Retry Logic), #18 (Exponential Backoff), #19 (Background Jobs),
 *            #20 (Timeouts), #23 (Dead Letter Queues)
 */

import { IJobQueue, Job, JobHandler, DeadLetterJob } from '../../application/ports/job-queue.port';
import { withTimeout } from '../http/timeout';

export interface JobQueueConfig {
  maxAttempts: number;
  initialDelayMs: number;
  backoffFactor: number;
  jobTimeoutMs: number;
}

export class InMemoryJobQueue implements IJobQueue {
  private readonly handlers = new Map<string, JobHandler<unknown>>();
  private readonly processedIdempotencyKeys = new Set<string>();
  private readonly pendingJobs: Job<unknown>[] = [];
  private readonly deadLetterQueue: DeadLetterJob<unknown>[] = [];
  private isProcessing = false;

  private readonly config: JobQueueConfig;

  constructor(config: Partial<JobQueueConfig> = {}) {
    this.config = {
      maxAttempts: config.maxAttempts ?? 3,
      initialDelayMs: config.initialDelayMs ?? 150,
      backoffFactor: config.backoffFactor ?? 2,
      jobTimeoutMs: config.jobTimeoutMs ?? 5000,
    };
  }

  public registerHandler<T = unknown>(name: string, handler: JobHandler<T>): void {
    this.handlers.set(name, handler as JobHandler<unknown>);
  }

  public async enqueue<T = unknown>(
    name: string,
    data: T,
    idempotencyKey?: string
  ): Promise<string> {
    if (idempotencyKey && this.processedIdempotencyKeys.has(idempotencyKey)) {
      return `skipped_${idempotencyKey}`;
    }

    const job: Job<T> = {
      id: `job_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      name,
      data,
      createdAt: new Date(),
      idempotencyKey,
      attempts: 0,
    };

    this.pendingJobs.push(job as Job<unknown>);

    // Trigger async non-blocking drain
    queueMicrotask(() => {
      this.drain().catch((err) => {
        console.error('Job queue background drain error:', err);
      });
    });

    return job.id;
  }

  public async getPendingCount(): Promise<number> {
    return this.pendingJobs.length;
  }

  public getDeadLetterJobs(): DeadLetterJob<unknown>[] {
    return [...this.deadLetterQueue];
  }

  public async requeueDeadLetterJob(jobId: string): Promise<boolean> {
    const index = this.deadLetterQueue.findIndex((dlq) => dlq.id === jobId || dlq.jobId === jobId);
    if (index === -1) return false;

    const [dlqJob] = this.deadLetterQueue.splice(index, 1);
    await this.enqueue(dlqJob.name, dlqJob.data, dlqJob.idempotencyKey);
    return true;
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private calculateBackoffDelay(attempt: number): number {
    const baseDelay = this.config.initialDelayMs * Math.pow(this.config.backoffFactor, attempt);
    const jitter = Math.floor(Math.random() * 50); // Jitter to prevent stampedes
    return baseDelay + jitter;
  }

  private processingPromise: Promise<void> | null = null;

  public async drain(): Promise<void> {
    if (this.processingPromise) {
      return this.processingPromise;
    }

    this.processingPromise = this.processQueue();
    try {
      await this.processingPromise;
    } finally {
      this.processingPromise = null;
    }
  }

  private async processQueue(): Promise<void> {
    while (this.pendingJobs.length > 0) {
      const job = this.pendingJobs.shift();
      if (!job) continue;

      const handler = this.handlers.get(job.name);
      if (!handler) {
        continue;
      }

      let success = false;
      let lastErrorMsg = 'Unknown error';

      while (!success && (job.attempts ?? 0) < this.config.maxAttempts) {
        job.attempts = (job.attempts ?? 0) + 1;

        try {
          // Standard #20: Enforce per-job execution timeout
          await withTimeout(handler(job), this.config.jobTimeoutMs, `Job:${job.name}`);
          success = true;
        } catch (err) {
          lastErrorMsg = err instanceof Error ? err.message : String(err);

          if (job.attempts < this.config.maxAttempts) {
            // Standard #17 & #18: Exponential backoff with jitter
            const delay = this.calculateBackoffDelay(job.attempts - 1);
            await this.sleep(delay);
          }
        }
      }

      if (success) {
        if (job.idempotencyKey) {
          this.processedIdempotencyKeys.add(job.idempotencyKey);
        }
      } else {
        // Standard #23: Move exhausted job to Dead Letter Queue (DLQ)
        const dlqItem: DeadLetterJob<unknown> = {
          id: `dlq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          jobId: job.id,
          name: job.name,
          data: job.data,
          createdAt: job.createdAt,
          failedAt: new Date(),
          attempts: job.attempts ?? this.config.maxAttempts,
          lastError: lastErrorMsg,
          idempotencyKey: job.idempotencyKey,
        };
        this.deadLetterQueue.push(dlqItem);
      }
    }
  }

  public clear(): void {
    this.pendingJobs.length = 0;
    this.deadLetterQueue.length = 0;
    this.processedIdempotencyKeys.clear();
  }
}
