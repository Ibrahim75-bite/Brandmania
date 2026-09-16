# Testing Strategy & Guidelines

## 1. Testing Pyramid
We employ a multi-layered testing strategy:

1. **Unit Tests (`tests/unit/`)**:
   - Focus: Pure domain entities, value objects, business rules, and application use-case orchestration.
   - Requirements: Zero network, zero database, zero framework overhead. Execution must be instantaneous.
   - Tooling: Vitest.

2. **Integration Tests (`tests/integration/`)**:
   - Focus: Port-to-adapter contracts, repository implementations, HTTP routes (`/api/health`, `/api/ready`, `/api/v1/inquiries`), rate limiter, and cache stores.
   - Tooling: Vitest.

3. **Component Tests (`tests/component/`)**:
   - Focus: Reusable presentation primitives, accessibility (focus states, keyboard navigation, ARIA attributes).
   - Tooling: `@testing-library/react` + `happy-dom`.

4. **Architectural Tests (`tests/architectural/`)**:
   - Focus: Automated AST inspection of imports to prevent layer boundary violations (e.g. domain importing React or Next.js).
   - Tooling: Vitest.

## 2. Test Execution Commands
```bash
npm test              # Run all test suites
npm run test:watch    # TDD watch mode
npm run test:coverage # Coverage analysis
```
