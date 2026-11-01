import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ArtifactGallery } from '@/presentation/components/sections/ArtifactGallery';

describe('ArtifactGallery', () => {
  it('exhibits every supplied campaign artwork at once', () => {
    render(<ArtifactGallery />);

    expect(screen.getAllByRole('img').length).toBeGreaterThanOrEqual(5);
    expect(screen.getByAltText(/Services & Branding Architecture/i).getAttribute('src')).toContain(
      'artboard-2-services-branding.jpg',
    );
    expect(screen.getByAltText(/Social & Feed Campaign System/i).getAttribute('src')).toContain(
      'artboard-3-services-social.jpg',
    );
  });
});
