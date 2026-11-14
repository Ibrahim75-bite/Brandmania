import fs from 'node:fs';
import path from 'node:path';

const sourcePath = path.join(process.cwd(), 'src', 'presentation', 'components', 'primitives', 'BrandEye.tsx');
const source = fs.readFileSync(sourcePath, 'utf8');

const tagMatches = [...source.matchAll(/<path\s[^>]*\/?>/g)];
if (tagMatches.length === 0) {
  console.error('no paths found');
  process.exit(1);
}

const pathMatches = tagMatches
  .map((m) => {
    const tag = m[0];
    const dMatch = tag.match(/d="([^"]+)"/);
    if (!dMatch) return null;
    return { d: dMatch[1], isRing: tag.includes('stroke={') };
  })
  .filter(Boolean);

if (pathMatches.length === 0) {
  console.error('no d attributes found');
  process.exit(1);
}

const ringPath = pathMatches.find((m) => m.isRing);
const solidPaths = pathMatches.filter((m) => !m.isRing);

const glyphPathList = solidPaths
  .map((m) => `            <path d="${m.d}" />`)
  .join('\n');

const ringLine = ringPath
  ? `            <path d="${ringPath.d}" fill="none" stroke="none" strokeWidth="75" strokeMiterlimit="10" />`
  : '';

const glyphContent = `import React from 'react';

export function BrandEyeGlyph() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <g id="brandEyeGlyph">
          <g fill="currentColor">
${glyphPathList}
          </g>
${ringLine}
        </g>
      </defs>
    </svg>
  );
}
`;

const glyphPath = path.join(process.cwd(), 'src', 'presentation', 'components', 'primitives', 'BrandEyeGlyph.tsx');
fs.writeFileSync(glyphPath, glyphContent);

const brandEyeContent = `import React from 'react';
import styles from './BrandEye.module.css';

export interface BrandEyeProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  glow?: boolean;
  className?: string;
  idSuffix?: string;
}

const SIZE_MAP = {
  sm: 28,
  md: 36,
  lg: 52,
  xl: 84,
} as const;

export function BrandEye({
  size = 'md',
  glow = true,
  className = '',
}: BrandEyeProps) {
  const px = SIZE_MAP[size] || 36;

  const classNames = [
    styles.container,
    styles[size],
    glow ? styles.glow : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={classNames}
      style={{
        width: px,
        height: px,
        minWidth: px,
        minHeight: px,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="475 309 1050 1050"
        width={px}
        height={px}
        style={{ width: px, height: px, display: 'block', flexShrink: 0 }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <use href="#brandEyeGlyph" />
      </svg>
    </span>
  );
}
`;

fs.writeFileSync(sourcePath, brandEyeContent);

console.log(`BrandEyeGlyph written with ${pathMatches.length} paths; BrandEye rewritten to <use>`);
