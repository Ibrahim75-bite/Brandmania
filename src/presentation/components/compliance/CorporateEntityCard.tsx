import React from 'react';
import { LEGAL_CONTENT } from '@/content/legal';

export function CorporateEntityCard() {
  const details = LEGAL_CONTENT.businessDetails;

  return (
    <div
      style={{
        border: '1px solid rgba(255, 255, 255, 0.12)',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        padding: 'var(--space-6)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '0.725rem',
          color: '#C882FF',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: 'var(--space-2)',
        }}
      >
        ENTITY DISCLOSURE
      </span>
      <h3
        style={{
          fontFamily: 'var(--font-serif), serif',
          fontSize: '1.35rem',
          fontWeight: 400,
          color: '#FFFFFF',
          marginBottom: 'var(--space-4)',
        }}
      >
        Corporate &amp; Legal Entity
      </h3>

      <dl
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          fontSize: '0.825rem',
          lineHeight: 1.5,
        }}
      >
        <div>
          <dt style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', color: '#A8A0B8', textTransform: 'uppercase' }}>
            Operating Brand &amp; Commercial Entity
          </dt>
          <dd style={{ color: '#FFFFFF', margin: 0, fontWeight: 500, marginTop: '2px' }}>
            {details.operatingEntity}
          </dd>
        </div>

        <div>
          <dt style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', color: '#A8A0B8', textTransform: 'uppercase' }}>
            Core Practice Areas
          </dt>
          <dd style={{ color: '#D8D2E2', margin: 0, marginTop: '2px' }}>
            {details.corePractices}
          </dd>
        </div>

        <div>
          <dt style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', color: '#A8A0B8', textTransform: 'uppercase' }}>
            Client Qualification Scope
          </dt>
          <dd style={{ color: '#D8D2E2', margin: 0, marginTop: '2px' }}>
            {details.qualificationScope}
          </dd>
        </div>

        <div>
          <dt style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', color: '#A8A0B8', textTransform: 'uppercase' }}>
            Official Legal, Privacy &amp; DPO Liaison
          </dt>
          <dd style={{ color: '#C882FF', margin: 0, marginTop: '2px', fontFamily: 'var(--font-mono), monospace', fontSize: '0.75rem' }}>
            {details.dpoLiaison}
          </dd>
        </div>

        <div>
          <dt style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', color: '#A8A0B8', textTransform: 'uppercase' }}>
            Statutory Protocol Reference
          </dt>
          <dd style={{ color: '#A8A0B8', margin: 0, marginTop: '2px', fontFamily: 'var(--font-mono), monospace', fontSize: '0.75rem' }}>
            Ref: {details.protocolRef}
          </dd>
        </div>
      </dl>
    </div>
  );
}
