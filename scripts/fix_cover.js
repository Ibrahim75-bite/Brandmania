const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outDir = path.resolve('public/brand/textures');

async function fixCoverFlawless() {
  const src = 'Logo/COVER.jpg.jpeg';

  // Make an alpha-masked PNG from a cropped box
  async function makeTransparentText(left, top, width, height) {
    const raw = await sharp(src)
      .extract({ left, top, width, height })
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { data, info } = raw;
    const rgba = Buffer.alloc(info.width * info.height * 4);

    for (let i = 0; i < info.width * info.height; i++) {
      const r = data[i * 3];
      const g = data[i * 3 + 1];
      const b = data[i * 3 + 2];
      const lum = (r * 0.299 + g * 0.587 + b * 0.114);

      // Threshold: background marble is ~40-80, white text is ~220-255
      let alpha = 0;
      if (lum > 140) {
        alpha = Math.min(255, Math.max(0, Math.round((lum - 140) / (220 - 140) * 255)));
      }

      rgba[i * 4] = 255;
      rgba[i * 4 + 1] = 255;
      rgba[i * 4 + 2] = 255;
      rgba[i * 4 + 3] = alpha;
    }

    return sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
      .png()
      .toBuffer();
  }

  const brandmaPng = await makeTransparentText(163, 126, 440, 56);
  const nPng = await makeTransparentText(343, 126, 54, 56);
  const iaPng = await makeTransparentText(606, 126, 88, 56);

  const cleanBg = path.join(outDir, 'brandmania-cover-clean.jpg');

  const startX = 130;
  const brandmaX = startX;
  const nX = brandmaX + 440 + 5;
  const iaX = nX + 54 + 5;

  await sharp(cleanBg)
    .composite([
      { input: brandmaPng, top: 126, left: brandmaX },
      { input: nPng, top: 126, left: nX },
      { input: iaPng, top: 126, left: iaX }
    ])
    .jpeg({ quality: 98 })
    .toFile(path.join(outDir, 'brandmania-cover.jpg'));

  console.log('✓ Flawless cover created: brandmania-cover.jpg');
}

fixCoverFlawless().catch(console.error);
