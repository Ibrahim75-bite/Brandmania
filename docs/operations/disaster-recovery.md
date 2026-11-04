# Brandmania Disaster Recovery & Business Continuity Runbook

**Document Version:** 1.0.0  
**Effective Date:** 2026-11-02  
**Standards:** #26 (Automated Backups), #27 (Restore Testing), #49 (Disaster Recovery)

---

## 1. Executive Summary & Recovery Objectives

Brandmania provides elite brand strategy, AI connected systems, and performance architecture to tier-1 enterprise and haute luxury clients. Unplanned system downtime or data loss damages executive reputation and client trust.

### Key Operational Targets
- **Recovery Point Objective (RPO):** `< 15 minutes` (Maximum acceptable data loss period via WAL replication and 15-minute point-in-time snapshots).
- **Recovery Time Objective (RTO):** `< 30 minutes` (Maximum acceptable time to restore full platform availability upon disaster declaration).
- **Service Availability Target (SLA):** `99.95%` monthly uptime.

---

## 2. Backup Architecture & Snapshot Strategy

### 2.1 Automated Continuous Backup Pipeline
1. **Supabase Physical Backups:** Continuous Write-Ahead Log (WAL) archiving to immutable geo-redundant S3 object storage (multi-region replicate across primary and secondary availability zones).
2. **Deterministic Logical Backups:** Daily and hourly snapshots executed by `BackupRestoreService` with deterministic SHA-256 cryptographic checksums.
3. **Immutability & Retention:**
   - Active snapshots retained for 30 days.
   - Monthly compliance archives retained for 1 year with Object Lock enabled.
   - Unqualified/spam inquiries automatically pruned after 90 days per `/privacy` compliance policy (`purge_expired_unqualified_inquiries`).

---

## 3. Disaster Declaration & Incident Response Escalation

```text
Alert Triggered (TelemetryMonitor / Sentry / Supavisor)
         │
         ▼
Severity Assessment (P1: Complete Outage / Data Corruption)
         │
         ▼
Incident Commander Declares DR State (RTO clock begins: T=0)
         │
         ├─────────────────────────────────────────┐
         ▼                                         ▼
1. Enable Global Maintenance Mode        2. Isolate Database / Read-Only Mode
   (FeatureFlag: MAINTENANCE_MODE=true)     (Revoke Write Connections)
         │                                         │
         └──────────────────┬──────────────────────┘
                            ▼
3. Determine Point-in-Time Recovery Target (<= T - 15min)
                            ▼
4. Execute Restore via BackupRestoreService & Supabase PITR
                            ▼
5. Run Automated Integrity Checksum Verification
                            ▼
6. Smoke Test Health & Ready Probes (/api/health, /api/ready)
                            ▼
7. Disable Maintenance Mode & Restore Live Traffic (T < 30min)
```

---

## 4. Step-by-Step Restoration Procedure

### Step 1: Verify Snapshot Cryptographic Checksum
Before initiating database restoration, verify that the snapshot payload has not been corrupted or tampered with:
```typescript
import { backupRestoreService } from '@/infrastructure/persistence/backup-restore.service';

const check = backupRestoreService.verifySnapshotIntegrity(snapshot);
if (!check.isValid) {
  throw new Error(`Integrity check failed: ${check.computedChecksum} !== ${check.expectedChecksum}`);
}
```

### Step 2: Database Restoration Execution
In Node.js execution:
```bash
npm run db:migrate
```
Or programmatic restore:
```typescript
await backupRestoreService.restoreFromSnapshot(snapshot, repository);
```

### Step 3: Supabase Point-in-Time Recovery (PITR) Command
If restoring via Supabase CLI in managed cloud:
```bash
supabase db restore --target-time "2026-11-02T16:00:00Z"
```

### Step 4: Verification & Readiness Validation
Inspect cluster status via automated curl or smoke test:
```bash
curl -f -s https://agency.brandmania.com/api/ready | jq .
```
Verify that:
- `checks.persistence.status === 'ok'`
- `checks.memory.status === 'ok'`
- `checks.rateLimiter.status === 'ok'`

---

## 5. Routine Automated Restore Testing Schedule

Per Standard #27, disaster recovery plans must be exercised routinely rather than trusted blindly:
- **Weekly Automated Staging Restore:** An automated pipeline extracts the latest snapshot, restores it into an isolated staging environment, verifies row counts and SHA-256 digests, and records success metrics in `audit_logs`.
- **Quarterly Tabletop Drill:** Engineering conducts a simulated primary-region blackout to measure actual RTO under stress.
