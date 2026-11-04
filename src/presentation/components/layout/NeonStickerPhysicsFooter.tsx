'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface StickerDef {
  id: string;
  width: number;
  height: number;
  radius: number;
  render: () => React.ReactNode;
}

const STICKER_DEFS: StickerDef[] = [
  // 1. ROI (Zebra-striped Neon Green & Black rectangle)
  {
    id: 'roi',
    width: 150,
    height: 68,
    radius: 52,
    render: () => (
      <svg width="150" height="68" viewBox="0 0 150 68" fill="none">
        <rect width="150" height="68" rx="6" fill="#000000" stroke="#00FF66" strokeWidth="3.5" />
        <path d="M0 16L28 0H48L20 16H0Z" fill="#00FF66" opacity="0.35" />
        <path d="M55 0L26 34H46L75 0H55Z" fill="#00FF66" opacity="0.35" />
        <path d="M85 0L50 50H70L105 0H85Z" fill="#00FF66" opacity="0.35" />
        <path d="M115 0L72 68H92L135 0H115Z" fill="#00FF66" opacity="0.35" />
        <text x="75" y="46" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="34" textAnchor="middle" letterSpacing="0.06em">
          ROI
        </text>
      </svg>
    ),
  },

  // 2. ROAS! (Jagged starburst sticker in Electric Blue & Acid Neon Lime)
  {
    id: 'roas',
    width: 170,
    height: 84,
    radius: 60,
    render: () => (
      <svg width="170" height="84" viewBox="0 0 170 84" fill="none">
        <polygon
          points="85,2 105,22 138,12 135,38 168,46 142,62 158,80 125,74 105,82 85,68 65,82 45,74 12,80 28,62 2,46 35,38 32,12 65,22"
          fill="#00F0FF"
          stroke="#CCFF00"
          strokeWidth="3.5"
        />
        <text x="85" y="52" fill="#000000" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="28" textAnchor="middle" letterSpacing="0.04em">
          ROAS!
        </text>
      </svg>
    ),
  },

  // 3. CAC?! (Spiky explosion badge in Electric Purple with Neon Green text)
  {
    id: 'cac',
    width: 160,
    height: 78,
    radius: 56,
    render: () => (
      <svg width="160" height="78" viewBox="0 0 160 78" fill="none">
        <polygon
          points="80,2 102,18 132,6 134,32 158,40 134,50 142,74 114,64 94,76 80,64 66,76 46,64 18,74 26,50 2,40 26,32 28,6 58,18"
          fill="#1A0033"
          stroke="#9D00FF"
          strokeWidth="4"
        />
        <text x="80" y="50" fill="#00FF66" fontFamily="monospace" fontWeight="900" fontSize="28" textAnchor="middle" letterSpacing="0.05em">
          CAC?!
        </text>
      </svg>
    ),
  },

  // 4. cpc (Double overlapping heart badge in Neon Pink & Neon Green outline)
  {
    id: 'cpc',
    width: 145,
    height: 75,
    radius: 50,
    render: () => (
      <svg width="145" height="75" viewBox="0 0 145 75" fill="none">
        <path
          d="M48 14 C34 0, 12 14, 12 34 C12 54, 48 70, 48 70 C48 70, 84 54, 84 34 C84 14, 62 0, 48 14 Z"
          fill="#FF2A85"
          stroke="#00FF66"
          strokeWidth="3.5"
        />
        <path
          d="M96 14 C82 0, 60 14, 60 34 C60 54, 96 70, 96 70 C96 70, 132 54, 132 34 C132 14, 110 0, 96 14 Z"
          fill="#FF007F"
          stroke="#CCFF00"
          strokeWidth="3.5"
          opacity="0.9"
        />
        <text x="72" y="46" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="26" textAnchor="middle">
          cpc
        </text>
      </svg>
    ),
  },

  // 5. A/B (Oversized split stencil letters in Electric Violet, Neon Orange, Neon Green)
  {
    id: 'ab',
    width: 150,
    height: 76,
    radius: 54,
    render: () => (
      <svg width="150" height="76" viewBox="0 0 150 76" fill="none">
        <rect width="150" height="76" rx="8" fill="#7B00FF" stroke="#FF5500" strokeWidth="4" />
        <text x="42" y="56" fill="#00FF66" fontFamily="Impact, sans-serif" fontWeight="900" fontSize="48" textAnchor="middle">
          A
        </text>
        <line x1="75" y1="10" x2="75" y2="66" stroke="#FF5500" strokeWidth="4" strokeDasharray="6 4" />
        <text x="108" y="56" fill="#FFFFFF" fontFamily="Impact, sans-serif" fontWeight="900" fontSize="48" textAnchor="middle">
          B
        </text>
      </svg>
    ),
  },

  // 6. AUTOMATE (Ticket-stub badge in Neon Orange with bold white condensed type)
  {
    id: 'automate',
    width: 185,
    height: 64,
    radius: 64,
    render: () => (
      <svg width="185" height="64" viewBox="0 0 185 64" fill="none">
        <path
          d="M0 0 H185 V20 C177 20, 171 25, 171 32 C171 39, 177 44, 185 44 V64 H0 V44 C8 44, 14 39, 14 32 C14 25, 8 20, 0 20 Z"
          fill="#FF6B00"
          stroke="#FFFFFF"
          strokeWidth="3"
        />
        <text x="92" y="43" fill="#FFFFFF" fontFamily="Impact, sans-serif" fontSize="27" textAnchor="middle" letterSpacing="0.12em">
          AUTOMATE
        </text>
      </svg>
    ),
  },

  // 7. DUPLICATE (3D extruded diagonal sticker in Neon Orange & Electric Purple)
  {
    id: 'duplicate',
    width: 190,
    height: 68,
    radius: 64,
    render: () => (
      <svg width="190" height="68" viewBox="0 0 190 68" fill="none">
        <rect x="7" y="8" width="176" height="54" rx="6" fill="#7B00FF" />
        <rect x="3" y="3" width="176" height="54" rx="6" fill="#FF4D00" stroke="#FAF7FF" strokeWidth="3" />
        <text x="91" y="39" fill="#FAF7FF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="23" textAnchor="middle" letterSpacing="0.08em">
          DUPLICATE
        </text>
      </svg>
    ),
  },

  // 8. MARGIN! (Battery-meter / level bars badge in Electric Purple & Neon Lime)
  {
    id: 'margin',
    width: 175,
    height: 70,
    radius: 58,
    render: () => (
      <svg width="175" height="70" viewBox="0 0 175 70" fill="none">
        <rect width="175" height="70" rx="8" fill="#8E00FA" stroke="#00FF66" strokeWidth="3.5" />
        <rect x="16" y="44" width="16" height="14" fill="#00FF66" />
        <rect x="38" y="36" width="16" height="22" fill="#00FF66" />
        <rect x="60" y="26" width="16" height="32" fill="#00FF66" />
        <rect x="82" y="16" width="16" height="42" fill="#00FF66" />
        <text x="136" y="43" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="20" textAnchor="middle">
          MARGIN!
        </text>
      </svg>
    ),
  },

  // 9. PRICING POWER (High-voltage yellow pill with bold black & purple type)
  {
    id: 'pricing-power',
    width: 220,
    height: 62,
    radius: 72,
    render: () => (
      <svg width="220" height="62" viewBox="0 0 220 62" fill="none">
        <rect width="220" height="62" rx="31" fill="#FFE600" stroke="#1D0538" strokeWidth="4" />
        <text x="110" y="40" fill="#1D0538" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="20" textAnchor="middle" letterSpacing="0.08em">
          PRICING POWER
        </text>
      </svg>
    ),
  },

  // 10. STOP LEAKS (Pill badge in Electric Violet & Neon Orange)
  {
    id: 'stop-leaks',
    width: 195,
    height: 64,
    radius: 64,
    render: () => (
      <svg width="195" height="64" viewBox="0 0 195 64" fill="none">
        <rect width="195" height="64" rx="32" fill="#8E00FA" stroke="#FF5500" strokeWidth="4" />
        <circle cx="34" cy="32" r="11" fill="#FF5500" />
        <text x="118" y="40" fill="#FAF7FF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="20" textAnchor="middle" letterSpacing="0.06em">
          STOP LEAKS
        </text>
      </svg>
    ),
  },

  // 11. BRANDMANIA® (Signature Neon Yellow stamp with BrandEye emblem)
  {
    id: 'brandmania-stamp',
    width: 235,
    height: 70,
    radius: 76,
    render: () => (
      <svg width="235" height="70" viewBox="0 0 235 70" fill="none">
        <rect width="235" height="70" rx="6" fill="#FFE600" stroke="#000000" strokeWidth="4" />
        <ellipse cx="36" cy="35" rx="16" ry="9" fill="#000000" />
        <circle cx="36" cy="35" r="4.5" fill="#FFE600" />
        <text x="135" y="44" fill="#000000" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="21" textAnchor="middle" letterSpacing="0.06em">
          BRANDMANIA®
        </text>
      </svg>
    ),
  },

  // 12. LAUNCH (3D block badge in White, Black, and Neon Green)
  {
    id: 'launch',
    width: 165,
    height: 68,
    radius: 56,
    render: () => (
      <svg width="165" height="68" viewBox="0 0 165 68" fill="none">
        <polygon points="14,64 150,64 165,50 28,50" fill="#000000" />
        <polygon points="150,64 165,50 165,6 150,20" fill="#00FF66" />
        <rect x="0" y="6" width="150" height="46" fill="#FFFFFF" stroke="#000" strokeWidth="3" />
        <text x="75" y="40" fill="#000000" fontFamily="Impact, sans-serif" fontSize="32" textAnchor="middle" letterSpacing="0.08em">
          LAUNCH
        </text>
      </svg>
    ),
  },

  // 13. START (Rounded capsule in Neon Yellow with Neon Red/Purple outline)
  {
    id: 'start',
    width: 155,
    height: 64,
    radius: 54,
    render: () => (
      <svg width="155" height="64" viewBox="0 0 155 64" fill="none">
        <rect width="155" height="64" rx="16" fill="#FFE600" stroke="#FF007F" strokeWidth="4" />
        <polygon points="40,22 62,32 40,42" fill="#8E00FA" />
        <text x="96" y="42" fill="#8E00FA" fontFamily="Impact, sans-serif" fontSize="28" textAnchor="middle">
          START
        </text>
      </svg>
    ),
  },

  // 14. Analyze (Pixel-stepped badge in crisp White & Black)
  {
    id: 'analyze',
    width: 165,
    height: 62,
    radius: 54,
    render: () => (
      <svg width="165" height="62" viewBox="0 0 165 62" fill="none">
        <rect width="165" height="62" rx="4" fill="#FFFFFF" stroke="#000" strokeWidth="3.5" />
        <rect x="6" y="6" width="8" height="8" fill="#000" />
        <rect x="14" y="14" width="8" height="8" fill="#000" />
        <text x="92" y="41" fill="#000" fontFamily="monospace" fontWeight="900" fontSize="23" textAnchor="middle">
          [Analyze]
        </text>
      </svg>
    ),
  },

  // 15. LTV ↑ (Line-chart node box in Obsidian with Neon border and glowing pink data nodes)
  {
    id: 'ltv',
    width: 160,
    height: 74,
    radius: 56,
    render: () => (
      <svg width="160" height="74" viewBox="0 0 160 74" fill="none">
        <rect width="160" height="74" rx="8" fill="#07000F" stroke="#8E00FA" strokeWidth="3.5" />
        <polyline points="18,54 50,38 82,46 138,16" stroke="#00F0FF" strokeWidth="4" />
        <circle cx="50" cy="38" r="5" fill="#FF007F" />
        <circle cx="82" cy="46" r="5" fill="#FF007F" />
        <circle cx="138" cy="16" r="6" fill="#CCFF00" />
        <text x="34" y="30" fill="#FAF7FF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="18">
          LTV ↑
        </text>
      </svg>
    ),
  },

  // 16. BrandEye Sticker (Iconic almond eye with White sclera and glowing Neon Green/Violet iris)
  {
    id: 'brandeye-sticker',
    width: 155,
    height: 84,
    radius: 54,
    render: () => (
      <svg width="155" height="84" viewBox="0 0 155 84" fill="none">
        <path
          d="M8 42 C 38 12, 117 12, 147 42 C 117 72, 38 72, 8 42 Z"
          fill="#FAF7FF"
          stroke="#00FF66"
          strokeWidth="4.5"
        />
        <circle cx="77.5" cy="42" r="19" fill="#8E00FA" />
        <circle cx="77.5" cy="42" r="9.5" fill="#00FF66" />
        <circle cx="81" cy="38" r="3.5" fill="#FAF7FF" />
      </svg>
    ),
  },

  // 17. ALERT TRIGGERED (Tilted warning stamp in Neon Red-Orange with Violet border)
  {
    id: 'alert-triggered',
    width: 215,
    height: 64,
    radius: 68,
    render: () => (
      <svg width="215" height="64" viewBox="0 0 215 64" fill="none">
        <rect width="215" height="64" rx="6" fill="#FF3300" stroke="#8E00FA" strokeWidth="4" />
        <polygon points="24,46 35,18 46,46" fill="#FFE600" />
        <text x="35" y="43" fill="#000" fontWeight="900" fontSize="19" textAnchor="middle">!</text>
        <text x="126" y="40" fill="#FAF7FF" fontFamily="monospace" fontWeight="900" fontSize="17" textAnchor="middle" letterSpacing="0.06em">
          ALERT TRIGGERED
        </text>
      </svg>
    ),
  },

  // 18. SCALE 700K+ (Circular neon seal in Cyan & Neon Green)
  {
    id: 'scale-700k',
    width: 110,
    height: 110,
    radius: 55,
    render: () => (
      <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
        <circle cx="55" cy="55" r="52" fill="#080014" stroke="#00F0FF" strokeWidth="4" />
        <circle cx="55" cy="55" r="43" stroke="#CCFF00" strokeWidth="2" strokeDasharray="5 4" />
        <text x="55" y="50" fill="#00F0FF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="15" textAnchor="middle">
          SCALE
        </text>
        <text x="55" y="70" fill="#CCFF00" fontFamily="monospace" fontWeight="900" fontSize="17" textAnchor="middle">
          $700K+
        </text>
      </svg>
    ),
  },

  // 19. APIs (Neon Pink & Purple pill badge)
  {
    id: 'apis',
    width: 140,
    height: 62,
    radius: 48,
    render: () => (
      <svg width="140" height="62" viewBox="0 0 140 62" fill="none">
        <rect width="140" height="62" rx="31" fill="#FF007F" stroke="#9D00FF" strokeWidth="3.5" />
        <text x="70" y="41" fill="#FAF7FF" fontFamily="monospace" fontWeight="900" fontSize="25" textAnchor="middle" letterSpacing="0.08em">
          &lt;APIs&gt;
        </text>
      </svg>
    ),
  },

  // 20. Campaaaaaaaigns (Elongated Electric Blue pill with crisp white type)
  {
    id: 'campaigns',
    width: 235,
    height: 58,
    radius: 72,
    render: () => (
      <svg width="235" height="58" viewBox="0 0 235 58" fill="none">
        <rect width="235" height="58" rx="29" fill="#0066FF" stroke="#00F0FF" strokeWidth="3.5" />
        <text x="117.5" y="37" fill="#FAF7FF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="18" textAnchor="middle" letterSpacing="0.04em">
          Campaaaaaaaigns
        </text>
      </svg>
    ),
  },
];

interface PhysicsBody {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  vAngle: number;
  width: number;
  height: number;
  radius: number;
  isDragging: boolean;
  dragOffsetX: number;
  dragOffsetY: number;
  lastPointerX: number;
  lastPointerY: number;
  lastPointerTime: number;
}

export const NeonStickerPhysicsFooter: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bodiesRef = useRef<PhysicsBody[]>([]);
  const elementRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const activeDragIndexRef = useRef<number | null>(null);

  // Initialize Physics Bodies
  const initBodies = useCallback((containerWidth: number) => {
    bodiesRef.current = STICKER_DEFS.map((def, idx) => {
      // Stagger spawn along top
      const col = idx % 5;
      const row = Math.floor(idx / 5);
      const colWidth = Math.max(containerWidth / 5, 160);
      const startX = colWidth * col + colWidth * 0.5 + (Math.random() - 0.5) * 50;
      const startY = -40 - row * 75 - Math.random() * 35;

      return {
        x: Math.min(Math.max(startX, def.width * 0.5 + 10), containerWidth - def.width * 0.5 - 10),
        y: startY,
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 2.5 + 1.5,
        angle: (Math.random() - 0.5) * 0.35,
        vAngle: (Math.random() - 0.5) * 0.04,
        width: def.width,
        height: def.height,
        radius: def.radius,
        isDragging: false,
        dragOffsetX: 0,
        dragOffsetY: 0,
        lastPointerX: 0,
        lastPointerY: 0,
        lastPointerTime: 0,
      };
    });
  }, []);

  // Drop / Respawn Trigger
  const handleDropStickers = useCallback(() => {
    const container = containerRef.current;
    const width = container?.clientWidth || 1200;
    bodiesRef.current.forEach((body, idx) => {
      const col = idx % 5;
      const row = Math.floor(idx / 5);
      const colWidth = Math.max(width / 5, 160);
      body.x = colWidth * col + colWidth * 0.5 + (Math.random() - 0.5) * 50;
      body.y = -40 - row * 75 - Math.random() * 35;
      body.vy = Math.random() * 3 + 2;
      body.vx = (Math.random() - 0.5) * 3;
      body.vAngle = (Math.random() - 0.5) * 0.04;
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 1200;
    const height = 440;
    const floorY = height - 12;

    initBodies(width);
    setIsReady(true);

    const gravity = 0.45;
    const restitution = 0.55;
    const floorFriction = 0.88;
    const MAX_ANGULAR_VELOCITY = 0.06;

    let running = true;

    const updatePhysics = () => {
      if (!running) return;

      const currentWidth = container.clientWidth || width;
      const bodies = bodiesRef.current;

      // 1. Integration & Wall/Floor Collisions
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        if (b.isDragging) continue;

        // Apply forces & aggressive air/rotational damping
        b.vy += gravity;
        b.vx *= 0.96;
        b.vy *= 0.98;
        b.vAngle *= 0.90;

        // Enforce hard clamp on angular velocity
        b.vAngle = Math.max(-MAX_ANGULAR_VELOCITY, Math.min(MAX_ANGULAR_VELOCITY, b.vAngle));

        b.x += b.vx;
        b.y += b.vy;
        b.angle += b.vAngle;

        // Floor collision & Ground contact friction
        const bottomEdge = b.y + b.height * 0.5;
        if (bottomEdge >= floorY) {
          b.y = floorY - b.height * 0.5;
          b.vy = -b.vy * restitution;
          b.vx *= floorFriction;
          b.vAngle *= 0.65;
          if (Math.abs(b.vy) < 0.6) b.vy = 0;
        }

        // Floor contact friction zone
        if (b.y >= floorY - b.height * 0.5 - 4) {
          b.vAngle *= 0.65;
          b.vx *= 0.85;
        }

        // Left wall
        const leftEdge = b.x - b.width * 0.5;
        if (leftEdge < 8) {
          b.x = 8 + b.width * 0.5;
          b.vx = -b.vx * restitution;
          b.vAngle *= 0.8;
        }

        // Right wall
        const rightEdge = b.x + b.width * 0.5;
        if (rightEdge > currentWidth - 8) {
          b.x = currentWidth - 8 - b.width * 0.5;
          b.vx = -b.vx * restitution;
          b.vAngle *= 0.8;
        }

        // Sleeping / Rest Threshold
        if (
          Math.abs(b.vx) < 0.05 &&
          Math.abs(b.vy) < 0.1 &&
          Math.abs(b.vAngle) < 0.008 &&
          b.y >= floorY - b.height * 0.5 - 8
        ) {
          b.vx = 0;
          b.vy = 0;
          b.vAngle = 0;
        }
      }

      // 2. Pairwise Collisions
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const b1 = bodies[i];
          const b2 = bodies[j];

          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;
          const distSq = dx * dx + dy * dy;
          const minDist = b1.radius + b2.radius;

          if (distSq < minDist * minDist && distSq > 0.001) {
            const dist = Math.sqrt(distSq);
            const overlap = minDist - dist;
            const nx = dx / dist;
            const ny = dy / dist;

            // Positional separation
            if (!b1.isDragging && !b2.isDragging) {
              b1.x -= nx * overlap * 0.5;
              b1.y -= ny * overlap * 0.5;
              b2.x += nx * overlap * 0.5;
              b2.y += ny * overlap * 0.5;

              // Velocity exchange
              const rvx = b2.vx - b1.vx;
              const rvy = b2.vy - b1.vy;
              const velAlongNormal = rvx * nx + rvy * ny;

              if (velAlongNormal < 0) {
                const impulse = -(1 + restitution) * velAlongNormal * 0.5;
                b1.vx -= nx * impulse;
                b1.vy -= ny * impulse;
                b2.vx += nx * impulse;
                b2.vy += ny * impulse;

                // Scale down collision torque impulse by 90%
                const torque = (dx * rvy - dy * rvx) * 0.00006;
                b1.vAngle -= torque;
                b2.vAngle += torque;

                b1.vAngle = Math.max(-MAX_ANGULAR_VELOCITY, Math.min(MAX_ANGULAR_VELOCITY, b1.vAngle));
                b2.vAngle = Math.max(-MAX_ANGULAR_VELOCITY, Math.min(MAX_ANGULAR_VELOCITY, b2.vAngle));
              }
            } else if (b1.isDragging) {
              b2.x += nx * overlap;
              b2.y += ny * overlap;
              b2.vx += nx * 4;
              b2.vy += ny * 4;
              b2.vAngle = Math.max(-MAX_ANGULAR_VELOCITY, Math.min(MAX_ANGULAR_VELOCITY, b2.vAngle + (Math.random() - 0.5) * 0.02));
            } else if (b2.isDragging) {
              b1.x -= nx * overlap;
              b1.y -= ny * overlap;
              b1.vx -= nx * 4;
              b1.vy -= ny * 4;
              b1.vAngle = Math.max(-MAX_ANGULAR_VELOCITY, Math.min(MAX_ANGULAR_VELOCITY, b1.vAngle + (Math.random() - 0.5) * 0.02));
            }
          }
        }
      }

      // 3. Sync with DOM Elements
      for (let i = 0; i < bodies.length; i++) {
        const el = elementRefs.current[i];
        const b = bodies[i];
        if (el) {
          const tx = b.x - b.width * 0.5;
          const ty = b.y - b.height * 0.5;
          el.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) rotate(${b.angle.toFixed(3)}rad)`;
        }
      }

      animFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    // Start simulation immediately upon mount
    animFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      running = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [initBodies]);

  // Pointer drag interactions
  const handlePointerDown = (idx: number, e: React.PointerEvent) => {
    const container = containerRef.current;
    const body = bodiesRef.current[idx];
    if (!container || !body) return;

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    activeDragIndexRef.current = idx;

    const rect = container.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    body.isDragging = true;
    body.dragOffsetX = clientX - body.x;
    body.dragOffsetY = clientY - body.y;
    body.lastPointerX = clientX;
    body.lastPointerY = clientY;
    body.lastPointerTime = performance.now();
    body.vx = 0;
    body.vy = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const idx = activeDragIndexRef.current;
    if (idx === null) return;
    const container = containerRef.current;
    const body = bodiesRef.current[idx];
    if (!container || !body) return;

    const rect = container.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    const now = performance.now();
    const dt = Math.max(now - body.lastPointerTime, 16);

    body.x = clientX - body.dragOffsetX;
    body.y = clientY - body.dragOffsetY;

    // Fling velocity calculation
    const calculatedVx = ((clientX - body.lastPointerX) / dt) * 16;
    const calculatedVy = ((clientY - body.lastPointerY) / dt) * 16;
    body.vx = Math.min(Math.max(calculatedVx, -25), 25);
    body.vy = Math.min(Math.max(calculatedVy, -25), 25);

    body.lastPointerX = clientX;
    body.lastPointerY = clientY;
    body.lastPointerTime = now;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const idx = activeDragIndexRef.current;
    if (idx === null) return;
    const body = bodiesRef.current[idx];
    if (body) {
      body.isDragging = false;
      const MAX_ANGULAR_VELOCITY = 0.06;
      body.vAngle = Math.max(-MAX_ANGULAR_VELOCITY, Math.min(MAX_ANGULAR_VELOCITY, body.vx * 0.004));
    }
    activeDragIndexRef.current = null;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
  };

  return (
    <section
      aria-label="Interactive performance marketing neon sticker physics playground"
      style={{
        position: 'relative',
        width: '100%',
        height: '440px',
        minHeight: '440px',
        backgroundColor: '#090014',
        backgroundImage: 'radial-gradient(circle at 50% 100%, rgba(142, 0, 250, 0.18) 0%, transparent 70%)',
        borderTop: '1px solid rgba(200, 130, 255, 0.16)',
        overflow: 'hidden',
        userSelect: 'none',
        touchAction: 'none',
      }}
    >
      {/* Sleek Drop Stickers Button in Top-Right Corner */}
      <button
        type="button"
        onClick={handleDropStickers}
        style={{
          position: 'absolute',
          top: '16px',
          right: '24px',
          zIndex: 50,
          background: 'rgba(200, 130, 255, 0.12)',
          border: '1px solid rgba(200, 130, 255, 0.35)',
          color: '#FAF7FF',
          padding: '8px 16px',
          fontSize: '11px',
          fontFamily: 'var(--font-mono), monospace',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          borderRadius: '9999px',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          transition: 'all 0.15s ease',
        }}
        title="Drop all neon stickers"
      >
        &#x21bb; Drop Stickers
      </button>

      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {isReady &&
          STICKER_DEFS.map((def, idx) => (
            <div
              key={def.id}
              ref={(el) => {
                elementRefs.current[idx] = el;
              }}
              onPointerDown={(e) => handlePointerDown(idx, e)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: def.width,
                height: def.height,
                cursor: 'grab',
                touchAction: 'none',
                willChange: 'transform',
                transformOrigin: 'center center',
                filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.65))',
              }}
              role="button"
              tabIndex={0}
              aria-label={`Interactive sticker: ${def.id}`}
            >
              {def.render()}
            </div>
          ))}
      </div>
    </section>
  );
};
