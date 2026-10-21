-- ==============================================================================
-- SURAKSHIT BHARAT: SEED DEMONSTRATION DATA FOR SCHEMA 'surakshit'
-- ==============================================================================

SET search_path TO surakshit, public;

-- 1. SEED STATES
INSERT INTO surakshit.states (code, name, cartogram_row, cartogram_col) VALUES
('LA', 'Ladakh', 0, 2),
('JK', 'Jammu & Kashmir', 0, 3),
('HP', 'Himachal Pradesh', 1, 2),
('PB', 'Punjab', 1, 3),
('UT', 'Uttarakhand', 1, 4),
('HR', 'Haryana', 2, 2),
('DL', 'Delhi (NCT)', 2, 3),
('UP', 'Uttar Pradesh', 2, 4),
('SK', 'Sikkim', 2, 5),
('AR', 'Arunachal Pradesh', 2, 6),
('RJ', 'Rajasthan', 3, 1),
('MP', 'Madhya Pradesh', 3, 3),
('BR', 'Bihar', 3, 4),
('AS', 'Assam', 3, 5),
('NL', 'Nagaland', 3, 6),
('GJ', 'Gujarat', 4, 1),
('CG', 'Chhattisgarh', 4, 3),
('JH', 'Jharkhand', 4, 4),
('WB', 'West Bengal', 4, 5),
('ML', 'Meghalaya', 4, 6),
('MH', 'Maharashtra', 5, 2),
('TS', 'Telangana', 5, 3),
('OD', 'Odisha', 5, 4),
('MN', 'Manipur', 5, 6),
('GA', 'Goa', 6, 1),
('KA', 'Karnataka', 6, 2),
('AP', 'Andhra Pradesh', 6, 3),
('TR', 'Tripura', 6, 5),
('MZ', 'Mizoram', 6, 6),
('KL', 'Kerala', 7, 2),
('TN', 'Tamil Nadu', 7, 3),
('PY', 'Puducherry', 7, 4),
('LD', 'Lakshadweep', 8, 1),
('AN', 'Andaman & Nicobar', 8, 5)
ON CONFLICT (code) DO NOTHING;

-- 2. SEED SAMPLE DISTRICTS
INSERT INTO surakshit.districts (code, name, state_id) VALUES
('KA-BLR', 'Bengaluru Urban', (SELECT id FROM surakshit.states WHERE code = 'KA')),
('MH-MUM', 'Mumbai City', (SELECT id FROM surakshit.states WHERE code = 'MH')),
('MH-PUN', 'Pune', (SELECT id FROM surakshit.states WHERE code = 'MH')),
('DL-CEN', 'Central Delhi', (SELECT id FROM surakshit.states WHERE code = 'DL')),
('TN-CHN', 'Chennai', (SELECT id FROM surakshit.states WHERE code = 'TN')),
('GJ-AHM', 'Ahmedabad', (SELECT id FROM surakshit.states WHERE code = 'GJ')),
('UP-LKO', 'Lucknow', (SELECT id FROM surakshit.states WHERE code = 'UP')),
('WB-KOL', 'Kolkata', (SELECT id FROM surakshit.states WHERE code = 'WB'))
ON CONFLICT (code) DO NOTHING;

-- 3. SEED ADVISORIES
INSERT INTO surakshit.advisories (adv_code, title, body, severity, source_name, is_demo) VALUES
('ADV-2026-104', 'Fake PM Solar Scheme WhatsApp Syndicate', 'Malicious APK links claiming subsidized rooftop solar panel distribution install Trojan.AndroidOS.SmsStealer.', 'Critical', 'I4C / CERT-In', TRUE),
('ADV-2026-103', 'Aadhaar Biometric Update APK Clone', 'Counterfeit APK harvesting Aadhaar OTPs and biometric credentials. Citizens advised to use official mAadhaar application only.', 'High', 'UIDAI / CERT-In', TRUE),
('ADV-2026-102', 'Part-Time Task Job Scam (Telegram Ring)', 'Victims lured into rating Google Maps locations or YouTube videos with frozen withdrawal demands.', 'High', 'State Cyber Cell', TRUE)
ON CONFLICT (adv_code) DO NOTHING;

-- 4. SEED ROAD SEGMENTS
INSERT INTO surakshit.road_segments (name, district_id, length_km, risk_score, blackspots_count, is_demo) VALUES
('NH-44 Arterial (Hebbal to Airport Corridor)', (SELECT id FROM surakshit.districts WHERE code = 'KA-BLR'), 28.5, 78, 2, TRUE),
('NH-48 Corridor (Mumbai-Pune Expressway Stretch)', (SELECT id FROM surakshit.districts WHERE code = 'MH-PUN'), 94.0, 72, 1, TRUE),
('Outer Ring Road (Silk Board to Marathahalli)', (SELECT id FROM surakshit.districts WHERE code = 'KA-BLR'), 14.2, 65, 3, TRUE)
ON CONFLICT DO NOTHING;

-- 5. SEED DATA SOURCES
INSERT INTO surakshit.data_sources (name, url, source_type, is_demo) VALUES
('Bureau of Indian Standards National Registry', 'https://www.manakonline.in', 'manufacturing', TRUE),
('NHAI Highway Monitoring Cell', 'https://nhai.gov.in', 'transport', TRUE),
('Indian Cyber Crime Coordination Centre (I4C)', 'https://cybercrime.gov.in', 'digital', TRUE),
('Municipal Telemetry Dispatch System', 'https://urban.gov.in', 'community', TRUE)
ON CONFLICT DO NOTHING;
