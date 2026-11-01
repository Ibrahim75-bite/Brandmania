# BRANDMANIA Platform Reconstruction Design

## Goal

Present BRANDMANIA as a high-status commercial advisory. The homepage earns a consultation through editorial authority and progressive qualification, while retaining one confident route to `#qualification` for ready decision-makers.

## Experience principles

- Instrument Serif carries exhibition-scale headings; Plus Jakarta Sans carries readable supporting copy; JetBrains Mono labels only operational metadata.
- A 12-column architectural grid and restrained 1px hairlines replace card-heavy SaaS patterns.
- Surface pacing moves from obsidian authority to imperial-violet behavioral systems to one alabaster Brand Direction exhibition.
- Use real BRANDMANIA artwork at its natural ratio; no device shells, fabricated proof, or fabricated commercial results.
- Motion must clarify attention, selection, or hierarchy and respect reduced-motion preferences.

## Narrative sequence

1. Hero establishes status, scope, and a direct consultation route.
2. Manifesto frames the worldview.
3. Commercial Divide filters ad-spend shortcuts through attention-versus-architecture contrast.
4. Integrated System makes the six causal commercial stages visible together.
5. Three flagship disciplines establish Brand Direction, Margin Recovery, and Consumer Scope in distinct visual modes.
6. The uncropped artwork lookbook proves craft without faux-device framing.
7. Capabilities complete the operating model.
8. Private Briefing is the single final qualification destination, with engagement track, revenue, industry, and challenge selection.

## Implementation boundaries

- `src/app/layout.tsx` owns the Next font registrations and exposes `--font-serif`, `--font-sans`, and `--font-mono` at document root.
- `src/presentation/styles/{tokens,globals}.css` owns visual tokens, typography bindings, grid primitives, responsive rules, and reduced-motion handling.
- Sections own their content and interaction; shared decorative or interactive behavior stays in the established primitives, animations, and brand directories.
- The existing JSON-LD graph, crawler routes, sitemap, legal routes, and security headers remain the source of truth for launch compliance.
- The qualification UI retains its Zod, honeypot, and rate-limit boundaries.

## Acceptance criteria

- Headings resolve to Instrument Serif or serif, never Arial.
- The specified artboards and poster are fully visible with no letterboxes or device shells.
- No raw `&check;`, obsolete meta-headlines, stale tab bars, hero collision, or horizontal overflow remains.
- No unsupported reviews, ratings, logos, testimonials, or commercial results are published.
- Typecheck, lint, tests, build, and desktop/mobile browser checks pass.
