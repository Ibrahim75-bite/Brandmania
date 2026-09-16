# Code Conventions & Agent Guidelines

## 1. Directory Structure Rules
- `src/domain/`: Pure business entities, value objects, domain rules, and repository contracts. No external dependencies.
- `src/application/`: Use cases, ports, DTOs, and application errors.
- `src/infrastructure/`: Concrete port adapters (persistence, security, logging, cache, queue, http).
- `src/presentation/`: Design tokens, UI primitives, layouts, hooks. No business logic.
- `src/app/`: Next.js App Router entrypoints (routes, layouts, API endpoints).

## 2. Naming Conventions
- **Files**: Kebab-case (`submit-inquiry.use-case.ts`, `inquiry.entity.ts`, `rate-limiter.port.ts`).
- **Classes / Types**: PascalCase (`SubmitInquiryUseCase`, `Inquiry`, `IRateLimiter`).
- **Functions / Methods**: camelCase (`execute`, `checkLimit`, `toDto`).
- **Constants**: UPPER_SNAKE_CASE (`DEFAULT_RATE_LIMIT`, `API_VERSION`).

## 3. Principles for Coding Agents
- Never place business logic directly in UI components or Next.js route handlers.
- Never access `process.env` directly; always import `env` from `@/infrastructure/config/env`.
- Never disable lint rules or TypeScript checks (`@ts-ignore`, `any`) to take shortcuts.
- Always validate external input using Zod schemas at application boundaries.
- Ensure all API endpoints return standardized `{ success, data/error, meta }` envelopes.
