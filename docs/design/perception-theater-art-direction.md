# BRANDMANIA — The Perception Theater Art Direction Specification

**Document:** `docs/design/perception-theater-art-direction.md`  
**Framework:** Codex 5-Trick Redesign Framework — Phase 1 Design System  
**Status:** Authoritative Visual Art Direction Specification  
**Authority:** `DESIGN.md`, `GLOSSARY.md`, `tokens.css`, `docs/superpowers/specs/`

---

## 1. Creative Concept & Narrative Metaphor

```
Title:       THE PERCEPTION THEATER
Subtitle:    The Imperial Vault & Editorial Atelier
Atmosphere:  Nocturnal prestige, mathematical precision, editorial stillness, uncropped tactile craft.
Core Anchor: Aligning enterprise perception with commercial reality.
Emotional Tone: High-status intellectual authority, aesthetic invulnerability, commercial clarity.
```

The site does not present itself as a standard digital agency or software landing page. It operates as an **art-directed campaign, editorial visual essay, contemporary brand exhibition, and cinematic brand experience**.

Every section feels authored by a master design studio and commercial consultancy working in unison.

---

## 2. Authentic Brand Assets & Visual Geometry

### 2.1 The Brand Eye (`src/presentation/components/brand/BrandEye.tsx`)
- **Nature:** The proprietary mathematical seal of BRANDMANIA. It symbolizes the convergence of **perceptual authority, commercial leverage, and psychological lock-in**.
- **Geometry:** A precision SVG vector consisting of concentric elliptical orbits, focal aperture geometry, and cardinal coordinate marks.
- **Roles in Interface:**
  1. *Hero Center Monolith:* Sits as the luminous anchor in the center of the asymmetric hero stage.
  2. *Header Seal:* Scaled to `size="sm"` (28px) alongside the monumental wordmark.
  3. *Flagship III Interactive Focal Lens:* In ConsumerScope, it acts as the optical lens through which the 7 behavioral dimensions are examined.
  4. *Cultural Seal Plate:* Featured in ArtifactGallery plate 04 (`artboard-4-brand-eye.jpg`).

### 2.2 Corner Arcs (`src/presentation/components/brand/CornerArcs.tsx`)
- **Nature:** Delicate, mathematical corner registration marks echoing luxury horology, Swiss editorial broadsheets, and architectural drafting blueprints.
- **Styling:** Hairline arcs with radius `24px` rendered in `rgba(200, 130, 255, 0.24)`.
- **Placement:** Anchoring the corners of major stage containers, artboard exhibition frames, and modal dialogs.

### 2.3 The Liquid Violet Marble Monolith (`public/brandmania-cover-clean.jpg`)
- **Nature:** A tactile, swirling organic obsidian-and-violet liquid marble artwork representing the fluid, subconscious nature of consumer perception.
- **Critical Correction Needed:** Currently rendered at `opacity: 0.001` in `HeroSection.tsx` L109. It must be brought to **rich 70%+ opacity** with layered radial violet ambient backlighting (`rgba(200, 130, 255, 0.45)`).

### 2.4 Uncropped Physical Artboards (`public/brandmania-poster.jpg` & `public/brand/`)
- **Rule:** 100% uncropped physical artboard rule (`object-fit: contain`). No arbitrary bleed cropping that hides typography, margins, or structural borders.
- **Assets:**
  - `brandmania-poster.jpg`: The physical folded monograph poster.
  - `artboard-1-our.jpg`: Brand Mission & Ethos Creative.
  - `artboard-2-services-branding.jpg`: Brand & Commercial Architecture.
  - `artboard-3-services-social.jpg`: Social & Feed Campaign System.
  - `artboard-4-brand-eye.jpg`: The Brand Eye Cultural Seal.
  - `brandmania-ad-agency-banner.jpg`: Omni-Channel Agency Banner.

---

## 3. Color Architecture: The Imperial Plum-Violet & Alabaster Spectrum

Every surface, line, and ink tone strictly derives from `tokens.css` and `DESIGN.md`:

```css
:root {
  /* GROUND & SURFACES */
  --ground-primary: #0D0118;      /* Deep Midnight Eggplant base */
  --ground-imperial: linear-gradient(165deg, #1A0033 0%, #0F0222 55%, #080012 100%);
  --ground-elevated: #160429;     /* Velvet Plum stage surface */
  --ground-contrast: #1C0633;     /* Active, hover & highlighted surfaces */
  --ground-alabaster: #F3F0EA;    /* Warm Museum Alabaster Exhibition Plane for Section 05 */

  /* INK & TYPOGRAPHY */
  --ink-primary: #FAF7FF;         /* Warm Ultraviolet White — headings */
  --ink-secondary: #C4B8D8;       /* Lavender-Tinted Editorial Body Copy */
  --ink-muted: #A8A0B8;           /* Muted Lilac datum counters & metadata */

  /* STRUCTURAL LINES & HAIRLINES */
  --line-subtle: rgba(200, 130, 255, 0.16);  /* 1px hairline grid borders */
  --line-active: rgba(200, 130, 255, 0.48);  /* Interactive border hover */
  --line-accent: rgba(200, 130, 255, 0.85);  /* Focus & active markers */

  /* SIGNATURE ACCENTS & DIAGNOSTIC INDICATORS */
  --accent-lilac: #C882FF;        /* Signature Electric Lilac accent */
  --accent-violet: #8E00FA;       /* Imperial Neon Violet */
  --indicator-leakage: #D48A9E;   /* Subdued Rose-Plum commercial leakage indicator */
  --accent-glow: rgba(200, 130, 255, 0.45); /* Volumetric ambient glow */

  /* NEON PHYSICS STAMP ACCENTS */
  --neon-lime: #CCFF00;
  --neon-pink: #FF007F;
  --neon-cyan: #00F0FF;
  --neon-amber: #FFE600;
  --neon-orange: #FF4D00;
}
```

---

## 4. Typography & Editorial Hierarchy

| Role | Font Family | Weight | Size / Line-Height | Styling & Character |
|---|---|---|---|---|
| **Monumental Display Headings** | `Instrument Serif`, serif | 400 | `clamp(2.8rem, 6.5vw, 6.2rem)` / `0.98` | Dramatic italic emphasis on key nouns; editorial elegance |
| **Section Eyebrows & Index** | `JetBrains Mono`, monospace | 500 | `11px` / `1.4` / `tracking: 0.16em` | Monospace datum indexing (e.g. `05 — FLAGSHIP I • BRAND DIRECTION`) |
| **Editorial Body Copy** | `Plus Jakarta Sans`, sans-serif | 400 / 500 | `clamp(1rem, 1.25vw, 1.15rem)` / `1.65` | Warm, lavender-tinted clarity with high legibility |
| **Data, Ledgers & Metrics** | `JetBrains Mono`, monospace | 400 / 600 | `12px – 14px` / `1.2` | Financial and diagnostic precision, tabular figures |

---

## 5. Architectural Geometry Rules

1. **Zero-Radius Grid Rule:** Pure `0px` architectural border-radius on structural containers, cards, stages, and modals. Pill containers are strictly forbidden for section containers.
2. **Hairline Structural Division:** All section dividers and grid borders use `1px solid var(--line-subtle)`. No thick dropshadows or heavy bevels.
3. **Film Grain Texture:** Subtle analog film grain rendered continuously via `NoiseOverlay` (`patternAlpha={9}`) across the viewport, giving digital screens the tactile grain of high-grade editorial paper.
4. **Volumetric Radial Backlighting:** Heroic artifacts (the marble monolith, active artboard plates, BrandEye) sit atop subtle, diffused radial violet gradients (`rgba(200, 130, 255, 0.25)` to `transparent`), creating atmospheric depth without flat neon glare.

