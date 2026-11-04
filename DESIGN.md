# BRANDMANIA — Design System & Art Direction Specification (`DESIGN.md`)

*Conforms to the `/awwwards` & `/jury` site-of-the-day creative standard.*

---

## 1. Concept Card

```
Idea:        An uncompromising, nocturnal luxury brand & commercial advisory stage aligning enterprise perception with commercial reality.
Metaphor:    The Imperial Vault & Editorial Atelier — where high-margin commercial truth is distilled through obsidian plum crystal and neon physics.
Signature:   The dual kinetic anchors: Alexandre Rochet scroll-choreographed work showcase (#work) and the Birch-inspired interactive 2D physics neon sticker playground in the footer.
Emotion:     Nocturnal authority, tactile prestige, commercial clarity, and kinetic joy within 3 seconds of load.
Motion verb: Settle like heavy velvet, unclip like physical exhibition plates, bounce like reactive neon stamps.
Screenshot:  The monumental asymmetric Hero stage pairing "Branded for the Best." in Instrument Serif against the luminous liquid violet marble monolith.
```

---

## 2. Art Direction System

### 2.1 Color Architecture: The Imperial Plum-Violet Palette
Every section abandons flat `#000000` / `#070709` monotony in favor of the rich, velvety **Deep Imperial Plum-Violet spectrum**:

#### Ground & Surface
- `--ground-primary`: `#0D011A` (Deep Midnight Eggplant base)
- `--ground-imperial`: `linear-gradient(165deg, #1A0033 0%, #0F0222 55%, #080012 100%)` (Global atmospheric gradient)
- `--ground-elevated`: `#1D0538` (Velvet Plum card and stage surface)
- `--ground-contrast`: `#260847` (Interactive hover, active states, and highlighted surfaces)
- `--ground-stage`: `linear-gradient(160deg, #230642 0%, #130126 100%)` (Regal Amethyst Exhibition Stage)

#### Ink & Typography
- `--ink-primary`: `#FAF7FF` (Warm Ultraviolet White — primary headings and high-contrast labels)
- `--ink-secondary`: `#C4B8D8` (Lavender-Tinted Editorial Body Copy — never dull industrial grey)
- `--ink-muted`: `#9A89B8` (Muted Lilac metadata, datum counters, and timestamps)

#### Structural Lines & Borders
- `--line-subtle`: `rgba(200, 130, 255, 0.16)` (Violet-tinted structural hairlines)
- `--line-active`: `rgba(200, 130, 255, 0.48)` (Hover and focused borders)
- `--line-accent`: `rgba(200, 130, 255, 0.85)` (Active indicators and markers)

#### Accents & Highlights
- `--accent-lilac`: `#C882FF` (Signature Electric Lilac for eyebrows, checkmarks, italic emphasis, and CTA buttons)
- `--accent-violet`: `#8E00FA` (Imperial Neon Violet)
- `--accent-glow`: `rgba(200, 130, 255, 0.45)` (Volumetric ambient blur behind artwork and CTAs)

#### Neon Sticker Palette (For Interactive Physics Playground)
- `--neon-lime`: `#CCFF00`
- `--neon-pink`: `#FF007F`
- `--neon-cyan`: `#00F0FF`
- `--neon-violet`: `#9D00FF`
- `--neon-amber`: `#FFE600`
- `--neon-orange`: `#FF4D00`

---

## 3. Typography & Micro-Architecture

| Role | Font Family | Weight | Size / Leading | Character |
|---|---|---|---|---|
| **Display Headings** | `Instrument Serif`, Georgia, serif | 400 | `clamp(2.8rem, 6.5vw, 6.2rem)` / `0.98` | Unapologetic editorial elegance, italicized emphases |
| **Section Eyebrows** | `JetBrains Mono`, monospace | 500 | `11px` / `1.4` / `tracking: 0.16em` | Monospace datum indexing, uppercase, Electric Lilac |
| **Editorial Body** | `Plus Jakarta Sans`, sans-serif | 400 / 500 | `clamp(1rem, 1.25vw, 1.15rem)` / `1.65` | Warm, lavender-tinted clarity with high legibility |
| **Technical Data & Labels** | `JetBrains Mono`, monospace | 400 / 600 | `12px - 14px` / `1.2` | Metric ledgers, diagnostic rows, code indicators |

---

## 4. Geometry & Layout Rhythm

1. **Structural Geometry:** Pure `0px` architectural border-radius on structural containers, cards, and stages. No pill containers for sections.
2. **Container Boundary:** Max-width `1480px` (`Container size="full"`), with responsive breathing room `padding: 0 clamp(1.5rem, 4vw, 4rem)`.
3. **Pacing & Spacing:** Generous breathing space `clamp(5rem, 11vw, 10rem)` per major section with crisp hairline dividers (`1px solid rgba(200, 130, 255, 0.16)`).
4. **Artboard Authenticity:** Artwork is presented in 100% uncropped physical artboard dimensions (`object-fit: contain`).

---

## 5. Kinetic Motion Choreography

1. **Hero Entry:** Fluid fade and upward glide of the monumental typography coupled with an atmospheric radial violet glow behind the liquid marble monolith.
2. **Turning-Point Diagnostic Router:** Interactive 4-row Stuurmen/Gatzara leverage loss selector revealing remedies and smooth-scrolling to corresponding disciplines.
3. **Alexandre Rochet Work Showcase (`#work`):** Scroll-linked parallax and scale-clip-path choreography. As each campaign deliverable enters the focal zone, it scales from `0.88` with `clipPath: inset(12% 8%)` into full `1.0` scale with `clipPath: inset(0%)`, synchronized with a sticky left/top kinetic HUD counter (`01 / 05` -> `05 / 05`).
4. **Birch 2D Physics Footer:** 60fps zero-dependency rigid-body physics engine raining down 20 neon stickers upon scroll entry, with realistic floor/wall collisions, rotational inertia, grab-and-fling mouse/touch gestures, and a "Shake / Respawn" trigger.
5. **Reduced Motion:** Strict respect for `prefers-reduced-motion: reduce` by disabling physics velocity loops and spring transforms in favor of clean static layouts.
