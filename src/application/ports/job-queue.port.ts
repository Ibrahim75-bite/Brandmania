export interface Job<T = unknown> {
  id: string;
  name: string;
  data: T;
  createdAt: Date;
  idempotencyKey?: string;
  attempts?: number;
}

export interface DeadLetterJob<T = unknown> {
  id: string;
  jobId: string;
  name: string;
  data: T;
  createdAt: Date;
  failedAt: Date;
  attempts: number;
  lastError: string;
  idempotencyKey?: string;
}

export type JobHandler<T = unknown> = (job: Job<T>) => Promise<void>;

export interface IJobQueue {
  enqueue<T = unknown>(name: string, data: T, idempotencyKey?: string): Promise<string>;
  registerHandler<T = unknown>(name: string, handler: JobHandler<T>): void;
  getPendingCount(): Promise<number>;
  getDeadLetterJobs(): DeadLetterJob<unknown>[];
  requeueDeadLetterJob(jobId: string): Promise<boolean>;
}
