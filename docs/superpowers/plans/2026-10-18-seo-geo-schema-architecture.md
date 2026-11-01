# Schema.org Structured Data, SEO, GEO & International Hreflang Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a production-grade Schema.org JSON-LD Structured Data architecture covering all 18 service-business schemas, complete Next.js 15 App Router SEO/GEO/International Hreflang metadata engine, native `/llms.txt` and `/llms-full.txt` AI search endpoints, crawler-optimized robots & sitemap, and full SSR DOM extraction.

**Architecture:** Clean layered architecture with Zod schema validation in Domain (`src/domain/seo/schemaTypes.ts`), verified configuration in Content (`src/content/seoConfig.ts`), JSON-LD `@graph` and metadata engines in Infrastructure (`src/infrastructure/seo/`), React Server Component in Presentation (`src/presentation/components/seo/StructuredData.tsx`), and App Router route handlers/metadata in `src/app/`.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript 5.7, Zod 3.24, Vitest 3.0, Phosphor Icons.

**Spec:** User specification for Schema.org JSON-LD Structured Data, SEO, GEO, and International Hreflang.

## Global Constraints
- Absolute non-negotiable rule against fabricating reviews, ratings, or unverified business facts (`reviews` default `[]`, `aggregateRating` default `null`, `founder` default `null` unless verified, `address` and `geo` default `null` unless verified).
- Revenue threshold copy is strictly "$700,000+ annual revenue" (Never label as ARR).
- Domain layer must never import infrastructure, presentation, React, Next, or database modules.
- Single global canonical root: `hreflang` alternates must point to resolvable URLs that return HTTP 200 OK (no 404 subpaths).
- SSR DOM rule: 100% of perspective copy, system stages, margin audit rows, and consumer scope behavioral theses must be rendered in the initial server-side HTML.

---

### Task 1: Domain SEO & Schema Types with Zod Validation
**Files:**
- Create: `src/domain/seo/schemaTypes.ts`

**Interfaces:**
- Produces: `SeoConfigSchema`, `SeoConfigType`, `ReviewSchema`, `AggregateRatingSchema`, `FounderSchema`, `PostalAddressSchema`, `GeoCoordinatesSchema`, `BlogPostInputSchema`, `FaqItemSchema`.

- [ ] **Step 1: Write Domain Zod schemas and TypeScript types**
Define type-safe Zod schemas ensuring no empty strings for required fields and explicit nullable/optional definitions for conditional facts.

- [ ] **Step 2: Verify TypeScript compiles without error**
Run `cmd /c npx tsc --noEmit` to verify type safety.

---

### Task 2: Centralized SEO, GEO & Schema Configuration
**Files:**
- Create: `src/content/seoConfig.ts`

**Interfaces:**
- Consumes: `SeoConfigSchema`, `SeoConfigType` from `src/domain/seo/schemaTypes.ts`
- Produces: `seoConfig` validated singleton with verified brand details, flagship disciplines, 11 capabilities, 20 industries, and empty review/rating arrays.

- [ ] **Step 1: Write `src/content/seoConfig.ts` with validated configuration**
Define core identity, target locales (`x-default`, `en`, `en-US`, `en-GB`, `en-AE`, `en-CA`, `en-AU`), opening hours, 3 flagship disciplines, 11 supporting capabilities, 20 target industries, and 2 engagement models.

- [ ] **Step 2: Validate with Zod at runtime and verify type safety**
Ensure `SeoConfigSchema.parse(seoConfig)` succeeds cleanly.

---

### Task 3: JSON-LD Schema.org `@graph` Engine
**Files:**
- Create: `src/infrastructure/seo/schemaGraph.ts`

**Interfaces:**
- Consumes: `seoConfig` from `src/content/seoConfig.ts`
- Produces: `generateSchemaGraph(options?)`, `buildBlogPostingSchema(post)`, `buildFaqPageSchema(faqs)`. Supports all 18 Schema.org types:
  1. `Organization`
  2. `LocalBusiness` (dual-typed `["Organization", "LocalBusiness", "ProfessionalService"]`)
  3. `Service` (3 Flagships)
  4. `Offer` (2 confirmed engagement models)
  5. `OfferCatalog` (Flagships + 11 supporting capabilities)
  6. `Person` (Founder, conditional)
  7. `ContactPoint`
  8. `PostalAddress` (conditional)
  9. `GeoCoordinates` (conditional)
  10. `OpeningHoursSpecification`
  11. `Review` (conditional)
  12. `AggregateRating` (conditional)
  13. `WebSite`
  14. `WebPage`
  15. `BreadcrumbList` (6 primary architectural anchors)
  16. `BlogPosting` (`buildBlogPostingSchema` helper)
  17. `FAQPage` (`buildFaqPageSchema` builder + default 3 verified FAQs)
  18. `ItemList` (Flagship disciplines list & Industries served list)

- [ ] **Step 1: Implement `src/infrastructure/seo/schemaGraph.ts`**
Assemble graph nodes with proper `@id` linkage, eliminating undefined/null values from serialization.

- [ ] **Step 2: Export helper builders for blog postings and FAQs**

---

### Task 4: Next.js Metadata Construction Engine
**Files:**
- Create: `src/infrastructure/seo/metadata.ts`

**Interfaces:**
- Consumes: `seoConfig`
- Produces: `constructMetadata(customMetadata?)` returning Next.js `Metadata` with `metadataBase`, `title`, `description`, `alternates`, `openGraph`, `twitter`, `robots`, and conditional `other` geo meta tags.

- [ ] **Step 1: Implement `src/infrastructure/seo/metadata.ts`**
Generate canonical links, bidirectional hreflang map for `x-default` and English locales pointing to canonical URL, Googlebot directives, and optional geo meta tags.

---

### Task 5: React Server Component `<StructuredData />`
**Files:**
- Create: `src/presentation/components/seo/StructuredData.tsx`

**Interfaces:**
- Consumes: `generateSchemaGraph` from `src/infrastructure/seo/schemaGraph.ts`
- Produces: React Server Component rendering `<script type="application/ld+json">` with safe serialization.

- [ ] **Step 1: Implement `<StructuredData />` component**

---

### Task 6: AI Search Engine Native Dossiers (`llms.txt` & `llms-full.txt`)
**Files:**
- Create: `src/app/llms.txt/route.ts`
- Create: `src/app/llms-full.txt/route.ts`

**Interfaces:**
- Produces: HTTP Route Handlers returning UTF-8 Markdown text documents summarizing BRANDMANIA's core identity, 3 flagship disciplines, 11 supporting capabilities, 20 target industries, and engagement models.

- [ ] **Step 1: Implement `src/app/llms.txt/route.ts`**
- [ ] **Step 2: Implement `src/app/llms-full.txt/route.ts`**

---

### Task 7: AI Search Crawler Directives & Dynamic Sitemap
**Files:**
- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`
- Remove: `public/robots.txt` (to allow Next.js route handling)
- Remove: `src/app/sitemap.xml/route.ts` (replaced by standard `src/app/sitemap.ts`)

**Interfaces:**
- Produces: Next.js `robots.ts` and `sitemap.ts` metadata routes.

- [ ] **Step 1: Implement `src/app/robots.ts`**
Support `*`, `Googlebot`, `Bingbot`, `OAI-SearchBot`, `ChatGPT-User`, `GPTBot`, `ClaudeBot`, `Claude-Web`, `PerplexityBot`, `Google-Extended`, and `Applebot-Extended`.
- [ ] **Step 2: Implement `src/app/sitemap.ts`**
Include canonical routes, `lastModified`, `changeFrequency`, `priority`, hreflang alternates, and entries for `/llms.txt` and `/llms-full.txt`.
- [ ] **Step 3: Remove obsolete `public/robots.txt` and `src/app/sitemap.xml/route.ts`**

---

### Task 8: SSR DOM Content Extraction & Accessibility Audit
**Files:**
- Modify: `src/presentation/components/sections/HeroSection.tsx`
- Modify: `src/presentation/components/sections/ConsumerScopeSection.tsx`
- Modify: `src/presentation/components/sections/ArtifactGallery.tsx`
- Modify: `src/presentation/components/sections/QualificationSection.tsx`

**Interfaces:**
- Ensures 100% of text for both hero perspectives, all 6 system stages, all 6 margin recovery audit stages, and all 7 consumer scope behavioral theses is present in initial SSR DOM.
- Renders verified FAQ accordion in Qualification section.
- Ensures descriptive `alt` attributes on all brand artwork (`brandmania-cover-clean.jpg`, `brandmania-poster.jpg`, `artboard-*.jpg`).

- [ ] **Step 1: Update `HeroSection.tsx` to retain both perspective quotes in SSR DOM**
- [ ] **Step 2: Update `ConsumerScopeSection.tsx` to retain all 7 behavioral dimension theses in SSR DOM**
- [ ] **Step 3: Update `ArtifactGallery.tsx` to retain all 5 exhibits in SSR DOM with descriptive alt text**
- [ ] **Step 4: Add verified FAQ accordion to `QualificationSection.tsx`**

---

### Task 9: Layout & Page Integration
**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `constructMetadata` and `<StructuredData />`
- Produces: Integrated layout with complete metadata and JSON-LD structured data script.

- [ ] **Step 1: Wire `constructMetadata()` into `src/app/layout.tsx`**
- [ ] **Step 2: Insert `<StructuredData />` into `src/app/layout.tsx`**

---

### Task 10: Unit & Integration Tests
**Files:**
- Create: `src/infrastructure/seo/__tests__/schemaGraph.test.ts`
- Create: `src/infrastructure/seo/__tests__/seoGeoHreflang.test.ts`

**Interfaces:**
- Verifies all 18 schemas in the graph engine, conditional omission of unverified data, metadata helper, AI crawler robots directives, and `/llms.txt` route responses.

- [ ] **Step 1: Write `src/infrastructure/seo/__tests__/schemaGraph.test.ts`**
- [ ] **Step 2: Write `src/infrastructure/seo/__tests__/seoGeoHreflang.test.ts`**
- [ ] **Step 3: Run Vitest tests**

---

### Task 11: Production Verification & Browser Inspection
- [ ] **Step 1: Run typecheck (`cmd /c npm run typecheck`)**
- [ ] **Step 2: Run lint (`cmd /c npm run lint`)**
- [ ] **Step 3: Run all Vitest tests (`cmd /c npm run test`)**
- [ ] **Step 4: Run production build (`cmd /c npm run build`)**
- [ ] **Step 5: Inspect live DOM and test endpoints (`/llms.txt`, `/llms-full.txt`, `/robots.txt`, `/sitemap.xml`) via browser subagent**
