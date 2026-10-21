import React, { useState, useEffect } from 'react';
import { fetchReports, updateReportStatus, ReportItem } from '../services/reports';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  Building2,
  Clock,
  MapPin,
  CheckCircle,
  AlertTriangle,
  UserCheck,
  Filter,
  Search,
  ExternalLink,
  Shield,
  Layers
} from 'lucide-react';

export const AuthorityQueuePage: React.FC = () => {
  const { profile } = useAuth();
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [districtFilter, setDistrictFilter] = useState<string>('');
  const [activeActionId, setActiveActionId] = useState<string | null>(null);
  const [engineerName, setEngineerName] = useState('Divisional Engineer ENG-904');
  const [resolveNote, setResolveNote] = useState('On-site inspection completed. Hazard remediated with photographic proof.');

  const loadData = async () => {
    setLoading(true);
    const data = await fetchReports(districtFilter);
    setReports(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [districtFilter]);

  const handleAssign = async (id: string) => {
    await updateReportStatus(id, 'assigned', undefined, engineerName);
    setActiveActionId(null);
    await loadData();
  };

  const handleResolve = async (id: string) => {
    await updateReportStatus(id, 'resolved', resolveNote);
    setActiveActionId(null);
    await loadData();
  };

  const filtered = reports.filter((r) => {
    if (statusFilter === 'all') return true;
    return r.status === statusFilter;
  });

  return (
    <div className="relative min-h-[90vh] w-full overflow-hidden">
      {/* Subtle Smart City Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/civic-smartcity-bg.jpg"
          alt="Civic Smart City Infrastructure"
          className="w-full h-full object-cover object-center opacity-10 dark:opacity-20 brightness-90 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/90 via-paper/95 to-paper dark:from-ink/85 dark:via-ink/95 dark:to-ink" />
        <div className="absolute inset-0 bg-grain" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-hairline border-paper-border dark:border-ink-border">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-saffron uppercase tracking-widest mb-2">
              <Building2 className="w-4 h-4" />
              <span>Phase 3 • Municipal Authority Dispatch Console</span>
              <span className="px-1.5 py-0.5 rounded font-mono font-bold bg-signalred/15 text-signalred text-[10px] border border-signalred/30">
                DEMO DATA
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-ink dark:text-paper tracking-tight">
              Municipal Triage & Field Dispatch Queue
            </h1>
            <p className="font-sans text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl">
              Inspect geo-tagged citizen hazard tickets, assign SLA-bound divisional work crews, and
              verify photographic closure proofs.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-signalred/15 text-signalred font-bold border border-signalred/30">
              {reports.filter((r) => r.status === 'submitted').length} Critical Unassigned
            </span>
          </div>
        </div>

        {/* Filters Strip */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 font-mono text-xs">
          <div className="flex items-center flex-wrap gap-1 p-1 rounded-xl bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border">
            {(['all', 'submitted', 'assigned', 'in_progress', 'resolved'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                  statusFilter === st
                    ? 'bg-saffron text-ink font-bold shadow-sm'
                    : 'text-neutral-500 hover:text-ink dark:hover:text-paper'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-neutral-400 text-xs">District Filter:</span>
            <input
              type="text"
              placeholder="e.g. Bengaluru or Mumbai..."
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border text-ink dark:text-paper focus:outline-none focus:border-saffron text-xs"
            />
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="p-8 rounded-2xl bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border text-center font-mono text-xs text-neutral-500">
              No tickets found matching the selected filter.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-paper-card/90 dark:bg-ink-card/90 border border-hairline border-paper-border dark:border-ink-border shadow-md backdrop-blur-md font-mono text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-paper-border dark:border-ink-border">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-saffron text-sm">{item.ref_no}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-saffron/15 text-saffron border border-saffron/30">
                      {item.status}
                    </span>
                    <span className="text-neutral-400">• {item.category}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-neutral-500">
                    <span className="flex items-center gap-1 font-sans">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      {item.district}
                    </span>
                    <span>•</span>
                    <Link
                      to={`/reports/${item.ref_no}`}
                      className="text-saffron hover:underline flex items-center gap-1"
                    >
                      <span>Public Tracker</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                <div className="py-3">
                  <h3 className="font-sans font-bold text-base text-ink dark:text-paper mb-1">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-paper-border dark:border-ink-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase text-neutral-400 block">Assigned Engineer</span>
                    <span className="text-ink dark:text-paper font-bold">
                      {item.assigned_to || 'None (Unassigned)'}
                    </span>
                  </div>

                  {/* Authority Action Triggers */}
                  <div className="flex items-center gap-2">
                    {item.status === 'submitted' && (
                      <button
                        onClick={() => setActiveActionId(activeActionId === item.id ? null : item.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-saffron hover:bg-saffron-muted text-ink font-bold shadow-sm"
                      >
                        Assign Division Engineer
                      </button>
                    )}

                    {item.status === 'assigned' && (
                      <button
                        onClick={() => updateReportStatus(item.id, 'in_progress').then(loadData)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#F2B705] text-ink font-bold shadow-sm"
                      >
                        Mark Crew Deployed
                      </button>
                    )}

                    {item.status === 'in_progress' && (
                      <button
                        onClick={() => setActiveActionId(activeActionId === item.id ? null : item.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-indiagreen text-white font-bold shadow-sm"
                      >
                        Upload Closure Evidence
                      </button>
                    )}

                    {item.status === 'resolved' && (
                      <span className="text-indiagreen font-bold flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>Closed & Verified</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Inline Action Drawer for Assignment or Resolution */}
                {activeActionId === item.id && (
                  <div className="mt-4 p-4 rounded-xl bg-paper dark:bg-ink border border-saffron/40 space-y-3">
                    {item.status === 'submitted' ? (
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">
                          Assign Designated Divisional Engineer / Unit:
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={engineerName}
                            onChange={(e) => setEngineerName(e.target.value)}
                            className="flex-1 p-2 rounded-lg bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border text-xs text-ink dark:text-paper"
                          />
                          <button
                            onClick={() => handleAssign(item.id)}
                            className="px-4 py-2 rounded-lg bg-saffron text-ink font-bold text-xs"
                          >
                            Confirm Dispatch
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">
                          Enter Field Rectification Note & Photographic Evidence:
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={resolveNote}
                            onChange={(e) => setResolveNote(e.target.value)}
                            className="flex-1 p-2 rounded-lg bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border text-xs text-ink dark:text-paper"
                          />
                          <button
                            onClick={() => handleResolve(item.id)}
                            className="px-4 py-2 rounded-lg bg-indiagreen text-white font-bold text-xs"
                          >
                            Approve Resolution
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
