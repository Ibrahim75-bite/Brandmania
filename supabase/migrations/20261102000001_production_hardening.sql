-- =====================================================================================
-- MIGRATION: 20261102000001_production_hardening.sql
-- BRANDMANIA PRODUCTION HARDENING MIGRATION
-- Standards: #1 (RLS), #5 (Transactions), #13 (Indexing), #24 (Migrations), 
--            #38 (Least Privilege), #48 (Data Retention)
-- =====================================================================================

-- 1. Ensure required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Create inquiries table if not exists
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name VARCHAR(100) NOT NULL,
    company_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company_tier VARCHAR(50) NOT NULL,
    budget_range VARCHAR(50) NOT NULL,
    services JSONB NOT NULL DEFAULT '[]'::jsonb,
    message TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING_QUALIFICATION',
    priority_score INTEGER NOT NULL DEFAULT 50,
    idempotency_key VARCHAR(128) NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Create immutable audit_logs table
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action VARCHAR(100) NOT NULL,
    actor VARCHAR(255) NOT NULL,
    resource_id VARCHAR(100) NOT NULL,
    context JSONB NOT NULL DEFAULT '{}'::jsonb,
    ip_address VARCHAR(45) NULL,
    request_id VARCHAR(100) NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Create dead_letter_jobs table
CREATE TABLE IF NOT EXISTS public.dead_letter_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id VARCHAR(100) NOT NULL,
    job_name VARCHAR(100) NOT NULL,
    payload JSONB NOT NULL,
    error_message TEXT NOT NULL,
    error_stack TEXT NULL,
    attempts INTEGER NOT NULL DEFAULT 3,
    status VARCHAR(50) NOT NULL DEFAULT 'DEAD',
    failed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Create idempotency_records table for database-backed atomic idempotency
CREATE TABLE IF NOT EXISTS public.idempotency_records (
    key VARCHAR(128) PRIMARY KEY,
    status VARCHAR(50) NOT NULL DEFAULT 'IN_FLIGHT', -- 'IN_FLIGHT' | 'RESOLVED'
    status_code INTEGER NULL,
    response_payload JSONB NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '24 hours')
);

-- =====================================================================================
-- #1 & #38: ROW LEVEL SECURITY (RLS) & LEAST PRIVILEGE
-- =====================================================================================

-- Enable RLS on all tables
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dead_letter_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.idempotency_records ENABLE ROW LEVEL SECURITY;

-- Revoke all default public/anon permissions
REVOKE ALL ON public.inquiries FROM anon, authenticated;
REVOKE ALL ON public.audit_logs FROM anon, authenticated;
REVOKE ALL ON public.dead_letter_jobs FROM anon, authenticated;
REVOKE ALL ON public.idempotency_records FROM anon, authenticated;

-- Drop any pre-existing policies for clean idempotent migration
DROP POLICY IF EXISTS "service_role_manage_inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "service_role_append_audit_logs" ON public.audit_logs;
DROP POLICY IF EXISTS "service_role_read_audit_logs" ON public.audit_logs;
DROP POLICY IF EXISTS "service_role_manage_dlq" ON public.dead_letter_jobs;
DROP POLICY IF EXISTS "service_role_manage_idempotency" ON public.idempotency_records;

-- inquiries: only service_role backend can access and mutate
CREATE POLICY "service_role_manage_inquiries"
    ON public.inquiries
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- audit_logs: append-only for service_role, immutable (no updates or deletes allowed)
CREATE POLICY "service_role_append_audit_logs"
    ON public.audit_logs
    FOR INSERT
    TO service_role
    WITH CHECK (true);

CREATE POLICY "service_role_read_audit_logs"
    ON public.audit_logs
    FOR SELECT
    TO service_role
    USING (true);

-- dead_letter_jobs: service_role access only
CREATE POLICY "service_role_manage_dlq"
    ON public.dead_letter_jobs
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- idempotency_records: service_role access only
CREATE POLICY "service_role_manage_idempotency"
    ON public.idempotency_records
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- =====================================================================================
-- #13: DATABASE INDEXING (B-TREE & EXPRESSION INDEXES)
-- =====================================================================================

CREATE UNIQUE INDEX IF NOT EXISTS idx_inquiries_idempotency_key 
    ON public.inquiries (idempotency_key) 
    WHERE idempotency_key IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_inquiries_email_lower 
    ON public.inquiries (lower(email));

CREATE INDEX IF NOT EXISTS idx_inquiries_created_at_desc 
    ON public.inquiries (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_inquiries_status_tier 
    ON public.inquiries (status, company_tier);

CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at_desc 
    ON public.audit_logs (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_audit_logs_resource_id 
    ON public.audit_logs (resource_id);

CREATE INDEX IF NOT EXISTS idx_dlq_status_created_at 
    ON public.dead_letter_jobs (status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_idempotency_expires_at 
    ON public.idempotency_records (expires_at);

-- =====================================================================================
-- #5: DATABASE TRANSACTIONS (ATOMIC RPC FUNCTION)
-- =====================================================================================

CREATE OR REPLACE FUNCTION public.submit_inquiry_transactional(
    p_client_name VARCHAR(100),
    p_company_name VARCHAR(100),
    p_email VARCHAR(255),
    p_company_tier VARCHAR(50),
    p_budget_range VARCHAR(50),
    p_services JSONB,
    p_message TEXT,
    p_priority_score INTEGER,
    p_idempotency_key VARCHAR(128),
    p_request_id VARCHAR(100),
    p_actor_ip VARCHAR(45)
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_inquiry_id UUID;
    v_now TIMESTAMPTZ := NOW();
    v_result JSONB;
BEGIN
    -- Check idempotency first if key provided
    IF p_idempotency_key IS NOT NULL THEN
        PERFORM 1 FROM public.inquiries WHERE idempotency_key = p_idempotency_key;
        IF FOUND THEN
            RAISE EXCEPTION 'IDEMPOTENCY_KEY_DUPLICATE: An inquiry with key % already exists', p_idempotency_key
                USING ERRCODE = '23505';
        END IF;
    END IF;

    -- 1. Insert Inquiry Record
    INSERT INTO public.inquiries (
        client_name,
        company_name,
        email,
        company_tier,
        budget_range,
        services,
        message,
        priority_score,
        idempotency_key,
        created_at,
        updated_at
    ) VALUES (
        p_client_name,
        p_company_name,
        p_email,
        p_company_tier,
        p_budget_range,
        p_services,
        p_message,
        p_priority_score,
        p_idempotency_key,
        v_now,
        v_now
    ) RETURNING id INTO v_inquiry_id;

    -- 2. Insert Immutable Audit Log
    INSERT INTO public.audit_logs (
        action,
        actor,
        resource_id,
        context,
        ip_address,
        request_id,
        created_at
    ) VALUES (
        'INQUIRY_SUBMITTED',
        p_email,
        v_inquiry_id::TEXT,
        jsonb_build_object(
            'company_name', p_company_name,
            'company_tier', p_company_tier,
            'budget_range', p_budget_range,
            'priority_score', p_priority_score,
            'idempotency_key', p_idempotency_key
        ),
        p_actor_ip,
        p_request_id,
        v_now
    );

    -- 3. Record Idempotency Key in idempotency_records
    IF p_idempotency_key IS NOT NULL THEN
        INSERT INTO public.idempotency_records (
            key,
            status,
            status_code,
            response_payload,
            created_at,
            expires_at
        ) VALUES (
            p_idempotency_key,
            'RESOLVED',
            201,
            jsonb_build_object(
                'id', v_inquiry_id,
                'email', p_email,
                'company_tier', p_company_tier,
                'priority_score', p_priority_score,
                'created_at', v_now
            ),
            v_now,
            v_now + INTERVAL '24 hours'
        )
        ON CONFLICT (key) DO UPDATE
            SET status = 'RESOLVED',
                status_code = 201,
                response_payload = EXCLUDED.response_payload;
    END IF;

    v_result := jsonb_build_object(
        'success', true,
        'id', v_inquiry_id,
        'client_name', p_client_name,
        'email', p_email,
        'company_tier', p_company_tier,
        'priority_score', p_priority_score,
        'created_at', v_now
    );

    RETURN v_result;
EXCEPTION
    WHEN OTHERS THEN
        -- Automatic ACID rollback occurs on exception
        RAISE;
END;
$$;

-- Revoke execute from public/anon, grant only to service_role
REVOKE EXECUTE ON FUNCTION public.submit_inquiry_transactional FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.submit_inquiry_transactional TO service_role;

-- =====================================================================================
-- #48: DATA RETENTION CLEANUP FUNCTION
-- Purges unqualified/rejected inquiries older than retention_days (default 90)
-- and deletes expired idempotency records older than 24 hours.
-- =====================================================================================

CREATE OR REPLACE FUNCTION public.purge_expired_unqualified_inquiries(
    p_retention_days INTEGER DEFAULT 90
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_inquiries_purged INTEGER := 0;
    v_idempotency_purged INTEGER := 0;
    v_cutoff_time TIMESTAMPTZ := NOW() - (p_retention_days || ' days')::INTERVAL;
BEGIN
    -- 1. Delete rejected or unqualified inquiries beyond retention window
    DELETE FROM public.inquiries
    WHERE status IN ('REJECTED', 'UNQUALIFIED', 'SPAM')
      AND created_at < v_cutoff_time;
    GET DIAGNOSTICS v_inquiries_purged = ROW_COUNT;

    -- 2. Delete expired idempotency keys
    DELETE FROM public.idempotency_records
    WHERE expires_at < NOW();
    GET DIAGNOSTICS v_idempotency_purged = ROW_COUNT;

    -- 3. Log the retention purge event in audit logs
    INSERT INTO public.audit_logs (
        action,
        actor,
        resource_id,
        context,
        created_at
    ) VALUES (
        'DATA_RETENTION_PURGE',
        'SYSTEM_CRON',
        'RETENTION_JOB',
        jsonb_build_object(
            'retention_days', p_retention_days,
            'inquiries_purged', v_inquiries_purged,
            'idempotency_purged', v_idempotency_purged,
            'cutoff_time', v_cutoff_time
        ),
        NOW()
    );

    RETURN jsonb_build_object(
        'success', true,
        'inquiries_purged', v_inquiries_purged,
        'idempotency_purged', v_idempotency_purged,
        'cutoff_time', v_cutoff_time
    );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.purge_expired_unqualified_inquiries FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.purge_expired_unqualified_inquiries TO service_role;

-- =====================================================================================
-- #3: SUPABASE STORAGE LOCKDOWN
-- Creates private storage bucket with strict MIME type, size limits, and RLS.
-- =====================================================================================

-- Create private brand assets bucket (public = false by default)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'brand-assets',
  'brand-assets',
  false,                                          -- #3: private bucket, not public
  5242880,                                        -- #3: 5MB file size limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']  -- #3: restricted MIME types
)
ON CONFLICT (id) DO UPDATE SET
  public = false,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

-- #6: Enforce RLS on storage.objects so PostgREST never exposes raw storage to browser clients
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Revoke all default permissions on storage.objects
REVOKE ALL ON storage.objects FROM anon, authenticated;

-- Only service_role can manage storage.objects
CREATE POLICY IF NOT EXISTS "service_role_manage_storage_objects"
    ON storage.objects
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Deny all access to anon and authenticated on storage.objects (explicit lock-down)
CREATE POLICY IF NOT EXISTS "deny_anon_storage_access"
    ON storage.objects
    FOR ALL
    TO anon, authenticated
    USING (false)
    WITH CHECK (false);
