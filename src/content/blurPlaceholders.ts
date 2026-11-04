
function createSvgDataUri(svgContent: string): string {
  const base64 = typeof window === 'undefined'
    ? Buffer.from(svgContent).toString('base64')
    : btoa(svgContent);
  return `data:image/svg+xml;base64,${base64}`;
}

const obsidianNeutralGradient = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070709" />
      <stop offset="50%" stop-color="#14141a" />
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

const posterNeutralGradient = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 60" width="40" height="60">
  <defs>
    <linearGradient id="posterBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#070709" />
      <stop offset="40%" stop-color="#161620" />
      <stop offset="70%" stop-color="#111116" />
      <stop offset="100%" stop-color="#070709" />
    </linearGradient>
  </defs>
  <rect width="40" height="60" fill="url(#posterBg)" />
</svg>
`;

export const BLUR_PLACEHOLDERS = {
  coverClean: createSvgDataUri(obsidianNeutralGradient),
  poster: createSvgDataUri(posterNeutralGradient),
  artboard1: createSvgDataUri(obsidianNeutralGradient),
  artboard2: createSvgDataUri(editorialAlabasterGradient),
  artboard3: createSvgDataUri(obsidianNeutralGradient),
  artboard4: createSvgDataUri(obsidianNeutralGradient),
  agencyBanner: createSvgDataUri(obsidianNeutralGradient),
  default: createSvgDataUri(obsidianNeutralGradient),
};
