'use client';

import { useEffect, useState } from 'react';

interface PresenceState {
  mounted: boolean;
  visible: boolean;
}

export function usePresence(isVisible: boolean, exitDurationMs = 260): PresenceState {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setMounted(true);
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
    const timer = setTimeout(() => setMounted(false), exitDurationMs);
    return () => clearTimeout(timer);
  }, [isVisible, exitDurationMs]);

  return { mounted, visible };
}

export const MOTION_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
