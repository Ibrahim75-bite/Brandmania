# BRANDMANIA Platform Reconstruction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a premium, perception-first BRANDMANIA homepage that progressively qualifies established businesses before one confident consultation destination.

**Architecture:** Preserve the App Router and layered form/SEO architecture. Consolidate presentation behavior around the existing section components, explicit typography variables, responsive CSS, authentic art, and small reusable interaction primitives.

**Tech Stack:** Next.js 15, React 19, TypeScript, `next/font`, Motion, Lenis, Phosphor Icons, Zod, Vitest.

**Spec:** `docs/superpowers/specs/2026-10-26-brandmania-platform-reconstruction-design.md`

## Global Constraints

- Use Instrument Serif, Plus Jakarta Sans, and JetBrains Mono; do not allow Arial fallback.
- Keep the consultation path restricted to Header, Hero, and `#qualification`.
- Preserve the $700,000+ annual revenue language; never call it ARR.
- Use only supplied artwork and verified claims. Never invent results, logos, reviews, ratings, or testimonials.
- Preserve existing Zod, honeypot, rate-limit, SEO, GEO, legal, and security boundaries.
- All layout changes must work at 320px and must not cause horizontal overflow.

---

### Task 1: Establish typography and responsive presentation foundations

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/presentation/styles/tokens.css`
- Modify: `src/presentation/styles/globals.css`
- Test: production build font compilation

- [ ] Register fonts under `--font-serif`, `--font-sans`, and `--font-mono` and apply them at `<html>`.
- [ ] Map semantic token aliases to those document variables and bind all headings to `var(--font-serif), Georgia, serif`.
- [ ] Add mobile-safe grid/table overrides and a reduced-motion rule without using horizontal scroll as a layout escape hatch.
- [ ] Run `npm.cmd run typecheck`.

### Task 2: Tighten the hero and narrative pacing

**Files:**
- Modify: `src/presentation/components/sections/HeroSection.tsx`
- Modify: `src/presentation/components/sections/WorldviewSection.tsx`
- Modify: `src/presentation/components/sections/DilemmaSection.tsx`

- [ ] Keep a single unconflicted BrandEye hero aperture, metadata index, subline, thesis toggle, and consultation CTA.
- [ ] Remove decorative language that competes with the headline; make the Manifesto typographic and sparse.
- [ ] Maintain the full-bleed commercial contrast and verified Phosphor check/cross iconography.
- [ ] Run `npm.cmd run typecheck`.

### Task 3: Convert flagship content into mobile-safe exhibitions

**Files:**
- Modify: `src/presentation/components/sections/BrandDirectionSection.tsx`
- Modify: `src/presentation/components/sections/MarginRecoverySection.tsx`
- Modify: `src/presentation/components/sections/ConsumerScopeSection.tsx`
- Modify: `src/presentation/components/sections/ArtifactGallery.tsx`

- [ ] Keep Brand Direction alabaster and render the supplied art at natural aspect ratio.
- [ ] Make the six-stage ledger and seven behavioral dimensions collapse into readable narrow-screen stacks.
- [ ] Replace carousel/device framing with an uncropped horizontal-lookbook grid that exposes all five artefacts.
- [ ] Run `npm.cmd run typecheck`.

### Task 4: Align supporting content and qualification

**Files:**
- Modify: `src/presentation/components/sections/CapabilitiesSection.tsx`
- Modify: `src/presentation/components/sections/QualificationSection.tsx`
- Modify: `src/presentation/components/layout/Header.module.css`

- [ ] Reframe capabilities as three broadsheet columns with exact approved grouping names.
- [ ] Frame the final intake as a Private Briefing / Strategic Consultation Dossier while retaining both engagement tracks.
- [ ] Ensure the header preserves a quiet, accessible direct consultation route on desktop and mobile.
- [ ] Run `npm.cmd run typecheck`.

### Task 5: Launch verification

**Files:**
- Verify: `src/infrastructure/seo/schemaGraph.ts`, `src/app/robots.ts`, `src/app/sitemap.ts`, and `src/app/{llms.txt,llms-full.txt}/route.ts`

- [ ] Check that the 18-schema graph is type-safe and optional review/rating nodes stay data-gated.
- [ ] Run `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run test`, and `npm.cmd run build`.
- [ ] Inspect desktop and mobile render for font resolution, uncropped art, CTA concentration, and zero horizontal overflow.
