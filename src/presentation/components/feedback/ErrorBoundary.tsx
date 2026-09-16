'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert } from '../primitives/Alert';
import { Button } from '../primitives/Button';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 'var(--space-8)', maxWidth: '600px', margin: '0 auto' }}>
          <Alert
            variant="error"
            title={this.props.fallbackTitle || 'A component error occurred'}
          >
            <p style={{ marginBottom: 'var(--space-4)' }}>
              {this.state.error?.message || 'An unexpected rendering error occurred.'}
            </p>
            <Button variant="secondary" size="sm" onClick={this.handleReset}>
              Try Again
            </Button>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}
