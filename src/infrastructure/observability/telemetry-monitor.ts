
export interface AlertEvent {
  id: string;
  type: 'ERROR_SPIKE' | 'RATE_LIMIT_FLOOD' | 'DLQ_DEPTH_EXCEEDED' | 'COST_QUOTA_BREACHED';
  severity: 'WARNING' | 'CRITICAL' | 'EMERGENCY';
  message: string;
  metrics: Record<string, unknown>;
  timestamp: string;
}

export interface TelemetryConfig {
  errorThresholdPerWindow: number;
  windowMs: number;
  maxCostBudgetUsd: number;
  maxTokenBudget: number;
  dlqDepthAlertThreshold: number;
}

export class TelemetryMonitor {
  private static instance: TelemetryMonitor;

  private readonly config: TelemetryConfig;
  private readonly alertListeners: ((alert: AlertEvent) => void)[] = [];

  private errorCount = 0;
  private fiveHundredErrorCount = 0;
  private totalApiInvocations = 0;
  private totalDbQueries = 0;
  private totalTokensConsumed = 0;
  private totalEstimatedCostUsd = 0;

  private circuitBreakerTripped = false;
  private windowStart = Date.now();
  private readonly recentAlerts: AlertEvent[] = [];

  constructor(config: Partial<TelemetryConfig> = {}) {
    this.config = {
      errorThresholdPerWindow: config.errorThresholdPerWindow ?? 10,
      windowMs: config.windowMs ?? 60000,
      maxCostBudgetUsd: config.maxCostBudgetUsd ?? 50.0,
      maxTokenBudget: config.maxTokenBudget ?? 500000,
      dlqDepthAlertThreshold: config.dlqDepthAlertThreshold ?? 5,
    };
  }

  public static getInstance(): TelemetryMonitor {
    if (!TelemetryMonitor.instance) {
      TelemetryMonitor.instance = new TelemetryMonitor();
    }
    return TelemetryMonitor.instance;
  }

  public onAlert(listener: (alert: AlertEvent) => void): void {
    this.alertListeners.push(listener);
  }

  private emitAlert(alert: AlertEvent): void {
    this.recentAlerts.unshift(alert);
    if (this.recentAlerts.length > 50) {
      this.recentAlerts.pop();
    }
    for (const listener of this.alertListeners) {
      try {
        listener(alert);
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') console.error('Error executing alert listener:', err);
      }
    }
  }

  private checkWindowRoll(): void {
    const now = Date.now();
    if (now - this.windowStart > this.config.windowMs) {
      this.windowStart = now;
      this.errorCount = 0;
      this.fiveHundredErrorCount = 0;
      this.totalApiInvocations = 0;
    }
  }

  public recordError(statusCode: number = 500, errorMsg = 'Error'): void {
    this.checkWindowRoll();
    this.errorCount++;

    if (statusCode >= 500) {
      this.fiveHundredErrorCount++;
    }

    if (this.fiveHundredErrorCount >= this.config.errorThresholdPerWindow) {
      this.emitAlert({
        id: `alt_${Date.now()}_err`,
        type: 'ERROR_SPIKE',
        severity: 'CRITICAL',
        message: `High 5xx error rate detected: ${this.fiveHundredErrorCount} internal errors in the last window`,
        metrics: {
          fiveHundredErrorCount: this.fiveHundredErrorCount,
          totalErrors: this.errorCount,
          latestError: errorMsg,
        },
        timestamp: new Date().toISOString(),
      });
    }
  }

  public recordApiInvocation(route: string): void {
    this.checkWindowRoll();
    this.totalApiInvocations++;
  }

  public recordDatabaseQuery(count = 1): void {
    this.totalDbQueries += count;
  }

  public recordTokenUsage(tokens: number, estimatedCostUsd: number = 0): void {
    this.totalTokensConsumed += tokens;
    this.totalEstimatedCostUsd += estimatedCostUsd;

    if (
      this.totalTokensConsumed >= this.config.maxTokenBudget ||
      this.totalEstimatedCostUsd >= this.config.maxCostBudgetUsd
    ) {
      this.circuitBreakerTripped = true;
      this.emitAlert({
        id: `alt_${Date.now()}_cost`,
        type: 'COST_QUOTA_BREACHED',
        severity: 'EMERGENCY',
        message: `API and AI token cost quota breached. Circuit breaker tripped. Total Cost: $${this.totalEstimatedCostUsd.toFixed(2)}, Tokens: ${this.totalTokensConsumed}`,
        metrics: {
          totalTokensConsumed: this.totalTokensConsumed,
          totalEstimatedCostUsd: this.totalEstimatedCostUsd,
          maxCostBudgetUsd: this.config.maxCostBudgetUsd,
          maxTokenBudget: this.config.maxTokenBudget,
        },
        timestamp: new Date().toISOString(),
      });
    }
  }

  public checkDlqDepth(dlqCount: number): void {
    if (dlqCount >= this.config.dlqDepthAlertThreshold) {
      this.emitAlert({
        id: `alt_${Date.now()}_dlq`,
        type: 'DLQ_DEPTH_EXCEEDED',
        severity: 'CRITICAL',
        message: `Dead Letter Queue backlog exceeded threshold: ${dlqCount} failed jobs`,
        metrics: { dlqCount, threshold: this.config.dlqDepthAlertThreshold },
        timestamp: new Date().toISOString(),
      });
    }
  }

  public isCircuitBreakerTripped(): boolean {
    return this.circuitBreakerTripped;
  }

  public resetCircuitBreaker(): void {
    this.circuitBreakerTripped = false;
  }

  public getMetricsSummary() {
    return {
      errorCount: this.errorCount,
      fiveHundredErrorCount: this.fiveHundredErrorCount,
      totalApiInvocations: this.totalApiInvocations,
      totalDbQueries: this.totalDbQueries,
      totalTokensConsumed: this.totalTokensConsumed,
      totalEstimatedCostUsd: this.totalEstimatedCostUsd,
      circuitBreakerTripped: this.circuitBreakerTripped,
      recentAlertsCount: this.recentAlerts.length,
      recentAlerts: [...this.recentAlerts.slice(0, 5)],
    };
  }

  public clear(): void {
    this.errorCount = 0;
    this.fiveHundredErrorCount = 0;
    this.totalApiInvocations = 0;
    this.totalDbQueries = 0;
    this.totalTokensConsumed = 0;
    this.totalEstimatedCostUsd = 0;
    this.circuitBreakerTripped = false;
    this.recentAlerts.length = 0;
  }
}

export const telemetryMonitor = TelemetryMonitor.getInstance();
