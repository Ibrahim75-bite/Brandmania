'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from './Container';
import { BrandEye } from '../primitives/BrandEye';
import { Button } from '../primitives/Button';
import { CommandMenu } from '../navigation/CommandMenu';
import { SwipeableSheet } from '../primitives/SwipeableSheet';
import { MAIN_NAV_LINKS, FOOTER_SECTIONS } from '@/content/navigation';
import { BRAND } from '@/content/brand';
import headerStyles from './Header.module.css';
import footerStyles from './Footer.module.css';

export function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // #3 Global ⌘K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className={headerStyles.header}>
      <Container>
        <div className={headerStyles.inner}>
          {/* Brand Logo & Wordmark */}
          <Link href="/" className={`${headerStyles.brandLink} hit-slop`}>
            <BrandEye size="sm" />
            <span className={headerStyles.wordmark}>{BRAND.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={headerStyles.navDesktop} aria-label="Main Navigation">
            {MAIN_NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={`${headerStyles.navLink} hit-slop`}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Header Action / CTA */}
          <div className={headerStyles.headerActions}>
            {/* #3 & #4 Index Command Trigger with Shortcut Hint */}
            <button
              onClick={() => setIsCommandOpen(true)}
              className={`${headerStyles.indexTrigger} hit-slop`}
              aria-label="Open Command Menu Palette"
            >
              <span>Index</span>
              <kbd style={{ fontSize: '9px', padding: '1px 4px' }}>⌘K</kbd>
            </button>

            <Button
              variant="primary"
              size="sm"
              className="hit-slop"
              onClick={() => {
                const el = document.getElementById('qualification');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/#qualification';
                }
              }}
            >
              Request Strategic Consultation
            </Button>

            {/* Mobile Hamburger Toggle */}
            <button
              className={`${headerStyles.mobileToggle} hit-slop`}
              onClick={() => setIsMobileOpen(true)}
              aria-label={isMobileOpen ? 'Close Menu' : 'Open Navigation Menu'}
              aria-expanded={isMobileOpen}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* #3 Executive Command Menu Modal */}
      <CommandMenu
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />

      {/* #10 & #12 Spring-Physics Swipeable Mobile Sheet with Predictive Back */}
      <SwipeableSheet
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        title="Navigation Index"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <BrandEye size="sm" />
            <span className={headerStyles.wordmark}>{BRAND.name}</span>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {MAIN_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hit-slop"
                style={{
                  color: 'rgba(255, 255, 255, 0.85)',
                  textDecoration: 'none',
                  fontSize: '1.125rem',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                }}
                onClick={() => setIsMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsMobileOpen(false);
                setIsCommandOpen(true);
              }}
              className="hit-slop"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.75rem 1rem',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '0.9375rem',
                marginTop: '0.5rem',
                cursor: 'pointer',
              }}
            >
              <span>Brandmania Command Palette</span>
              <kbd>⌘K</kbd>
            </button>
          </nav>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '1rem' }}>
            <Button
              variant="primary"
              size="md"
              style={{ width: '100%' }}
              onClick={() => {
                setIsMobileOpen(false);
                const el = document.getElementById('qualification');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else window.location.href = '/#qualification';
              }}
            >
              Request Strategic Consultation
            </Button>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textAlign: 'center' }}>
              {BRAND.tagline}
            </span>
          </div>
        </div>
      </SwipeableSheet>
    </header>
  );
}

export function Footer() {
  return (
    <footer className={footerStyles.footer}>
      <Container>
        <div className={footerStyles.grid}>
          {/* Brand Manifesto Column */}
          <div className={footerStyles.brandCol}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <BrandEye size="sm" />
              <span className={footerStyles.brandTitle}>{BRAND.name}</span>
            </div>
            <p className={footerStyles.brandManifesto}>
              {BRAND.tagline}. Strategic premium consultancy engineering Margin Recovery, Brand Direction, and Consumer Scope for ambitious market leaders.
            </p>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-accent-purple-bright)', fontStyle: 'italic' }}>
              “{BRAND.internalPhilosophy}”
            </span>
          </div>

          {/* Directory Columns */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className={footerStyles.columnTitle}>{section.title}</h4>
              <ul className={footerStyles.linkList}>
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={footerStyles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Legal & Operational Bar */}
        <div className={footerStyles.bottomBar}>
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
            <Link href="/privacy" className={footerStyles.link}>Privacy Policy</Link>
            <Link href="/terms" className={footerStyles.link}>Terms & Conditions</Link>
            <Link href="/cookies" className={footerStyles.link}>Cookie Policy</Link>
          </div>
          <p style={{ color: 'var(--color-text-muted)' }}>
            {BRAND.mottos.primary}
          </p>
        </div>
      </Container>
    </footer>
  );
}
