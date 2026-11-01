const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outDir = path.resolve('public/brand/logo');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function createRasterLogos() {
  console.log('--- Creating Pixel-Perfect Corrected Logos (BRANDMANIA) ---');

  // 1. Process White Logo from Logo/logo.png
  // Metadata: 2000x2000, transparent background, white artwork
  // Text Y: 1544 to 1650
  // Bounding box of old BRANDMAIA: left 486 to 1530
  
  // Extract Brand Eye Emblem (top part: y: 0 to 1480)
  const emblemWhite = await sharp('Logo/logo.png')
    .extract({ left: 0, top: 0, width: 2000, height: 1480 })
    .toBuffer();

  // Extract letter parts:
  // BRANDMA: left 486, top 1540, width 866, height 115
  const brandmaWhite = await sharp('Logo/logo.png')
    .extract({ left: 486, top: 1540, width: 866, height: 115 })
    .toBuffer();

  // N (cloned from BRAND): left 840, top 1540, width 106, height 115
  const nWhite = await sharp('Logo/logo.png')
    .extract({ left: 840, top: 1540, width: 106, height: 115 })
    .toBuffer();

  // IA: left 1354, top 1540, width 176, height 115
  const iaWhite = await sharp('Logo/logo.png')
    .extract({ left: 1354, top: 1540, width: 176, height: 115 })
    .toBuffer();

  // Total text width = 866 + 7 (gap) + 106 + 7 (gap) + 176 = 1162px
  // Centered at 1000 -> startX = 419
  const startX = 419;
  const brandmaX = startX;
  const nX = brandmaX + 866 + 7;
  const iaX = nX + 106 + 7;

  // Create transparent 2000x2000 canvas
  const canvasWhite = sharp({
    create: {
      width: 2000,
      height: 2000,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  });

  await canvasWhite
    .composite([
      { input: emblemWhite, top: 0, left: 0 },
      { input: brandmaWhite, top: 1540, left: brandmaX },
      { input: nWhite, top: 1540, left: nX },
      { input: iaWhite, top: 1540, left: iaX }
    ])
    .png()
    .toFile(path.join(outDir, 'brandmania-logo-white.png'));

  console.log('✓ Created brandmania-logo-white.png (2000x2000)');

  // 2. Process Black Logo from Logo/logo-black.png
  const emblemBlack = await sharp('Logo/logo-black.png')
    .extract({ left: 0, top: 0, width: 2000, height: 1480 })
    .toBuffer();

  const brandmaBlack = await sharp('Logo/logo-black.png')
    .extract({ left: 486, top: 1540, width: 866, height: 115 })
    .toBuffer();

  const nBlack = await sharp('Logo/logo-black.png')
    .extract({ left: 840, top: 1540, width: 106, height: 115 })
    .toBuffer();

  const iaBlack = await sharp('Logo/logo-black.png')
    .extract({ left: 1354, top: 1540, width: 176, height: 115 })
    .toBuffer();

  const canvasBlack = sharp({
    create: {
      width: 2000,
      height: 2000,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  });

  await canvasBlack
    .composite([
      { input: emblemBlack, top: 0, left: 0 },
      { input: brandmaBlack, top: 1540, left: brandmaX },
      { input: nBlack, top: 1540, left: nX },
      { input: iaBlack, top: 1540, left: iaX }
    ])
    .png()
    .toFile(path.join(outDir, 'brandmania-logo-black.png'));

  console.log('✓ Created brandmania-logo-black.png (2000x2000)');

  // 3. Process Purple Logo from Logo/logo-3.png
  const emblemPurple = await sharp('Logo/logo-3.png')
    .extract({ left: 0, top: 0, width: 2000, height: 1480 })
    .toBuffer();

  const brandmaPurple = await sharp('Logo/logo-3.png')
    .extract({ left: 486, top: 1540, width: 866, height: 115 })
    .toBuffer();

  const nPurple = await sharp('Logo/logo-3.png')
    .extract({ left: 840, top: 1540, width: 106, height: 115 })
    .toBuffer();

  const iaPurple = await sharp('Logo/logo-3.png')
    .extract({ left: 1354, top: 1540, width: 176, height: 115 })
    .toBuffer();

  const canvasPurple = sharp({
    create: {
      width: 2000,
      height: 2000,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  });

  await canvasPurple
    .composite([
      { input: emblemPurple, top: 0, left: 0 },
      { input: brandmaPurple, top: 1540, left: brandmaX },
      { input: nPurple, top: 1540, left: nX },
      { input: iaPurple, top: 1540, left: iaX }
    ])
    .png()
    .toFile(path.join(outDir, 'brandmania-logo-purple.png'));

  console.log('✓ Created brandmania-logo-purple.png (2000x2000)');

  // 4. Standalone Emblem (Crop bounding box of the Brand Eye & Corner Arcs: y: 250 to 1420, x: 440 to 1560)
  // Dimensions of emblem box: width 1140, height 1140
  await sharp('Logo/logo.png')
    .extract({ left: 450, top: 280, width: 1100, height: 1100 })
    .png()
    .toFile(path.join(outDir, 'brandmania-emblem-white.png'));

  await sharp('Logo/logo-3.png')
    .extract({ left: 450, top: 280, width: 1100, height: 1100 })
    .png()
    .toFile(path.join(outDir, 'brandmania-emblem-purple.png'));

  console.log('✓ Created standalone emblems (white & purple 1100x1100)');
}

createRasterLogos().catch(console.error);
