#!/usr/bin/env node
/**
 * UI/UX Pro Max Search (Node.js implementation)
 * Zero-dependency fast search engine for UI/UX style guides & datasets.
 * Usage:
 *   node search.js "<query>" [--domain <domain>] [--stack <stack>] [--max-results 3]
 */

const fs = require('fs');
const path = require('path');

const dataDir = path.resolve(__dirname, '../data');
const stacksDir = path.join(dataDir, 'stacks');

const DOMAIN_FILES = {
  style: 'styles.csv',
  color: 'colors.csv',
  chart: 'charts.csv',
  landing: 'landing.csv',
  product: 'products.csv',
  ux: 'ux-guidelines.csv',
  typography: 'typography.csv',
  'google-fonts': 'google-fonts.csv',
  icons: 'icons.csv',
  motion: 'motion.csv',
  gsap: 'motion.csv',
  react: 'react-performance.csv',
  web: 'app-interface.csv'
};

function parseCSV(text) {
  const lines = [];
  let row = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        cell += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(cell.trim());
      cell = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      row.push(cell.trim());
      if (row.some(c => c.length > 0)) {
        lines.push(row);
      }
      row = [];
      cell = '';
    } else {
      cell += char;
    }
  }
  if (cell || row.length > 0) {
    row.push(cell.trim());
    lines.push(row);
  }

  if (lines.length === 0) return [];
  const headers = lines[0];
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i];
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = values[j] || '';
    }
    rows.push(obj);
  }
  return rows;
}

function searchRows(rows, queryTerms) {
  const scored = [];

  for (const row of rows) {
    let score = 0;
    const fullText = Object.values(row).join(' ').toLowerCase();

    for (const term of queryTerms) {
      if (!term) continue;
      const regex = new RegExp('\\b' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      if (regex.test(fullText)) {
        score += 3;
      } else if (fullText.includes(term)) {
        score += 1;
      }
    }

    if (score > 0) {
      scored.push({ score, row });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.map(s => s.row);
}

// Parse command line arguments
const args = process.argv.slice(2);
let domain = null;
let stack = null;
let maxResults = 5;
let query = '';

for (let i = 0; i < args.length; i++) {
  if ((args[i] === '--domain' || args[i] === '-d') && args[i + 1]) {
    domain = args[i + 1].toLowerCase();
    i++;
  } else if ((args[i] === '--stack' || args[i] === '-s') && args[i + 1]) {
    stack = args[i + 1].toLowerCase();
    i++;
  } else if ((args[i] === '--max-results' || args[i] === '-m') && args[i + 1]) {
    maxResults = parseInt(args[i + 1], 10) || 5;
    i++;
  } else if (!args[i].startsWith('--')) {
    query = args[i];
  }
}

if (!query && !stack) {
  console.log('Usage: node search.js "<query>" [--domain <domain>] [--stack <stack>] [--max-results 3]');
  console.log('Domains: ' + Object.keys(DOMAIN_FILES).join(', '));
  process.exit(0);
}

const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 1);

let results = [];
let sourceFile = '';
let targetCategory = domain || (stack ? `stack:${stack}` : 'auto-detect');

if (stack) {
  const stackFile = path.join(stacksDir, `${stack}.csv`);
  if (fs.existsSync(stackFile)) {
    sourceFile = `${stack}.csv`;
    const rows = parseCSV(fs.readFileSync(stackFile, 'utf8'));
    results = terms.length ? searchRows(rows, terms) : rows;
  } else {
    console.log(`Error: stack file for "${stack}" not found at ${stackFile}`);
    process.exit(1);
  }
} else if (domain && DOMAIN_FILES[domain]) {
  sourceFile = DOMAIN_FILES[domain];
  const domainPath = path.join(dataDir, sourceFile);
  if (fs.existsSync(domainPath)) {
    const rows = parseCSV(fs.readFileSync(domainPath, 'utf8'));
    results = searchRows(rows, terms);
  }
} else {
  // Auto-detect across domains
  for (const [dom, file] of Object.entries(DOMAIN_FILES)) {
    const fPath = path.join(dataDir, file);
    if (!fs.existsSync(fPath)) continue;
    const rows = parseCSV(fs.readFileSync(fPath, 'utf8'));
    const matched = searchRows(rows, terms);
    if (matched.length > 0) {
      results = matched;
      sourceFile = file;
      targetCategory = dom;
      break;
    }
  }
}

console.log('\n## UI Pro Max Search Results');
console.log(`**Domain / Category:** ${targetCategory} | **Query:** "${query || stack}"`);
console.log(`**Source:** ${sourceFile} | **Found:** ${results.length} results\n`);

if (results.length === 0) {
  console.log('No matches found. Try refining keywords or specifying a domain.\n');
  process.exit(0);
}

const displayed = results.slice(0, maxResults);

displayed.forEach((row, i) => {
  console.log(`### Result ${i + 1}`);
  for (const [k, v] of Object.entries(row)) {
    if (!v) continue;
    const valStr = String(v).length > 250 ? String(v).slice(0, 250) + '...' : String(v);
    console.log(`- **${k}:** ${valStr}`);
  }
  console.log('');
});
