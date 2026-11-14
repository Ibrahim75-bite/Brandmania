# BRANDMANIA — Section Image & Visual Directions

**Document:** `docs/design/section-image-directions.md`  
**Framework:** Codex 5-Trick Redesign Framework — Module 04 (Background Images & Visual Directions)  
**Status:** Authoritative Visual Art Direction Specification  
**Authority:** `DESIGN.md`, `GLOSSARY.md`, `tokens.css`

---

## 1. Core Visual Principle: "Material Craft Over Generic Stock"

> **"Every visual asset on BRANDMANIA must represent verified physical craft, tactile editorial materiality, or mathematical precision. Generic tech stock photography, fake laptop mockups, and AI neon cyberpunk tropes are strictly forbidden."**

### Asset Prioritization Hierarchy:
1. **Existing Authentic Brand Assets (Tier 1):**
   - `public/brandmania-cover-clean.jpg` (Liquid obsidian and violet marble texture)
   - `public/brandmania-poster.jpg` (Physical folded monograph poster)
   - `public/brand/artboard-1-our.jpg` (Brand Mission & Ethos Creative)
   - `public/brand/artboard-2-services-branding.jpg` (Brand & Commercial Architecture)
   - `public/brand/artboard-3-services-social.jpg` (Social & Feed Campaign System)
   - `public/brand/artboard-4-brand-eye.jpg` (The Brand Eye Cultural Seal)
   - `public/brandmania-ad-agency-banner.jpg` (Omni-Channel Agency Banner)
   - `public/brand/founder/ibrahim-portrait-bw.jpg` (Founder black-and-white editorial portrait)
2. **Mathematical Vector Geometry (Tier 2):**
   - Precision SVG BrandEye (`src/presentation/components/brand/BrandEye.tsx`)
   - Corner Arcs registration marks (`src/presentation/components/brand/CornerArcs.tsx`)
3. **New Bespoke AI Image Generation (Tier 3 — Only where real visual gaps exist):**
   - Formulated with precise prompts, lighting guidelines, and negative prompts below.

### Image Format & Weight Guardrails:
- **Encoding Standard:** All delivery exhibition assets and background plates must be served in modern WebP or AVIF format.
- **Strict File-Weight Budget:** Maximum `<120KB` for monumental hero and marble monolith plates; maximum `<85KB` for exhibition artboard plates.
- **Uncropped Staging Standard:** All work deliverable frames must use `object-fit: contain` on an exhibition plane, ensuring zero edge cropping of typography or physical borders. Backgrounds remain pure CSS gradients or subtle SVG coordinate grids.

---

## 2. Section-by-Section Visual & Image Specifications

### Section 01: Hero Section (`#hero`)
- **Headline / Message:** "Branded for the Best. When an enterprise is better than it looks, its brand is costing it margin."
- **Desired Emotion:** High-status arrival, profound stillness, intellectual invulnerability.
- **Background Role:** Nocturnal atmospheric depth; dramatic framing for the central BrandEye monolith.
- **Primary Visual Asset:** `public/brandmania-cover-clean.jpg` (Liquid Violet Marble).
  - *Correction Required:* Elevate opacity from `0.001` to `0.72` with backlighting.
- **Composition & Safe Area:** Monolith occupies the central vertical column (`col-span-4` to `col-span-5`). Safe text margins on left (headline and CTA) and right (discipline matrix).
- **Lighting & Color:** Deep obsidian ground (`#0D011A`) illuminated by a radial electric lilac aura (`rgba(200, 130, 255, 0.35)`).
- **Style:** High-resolution tactile liquid marble sculpture.
- **Responsive Cropping:** Center-focal crop (`object-fit: cover, object-position: center`); on mobile, stacks beneath the headline as an atmospheric backdrop behind the BrandEye.
- **Accessibility:** Text sits on solid high-contrast dark overlay (`#0D011A` with contrast ratio > 12:1 against `--ink-primary`).

---

### Section 02: Worldview Section (`#manifesto`)
- **Headline / Message:** "Branding is not what it looks like. It is how you communicate. Attention does not mean revenue."
- **Desired Emotion:** Intellectual focus, philosophical weight.
- **Visual Role:** Pure typographic editorial spread. Zero decorative stock photos.
- **Visual Texture:** Continuous film grain via `NoiseOverlay` (`patternAlpha={9}`).
- **Divider:** Subtle hairline vector rule (`1px solid rgba(200, 130, 255, 0.16)`).

---

### Section 03: Dilemma Section (`#dilemma`)
- **Headline / Message:** "Traffic buys attention. It does not buy loyalty. Brand architecture commands margin."
- **Desired Emotion:** Cognitive awakening; recognition of commercial leakage.
- **Visual Role:** Asymmetrical split stage.
- **Left Column ("The Commodity Trap"):** Muted charcoal ground (`#130126`), representing friction and margin depletion.
- **Right Column ("Category Leadership"):** Elevated velvet plum (`#1D0538`) with hairline Electric Lilac accentuation, representing structural clarity.
- **Visual Geometry:** Crisp 0px borders with interactive diagnostic routing arrows.

---

### Section 04: System Section (`#system`)
- **Headline / Message:** "From perception upstream to cash flow downstream."
- **Desired Emotion:** Structural comprehension of the causal value chain.
- **Visual Role:** Architectural technical blueprint / flow schematic.
- **Visual Asset:** Precision SVG vector conduit connecting 6 circular nodes.
- **Optional Background Graphic:** Subtle blueprint coordinate grid (`100px` grid hairlines at `opacity: 0.04`).

---

### Section 05: Brand Direction Section (`#brand-direction`)
- **Headline / Message:** "Aligning what you are with what the market perceives."
- **Desired Emotion:** Awe at tangible brand architecture and physical artifact craft.
- **Primary Visual Assets:**
  - Tab 01: `public/brandmania-ad-agency-banner.jpg` (Brand & Commercial Architecture)
  - Tab 02: `public/brandmania-poster.jpg` (Physical folded monograph poster)
- **Exhibition Stage:** Rendered on elevated velvet plum stage (`#1D0538`) with Corner Arcs registration marks at `24px` radius.
- **Uncropped Standard:** Both images must use `object-fit: contain` with high-resolution clarity; zero edge cropping.

---

### Section 06: Margin Recovery Section (`#margin-recovery`)
- **Headline / Message:** "Fix the commercial machine before buying more traffic."
- **Desired Emotion:** Financial discipline, executive relief, forensic rigor.
- **Visual Role:** High-contrast financial audit ledger.
- **Asset Type:** Pure UI typography and tabular grid styling. Zero distracting background images.
- **Accentuation:** Active ledger row illuminated with subtle violet highlight (`#260847`) and electric lilac status pill.

---

### Section 07: Consumer Scope Section (`#consumer-scope`)
- **Headline / Message:** "Every touchpoint engineered through human behavior."
- **Desired Emotion:** Deep psychological curiosity; recognition of behavioral leverage.
- **Primary Visual Asset:** Interactive BrandEye Optical Aperture.
- **Visual Treatment:** Center BrandEye vector rendered at `180px` diameter with concentric orbit rings in `rgba(200, 130, 255, 0.2)`. Clicking any of the 7 dimensions rotates the aperture coordinates.

---

### Section 08: Artifact Gallery Section (`#work`)
- **Headline / Message:** "Uncompromised physical and digital materiality."
- **Desired Emotion:** Executive reverence for extraordinary craft.
- **Visual Assets (The 5 Plates):**
  1. `public/brand/artboard-1-our.jpg` — Brand Mission & Ethos Creative
  2. `public/brand/artboard-2-services-branding.jpg` — Brand & Commercial Architecture
  3. `public/brand/artboard-3-services-social.jpg` — Social & Feed Campaign System
  4. `public/brand/artboard-4-brand-eye.jpg` — The Brand Eye Cultural Seal
  5. `public/brandmania-ad-agency-banner.jpg` — Omni-Channel Agency Banner
- **Choreography:** Presented as full-scale museum plates with dynamic clip-path reveals and sticky HUD counter.

---

### Section 09: Capabilities Section (`#capabilities`)
- **Headline / Message:** "Integrated capabilities across marketing, operations, and AI."
- **Desired Emotion:** Reassurance of enterprise delivery capacity.
- **Visual Role:** Editorial broadsheet matrix divided by crisp hairline borders.

---

### Section 10: Qualification Section (`#qualification`)
- **Headline / Message:** "Request a Strategic Consultation — Protected Under Bilateral Mutual NDA."
- **Desired Emotion:** Trust, exclusivity, confidentiality, institutional safety.
- **Visual Role:** Crisp executive dossier form.
- **Accompanying Trust Artifact:** Official Bilateral NDA Protocol badge featuring hairline shield geometry and reference hash formatting.

---

## 3. Bespoke Image-Generation Prompts (For Visual Expansion If Required)

If supplemental thematic imagery is ever required for sub-pages or editorial publications (e.g., `/insights`), use these production-ready prompts conforming strictly to the brand visual world:

### Prompt A: Nocturnal Editorial Marble Sculpture
```text
Macro studio photography of a monolithic obsidian and deep violet marble sculpture with swirling veins of ultraviolet and electric lilac, matte velvety stone texture mixed with polished crystalline fissures, dramatic single-source chiaroscuro lighting from top-left, deep black background with subtle purple ambient haze, ultra-sharp detail, Hasselblad H6D-100c medium format look, 8k resolution, Swiss editorial magazine aesthetic --ar 16:9 --style raw --v 6.0
```
- **Negative Prompt:**
```text
bright colors, saturated rainbow, neon glow, cyber, futuristic hud, digital wireframe, generic 3d render, plastic, shiny glassmorphism, text, watermark, laptop, stock photo, low resolution
```

### Prompt B: Physical Folded Architectural Monograph
```text
High-end editorial studio still-life of a heavy archival cotton paper monograph poster folded in eighths, crisp geometric folds, tactile letterpress embossing in ultraviolet ink on deep plum paper stock, resting on a brushed dark slate surface, soft diffused studio lighting, shallow depth of field, architectural monograph catalog standard, high craft, uncropped --ar 4:3 --style raw --v 6.0
```
- **Negative Prompt:**
```text
crumpled, dirty paper, torn edges, glossy magazine, fake mockup, digital screen, floating objects, cartoon, flat vector
```

