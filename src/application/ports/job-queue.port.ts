export interface Job<T = unknown> {
  id: string;
  name: string;
  data: T;
  createdAt: Date;
  idempotencyKey?: string;
}

export type JobHandler<T = unknown> = (job: Job<T>) => Promise<void>;

export interface IJobQueue {
  enqueue<T = unknown>(name: string, data: T, idempotencyKey?: string): Promise<string>;
  registerHandler<T = unknown>(name: string, handler: JobHandler<T>): void;
  getPendingCount(): Promise<number>;
}
