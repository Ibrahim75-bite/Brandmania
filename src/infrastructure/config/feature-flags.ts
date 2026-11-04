/**
 * Type-Safe Feature Flag & Kill-Switch Service
 * Standard #28: Feature Flags & Operational Kill-Switches
 */

export interface FeatureFlags {
  ENABLE_AI_TRIAGE: boolean;
  ENABLE_WEBHOOK_PROCESSING: boolean;
  ENABLE_BOOKING_CALENDAR: boolean;
  MAINTENANCE_MODE: boolean;
  ENABLE_STRICT_RATE_LIMITING: boolean;
  [key: string]: boolean;
}

export type FlagKey = keyof FeatureFlags;

export class FeatureFlagService {
  private static instance: FeatureFlagService;

  private flags: FeatureFlags;
  private overrides: Map<FlagKey, boolean> = new Map();

  constructor() {
    this.flags = {
      ENABLE_AI_TRIAGE: process.env.ENABLE_AI_TRIAGE === 'true' || process.env.NODE_ENV !== 'production',
      ENABLE_WEBHOOK_PROCESSING: process.env.ENABLE_WEBHOOK_PROCESSING !== 'false',
      ENABLE_BOOKING_CALENDAR: process.env.ENABLE_BOOKING_CALENDAR !== 'false',
      MAINTENANCE_MODE: process.env.MAINTENANCE_MODE === 'true',
      ENABLE_STRICT_RATE_LIMITING: process.env.ENABLE_STRICT_RATE_LIMITING !== 'false',
    };
  }

  public static getInstance(): FeatureFlagService {
    if (!FeatureFlagService.instance) {
      FeatureFlagService.instance = new FeatureFlagService();
    }
    return FeatureFlagService.instance;
  }

  public isEnabled(key: FlagKey): boolean {
    if (this.overrides.has(key)) {
      return this.overrides.get(key)!;
    }
    return this.flags[key] ?? false;
  }

  public setOverride(key: FlagKey, enabled: boolean): void {
    this.overrides.set(key, enabled);
  }

  public clearOverride(key: FlagKey): void {
    this.overrides.delete(key);
  }

  public clearAllOverrides(): void {
    this.overrides.clear();
  }

  /**
   * Deterministic percentage rollout based on user/session ID.
   */
  public isEnabledForEntity(key: FlagKey, entityId: string, rolloutPercentage: number): boolean {
    if (!this.isEnabled(key)) return false;
    if (rolloutPercentage >= 100) return true;
    if (rolloutPercentage <= 0) return false;

    // Deterministic hash of entityId to 0..99
    let hash = 0;
    for (let i = 0; i < entityId.length; i++) {
      hash = (hash * 31 + entityId.charCodeAt(i)) % 100;
    }
    return hash < rolloutPercentage;
  }

  public getAllFlags(): FeatureFlags {
    const result = { ...this.flags };
    for (const [key, val] of this.overrides.entries()) {
      result[key] = val;
    }
    return result;
  }
}

export const featureFlagService = FeatureFlagService.getInstance();
