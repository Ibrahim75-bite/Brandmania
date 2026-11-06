'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Container } from './Container';
import { BrandEye } from '../primitives/BrandEye';
import { Button } from '../primitives/Button';
import { SwipeableSheet } from '../primitives/SwipeableSheet';
import { MAIN_NAV_LINKS, FOOTER_SECTIONS } from '@/content/navigation';
import { BRAND } from '@/content/brand';
import { LEGAL_CONTENT } from '@/content/legal';
import { ArchitecturalSkeleton } from '@/presentation/components/primitives/ArchitecturalSkeleton';
import headerStyles from './Header.module.css';
import footerStyles from './Footer.module.css';

const CommandMenu = dynamic(
  () => import('../navigation/CommandMenu').then((mod) => mod.CommandMenu),
  {
    loading: () => (
      <div style={{ minHeight: '300px', width: '100%', backgroundColor: '#070709' }}>
        <ArchitecturalSkeleton width="100%" height="300px" />
      </div>
    ),
    ssr: false,
  }
);

const NeonStickerPhysicsFooter = dynamic(
  () => import('./NeonStickerPhysicsFooter').then((mod) => mod.NeonStickerPhysicsFooter),
  {
    loading: () => (
      <footer style={{ minHeight: '440px', width: '100%', backgroundColor: '#090014' }}>
        <ArchitecturalSkeleton width="100%" height="440px" />
      </footer>
    ),
    ssr: false,
  }
);

export function Header() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

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

  if (pathname === '/consultation') {
    return (
      <header className={headerStyles.header} style={{ height: '56px' }}>
        <Container>
          <div className={headerStyles.inner} style={{ justifyContent: 'space-between', height: '56px' }}>
            <Link href="/" className={`${headerStyles.brandLink} hit-slop`}>
              <BrandEye size="sm" />
              <span className={headerStyles.wordmark}>{BRAND.name}</span>
            </Link>
            <span style={{ whiteSpace: 'nowrap', fontSize: '13px', color: '#C4B8D8', fontFamily: 'var(--font-sans), sans-serif' }}>
              30-Min Strategy Call
            </span>
          </div>
        </Container>
      </header>
    );
  }

  return (
    <header className={headerStyles.header}>
      <Container>
        <div className={headerStyles.inner}>
          <Link href="/" className={`${headerStyles.brandLink} hit-slop`}>
            <BrandEye size="sm" />
            <span className={headerStyles.wordmark}>{BRAND.name}</span>
          </Link>

          <nav className={headerStyles.navDesktop} aria-label="Main Navigation">
            {MAIN_NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={`${headerStyles.navLink} hit-slop`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={headerStyles.headerActions}>
            <button
              onClick={() => setIsCommandOpen(true)}
              className={`${headerStyles.indexTrigger} hit-slop`}
              aria-label="Open Command Menu Palette"
            >
              <span>Index</span>
            </button>

            <div className={headerStyles.desktopCtaWrapper}>
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
            </div>

            <button
              className={`${headerStyles.mobileToggle} hit-slop`}
              onClick={() => setIsMobileOpen(true)}
              aria-label={isMobileOpen ? 'Close Menu' : 'Open Navigation Menu'}
              aria-expanded={isMobileOpen}
            >
              <span className={headerStyles.mobileToggleLabel}>MENU &darr;</span>
            </button>
          </div>
        </div>
      </Container>

      <CommandMenu
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />

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
                borderRadius: '0px',
                color: '#fff',
                fontSize: '0.9375rem',
                marginTop: '0.5rem',
                cursor: 'pointer',
              }}
            >
              <span>Brandmania Command Palette</span>
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
    <footer className={footerStyles.footer} style={{ backgroundColor: '#0D0118', color: '#FAF7FF' }}>
      <Container>
        <div className={footerStyles.grid}>
          <div className={footerStyles.brandCol}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <BrandEye size="sm" />
              <span className={footerStyles.brandTitle} style={{ color: '#FAF7FF', fontFamily: 'var(--font-serif), Georgia, serif' }}>{BRAND.name}</span>
            </div>
            <p className={footerStyles.brandManifesto} style={{ color: '#C4B8D8', lineHeight: 1.65 }}>
              {BRAND.tagline}. Strategic premium consultancy engineering Margin Recovery, Brand Direction, and Consumer Scope for ambitious market leaders.
            </p>
            <span style={{ fontSize: 'var(--font-size-xs)', color: '#A8A0B8' }}>
              &ldquo;{BRAND.internalPhilosophy}&rdquo;
            </span>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '13px', color: '#C4B8D8' }}>
              <span>Operating Locations: <strong style={{ color: '#FAF7FF' }}>London &bull; New York &bull; Dubai / Cairo</strong></span>
              <span>Direct Inquiries: <a href="mailto:contact@brandmania.com" style={{ color: '#C882FF', textDecoration: 'none' }}>contact@brandmania.com</a></span>
            </div>
          </div>

          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className={footerStyles.columnTitle} style={{ color: '#C882FF', fontFamily: 'var(--font-mono), monospace' }}>{section.title}</h4>
              <ul className={footerStyles.linkList} style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {section.links.map((link) => (
                  <li key={link.href} style={{ listStyle: 'none' }}>
                    <Link
                      href={link.href}
                      className={footerStyles.link}
                      style={{ color: '#C4B8D8', textDecoration: 'none', fontSize: '14px' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={footerStyles.bottomBar} style={{ borderTop: '1px solid rgba(200, 130, 255, 0.16)', paddingTop: '1.5rem', paddingBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '11px', color: '#A8A0B8', fontFamily: 'var(--font-mono), monospace' }}>
          <span>&copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.</span>
          <span style={{ color: '#C4B8D8' }} data-protocol-ref={LEGAL_CONTENT.businessDetails.protocolRef}>
            Operating Brand &amp; Commercial Entity: {LEGAL_CONTENT.businessDetails.operatingEntity}
          </span>
          <span style={{ color: '#C882FF', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Commanding Category Leadership
          </span>
        </div>
      </Container>

      <NeonStickerPhysicsFooter />
    </footer>
  );
}
