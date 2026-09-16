import { DomainValidationError } from '../errors/domain.error';

export class Email {
  private static readonly EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  private readonly _value: string;

  constructor(value: string) {
    if (!value || typeof value !== 'string') {
      throw new DomainValidationError('Email address cannot be empty', 'email');
    }

    const normalized = value.trim().toLowerCase();

    if (normalized.length > 254) {
      throw new DomainValidationError('Email address exceeds maximum length of 254 characters', 'email');
    }

    if (!Email.EMAIL_REGEX.test(normalized)) {
      throw new DomainValidationError(`Invalid email address format: ${value}`, 'email');
    }

    this._value = normalized;
  }

  public get value(): string {
    return this._value;
  }

  public equals(other: Email): boolean {
    if (!(other instanceof Email)) return false;
    return this._value === other._value;
  }

  public toString(): string {
    return this._value;
  }
}
