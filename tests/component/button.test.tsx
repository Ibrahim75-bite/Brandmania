import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/presentation/components/primitives/Button';

describe('Button Primitive Component', () => {
  it('renders button label correctly', () => {
    render(<Button>Executive Consultation</Button>);
    expect(screen.getByRole('button', { name: /Executive Consultation/i })).toBeDefined();
  });

  it('handles click events when enabled', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Submit</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables button and displays loading state when isLoading is true', () => {
    const handleClick = vi.fn();
    render(
      <Button isLoading onClick={handleClick}>
        Saving
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button.getAttribute('disabled')).not.toBeNull();
    expect(button.getAttribute('aria-busy')).toBe('true');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
