import { supabase } from '../lib/supabase';
import { ReportStatus, PillarType } from '@surakshit-bharat/shared';

export interface ReportItem {
  id: string;
  ref_no: string;
  pillar: PillarType;
  category: string;
  title: string;
  description: string;
  district: string;
  lat?: number;
  lng?: number;
  status: ReportStatus;
  photo_path?: string;
  due_date: string;
  created_at: string;
  assigned_to?: string;
  resolution_note?: string;
  is_demo: boolean;
}

// In-memory demo store to ensure real-time responsiveness even if local network or Supabase tables are warming up
let LOCAL_REPORTS: ReportItem[] = [
  {
    id: 'rep-01',
    ref_no: 'SB-2026-00418',
    pillar: 'community',
    category: 'Electrical Hazard',
    title: 'Broken high-tension distribution line suspended across pedestrian footpath',
    description: 'High-voltage feeder snapped during heavy winds, dangling 4 feet above ground near bus shelter. Severe electrocution hazard.',
    district: 'Bengaluru Urban (KA)',
    status: 'submitted',
    due_date: new Date(Date.now() + 72 * 3600 * 1000).toISOString(),
    created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    is_demo: true
  },
  {
    id: 'rep-02',
    ref_no: 'SB-2026-00412',
    pillar: 'transport',
    category: 'Road / Highway Defect',
    title: 'Exposed culvert reinforcement bars on NH-44 arterial corridor',
    description: 'Concrete erosion exposed sharp steel rebar across fast lane, causing immediate blowout hazard for night traffic.',
    district: 'Bengaluru Urban (KA)',
    status: 'assigned',
    assigned_to: 'Divisional Engineer ENG-882 (BBMP Arterial Roads)',
    due_date: new Date(Date.now() + 68 * 3600 * 1000).toISOString(),
    created_at: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    is_demo: true
  },
  {
    id: 'rep-03',
    ref_no: 'SB-2026-00398',
    pillar: 'community',
    category: 'Substation Defect',
    title: 'Substation safety grill damaged & ungrounded earthing wire',
    description: 'Perimeter protection broken with exposed transformer connections.',
    district: 'Varanasi Central (UP)',
    status: 'resolved',
    assigned_to: 'Executive Engineer V-12',
    resolution_note: 'Enclosure replaced with anti-climb fencing and earthing re-grounded.',
    due_date: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    created_at: new Date(Date.now() - 40 * 3600 * 1000).toISOString(),
    is_demo: true
  }
];

export async function fetchReports(districtFilter?: string): Promise<ReportItem[]> {
  try {
    const query = supabase.from('reports').select('*').order('created_at', { ascending: false });
    const { data, error } = await query;
    if (data && data.length > 0) {
      return data as ReportItem[];
    }
  } catch (err) {
    console.warn('Supabase fetch reports fallback:', err);
  }

  // Filter local store
  if (districtFilter) {
    return LOCAL_REPORTS.filter((r) => r.district.toLowerCase().includes(districtFilter.toLowerCase()));
  }
  return LOCAL_REPORTS;
}

export async function getReportByRef(refNo: string): Promise<ReportItem | null> {
  try {
    const { data, error } = await supabase.from('reports').select('*').eq('ref_no', refNo).single();
    if (data) return data as ReportItem;
  } catch (err) {
    console.warn('Supabase lookup fallback:', err);
  }

  const found = LOCAL_REPORTS.find((r) => r.ref_no.toUpperCase() === refNo.trim().toUpperCase());
  return found || null;
}

export async function createReport(reportData: {
  pillar: PillarType;
  category: string;
  title: string;
  description: string;
  district: string;
  photo_path?: string;
  reporter_id?: string;
}): Promise<ReportItem> {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  const ref_no = `SB-2026-${randomNum}`;

  const newReport: ReportItem = {
    id: `rep-${Date.now()}`,
    ref_no,
    pillar: reportData.pillar,
    category: reportData.category,
    title: reportData.title,
    description: reportData.description,
    district: reportData.district,
    photo_path: reportData.photo_path,
    status: 'submitted',
    due_date: new Date(Date.now() + 72 * 3600 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    is_demo: true
  };

  try {
    await supabase.from('reports').insert({
      ref_no,
      pillar: reportData.pillar,
      category: reportData.category,
      title: reportData.title,
      description: reportData.description,
      photo_path: reportData.photo_path,
      status: 'submitted'
    });
  } catch (err) {
    console.warn('Supabase report insert note:', err);
  }

  // Store in memory
  LOCAL_REPORTS.unshift(newReport);
  return newReport;
}

export async function updateReportStatus(
  reportId: string,
  newStatus: ReportStatus,
  note?: string,
  assignedTo?: string
): Promise<boolean> {
  try {
    await supabase.from('reports').update({
      status: newStatus,
      assigned_to: assignedTo,
      updated_at: new Date().toISOString()
    }).eq('id', reportId);
  } catch (e) {
    console.warn('Supabase update status note:', e);
  }

  // Update in local store
  const item = LOCAL_REPORTS.find((r) => r.id === reportId || r.ref_no === reportId);
  if (item) {
    item.status = newStatus;
    if (assignedTo) item.assigned_to = assignedTo;
    if (note) item.resolution_note = note;
    return true;
  }
  return false;
}
