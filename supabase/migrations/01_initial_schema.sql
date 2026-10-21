-- ==============================================================================
-- SURAKSHIT BHARAT: CORE DATABASE SCHEMA
-- Unified National Safety Intelligence Platform (Measure. Route. Resolve.)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. CUSTOM TYPES & ENUMS
CREATE TYPE user_role AS ENUM ('citizen', 'manufacturer', 'authority', 'admin', 'public');
CREATE TYPE pillar_type AS ENUM ('community', 'manufacturing', 'transport', 'digital');
CREATE TYPE report_status AS ENUM ('submitted', 'under_review', 'assigned', 'in_progress', 'resolved', 'rejected');
CREATE TYPE claim_status AS ENUM ('pending', 'approved', 'rejected');

-- 3. STATES & DISTRICTS
CREATE TABLE states (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(4) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    cartogram_row INT NOT NULL,
    cartogram_col INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE districts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    state_id UUID REFERENCES states(id) ON DELETE CASCADE,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    lat NUMERIC(9,6),
    lng NUMERIC(9,6),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. USER PROFILES
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(150),
    phone VARCHAR(20),
    role user_role NOT NULL DEFAULT 'citizen',
    district_id UUID REFERENCES districts(id) ON DELETE SET NULL,
    organization VARCHAR(150),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. HAZARD & CIVIC REPORTS
CREATE SEQUENCE report_ref_seq START 100000;

CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ref_no VARCHAR(20) UNIQUE NOT NULL DEFAULT ('SB-' || to_char(NOW(), 'YYYY') || '-' || nextval('report_ref_seq')::TEXT),
    pillar pillar_type NOT NULL DEFAULT 'community',
    category VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    lat NUMERIC(9,6),
    lng NUMERIC(9,6),
    district_id UUID REFERENCES districts(id) ON DELETE SET NULL,
    photo_path TEXT,
    status report_status NOT NULL DEFAULT 'submitted',
    reporter_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
    due_date TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '72 hours'),
    is_demo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE report_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
    from_status report_status,
    to_status report_status NOT NULL,
    note TEXT,
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. MANUFACTURERS, PRODUCTS, BATCHES & VERIFICATION CLAIMS
CREATE TABLE manufacturers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    registration_no VARCHAR(100) UNIQUE NOT NULL,
    state_id UUID REFERENCES states(id) ON DELETE SET NULL,
    website VARCHAR(255),
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    is_demo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    manufacturer_id UUID REFERENCES manufacturers(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    bis_standard VARCHAR(100),
    bis_license_no VARCHAR(100),
    is_demo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE product_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    batch_code VARCHAR(100) UNIQUE NOT NULL,
    qr_slug VARCHAR(120) UNIQUE NOT NULL,
    manufactured_on DATE NOT NULL,
    expiry_date DATE,
    unit_count INT DEFAULT 1,
    is_demo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE verification_claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID REFERENCES product_batches(id) ON DELETE CASCADE,
    manufacturer_id UUID REFERENCES manufacturers(id) ON DELETE CASCADE,
    claim_type VARCHAR(100) NOT NULL,
    status claim_status NOT NULL DEFAULT 'pending',
    reviewer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    review_note TEXT,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TRANSPORT & ROAD CORRIDORS
CREATE TABLE road_segments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    district_id UUID REFERENCES districts(id) ON DELETE CASCADE,
    length_km NUMERIC(6,2),
    risk_score INT CHECK (risk_score BETWEEN 0 AND 100),
    blackspots_count INT DEFAULT 0,
    indicators JSONB DEFAULT '{}'::JSONB,
    is_demo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE emergency_response_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    district_id UUID REFERENCES districts(id) ON DELETE CASCADE,
    period VARCHAR(20) NOT NULL,
    avg_minutes NUMERIC(5,2) NOT NULL,
    sample_size INT NOT NULL,
    is_demo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. DIGITAL SAFETY & ADVISORIES
CREATE TABLE advisories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    adv_code VARCHAR(30) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    severity VARCHAR(20) NOT NULL DEFAULT 'High',
    source_name VARCHAR(150) NOT NULL,
    source_url TEXT,
    published_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_demo BOOLEAN NOT NULL DEFAULT TRUE,
    verified_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. SAFETY GRID INDICATORS & DATA SOURCES
CREATE TABLE data_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    url TEXT,
    source_type VARCHAR(100) NOT NULL,
    last_synced_at TIMESTAMPTZ DEFAULT NOW(),
    is_demo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE grid_indicators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    district_id UUID REFERENCES districts(id) ON DELETE CASCADE,
    pillar pillar_type NOT NULL,
    indicator_key VARCHAR(100) NOT NULL,
    normalized_value NUMERIC(5,2) CHECK (normalized_value BETWEEN 0 AND 100),
    period VARCHAR(20) NOT NULL,
    data_source_id UUID REFERENCES data_sources(id) ON DELETE SET NULL,
    is_demo BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. AUDIT LOG (APPEND ONLY)
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity VARCHAR(100) NOT NULL,
    entity_id UUID,
    metadata JSONB DEFAULT '{}'::JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE manufacturers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE road_segments ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_response_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE advisories ENABLE ROW LEVEL SECURITY;
ALTER TABLE grid_indicators ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Public can read aggregated indicators, verified advisories, road segments, verified manufacturers
CREATE POLICY "Public read states & districts" ON states FOR SELECT USING (TRUE);
CREATE POLICY "Public read districts" ON districts FOR SELECT USING (TRUE);
CREATE POLICY "Public read advisories" ON advisories FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public read road segments" ON road_segments FOR SELECT USING (TRUE);
CREATE POLICY "Public read grid indicators" ON grid_indicators FOR SELECT USING (TRUE);
CREATE POLICY "Public read verified manufacturers" ON manufacturers FOR SELECT USING (TRUE);
CREATE POLICY "Public read batches" ON product_batches FOR SELECT USING (TRUE);

-- Citizens can create reports and view ONLY their own reports
CREATE POLICY "Citizens create reports" ON reports FOR INSERT WITH CHECK (auth.uid() = reporter_id);
CREATE POLICY "Citizens view own reports" ON reports FOR SELECT USING (
    auth.uid() = reporter_id OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('authority', 'admin'))
);

-- Manufacturers can manage only their own products, but CANNOT approve claims
CREATE POLICY "Manufacturers insert own claims" ON verification_claims FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM manufacturers WHERE id = manufacturer_id AND owner_id = auth.uid())
);
CREATE POLICY "Manufacturers cannot approve claims" ON verification_claims FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Audit log: strictly append-only (no UPDATE or DELETE policies exist)
CREATE POLICY "Audit log insert only" ON audit_log FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Admins view audit log" ON audit_log FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
