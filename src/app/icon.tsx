import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#070709',
          borderRadius: '25%',
        }}
      >
        <svg
          viewBox="0 0 32 32"
          width="26"
          height="26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Monolithic outer ring */}
          <circle cx="16" cy="16" r="14" fill="#070709" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.8" />
          {/* Monolithic pupil */}
          <circle cx="16" cy="16" r="7" fill="#FFFFFF" />
          {/* Inner core reflection */}
          <circle cx="16" cy="16" r="3" fill="#070709" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
