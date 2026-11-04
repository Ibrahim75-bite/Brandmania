# Brandmania Coding Standards & Architectural Doctrine

Engineering standards, design principles, and review guidelines for Brandmania.

---

## 1. Deep Modules Over Pass-Throughs

- **The Deletion Test**: Every module must pass the Deletion Test. Imagine deleting the module: if complexity vanishes, it was a pass-through and must be eliminated or inlined. If complexity reappears scattered across N callers, it was earning its keep.
- **Small Interface, Rich Implementation**: Design modules with minimal public surfaces that hide extensive domain and orchestration logic. Never expose internal mechanics or require callers to execute 5 sequential steps to achieve a single business objective.
- **Hypothetical vs. Real Seams**: One adapter indicates a hypothetical seam; two adapters indicate a genuine system seam. Never introduce speculative interface layers without at least two real adapters or an external I/O boundary.

---

## 2. Dependency Direction & Seams

- **Explicit Dependency Injection**: Modules must accept their dependencies via constructors or parameter injection. Do not construct external dependencies (repositories, loggers, network clients) inside domain or use-case bodies.
- **Return Results, Avoid Hidden Side Effects**: Methods and use cases must return typed results (`Result<T, E>` or domain DTOs) rather than relying on unhandled exception throwing or mutating external state invisibly.
- **Public Seam Testing**: The public interface is the only testing surface. Callers and tests cross the exact same seam. Never reach into private methods or test past the public interface.

---

## 3. Ubiquitous Language Enforcement

- **Strict Alignment with `GLOSSARY.md`**: Code identifiers, types, schemas, UI copy, comments, and test descriptions must strictly use the canonical terms defined in `GLOSSARY.md`.
- **Zero Unapproved Terminology**:
  - Use `Annual Revenue Threshold ($700,000+)`, never `ARR` or `MRR`.
  - Use `Brand Direction`, never `graphic design` or `logo design`.
  - Use `Margin Recovery`, never `8-vector audit` or `CRO`.
  - Use `Consumer Scope`, never `neuromarketing` as a public headline.
  - Use `Strategic Qualification Inquiry`, never `lead form` or `contact form`.
  - Use `Reference Dossier ID`, never `ticket ID` or `order number`.
  - Ensure zero placeholder brackets or `[OWNER COPY]` remain anywhere in source code or content.

---

## 4. Swiss Editorial Aesthetic Invariants

- **0px Architectural Corners**: All structural sections, panels, dialogs, buttons, inputs, and cards enforce strict `0px` border-radius (`border-radius: 0 !important`).
- **Hairline Borders**: Borders use `1px solid rgba(255, 255, 255, 0.12)` on obsidian canvases (`#070709`) and `1px solid rgba(9, 8, 12, 0.14)` on alabaster surfaces (`#F3F0EA`).
- **Typographic Hierarchy**:
  - `Instrument Serif`: Display headlines rendered strictly at font-weight `400` (never faux-bold `700`).
  - `Plus Jakarta Sans`: Body copy and structural reading.
  - `JetBrains Mono`: Metadata coordinates, timestamps, indices, and tabular numerals (`font-variant-numeric: tabular-nums`).
- **Artboard Integrity**: Physical artboards and mockups are rendered uncropped (`object-fit: contain`) with full margin legibility.

---

## 5. The 12-Smell Fowler Baseline (Used by `/code-review`)

All code reviews evaluate pull requests and commits against these 12 Fowler smells:

1. **Mysterious Name**: A function, variable, or type whose name obscures its intent or uses ambiguous abbreviations. $\rightarrow$ *Fix: Rename to match domain glossary language.*
2. **Duplicated Code**: Identical or near-identical logic duplicated across multiple modules or components. $\rightarrow$ *Fix: Extract the shared seam or unify in a deep module.*
3. **Long Function**: A function exceeding single conceptual responsibility or spanning multiple abstraction levels. $\rightarrow$ *Fix: Decompose into focused steps coordinated by a cohesive deep module.*
4. **Long Parameter List**: Passing 4+ individual parameters rather than a cohesive domain object or options structure. $\rightarrow$ *Fix: Introduce a Value Object or parameter object.*
5. **Global Data**: Uncontrolled mutable state accessible across modules without explicit boundaries. $\rightarrow$ *Fix: Encapsulate state within a scoped module or DI container.*
6. **Mutable Data**: Shared mutable objects modified out-of-band by multiple callers. $\rightarrow$ *Fix: Enforce immutability and return fresh value instances.*
7. **Divergent Change**: A single module modified for multiple unrelated business reasons. $\rightarrow$ *Fix: Split into cohesive modules, each with a single axis of change.*
8. **Shotgun Surgery**: A single business change requiring simultaneous edits across 5+ scattered files. $\rightarrow$ *Fix: Consolidate related logic inside a single deep module.*
9. **Feature Envy**: A method that accesses another object's fields more than its own. $\rightarrow$ *Fix: Move the method onto the data it operates on.*
10. **Data Clumps**: The same group of fields repeatedly travelling together without a unifying type. $\rightarrow$ *Fix: Model them into a dedicated Value Object.*
11. **Primitive Obsession**: Raw strings/numbers used in place of validated domain value objects (e.g. raw string for validated phone or email). $\rightarrow$ *Fix: Introduce domain value objects (`Email`, `PhoneNumber`, `WebsiteUrl`).*
12. **Middle Man / Speculative Generality**: Classes, layers, or interfaces that merely delegate calls without adding behavior or supporting real variance. $\rightarrow$ *Fix: Inline the middle man and remove speculative abstractions.*
