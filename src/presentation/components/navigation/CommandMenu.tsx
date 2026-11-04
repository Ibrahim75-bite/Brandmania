'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MagnifyingGlass, ArrowElbowDownLeft, Target, Compass } from '@phosphor-icons/react';

export interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTrack?: (track: 'track-1' | 'track-2') => void;
}

interface CommandItem {
  id: string;
  index: string;
  label: string;
  category: 'Section' | 'Track' | 'Action';
  shortcut?: string;
  action: () => void;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({
  isOpen,
  onClose,
  onSelectTrack,
}) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${id}`;
    }
  }, []);

  const commands: CommandItem[] = useMemo(
    () => [
      {
        id: 'hero',
        index: '01',
        label: 'Hero: The Perception Arbitrage',
        category: 'Section',
        action: () => scrollToId('hero'),
      },
      {
        id: 'manifesto',
        index: '02',
        label: 'Worldview Manifesto: Commercial Certainty',
        category: 'Section',
        action: () => scrollToId('manifesto'),
      },
      {
        id: 'dilemma',
        index: '03',
        label: 'Commercial Divide: Brand Equity vs Price Erosion',
        category: 'Section',
        action: () => scrollToId('dilemma'),
      },
      {
        id: 'system',
        index: '04',
        label: 'Integrated System: 6 Operational Disciplines',
        category: 'Section',
        action: () => scrollToId('system'),
      },
      {
        id: 'disciplines',
        index: '05',
        label: 'Brand Direction: Defensible Narrative & Visual Standard',
        category: 'Section',
        action: () => scrollToId('disciplines'),
      },
      {
        id: 'margin-recovery',
        index: '06',
        label: 'Margin Recovery: 6 Enterprise Audit Stages',
        category: 'Section',
        action: () => scrollToId('margin-recovery'),
      },
      {
        id: 'consumer-scope',
        index: '07',
        label: 'Consumer Scope: 7 Behavioral Dimensions',
        category: 'Section',
        action: () => scrollToId('consumer-scope'),
      },
      {
        id: 'work',
        index: '08',
        label: 'Selected Artifacts: Authentic Lookbook',
        category: 'Section',
        action: () => scrollToId('work'),
      },
      {
        id: 'capabilities',
        index: '09',
        label: 'Institutional Capabilities: 11 Supporting Disciplines',
        category: 'Section',
        action: () => scrollToId('capabilities'),
      },
      {
        id: 'qualification',
        index: '10',
        label: 'Strategic Consultation: Qualification Assessment',
        category: 'Section',
        action: () => scrollToId('qualification'),
      },
      {
        id: 'track-1',
        index: 'T1',
        label: 'Pre-select Track I: Full Strategic & Performance Engagement',
        category: 'Track',
        action: () => {
          if (onSelectTrack) onSelectTrack('track-1');
          scrollToId('qualification');
        },
      },
      {
        id: 'track-2',
        index: 'T2',
        label: 'Pre-select Track II: Strategic Consultancy & Advisory',
        category: 'Track',
        action: () => {
          if (onSelectTrack) onSelectTrack('track-2');
          scrollToId('qualification');
        },
      },
    ],
    [scrollToId, onSelectTrack]
  );

  const filteredCommands = useMemo(() => {
    if (!search.trim()) return commands;
    const q = search.toLowerCase();
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.index.toLowerCase().includes(q)
    );
  }, [commands, search]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? filteredCommands.length - 1 : prev - 1
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredCommands[selectedIndex];
        if (selected) {
          selected.action();
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    },
    [filteredCommands, selectedIndex, onClose]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Quick-Jump Command Menu"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10001,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: 'clamp(3rem, 12vh, 8rem)',
            paddingInline: '1rem',
          }}
        >
          {}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(7, 7, 9, 0.85)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          />

          {}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.8 }}
            className="squircle-surface"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '640px',
              backgroundColor: '#070709',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.9), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
            onKeyDown={handleKeyDown}
          >
            {}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 1.25rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <MagnifyingGlass size={18} color="rgba(255, 255, 255, 0.4)" />
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Jump to section or engagement track..."
                aria-label="Command search"
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                  fontSize: '0.9375rem',
                  fontFamily: 'var(--font-sans), sans-serif',
                }}
              />
              <kbd style={{ fontSize: '10px' }}>ESC</kbd>
            </div>

            {}
            <div
              style={{
                maxHeight: '340px',
                overflowY: 'auto',
                padding: '0.5rem',
              }}
              role="listbox"
            >
              {filteredCommands.length === 0 ? (
                <div
                  style={{
                    padding: '2rem 1rem',
                    textAlign: 'center',
                    color: 'rgba(255, 255, 255, 0.4)',
                    fontSize: '0.875rem',
                  }}
                >
                  No matching index sections or tracks found.
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={cmd.id}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        cmd.action();
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        backgroundColor: isSelected
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'transparent',
                        color: isSelected ? '#fff' : 'rgba(255, 255, 255, 0.75)',
                        transition: 'background 0.1s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span
                          className="font-mono tabular-nums"
                          style={{
                            fontSize: '11px',
                            color: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.45)',
                            minWidth: '22px',
                          }}
                        >
                          {cmd.index}
                        </span>
                        {cmd.category === 'Track' ? (
                          <Target size={15} color="#ffffff" />
                        ) : (
                          <Compass size={15} color="rgba(255, 255, 255, 0.45)" />
                        )}
                        <span style={{ fontSize: '0.875rem', fontWeight: isSelected ? 500 : 400 }}>
                          {cmd.label}
                        </span>
                      </div>

                      {isSelected && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)' }}>
                            Jump
                          </span>
                          <ArrowElbowDownLeft size={13} color="rgba(255, 255, 255, 0.6)" />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.5rem 1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                fontSize: '10px',
                color: 'rgba(255, 255, 255, 0.4)',
              }}
            >
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span>
                <span><kbd>↵</kbd> Select</span>
              </div>
              <span className="font-mono">BRANDMANIA INDEX PALETTE</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
