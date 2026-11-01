'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './VSLPlayer.module.css';

export interface VSLPlayerProps {
  posterUrl: string;
  videoUrl?: string;
  durationMinutes?: number;
  headline?: string;
  onPlayStart?: () => void;
  onProgress?: (percent: number) => void;
  onCompleted?: () => void;
  className?: string;
}

export function VSLPlayer({
  posterUrl,
  videoUrl,
  durationMinutes = 6,
  headline = 'Executive Strategic Briefing',
  onPlayStart,
  className = '',
}: VSLPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStartPlay = () => {
    setIsPlaying(true);
    if (onPlayStart) {
      onPlayStart();
    }
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.aspectRatio}>
        {!isPlaying ? (
          <div
            className={styles.posterWrapper}
            onClick={handleStartPlay}
            role="button"
            tabIndex={0}
            aria-label={`Play ${headline}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleStartPlay();
              }
            }}
          >
            <Image
              src={posterUrl}
              alt={headline}
              fill
              className={styles.posterImage}
              sizes="(max-width: 1200px) 100vw, 1200px"
              loading="lazy"
            />

            <div className={styles.overlay}>
              <span className={styles.briefingTag}>CONFIDENTIAL BRIEFING</span>
              <button className={styles.playButton} aria-hidden="true">
                <svg className={styles.playIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>

            <div className={styles.durationBadge}>
              <span>{durationMinutes}:00 MIN</span>
            </div>
          </div>
        ) : (
          <iframe
            className={styles.videoFrame}
            src={videoUrl || 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1'}
            title={headline}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}
