export interface HealthCheckDto {
  status: 'healthy' | 'degraded' | 'unhealthy';
  uptimeSeconds: number;
  timestamp: string;
  version: string;
  maintenanceMode?: boolean;
}

export interface ReadinessCheckDto {
  status: 'ready' | 'not_ready';
  checks: {
    memory: {
      status: 'ok' | 'warning' | 'critical';
      heapUsedMb: number;
      heapTotalMb: number;
    };
    persistence: {
      status: 'ok' | 'error';
      message?: string;
    };
    rateLimiter: {
      status: 'ok' | 'error';
    };
    dlq?: {
      status: 'ok' | 'warning' | 'error';
      deadLetterCount: number;
    };
    circuitBreaker?: {
      tripped: boolean;
      status: 'ok' | 'tripped';
    };
    featureFlags?: Record<string, boolean>;
  };
  timestamp: string;
}
