import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { GET as healthGet } from '@/app/api/health/route';
import { GET as readyGet } from '@/app/api/ready/route';

describe('Health & Readiness HTTP Handlers', () => {
  it('GET /api/health should return 200 with healthy status and metadata', async () => {
    const req = new NextRequest('http://localhost:3000/api/health', {
      headers: { 'x-request-id': 'test-req-health-1' },
    });

    const response = await healthGet(req);
    expect(response.status).toBe(200);

    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.data.status).toBe('healthy');
    expect(json.data.version).toBe('1.0.0');
    expect(json.meta.requestId).toBe('test-req-health-1');
  });

  it('GET /api/ready should return 200 with readiness status and subsystem checks', async () => {
    const req = new NextRequest('http://localhost:3000/api/ready', {
      headers: { 'x-request-id': 'test-req-ready-1' },
    });

    const response = await readyGet(req);
    expect(response.status).toBe(200);

    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.data.status).toBe('ready');
    expect(json.data.checks.persistence.status).toBe('ok');
    expect(json.data.checks.memory.status).toBe('ok');
    expect(json.meta.requestId).toBe('test-req-ready-1');
  });
});
