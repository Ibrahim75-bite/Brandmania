import { DomainValidationError } from '../errors/domain.error';

export type ServiceCode =
  | 'BRAND_DIRECTION'
  | 'MARGIN_RECOVERY'
  | 'NEUROMARKETING'
  | 'AI_AUTOMATION'
  | 'GROWTH_MARKETING'
  | 'PERFORMANCE_CONTENT'
  | 'STRATEGIC_MANAGEMENT';

export class ServiceCategory {
  private static readonly VALID_SERVICES: Record<ServiceCode, { name: string; isCorePillar: boolean }> = {
    BRAND_DIRECTION: { name: 'Brand Direction', isCorePillar: true },
    MARGIN_RECOVERY: { name: 'Margin Recovery', isCorePillar: true },
    NEUROMARKETING: { name: 'Neuromarketing (Consumer Scope)', isCorePillar: true },
    AI_AUTOMATION: { name: 'AI Connected Systems & Automation', isCorePillar: false },
    GROWTH_MARKETING: { name: 'Growth & Performance Marketing', isCorePillar: false },
    PERFORMANCE_CONTENT: { name: 'Performance Content Creation', isCorePillar: false },
    STRATEGIC_MANAGEMENT: { name: 'Strategic Management & Ops', isCorePillar: false },
  };

  private readonly _code: ServiceCode;

  constructor(code: string) {
    if (!code) {
      throw new DomainValidationError('Service code cannot be empty', 'service');
    }

    const upper = code.toUpperCase().trim() as ServiceCode;
    if (!(upper in ServiceCategory.VALID_SERVICES)) {
      throw new DomainValidationError(
        `Unknown service category '${code}'. Valid: ${Object.keys(ServiceCategory.VALID_SERVICES).join(', ')}`,
        'service'
      );
    }

    this._code = upper;
  }

  public get code(): ServiceCode {
    return this._code;
  }

  public get name(): string {
    return ServiceCategory.VALID_SERVICES[this._code].name;
  }

  public get isCorePillar(): boolean {
    return ServiceCategory.VALID_SERVICES[this._code].isCorePillar;
  }

  public equals(other: ServiceCategory): boolean {
    return other instanceof ServiceCategory && this._code === other._code;
  }

  public static getAllCorePillars(): ServiceCode[] {
    return ['BRAND_DIRECTION', 'MARGIN_RECOVERY', 'NEUROMARKETING'];
  }
}
