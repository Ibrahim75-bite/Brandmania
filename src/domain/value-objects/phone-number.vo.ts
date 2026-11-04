import { DomainValidationError } from '../errors/domain.error';

export class PhoneNumber {
  private readonly _value: string;

  constructor(input: string) {
    if (!input || typeof input !== 'string') {
      throw new DomainValidationError('Phone number cannot be empty', 'phone');
    }

    const trimmed = input.trim();
    const hasPlus = trimmed.startsWith('+');
    const digits = trimmed.replace(/\D/g, '');

    if (digits.length < 7 || digits.length > 15) {
      throw new DomainValidationError(
        `Invalid phone number length (${digits.length} digits). Must be between 7 and 15 digits.`,
        'phone'
      );
    }

    this._value = hasPlus ? `+${digits}` : digits;
  }

  public get value(): string {
    return this._value;
  }

  public equals(other: PhoneNumber): boolean {
    if (!(other instanceof PhoneNumber)) return false;
    return this._value === other._value;
  }

  public toString(): string {
    return this._value;
  }
}
