import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'BRANDMANIA — Branded for the Best';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          backgroundColor: '#070709',
          color: '#FFFFFF',
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: '#070709',
                }}
              />
            </div>
            <span
              style={{
                fontSize: 24,
                fontWeight: 600,
                letterSpacing: '0.04em',
              }}
            >
              BRANDMANIA
            </span>
          </div>
          <div
            style={{
              fontSize: 13,
              letterSpacing: '0.02em',
              color: '#A1A1A6',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              padding: '6px 16px',
            }}
          >
            Commercial advisory &bull; $700K+
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Branded for the Best
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#A1A1A6',
              lineHeight: 1.4,
              maxWidth: '900px',
            }}
          >
            Brand Direction &bull; Margin Recovery &bull; Consumer Scope
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            paddingTop: '24px',
            fontSize: 16,
            color: '#A1A1A6',
          }}
        >
          <span>brandmania.com</span>
          <span style={{ color: '#FFFFFF' }}>Executive Qualification Protocol</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
