'use client';

import React, { useState } from 'react';

export function DataDeletionRequestForm() {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [requestType, setRequestType] = useState<'DELETE_ALL_DATA' | 'EXPORT_DATA' | 'OPT_OUT_ANALYTICS'>('DELETE_ALL_DATA');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<{
    deletionReceiptId: string;
    timestamp: string;
    recordsPurged: number;
    requestType: string;
    message: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/v1/privacy/deletion-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          companyName: companyName || undefined,
          requestType,
          reason: reason || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to submit privacy request.');
      }

      setReceipt(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyReceipt = () => {
    if (!receipt) return;
    navigator.clipboard.writeText(receipt.deletionReceiptId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="data-deletion"
      style={{
        border: '1px solid rgba(255, 255, 255, 0.12)',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        padding: 'clamp(1.5rem, 3vw, 2.5rem)',
        marginTop: 'var(--space-10)',
        position: 'relative',
      }}
    >
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '0.75rem',
            color: '#C882FF',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 'var(--space-2)',
          }}
        >
          GDPR ART. 17 &amp; CCPA STATUTORY PROTOCOL
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-serif), serif',
            fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
            fontWeight: 400,
            color: '#FFFFFF',
            marginBottom: 'var(--space-2)',
          }}
        >
          Self-Serve Data Deletion &amp; Rights Portal
        </h2>
        <p style={{ color: '#A8A0B8', fontSize: '0.925rem', lineHeight: 1.6, maxWidth: '720px' }}>
          Exercise your statutory right to permanent erasure (GDPR Article 17 Right to Be Forgotten) or full records export. Submissions immediately scrub or suppress matching records across our active repositories and issue an immutable receipt.
        </p>
      </div>

      {receipt ? (
        <div
          style={{
            border: '1px solid #34D399',
            backgroundColor: 'rgba(52, 211, 153, 0.06)',
            padding: 'var(--space-6)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-3)' }}>
            <span style={{ color: '#34D399', fontSize: '1.1rem' }}>✓</span>
            <span
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '0.8rem',
                color: '#34D399',
                fontWeight: 600,
                letterSpacing: '0.05em',
              }}
            >
              REQUEST RECORDED &amp; PURGE EXECUTED
            </span>
          </div>

          <p style={{ fontSize: '0.9rem', color: '#EAE6F0', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
            {receipt.message}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-4)',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              padding: 'var(--space-4)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: 'var(--space-4)',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', color: '#A8A0B8' }}>
                RECEIPT ID:
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '0.85rem',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  marginTop: '2px',
                }}
              >
                {receipt.deletionReceiptId}
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', color: '#A8A0B8' }}>
                TIMESTAMP:
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '0.8rem',
                  color: '#FFFFFF',
                  marginTop: '2px',
                }}
              >
                {new Date(receipt.timestamp).toUTCString()}
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', color: '#A8A0B8' }}>
                RECORDS PURGED:
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '0.85rem',
                  color: '#34D399',
                  fontWeight: 600,
                  marginTop: '2px',
                }}
              >
                {receipt.recordsPurged} matching record(s)
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleCopyReceipt}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                minHeight: '44px',
                padding: '0 1.25rem',
                backgroundColor: '#FFFFFF',
                color: '#070709',
                fontSize: '0.825rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans), sans-serif',
              }}
            >
              {copied ? 'Copied to Clipboard ✓' : 'Copy Deletion Receipt ID'}
            </button>

            <button
              type="button"
              onClick={() => {
                setReceipt(null);
                setEmail('');
                setReason('');
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                minHeight: '44px',
                padding: '0 1.25rem',
                backgroundColor: 'transparent',
                color: '#EAE6F0',
                fontSize: '0.825rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans), sans-serif',
              }}
            >
              Submit Another Request
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {error && (
            <div
              style={{
                padding: 'var(--space-4)',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#F87171',
                fontSize: '0.875rem',
              }}
            >
              {error}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label
                htmlFor="del-email"
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono), monospace',
                  letterSpacing: '0.04em',
                  color: '#A8A0B8',
                  textTransform: 'uppercase',
                }}
              >
                Corporate Email Address <span style={{ color: '#F87171' }}>*</span>
              </label>
              <input
                id="del-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="executive@enterprise.com"
                style={{
                  minHeight: '44px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  color: '#FFFFFF',
                  padding: '0 0.875rem',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-sans), sans-serif',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label
                htmlFor="del-company"
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono), monospace',
                  letterSpacing: '0.04em',
                  color: '#A8A0B8',
                  textTransform: 'uppercase',
                }}
              >
                Enterprise / Brand Name (Optional)
              </label>
              <input
                id="del-company"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enterprise Inc."
                style={{
                  minHeight: '44px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  color: '#FFFFFF',
                  padding: '0 0.875rem',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-sans), sans-serif',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label
              htmlFor="del-type"
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono), monospace',
                letterSpacing: '0.04em',
                color: '#A8A0B8',
                textTransform: 'uppercase',
              }}
            >
              Statutory Request Category
            </label>
            <select
              id="del-type"
              value={requestType}
              onChange={(e) => setRequestType(e.target.value as any)}
              style={{
                minHeight: '44px',
                backgroundColor: '#111015',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                color: '#FFFFFF',
                padding: '0 0.875rem',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-sans), sans-serif',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="DELETE_ALL_DATA">GDPR Art. 17 Erasure (Permanently purge all data &amp; suppress email)</option>
              <option value="EXPORT_DATA">GDPR Art. 15 / CCPA Export (Request full data export dossier)</option>
              <option value="OPT_OUT_ANALYTICS">Global Opt-Out (Suppress all analytics and email briefings)</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label
              htmlFor="del-reason"
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono), monospace',
                letterSpacing: '0.04em',
                color: '#A8A0B8',
                textTransform: 'uppercase',
              }}
            >
              Reason / Additional Context (Optional)
            </label>
            <textarea
              id="del-reason"
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Corporate privacy hygiene or engagement concluded"
              style={{
                minHeight: '44px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                color: '#FFFFFF',
                padding: '0.75rem 0.875rem',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-sans), sans-serif',
                outline: 'none',
                resize: 'vertical',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '44px',
              padding: '0 1.5rem',
              backgroundColor: '#FFFFFF',
              color: '#070709',
              fontSize: '0.875rem',
              fontWeight: 600,
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              fontFamily: 'var(--font-sans), sans-serif',
              alignSelf: 'flex-start',
              transition: 'background-color 0.2s ease',
            }}
          >
            {loading ? 'Processing Cryptographic Purge...' : 'Submit Statutory Deletion Request ↗'}
          </button>
        </form>
      )}
    </div>
  );
}
