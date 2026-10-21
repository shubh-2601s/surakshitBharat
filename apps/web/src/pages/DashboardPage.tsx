import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
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
  Bot
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { profile, role, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Profile / Role Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-paper-card dark:bg-ink-card border border-hairline border-paper-border dark:border-ink-border shadow-xl mb-8">
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

      {/* Role-Specific Workspaces */}
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
            <div className="p-5 rounded-2xl bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border font-mono">
              <span className="text-xs text-neutral-400 uppercase block mb-1">My Filed Reports</span>
              <div className="font-serif text-3xl font-bold text-ink dark:text-paper">3</div>
              <div className="text-[11px] text-neutral-500 mt-1">All cryptographically timestamped</div>
            </div>
            <div className="p-5 rounded-2xl bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border font-mono">
              <span className="text-xs text-neutral-400 uppercase block mb-1">In Field Resolution</span>
              <div className="font-serif text-3xl font-bold text-saffron">2</div>
              <div className="text-[11px] text-neutral-500 mt-1">SLA remaining: 48h avg</div>
            </div>
            <div className="p-5 rounded-2xl bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border font-mono">
              <span className="text-xs text-neutral-400 uppercase block mb-1">Validated & Closed</span>
              <div className="font-serif text-3xl font-bold text-indiagreen">1</div>
              <div className="text-[11px] text-neutral-500 mt-1">Verified with photo proof</div>
            </div>
          </div>

          {/* Citizen Sample Reports Table */}
          <div className="rounded-2xl border border-hairline border-paper-border dark:border-ink-border bg-paper-card dark:bg-ink-card p-6 font-mono text-xs">
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
                    Substation earthing wire hazard grounded
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5 flex items-center gap-1 font-sans">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Varanasi Central (UP)</span>
                  </div>
                </div>
                <div className="text-right text-xs">
                  <span className="text-indiagreen font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Closed in 26h</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {role === 'manufacturer' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-ink dark:text-paper">
              Manufacturer Batch Certification Desk
            </h2>
            <button className="px-4 py-2 rounded-xl bg-[#0F9D8A] text-white font-bold font-mono text-xs shadow-sm">
              + Register New Batch
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-5 rounded-2xl bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border">
              <span className="text-neutral-400 uppercase block mb-1">Registered Batches</span>
              <div className="font-serif text-3xl font-bold text-ink dark:text-paper">42</div>
            </div>
            <div className="p-5 rounded-2xl bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border">
              <span className="text-neutral-400 uppercase block mb-1">QR Authenticity Hits</span>
              <div className="font-serif text-3xl font-bold text-[#0F9D8A]">18,490</div>
            </div>
            <div className="p-5 rounded-2xl bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border">
              <span className="text-neutral-400 uppercase block mb-1">Compliance Score</span>
              <div className="font-serif text-3xl font-bold text-indiagreen">99.4%</div>
            </div>
          </div>
        </div>
      )}

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
            <span className="px-3 py-1.5 rounded-xl bg-signalred/15 text-signalred font-mono text-xs font-bold border border-signalred/30">
              4 Critical Priority
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-paper-card dark:bg-ink-card border border-hairline border-paper-border dark:border-ink-border font-mono text-xs space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-paper-border dark:border-ink-border">
              <span className="font-bold text-ink dark:text-paper">TICKET #SB-2026-00418</span>
              <span className="px-2 py-0.5 rounded bg-signalred/15 text-signalred font-bold">DISPATCH PENDING</span>
            </div>
            <p className="font-sans text-sm text-neutral-700 dark:text-neutral-300">
              Broken high-tension distribution line suspended across pedestrian footpath.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button className="px-3 py-1.5 rounded-lg bg-saffron text-ink font-bold">
                Assign Division Engineer
              </button>
              <button className="px-3 py-1.5 rounded-lg border border-paper-border dark:border-ink-border">
                Inspect GPS Coordinates
              </button>
            </div>
          </div>
        </div>
      )}

      {role === 'admin' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-ink dark:text-paper">
              National Platform Command & Audit Console
            </h2>
            <Link
              to="/safety-grid"
              className="px-4 py-2 rounded-xl bg-paper-card dark:bg-ink-card border border-saffron text-saffron font-mono text-xs font-bold"
            >
              Inspect Grid Mesh
            </Link>
          </div>

          <div className="p-5 rounded-2xl bg-paper-card dark:bg-ink-card border border-hairline border-paper-border dark:border-ink-border font-mono text-xs">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold uppercase tracking-wider text-saffron">Immutable Audit Log Feed</span>
              <span className="text-[10px] text-neutral-400">Append-Only Cryptographic Records</span>
            </div>
            <div className="space-y-2 text-[11px] text-neutral-500">
              <div className="p-2.5 rounded bg-paper dark:bg-ink border border-paper-border dark:border-ink-border flex justify-between">
                <span>[AUDIT-9812] User <code>demo-mfg-01</code> registered batch <code>BC-2026-9921</code></span>
                <span>2m ago</span>
              </div>
              <div className="p-2.5 rounded bg-paper dark:bg-ink border border-paper-border dark:border-ink-border flex justify-between">
                <span>[AUDIT-9811] Nodal Officer assigned ticket <code>SB-2026-00412</code> to Eng ID 882</span>
                <span>14m ago</span>
              </div>
              <div className="p-2.5 rounded bg-paper dark:bg-ink border border-paper-border dark:border-ink-border flex justify-between">
                <span>[AUDIT-9810] Safety Grid composite index recalculated for KA-BLR (+0.8)</span>
                <span>42m ago</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
