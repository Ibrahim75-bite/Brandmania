import { DomainValidationError } from '../errors/domain.error';

export type CompanyTierType = 'EMERGING_ENTERPRISE' | 'MID_MARKET' | 'GLOBAL_ENTERPRISE' | 'HAUTE_LUXURY';

export class CompanyTier {
  private static readonly VALID_TIERS: CompanyTierType[] = [
    'EMERGING_ENTERPRISE',
    'MID_MARKET',
    'GLOBAL_ENTERPRISE',
    'HAUTE_LUXURY',
  ];

  private readonly _value: CompanyTierType;

  constructor(value: string) {
    if (!value) {
      throw new DomainValidationError('Company tier is required', 'companyTier');
    }

    const upper = value.toUpperCase().trim() as CompanyTierType;
    if (!CompanyTier.VALID_TIERS.includes(upper)) {
      throw new DomainValidationError(
        `Invalid company tier '${value}'. Must be one of: ${CompanyTier.VALID_TIERS.join(', ')}`,
        'companyTier'
      );
    }

    this._value = upper;
  }

  public get value(): CompanyTierType {
    return this._value;
  }

  public isHighTicket(): boolean {
    return this._value === 'GLOBAL_ENTERPRISE' || this._value === 'HAUTE_LUXURY';
  }

  public equals(other: CompanyTier): boolean {
    return other instanceof CompanyTier && this._value === other._value;
  }

  public toString(): string {
    return this._value;
  }
}
