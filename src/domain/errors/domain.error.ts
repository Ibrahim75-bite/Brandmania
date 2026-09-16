export abstract class DomainError extends Error {
  public readonly code: string;

  constructor(message: string, code = 'DOMAIN_ERROR') {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class DomainValidationError extends DomainError {
  public readonly field?: string;

  constructor(message: string, field?: string) {
    super(message, 'DOMAIN_VALIDATION_ERROR');
    this.field = field;
  }
}

export class EntityNotFoundError extends DomainError {
  public readonly entityName: string;
  public readonly identifier: string;

  constructor(entityName: string, identifier: string) {
    super(`${entityName} with identifier '${identifier}' was not found.`, 'ENTITY_NOT_FOUND');
    this.entityName = entityName;
    this.identifier = identifier;
  }
}

export class BusinessRuleViolationError extends DomainError {
  constructor(message: string) {
    super(message, 'BUSINESS_RULE_VIOLATION');
  }
}
