import { execSync } from 'node:child_process';

const BASE = 'http://127.0.0.1:3010';
const ROUTES = [
  ['home', '/'],
  ['work', '/work'],
  ['insights', '/insights'],
  ['services', '/services'],
  ['faq', '/faq'],
  ['consultation', '/consultation'],
  ['funnel-margin-diagnostic', '/f/margin-diagnostic'],
];

const chrome = process.env.CHROME_PATH;
const runsPerRoute = Number(process.env.RUNS_PER_ROUTE || '1');
const runs = [];
for (const [name, path] of ROUTES) {
  runs.push([`${name}-mobile`, path, true]);
  runs.push([`${name}-desktop`, path, false]);
}

import fs from 'node:fs';

for (const [name, path, isMobile] of runs) {
  const url = BASE + path;
  const flags = isMobile
    ? '--headless=new --no-sandbox --disable-gpu'
    : '--headless=new --no-sandbox --disable-gpu --form-factor=desktop --screenEmulation.mobile=false --screenEmulation.width=1350 --screenEmulation.height=940';
  const out = `tests/lighthouse/current-${name}.json`;
  const passResults = [];
  for (let i = 0; i < runsPerRoute; i++) {
    const passOut = runsPerRoute > 1 ? `tests/lighthouse/pass-${name}-${i}.json` : out;
    const cmd = `npx --yes lighthouse ${url} --quiet --chrome-flags="${flags}" --output=json --output-path="${passOut}" --only-categories=performance,accessibility,best-practices,seo`;
    try {
      execSync(cmd, { stdio: 'ignore', timeout: 240000, env: { ...process.env, CHROME_PATH: chrome } });
      if (runsPerRoute > 1) {
        const report = JSON.parse(fs.readFileSync(passOut, 'utf8'));
        passResults.push({ file: passOut, perf: report.categories.performance.score });
      }
      console.log(`OK ${name} pass ${i + 1}/${runsPerRoute}`);
    } catch {
      console.log(`FAIL ${name} pass ${i + 1}/${runsPerRoute}`);
    }
  }
  if (runsPerRoute > 1 && passResults.length > 0) {
    passResults.sort((a, b) => a.perf - b.perf);
    const median = passResults[Math.floor(passResults.length / 2)];
    fs.copyFileSync(median.file, out);
    for (const r of passResults) {
      if (r.file !== out) fs.rmSync(r.file, { force: true });
    }
    console.log(`MEDIAN ${name}: pass with perf ${(median.perf * 100).toFixed(0)}`);
  } else if (passResults.length === 0 && runsPerRoute === 1) {
    console.log(`FAIL ${name}`);
  }
}
console.log('ALL DONE');
