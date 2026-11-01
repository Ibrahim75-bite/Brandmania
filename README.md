# BRANDMANIA — Strategic Brand & Commercial Advisory

<div align="center">

![BRANDMANIA Cover](/public/brand/graphics/brandmania-cover-clean.jpg)

**High-Ticket Strategic Brand Transformation & Margin Recovery Platform**  
*Built with Next.js 15 (App Router), React 19, Motion, and Clean Layered Architecture.*

[![Next.js](https://img.shields.io/badge/Next.js-15.2-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Vitest-3.0-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)](#license)

[Overview](#overview) • [Architecture](#architecture) • [20 UI/UX Engineering Patterns](#20-flagship-uiux-engineering-patterns) • [Design System](#design-system--aesthetic) • [Getting Started](#getting-started) • [Testing & Verification](#testing--verification)

</div>

---

## Overview

**BRANDMANIA** is an enterprise-grade digital flagship designed for high-ticket commercial brand transformation, market perception arbitrage, and margin recovery. 

Rejecting generic SaaS templates and noisy component libraries, the experience follows a disciplined **Swiss Editorial Aesthetic** inspired by classic European editorial design and platforms like `refs.gallery`:
- Razor-sharp `0px` architectural hairline grids (`1px solid rgba(255, 255, 255, 0.08)`).
- Continuous squircle corners (`6px`) with optical `1px` inner highlights for floating controls.
- High-contrast obsidian (`#070709`), alabaster surface treatments (`#F3F0EA`), and muted imperial/neon violet accents (`#160029` / `#C882FF`).
- Editorial typography pairing `Instrument Serif` (Display), `Inter` (Sans), and `JetBrains Mono` (Data/Coordinates).
- Uncropped, authentic high-resolution master artboards presented without artificial device bezels or letterboxing.

---

## The 10 Index Frames

The flagship experience is structured into 10 cohesive frames, accessible via scroll or the Swiss `⌘K` Command Palette:

| Frame | Section | Focus & Interactive Mechanics |
|---|---|---|
| `01` | **Hero** | *The Perception Arbitrage* — Interactive perspective switcher (`Command Preference` vs. `Compete On Price`), shortcut keys `1`/`2`, high-priority LCP asset loading. |
| `02` | **Worldview Manifesto** | Anti-commoditization doctrine, institutional pricing certainty, and commercial sovereignty. |
| `03` | **The Commercial Divide** | Direct comparative matrix contrasting category command vs. margin erosion. |
| `04` | **Integrated System** | 6 synchronized operational disciplines (Brand Strategy, Visual Systems, Campaign Infrastructure, Media Architecture, AI Ops, and Performance Engineering). |
| `05` | **Brand Direction** | Defensible visual and narrative standards with authentic artboard exhibitions on alabaster surfaces. |
| `06` | **Margin Recovery** | 6 enterprise audit stages featuring the **Amazon Safe Triangle** cursor suppression pattern for seamless diagonal navigation. |
| `07` | **Consumer Scope** | 7 behavioral dimensions of executive and high-ticket customer acquisition with dynamic thesis inspector. |
| `08` | **Selected Artifacts** | Authentic campaign lookbook viewer with keyboard navigation (`←`/`→`), adjacent asset preloading, and full SSR DOM crawlability. |
| `09` | **Institutional Capabilities** | 11 core supporting disciplines with safe-triangle cursor protection. |
| `10` | **Strategic Consultation** | Multi-step executive qualification assessment powered by React 19 optimistic updates, draft recovery, predictive back sync, and idempotency guarantees. |

---

## Architecture

The platform is engineered using **Modular Monolith Clean Architecture** with strict dependency boundaries:

```
src/
├── domain/                      # Enterprise Business Rules & Entities
│   ├── entities/                # Inquiry, Consultation, Metric entities
│   ├── validation/              # Zod schemas & domain invariant rules
│   └── seo/                     # SEO metadata & schema specifications
│
├── application/                 # Use Cases & Application Ports
│   ├── use-cases/               # SubmitInquiryUseCase, BookingUseCase
│   └── ports/                   # Inbound/outbound interfaces (Persistence, Notifications)
│
├── infrastructure/              # External Adapters & Infrastructure
│   ├── security/                # Idempotency store, rate limiters, secret audits
│   ├── seo/                     # JSON-LD Graph generator, hreflang, robots, sitemap
│   └── cache/                   # Memory cache & SWR caching headers
│
├── presentation/                # UI Layer (React 19 / Next.js App Router)
│   ├── components/
│   │   ├── layout/              # Header, Footer, Container, Section, SmoothScroll
│   │   ├── navigation/          # CommandMenu (⌘K palette)
│   │   ├── primitives/          # ArchitecturalSkeleton, SwipeableSheet, UndoToast, Button
│   │   ├── forms/               # QualificationForm (Optimistic updates, Idempotency)
│   │   ├── sections/            # HeroSection, MarginRecoverySection, ArtifactGallery, etc.
│   │   └── seo/                 # StructuredData JSON-LD script injectors
│   ├── hooks/                   # useSafeTriangle, useKeyboardShortcuts
│   ├── styles/                  # tokens.css, globals.css, reset.css
│   └── utils/                   # viewTransition, formatting helpers
│
└── content/                     # Static Content, Navigation & Blur Placeholders
```

### Architectural Principles
- **Dependency Rule**: Dependencies point inward. Domain models never import from Application, Infrastructure, or Presentation.
- **SSR DOM Completeness**: Every capability, stage, and dimension is present in the static SSR DOM for search engine bots, screen readers, and AI scrapers.
- **Zero SaaS Bloat**: Custom handcrafted CSS modules, tokenized CSS variables, and zero utility-class bloat.

---

## 20 Flagship UI/UX Engineering Patterns

The platform implements 20 sophisticated micro-UX and engineering patterns:

### Group 1: Typography & Geometric Precision
1. **#16 Tabular Numbers (`font-variant-numeric: tabular-nums`)**: Applied across all numerals, index badges (`01`–`10`), revenue metrics (`$700,000+`), and form inputs to eliminate horizontal jitter during value updates.
2. **#17 Balanced Headlines (`text-wrap: balance` & `text-wrap: pretty`)**: Headlines utilize `text-wrap: balance` to prevent typographic orphans; paragraph copy utilizes `text-wrap: pretty` constrained to `65ch`.
3. **#18 Continuous Corners (Squircle Geometry)**: Avoids generic rounded card styling. Structural containers use razor-sharp `0px` grids, while compact floating surfaces (Command Menu, Undo Toast, Keycaps) utilize `6px` squircle curves with `1px` optical inner borders (`inset 0 0 0 1px rgba(255, 255, 255, 0.12)`).

### Group 2: Cursor Physics & Touch Ergonomics
4. **#20 Amazon Safe Triangle (`useSafeTriangle.ts`)**: Tracks cursor velocity and creates a dynamic 2D vector triangle between the cursor and the active detail pane. Diagonal navigation across rows suppresses accidental hover switching for `180ms`.
5. **#13 Hit Slop Touch Targets**: Global `.hit-slop` pseudo-elements expand interactive click/touch hit boxes by `12px` in every direction, guaranteeing a minimum `44px × 44px` physical touch area.
6. **#14 Safe Area Insets**: Full support for edge-to-edge mobile screens using `viewportFit: "cover"` and `env(safe-area-inset-*)` padding for sticky headers, drawers, and floating toasts.
7. **#10 Swipe-to-Dismiss Sheets (`SwipeableSheet.tsx`)**: Spring-physics mobile bottom sheet drawer powered by `motion/react` with velocity tracking (auto-dismiss on `>110px` drag or `>450px/s` velocity).
8. **#12 Predictive Back Gesture & History Sync**: Form steps and bottom sheets synchronize with `window.history.pushState` and `popstate` events, allowing users to navigate backward without unintentionally exiting the page.

### Group 3: Command Palette & Keyboard Ergonomics
9. **#3 Swiss Command Menu (`⌘K` / `Ctrl+K`)**: Keyboard-navigable quick-jump palette providing instant search, section jumping (`01`–`10`), and pre-selection of engagement tracks.
10. **#4 Contextual Shortcut Hints**: Fine-pointer desktop devices display subtle `JetBrains Mono` `<kbd>` badges (`⌘K` for index, `1`/`2` for hero perspective, `←`/`→` for gallery slides, `⌘Z` for undo, and `↵` for progression).

### Group 4: Perceived Performance & Motion
11. **#8 BlurHash / LQIP Placeholders**: Deterministic obsidian/imperial violet base64 SVG data-URIs for every authentic brand asset, guaranteeing zero layout shift or blank flashes.
12. **#1 Architectural Skeleton Loaders**: Subdued obsidian-to-violet directional shimmers (`1.8s` ease) with `1px` hairlines for asynchronous states.
13. **#6 Stale-While-Revalidate (SWR) Caching**: Edge cache headers (`s-maxage=3600, stale-while-revalidate=86400`) configured for static assets, legal documents, and `/llms*.txt` endpoints; `sessionStorage` hydration preserves in-progress consultation drafts across reloads.
14. **#7 Pre-Rendering & Preloading**: Static site generation (`SSG`) across all primary routes, `priority` high-fetch on hero art, and programmatic background preloading of adjacent lookbook slides.
15. **#9 Native View Transitions**: Smooth morphing between states via `document.startViewTransition`, respecting user accessibility preferences (`prefers-reduced-motion`).
16. **#11 Interruptible Spring Physics**: Interactive transitions employ spring dynamics (`stiffness: 380, damping: 32, mass: 0.8`) rather than fixed-duration keyframes, ensuring natural momentum on rapid directional reversals.

### Group 5: Transactional Integrity & Resilience
17. **#2 React 19 Optimistic Updates**: Sub-16ms UI state transitions when advancing form steps or submitting consultations using React 19's `useOptimistic`.
18. **#5 Architectural Undo Toast (`⌘Z`)**: 5-second non-blocking status notification enabling instant rollback of track selections or cleared inputs via button click or global `⌘Z` / `Ctrl+Z` shortcut.
19. **#15 One-Time Code & Executive Autofill**: Native browser autocomplete bindings across all executive form fields (`organization`, `url`, `country-name`, `email`, `tel`) with `one-time-code` numeric SMS/email verification support.
20. **#19 Server-Side Idempotency Store**: Deduplicates submission attempts using unique client-generated `Idempotency-Key` headers. Duplicate submissions return cached responses without creating redundant consultation records.

---

## AI & Machine-Readable Discoverability

The platform includes first-class endpoints for Large Language Models (LLMs), AI search agents (Perplexity, SearchGPT, Gemini), and web crawlers:

- **`/llms.txt`**: Concise manifest summarizing brand positioning, advisory capabilities, and contact routes.
- **`/llms-full.txt`**: Comprehensive dossier detailing the full 6-stage margin audit, 7 behavioral consumer dimensions, and 11 capability tracks.
- **Structured Data (JSON-LD)**: Rich schema graphs for `ProfessionalService`, `Organization`, `WebSite`, and `BreadcrumbList`.

---

## Design System & Aesthetic

### Color Palette
- **Base Obsidian**: `#070709` — Primary background and terminal depth.
- **Surface Elevation**: `#0B0B0E` — Section and container surface elevation.
- **Alabaster Contrast**: `#F3F0EA` — Authentic paper surface for high-contrast artboard exhibition.
- **Deep Imperial Violet**: `#160029` — Shadow depth, gradient midpoints, and brand resonance.
- **Neon Accent Violet**: `#C882FF` — High-visibility micro-highlights, focus states, and active indicators.

### Typography Scales
- **Display Serif**: `Instrument Serif` (400 weight, italics for editorial emphasis, Georgia fallback).
- **Interface Sans**: `Inter` (neutral Swiss grotesk typography for structural labels and navigation).
- **System Monospace**: `JetBrains Mono` (coordinates, index badges, and metadata numerals).

---

## Getting Started

### Prerequisites
- Node.js 20.x or later
- npm 10.x or later

### Installation

```bash
# Clone the repository
git clone https://github.com/Ibrahim75-bite/Brandmania.git
cd Brandmania

# Install dependencies
npm install
```

### Local Development

```bash
# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Typecheck TypeScript definitions
npm run typecheck

# Lint with Next.js / ESLint
npm run lint

# Compile optimized production bundle
npm run build

# Start production server
npm run start
```

---

## Testing & Verification

The test suite covers domain logic, architectural layer boundaries, security/idempotency invariants, and UI pattern mechanics:

```bash
# Execute full Vitest suite
npm test

# Run tests in watch mode
npm run test:watch

# Generate code coverage report
npm run test:coverage
```

### Test Coverage Highlights
- **`uxEngineeringPatterns.test.tsx`**: Verifies Idempotency Store deduplication, Amazon Safe Triangle polygon math, Command Menu search/shortcuts, and Undo Toast `⌘Z` restoration.
- **`dependency-rules.test.ts`**: Enforces strict Clean Architecture layer boundaries.
- **`secretsAudit.test.ts`**: Audits codebase to ensure zero exposed credentials or API secrets.
- **`launch-readiness.test.ts`**: Validates SEO tags, structured data, canonical URLs, and hreflang definitions.

---

## Repository Structure

```
├── docs/                        # Architecture decisions, storyboard specs, launch plans
├── public/                      # Static brand assets, graphics, and icons
│   └── brand/
│       ├── graphics/            # Master artboards (artboard-1 through 4, clean covers)
│       └── logo/                # High-res Brand Eye emblems & wordmarks
├── scripts/                     # Asset processing & build utility scripts
├── src/                         # Application source code (Domain, Application, Infra, Presentation)
├── tests/                       # Unit, integration, architectural, and component tests
├── next.config.ts               # Next.js configuration (SWR headers, View Transitions)
├── tsconfig.json                # Strict TypeScript configuration
└── vitest.config.ts             # Vitest test configuration (Happy-DOM environment)
```

---

## License

Proprietary and Confidential. All rights reserved © BRANDMANIA. Unauthorized copying, modification, or distribution of this software or its brand artifacts is strictly prohibited.
