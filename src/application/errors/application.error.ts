export abstract class ApplicationError extends Error {
  public abstract readonly statusCode: number;
  public readonly code: string;
  public readonly details?: unknown;

  constructor(message: string, code: string, details?: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ValidationError extends ApplicationError {
  public readonly statusCode = 400;
  constructor(message = 'Validation failed', details?: unknown) {
    super(message, 'VALIDATION_ERROR', details);
  }
}

export class AuthenticationError extends ApplicationError {
  public readonly statusCode = 401;
  constructor(message = 'Authentication required', details?: unknown) {
    super(message, 'AUTHENTICATION_ERROR', details);
  }
}

export class AuthorizationError extends ApplicationError {
  public readonly statusCode = 403;
  constructor(message = 'Access denied', details?: unknown) {
    super(message, 'AUTHORIZATION_ERROR', details);
  }
}

export class NotFoundError extends ApplicationError {
  public readonly statusCode = 404;
  constructor(message = 'Resource not found', details?: unknown) {
    super(message, 'NOT_FOUND_ERROR', details);
  }
}

export class ConflictError extends ApplicationError {
  public readonly statusCode = 409;
  constructor(message = 'Resource state conflict', details?: unknown) {
    super(message, 'CONFLICT_ERROR', details);
  }
}

export class RateLimitError extends ApplicationError {
  public readonly statusCode = 429;
  public readonly retryAfterSeconds: number;

  constructor(message = 'Rate limit exceeded', retryAfterSeconds = 60) {
    super(message, 'RATE_LIMIT_ERROR', { retryAfterSeconds });
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

export class DependencyError extends ApplicationError {
  public readonly statusCode = 502;
  constructor(message = 'External dependency failure', details?: unknown) {
    super(message, 'DEPENDENCY_ERROR', details);
  }
}

export class InternalError extends ApplicationError {
  public readonly statusCode = 500;
  constructor(message = 'Internal server error', details?: unknown) {
    super(message, 'INTERNAL_ERROR', details);
  }
}
