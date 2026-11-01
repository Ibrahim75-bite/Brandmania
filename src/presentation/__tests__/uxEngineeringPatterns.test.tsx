import React from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { IdempotencyStore } from '@/infrastructure/security/idempotency';
import { isPointInTriangle, sign } from '@/presentation/hooks/useSafeTriangle';
import { CommandMenu } from '@/presentation/components/navigation/CommandMenu';
import { UndoToast } from '@/presentation/components/primitives/UndoToast';

describe('UX Engineering Pattern #19: Server-Side Idempotency Store', () => {
  let store: IdempotencyStore;

  beforeEach(() => {
    store = new IdempotencyStore(1000); // 1 second TTL
  });

  it('allows the initial request to mark key in-flight', () => {
    const key = 'idem-req-1234';
    const firstAttempt = store.markInFlight(key);
    expect(firstAttempt).toBe(true);

    const record = store.get(key);
    expect(record).toBeDefined();
    expect(record?.status).toBe('IN_FLIGHT');
  });

  it('blocks concurrent duplicate requests with the same idempotency key', () => {
    const key = 'idem-req-1234';
    store.markInFlight(key);

    const duplicateAttempt = store.markInFlight(key);
    expect(duplicateAttempt).toBe(false);
  });

  it('stores and retrieves resolved cached response for identical keys', () => {
    const key = 'idem-req-5678';
    store.markInFlight(key);

    const responseData = { success: true, inquiryId: 'inq_999' };
    store.resolve(key, 201, responseData);

    const record = store.get(key);
    expect(record).toBeDefined();
    expect(record?.status).toBe('RESOLVED');
    expect(record?.response?.statusCode).toBe(201);
    expect(record?.response?.body).toEqual(responseData);

    // Further duplicate attempts while resolved are still blocked from starting fresh
    expect(store.markInFlight(key)).toBe(false);
  });

  it('evicts expired keys after TTL passes', () => {
    vi.useFakeTimers();
    const shortTtlStore = new IdempotencyStore(100);
    const key = 'idem-expiring';

    shortTtlStore.markInFlight(key);
    expect(shortTtlStore.get(key)).toBeDefined();

    vi.advanceTimersByTime(150);
    expect(shortTtlStore.get(key)).toBeUndefined();
    vi.useRealTimers();
  });
});

describe('UX Engineering Pattern #20: Amazon Safe Triangle Geometry', () => {
  // Test triangle vertices:
  // v1: (0, 0)
  // v2: (100, 0)
  // v3: (50, 100)
  const v1 = { x: 0, y: 0 };
  const v2 = { x: 100, y: 0 };
  const v3 = { x: 50, y: 100 };

  it('returns true for a point strictly inside the safe triangle polygon', () => {
    const insidePoint = { x: 50, y: 30 };
    expect(isPointInTriangle(insidePoint, v1, v2, v3)).toBe(true);
  });

  it('returns false for points clearly outside the safe triangle polygon', () => {
    const outsideTop = { x: 50, y: -10 };
    const outsideLeft = { x: -10, y: 50 };
    const outsideRight = { x: 110, y: 50 };
    const outsideBottom = { x: 50, y: 150 };

    expect(isPointInTriangle(outsideTop, v1, v2, v3)).toBe(false);
    expect(isPointInTriangle(outsideLeft, v1, v2, v3)).toBe(false);
    expect(isPointInTriangle(outsideRight, v1, v2, v3)).toBe(false);
    expect(isPointInTriangle(outsideBottom, v1, v2, v3)).toBe(false);
  });

  it('returns true for vertices and edge boundaries', () => {
    expect(isPointInTriangle(v1, v1, v2, v3)).toBe(true);
    expect(isPointInTriangle(v2, v1, v2, v3)).toBe(true);
    expect(isPointInTriangle(v3, v1, v2, v3)).toBe(true);

    const edgeMidpoint = { x: 50, y: 0 };
    expect(isPointInTriangle(edgeMidpoint, v1, v2, v3)).toBe(true);
  });

  it('correctly calculates the 2D cross product sign', () => {
    const p1 = { x: 0, y: 0 };
    const p2 = { x: 10, y: 0 };
    const p3Above = { x: 5, y: 5 };
    const p3Below = { x: 5, y: -5 };

    expect(sign(p3Above, p1, p2)).toBeGreaterThan(0);
    expect(sign(p3Below, p1, p2)).toBeLessThan(0);
  });
});

describe('UX Engineering Pattern #3: Swiss Quick-Jump Command Menu', () => {
  it('does not render when isOpen is false', () => {
    render(<CommandMenu isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders with accessible role="dialog" and search input when isOpen is true', () => {
    render(<CommandMenu isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByRole('dialog')).toBeDefined();
    expect(screen.getByPlaceholderText(/Jump to section/i)).toBeDefined();
  });

  it('renders all 10 index sections and engagement track options', () => {
    render(<CommandMenu isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText(/01/)).toBeDefined();
    expect(screen.getByText(/The Perception Arbitrage/i)).toBeDefined();
    expect(screen.getByText(/Worldview Manifesto/i)).toBeDefined();
    expect(screen.getByText(/Commercial Divide/i)).toBeDefined();
    expect(screen.getByText(/Integrated System/i)).toBeDefined();
    expect(screen.getByText(/Margin Recovery/i)).toBeDefined();
    expect(screen.getByText(/Consumer Scope/i)).toBeDefined();
    expect(screen.getByText(/Selected Artifacts/i)).toBeDefined();
    expect(screen.getByText(/Institutional Capabilities/i)).toBeDefined();
    expect(screen.getByText(/Strategic Consultation/i)).toBeDefined();
    expect(screen.getByText(/Pre-select Track I:/i)).toBeDefined();
    expect(screen.getByText(/Pre-select Track II:/i)).toBeDefined();
  });

  it('filters results when the user types a query', () => {
    render(<CommandMenu isOpen={true} onClose={vi.fn()} />);
    const input = screen.getByPlaceholderText(/Jump to section/i);

    fireEvent.change(input, { target: { value: 'Margin' } });

    expect(screen.getByText(/Margin Recovery/i)).toBeDefined();
    expect(screen.queryByText(/Selected Artifacts/i)).toBeNull();
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn();
    render(<CommandMenu isOpen={true} onClose={onClose} />);
    const input = screen.getByPlaceholderText(/Jump to section/i);

    fireEvent.keyDown(input, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('calls action and onClose when an item is clicked', () => {
    const onClose = vi.fn();
    const onSelectTrack = vi.fn();
    render(<CommandMenu isOpen={true} onClose={onClose} onSelectTrack={onSelectTrack} />);

    const track1Item = screen.getByText(/Pre-select Track I:/i);
    fireEvent.click(track1Item);

    expect(onSelectTrack).toHaveBeenCalledWith('track-1');
    expect(onClose).toHaveBeenCalled();
  });
});

describe('UX Engineering Pattern #5: Undo Toast & Keyboard Shortcut', () => {
  it('renders with message when visible', () => {
    render(
      <UndoToast
        isVisible={true}
        message="Track selection updated"
        onUndo={vi.fn()}
        onDismiss={vi.fn()}
      />
    );
    expect(screen.getByRole('status')).toBeDefined();
    expect(screen.getByText(/Track selection updated/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Undo/i })).toBeDefined();
  });

  it('does not render when isVisible is false', () => {
    render(
      <UndoToast
        isVisible={false}
        message="Track selection updated"
        onUndo={vi.fn()}
        onDismiss={vi.fn()}
      />
    );
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('triggers onUndo and onDismiss when Undo button is clicked', () => {
    const onUndo = vi.fn();
    const onDismiss = vi.fn();

    render(
      <UndoToast
        isVisible={true}
        message="Track updated"
        onUndo={onUndo}
        onDismiss={onDismiss}
      />
    );

    const undoButton = screen.getByRole('button', { name: /Undo/i });
    fireEvent.click(undoButton);

    expect(onUndo).toHaveBeenCalledTimes(1);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('triggers onUndo and onDismiss when ⌘Z or Ctrl+Z is pressed on window', () => {
    const onUndo = vi.fn();
    const onDismiss = vi.fn();

    render(
      <UndoToast
        isVisible={true}
        message="Track updated"
        onUndo={onUndo}
        onDismiss={onDismiss}
      />
    );

    // Simulate Cmd+Z / Ctrl+Z
    fireEvent.keyDown(window, {
      key: 'z',
      ctrlKey: true,
      metaKey: false,
    });

    expect(onUndo).toHaveBeenCalledTimes(1);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('does not trigger onUndo if focused on an input element when ⌘Z is pressed', () => {
    const onUndo = vi.fn();
    const onDismiss = vi.fn();

    render(
      <div>
        <input data-testid="test-input" />
        <UndoToast
          isVisible={true}
          message="Track updated"
          onUndo={onUndo}
          onDismiss={onDismiss}
        />
      </div>
    );

    const input = screen.getByTestId('test-input');
    fireEvent.keyDown(input, {
      key: 'z',
      metaKey: true,
    });

    expect(onUndo).not.toHaveBeenCalled();
  });

  it('auto-dismisses after durationMs', () => {
    vi.useFakeTimers();
    const onDismiss = vi.fn();

    render(
      <UndoToast
        isVisible={true}
        message="Track updated"
        onUndo={vi.fn()}
        onDismiss={onDismiss}
        durationMs={3000}
      />
    );

    act(() => {
      vi.advanceTimersByTime(2999);
    });
    expect(onDismiss).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(onDismiss).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });
});
