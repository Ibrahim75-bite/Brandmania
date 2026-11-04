import React from 'react';
import Link from 'next/link';
import { Container } from '@/presentation/components/layout/Container';
import { CornerArcs } from '@/presentation/components/brand/CornerArcs';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { Badge } from '@/presentation/components/primitives/Badge';

export default function NotFound() {
  return (
    <div
      style={{
        backgroundColor: '#0D011A',
        backgroundImage: 'linear-gradient(135deg, #0D011A 0%, #1A0033 100%)',
        color: '#FAF7FF',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 3vw, 4rem)',
        borderBottom: '1px solid rgba(200, 130, 255, 0.16)',
      }}
    >
      {}
      <CornerArcs position="top-left" size={240} opacity={0.06} color="#C882FF" strokeWidth={12} />
      <CornerArcs position="bottom-right" size={240} opacity={0.04} color="#C882FF" strokeWidth={12} />

      {}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '640px',
          height: '640px',
          opacity: 0.03,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        <BrandEye size="xl" glow={false} idSuffix="notFoundWatermark" />
      </div>

      <Container size="md">
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            border: '1px solid rgba(200, 130, 255, 0.16)',
            backgroundColor: '#1A0033',
            padding: 'clamp(2.5rem, 5vw, 4.5rem)',
            textAlign: 'center',
          }}
        >
          {}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
            <Badge variant="neutral" size="sm">
              0404 / Coordinate disconnected
            </Badge>
          </div>

          {}
          <h1
            style={{
              fontFamily: 'var(--font-serif), Instrument Serif, serif',
              fontSize: 'clamp(2.25rem, 5vw, 4rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: '#FAF7FF',
              letterSpacing: '-0.02em',
              marginBottom: 'var(--space-4)',
            }}
          >
            0404 / Perception Lost
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              color: '#C4B8D8',
              lineHeight: 1.6,
              maxWidth: '560px',
              margin: '0 auto var(--space-8)',
            }}
          >
            The requested architectural resource, strategic brief, or digital coordinate does not exist within the current BRANDMANIA perception system.
          </p>

          {}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '48px',
                padding: '0.85rem 2rem',
                backgroundColor: '#FAF7FF',
                color: '#0D011A',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.02em',
                textDecoration: 'none',
                boxShadow: 'none',
                transition: 'opacity 0.2s ease',
              }}
            >
              Return to Brandmania ↗
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
