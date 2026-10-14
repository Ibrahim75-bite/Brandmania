#!/usr/bin/env node
/**
 * React Bits Catalog Search Utility
 * Usage: node search.js "<query>" [--category <Animations|Backgrounds|Components|TextAnimations>]
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '../../../../references/react-bits/src/ts-default');

const categories = ['Animations', 'Backgrounds', 'Components', 'TextAnimations'];

function search(query, filterCategory) {
  const q = (query || '').toLowerCase();
  const results = [];

  const targetCats = filterCategory ? [filterCategory] : categories;

  for (const cat of targetCats) {
    const catDir = path.join(repoRoot, cat);
    if (!fs.existsSync(catDir)) continue;

    const items = fs.readdirSync(catDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);

    for (const name of items) {
      const matchName = name.toLowerCase().includes(q);
      const compDir = path.join(catDir, name);
      let snippet = '';

      if (fs.existsSync(compDir)) {
        const files = fs.readdirSync(compDir);
        const tsxFile = files.find(f => f.endsWith('.tsx') || f.endsWith('.jsx'));
        if (tsxFile) {
          const content = fs.readFileSync(path.join(compDir, tsxFile), 'utf8');
          if (content.toLowerCase().includes(q)) {
            const lines = content.split('\n');
            const matchingLine = lines.find(l => l.toLowerCase().includes(q));
            snippet = matchingLine ? matchingLine.trim().slice(0, 100) : '';
          }
        }
      }

      if (matchName || snippet) {
        results.push({
          name,
          category: cat,
          path: `references/react-bits/src/ts-default/${cat}/${name}/`,
          snippet: snippet || '(name match)'
        });
      }
    }
  }

  return results;
}

const args = process.argv.slice(2);
const query = args[0] || '';
let catFilter = null;
const catIdx = args.indexOf('--category');
if (catIdx !== -1 && args[catIdx + 1]) {
  catFilter = args[catIdx + 1];
}

const matches = search(query, catFilter);

console.log(`\n=== React Bits Search: "${query}" (${matches.length} matches) ===\n`);
matches.forEach(m => {
  console.log(`[${m.category}] ${m.name}`);
  console.log(`  Path: ${m.path}`);
  if (m.snippet && m.snippet !== '(name match)') {
    console.log(`  Match: ${m.snippet}`);
  }
});
console.log('\n');
