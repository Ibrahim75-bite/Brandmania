'use client';

import React, { useState, useEffect } from 'react';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { Card } from '@/presentation/components/primitives/Card';
import { Badge } from '@/presentation/components/primitives/Badge';
import { Button } from '@/presentation/components/primitives/Button';
import { Input } from '@/presentation/components/primitives/Input';
import { Alert } from '@/presentation/components/primitives/Alert';
import { Modal } from '@/presentation/components/primitives/Modal';

interface HealthData {
  status: string;
  uptimeSeconds: number;
  timestamp: string;
  version: string;
}

interface ReadyData {
  status: string;
  checks: {
    memory: { status: string; heapUsedMb: number };
    persistence: { status: string };
    rateLimiter: { status: string };
  };
}

export default function FoundationVerificationPage() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [readiness, setReadiness] = useState<ReadyData | null>(null);
  const [isLoadingProbes, setIsLoadingProbes] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [clientName, setClientName] = useState('Alexander Vance');
  const [companyName, setCompanyName] = useState('Vance & Co. Haute Horlogerie');
  const [email, setEmail] = useState('alexander@vance-horology.ch');
  const [companyTier, setCompanyTier] = useState('HAUTE_LUXURY');
  const [budgetRange, setBudgetRange] = useState('TIER_100K_250K');
  const [services, setServices] = useState<string[]>(['BRAND_DIRECTION', 'MARGIN_RECOVERY', 'NEUROMARKETING']);
  const [message, setMessage] = useState('Seeking complete brand direction realignment and margin recovery across European boutique channels.');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiResult, setApiResult] = useState<any>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchProbes = async () => {
    setIsLoadingProbes(true);
    try {
      const [healthRes, readyRes] = await Promise.all([
        fetch('/api/health'),
        fetch('/api/ready'),
      ]);
      const healthJson = await healthRes.json();
      const readyJson = await readyRes.json();
      setHealth(healthJson.data);
      setReadiness(readyJson.data);
    } catch (err) {
      console.error('Failed to probe system health:', err);
    } finally {
      setIsLoadingProbes(false);
    }
  };

  useEffect(() => {
    fetchProbes();
  }, []);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    setApiResult(null);

    try {
      const res = await fetch('/api/v1/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          companyName,
          email,
          companyTier,
          budgetRange,
          services,
          message,
        }),
      });

      const json = await res.json();
      setApiResult(json);
      if (!res.ok) {
        setFormError(json.error?.message || 'API request rejected');
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* 1. Header Hero Banner */}
      <Section spacing="sm" style={{ borderBottom: '1px solid var(--color-border-subtle)', backgroundColor: 'var(--color-bg-surface)' }}>
        <Container>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <Badge variant="purple" size="md">Architectural Foundation</Badge>
              <Badge variant="success" size="md">Internal Diagnostic Harness</Badge>
            </div>
            <h1 style={{ fontFamily: 'var(--font-family-serif)', fontSize: 'var(--font-size-3xl)', color: 'var(--color-text-primary)' }}>
              Foundation Verification Surface
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', maxWidth: '800px', fontSize: 'var(--font-size-sm)' }}>
              This surface actively validates layer boundaries, design tokens, UI primitives, API contracts, and real-time system probes.
              It is an internal surface separated from the public marketing experience.
            </p>
          </div>
        </Container>
      </Section>

      <Container>
        {/* 2. System Probes & Reliability */}
        <Section spacing="sm">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
            <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)' }}>
              1. System Observability & Probes
            </h2>
            <Button variant="ghost" size="sm" onClick={fetchProbes} isLoading={isLoadingProbes}>
              Refresh Probes
            </Button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
            <Card variant="elevated">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>LIVENESS PROBE</span>
                <Badge variant={health?.status === 'healthy' ? 'success' : 'error'} size="sm">
                  {health?.status || 'Probing...'}
                </Badge>
              </div>
              <p style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                /api/health
              </p>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
                Uptime: {health ? `${health.uptimeSeconds}s` : '--'} • Version: {health?.version || '--'}
              </p>
            </Card>

            <Card variant="elevated">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>READINESS PROBE</span>
                <Badge variant={readiness?.status === 'ready' ? 'success' : 'warning'} size="sm">
                  {readiness?.status || 'Probing...'}
                </Badge>
              </div>
              <p style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                /api/ready
              </p>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
                Heap: {readiness?.checks.memory.heapUsedMb ?? '--'} MB • Persistence: {readiness?.checks.persistence.status ?? '--'}
              </p>
            </Card>

            <Card variant="elevated">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>SECURITY & RATE LIMITER</span>
                <Badge variant="purple" size="sm">Active</Badge>
              </div>
              <p style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                In-Memory Sliding
              </p>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
                Window: 60s • Max Requests: 60 / IP
              </p>
            </Card>
          </div>
        </Section>

        {/* 3. Design System & UI Primitives Sandbox */}
        <Section spacing="sm">
          <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-4)' }}>
            2. Design Tokens & UI Primitives Sandbox
          </h2>

          <Card variant="surface" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {/* Colors */}
            <div>
              <h3 style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>
                PALETTE TOKENS
              </h3>
              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 4, background: 'var(--color-accent-purple)' }} />
                  <span style={{ fontSize: 'var(--font-size-xs)' }}>Imperial Purple</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 4, background: 'var(--color-bg-base)', border: '1px solid #333' }} />
                  <span style={{ fontSize: 'var(--font-size-xs)' }}>Obsidian #070709</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 4, background: 'var(--color-bg-elevated)', border: '1px solid #333' }} />
                  <span style={{ fontSize: 'var(--font-size-xs)' }}>Elevated #161620</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 4, background: 'var(--color-status-success)' }} />
                  <span style={{ fontSize: 'var(--font-size-xs)' }}>Success</span>
                </div>
              </div>
            </div>

            {/* Buttons & Dialogs */}
            <div>
              <h3 style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>
                BUTTON VARIANTS & DIALOGS
              </h3>
              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center' }}>
                <Button variant="primary" size="md">Primary Action</Button>
                <Button variant="secondary" size="md">Secondary Action</Button>
                <Button variant="outline" size="md">Outline Action</Button>
                <Button variant="ghost" size="md">Ghost Action</Button>
                <Button variant="primary" size="md" isLoading>Loading State</Button>
                <Button variant="outline" size="md" onClick={() => setIsModalOpen(true)}>Open Test Modal</Button>
              </div>
            </div>
          </Card>
        </Section>

        {/* 4. End-to-End Architectural Test Form */}
        <Section spacing="md">
          <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-2)' }}>
            3. End-to-End Boundary Verification: Inquiry Intake API
          </h2>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
            Submits live through the full boundary stack: <code>Request Context → Rate Limiter → Zod Schema → SubmitInquiryUseCase → Domain Entity → InMemoryRepository → Standardized Response</code>.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 'var(--space-6)' }}>
            <Card variant="elevated">
              <form onSubmit={handleInquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <Input
                  label="Executive Client Name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                />
                <Input
                  label="Corporate Entity / Brand"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
                <Input
                  label="Business Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                  <div>
                    <label style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                      Company Tier
                    </label>
                    <select
                      value={companyTier}
                      onChange={(e) => setCompanyTier(e.target.value)}
                      style={{
                        width: '100%',
                        height: 42,
                        marginTop: 4,
                        background: 'var(--color-bg-surface)',
                        color: 'var(--color-text-primary)',
                        border: '1px solid var(--color-border-default)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0 8px',
                      }}
                    >
                      <option value="HAUTE_LUXURY">Haute Luxury</option>
                      <option value="GLOBAL_ENTERPRISE">Global Enterprise</option>
                      <option value="MID_MARKET">Mid Market</option>
                      <option value="EMERGING_ENTERPRISE">Emerging Enterprise</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                      Budget Allocation
                    </label>
                    <select
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      style={{
                        width: '100%',
                        height: 42,
                        marginTop: 4,
                        background: 'var(--color-bg-surface)',
                        color: 'var(--color-text-primary)',
                        border: '1px solid var(--color-border-default)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0 8px',
                      }}
                    >
                      <option value="TIER_50K_100K">$50k - $100k</option>
                      <option value="TIER_100K_250K">$100k - $250k</option>
                      <option value="TIER_250K_500K">$250k - $500k</option>
                      <option value="TIER_500K_PLUS">$500k+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                    Engagement Scope / Message
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{
                      width: '100%',
                      marginTop: 4,
                      background: 'var(--color-bg-surface)',
                      color: 'var(--color-text-primary)',
                      border: '1px solid var(--color-border-default)',
                      borderRadius: 'var(--radius-md)',
                      padding: '8px',
                      fontFamily: 'inherit',
                      fontSize: 'var(--font-size-sm)',
                    }}
                  />
                </div>

                <Button variant="primary" size="lg" type="submit" isLoading={isSubmitting}>
                  Execute POST /api/v1/inquiries
                </Button>
              </form>
            </Card>

            {/* Response Viewer */}
            <Card variant="surface" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                  Live API Contract Response
                </span>
                {apiResult && (
                  <Badge variant={apiResult.success ? 'success' : 'error'} size="sm">
                    {apiResult.success ? '201 Created' : 'Error Response'}
                  </Badge>
                )}
              </div>

              {formError && (
                <Alert variant="error" title="Submission Error" style={{ marginBottom: 'var(--space-3)' }}>
                  {formError}
                </Alert>
              )}

              <pre
                style={{
                  background: 'var(--color-bg-base)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-4)',
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-accent-purple-light)',
                  fontFamily: 'var(--font-family-mono)',
                  overflowX: 'auto',
                  flex: 1,
                  minHeight: '260px',
                }}
              >
                {apiResult ? JSON.stringify(apiResult, null, 2) : '// Submit the inquiry form to inspect the standardized API response envelope.'}
              </pre>
            </Card>
          </div>
        </Section>
      </Container>

      {/* Test Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Foundation Modal Primitive">
        <p style={{ marginBottom: 'var(--space-4)', lineHeight: 'var(--line-height-normal)' }}>
          This modal validates the accessible dialog primitive: focus trapping, Escape key listener, backdrop click dismiss, and luxury styling tokens.
        </p>
        <Button variant="primary" size="md" onClick={() => setIsModalOpen(false)}>
          Dismiss Dialog
        </Button>
      </Modal>
    </div>
  );
}
