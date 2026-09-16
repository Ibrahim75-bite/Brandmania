# Disaster Recovery & Rollback Procedures

## 1. Rollback Strategy
Because deployments produce immutable Docker containers tagged with Git commit SHAs, rolling back is instantaneous:

```bash
# Roll back to previous container image tag
docker stop agency-platform
docker run -d -p 3000:3000 --name agency-platform agency-platform:<PREVIOUS_GIT_SHA>
```

## 2. In-Memory Persistence & Future Database Migration
Currently, the persistence port `IInquiryRepository` is backed by an in-memory store for development and testing. When migrating to a permanent SQL database (e.g. PostgreSQL + Prisma/Drizzle):
1. Create schema migrations under `prisma/migrations/` or `drizzle/`.
2. Apply migrations during the deployment pre-start hook: `npm run db:migrate`.
3. If a migration fails, the readiness probe (`/api/ready`) will fail, preventing the orchestrator from directing production traffic to the new instance.
4. Database backups must be executed via automated snapshots before applying any schema migration.
