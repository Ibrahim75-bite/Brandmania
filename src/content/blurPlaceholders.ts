/**
 * Low-Quality Image Placeholders (LQIP)
 * Deterministic obsidian (#070709) and imperial violet (#160029, #2E0854)
 * SVG data-URIs tailored for Brandmania authentic assets.
 */

function createSvgDataUri(svgContent: string): string {
  const base64 = typeof window === 'undefined'
    ? Buffer.from(svgContent).toString('base64')
    : btoa(svgContent);
  return `data:image/svg+xml;base64,${base64}`;
}

const obsidianVioletGradient = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070709" />
      <stop offset="50%" stop-color="#160029" />
      <stop offset="100%" stop-color="#070709" />
    </linearGradient>
  </defs>
  <rect width="40" height="40" fill="url(#bg)" />
</svg>
`;

const editorialAlabasterGradient = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <defs>
    <linearGradient id="bgLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F3F0EA" />
      <stop offset="50%" stop-color="#E5DEC9" />
      <stop offset="100%" stop-color="#F3F0EA" />
    </linearGradient>
  </defs>
  <rect width="40" height="40" fill="url(#bgLight)" />
</svg>
`;

const posterVioletGradient = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 60" width="40" height="60">
  <defs>
    <linearGradient id="posterBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#070709" />
      <stop offset="40%" stop-color="#2E0854" />
      <stop offset="70%" stop-color="#160029" />
      <stop offset="100%" stop-color="#070709" />
    </linearGradient>
  </defs>
  <rect width="40" height="60" fill="url(#posterBg)" />
</svg>
`;

export const BLUR_PLACEHOLDERS = {
  // Hero aperture cover asset
  coverClean: createSvgDataUri(obsidianVioletGradient),
  // Brand direction poster
  poster: createSvgDataUri(posterVioletGradient),
  // Artboards
  artboard1: createSvgDataUri(obsidianVioletGradient),
  artboard2: createSvgDataUri(editorialAlabasterGradient),
  artboard3: createSvgDataUri(obsidianVioletGradient),
  artboard4: createSvgDataUri(obsidianVioletGradient),
  // Campaign banner
  agencyBanner: createSvgDataUri(obsidianVioletGradient),
  // Default fallback
  default: createSvgDataUri(obsidianVioletGradient),
};
