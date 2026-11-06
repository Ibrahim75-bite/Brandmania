import puppeteer from 'puppeteer';

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 1024, height: 768 },
  { name: 'mobile', width: 390, height: 844 },
];

const PAGES = [
  { path: '/', label: 'home' },
  { path: '/consultation', label: 'consultation' },
  { path: '/consultation/thank-you', label: 'consultation-thank-you' },
];

const BASE_URL = 'http://localhost:3000';
const OUT_DIR = 'tests/screenshots/post-change';

async function main() {
  const fs = await import('fs');
  const path = await import('path');
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });

    for (const pg of PAGES) {
      const url = `${BASE_URL}${pg.path}`;
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

      // Small delay to let animations/fonts settle
      await new Promise((r) => setTimeout(r, 1500));

      const fileName = `${pg.label}-${vp.name}.png`;
      const filePath = path.join(OUT_DIR, fileName);
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`Captured: ${filePath} (${vp.width}x${vp.height})`);

      if (pg.label === 'consultation' && vp.name === 'mobile') {
        const foldPath = path.join(OUT_DIR, 'consultation-mobile-fold.png');
        await page.screenshot({ path: foldPath, fullPage: false });
        console.log(`Captured viewport: ${foldPath} (${vp.width}x${vp.height})`);
      }
    }

    await page.close();
  }

  await browser.close();
  console.log('\nAll screenshots captured.');
}

main().catch((err) => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
