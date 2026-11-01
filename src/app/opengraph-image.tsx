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
          backgroundImage:
            'radial-gradient(circle at 80% 20%, rgba(142, 0, 250, 0.25) 0%, transparent 60%)',
          border: '12px solid #0F0F14',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#8E00FA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 24px #8E00FA',
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                }}
              />
            </div>
            <span
              style={{
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              BRANDMANIA
            </span>
          </div>
          <div
            style={{
              fontSize: 14,
              letterSpacing: '0.12em',
              color: '#C882FF',
              textTransform: 'uppercase',
              border: '1px solid rgba(200, 130, 255, 0.3)',
              padding: '6px 16px',
            }}
          >
            Commercial Advisory &bull; $700K+
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
            Branded for the Best.
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#A8A0B8',
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
            color: '#A8A0B8',
          }}
        >
          <span>brandmania.com</span>
          <span style={{ color: '#C882FF' }}>Executive Qualification Protocol</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
