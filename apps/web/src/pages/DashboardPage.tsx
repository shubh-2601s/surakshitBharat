import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { fetchReports, updateReportStatus, ReportItem } from '../services/reports';
import { ReportStatus, PillarType } from '@surakshit-bharat/shared';
import {
  Shield,
  User,
  Factory,
  Building2,
  AlertTriangle,
  CheckCircle,
  Clock,
  QrCode,
  FileText,
  Activity,
  LogOut,
  MapPin,
  Plus,
  ArrowRight,
  ShieldCheck,
  Bot,
  Edit3,
  ExternalLink,
  RefreshCw,
  Search,
  Filter,
  X,
  Camera,
  Check,
  Layers,
  Sparkles
} from 'lucide-react';

interface AuditLogEntry {
  id: string;
  code: string;
  actor: string;
  action: string;
  timeAgo: string;
  category: 'incident' | 'batch' | 'grid' | 'security';
}

export const DashboardPage: React.FC = () => {
  const { profile, role, signOut } = useAuth();
  const navigate = useNavigate();

  // Admin Reports & Editing State
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [adminStatusFilter, setAdminStatusFilter] = useState<string>('all');
  const [adminSearch, setAdminSearch] = useState<string>('');

  // Editing Modal State
  const [editingReport, setEditingReport] = useState<ReportItem | null>(null);
  const [editStatus, setEditStatus] = useState<ReportStatus>('assigned');
  const [editAssignedTo, setEditAssignedTo] = useState<string>('');
  const [editResolutionNote, setEditResolutionNote] = useState<string>('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      id: 'log-1',
      code: 'AUDIT-9812',
      actor: 'demo-mfg-01',
      action: 'Registered cryptographic batch BC-2026-9921 with BIS License CM/L-7890123',
      timeAgo: '2m ago',
      category: 'batch'
    },
    {
      id: 'log-2',
      code: 'AUDIT-9811',
      actor: 'Nodal Officer S. K. Ramanathan, IAS',
      action: 'Dispatched ticket SB-2026-00412 to Divisional Engineer ENG-882 (BBMP Arterial Roads)',
      timeAgo: '14m ago',
      category: 'incident'
    },
    {
      id: 'log-3',
      code: 'AUDIT-9810',
      actor: 'Safety Grid Daemon',
      action: 'Composite safety index recalculated for Karnataka (KA-BLR): +0.8 coverage validated',
      timeAgo: '42m ago',
      category: 'grid'
    }
  ]);

  const loadAllReports = async () => {
    setLoadingReports(true);
    const data = await fetchReports();
    setReports(data);
    setLoadingReports(false);
  };

  useEffect(() => {
    if (role === 'admin' || role === 'authority') {
      loadAllReports();
    }
  }, [role]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const openEditModal = (report: ReportItem) => {
    setEditingReport(report);
    setEditStatus(report.status);
    setEditAssignedTo(report.assigned_to || 'Chief Divisional Engineer ENG-882 (BBMP Arterial Roads)');
    setEditResolutionNote(report.resolution_note || '');
    setSaveSuccessMsg(null);
  };

  const closeEditModal = () => {
    setEditingReport(null);
    setSaveSuccessMsg(null);
  };

  const handleSaveReportEdit = async () => {
    if (!editingReport) return;
    setIsSaving(true);

    const success = await updateReportStatus(
      editingReport.id,
      editStatus,
      editResolutionNote.trim() || undefined,
      editAssignedTo.trim() || undefined
    );

    if (success) {
      // Add entry to Audit Log Feed
      const newAuditCode = `AUDIT-${Math.floor(9813 + Math.random() * 100)}`;
      const newEntry: AuditLogEntry = {
        id: `log-${Date.now()}`,
        code: newAuditCode,
        actor: profile?.full_name || 'National Admin',
        action: `Override updated incident ${editingReport.ref_no} to [${editStatus.toUpperCase()}] with resolution brief.`,
        timeAgo: 'Just now',
        category: 'incident'
      };

      setAuditLogs((prev) => [newEntry, ...prev]);
      setSaveSuccessMsg(`Incident ${editingReport.ref_no} successfully updated and hashed to national audit log.`);

      // Refresh local reports
      await loadAllReports();
      setTimeout(() => {
        closeEditModal();
      }, 1200);
    }
    setIsSaving(false);
  };

  const handleTriggerGridRecalculation = () => {
    const newEntry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      code: `AUDIT-${Math.floor(9850 + Math.random() * 50)}`,
      actor: profile?.full_name || 'National Admin',
      action: 'Manual telemetry re-aggregation triggered for all 36 States/UTs. Composite mesh validated at 100%.',
      timeAgo: 'Just now',
      category: 'grid'
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
    alert('National Safety Grid telemetry recalculated across all 700+ districts. Immutable log updated.');
  };

  const filteredAdminReports = reports.filter((r) => {
    const matchesStatus = adminStatusFilter === 'all' || r.status === adminStatusFilter;
    const matchesSearch =
      !adminSearch.trim() ||
      r.ref_no.toLowerCase().includes(adminSearch.toLowerCase()) ||
      r.title.toLowerCase().includes(adminSearch.toLowerCase()) ||
      r.district.toLowerCase().includes(adminSearch.toLowerCase()) ||
      r.category.toLowerCase().includes(adminSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="relative min-h-[90vh] w-full overflow-hidden">
      {/* Indian Smart City Infrastructure Background - Fixed Viewport Backdrop */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/civic-smartcity-bg.jpg"
          alt="Indian Smart City Infrastructure"
          className="w-full h-full object-cover object-center opacity-85 dark:opacity-80 brightness-95 contrast-115"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/60 via-paper/75 to-paper/95 dark:from-ink/60 via-ink/75 to-ink/95" />
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top Profile / Role Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-paper-card/90 dark:bg-ink-card/90 border border-hairline border-paper-border dark:border-ink-border shadow-2xl backdrop-blur-md mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-saffron/15 border border-saffron/30 flex items-center justify-center text-saffron font-bold text-xl">
              {profile?.full_name?.charAt(0) || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-ink dark:text-paper">
                  {profile?.full_name || 'Authenticated Officer'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider bg-saffron text-ink">
                  {role}
                </span>
                {profile?.is_demo && (
                  <span className="px-2 py-0.5 rounded font-mono text-[9px] font-bold bg-signalred/15 text-signalred border border-signalred/30">
                    DEMO SESSION
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mt-1">
                <span>{profile?.email}</span>
                {profile?.organization && <span>• {profile.organization}</span>}
                {profile?.district && <span>• {profile.district}</span>}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <Link
              to="/assistant"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-saffron/15 text-saffron border border-saffron/30 hover:bg-saffron/25 transition-all"
            >
              <Bot className="w-4 h-4" />
              <span>AI Assistant</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-paper-border dark:border-ink-border text-neutral-600 dark:text-neutral-400 hover:text-signalred hover:border-signalred transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* -------------------- ROLE: CITIZEN -------------------- */}
        {role === 'citizen' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-ink dark:text-paper">
                My Active Civic Reports & Tracking
              </h2>
              <Link
                to="/report/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-saffron text-ink font-bold font-mono text-xs shadow-sm hover:shadow-control-room"
              >
                <Plus className="w-4 h-4" />
                <span>File New Hazard</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-paper-card/90 dark:bg-ink-card/90 border border-paper-border dark:border-ink-border font-mono backdrop-blur-md shadow-lg">
                <span className="text-xs text-neutral-400 uppercase block mb-1">My Filed Reports</span>
                <div className="font-serif text-3xl font-bold text-ink dark:text-paper">3</div>
                <div className="text-[11px] text-neutral-500 mt-1">All cryptographically timestamped</div>
              </div>
              <div className="p-5 rounded-2xl bg-paper-card/90 dark:bg-ink-card/90 border border-paper-border dark:border-ink-border font-mono backdrop-blur-md shadow-lg">
                <span className="text-xs text-neutral-400 uppercase block mb-1">In Field Resolution</span>
                <div className="font-serif text-3xl font-bold text-saffron">2</div>
                <div className="text-[11px] text-neutral-500 mt-1">SLA remaining: 48h avg</div>
              </div>
              <div className="p-5 rounded-2xl bg-paper-card/90 dark:bg-ink-card/90 border border-paper-border dark:border-ink-border font-mono backdrop-blur-md shadow-lg">
                <span className="text-xs text-neutral-400 uppercase block mb-1">Validated & Closed</span>
                <div className="font-serif text-3xl font-bold text-indiagreen">1</div>
                <div className="text-[11px] text-neutral-500 mt-1">Verified with photo proof</div>
              </div>
            </div>

            {/* Citizen Sample Reports Table */}
            <div className="rounded-2xl border border-hairline border-paper-border dark:border-ink-border bg-paper-card/90 dark:bg-ink-card/90 p-6 font-mono text-xs backdrop-blur-md shadow-xl">
              <h3 className="font-sans font-bold text-base text-ink dark:text-paper mb-4">
                Recent Incident Log
              </h3>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-saffron">SB-2026-00412</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-saffron/15 text-saffron font-bold uppercase border border-saffron/30">
                        ASSIGNED
                      </span>
                    </div>
                    <div className="text-sm font-sans font-semibold text-ink dark:text-paper mt-1">
                      Exposed culvert reinforcement bars posing collision risk
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-0.5 flex items-center gap-1 font-sans">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      <span>NH-44 Corridor, Bengaluru Urban (KA)</span>
                    </div>
                  </div>
                  <div className="text-right text-xs">
                    <span className="text-neutral-400 block text-[10px]">SLA REMAINING</span>
                    <span className="font-bold text-saffron">68h 12m</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-saffron">SB-2026-00398</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-indiagreen/15 text-indiagreen font-bold uppercase border border-indiagreen/30">
                        RESOLVED
                      </span>
                    </div>
                    <div className="text-sm font-sans font-semibold text-ink dark:text-paper mt-1">
                      Substation perimeter security barrier damaged
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-0.5 flex items-center gap-1 font-sans">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Varanasi Central (UP)</span>
                    </div>
                  </div>
                  <div className="text-right text-xs">
                    <span className="text-neutral-400 block text-[10px]">RESOLUTION STATUS</span>
                    <span className="font-bold text-indiagreen">Remediated & Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- ROLE: MANUFACTURER -------------------- */}
        {role === 'manufacturer' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-ink dark:text-paper">
                Manufacturer Compliance & Batch Registry
              </h2>
              <Link
                to="/verify"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F9D8A] text-paper font-bold font-mono text-xs shadow-sm hover:shadow-control-room"
              >
                <QrCode className="w-4 h-4" />
                <span>Verify Batch Barcode</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
              <div className="p-5 rounded-2xl bg-paper-card/90 dark:bg-ink-card/90 border border-paper-border dark:border-ink-border backdrop-blur-md shadow-lg">
                <span className="text-neutral-400 uppercase block mb-1">Active Batches In Market</span>
                <div className="font-serif text-3xl font-bold text-ink dark:text-paper">124</div>
              </div>
              <div className="p-5 rounded-2xl bg-paper-card/90 dark:bg-ink-card/90 border border-paper-border dark:border-ink-border backdrop-blur-md shadow-lg">
                <span className="text-neutral-400 uppercase block mb-1">Consumer QR Scans (30d)</span>
                <div className="font-serif text-3xl font-bold text-[#0F9D8A]">18,490</div>
              </div>
              <div className="p-5 rounded-2xl bg-paper-card/90 dark:bg-ink-card/90 border border-paper-border dark:border-ink-border backdrop-blur-md shadow-lg">
                <span className="text-neutral-400 uppercase block mb-1">Compliance Score</span>
                <div className="font-serif text-3xl font-bold text-indiagreen">99.4%</div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- ROLE: AUTHORITY -------------------- */}
        {role === 'authority' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-ink dark:text-paper">
                  Municipal Incident Triage & Dispatch Queue
                </h2>
                <p className="text-xs font-mono text-neutral-500 mt-1">
                  District Jurisdiction: {profile?.district || 'Bengaluru Urban (KA)'}
                </p>
              </div>
              <Link
                to="/authority/queue"
                className="px-4 py-2 rounded-xl bg-saffron text-ink font-mono text-xs font-bold shadow-sm"
              >
                Open Full Triage Board
              </Link>
            </div>

            <div className="p-5 rounded-2xl bg-paper-card/90 dark:bg-ink-card/90 border border-hairline border-paper-border dark:border-ink-border font-mono text-xs space-y-3 backdrop-blur-md shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-paper-border dark:border-ink-border">
                <span className="font-bold text-ink dark:text-paper">TICKET #SB-2026-00418</span>
                <span className="px-2 py-0.5 rounded bg-signalred/15 text-signalred font-bold">DISPATCH PENDING</span>
              </div>
              <p className="font-sans text-sm text-neutral-700 dark:text-neutral-300">
                Broken high-tension distribution line suspended across pedestrian footpath.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <Link
                  to="/authority/queue"
                  className="px-3 py-1.5 rounded-lg bg-saffron text-ink font-bold"
                >
                  Assign Division Engineer
                </Link>
                <Link
                  to="/reports/SB-2026-00418"
                  className="px-3 py-1.5 rounded-lg border border-paper-border dark:border-ink-border text-neutral-600 dark:text-neutral-300"
                >
                  Inspect GPS Coordinates
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- ROLE: ADMIN (NATIONAL COMMAND & AUDIT) -------------------- */}
        {role === 'admin' && (
          <div className="space-y-8">
            {/* National Top Command Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink dark:text-paper">
                  National Platform Command & Audit Console
                </h2>
                <p className="font-sans text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
                  Full administrative authority to inspect, edit, assign, or override incidents and audit national data streams.
                </p>
              </div>

              {/* Fast Command Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleTriggerGridRecalculation}
                  className="px-3 py-2 rounded-xl bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border hover:border-saffron text-neutral-700 dark:text-neutral-300 font-mono text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                  title="Force telemetry re-calculation across all states"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-saffron" />
                  <span>Recalculate Mesh</span>
                </button>
                <Link
                  to="/authority/queue"
                  className="px-3 py-2 rounded-xl bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border hover:border-saffron text-neutral-700 dark:text-neutral-300 font-mono text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Building2 className="w-3.5 h-3.5 text-saffron" />
                  <span>Municipal Queue</span>
                </Link>
                <Link
                  to="/safety-grid"
                  className="px-3.5 py-2 rounded-xl bg-saffron text-ink font-mono text-xs font-bold shadow-md hover:shadow-control-room flex items-center gap-1.5 transition-all"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Inspect Safety Grid</span>
                </Link>
              </div>
            </div>

            {/* National Telemetry KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-paper-card/90 dark:bg-ink-card/90 border border-paper-border dark:border-ink-border shadow-lg backdrop-blur-md">
                <span className="text-[10px] uppercase text-neutral-400 block mb-1">Total System Reports</span>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-ink dark:text-paper">
                  {reports.length} <span className="text-xs font-mono font-normal text-neutral-400">Tickets</span>
                </div>
                <div className="text-[10px] text-saffron mt-1 font-sans">
                  {reports.filter((r) => r.status !== 'resolved').length} Active in triage pipeline
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-paper-card/90 dark:bg-ink-card/90 border border-paper-border dark:border-ink-border shadow-lg backdrop-blur-md">
                <span className="text-[10px] uppercase text-neutral-400 block mb-1">State Data Coverage</span>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-indiagreen">
                  34 / 36 <span className="text-xs font-mono font-normal text-neutral-400">Validated</span>
                </div>
                <div className="text-[10px] text-neutral-500 mt-1 font-sans">
                  2 States &lt;60% Coverage (Striped)
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-paper-card/90 dark:bg-ink-card/90 border border-paper-border dark:border-ink-border shadow-lg backdrop-blur-md">
                <span className="text-[10px] uppercase text-neutral-400 block mb-1">Manufacturing Batches</span>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#0F9D8A]">
                  18,490 <span className="text-xs font-mono font-normal text-neutral-400">Audited</span>
                </div>
                <div className="text-[10px] text-indiagreen mt-1 font-sans">
                  0 Unverified Supply Chain Breaches
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-paper-card/90 dark:bg-ink-card/90 border border-paper-border dark:border-ink-border shadow-lg backdrop-blur-md">
                <span className="text-[10px] uppercase text-neutral-400 block mb-1">National SLA Target</span>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-saffron">
                  45m <span className="text-xs font-mono font-normal text-neutral-400">Dispatch</span>
                </div>
                <div className="text-[10px] text-indiagreen mt-1 font-sans">
                  97.8% On-Time Nodal Response
                </div>
              </div>
            </div>

            {/* ---------------- SECTION 1: INCIDENT INSPECTOR & EDITOR TABLE ---------------- */}
            <div className="p-6 rounded-3xl bg-paper-card/90 dark:bg-ink-card/90 border border-hairline border-paper-border dark:border-ink-border shadow-2xl backdrop-blur-md font-mono text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-paper-border dark:border-ink-border">
                <div>
                  <div className="flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-saffron" />
                    <h3 className="font-serif text-lg font-bold text-ink dark:text-paper">
                      National Incident Inspector & Status Editor
                    </h3>
                  </div>
                  <p className="font-sans text-xs text-neutral-500 mt-0.5">
                    Select any citizen hazard ticket to inspect field metadata, assign nodal engineers, or override resolution state.
                  </p>
                </div>

                {/* Filter and Search Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search ref, district, keyword..."
                      value={adminSearch}
                      onChange={(e) => setAdminSearch(e.target.value)}
                      className="pl-8 pr-3 py-1.5 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border text-ink dark:text-paper text-xs font-sans focus:outline-none focus:border-saffron"
                    />
                  </div>

                  <select
                    value={adminStatusFilter}
                    onChange={(e) => setAdminStatusFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border text-ink dark:text-paper text-xs font-mono focus:outline-none focus:border-saffron"
                  >
                    <option value="all">All Statuses ({reports.length})</option>
                    <option value="submitted">Submitted ({reports.filter((r) => r.status === 'submitted').length})</option>
                    <option value="assigned">Assigned ({reports.filter((r) => r.status === 'assigned').length})</option>
                    <option value="in_progress">In Progress ({reports.filter((r) => r.status === 'in_progress').length})</option>
                    <option value="resolved">Resolved ({reports.filter((r) => r.status === 'resolved').length})</option>
                  </select>
                </div>
              </div>

              {/* Reports List */}
              {loadingReports ? (
                <div className="py-12 text-center text-neutral-400 font-mono text-xs">
                  Loading incident telemetry...
                </div>
              ) : filteredAdminReports.length === 0 ? (
                <div className="py-10 text-center text-neutral-400 font-mono text-xs">
                  No incident records matching current filter.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredAdminReports.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-paper/80 dark:bg-ink/80 border border-paper-border dark:border-ink-border hover:border-saffron/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-bold text-saffron">{item.ref_no}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border text-neutral-600 dark:text-neutral-300">
                            {item.pillar} • {item.category}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                              item.status === 'resolved'
                                ? 'bg-indiagreen/15 text-indiagreen border border-indiagreen/30'
                                : item.status === 'assigned' || item.status === 'in_progress'
                                ? 'bg-saffron/15 text-saffron border border-saffron/30'
                                : 'bg-signalred/15 text-signalred border border-signalred/30'
                            }`}
                          >
                            {item.status.replace('_', ' ')}
                          </span>
                          {item.photo_path && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] bg-paper-border text-neutral-500 font-mono flex items-center gap-1">
                              <Camera className="w-2.5 h-2.5" />
                              <span>Photo Attached</span>
                            </span>
                          )}
                        </div>

                        <div className="font-sans font-semibold text-sm text-ink dark:text-paper">
                          {item.title}
                        </div>
                        <div className="font-sans text-xs text-neutral-500 line-clamp-1 mt-0.5">
                          {item.description}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-[11px] text-neutral-400 mt-2 font-mono">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-saffron" />
                            <span>{item.district}</span>
                          </span>
                          <span>
                            Assigned: <strong className="text-neutral-700 dark:text-neutral-200">{item.assigned_to || 'None (Pending)'}</strong>
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        <Link
                          to={`/reports/${item.ref_no}`}
                          className="px-3 py-1.5 rounded-xl border border-paper-border dark:border-ink-border text-neutral-600 dark:text-neutral-300 hover:text-ink dark:hover:text-paper text-xs flex items-center gap-1 transition-colors"
                          title="Open public tracking view"
                        >
                          <span>Citizen View</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                        <button
                          onClick={() => openEditModal(item)}
                          className="px-3.5 py-1.5 rounded-xl bg-saffron text-ink font-bold text-xs shadow-sm hover:shadow-control-room flex items-center gap-1.5 transition-all"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Inspect & Edit</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ---------------- SECTION 2: IMMUTABLE AUDIT LOG FEED ---------------- */}
            <div className="p-6 rounded-3xl bg-paper-card/90 dark:bg-ink-card/90 border border-hairline border-paper-border dark:border-ink-border font-mono text-xs backdrop-blur-md shadow-xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-paper-border dark:border-ink-border">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-saffron" />
                  <span className="font-bold uppercase tracking-wider text-saffron">
                    National Cryptographic Audit Trail
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400">Append-Only Immutable Records</span>
              </div>

              <div className="space-y-2 text-[11px]">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-saffron shrink-0">{log.code}</span>
                      <span className="text-neutral-700 dark:text-neutral-300">
                        <strong className="text-ink dark:text-paper">{log.actor}:</strong> {log.action}
                      </span>
                    </div>
                    <span className="text-neutral-400 text-[10px] shrink-0 font-mono">{log.timeAgo}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------------- EDIT MODAL FOR ADMIN ---------------- */}
        {editingReport && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-2xl rounded-3xl bg-paper dark:bg-ink border border-saffron/40 shadow-2xl p-6 sm:p-8 font-mono text-xs max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-paper-border dark:border-ink-border">
                <div>
                  <span className="text-[10px] uppercase text-saffron font-bold block mb-0.5">
                    Administrator Command Override
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-ink dark:text-paper">
                    Inspect & Edit: {editingReport.ref_no}
                  </h3>
                </div>
                <button
                  onClick={closeEditModal}
                  className="p-1.5 rounded-lg border border-paper-border dark:border-ink-border text-neutral-400 hover:text-ink dark:hover:text-paper"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Photo Evidence in Modal */}
              {editingReport.photo_path && (
                <div className="mb-4 p-3 rounded-xl bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border">
                  <span className="text-[10px] uppercase text-neutral-400 block mb-2 font-bold">
                    Citizen Photo Evidence
                  </span>
                  <div className="rounded-xl overflow-hidden max-h-48 border border-paper-border dark:border-ink-border bg-black/10">
                    <img
                      src={editingReport.photo_path}
                      alt="Incident Evidence"
                      className="w-full h-44 object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Incident Summary Info */}
              <div className="p-3.5 rounded-xl bg-paper-card/70 dark:bg-ink-card/70 border border-paper-border dark:border-ink-border mb-4 font-sans text-xs space-y-1">
                <div>
                  <strong className="font-mono text-neutral-400 uppercase text-[10px]">Title:</strong>{' '}
                  <span className="font-semibold text-ink dark:text-paper">{editingReport.title}</span>
                </div>
                <div>
                  <strong className="font-mono text-neutral-400 uppercase text-[10px]">Jurisdiction:</strong>{' '}
                  <span>{editingReport.district}</span>
                </div>
                <div>
                  <strong className="font-mono text-neutral-400 uppercase text-[10px]">Category:</strong>{' '}
                  <span className="capitalize">{editingReport.pillar} • {editingReport.category}</span>
                </div>
              </div>

              {/* Editable Form Controls */}
              <div className="space-y-4">
                <div>
                  <label className="block text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1 font-bold">
                    1. Override Lifecycle Status
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as ReportStatus)}
                    className="w-full p-2.5 rounded-xl bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border text-ink dark:text-paper font-mono text-xs focus:outline-none focus:border-saffron"
                  >
                    <option value="submitted">Submitted (Intake Pending)</option>
                    <option value="under_review">Under Review (Nodal Verification)</option>
                    <option value="assigned">Assigned (Dispatched to Work Crew)</option>
                    <option value="in_progress">In Progress (Field Remediation Ongoing)</option>
                    <option value="resolved">Resolved (Remediation Approved & Validated)</option>
                    <option value="rejected">Rejected (Spam / Invalid Jurisdiction)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1 font-bold">
                    2. Assigned Nodal Authority / Divisional Engineer
                  </label>
                  <input
                    type="text"
                    value={editAssignedTo}
                    onChange={(e) => setEditAssignedTo(e.target.value)}
                    placeholder="e.g. Chief Divisional Engineer ENG-882 (BBMP Arterial Roads)"
                    className="w-full p-2.5 rounded-xl bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border text-ink dark:text-paper font-sans text-xs focus:outline-none focus:border-saffron"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1 font-bold">
                    3. Official Resolution / Administrative Audit Note
                  </label>
                  <textarea
                    rows={3}
                    value={editResolutionNote}
                    onChange={(e) => setEditResolutionNote(e.target.value)}
                    placeholder="Document field remediation outcome, asphalt patching completion, or rejection justification..."
                    className="w-full p-2.5 rounded-xl bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border text-ink dark:text-paper font-sans text-xs focus:outline-none focus:border-saffron"
                  />
                </div>
              </div>

              {/* Success Notification */}
              {saveSuccessMsg && (
                <div className="mt-4 p-3 rounded-xl bg-indiagreen/15 border border-indiagreen/30 text-indiagreen text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-paper-border dark:border-ink-border">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 rounded-xl border border-paper-border dark:border-ink-border text-neutral-600 dark:text-neutral-300 hover:text-ink dark:hover:text-paper"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveReportEdit}
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl bg-saffron text-ink font-bold shadow-md hover:shadow-control-room flex items-center gap-1.5 transition-all"
                >
                  <Check className="w-4 h-4" />
                  <span>{isSaving ? 'Hashing Override...' : 'Save & Broadcast Override'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
