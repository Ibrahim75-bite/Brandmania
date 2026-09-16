import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { VSLPlayer } from '@/presentation/components/primitives/VSLPlayer';

describe('VSLPlayer Component', () => {
  it('renders poster image and play button initially', () => {
    render(
      <VSLPlayer
        posterUrl="/brand/graphics/vsl-poster-placeholder.svg"
        headline="Strategic Video Briefing"
      />
    );

    const poster = screen.getByRole('button', { name: /Play Strategic Video Briefing/i });
    expect(poster).toBeDefined();
    expect(screen.getByText(/6:00 MIN/i)).toBeDefined();
  });

  it('triggers onPlayStart when play button is clicked and displays video iframe', () => {
    const handleStart = vi.fn();
    render(
      <VSLPlayer
        posterUrl="/brand/graphics/vsl-poster-placeholder.svg"
        videoUrl="https://www.youtube-nocookie.com/embed/test"
        onPlayStart={handleStart}
      />
    );

    const playTrigger = screen.getByRole('button');
    fireEvent.click(playTrigger);
    expect(handleStart).toHaveBeenCalledTimes(1);

    const iframe = screen.getByTitle(/Executive Strategic Briefing/i);
    expect(iframe).toBeDefined();
    expect(iframe.getAttribute('src')).toBe('https://www.youtube-nocookie.com/embed/test');
  });
});
