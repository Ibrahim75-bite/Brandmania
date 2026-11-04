import { DomainValidationError } from '../errors/domain.error';
import { isSafeExternalUrl } from '../rules/ssrf-guard';

export class WebsiteUrl {
  private readonly _value: string;

  constructor(input: string) {
    if (!input || typeof input !== 'string') {
      throw new DomainValidationError('Website URL cannot be empty', 'website');
    }

    let trimmed = input.trim().replace(/\/+$/, '');
    trimmed = trimmed.replace(/^(https?:\/\/)?www\./i, '$1');

    const normalized = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

    if (!isSafeExternalUrl(normalized)) {
      throw new DomainValidationError(
        `Invalid or unsafe public website URL: ${input}`,
        'website'
      );
    }

    this._value = normalized;
  }

  public get value(): string {
    return this._value;
  }

  public equals(other: WebsiteUrl): boolean {
    if (!(other instanceof WebsiteUrl)) return false;
    return this._value === other._value;
  }

  public toString(): string {
    return this._value;
  }
}
