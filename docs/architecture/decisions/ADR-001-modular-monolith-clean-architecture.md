# ADR 001: Modular Monolith with Clean Architecture & Next.js App Router

## Status
Accepted

## Context
The website serves high-ticket international brands requiring ultra-high visual fidelity, international SEO, private qualification portals, and future client tooling (margin calculators, audit intake, CRM sync). 

A microservices architecture would introduce premature operational overhead, network latency, distributed transaction complexity, and multi-repo maintenance. Conversely, an unstructured single-page app or standard full-stack framework where business logic is embedded inside UI components or API routes leads to rapid architectural decay and painful refactorings.

## Decision
1. Adopt a **Modular Monolith** architecture based on Clean / Hexagonal Architecture.
2. Structure the codebase into explicit layers: `domain/`, `application/`, `infrastructure/`, `presentation/`, and `app/`.
3. Use Next.js App Router with TypeScript Strict Mode to provide:
   - React Server Components (RSC) to strictly confine domain and database logic to the server.
   - Built-in edge routing, image optimization, and full-stack REST endpoints (`/api/...`).
   - Native SEO capabilities.
4. Enforce domain purity: The `domain` layer must not import any external framework, ORM, HTTP library, or UI library.
5. Invert dependencies via Ports (`application/ports/`) and Adapters (`infrastructure/`).
6. Centralize environment configuration using Zod schema validation to guarantee fail-fast behavior at boot time.

## Consequences
- **Positive**: Clean testability (domain unit tests run without databases or HTTP), single deployable unit, straightforward local developer onboarding, deterministic CI pipeline, easy path to extract microservices in the future if scale dictates.
- **Negative**: Requires discipline from developers and AI agents to adhere to layer boundaries; mitigated via automated architectural tests in CI.
