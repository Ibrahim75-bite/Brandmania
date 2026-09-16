# Production-Grade Website Foundation
## Revised Architecture & Infrastructure Implementation Plan

---

# 0. Core Objective

Build the **production-grade foundation of the website without prematurely building the website's actual product features**.

The foundation must provide:

- a clean architectural model
- clear dependency boundaries
- reusable frontend infrastructure
- API/application boundaries
- validated configuration
- authentication/authorization foundations
- security controls
- persistence boundaries
- observability
- testing infrastructure
- CI/CD
- deployment foundations
- recovery and operational readiness
- documentation suitable for both human developers and AI coding agents

The implementation must optimize for:

> **simplicity now, extensibility later, and verifiability throughout.**

### Why

The foundation phase should establish mechanisms and boundaries first rather than becoming an early product-development phase. Product-specific domains should only be introduced when they are necessary to prove the architecture.

---

# 1. Architecture Principles

## 1.1 Modular Monolith First

The initial architecture is a **modular monolith**, not a microservice system.

### Reason

A modular monolith provides:

- one deployable unit
- one operational surface
- simpler local development
- simpler testing
- lower infrastructure overhead
- strong internal boundaries

while preserving the ability to split components later if there is an actual operational reason.

Do not introduce distributed infrastructure merely to make the architecture look enterprise-grade.

---

## 1.2 Dependency Direction Must Be Explicit

Use:

```text
Presentation
     ↓
Application
     ↓
Domain
     ↓
Infrastructure
```

with infrastructure implementations injected/adapted at the edges.

The critical rule is:

```text
Domain
    MUST NOT
depend on
Framework / Database / HTTP / UI
```

### Reason

Folder organization alone does not prevent architectural decay.

The architecture must make it difficult for convenient shortcuts to gradually turn into:

```text
React component
   ↓
database
   ↓
business logic
```

or:

```text
API route
   ↓
database
   ↓
business decisions
```

---

# 2. Repository Audit Before Implementation

Before creating files, the agent must inspect the repository and determine:

- existing framework
- runtime
- package manager
- source structure
- existing dependencies
- database
- ORM
- authentication
- styling
- testing
- build tooling
- deployment
- environment configuration
- CI/CD
- existing application behavior

The agent must not replace working technology simply because another option is personally preferred.

For an empty repository, the agent may establish the stack.

For a non-empty repository, it must first determine whether migration is actually justified.

### Reason

This prevents the common AI-agent failure mode of performing unnecessary rewrites.

---

# 3. Technology Selection

For a new empty repository, establish:

## Application

- Next.js App Router
- TypeScript with strict mode
- React Server Components where appropriate

## Styling

- CSS architecture with design tokens
- CSS modules or clearly scoped component styles
- no unnecessary CSS framework dependency

## Validation

Use Zod or an equivalent schema-validation layer for:

- environment configuration
- HTTP input
- external input
- important frontend forms

## Testing

Use:

- Vitest
- Testing Library
- browser-like DOM environment
- end-to-end tooling when the application reaches meaningful user flows

### Reason for the overall stack

The goal is not technology novelty.

The stack should minimize:

- dependency count
- abstraction overhead
- architectural friction
- duplicated validation
- tooling complexity

while providing strong TypeScript integration and production capabilities.

---

# 4. Final Project Architecture

Use this structure as the starting point:

```text
src/
│
├── domain/
│   ├── entities/
│   ├── value-objects/
│   ├── services/
│   ├── repositories/
│   ├── errors/
│   └── rules/
│
├── application/
│   ├── use-cases/
│   ├── dtos/
│   ├── ports/
│   └── errors/
│
├── infrastructure/
│   ├── config/
│   ├── persistence/
│   ├── http/
│   ├── security/
│   ├── logging/
│   ├── cache/
│   ├── jobs/
│   ├── observability/
│   └── integrations/
│
├── presentation/
│   ├── components/
│   │   ├── primitives/
│   │   ├── feedback/
│   │   └── layout/
│   ├── hooks/
│   └── styles/
│
└── app/
    ├── api/
    ├── layout.tsx
    ├── error.tsx
    ├── not-found.tsx
    └── global-error.tsx
```

### Reason

This preserves strong separation of concerns while leaving room for future growth.

`services` and `rules` exist for domain behavior that does not naturally belong inside a single entity.

Do not create services or abstractions merely because they sound architectural.

---

# 5. Domain Layer

The domain layer contains pure business concepts.

Allowed:

- entities
- value objects
- domain services
- business rules
- domain errors
- repository contracts

Forbidden:

- Next.js imports
- React imports
- database imports
- HTTP request/response objects
- environment access
- filesystem access
- framework-specific decorators

### Reason

This is the most important isolation boundary in the architecture.

The business model should remain testable independently of infrastructure.

---

# 6. Application Layer

The application layer orchestrates use cases.

Examples:

```text
SubmitRequest
RequestAudit
CreateLead
GetService
```

The application layer may know:

- what operation must happen
- which domain objects are needed
- which ports it must call
- transaction boundaries
- orchestration rules

It must not know:

- how PostgreSQL works
- how HTTP works
- how React works
- how a particular email provider works

### Reason

This provides a stable workflow layer.

Infrastructure can change without rewriting business workflows.

---

# 7. Ports and Adapters

Define interfaces for external dependencies.

Examples:

```text
IRepository
IEmailSender
IFileStorage
ICache
IJobQueue
ILogger
IClock
```

Implement them in infrastructure.

Example:

```text
Application
    ↓
IEmailSender
    ↓
EmailProviderAdapter
```

### Reason

This provides testability without creating dozens of meaningless abstractions.

The rule is:

> Abstract external decisions, not every function.

---

# 8. Persistence Architecture

Create a persistence boundary before committing the application to a specific access pattern.

Structure:

```text
Domain Repository Contract
        ↓
Infrastructure Repository
        ↓
ORM / Database
```

Establish:

- connection management
- migrations
- schema ownership
- transaction strategy
- indexes
- constraints
- pagination patterns
- concurrency considerations
- backup expectations

### Reason

Repository interfaces should represent meaningful application operations rather than mechanically duplicating every ORM function.

Avoid building a repository layer that becomes nothing more than an ORM wrapper.

---

# 9. Configuration Architecture

All environment configuration must follow:

```text
process.env
     ↓
validated schema
     ↓
typed configuration
     ↓
application
```

Never use:

```text
process.env.SOMETHING
```

randomly throughout the codebase.

### Reason

This prevents:

- runtime configuration surprises
- missing variables
- inconsistent defaults
- environment-specific bugs

and makes deployments reproducible.

---

# 10. API Architecture

All APIs must follow:

```text
HTTP Request
      ↓
Request ID
      ↓
Security controls
      ↓
Authentication
      ↓
Authorization
      ↓
Input validation
      ↓
Controller / Route Handler
      ↓
Use Case
      ↓
Domain
      ↓
Infrastructure
      ↓
Response Mapper
```

Never put domain logic directly into `route.ts`.

### Reason

The request lifecycle becomes a predictable architectural contract, while business logic remains independent from HTTP delivery.

---

# 11. API Contract

Standardize responses.

Success:

```ts
{
  success: true,
  data: ...,
  meta: {
    requestId,
    timestamp
  }
}
```

Failure:

```ts
{
  success: false,
  error: {
    code,
    message,
    details?
  },
  meta: {
    requestId,
    timestamp
  }
}
```

Do not expose:

- stack traces
- SQL errors
- internal class names
- secrets
- infrastructure details

### Reason

A unified contract prevents every endpoint from inventing its own response and error behavior.

---

# 12. Authentication & Authorization

Create the architectural boundary now, but do not invent a full identity system before the product requires it.

Separate:

```text
Authentication
= Who is this?

Authorization
= What can this identity do?
```

Authorization must ultimately be enforced server-side.

Prepare boundaries for:

- users
- sessions
- roles
- permissions
- resource ownership
- protected routes
- protected mutations

### Reason

Authentication and authorization become difficult to retrofit once scattered throughout the product.

At the same time, do not build a complex permission engine before actual roles and policies exist.

---

# 13. Security Foundation

Implement actual baseline security, not decorative security.

Include appropriate controls for:

- secure HTTP headers
- CSP
- clickjacking protection
- content-type protection
- referrer policy
- secure cookies
- input validation
- output safety
- authentication protection
- authorization
- rate limiting
- request size limits
- secret handling
- dependency security
- upload security where applicable
- SSRF protection where applicable
- audit logging for sensitive events

### Critical requirement

The agent must **verify** security behavior.

It is not sufficient to claim that a header or security mechanism was added.

Validation must demonstrate that:

- headers are emitted
- legitimate resources continue to work
- invalid inputs are rejected
- protected operations cannot bypass authorization
- sensitive details are not exposed

---

# 14. Rate Limiting

Create:

```text
IRateLimiter
```

with a development/test implementation.

Do not present an in-memory implementation as a production distributed rate limiter.

Current foundation:

```text
MemoryRateLimiter
```

Future scale option:

```text
DistributedRateLimiter
```

### Reason

In-memory rate limiting is useful for local development, tests, and simple single-instance deployments, but becomes insufficient once multiple application instances share traffic.

Do not add Redis or another distributed dependency before the workload actually requires it.

---

# 15. Caching

Create:

```text
ICache
```

and a development/test implementation.

Define:

- ownership
- cache key strategy
- TTL
- invalidation
- stale behavior
- fallback behavior

### Reason

Caching without an invalidation model becomes a correctness problem.

Do not cache merely because caching appears on an infrastructure diagram.

---

# 16. Background Jobs

Create a job abstraction:

```text
IJobQueue
IJobHandler
```

but do not install a heavyweight queue system unless the product needs asynchronous work.

Use a deterministic development adapter for testing.

### Reason

This provides a clean future path for:

- email delivery
- webhook processing
- file processing
- notifications
- scheduled tasks

without prematurely operating distributed infrastructure.

Jobs must be designed to be idempotent.

---

# 17. Observability

Establish:

```text
request ID
      +
structured logs
      +
application errors
      +
health checks
      +
metrics/tracing boundary
```

The logger should support:

- info
- warning
- error
- audit/security events

and automatically scrub secrets.

### Reason

Production debugging requires the ability to reconstruct what happened during a request, not merely know that something failed.

---

# 18. Health & Readiness

Maintain:

```text
/api/health
/api/ready
```

## Health

Answers:

> Is the process alive?

## Readiness

Answers:

> Can this instance safely receive traffic?

Readiness may verify required dependencies.

### Reason

The distinction matters for containers, load balancers, and deployment systems.

---

# 19. Error Architecture

Define a single internal taxonomy:

```text
ValidationError
AuthenticationError
AuthorizationError
NotFoundError
ConflictError
RateLimitError
DependencyError
InternalError
```

Map these to safe HTTP responses.

### Reason

Without a unified error model, every route eventually invents its own error behavior, producing inconsistent APIs and difficult frontend handling.

---

# 20. Frontend Foundation

Build the design system foundation:

```text
Design Tokens
     ↓
Primitives
     ↓
Composite Components
     ↓
Layouts
     ↓
Pages
```

Tokens should cover:

- color
- typography
- spacing
- sizing
- radii
- shadows
- breakpoints
- motion
- z-index/elevation

Build only foundational components such as:

- Button
- Input
- Textarea
- Select
- Card
- Badge
- Alert
- Modal/Dialog
- Skeleton
- Spinner
- Toast
- EmptyState
- ErrorBoundary
- Container
- Section
- Header
- Footer

### Reason

This creates visual and behavioral consistency without building the entire product prematurely.

---

# 21. Accessibility

Make accessibility part of the component architecture.

Foundation requirements:

- semantic HTML
- keyboard navigation
- visible focus
- form labels
- accessible error messaging
- appropriate ARIA
- contrast
- reduced-motion support
- screen-reader-friendly status messages

### Reason

Accessibility becomes increasingly expensive to retrofit after many components and pages already depend on inconsistent patterns.

---

# 22. Loading / Error / Empty States

Create reusable infrastructure for:

```text
Loading
Empty
Error
Success
Offline/Unavailable
```

### Reason

These states are part of application behavior, not visual decoration.

---

# 23. Testing Architecture

Use multiple levels.

## Unit

Domain and pure application logic.

## Integration

Repositories, configuration, API boundaries, and important infrastructure.

## Component

Reusable UI behavior.

## End-to-End

Critical user journeys once meaningful product flows exist.

## Architectural

Validate structural rules such as:

```text
domain cannot import infrastructure
domain cannot import React
application cannot import Next.js route APIs
```

### Reason

Ordinary tests prove that code works.

Architectural tests help prove that the codebase stays structurally healthy as it grows.

---

# 24. CI/CD

The baseline pipeline should be:

```text
Install
  ↓
Dependency verification
  ↓
Lint
  ↓
Typecheck
  ↓
Unit tests
  ↓
Integration tests
  ↓
Security/dependency checks
  ↓
Build
  ↓
Artifact verification
```

### Critical requirement

The build artifact must become the deployment unit.

Prefer:

```text
CI
 ↓
validated artifact
 ↓
staging
 ↓
production
```

rather than rebuilding separately for production.

### Reason

This prevents the class of failures where CI succeeds but a separately rebuilt production artifact behaves differently.

---

# 25. Docker

Use a multi-stage Docker build with a non-root runtime where applicable.

Validate:

- deterministic build
- minimal runtime image
- non-root process
- correct environment handling
- health behavior
- graceful termination
- correct production runtime mode

Do not add Kubernetes merely because Docker exists.

### Reason

Docker addresses packaging and environment consistency.

Kubernetes addresses a different operational problem and should be introduced only when actual scale or orchestration requirements justify it.

---

# 26. Database Migration Safety

Establish:

```text
Migration
 ↓
Validation
 ↓
Application compatibility
 ↓
Deployment
```

Future migrations must be evaluated for:

- backward compatibility
- locking
- data loss
- rollback
- deployment order

### Reason

Database migrations are among the most dangerous parts of production deployment and require deliberate operational handling.

---

# 27. Recovery

Create documented foundations for:

- backups
- restoration
- deployment rollback
- migration recovery
- dependency failure
- graceful degradation

Do not claim full disaster recovery unless it has actually been implemented and tested.

### Reason

A recovery strategy that has never been exercised is only a theoretical plan.

---

# 28. Documentation

Create:

```text
docs/
├── architecture/
│   ├── overview.md
│   ├── dependency-rules.md
│   ├── boundaries.md
│   └── decisions/
│       └── ADR-001-...
│
├── development/
│   ├── setup.md
│   ├── testing.md
│   └── conventions.md
│
└── operations/
    ├── deployment.md
    ├── configuration.md
    ├── health.md
    └── recovery.md
```

### Reason

Documentation becomes the architectural memory of the project and is especially important when future work is performed by multiple humans and AI coding agents.

---

# 29. AI-Agent Guardrails

Future coding agents must be able to answer:

```text
Where does this logic belong?
What layer owns it?
What may it depend on?
What must it not depend on?
How is it tested?
How is it observed?
```

Agents must not:

- introduce random architecture
- bypass repositories
- access environment variables directly
- put business logic into UI components
- put business logic into route handlers
- disable tests to make builds pass
- silence lint/type errors without justification
- create unnecessary abstractions
- introduce infrastructure without an actual use case
- duplicate existing primitives
- create undocumented architectural exceptions

### Reason

A strong architecture can degrade rapidly when future AI agents independently make locally reasonable but globally inconsistent decisions.

---

# 30. Foundation Demonstration

If a visible browser surface is useful, build a **Foundation Verification Surface** only.

It may demonstrate:

- design tokens
- component rendering
- API connectivity
- health status
- error behavior
- responsive layout

It must be clearly separated from the eventual marketing/product website.

### Reason

A verification surface is useful for validating the foundation, but it must not silently become the first version of the actual product.

---

# 31. Implementation Phases

## Phase 1 — Audit

Deliver:

- repository assessment
- architecture map
- technology assessment
- risks
- constraints

**Gate:** No implementation begins until the repository is understood.

---

## Phase 2 — Architecture

Deliver:

- dependency model
- project structure
- contracts
- boundary definitions
- ADRs

**Gate:** No infrastructure implementation until the boundaries are documented.

---

## Phase 3 — Core Runtime

Implement:

- Next.js foundation
- TypeScript
- configuration
- environment validation
- error model
- logging
- request IDs

**Gate:** Application boots deterministically.

---

## Phase 4 — Domain/Application

Implement:

- domain primitives
- repository contracts
- ports
- use-case structure
- representative example

**Gate:** Domain tests run without Next.js or database dependencies.

---

## Phase 5 — Infrastructure

Implement:

- persistence boundary
- API layer
- security middleware
- rate limiting
- caching abstraction
- job abstraction
- health/readiness

**Gate:** APIs operate through the intended boundaries.

---

## Phase 6 — Frontend Foundation

Implement:

- tokens
- reset
- global styles
- primitives
- feedback components
- layout primitives
- accessibility foundations

**Gate:** Components are reusable and independently testable.

---

## Phase 7 — Testing

Implement:

- unit
- integration
- component
- architectural
- E2E foundation

**Gate:** Tests demonstrate both behavior and structural integrity.

---

## Phase 8 — CI/CD

Implement:

- CI
- build validation
- security checks
- artifact generation
- container build
- deployment preparation

**Gate:** CI produces a verified deployable artifact.

---

## Phase 9 — Operations

Implement/document:

- health
- readiness
- logs
- monitoring boundary
- deployment
- rollback
- backups
- recovery

**Gate:** Production operational procedures are documented and testable.

---

# 32. Verification Matrix

The final verification must include more than a successful production build.

| Area | Evidence |
|---|---|
| Architecture | dependency checks pass |
| Type safety | TypeScript passes |
| Code quality | lint passes |
| Domain | domain tests pass |
| API | contract tests pass |
| Security | security tests/checks pass |
| Frontend | component tests pass |
| Integration | integration suite passes |
| Build | production build succeeds |
| Container | image builds successfully |
| Runtime | health/readiness verified |
| CI | pipeline succeeds |
| Documentation | required documents exist |
| Recovery | rollback/restore procedure documented and tested where feasible |

### Reason

The goal is not merely "the code compiles."

The goal is to demonstrate that the architecture, behavior, security, operations, and deployment foundation work together.

---

# 33. Definition of Done

The foundation is complete only when all of the following are true.

## Architecture

- clear layer boundaries
- documented dependency direction
- no unexplained circular dependencies
- domain independent of infrastructure/frameworks
- application layer independent of HTTP implementation

## Runtime

- application boots
- configuration validates
- failures are handled predictably
- graceful shutdown works

## API

- standardized contracts
- standardized errors
- validation
- request IDs
- authentication boundary
- authorization boundary
- rate limiting

## Data

- persistence boundary
- migrations
- transaction strategy
- constraints
- indexing strategy

## Security

- security headers
- input validation
- secret management
- safe error exposure
- server-side authorization
- abuse controls

## Frontend

- design tokens
- reusable primitives
- responsive foundations
- accessibility foundations
- loading/error/empty states

## Observability

- structured logging
- correlation/request IDs
- health
- readiness
- error reporting boundary

## Testing

- unit
- integration
- component
- architectural tests
- E2E foundation

## Operations

- CI
- production build
- deployable artifact
- container
- deployment documentation
- rollback strategy
- recovery documentation

## Documentation

- architecture overview
- dependency rules
- development guide
- deployment guide
- security notes
- ADRs

---

# 34. What This Plan Deliberately Does NOT Build

The foundation phase does **not** attempt to build:

- the complete homepage
- CMS
- complete service catalog
- CRM
- admin panel
- elaborate dashboard
- unnecessary microservices
- Kubernetes cluster
- distributed cache
- distributed queue
- complex event bus
- dozens of domain entities
- speculative integrations

### Reason

These should be driven by actual product requirements.

The foundation exists to make those features **easy to add correctly**, not to predict and implement them all in advance.

---

# 35. Final Architecture Model

```text
                         ┌───────────────────────┐
                         │       USERS           │
                         └───────────┬───────────┘
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │   PRESENTATION/UI     │
                         │ Components / Pages    │
                         └───────────┬───────────┘
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │   APPLICATION LAYER   │
                         │ Use Cases / Ports     │
                         └───────────┬───────────┘
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │     DOMAIN LAYER      │
                         │ Rules / Entities      │
                         │ Value Objects         │
                         └───────────┬───────────┘
                                     │
                              Interfaces
                                     │
                                     ▼
                 ┌────────────────────────────────────┐
                 │         INFRASTRUCTURE              │
                 │                                    │
                 │ Persistence   HTTP   Security      │
                 │ Logging       Cache  Jobs           │
                 │ Integrations  Config Observability │
                 └────────────────────────────────────┘
                                     │
              ┌──────────────────────┼──────────────────────┐
              ▼                      ▼                      ▼
        Database / ORM         External APIs          Runtime/Cloud
```

Surrounding everything:

```text
Security
Observability
Testing
CI/CD
Configuration
Reliability
Recovery
Documentation
```

---

# 36. Recommended Execution Strategy

Give this plan to the IDE agent as the **master foundation specification**.

The agent should first implement and verify the foundation, then the project should move into actual product development.

Future feature prompts should be required to respect this architecture rather than redefining the architecture for each feature.

The intended progression is:

```text
Foundation
    ↓
Architecture Verification
    ↓
Product Requirements
    ↓
Feature-by-Feature Implementation
    ↓
Continuous Testing
    ↓
Production Deployment
    ↓
Evidence-Based Improvement
```

The foundation is considered successful only when it makes future development **faster, safer, more consistent, testable, observable, and maintainable** without forcing premature infrastructure complexity.
