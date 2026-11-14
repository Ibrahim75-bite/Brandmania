import React from 'react';

export type GlyphName =
  | 'brand-direction'
  | 'margin-recovery'
  | 'consumer-scope'
  | 'stage-planning'
  | 'stage-marketing'
  | 'stage-sales'
  | 'stage-fulfillment'
  | 'stage-customer-service'
  | 'stage-post-purchase'
  | 'dim-perceived-value'
  | 'dim-psychological-pricing'
  | 'dim-emotional-attachment'
  | 'dim-social-identity'
  | 'dim-status-perception'
  | 'dim-enduring-loyalty'
  | 'dim-decision-architecture'
  | 'nda-shield'
  | 'vault-lock'
  | 'dossier-seal'
  | 'arrow-right'
  | 'arrow-up-right';

export interface ArchitecturalGlyphProps extends React.SVGProps<SVGSVGElement> {
  name: GlyphName;
  size?: number | string;
  color?: string;
  strokeWidth?: number;
}

export const ArchitecturalGlyph: React.FC<ArchitecturalGlyphProps> = ({
  name,
  size = 24,
  color = 'currentColor',
  strokeWidth = 1.5,
  className,
  style,
  ...rest
}) => {
  const renderPath = () => {
    switch (name) {
      case 'brand-direction':
        return (
          <>
            <ellipse cx="12" cy="12" rx="9" ry="5" />
            <ellipse cx="12" cy="12" rx="5" ry="9" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <circle cx="12" cy="12" r="1.5" fill={color} />
          </>
        );

      case 'margin-recovery':
        return (
          <>
            <rect x="3" y="15" width="5" height="6" />
            <rect x="9.5" y="10" width="5" height="11" />
            <rect x="16" y="5" width="5" height="16" />
            <path d="M4 11L11 4L16 9L21 3" />
            <polyline points="17 3 21 3 21 7" />
          </>
        );

      case 'consumer-scope':
        return (
          <>
            <circle cx="12" cy="12" r="8" />
            <circle cx="12" cy="12" r="4" />
            <line x1="12" y1="2" x2="12" y2="5" />
            <line x1="12" y1="19" x2="12" y2="22" />
            <line x1="2" y1="12" x2="5" y2="12" />
            <line x1="19" y1="12" x2="22" y2="12" />
          </>
        );

      case 'stage-planning':
        return (
          <>
            <rect x="4" y="4" width="16" height="16" rx="0" />
            <line x1="4" y1="9" x2="20" y2="9" />
            <line x1="9" y1="4" x2="9" y2="20" />
            <circle cx="6.5" cy="6.5" r="1" fill={color} />
          </>
        );

      case 'stage-marketing':
        return (
          <>
            <polygon points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" />
            <circle cx="12" cy="12" r="3" />
            <line x1="12" y1="3" x2="12" y2="9" />
          </>
        );

      case 'stage-sales':
        return (
          <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 6V18" />
            <path d="M15 9C15 7.5 13.5 7 12 7C10.5 7 9 7.8 9 9.5C9 12 15 11.5 15 14.5C15 16.2 13.5 17 12 17C10.2 17 9 16 9 14.5" />
          </>
        );

      case 'stage-fulfillment':
        return (
          <>
            <rect x="3" y="7" width="18" height="13" />
            <path d="M16 7V4H8V7" />
            <line x1="12" y1="11" x2="12" y2="16" />
            <polyline points="9.5 13.5 12 16 14.5 13.5" />
          </>
        );

      case 'stage-customer-service':
        return (
          <>
            <path d="M4 12C4 7.6 7.6 4 12 4C16.4 4 20 7.6 20 12V18H17V13H19C19 8.6 15.9 6 12 6C8.1 6 5 8.6 5 13H7V18H4V12Z" />
            <line x1="12" y1="18" x2="12" y2="20" />
            <circle cx="12" cy="20" r="1" fill={color} />
          </>
        );

      case 'stage-post-purchase':
        return (
          <>
            <path d="M21 12A9 9 0 1 1 12 3C16 3 19 6 19 6" />
            <polyline points="19 2 19 6 15 6" />
            <circle cx="12" cy="12" r="3" />
          </>
        );

      case 'dim-perceived-value':
        return (
          <>
            <polygon points="12 2 15 8 22 9 17 14 18.5 21 12 17.5 5.5 21 7 14 2 9 9 8 12 2" />
          </>
        );

      case 'dim-psychological-pricing':
        return (
          <>
            <rect x="3" y="6" width="18" height="12" />
            <circle cx="12" cy="12" r="3" />
            <line x1="6" y1="6" x2="6" y2="18" />
            <line x1="18" y1="6" x2="18" y2="18" />
          </>
        );

      case 'dim-emotional-attachment':
        return (
          <>
            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" />
          </>
        );

      case 'dim-social-identity':
        return (
          <>
            <circle cx="9" cy="8" r="4" />
            <path d="M2 19C2 15.7 5.1 13 9 13C12.9 13 16 15.7 16 19" />
            <circle cx="17" cy="8" r="3" />
            <path d="M17 13C19.8 13 22 15.2 22 18" />
          </>
        );

      case 'dim-status-perception':
        return (
          <>
            <polygon points="12 3 4 9 7 19 17 19 20 9 12 3" />
            <line x1="12" y1="3" x2="12" y2="19" />
            <circle cx="12" cy="11" r="2" />
          </>
        );

      case 'dim-enduring-loyalty':
        return (
          <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7V12L15 15" />
            <circle cx="12" cy="12" r="1" fill={color} />
          </>
        );

      case 'dim-decision-architecture':
        return (
          <>
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="8.5" y="14" width="7" height="7" />
            <path d="M6.5 10V12H17.5V10" />
            <line x1="12" y1="12" x2="12" y2="14" />
          </>
        );

      case 'nda-shield':
        return (
          <>
            <path d="M12 2L4 5V11C4 16.5 7.4 21.6 12 23C16.6 21.6 20 16.5 20 11V5L12 2Z" />
            <line x1="12" y1="2" x2="12" y2="23" />
          </>
        );

      case 'vault-lock':
        return (
          <>
            <rect x="5" y="11" width="14" height="10" />
            <path d="M8 11V7C8 4.8 9.8 3 12 3C14.2 3 16 4.8 16 7V11" />
            <circle cx="12" cy="16" r="1.5" fill={color} />
          </>
        );

      case 'dossier-seal':
        return (
          <>
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="8" y1="13" x2="16" y2="13" />
            <line x1="8" y1="17" x2="13" y2="17" />
          </>
        );

      case 'arrow-right':
        return (
          <>
            <line x1="4" y1="12" x2="20" y2="12" />
            <polyline points="14 6 20 12 14 18" />
          </>
        );

      case 'arrow-up-right':
        return (
          <>
            <line x1="6" y1="18" x2="18" y2="6" />
            <polyline points="9 6 18 6 18 15" />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, width: size, height: size, ...style }}
      aria-hidden="true"
      {...rest}
    >
      {renderPath()}
    </svg>
  );
};

