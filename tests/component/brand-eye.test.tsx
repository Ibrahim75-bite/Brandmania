import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';

describe('BrandEye Primitive Component', () => {
  it('renders SVG vector geometry correctly', () => {
    const { container } = render(<BrandEye size="md" idSuffix="test" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeDefined();
    expect(svg?.getAttribute('viewBox')).toBe('0 0 120 120');
  });

  it('applies the appropriate size class', () => {
    const { container } = render(<BrandEye size="lg" idSuffix="test-lg" />);
    const span = container.querySelector('span');
    expect(span?.className).toContain('lg');
  });
});
