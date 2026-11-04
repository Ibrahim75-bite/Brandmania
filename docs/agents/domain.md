# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

- **`GLOSSARY.md`** at the repo root: canonical single-context glossary for Brandmania.
- **`docs/adr/`**: Architectural Decision Records that record binding decisions, invariants, and trade-offs.

## File structure

Single-context repository:

```
/
├── GLOSSARY.md
├── CODING_STANDARDS.md
├── docs/
│   ├── adr/
│   │   ├── 0001-swiss-editorial-tonal-pacing-and-zero-radius-grid.md
│   │   ├── 0002-atomic-idempotency-and-four-layer-intake-defense.md
│   │   └── 0003-conditional-anti-fabrication-json-ld-schema-graph.md
│   └── agents/
└── src/
```

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor proposal, a hypothesis, a test name), use the term as defined in `GLOSSARY.md`. Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, that's a signal: either you're inventing language the project doesn't use (reconsider) or there's a real gap (surface it for `/domain-modeling`).

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding:

> _Contradicts ADR-0002 (atomic idempotency and four-layer intake defense), but worth reopening because…_
