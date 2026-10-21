import { z } from 'zod';

export const PILLARS = ['community', 'manufacturing', 'transport', 'digital'] as const;
export type PillarType = (typeof PILLARS)[number];

export const PILLAR_METADATA: Record<
  PillarType,
  {
    id: PillarType;
    label: string;
    tagline: string;
    color: string;
    glowColor: string;
    accentHex: string;
    description: string;
  }
> = {
  community: {
    id: 'community',
    label: 'Community Safety',
    tagline: 'Civic Hazards & Public Infrastructure',
    color: 'text-pillar-community',
    glowColor: 'rgba(255, 138, 31, 0.25)',
    accentHex: '#FF8A1F',
    description: 'Empowering citizens to report localized hazards, broken utilities, and unsafe civic spaces with verified tracking.'
  },
  manufacturing: {
    id: 'manufacturing',
    label: 'Local Manufacturing',
    tagline: 'Batch Verification & BIS Standards',
    color: 'text-pillar-manufacturing',
    glowColor: 'rgba(15, 157, 138, 0.25)',
    accentHex: '#0F9D8A',
    description: 'Securing supply chains with cryptographic QR batch verification, BIS conformance, and public manufacturer audits.'
  },
  transport: {
    id: 'transport',
    label: 'Transport Safety',
    tagline: 'Road-Risk Stretches & Corridors',
    color: 'text-pillar-transport',
    glowColor: 'rgba(242, 183, 5, 0.25)',
    accentHex: '#F2B705',
    description: 'High-risk corridor mapping, pothole alerts, structural audit logs, and district emergency response metrics.'
  },
  digital: {
    id: 'digital',
    label: 'Digital Safety',
    tagline: 'Cyber Vigilance & Fraud Protection',
    color: 'text-pillar-digital',
    glowColor: 'rgba(76, 91, 212, 0.25)',
    accentHex: '#4C5BD4',
    description: 'Live advisories against phishing syndicates, verified grievance routing, and National Cyber Crime (1930) triage.'
  }
};

export const REPORT_STATUSES = [
  'submitted',
  'under_review',
  'assigned',
  'in_progress',
  'resolved',
  'rejected'
] as const;
export type ReportStatus = (typeof REPORT_STATUSES)[number];

export const USER_ROLES = ['citizen', 'manufacturer', 'authority', 'admin', 'public'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export interface StateTile {
  code: string;
  name: string;
  row: number; // grid coordinate 0-8
  col: number; // grid coordinate 0-7
  districtCount: number;
  safetyScore: number; // 0-100 composite
  pillarScores: Record<PillarType, number | null>;
  coveragePercent: number;
  hasInsufficientData: boolean;
  activeReportsCount: number;
  resolvedReportsCount: number;
}

// Cartogram Grid layout representing the States and Union Territories of India
export const INDIA_STATE_TILES: StateTile[] = [
  // Row 0 - Far North
  { code: 'LA', name: 'Ladakh', row: 0, col: 2, districtCount: 2, safetyScore: 82, pillarScores: { community: 86, manufacturing: 72, transport: 80, digital: 88 }, coveragePercent: 88, hasInsufficientData: false, activeReportsCount: 4, resolvedReportsCount: 28 },
  { code: 'JK', name: 'Jammu & Kashmir', row: 0, col: 3, districtCount: 20, safetyScore: 74, pillarScores: { community: 78, manufacturing: 65, transport: 71, digital: 82 }, coveragePercent: 82, hasInsufficientData: false, activeReportsCount: 19, resolvedReportsCount: 142 },

  // Row 1 - Upper North
  { code: 'HP', name: 'Himachal Pradesh', row: 1, col: 2, districtCount: 12, safetyScore: 85, pillarScores: { community: 89, manufacturing: 81, transport: 79, digital: 90 }, coveragePercent: 92, hasInsufficientData: false, activeReportsCount: 11, resolvedReportsCount: 198 },
  { code: 'PB', name: 'Punjab', row: 1, col: 3, districtCount: 23, safetyScore: 78, pillarScores: { community: 80, manufacturing: 82, transport: 69, digital: 81 }, coveragePercent: 89, hasInsufficientData: false, activeReportsCount: 38, resolvedReportsCount: 310 },
  { code: 'UT', name: 'Uttarakhand', row: 1, col: 4, districtCount: 13, safetyScore: 81, pillarScores: { community: 84, manufacturing: 76, transport: 75, digital: 88 }, coveragePercent: 85, hasInsufficientData: false, activeReportsCount: 14, resolvedReportsCount: 176 },

  // Row 2 - Capital & North-East start
  { code: 'HR', name: 'Haryana', row: 2, col: 2, districtCount: 22, safetyScore: 76, pillarScores: { community: 75, manufacturing: 84, transport: 68, digital: 79 }, coveragePercent: 91, hasInsufficientData: false, activeReportsCount: 42, resolvedReportsCount: 380 },
  { code: 'DL', name: 'Delhi (NCT)', row: 2, col: 3, districtCount: 11, safetyScore: 79, pillarScores: { community: 72, manufacturing: 88, transport: 70, digital: 86 }, coveragePercent: 98, hasInsufficientData: false, activeReportsCount: 89, resolvedReportsCount: 840 },
  { code: 'UP', name: 'Uttar Pradesh', row: 2, col: 4, districtCount: 75, safetyScore: 71, pillarScores: { community: 73, manufacturing: 70, transport: 65, digital: 75 }, coveragePercent: 84, hasInsufficientData: false, activeReportsCount: 140, resolvedReportsCount: 960 },
  { code: 'SK', name: 'Sikkim', row: 2, col: 5, districtCount: 6, safetyScore: 89, pillarScores: { community: 92, manufacturing: 84, transport: 87, digital: 94 }, coveragePercent: 80, hasInsufficientData: false, activeReportsCount: 3, resolvedReportsCount: 64 },
  { code: 'AR', name: 'Arunachal Pradesh', row: 2, col: 6, districtCount: 26, safetyScore: 0, pillarScores: { community: 76, manufacturing: null, transport: 64, digital: null }, coveragePercent: 48, hasInsufficientData: true, activeReportsCount: 6, resolvedReportsCount: 32 },

  // Row 3 - West to East
  { code: 'RJ', name: 'Rajasthan', row: 3, col: 1, districtCount: 50, safetyScore: 77, pillarScores: { community: 79, manufacturing: 78, transport: 74, digital: 78 }, coveragePercent: 86, hasInsufficientData: false, activeReportsCount: 56, resolvedReportsCount: 490 },
  { code: 'MP', name: 'Madhya Pradesh', row: 3, col: 3, districtCount: 55, safetyScore: 75, pillarScores: { community: 76, manufacturing: 77, transport: 72, digital: 76 }, coveragePercent: 83, hasInsufficientData: false, activeReportsCount: 63, resolvedReportsCount: 512 },
  { code: 'BR', name: 'Bihar', row: 3, col: 4, districtCount: 38, safetyScore: 69, pillarScores: { community: 71, manufacturing: 66, transport: 64, digital: 73 }, coveragePercent: 81, hasInsufficientData: false, activeReportsCount: 84, resolvedReportsCount: 520 },
  { code: 'AS', name: 'Assam', row: 3, col: 5, districtCount: 35, safetyScore: 73, pillarScores: { community: 75, manufacturing: 71, transport: 69, digital: 78 }, coveragePercent: 79, hasInsufficientData: false, activeReportsCount: 27, resolvedReportsCount: 210 },
  { code: 'NL', name: 'Nagaland', row: 3, col: 6, districtCount: 16, safetyScore: 77, pillarScores: { community: 81, manufacturing: 70, transport: 73, digital: 83 }, coveragePercent: 74, hasInsufficientData: false, activeReportsCount: 5, resolvedReportsCount: 41 },

  // Row 4 - Central belt & NE
  { code: 'GJ', name: 'Gujarat', row: 4, col: 1, districtCount: 33, safetyScore: 84, pillarScores: { community: 82, manufacturing: 92, transport: 80, digital: 83 }, coveragePercent: 94, hasInsufficientData: false, activeReportsCount: 45, resolvedReportsCount: 610 },
  { code: 'CG', name: 'Chhattisgarh', row: 4, col: 3, districtCount: 33, safetyScore: 74, pillarScores: { community: 77, manufacturing: 76, transport: 68, digital: 74 }, coveragePercent: 80, hasInsufficientData: false, activeReportsCount: 29, resolvedReportsCount: 240 },
  { code: 'JH', name: 'Jharkhand', row: 4, col: 4, districtCount: 24, safetyScore: 72, pillarScores: { community: 73, manufacturing: 75, transport: 66, digital: 74 }, coveragePercent: 82, hasInsufficientData: false, activeReportsCount: 34, resolvedReportsCount: 280 },
  { code: 'WB', name: 'West Bengal', row: 4, col: 5, districtCount: 23, safetyScore: 76, pillarScores: { community: 74, manufacturing: 81, transport: 71, digital: 79 }, coveragePercent: 88, hasInsufficientData: false, activeReportsCount: 58, resolvedReportsCount: 540 },
  { code: 'ML', name: 'Meghalaya', row: 4, col: 6, districtCount: 12, safetyScore: 79, pillarScores: { community: 82, manufacturing: 74, transport: 76, digital: 84 }, coveragePercent: 76, hasInsufficientData: false, activeReportsCount: 7, resolvedReportsCount: 52 },

  // Row 5 - Western & Eastern Deccan & NE
  { code: 'MH', name: 'Maharashtra', row: 5, col: 2, districtCount: 36, safetyScore: 83, pillarScores: { community: 81, manufacturing: 90, transport: 77, digital: 85 }, coveragePercent: 96, hasInsufficientData: false, activeReportsCount: 92, resolvedReportsCount: 980 },
  { code: 'TS', name: 'Telangana', row: 5, col: 3, districtCount: 33, safetyScore: 82, pillarScores: { community: 80, manufacturing: 87, transport: 78, digital: 84 }, coveragePercent: 92, hasInsufficientData: false, activeReportsCount: 41, resolvedReportsCount: 490 },
  { code: 'OD', name: 'Odisha', row: 5, col: 4, districtCount: 30, safetyScore: 78, pillarScores: { community: 81, manufacturing: 79, transport: 73, digital: 78 }, coveragePercent: 85, hasInsufficientData: false, activeReportsCount: 37, resolvedReportsCount: 360 },
  { code: 'MN', name: 'Manipur', row: 5, col: 6, districtCount: 16, safetyScore: 0, pillarScores: { community: 68, manufacturing: null, transport: 62, digital: 71 }, coveragePercent: 52, hasInsufficientData: true, activeReportsCount: 12, resolvedReportsCount: 34 },

  // Row 6 - Peninsular India & Southern NE
  { code: 'GA', name: 'Goa', row: 6, col: 1, districtCount: 2, safetyScore: 87, pillarScores: { community: 90, manufacturing: 83, transport: 86, digital: 89 }, coveragePercent: 90, hasInsufficientData: false, activeReportsCount: 8, resolvedReportsCount: 110 },
  { code: 'KA', name: 'Karnataka', row: 6, col: 2, districtCount: 31, safetyScore: 84, pillarScores: { community: 82, manufacturing: 89, transport: 78, digital: 88 }, coveragePercent: 95, hasInsufficientData: false, activeReportsCount: 78, resolvedReportsCount: 820 },
  { code: 'AP', name: 'Andhra Pradesh', row: 6, col: 3, districtCount: 26, safetyScore: 80, pillarScores: { community: 81, manufacturing: 83, transport: 76, digital: 81 }, coveragePercent: 89, hasInsufficientData: false, activeReportsCount: 44, resolvedReportsCount: 430 },
  { code: 'TR', name: 'Tripura', row: 6, col: 5, districtCount: 8, safetyScore: 80, pillarScores: { community: 83, manufacturing: 75, transport: 78, digital: 84 }, coveragePercent: 78, hasInsufficientData: false, activeReportsCount: 6, resolvedReportsCount: 48 },
  { code: 'MZ', name: 'Mizoram', row: 6, col: 6, districtCount: 11, safetyScore: 84, pillarScores: { community: 88, manufacturing: 78, transport: 82, digital: 89 }, coveragePercent: 75, hasInsufficientData: false, activeReportsCount: 4, resolvedReportsCount: 38 },

  // Row 7 - Deep South
  { code: 'KL', name: 'Kerala', row: 7, col: 2, districtCount: 14, safetyScore: 88, pillarScores: { community: 91, manufacturing: 85, transport: 84, digital: 92 }, coveragePercent: 94, hasInsufficientData: false, activeReportsCount: 31, resolvedReportsCount: 460 },
  { code: 'TN', name: 'Tamil Nadu', row: 7, col: 3, districtCount: 38, safetyScore: 86, pillarScores: { community: 85, manufacturing: 91, transport: 82, digital: 87 }, coveragePercent: 95, hasInsufficientData: false, activeReportsCount: 67, resolvedReportsCount: 790 },
  { code: 'PY', name: 'Puducherry', row: 7, col: 4, districtCount: 4, safetyScore: 83, pillarScores: { community: 86, manufacturing: 80, transport: 81, digital: 85 }, coveragePercent: 88, hasInsufficientData: false, activeReportsCount: 5, resolvedReportsCount: 54 },

  // Row 8 - Islands
  { code: 'LD', name: 'Lakshadweep', row: 8, col: 1, districtCount: 1, safetyScore: 86, pillarScores: { community: 90, manufacturing: 78, transport: 85, digital: 91 }, coveragePercent: 82, hasInsufficientData: false, activeReportsCount: 1, resolvedReportsCount: 18 },
  { code: 'AN', name: 'Andaman & Nicobar', row: 8, col: 5, districtCount: 3, safetyScore: 85, pillarScores: { community: 88, manufacturing: 79, transport: 84, digital: 89 }, coveragePercent: 84, hasInsufficientData: false, activeReportsCount: 3, resolvedReportsCount: 29 }
];

export const DEMO_RESOLVED_TICKER = [
  { ref: 'SB-2026-00412', title: 'Severe arterial pothole resurfaced', district: 'Bengaluru Urban, KA', pillar: 'transport', timeAgo: '9m ago' },
  { ref: 'SB-2026-00409', title: 'Counterfeit electrical batch cordoned', district: 'Surat, GJ', pillar: 'manufacturing', timeAgo: '24m ago' },
  { ref: 'SB-2026-00398', title: 'Substation earthing wire hazard grounded', district: 'Varanasi, UP', pillar: 'community', timeAgo: '41m ago' },
  { ref: 'SB-2026-00395', title: 'UPI clone payment APK advisory issued', district: 'Hyderabad, TS', pillar: 'digital', timeAgo: '1h ago' },
  { ref: 'SB-2026-00391', title: 'Broken guardrail replaced on NH-48 stretch', district: 'Pune, MH', pillar: 'transport', timeAgo: '1h 20m ago' },
  { ref: 'SB-2026-00388', title: 'Commercial food batch tested compliant', district: 'Kozhikode, KL', pillar: 'manufacturing', timeAgo: '2h ago' }
];

export const METHODOLOGY_WEIGHTS = {
  community: 0.25,
  manufacturing: 0.25,
  transport: 0.25,
  digital: 0.25,
  minCoverageThreshold: 0.60
};
