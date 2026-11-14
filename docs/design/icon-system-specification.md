# BRANDMANIA — Icon & Visual Symbology Specification

**Document:** `docs/design/icon-system-specification.md`  
**Framework:** Codex 5-Trick Redesign Framework — Module 05 (Icons That Fit the Brand)  
**Status:** Authoritative Iconography Specification  
**Authority:** `DESIGN.md`, `GLOSSARY.md`, `tokens.css`

---

## 1. First Principle: "Restraint Over Decoration"

> **"Icons must never be used as decorative filler or clip art. Wherever typography, monospace data, mathematical Corner Arcs, or the BrandEye communicates with greater authority, omit the icon."**

### Strict Rules:
1. **Zero Emojis:** Emojis (✨, 🚀, 💡, 💰, 🧠) are strictly forbidden across all public and internal interfaces.
2. **Zero Skeuomorphic Clichés:** No lightbulbs for "ideas", no gears for "systems", no rockets for "growth", no shopping carts for "commerce", no cartoon brains for "consumer psychology".
3. **No Standalone Cryptic Icons:** Every functional icon must be paired with an explicit typographic label or aria-label.
4. **Architectural Consistency:** All icons share identical stroke weight, corner geometry, and optical volume.

---

## 2. Icon System Architecture

### 2.1 Style & Geometry Specifications
- **Grid Size:** Built on a strict `24×24px` coordinate grid with a `20×20px` optical safe box (2px padding).
- **Stroke Weight:** Consistent `1.5px` uniform hairline stroke.
- **Caps & Joins:** Sharp miter or minimal `1px` crisp architectural corner radius (`stroke-linecap: round; stroke-linejoin: round;`).
- **Fill:** Zero solid fills by default. Icons are pure linear geometry (`fill: none; stroke: currentColor;`).
- **Perspective:** Strictly two-dimensional orthogonal projection; no isometric angles, drop-shadows, or pseudo-3D bevels.

### 2.2 Color States & Tonal Tokens
- **Default State:** `--ink-secondary` (`#C4B8D8` — subtle lavender editorial ink).
- **Hover / Active State:** `--accent-lilac` (`#C882FF` — signature Electric Lilac).
- **Muted / Metadata State:** `--ink-muted` (`#9A89B8` — muted lilac).
- **Warning / Alert State:** `--neon-amber` (`#FFE600`).
- **Verified / Encrypted State:** `--neon-cyan` (`#00F0FF`) or `--accent-lilac`.

### 2.3 Size Hierarchy
| Size Token | Pixel Dimension | Usage Context |
|---|---|---|
| **Micro** | `14×14px` | Monospace inline metadata, form input indicators, verification badges |
| **Standard** | `18×18px` | Navigation links, button chevrons, interactive tab actions |
| **Featured** | `24×24px` | Section trust indicators (NDA shield, SSL lock, Dossier seal) |
| **Macro** | `48×48px` | Replaced by the proprietary **BrandEye** or architectural diagrams |

---

## 3. Approved Functional Symbology Set

### Category I: Strategic Navigation & Interface Utilities
1. **Editorial Arrow (`ArrowRight` / `ArrowUpRight`):**
   - *Form:* Ultra-fine 45° or 90° vector arrow with straight shaft and 90° head.
   - *Role:* Directs attention toward external links or sequential flows (e.g. `Explore Work →`).
2. **Close / Dismiss (`X`):**
   - *Form:* Two intersecting hairlines at 45°. Used in modal closures and notification toasts.
3. **Command Palette (`Command` / `⌘`):**
   - *Form:* Standard architectural looped square indicating the `Index ⌘K` palette.

### Category II: Institutional Trust & Governance
1. **Bilateral NDA Protocol (`Shield`):**
   - *Form:* Minimalist 5-sided geometric polygon with centered vertical hairline division.
   - *Avoid:* Heavy fantasy knight shields or metallic badges.
2. **Encrypted Vault (`Lock`):**
   - *Form:* Rectangular body with hairline arched shackle and centered keyhole aperture.
   - *Role:* Signifies mutual non-disclosure and secure data transmission in `QualificationForm.tsx`.
3. **Reference Dossier Seal (`FileText` / `Hash`):**
   - *Form:* Minimalist document silhouette with 3 horizontal data lines and a small hash index.
   - *Role:* Identifies the generated `inq_...` Dossier ID upon submission.

### Category III: The Flagship Disciplines — Geometric Glyphs
Instead of generic icons, each flagship discipline is represented by an **abstract mathematical vector mark derived from the BrandEye geometry**:

| Flagship Discipline | Mathematical Glyph Description | What It Symbolizes | Cliché to Strictly Avoid |
|---|---|---|---|
| **01 — Brand Direction** | Dual concentric intersecting ellipses with horizontal alignment axis | Optical alignment of enterprise reality with market perception | Compass, target, lighthouse |
| **02 — Margin Recovery** | Stepped rectangular ledger balance node with an ascending diagonal vector | Forensic balance-sheet repair and upward margin capture | Dollar sign, bar chart, piggy bank |
| **03 — Consumer Scope** | Concentric optical aperture iris with radiant cardinal coordinate ticks | Behavioral decision architecture and focal human psychology | Brain, eye with eyelashes, lightbulb |

---

## 4. Production Prompts for Custom Vector Generation (SVG)

When generating or coding new vector assets for this system, adhere strictly to this technical specification:

```xml
<!-- Canonical Architectural SVG Template -->
<svg 
  xmlns="http://www.w3.org/2000/svg" 
  width="24" 
  height="24" 
  viewBox="0 0 24 24" 
  fill="none" 
  stroke="#C882FF" 
  stroke-width="1.5" 
  stroke-linecap="round" 
  stroke-linejoin="round"
  aria-hidden="true"
>
  <!-- Architectural Geometry Here -->
</svg>
```

### Production Family Generation Prompt (for SVG Icon Design Tools)
```text
A unified set of 12 minimalist Swiss editorial architectural icons designed for a nocturnal high-ticket brand advisory website. Style: pure 1.5px hairline stroke on a 24x24 pixel grid, fill: none, sharp geometric joins, ultraviolet white and electric lilac monochrome line art, no fills, no gradients, no skeuomorphism, no cartoon curves. Symbols include: geometric bilateral shield, precision encrypted lock, 45-degree hairline arrow, architectural compass mark, 6-stage linear conduit, and concentric elliptical optical iris. Professional, mathematical, high-status.
```

