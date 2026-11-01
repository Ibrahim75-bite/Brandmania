const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outDir = path.resolve('public/brand/textures');

async function fixPosterClean() {
  const src = 'Logo/PP2.jpg.jpeg';

  const metadata = await sharp(src).metadata();
  const { width, height } = metadata;

  // 1. Take a clean patch of the crumpled paper from y: 1780 to 1900, x: 500 to 1600 (height: 120, width: 1100)
  const paperPatch = await sharp(src)
    .extract({ left: 500, top: 1780, width: 1100, height: 120 })
    .toBuffer();

  // 2. Take a clean patch for top "2024" from y: 180 to 280, x: 800 to 1300 (height: 100, width: 500)
  const topPatch = await sharp(src)
    .extract({ left: 800, top: 180, width: 500, height: 100 })
    .toBuffer();

  // 3. Render clean "2026" SVG
  const topTextSvg = Buffer.from(`
    <svg width="500" height="100" viewBox="0 0 500 100" xmlns="http://www.w3.org/2000/svg">
      <text x="250" y="72" font-family="Montserrat, Arial Black, sans-serif" font-weight="900" font-size="70" fill="#FFFFFF" fill-opacity="0.94" text-anchor="middle" letter-spacing="0.06em">2026</text>
    </svg>
  `);

  // 4. Render clean "BRANDMANIA" SVG with distressed screen-print aesthetic
  const bottomTextSvg = Buffer.from(`
    <svg width="1100" height="120" viewBox="0 0 1100 120" xmlns="http://www.w3.org/2000/svg">
      <text x="550" y="85" font-family="Montserrat, Arial Black, sans-serif" font-weight="900" font-size="78" fill="#FFFFFF" fill-opacity="0.95" text-anchor="middle" letter-spacing="0.05em">BRANDMANIA</text>
    </svg>
  `);

  // Composite:
  // - Base PP2.jpg.jpeg
  // - topPatch over y: 330, left: 800
  // - topTextSvg over y: 330, left: 800
  // - paperPatch over y: 1630, left: 500
  // - bottomTextSvg over y: 1630, left: 500
  await sharp(src)
    .composite([
      { input: topPatch, top: 330, left: 800 },
      { input: topTextSvg, top: 330, left: 800 },
      { input: paperPatch, top: 1630, left: 500 },
      { input: bottomTextSvg, top: 1630, left: 500 }
    ])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'brandmania-poster.jpg'));

  console.log('✓ Clean poster generated: brandmania-poster.jpg');
}

fixPosterClean().catch(console.error);
