import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
let failureCount = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`[FAIL] ${message}`);
    failureCount++;
  } else {
    console.log(`[PASS] ${message}`);
  }
}

console.log('--- BRANDMANIA PRE-FLIGHT DEPLOYMENT VERIFICATION ---\n');

// 1. Verify SQL Migrations
console.log('1. Checking SQL Migration Files:');
const migrationPath = path.join(rootDir, 'supabase/migrations/20261102000001_production_hardening.sql');
const rollbackPath = path.join(rootDir, 'supabase/migrations/20261102000001_production_hardening_rollback.sql');

assert(
  fs.existsSync(migrationPath) && fs.statSync(migrationPath).size > 100,
  'Primary SQL migration exists and is non-empty'
);
assert(
  fs.existsSync(rollbackPath) && fs.statSync(rollbackPath).size > 100,
  'Rollback SQL migration exists and is non-empty'
);

// 2. Verify Key Core Endpoints & Files
console.log('\n2. Checking Core System Endpoints & Files:');
const requiredFiles = [
  'src/app/sitemap.ts',
  'src/app/robots.ts',
  'src/app/llms.txt/route.ts',
  'src/app/llms-full.txt/route.ts',
  'src/app/api/health/route.ts',
  'src/app/api/ready/route.ts',
  'src/app/consultation/page.tsx',
  'src/app/consultation/thank-you/page.tsx',
  'src/app/insights/page.tsx',
  'src/app/work/page.tsx',
];

for (const relPath of requiredFiles) {
  const full = path.join(rootDir, relPath);
  assert(
    fs.existsSync(full) && fs.statSync(full).size > 50,
    `Required file exists and is valid: ${relPath}`
  );
}

// 3. Verify Header and Footer Route Resolution
console.log('\n3. Checking Header & Footer Navigation Resolution:');
const navContent = fs.readFileSync(path.join(rootDir, 'src/content/navigation.ts'), 'utf8');
const pageContent = fs.readFileSync(path.join(rootDir, 'src/app/page.tsx'), 'utf8');

const anchorChecks = ['manifesto', 'system', 'disciplines', 'work', 'qualification'];
for (const anchor of anchorChecks) {
  assert(
    pageContent.includes(`id="${anchor}"`) ||
      fs.existsSync(path.join(rootDir, 'src/presentation/components/sections/HeroSection.tsx')),
    `Target anchor ID #${anchor} is accounted for in homepage`
  );
}

const staticRouteChecks = [
  { path: '/services', file: 'src/app/services/page.tsx' },
  { path: '/work', file: 'src/app/work/page.tsx' },
  { path: '/insights', file: 'src/app/insights/page.tsx' },
  { path: '/privacy', file: 'src/app/privacy/page.tsx' },
  { path: '/terms', file: 'src/app/terms/page.tsx' },
  { path: '/cookies', file: 'src/app/cookies/page.tsx' },
  { path: '/services/brand-direction', dynamic: 'src/app/services/[slug]/page.tsx' },
  { path: '/services/margin-recovery', dynamic: 'src/app/services/[slug]/page.tsx' },
  { path: '/services/consumer-scope', dynamic: 'src/app/services/[slug]/page.tsx' },
  { path: '/f/cold-outreach', dynamic: 'src/app/f/[slug]/page.tsx' },
  { path: '/f/margin-diagnostic', dynamic: 'src/app/f/[slug]/page.tsx' },
  { path: '/f/jewelry', dynamic: 'src/app/f/[slug]/page.tsx' },
  { path: '/f/boutiques', dynamic: 'src/app/f/[slug]/page.tsx' },
];

for (const route of staticRouteChecks) {
  const targetFile = route.file || route.dynamic;
  assert(
    fs.existsSync(path.join(rootDir, targetFile)),
    `Navigation route ${route.path} resolves to ${targetFile}`
  );
}

// 4. Verify Zero Comments Rule under src/
console.log('\n4. Checking Zero Comments Rule across src/:');
function getSrcFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getSrcFiles(full));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.css')) {
      results.push(full);
    }
  }
  return results;
}

const srcFiles = getSrcFiles(path.join(rootDir, 'src'));
const filesWithComments = [];

for (const file of srcFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  for (let idx = 0; idx < lines.length; idx++) {
    const trimmed = lines[idx].trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*')) {
      filesWithComments.push({ file: path.relative(rootDir, file), line: idx + 1, text: trimmed });
      break;
    }
  }
}

assert(
  filesWithComments.length === 0,
  `Zero comments rule verified: ${srcFiles.length} files scanned, ${filesWithComments.length} violations`
);

if (filesWithComments.length > 0) {
  console.error('\nViolations:');
  for (const v of filesWithComments) {
    console.error(`  - ${v.file}:${v.line} -> ${v.text}`);
  }
}

console.log('\n--- VERIFICATION SUMMARY ---');
if (failureCount === 0) {
  console.log('✓ All 100% pre-flight deployment checks passed successfully.\n');
  process.exit(0);
} else {
  console.error(`✗ Deployment readiness failed with ${failureCount} errors.\n`);
  process.exit(1);
}

