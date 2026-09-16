import { ILogger, LogContext } from '../../application/ports/logger.port';

const SENSITIVE_KEYS = new Set([
  'password',
  'token',
  'secret',
  'authorization',
  'api_key',
  'apikey',
  'credit_card',
  'cvv',
  'access_token',
  'refresh_token',
]);

function scrubContext(context: LogContext): LogContext {
  const clean: LogContext = {};
  for (const [key, value] of Object.entries(context)) {
    const lower = key.toLowerCase();
    if (SENSITIVE_KEYS.has(lower) || lower.includes('secret') || lower.includes('token')) {
      clean[key] = '[REDACTED]';
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      clean[key] = scrubContext(value as LogContext);
    } else {
      clean[key] = value;
    }
  }
  return clean;
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export class StructuredLogger implements ILogger {
  private readonly levelPriority: Record<LogLevel, number> = {
    debug: 10,
    info: 20,
    warn: 30,
    error: 40,
  };

  constructor(
    private readonly minLevel: LogLevel = 'info',
    private readonly serviceName = 'agency-platform'
  ) {}

  private shouldLog(level: LogLevel): boolean {
    return this.levelPriority[level] >= this.levelPriority[this.minLevel];
  }

  private write(level: string, message: string, meta?: LogContext, err?: Error | unknown): void {
    const payload: Record<string, unknown> = {
      timestamp: new Date().toISOString(),
      service: this.serviceName,
      level,
      message,
    };

    if (meta) {
      payload.context = scrubContext(meta);
    }

    if (err instanceof Error) {
      payload.error = {
        name: err.name,
        message: err.message,
        stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
      };
    } else if (err) {
      payload.error = { message: String(err) };
    }

    const output = JSON.stringify(payload);
    if (level === 'error') {
      console.error(output);
    } else if (level === 'warn') {
      console.warn(output);
    } else {
      console.log(output);
    }
  }

  public debug(message: string, context?: LogContext): void {
    if (this.shouldLog('debug')) this.write('debug', message, context);
  }

  public info(message: string, context?: LogContext): void {
    if (this.shouldLog('info')) this.write('info', message, context);
  }

  public warn(message: string, context?: LogContext): void {
    if (this.shouldLog('warn')) this.write('warn', message, context);
  }

  public error(message: string, error?: Error | unknown, context?: LogContext): void {
    if (this.shouldLog('error')) this.write('error', message, context, error);
  }

  public audit(action: string, actor: string, details?: LogContext): void {
    this.write('audit', `AUDIT: [${action}] by [${actor}]`, {
      action,
      actor,
      ...details,
    });
  }
}
