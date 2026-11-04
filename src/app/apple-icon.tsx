import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
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
          borderRadius: '22%',
          border: '4px solid #161622',
        }}
      >
        <svg
          viewBox="0 0 180 180"
          width="130"
          height="130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {}
          <circle cx="90" cy="90" r="80" stroke="#FFFFFF" strokeWidth="4" strokeOpacity="0.25" />
          {}
          <circle cx="90" cy="90" r="64" stroke="#FFFFFF" strokeWidth="8" strokeOpacity="0.8" />
          {}
          <circle cx="90" cy="90" r="34" fill="#FFFFFF" />
          {}
          <circle cx="90" cy="90" r="14" fill="#070709" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
