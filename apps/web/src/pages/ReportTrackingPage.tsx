import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getReportByRef, ReportItem } from '../services/reports';
import {
  Shield,
  Search,
  CheckCircle,
  Clock,
  MapPin,
  AlertTriangle,
  UserCheck,
  FileCheck,
  CornerDownRight,
  ArrowLeft
} from 'lucide-react';

const STATUS_STEPS = [
  { key: 'submitted', label: '1. Ingested & Hashed', sub: 'Citizen Telemetry Locked' },
  { key: 'under_review', label: '2. Triaged by Nodal Officer', sub: 'Severity & Spatial Match' },
  { key: 'assigned', label: '3. SLA Dispatched', sub: 'Assigned to Division Unit' },
  { key: 'in_progress', label: '4. Field Rectification', sub: 'Work Crew Deployed' },
  { key: 'resolved', label: '5. Validated & Closed', sub: 'Photo Evidence Approved' }
];

export const ReportTrackingPage: React.FC = () => {
  const { ref } = useParams<{ ref?: string }>();
  const [searchRef, setSearchRef] = useState(ref || 'SB-2026-00412');
  const [report, setReport] = useState<ReportItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchRecord = async (queryRef: string) => {
    if (!queryRef.trim()) return;
    setLoading(true);
    setErrorMsg(null);
    const data = await getReportByRef(queryRef);
    setLoading(false);
    if (!data) {
      setErrorMsg(`No record found matching reference "${queryRef}". Please verify the number.`);
      setReport(null);
    } else {
      setReport(data);
    }
  };

  useEffect(() => {
    if (ref) {
      fetchRecord(ref);
    } else {
      fetchRecord('SB-2026-00412');
    }
  }, [ref]);

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'submitted': return 0;
      case 'under_review': return 1;
      case 'assigned': return 2;
      case 'in_progress': return 3;
      case 'resolved': return 4;
      default: return 0;
    }
  };

  const currentStepIdx = report ? getStepIndex(report.status) : 0;

  return (
    <div className="relative min-h-[90vh] w-full overflow-hidden">
      {/* Indian Smart City Infrastructure Background - Vivid & Atmospheric */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/civic-smartcity-bg.jpg"
          alt="Civic Infrastructure Background"
          className="w-full h-full object-cover object-center opacity-85 dark:opacity-80 brightness-95 contrast-115"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/60 via-paper/75 to-paper/95 dark:from-ink/60 via-ink/75 to-ink/95" />
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-20" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header & Search */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-saffron hover:underline mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Core Platform</span>
          </Link>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink dark:text-paper tracking-tight mb-2">
            Public Incident Resolution Tracker
          </h1>
          <p className="font-sans text-sm text-neutral-600 dark:text-neutral-400">
            Real-time verification of civic tickets, nodal assignments, SLA adherence, and verified photographic closure.
          </p>

          {/* Reference Search Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchRecord(searchRef);
            }}
            className="mt-6 flex flex-col sm:flex-row gap-2 font-mono text-xs"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchRef}
                onChange={(e) => setSearchRef(e.target.value)}
                placeholder="Enter Reference Number (e.g. SB-2026-00412)..."
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-paper-card/90 dark:bg-ink-card/90 border border-paper-border dark:border-ink-border text-ink dark:text-paper focus:outline-none focus:border-saffron backdrop-blur-md"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-saffron hover:bg-saffron-muted text-ink font-bold shadow-md transition-all shrink-0"
            >
              {loading ? 'Searching...' : 'Track Incident'}
            </button>
          </form>
        </div>

        {errorMsg && (
          <div className="p-4 mb-6 rounded-2xl bg-signalred/10 border border-signalred/30 text-signalred text-xs font-mono flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {report && (
          <div className="space-y-6">
            {/* Ticket Summary Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-paper-card/90 dark:bg-ink-card/90 border border-hairline border-paper-border dark:border-ink-border shadow-xl backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-paper-border dark:border-ink-border font-mono">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-saffron">{report.ref_no}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-saffron/15 text-saffron border border-saffron/30">
                      {report.status}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-signalred/15 text-signalred font-bold border border-signalred/30">
                      DEMO DATA
                    </span>
                  </div>
                  <h2 className="font-sans font-bold text-lg text-ink dark:text-paper mt-2">
                    {report.title}
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-neutral-500 mt-1 font-sans">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      {report.district}
                    </span>
                    <span>•</span>
                    <span>Pillar: <strong className="capitalize text-ink dark:text-paper">{report.pillar}</strong></span>
                    <span>•</span>
                    <span>Logged: {new Date(report.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span className="text-[10px] uppercase text-neutral-400 block">SLA Commitment</span>
                  <span className="font-serif text-2xl font-bold text-ink dark:text-paper">
                    {report.status === 'resolved' ? (
                      <span className="text-indiagreen">SLA Met (100%)</span>
                    ) : (
                      <span className="text-saffron">68h Remaining</span>
                    )}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="py-6 border-b border-paper-border dark:border-ink-border font-sans text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                <span className="font-mono text-[10px] uppercase text-neutral-400 block mb-1">
                  Technical Anomaly Brief
                </span>
                {report.description}
              </div>

              {/* 5-Stage Visual Stepper */}
              <div className="pt-6">
                <span className="font-mono text-xs uppercase font-bold text-neutral-400 block mb-4">
                  Resolution Progression
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 font-mono text-xs">
                  {STATUS_STEPS.map((step, idx) => {
                    const isCompleted = idx <= currentStepIdx;
                    const isCurrent = idx === currentStepIdx;
                    return (
                      <div
                        key={step.key}
                        className={`p-3.5 rounded-2xl border transition-all ${
                          isCurrent
                            ? 'bg-saffron/15 border-saffron text-ink dark:text-paper shadow-sm'
                            : isCompleted
                            ? 'bg-indiagreen/10 border-indiagreen/40 text-indiagreen'
                            : 'bg-paper/40 dark:bg-ink/40 border-paper-border dark:border-ink-border text-neutral-400 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold">STAGE 0{idx + 1}</span>
                          {isCompleted ? (
                            <CheckCircle className="w-3.5 h-3.5 text-indiagreen" />
                          ) : (
                            <Clock className="w-3.5 h-3.5 text-neutral-400" />
                          )}
                        </div>
                        <div className="font-bold text-[11px] leading-tight text-ink dark:text-paper">{step.label}</div>
                        <div className="text-[9px] text-neutral-500 mt-0.5">{step.sub}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Assignment & Resolution Callout */}
              <div className="mt-6 pt-6 border-t border-paper-border dark:border-ink-border font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-neutral-400 text-[10px] uppercase block">Assigned Authority</span>
                  <span className="font-bold text-ink dark:text-paper">
                    {report.assigned_to || 'Pending Division Dispatch (< 45m)'}
                  </span>
                </div>

                {report.resolution_note && (
                  <div className="sm:text-right">
                    <span className="text-neutral-400 text-[10px] uppercase block">Field Verification Note</span>
                    <span className="text-indiagreen font-bold flex items-center sm:justify-end gap-1">
                      <FileCheck className="w-3.5 h-3.5" />
                      {report.resolution_note}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
