---
name: error-handling-patterns
description: Master error handling patterns across languages including exceptions, Result types, error propagation, and graceful degradation to build resilient applications. Use when implementing error handling, designing APIs, or improving application reliability.
---

# Error Handling Patterns

Build resilient applications with robust error handling strategies that gracefully handle failures and provide excellent debugging experiences.

## Core Concepts

### 1. Exceptions vs. Result Types
- **Exceptions (`throw` / `catch`)**: Used for unexpected errors, structural faults, and exceptional conditions.
- **Result Types (`Result<T, E> = Ok(T) | Err(E)`)**: Used for expected domain and validation failures, allowing caller inspection without try/catch overhead.

### 2. Error Categorization & HTTP Mapping
- **Validation Errors (400)**: Client-side input mismatch, rejected schemas.
- **Authentication Failures (401)**: Missing or invalid credentials.
- **Authorization Failures (403)**: Authenticated identity lacks permission for the resource.
- **Not Found (404)**: Entity or resource does not exist.
- **Conflict (409)**: State mismatch or concurrent update conflict.
- **Rate Limit (429)**: Exceeded throughput, includes `Retry-After`.
- **Dependency Failures (502/503)**: External services or database timeouts.
- **Internal Errors (500)**: Unexpected runtime panics; stack traces must be scrubbed in production.

### 3. Best Practices
1. **Fail Fast**: Validate early at application boundaries using Zod.
2. **Context Enrichment**: Always attach `requestId`, timestamp, and relevant identifiers.
3. **Graceful Degradation**: Fallback UI components (ErrorBoundary, EmptyState) prevent entire page white-outs.
4. **Idempotency & Retries**: Transient network failures should retry with exponential backoff and jitter.
