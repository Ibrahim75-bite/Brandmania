import { DomainValidationError } from '../errors/domain.error';

export type BudgetRangeType = 'TIER_50K_100K' | 'TIER_100K_250K' | 'TIER_250K_500K' | 'TIER_500K_PLUS';

export class BudgetRange {
  private static readonly VALID_RANGES: BudgetRangeType[] = [
    'TIER_50K_100K',
    'TIER_100K_250K',
    'TIER_250K_500K',
    'TIER_500K_PLUS',
  ];

  private readonly _value: BudgetRangeType;

  constructor(value: string) {
    if (!value) {
      throw new DomainValidationError('Budget range is required', 'budgetRange');
    }

    const upper = value.toUpperCase().trim() as BudgetRangeType;
    if (!BudgetRange.VALID_RANGES.includes(upper)) {
      throw new DomainValidationError(
        `Invalid budget tier '${value}'. Must be one of: ${BudgetRange.VALID_RANGES.join(', ')}`,
        'budgetRange'
      );
    }

    this._value = upper;
  }

  public get value(): BudgetRangeType {
    return this._value;
  }

  public getMinimumBudgetUsd(): number {
    switch (this._value) {
      case 'TIER_50K_100K':
        return 50000;
      case 'TIER_100K_250K':
        return 100000;
      case 'TIER_250K_500K':
        return 250000;
      case 'TIER_500K_PLUS':
        return 500000;
    }
  }

  public equals(other: BudgetRange): boolean {
    return other instanceof BudgetRange && this._value === other._value;
  }

  public toString(): string {
    return this._value;
  }
}
