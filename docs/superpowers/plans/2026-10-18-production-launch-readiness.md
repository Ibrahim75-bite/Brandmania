# 20 Production Launch-Readiness Requirements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement and verify all 20 production launch-readiness requirements across the BRANDMANIA Next.js 15 App Router codebase while preserving clean layered architecture, Swiss editorial aesthetics, WCAG AA compliance, and anti-fabrication standards.

**Architecture:** Domain rules & types (`src/domain/`), Content configuration (`src/content/`), Infrastructure security, metadata, and rate limiting (`src/infrastructure/`), Presentation components (`src/presentation/`), and App Router pages/routes (`src/app/`).

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript 5.7, Zod 3.24, Vitest 3.0, CSS Modules / Vanilla CSS.

---

### Task 1: Legal Pages, Custom 404 & Link Integrity (Group 1: #1, #2, #15, #16)
**Files:**
- Modify: `src/app/privacy/page.tsx`
- Modify: `src/app/terms/page.tsx`
- Modify: `src/app/not-found.tsx`
- Modify: `src/content/navigation.ts`
- Modify: `src/presentation/components/layout/Header.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/presentation/components/sections/BrandDirectionSection.tsx`
- Modify: `src/presentation/components/sections/ArtifactGallery.tsx`

- [ ] **Step 1: Build Swiss-editorial Privacy Policy page** with GDPR/CCPA structure, metadata (50-60 chars title, 140-160 chars description), and verified contact reference from `seoConfig`.
- [ ] **Step 2: Build Swiss-editorial Terms & Conditions page** clarifying non-binding nature of inquiries, IP rights, and liability limitation.
- [ ] **Step 3: Build Art-Directed 404 page** with `BrandEye`, `CornerArcs`, and `"0404 / Perception Lost."`.
- [ ] **Step 4: Synchronize all navigation anchor IDs** (`#manifesto`, `#system`, `#disciplines`, `#work`, `#qualification`) across Header, Footer, Hero, and Sections.

---

### Task 2: Security, HTTPS, Validation & Spam Protection (Group 2: #3, #4, #17, #18)
**Files:**
- Create: `src/middleware.ts`
- Modify: `next.config.ts`
- Modify: `src/presentation/components/forms/QualificationForm.tsx`
- Modify: `src/app/api/v1/inquiries/route.ts`
- Create: `src/infrastructure/security/__tests__/secretsAudit.test.ts`

- [ ] **Step 1: Enforce HTTPS in `src/middleware.ts`** and verify security headers in `next.config.ts`.
- [ ] **Step 2: Implement Honeypot & Time-Lock in `QualificationForm.tsx`** and API route validation.
- [ ] **Step 3: Enhance rate limiting and shared Zod validation** with website URL normalization and accessible error handling.
- [ ] **Step 4: Create automated Secrets Audit test** in `src/infrastructure/security/__tests__/secretsAudit.test.ts`.

---

### Task 3: Cookie Consent, Analytics & Single CTA (Group 3: #5, #19, #20)
**Files:**
- Create: `src/presentation/components/compliance/CookieConsentBanner.tsx`
- Create: `src/presentation/components/analytics/AnalyticsProvider.tsx`
- Modify: `src/app/layout.tsx`
- Audit & Modify: Hero, System, Brand Direction, Margin Recovery, Consumer Scope, and Header CTAs to emphasize single primary objective: `Request Strategic Consultation`.

- [ ] **Step 1: Build non-blocking bottom architectural Cookie Consent Banner** with `localStorage` persistence and event dispatch.
- [ ] **Step 2: Implement `<AnalyticsProvider />`** listening for consent and supporting Google Analytics measurement.
- [ ] **Step 3: Audit CTA visual hierarchy** across all sections to ensure single dominant action.

---

### Task 4: Metadata, Social Preview, Favicon, Sitemap & Alt Text (Group 4: #6, #7, #8, #9, #10)
**Files:**
- Create: `src/app/opengraph-image.tsx`
- Create: `src/app/icon.tsx`
- Create: `src/app/apple-icon.tsx`
- Audit: Image `alt` tags and SVG `aria-hidden` attributes across all components.

- [ ] **Step 1: Implement dynamic OpenGraph card** via `src/app/opengraph-image.tsx` (1200x630).
- [ ] **Step 2: Implement vector BrandEye favicon** (`src/app/icon.tsx`) and Apple touch icon (`src/app/apple-icon.tsx`).
- [ ] **Step 3: Complete comprehensive image alt text and SVG accessibility audit**.

---

### Task 5: Image Compression, Page Speed, Contrast & Mobile Responsiveness (Group 5: #11, #12, #13, #14)
**Files:**
- Modify: `next.config.ts` (AVIF/WebP image formats)
- Audit & Modify: CSS contrast ratios in `src/presentation/styles/globals.css`, `tokens.css`, and section components.
- Audit & Modify: Mobile navigation drawer, touch target sizes (min 44x44px), and viewport responsiveness at 375px/390px.

- [ ] **Step 1: Configure image formats and optimization in `next.config.ts`**.
- [ ] **Step 2: Audit and fix WCAG AA color contrast** on dark obsidian (`#070709`) and light alabaster (`#F3F0EA`) surfaces.
- [ ] **Step 3: Audit and fix mobile responsiveness and touch targets** at 375px, 390px, 768px, 1024px.

---

### Task 6: Comprehensive Automated Tests, Build & Browser Verification
**Files:**
- Create: `tests/integration/launch-readiness.test.ts`
- Verification commands: `typecheck`, `lint`, `test`, `build`.
- Browser subagent inspection at desktop (1440x900) and mobile (390x844).

- [ ] **Step 1: Implement launch-readiness unit and integration tests**.
- [ ] **Step 2: Run typecheck, lint, and vitest test suite**.
- [ ] **Step 3: Run production build (`next build`)**.
- [ ] **Step 4: Inspect live DOM and browser rendering across desktop and mobile**.
