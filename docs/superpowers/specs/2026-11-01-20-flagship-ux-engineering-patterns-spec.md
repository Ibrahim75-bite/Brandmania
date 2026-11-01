# 20 Flagship UI/UX Engineering Patterns & High-Craft Platform Spec

**Date:** 2026-11-01  
**Project:** Brandmania (`refs.gallery` Swiss Editorial Aesthetic, Next.js 15, React 19)  
**Status:** Approved for Direct Full Implementation  

---

## 1. The 20 Flagship UI/UX Engineering Patterns Matrix

| # | Pattern Name | Target Component / File | Implementation Details |
|---|---|---|---|
| **#1** | **Skeleton Loaders** | `src/presentation/components/primitives/ArchitecturalSkeleton.tsx` | 1px solid `rgba(255,255,255,0.08)` hairlines + obsidian-to-violet directional shimmer (`linear-gradient(90deg, #070709 0%, #160029 50%, #070709 100%)`) for image/async states. |
| **#2** | **Optimistic Updates** | `src/presentation/components/sections/QualificationSection.tsx` | React 19 `useOptimistic` instant state transitions for step advancement and form submission feedback in `<16ms`. |
| **#3** | **Executive Command Menu** | `src/presentation/components/navigation/CommandMenu.tsx` | Swiss-editorial quick-jump palette triggered via `⌘K` / `Ctrl+K` + navbar `[ Index ⌘K ]` trigger, supporting instant section jumping and track pre-selection. |
| **#4** | **Shortcut Hints** | `src/presentation/components/primitives/Kbd.tsx` & headers/sections | Desktop fine-pointer (`@media (hover: hover) and (pointer: fine)`) `JetBrains Mono` 10px `<kbd>` shortcut badges: `⌘K` (Index), `1`/`2` (Hero switch), `←`/`→` (Lookbook), `↵` (Form progression). |
| **#5** | **Undo Toasts** | `src/presentation/components/primitives/UndoToast.tsx` | Architectural bottom-right toast with 5s lifespan and `[ Undo ⌘Z ]` action + `⌘Z` keyboard listener to restore previous state on track switch or form reset. |
| **#6** | **Stale-While-Revalidate (SWR)** | `next.config.ts`, `QualificationSection.tsx` | `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400` on static/editorial routes + `sessionStorage` draft persistence for executive consultation form. |
| **#7** | **Pre-Rendering & Asset Preloading** | `src/app/`, `HeroSection.tsx`, `ArtifactGallery.tsx` | Static pre-rendering for all editorial pages; `priority` (`fetchPriority="high"`) on `brandmania-cover-clean.jpg`; programmatic next-slide image preloading in Lookbook. |
| **#8** | **BlurHash / LQIP Placeholders** | `src/content/blurPlaceholders.ts` | Deterministic obsidian (`#070709`) and imperial violet (`#160029` / `#2E0854`) SVG/base64 `blurDataURL` placeholders on all `next/image` assets with `placeholder="blur"`. |
| **#9** | **View Transitions** | `src/presentation/utils/viewTransition.ts` | Safe `runViewTransition(callback)` wrapper checking `document.startViewTransition` and `prefers-reduced-motion` across perspective toggling, lookbook slide changes, and form steps. |
| **#10** | **Swipe-to-Dismiss Sheets** | `src/presentation/components/primitives/SwipeableSheet.tsx` | `motion/react` spring bottom drawer (`drag="y"`, `dragElastic={{ top: 0.05, bottom: 0.6 }}`) dismissing on `>110px` drag or `>450px/s` velocity for mobile navigation. |
| **#11** | **Interruptible Animations** | Interactive components across sections | `motion/react` spring physics (`stiffness: 380, damping: 32, mass: 0.8`) replacing rigid blocking keyframes across toggles, lookbook, and accordions. |
| **#12** | **Predictive Back & History Sync** | `QualificationSection.tsx`, `SwipeableSheet.tsx` | `history.pushState` and `popstate` synchronization so back gesture transitions form steps and dismisses mobile sheets cleanly without site exit. |
| **#13** | **Hit Slop** | `src/presentation/styles/globals.css` | `.hit-slop` pseudo-element utility expanding interactive targets to minimum `44px × 44px` on navigation links, toggle buttons, and form controls. |
| **#14** | **Safe Area Insets** | `src/app/layout.tsx`, `globals.css`, layout components | `viewport: { viewportFit: 'cover' }` + `env(safe-area-inset-top/bottom/left/right)` on sticky header, mobile sheet drawer, undo toast, and cookie bar. |
| **#15** | **One-Time Code & Executive Autofill** | `QualificationSection.tsx` | Standardized `autoComplete` attributes (`organization`, `url`, `country-name`, `name`, `email`, `tel`) plus conditional verification code pattern (`autoComplete="one-time-code"`, `inputMode="numeric"`). |
| **#16** | **Tabular Numbers** | `globals.css` & all numeric displays | `font-variant-numeric: tabular-nums;` applied globally and via `.tabular-nums` class on indexes (`01`–`07`), step counters, and revenue stats (`$700,000+`). |
| **#17** | **Balanced Headlines** | `globals.css` | `text-wrap: balance;` on `h1, h2, h3, h4, blockquote, .display-headline`; `text-wrap: pretty;` on editorial body paragraphs. |
| **#18** | **Continuous Corners** | Design tokens & floating surfaces | Razor-sharp `0px` structural grids; optical `6px` squircle corners with `1px` inner highlight (`inset 0 0 0 1px rgba(255, 255, 255, 0.12)`) on floating command menu, toast, and keycaps (zero SaaS `16px` cards). |
| **#19** | **Idempotency Keys** | `src/infrastructure/security/idempotency.ts` & API handler | Unique client-generated UUID / digest header attached to consultation submissions with server-side deduplication store preventing duplicate records. |
| **#20** | **Amazon Safe Triangle** | `src/presentation/hooks/useSafeTriangle.ts` | Dynamic vector triangle polygon between cursor and active detail panel with 180ms suppression timer in `MarginRecoverySection`, `ConsumerScopeSection`, and `CapabilitiesSection`. |

---

## 2. Component Stylesheet (`*.module.css`) Typography Audit Checklist
- Audit all CSS modules in `src/` to ensure no headings fall back to Arial / sans-serif.
- Replace any broken variables (e.g. `--font-display`) with `var(--font-serif), Georgia, serif`.
- Enforce `Instrument Serif` across all `h1`, `h2`, `h3`, `h4`, and editorial display headline classes.

---

## 3. Explicit Banned Strings & Uncropped Asset Checklist
- **Eliminate Banned Strings**:
  - [x] `"The Exact 11 Capabilities"` / `"Tethered to the three flagships"`
  - [x] `"Real Campaign Artifacts"`
  - [x] `"We do not invent vanity statistics"` / `"Rigor Over Rhetoric"`
  - [x] `"Decyphering The Dilemma"`
  - [x] `"EXECUTIVE PERSPECTIVE INSTRUMENT"`
  - [x] `"COGNITIVE APERTURE • DIMENSION 07 OF 07"`
  - [x] Raw `"&check;"` entities (replace with Phosphor check/shield icons)
- **Uncropped Assets (`width: 100%; height: auto; object-fit: contain`)**:
  - `brandmania-cover-clean.jpg` (rich 70%+ opacity in Hero aperture, remove floating small brand eye overlapping right column text).
  - `brandmania-poster.jpg` & `artboard-2-services-branding.jpg` (uncropped on light alabaster `#F3F0EA` exhibition plane in `BrandDirectionSection.tsx` with zero clipping and zero black bars).
  - `artboard-1-our.jpg`, `artboard-2-services-branding.jpg`, `artboard-3-services-social.jpg`, `artboard-4-brand-eye.jpg`, `brandmania-ad-agency-banner.jpg` (uncropped in `ArtifactGallery.tsx` without smartphone bezel wrapping).
- **SSR DOM Visibility**:
  - Ensure all 6 System stages, 6 Margin Recovery stages, 7 Consumer Scope dimensions, and 11 Capabilities are rendered in the HTML DOM for AI and search engine crawlers.

---

## 4. Verification & Missing SEO, GEO & Launch Checklist Files
- **18-Schema JSON-LD Graph**: `src/infrastructure/seo/schemaGraph.ts` loaded in `StructuredData.tsx`.
- **GEO & Crawlability**: `/llms.txt`, `/llms-full.txt`, `src/app/robots.ts` with AI bots, `sitemap.ts`, and `hreflang` alternates.
- **Launch Readiness**: `/privacy`, `/terms`, `/not-found.tsx`, `icon.tsx`, `opengraph-image.tsx`, `CookieConsentBanner.tsx`, `AnalyticsProvider.tsx`, honeypot + 2500ms time-lock + rate-limiting on forms, and security headers.
