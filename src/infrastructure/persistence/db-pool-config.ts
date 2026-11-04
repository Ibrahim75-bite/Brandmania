/**
 * Database Connection Pooling Configuration for Supabase Supavisor
 * Standard #15: Connection Pooling & Resource Exhaustion Prevention
 *
 * Configured specifically for serverless / edge runtime execution:
 * - Supavisor transaction mode (port 6543)
 * - Strict single connection limit per serverless execution context
 * - Aggressive idle and connection timeouts to prevent connection exhaustion
 */

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
    const rawUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:6543/postgres';
    
    // Parse and adapt for Supavisor Transaction Mode (port 6543)
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(rawUrl);
    } catch {
      parsedUrl = new URL('postgresql://postgres:postgres@localhost:6543/postgres');
    }

    // Enforce Supavisor transaction mode port 6543 and pgbouncer query flag
    const port = parsedUrl.port ? parseInt(parsedUrl.port, 10) : 6543;
    const isTransactionMode = port === 6543 || parsedUrl.searchParams.get('pgbouncer') === 'true';

    // Ensure pgbouncer=true and connection_limit=1 are present in connection string
    if (!parsedUrl.searchParams.has('pgbouncer')) {
      parsedUrl.searchParams.set('pgbouncer', 'true');
    }
    if (!parsedUrl.searchParams.has('connection_limit')) {
      parsedUrl.searchParams.set('connection_limit', '1');
    }

    this.config = {
      host: parsedUrl.hostname,
      port: 6543, // Supavisor Transaction Mode port
      database: parsedUrl.pathname.replace(/^\//, '') || 'postgres',
      user: parsedUrl.username || 'postgres',
      ssl: process.env.NODE_ENV === 'production',
      maxConnections: 1, // Single connection per serverless lambdas prevents pool exhaustion
      idleTimeoutMillis: 10000, // 10s idle timeout
      connectionTimeoutMillis: 5000, // 5s connection timeout
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
