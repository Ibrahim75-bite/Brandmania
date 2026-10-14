'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from './Container';
import { BrandEye } from '../primitives/BrandEye';
import { Button } from '../primitives/Button';
import { MAIN_NAV_LINKS, FOOTER_SECTIONS } from '@/content/navigation';
import { BRAND } from '@/content/brand';
import headerStyles from './Header.module.css';
import footerStyles from './Footer.module.css';

export function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className={headerStyles.header}>
      <Container>
        <div className={headerStyles.inner}>
          {/* Brand Logo & Wordmark */}
          <Link href="/" className={headerStyles.brandLink}>
            <BrandEye size="sm" />
            <span className={headerStyles.wordmark}>{BRAND.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={headerStyles.navDesktop} aria-label="Main Navigation">
            {MAIN_NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={headerStyles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Header Action / CTA */}
          <div className={headerStyles.headerActions}>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                const el = document.getElementById('qualification');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/#qualification';
                }
              }}
            >
              Consultation
            </Button>

            {/* Mobile Hamburger Toggle */}
            <button
              className={headerStyles.mobileToggle}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? 'Close Menu' : 'Open Navigation Menu'}
              aria-expanded={isMobileOpen}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isMobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer Menu */}
      {isMobileOpen && (
        <div
          className={headerStyles.drawerOverlay}
          onClick={() => setIsMobileOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className={headerStyles.drawer} onClick={(e) => e.stopPropagation()}>
            <div>
              <div className={headerStyles.drawerHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <BrandEye size="sm" />
                  <span className={headerStyles.wordmark}>{BRAND.name}</span>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
                  aria-label="Close Navigation Menu"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className={headerStyles.drawerLinks}>
                {MAIN_NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={headerStyles.drawerLink}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
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
                Request Diagnostic
              </Button>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                {BRAND.tagline}
              </span>
            </div>
          </div>
        </div>
      )}
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
          {FOOTER_SECTIONS.slice(0, 3).map((section) => (
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
          <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
            <Link href="/privacy" className={footerStyles.link}>Privacy</Link>
            <Link href="/terms" className={footerStyles.link}>Terms</Link>
            <Link href="/cookies" className={footerStyles.link}>Cookies</Link>
          </div>
          <p style={{ color: 'var(--color-text-muted)' }}>
            {BRAND.mottos.primary}
          </p>
        </div>
      </Container>
    </footer>
  );
}
