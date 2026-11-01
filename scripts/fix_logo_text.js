const sharp = require('sharp');
const fs = require('fs');

async function fixLogo() {
  const srcPath = 'Logo/logo.png';
  const img = sharp(srcPath);
  const metadata = await img.metadata();
  const { width, height } = metadata;

  // Let's extract the N glyph from BRAND (x: 840 to 946, y: 1540 to 1655)
  const nGlyph = await sharp(srcPath)
    .extract({ left: 840, top: 1540, width: 106, height: 115 })
    .toBuffer();

  // Extract BRANDMA (x: 486 to 1352, y: 1540 to 1655)
  const brandma = await sharp(srcPath)
    .extract({ left: 486, top: 1540, width: 1352 - 486, height: 115 })
    .toBuffer();

  // Extract IA (x: 1354 to 1530, y: 1540 to 1655)
  const ia = await sharp(srcPath)
    .extract({ left: 1354, top: 1540, width: 1530 - 1354, height: 115 })
    .toBuffer();

  // The new word width:
  // BRANDMA (866px) + gap (7px) + N (106px) + gap (7px) + IA (176px) = 1162px
  // Total canvas width is 2000.
  // Center is 1000.
  // New startX = Math.round(1000 - 1162 / 2) = 419.

  const startX = 419;
  const brandmaX = startX;
  const nX = brandmaX + 866 + 7;
  const iaX = nX + 106 + 7;

  // Create black patch to erase old text (x: 400 to 1600, y: 1535 to 1665)
  const blackPatch = await sharp({
    create: {
      width: 1200,
      height: 140,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 1 }
    }
  }).png().toBuffer();

  // Composite:
  // 1. Base image
  // 2. Black patch to clean old text
  // 3. BRANDMA at brandmaX
  // 4. N at nX
  // 5. IA at iaX
  const fixed = await sharp(srcPath)
    .composite([
      { input: blackPatch, top: 1530, left: 400 },
      { input: brandma, top: 1540, left: brandmaX },
      { input: nGlyph, top: 1540, left: nX },
      { input: ia, top: 1540, left: iaX }
    ])
    .png()
    .toFile('test_fixed_logo.png');

  console.log('Saved test_fixed_logo.png successfully!');
}

fixLogo();
