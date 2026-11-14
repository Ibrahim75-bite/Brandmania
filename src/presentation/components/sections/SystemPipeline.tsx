import React from 'react';
import styles from '../sections/SystemSection.module.css';

export const SystemPipeline: React.FC = () => {
  return (
    <div className={styles.pipelineVisual}>
      <svg
        viewBox="0 0 1200 40"
        width="1200"
        height="40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '24px', display: 'block', flexShrink: 0 }}
        aria-hidden="true"
      >
        <line
          x1="0"
          y1="20"
          x2="1200"
          y2="20"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <line
          className={styles.pipelineDraw}
          x1="0"
          y1="20"
          x2="1200"
          y2="20"
          stroke="#C882FF"
          strokeWidth="2"
        />
        {[100, 300, 500, 700, 900, 1100].map((cx, i) => (
          <circle
            key={i}
            cx={cx}
            cy="20"
            r="4"
            fill="#070709"
            stroke="#C882FF"
            strokeWidth="2"
          />
        ))}
      </svg>
    </div>
  );
};
