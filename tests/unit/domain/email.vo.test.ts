import { describe, it, expect } from 'vitest';
import { Email } from '@/domain/value-objects/email.vo';
import { DomainValidationError } from '@/domain/errors/domain.error';

describe('Email Value Object', () => {
  it('should create valid email object and normalize to lowercase', () => {
    const email = new Email('  Alexander@Vance-Horology.CH  ');
    expect(email.value).toBe('alexander@vance-horology.ch');
  });

  it('should throw DomainValidationError on invalid email format', () => {
    expect(() => new Email('invalid-email')).toThrow(DomainValidationError);
    expect(() => new Email('')).toThrow(DomainValidationError);
    expect(() => new Email('@no-user.com')).toThrow(DomainValidationError);
  });

  it('should support equality comparison', () => {
    const email1 = new Email('info@agency.com');
    const email2 = new Email('INFO@agency.com');
    expect(email1.equals(email2)).toBe(true);
  });
});
