'use client';

import React, { useEffect, useRef, useState } from 'react';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 35,
  className = '',
  style = {},
  as: Component = 'h1',
}) => {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const words = text.split(' ');

  const ComponentTag = Component as any;

  return (
    <ComponentTag
      ref={containerRef}
      className={className}
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        ...style,
      }}
    >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          style={{
            display: 'inline-block',
            marginRight: '0.28em',
            whiteSpace: 'nowrap',
          }}
        >
          {word.split('').map((char, charIndex) => {
            const index = wordIndex * 6 + charIndex;
            return (
              <span
                key={charIndex}
                style={{
                  display: 'inline-block',
                  opacity: inView ? 1 : 0,
                  filter: inView ? 'blur(0px)' : 'blur(10px)',
                  transform: inView ? 'translateY(0)' : 'translateY(8px)',
                  transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * delay}ms, filter 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * delay}ms`,
                  willChange: 'filter, opacity, transform',
                }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </ComponentTag>
  );
};
