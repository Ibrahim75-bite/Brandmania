# Health & Readiness Probes

## 1. Endpoints

### Liveness Probe: `GET /api/health`
- **Purpose**: Verifies that the Node.js process is active, responding to HTTP traffic, and not deadlocked.
- **Used by**: Container orchestrators (Docker, Kubernetes) to know when to restart a crashed container.
- **Expected Response**: HTTP `200 OK`
```json
{
  "status": "healthy",
  "uptime": 142.5,
  "timestamp": "2026-09-06T17:00:00.000Z",
  "version": "1.0.0"
}
```

### Readiness Probe: `GET /api/ready`
- **Purpose**: Verifies that all required internal subsystems (memory cache, job dispatcher, persistence store) are initialized and able to receive traffic.
- **Used by**: Load balancers to determine whether to route user traffic to this instance.
- **Expected Response**: HTTP `200 OK` (or `503 Service Unavailable` if an essential dependency is down).
```json
{
  "status": "ready",
  "checks": {
    "memory": { "status": "ok", "heapUsedMb": 45.2 },
    "persistence": { "status": "ok" },
    "rateLimiter": { "status": "ok" }
  },
  "timestamp": "2026-09-06T17:00:00.000Z"
}
```
