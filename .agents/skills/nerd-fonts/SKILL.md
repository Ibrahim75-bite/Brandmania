---
name: nerd-fonts
description: Use when searching for, referencing, or integrating iconic Nerd Fonts glyphs, developer logos, terminal icons, Unicode symbols, or font-based badges into UI, CLI, or design systems.
---

# Nerd Fonts — Developer Icon & Glyph Reference

A comprehensive tool and reference guide for **Nerd Fonts** (v3.5+), providing over 10,000 iconic glyphs aggregated from developer fonts, iconic font families, and UI icon sets.

Local reference assets:
- Glyph Database: [`references/nerd-fonts/glyphnames.json`](file:///e:/Ibrahim's%20website/references/nerd-fonts/glyphnames.json)
- CSS Webfont Stylesheet: [`references/nerd-fonts/css/nerd-fonts-generated.css`](file:///e:/Ibrahim's%20website/references/nerd-fonts/css/nerd-fonts-generated.css)
- SVG Vector Sources: [`references/nerd-fonts/src/svgs/`](file:///e:/Ibrahim's%20website/references/nerd-fonts/src/svgs/)

---

## Instant Glyph Search Tool

Run the local lookup utility to search for any glyph by name, technology, or unicode hex:

```bash
# Search by keyword
node .agents/skills/nerd-fonts/scripts/search-glyphs.js "react"
node .agents/skills/nerd-fonts/scripts/search-glyphs.js "git"
node .agents/skills/nerd-fonts/scripts/search-glyphs.js "database"

# Search by unicode codepoint
node .agents/skills/nerd-fonts/scripts/search-glyphs.js --code e83e
```

The tool instantly outputs:
1. **Icon Key** (e.g. `dev-nextjs`, `fa-github`, `cod-terminal`)
2. **UTF-8 Glyph Character**
3. **Unicode Hex** (`U+E83E` / `\uE83E`)
4. **CSS Class** (`nf nf-nextjs`, `nf nf-dev-nextjs`)
5. **JSX / TSX Escape** (`<span>{"\uE83E"}</span>`)
6. **HTML Entity** (`&#xe83e;`)

---

## Icon Sets & Unicode Code Ranges

Nerd Fonts patches and aggregates multiple iconic font families into private use areas:

| Icon Set | Prefix | Unicode Range | Example Glyphs |
| :--- | :--- | :--- | :--- |
| **Devicons** | `dev-` | `E700` – `E7C5` | React (`\uE7BA`), Docker (`\uE7B0`), Git (`\uE702`), Node (`\uE719`), Next.js (`\uE83E`) |
| **Seti-UI** | `seti-` | `E5FA` – `E631` | TypeScript (`\uE628`), Python (`\uE606`), JSON (`\uE60B`), Config files |
| **Font Awesome** | `fa-` | `F000` – `F2E0` | Star (`\uF005`), Check (`\uF00C`), Heart (`\uF004`), Arrow (`\uF061`) |
| **Font Awesome Extension**| `fae-` | `E000` – `E00A` | Chip, Atom, Brain, DNA |
| **Material Design Icons** | `md-` | `F500` – `FD46` | Modern UI actions, devices, system states |
| **Octicons** | `oct-` | `F400` – `F4A9` | GitHub Octocat, Pull Request, Commit, Issue |
| **Powerline Glyphs** | `pl-` | `E0A0` – `E0A2`, `E0B0` – `E0B3` | Arrows (`\uE0B0`), Triangles (`\uE0B2`), Branches (`\uE0A0`) |
| **Codicons** | `cod-` | `EA60` – `EBEB` | VS Code UI symbols, Breakpoint, Debug, Split |
| **Font Logos** | `fl-` | `F300` – `F372` | OS logos (Linux, Apple, Windows, Ubuntu, Arch, Fedora) |
| **Weather Icons** | `weather-` | `E300` – `E3EB` | Sun, Rain, Lightning, Cloud |

---

## Integration Recipes

### 1. In React / Next.js (Direct Unicode Character)
When a font supporting Nerd Fonts (such as JetBrains Mono Nerd Font, FiraCode Nerd Font, or webfont) is active:
```tsx
export function TechBadge({ name, iconUnicode }: { name: string; iconUnicode: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-sm">
      <span aria-hidden="true">{iconUnicode}</span>
      <span>{name}</span>
    </span>
  );
}

// Usage:
<TechBadge name="Next.js" iconUnicode="\uE83E" />
<TechBadge name="React" iconUnicode="\uE7BA" />
<TechBadge name="TypeScript" iconUnicode="\uE628" />
```

### 2. In CSS / Webfonts
Link the generated stylesheet or CDN:
```html
<link rel="stylesheet" href="/fonts/nerd-fonts-generated.min.css">
```
Or in CSS:
```css
@import url('https://cdn.jsdelivr.net/npm/@nerdfonts/font-web@latest/css/nerd-fonts-generated.min.css');

.icon-branch::before {
  font-family: 'Symbols Nerd Font', monospace;
  content: '\ue725'; /* git-branch */
  margin-right: 0.5rem;
}
```

### 3. In Terminal / CLI Tooling
```javascript
console.log('\uE7BA React Application Ready');
console.log('\uE83E Next.js App Router Initialized');
console.log('\uF408 Git Status: Clean');
```
