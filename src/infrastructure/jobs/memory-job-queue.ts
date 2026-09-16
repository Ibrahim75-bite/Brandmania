import { IJobQueue, Job, JobHandler } from '../../application/ports/job-queue.port';

export class InMemoryJobQueue implements IJobQueue {
  private readonly handlers = new Map<string, JobHandler<unknown>>();
  private readonly processedIdempotencyKeys = new Set<string>();
  private readonly pendingJobs: Job<unknown>[] = [];
  private isProcessing = false;

  public registerHandler<T = unknown>(name: string, handler: JobHandler<T>): void {
    this.handlers.set(name, handler as JobHandler<unknown>);
  }

  public async enqueue<T = unknown>(name: string, data: T, idempotencyKey?: string): Promise<string> {
    if (idempotencyKey && this.processedIdempotencyKeys.has(idempotencyKey)) {
      return `skipped_${idempotencyKey}`;
    }

    const job: Job<T> = {
      id: `job_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      name,
      data,
      createdAt: new Date(),
      idempotencyKey,
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

  private async drain(): Promise<void> {
    if (this.isProcessing) return;
    this.isProcessing = true;

    try {
      while (this.pendingJobs.length > 0) {
        const job = this.pendingJobs.shift();
        if (!job) continue;

        const handler = this.handlers.get(job.name);
        if (handler) {
          await handler(job);
        }

        if (job.idempotencyKey) {
          this.processedIdempotencyKeys.add(job.idempotencyKey);
        }
      }
    } finally {
      this.isProcessing = false;
    }
  }
}
