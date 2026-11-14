import puppeteer from 'puppeteer';

const url = process.argv[2] || 'http://127.0.0.1:3010/faq';
const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu'],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844 });
await page.evaluateOnNewDocument(() => {
  window.__shifts = [];
  const po = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.hadRecentInput) continue;
      window.__shifts.push({
        value: entry.value,
        time: Math.round(entry.startTime),
        sources: (entry.sources || []).map((s) => ({
          node: s.node
            ? s.node.nodeName +
              (s.node.className ? '.' + String(s.node.className).split(' ')[0] : '') +
              (s.node.id ? '#' + s.node.id : '')
            : 'unknown',
          prev: s.previousRect
            ? [s.previousRect.x, s.previousRect.y, s.previousRect.width, s.previousRect.height]
            : null,
          cur: s.currentRect ? [s.currentRect.x, s.currentRect.y, s.currentRect.width, s.currentRect.height] : null,
        })),
      });
    }
  });
  po.observe({ type: 'layout-shift', buffered: true });
});
await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
await new Promise((r) => setTimeout(r, 3000));
const shifts = await page.evaluate(() => window.__shifts);
console.log(JSON.stringify(shifts, null, 1));
await browser.close();
