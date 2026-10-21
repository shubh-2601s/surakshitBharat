-- ==============================================================================
-- SURAKSHIT BHARAT: SCHEMA MIGRATION FOR SCHEMA 'surakshit'
-- Run this in Supabase SQL Editor
-- ==============================================================================

CREATE SCHEMA IF NOT EXISTS surakshit;
SET search_path TO surakshit, public;

-- 1. EXTENSIONS (Created in public or available globally)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. CUSTOM TYPES & ENUMS
DO $$ BEGIN
    CREATE TYPE surakshit.user_role AS ENUM ('citizen', 'manufacturer', 'authority', 'admin', 'public');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE surakshit.pillar_type AS ENUM ('community', 'manufacturing', 'transport', 'digital');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE surakshit.report_status AS ENUM ('submitted', 'under_review', 'assigned', 'in_progress', 'resolved', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE surakshit.claim_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. STATES & DISTRICTS
CREATE TABLE IF NOT EXISTS surakshit.states (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(4) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    cartogram_row INT NOT NULL,
    cartogram_col INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS surakshit.districts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    state_id UUID REFERENCES surakshit.states(id) ON DELETE CASCADE,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    lat NUMERIC(9,6),
    lng NUMERIC(9,6),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. USER PROFILES
CREATE TABLE IF NOT EXISTS surakshit.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(150),
    phone VARCHAR(20),
    role surakshit.user_role NOT NULL DEFAULT 'citizen',
    district_id UUID REFERENCES surakshit.districts(id) ON DELETE SET NULL,
    organization VARCHAR(150),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. HAZARD & CIVIC REPORTS
CREATE SEQUENCE IF NOT EXISTS surakshit.report_ref_seq START 100000;

CREATE TABLE IF NOT EXISTS surakshit.reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ref_no VARCHAR(20) UNIQUE NOT NULL DEFAULT ('SB-' || to_char(NOW(), 'YYYY') || '-' || nextval('surakshit.report_ref_seq')::TEXT),
    pillar surakshit.pillar_type NOT NULL DEFAULT 'community',
    category VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    lat NUMERIC(9,6),
    lng NUMERIC(9,6),
    district_id UUID REFERENCES surakshit.districts(id) ON DELETE SET NULL,
    photo_path TEXT,
    status surakshit.report_status NOT NULL DEFAULT 'submitted',
    reporter_id UUID REFERENCES surakshit.profiles(id) ON DELETE SET NULL,
    assigned_to UUID REFERENCES surakshit.profiles(id) ON DELETE SET NULL,
    due_date TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '72 hours'),
    is_demo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS surakshit.report_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id UUID REFERENCES surakshit.reports(id) ON DELETE CASCADE,
    from_status surakshit.report_status,
    to_status surakshit.report_status NOT NULL,
    note TEXT,
    actor_id UUID REFERENCES surakshit.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. MANUFACTURERS, PRODUCTS, BATCHES & VERIFICATION CLAIMS
CREATE TABLE IF NOT EXISTS surakshit.manufacturers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES surakshit.profiles(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    registration_no VARCHAR(100) UNIQUE NOT NULL,
    state_id UUID REFERENCES surakshit.states(id) ON DELETE SET NULL,
    website VARCHAR(255),
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    is_demo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS surakshit.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    manufacturer_id UUID REFERENCES surakshit.manufacturers(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    bis_standard VARCHAR(100),
    bis_license_no VARCHAR(100),
    is_demo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS surakshit.product_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES surakshit.products(id) ON DELETE CASCADE,
    batch_code VARCHAR(100) UNIQUE NOT NULL,
    qr_slug VARCHAR(120) UNIQUE NOT NULL,
    manufactured_on DATE NOT NULL,
    expiry_date DATE,
    unit_count INT DEFAULT 1,
    is_demo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS surakshit.verification_claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID REFERENCES surakshit.product_batches(id) ON DELETE CASCADE,
    manufacturer_id UUID REFERENCES surakshit.manufacturers(id) ON DELETE CASCADE,
    claim_type VARCHAR(100) NOT NULL,
    status surakshit.claim_status NOT NULL DEFAULT 'pending',
    reviewer_id UUID REFERENCES surakshit.profiles(id) ON DELETE SET NULL,
    review_note TEXT,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TRANSPORT & ROAD CORRIDORS
CREATE TABLE IF NOT EXISTS surakshit.road_segments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    district_id UUID REFERENCES surakshit.districts(id) ON DELETE CASCADE,
    length_km NUMERIC(6,2),
    risk_score INT CHECK (risk_score BETWEEN 0 AND 100),
    blackspots_count INT DEFAULT 0,
    indicators JSONB DEFAULT '{}'::JSONB,
    is_demo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS surakshit.emergency_response_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    district_id UUID REFERENCES surakshit.districts(id) ON DELETE CASCADE,
    period VARCHAR(20) NOT NULL,
    avg_minutes NUMERIC(5,2) NOT NULL,
    sample_size INT NOT NULL,
    is_demo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. DIGITAL SAFETY & ADVISORIES
CREATE TABLE IF NOT EXISTS surakshit.advisories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    adv_code VARCHAR(30) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    severity VARCHAR(20) NOT NULL DEFAULT 'High',
    source_name VARCHAR(150) NOT NULL,
    source_url TEXT,
    published_by UUID REFERENCES surakshit.profiles(id) ON DELETE SET NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_demo BOOLEAN NOT NULL DEFAULT TRUE,
    verified_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. DATA SOURCES & GRID INDICATORS
CREATE TABLE IF NOT EXISTS surakshit.data_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    url TEXT,
    source_type VARCHAR(100) NOT NULL,
    last_synced_at TIMESTAMPTZ DEFAULT NOW(),
    is_demo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS surakshit.grid_indicators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    district_id UUID REFERENCES surakshit.districts(id) ON DELETE CASCADE,
    pillar surakshit.pillar_type NOT NULL,
    indicator_key VARCHAR(100) NOT NULL,
    normalized_value NUMERIC(5,2) CHECK (normalized_value BETWEEN 0 AND 100),
    period VARCHAR(20) NOT NULL,
    data_source_id UUID REFERENCES surakshit.data_sources(id) ON DELETE SET NULL,
    is_demo BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. AUDIT LOG (APPEND ONLY)
CREATE TABLE IF NOT EXISTS surakshit.audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES surakshit.profiles(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity VARCHAR(100) NOT NULL,
    entity_id UUID,
    metadata JSONB DEFAULT '{}'::JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Grant usage on schema surakshit to anon and authenticated roles
GRANT USAGE ON SCHEMA surakshit TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA surakshit TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA surakshit TO anon, authenticated, service_role;
