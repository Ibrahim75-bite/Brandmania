# Dependency Direction & Architectural Boundaries

## Core Rule
All source code dependencies must point inward:

```
Presentation / Delivery (UI, HTTP)
          |
          v
  Application Layer (Use Cases, Ports)
          |
          v
    Domain Layer (Entities, Rules, Value Objects)
```

**Infrastructure** implements the ports defined by Application and Domain, but Domain never depends on Infrastructure.

## Forbidden Dependency Patterns

| From Layer | Forbidden Target | Rationale |
|---|---|---|
| `domain/` | `infrastructure/` | Domain must remain pure business logic and testable in isolation. |
| `domain/` | `presentation/` | Domain must not know about UI components or styling. |
| `domain/` | `react`, `next`, `database` | Framework independence. |
| `application/` | `next/server`, HTTP request/response | Use cases are delivery-mechanism agnostic. |
| `presentation/` | Database or raw persistence | UI components must not execute database operations directly. |
| All Layers | Direct `process.env` access | Configuration must flow through validated `src/infrastructure/config/env.ts`. |

## Automated Enforcement
Architectural dependency tests located in `tests/architectural/dependency-rules.test.ts` scan AST imports on every build to prevent violations from entering the codebase.
