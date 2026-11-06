import { env } from '../config/env';

export interface DbPoolConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  ssl: boolean;
  maxConnections: number;
  idleTimeoutMillis: number;
  connectionTimeoutMillis: number;
  transactionMode: boolean;
  connectionStringUrl: string;
}

export class DatabasePoolManager {
  private static instance: DatabasePoolManager;
  private readonly config: DbPoolConfig;

  private constructor() {
    const rawUrl = env.DATABASE_URL;

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(rawUrl);
    } catch {
      throw new Error('FATAL: DATABASE_URL is not a valid connection string');
    }

    const port = parsedUrl.port ? parseInt(parsedUrl.port, 10) : 6543;
    const isTransactionMode = port === 6543 || parsedUrl.searchParams.get('pgbouncer') === 'true';

    if (!parsedUrl.searchParams.has('pgbouncer')) {
      parsedUrl.searchParams.set('pgbouncer', 'true');
    }
    if (!parsedUrl.searchParams.has('connection_limit')) {
      parsedUrl.searchParams.set('connection_limit', '1');
    }

    this.config = {
      host: parsedUrl.hostname,
      port: 6543,
      database: parsedUrl.pathname.replace(/^\//, '') || 'postgres',
      user: parsedUrl.username || 'postgres',
      ssl: process.env.NODE_ENV === 'production',
      maxConnections: 1,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 5000,
      transactionMode: true,
      connectionStringUrl: parsedUrl.toString(),
    };
  }

  public static getInstance(): DatabasePoolManager {
    if (!DatabasePoolManager.instance) {
      DatabasePoolManager.instance = new DatabasePoolManager();
    }
    return DatabasePoolManager.instance;
  }

  public getConfig(): DbPoolConfig {
    return { ...this.config };
  }

  public validateConfiguration(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (this.config.port !== 6543) {
      errors.push(`Invalid Supavisor pool port: ${this.config.port}. Expected 6543 for transaction mode.`);
    }
    if (this.config.maxConnections > 5) {
      errors.push(`maxConnections (${this.config.maxConnections}) exceeds serverless threshold (<= 5).`);
    }
    if (this.config.idleTimeoutMillis > 30000) {
      errors.push(`idleTimeoutMillis (${this.config.idleTimeoutMillis}) is too high for serverless lifecycle.`);
    }
    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

export const dbPoolManager = DatabasePoolManager.getInstance();
