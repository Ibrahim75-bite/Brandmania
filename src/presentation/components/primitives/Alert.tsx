import React, { HTMLAttributes } from 'react';
import styles from './Alert.module.css';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
}

export function Alert({
  children,
  variant = 'info',
  title,
  className,
  ...props
}: AlertProps) {
  const classNames = [
    styles.alert,
    styles[variant],
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} role="alert" {...props}>
      {title && <h4 className={styles.title}>{title}</h4>}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
