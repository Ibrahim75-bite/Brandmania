# Architecture Overview

## 1. Architectural Style: Modular Monolith
The application is architected as a **Modular Monolith** adhering to Clean / Hexagonal Architecture principles. It provides a single deployable unit with high internal cohesion and loose coupling between layers.

```
+-------------------------------------------------------------------+
|                        PRESENTATION LAYER                         |
|  - React Server & Client Components                               |
|  - Design System Primitives & Tokens                              |
|  - Responsive Shell & Layouts                                     |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|                         APPLICATION LAYER                         |
|  - Use Cases / Interactors                                        |
|  - Port Interfaces (IRepository, IEmail, ICache, IJobQueue)       |
|  - DTOs & Application Errors                                      |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|                           DOMAIN LAYER                            |
|  - Entities & Aggregates                                          |
|  - Value Objects                                                  |
|  - Domain Rules & Domain Errors                                   |
|  (Zero dependencies on Frameworks, HTTP, UI, or Databases)        |
+-------------------------------------------------------------------+
                                  ^
                                  | (implements ports)
+-------------------------------------------------------------------+
|                       INFRASTRUCTURE LAYER                        |
|  - Persistence Repositories                                      |
|  - HTTP Routers & Security Headers                                |
|  - Rate Limiting & Caching                                        |
|  - Structured Logging & Observability                             |
|  - Background Job Queue Dispatcher                                |
+-------------------------------------------------------------------+
```

## 2. Layer Responsibilities

### Domain Layer (`src/domain/`)
- Contains the core business concepts, entities, and validation invariants.
- Completely isolated: strictly no imports from `next`, `react`, database drivers, or HTTP frameworks.

### Application Layer (`src/application/`)
- Orchestrates business workflows across domain entities and external ports.
- Defines Port interfaces (`IRepository`, `IRateLimiter`, `ILogger`, `ICache`, `IJobQueue`).
- Maps incoming DTOs to domain objects and executes transactions.

### Infrastructure Layer (`src/infrastructure/`)
- Provides concrete implementations for application ports.
- Implements persistence adapters, structured logging, in-memory rate limiting, and security headers.
- Adapts runtime infrastructure to clean contracts.

### Presentation Layer (`src/presentation/` & `src/app/`)
- Handles user interaction, accessibility, visual design tokens, and HTTP route handling.
- Implements UI primitives without business decision leaks.
