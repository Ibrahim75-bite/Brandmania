#!/usr/bin/env node
/**
 * Nerd Fonts Glyph Lookup Utility
 * Usage:
 *   node search-glyphs.js "<query>" [--limit 15]
 *   node search-glyphs.js --code e7ba
 */

const fs = require('fs');
const path = require('path');

const glyphJsonPath = path.resolve(__dirname, '../../../../references/nerd-fonts/glyphnames.json');

if (!fs.existsSync(glyphJsonPath)) {
  console.error(`Error: glyphnames.json not found at ${glyphJsonPath}`);
  process.exit(1);
}

const glyphs = JSON.parse(fs.readFileSync(glyphJsonPath, 'utf8'));

const args = process.argv.slice(2);
let limit = 20;
let codeSearch = null;
let query = '';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--limit' && args[i + 1]) {
    limit = parseInt(args[i + 1], 10);
    i++;
  } else if (args[i] === '--code' && args[i + 1]) {
    codeSearch = args[i + 1].toLowerCase().replace(/^u\+|^0x|^\\u/i, '');
    i++;
  } else if (!args[i].startsWith('--')) {
    query = args[i].toLowerCase();
  }
}

const results = [];

for (const [key, val] of Object.entries(glyphs)) {
  if (key === 'METADATA') continue;
  const hex = (val.code || '').toLowerCase();
  const char = val.char || '';

  if (codeSearch) {
    if (hex === codeSearch) {
      results.push({ key, hex, char });
    }
  } else if (query) {
    if (key.toLowerCase().includes(query)) {
      results.push({ key, hex, char });
    }
  }
}

console.log(`\n=== Nerd Fonts Lookup: "${codeSearch ? 'code ' + codeSearch : query}" (${results.length} matches, showing top ${Math.min(results.length, limit)}) ===\n`);

const displayed = results.slice(0, limit);

displayed.forEach(item => {
  const cssClass = `nf nf-${item.key.replace(/^cod-|^dev-|^fa-|^seti-|^oct-|^pom-|^weather-|^md-/, '')}`;
  console.log(`Icon: ${item.key}`);
  console.log(`  Character:    ${item.char}`);
  console.log(`  Unicode Hex:  U+${item.hex.toUpperCase()} (\\u${item.hex.toUpperCase()})`);
  console.log(`  CSS Class:    ${cssClass} / nf-${item.key}`);
  console.log(`  JSX / TSX:    <span>{"\\u${item.hex.toUpperCase()}"}</span>`);
  console.log(`  HTML Entity:  &#x${item.hex};`);
  console.log('');
});

if (results.length > limit) {
  console.log(`... and ${results.length - limit} more matches. Use --limit <N> to view more.\n`);
}
