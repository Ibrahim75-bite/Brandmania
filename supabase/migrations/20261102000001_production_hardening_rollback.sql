-- =====================================================================================
-- MIGRATION ROLLBACK: 20261102000001_production_hardening_rollback.sql
-- BRANDMANIA ROLLBACK SCRIPT FOR PRODUCTION HARDENING
-- Standards: #24 (Database Migrations), #25 (Rollback Strategies)
-- =====================================================================================

-- 1. Drop scheduled / RPC functions
DROP FUNCTION IF EXISTS public.purge_expired_unqualified_inquiries(INTEGER);
DROP FUNCTION IF EXISTS public.submit_inquiry_transactional(
    VARCHAR, VARCHAR, VARCHAR, VARCHAR, VARCHAR, JSONB, TEXT, INTEGER, VARCHAR, VARCHAR, VARCHAR
);

-- 2. Drop custom indexes
DROP INDEX IF EXISTS public.idx_inquiries_idempotency_key;
DROP INDEX IF EXISTS public.idx_inquiries_email_lower;
DROP INDEX IF EXISTS public.idx_inquiries_created_at_desc;
DROP INDEX IF EXISTS public.idx_inquiries_status_tier;
DROP INDEX IF EXISTS public.idx_audit_logs_created_at_desc;
DROP INDEX IF EXISTS public.idx_audit_logs_resource_id;
DROP INDEX IF EXISTS public.idx_dlq_status_created_at;
DROP INDEX IF EXISTS public.idx_idempotency_expires_at;

-- 3. Drop RLS policies
DROP POLICY IF EXISTS "service_role_manage_inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "service_role_append_audit_logs" ON public.audit_logs;
DROP POLICY IF EXISTS "service_role_read_audit_logs" ON public.audit_logs;
DROP POLICY IF EXISTS "service_role_manage_dlq" ON public.dead_letter_jobs;
DROP POLICY IF EXISTS "service_role_manage_idempotency" ON public.idempotency_records;

-- 4. Revert tables if needed (or keep tables while disabling RLS in development rollback)
-- In production rollback, tables can be preserved or dropped depending on disaster recovery policy
-- ALTER TABLE public.inquiries DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.audit_logs DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.dead_letter_jobs DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.idempotency_records DISABLE ROW LEVEL SECURITY;
