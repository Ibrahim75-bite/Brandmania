# BRANDMANIA — Section Motion & Interaction Specifications

**Document:** `docs/design/section-motion-specifications.md`  
**Framework:** Codex 5-Trick Redesign Framework — Module 03 (Motion Graphics)  
**Status:** Authoritative Motion Choreography Specification  
**Authority:** `DESIGN.md`, `GLOSSARY.md`, `docs/superpowers/specs/`

---

## 1. Core Motion Philosophy: "Settle Like Heavy Velvet"

> **"Motion must reveal structure, guide executive cognition, and demonstrate commercial causality. It must never decorate for vanity or hijack user scroll."**

### Universal Motion Rules:
1. **No Scroll Hijacking:** Native browser scroll velocity is strictly preserved. All animations are scroll-linked progress transforms or viewport-intersection reveals.
2. **Zero Involuntary Loops:** No continuous distracting pulsing, spinning, or marquee tickers that fatigue executive readers.
3. **Strict Reduced-Motion Parity:** When `prefers-reduced-motion: reduce` is detected, all scale/clip-path transforms snap immediately to `opacity: 1` and `transform: none`.
4. **Performance Target:** Sustained 60fps on modern desktop and mobile browsers via GPU-accelerated properties only (`transform`, `opacity`, `clip-path`).
5. **Mandatory Execution Guardrail:** Every animation must use compositor-friendly properties (`transform`, `opacity`, `clip-path`). All continuous physics loops (e.g. footer) and animated canvas contexts MUST automatically pause when out of viewport via `IntersectionObserver` or when the tab is hidden via `document.visibilityState === 'hidden'`, ensuring zero background CPU/battery drain.

---

## 2. Section-by-Section Motion Specifications

### Section 01: Hero Section (`#hero`)
- **Motion Concept:** "The Asymmetric Monumental Arrival"
- **Why It Fits:** Establishes stillness, gravity, and supreme self-confidence. Fast, bouncy arrivals feel like consumer apps; slow, deliberate settling feels like an institution.
- **Sequence:**
  1. *Initial:* Background ambient radial glow at 0; headlines at `y: 28px, opacity: 0`; BrandEye at `scale: 0.94, opacity: 0`; monolith marble at `scale: 1.05, opacity: 0`.
  2. *Trigger:* Window load / hydration complete.
  3. *Transition:*
     - Monolith marble fades in to 75% opacity over `1.2s` (`cubic-bezier(0.16, 1, 0.3, 1)`).
     - Display headline ("Branded for the Best.") rises with `y: 0, opacity: 1` over `0.9s` with a `0.15s` delay.
     - BrandEye settles into focal center (`scale: 1.0, opacity: 1`) over `1.1s` with a gentle `0.25s` delay.
     - Supporting copy and primary CTA buttons fade in smoothly at `0.45s` delay.
  4. *Elements NOT to Animate:* Top navigation bar borders, qualification badge copy.
  5. *Mobile Behavior:* Disable staggered delays; simultaneous simple fade-in over `0.5s` to avoid rendering lag on mobile CPUs.
  6. *Reduced Motion:* All elements render at full opacity and final layout immediately.
  7. *Implementation:* CSS keyframes or lightweight `motion/react` with `ease: [0.16, 1, 0.3, 1]`.

---

### Section 02: Worldview Section (`#manifesto`)
- **Motion Concept:** "Typographic Stillness & Focal Illumination"
- **Why It Fits:** This is an intellectual intermission. The motion should mirror reading a fine edition art book.
- **Sequence:**
  - Viewport entry at 25% threshold triggers text opacity fade from `rgba(250, 247, 255, 0.2)` to `1.0` over `0.8s`.
  - Subtle hairline divider expands horizontally from center (`width: 0%` to `100%`) over `0.9s`.
- **Implementation:** Pure CSS `transition` driven by `IntersectionObserver`.

---

### Section 03: Dilemma Section (`#dilemma`)
- **Motion Concept:** "The Contrast Split & Interactive Diagnostic Route"
- **Why It Fits:** Physically contrasts the chaotic friction of the "Commodity Trap" with the structured calm of "Category Leadership."
- **Sequence:**
  - *Initial:* Two structural columns separated by a vertical hairline divider.
  - *Trigger:* Viewport entry reveals both columns simultaneously.
  - *Interaction (Diagnostic Router):* Hovering over a symptom row expands the active row height slightly (from 48px to 64px), transitions background to `--ground-contrast`, and illuminates the right-hand discipline remedy with a smooth arrow displacement (`x: +6px`).
- **Implementation:** CSS transitions (`cubic-bezier(0.2, 0.8, 0.2, 1)`).

---

### Section 04: System Section (`#system`)
- **Motion Concept:** "The Continuous Value Conduit"
- **Why It Fits:** Proves that perception, psychology, pricing, and cash flow are interconnected stages of a single commercial pipeline.
- **Sequence:**
  - *Initial:* 6 sequential nodes (Perception Upstream → Cash Flow Downstream) arranged horizontally or as an architectural pipeline.
  - *Trigger:* Scroll progress through the section container (`useScroll`).
  - *Transition:* An illuminated SVG conduit stroke (`strokeDashoffset`) fills from node 1 to node 6 in direct proportion to scroll depth. As the stroke reaches each node circle, the node datum illuminates from muted lilac (`#9A89B8`) to Electric Lilac (`#C882FF`) with a subtle `1.08` scale pulse.
- **Implementation:** SVG `path` with `stroke-dasharray` and `stroke-dashoffset` linked to scroll percentage via `framer-motion` / `motion/react`.

---

### Section 05: Brand Direction Section (`#brand-direction`)
- **Motion Concept:** "Exhibition Plate Unclipping"
- **Why It Fits:** Mirrors the physical handling of rare architectural prints and museum monograph posters.
- **Sequence:**
  - *Tab Switch Interaction:* Clicking between "01 / BRAND & COMMERCIAL ARCHITECTURE" and "02 / PHYSICAL FOLDED MONOGRAPH POSTER":
    - Current plate smoothly scales down to `0.98` with `opacity: 0` over `0.25s`.
    - Incoming plate enters with `scale: 1.0` and `opacity: 1` over `0.35s` (`easeOutCubic`).
    - Hairline active tab indicator slides across the tab bar using `layoutId` spring animation.
- **Implementation:** `motion.div` with `AnimatePresence mode="wait"`.

---

### Section 06: Margin Recovery Section (`#margin-recovery`)
- **Motion Concept:** "The Forensic Ledger Trace"
- **Why It Fits:** Simulates an executive balance-sheet audit scanning across operational stages.
- **Sequence:**
  - *Initial:* 6 audit rows (Planning, Marketing, Sales, Fulfillment, Support, Retention) stacked as a financial ledger.
  - *Hover State:* Moving cursor over a row expands the row's diagnostic detail panel, changes the status marker from subtle lilac to bright Electric Lilac (`#C882FF`), and highlights the recovery value mechanism.
  - *No Auto-Playing Loops:* The ledger remains quiet until interacted with.
- **Implementation:** CSS Grid transitions on row hover.

---

### Section 07: Consumer Scope Section (`#consumer-scope`)
- **Motion Concept:** "The BrandEye Optical Aperture"
- **Why It Fits:** Reflects the core metaphor of looking through an optical lens into human behavioral psychology.
- **Sequence:**
  - *Interaction:* Clicking any of the 7 behavioral dimensions triggers the BrandEye center graphic to rotate smoothly by `(360 / 7) deg` (`~51.4°`) with an aperture expansion spring.
  - *Text Pane Transition:* The right-hand thesis copy slides upward by `12px` and cross-fades into the new dimension's principle quote and analytical thesis over `0.3s`.
- **Implementation:** Framer Motion spring physics (`stiffness: 180, damping: 24`).

---

### Section 08: Artifact Gallery Section (`#work`)
- **Motion Concept:** "Alexandre Rochet Scroll-Choreographed Exhibition Showcase"
- **Why It Fits:** Confirmed in `DESIGN.md` as one of the platform's two signature kinetic anchors.
- **Sequence:**
  - Section container is set to a multi-screen sticky height (`500vh` or continuous pinned track).
  - As user scrolls, each of the 5 campaign deliverable plates transitions through three distinct phases:
    1. *Entry Phase:* Plate enters from bottom, scaling from `0.88` to `1.0` with `clipPath: inset(12% 8% 12% 8%)` expanding to `clipPath: inset(0% 0% 0% 0%)`.
    2. *Focal Stasis:* Plate locks into viewport center at 100% uncropped scale; sticky HUD counter (`01 / 05` to `05 / 05`) increments.
    3. *Exit Phase:* Plate scales slightly up (`1.04`) and fades out (`opacity: 0`) as the next plate arrives.
- **Reduced Motion:** Transforms into a standard responsive vertical stack with static full-bleed cards.
- **Implementation:** `motion/react` `useScroll` + `useTransform`.

---

### Section 09: Capabilities Section (`#capabilities`)
- **Motion Concept:** "The Systematic Ledger Unfold"
- **Why It Fits:** Communicates operational breadth without cluttered animations.
- **Sequence:**
  - 3 capability clusters (Communication, Commercial Ops, AI Systems) fade in sequentially (`0.1s` stagger) as the section enters viewport.
  - Subtle border highlight on card hover (`rgba(200, 130, 255, 0.48)`).

---

### Section 10: Qualification Section (`#qualification`)
- **Motion Concept:** "Executive Stepper Cross-Fade"
- **Why It Fits:** Minimizes cognitive load; makes a 3-step enterprise form feel effortless.
- **Sequence:**
  - Advancing from Step 1 → Step 2 → Step 3 performs an instant horizontal slide and cross-fade (`x: 16px` to `0px`, `opacity: 0` to `1` over `0.22s`).
  - Active step indicator progress bar expands smoothly.
  - If validation error occurs, field shakes horizontally (`x: [-4px, 4px, -2px, 2px, 0]` over `0.3s`).
  - Upon submission, optimistic spinner dissolves into the success confirmation card issuing the Reference Dossier ID.

---

### Section 11: The Footer Kinetic Anchor (Birch 2D Physics Playground)
- **Motion Concept:** "Interactive 2D Rigid-Body Kinetic Neon Stamps"
- **Why It Fits:** Confirmed in `DESIGN.md` as the second signature kinetic anchor. Provides kinetic delight and memorable brand stickiness at the end of the journey.
- **Sequence:**
  - When footer scrolls into view, 20 neon stickers (Lime, Pink, Cyan, Violet, Amber, Orange) drop into the footer container under realistic gravity (`9.8 m/s²`).
  - Stickers collide with each other and container boundaries with authentic bounciness (restitution: 0.65).
  - User can click, drag, and fling any sticker across the stage.
  - "Shake / Respawn" button re-drops the stickers from the ceiling.
- **Reduced Motion:** Physics engine does NOT initialize; stickers sit neatly in an architectural static grid.
- **Implementation:** Zero-dependency Canvas 2D / Matter.js rigid-body physics loop.

