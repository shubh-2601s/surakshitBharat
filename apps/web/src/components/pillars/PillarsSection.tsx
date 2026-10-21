import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PILLAR_METADATA } from '@surakshit-bharat/shared';
import {
  Users,
  Factory,
  Car,
  ShieldAlert,
  ArrowRight,
  QrCode,
  CheckCircle,
  ExternalLink,
  Activity,
  AlertCircle,
  Navigation
} from 'lucide-react';

export const PillarsSection: React.FC = () => {
  const [qrScanned, setQrScanned] = useState(false);

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 border-b border-hairline border-paper-border dark:border-ink-border">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-saffron mb-3">
            <span className="w-2 h-2 rounded-full bg-saffron" />
            Four Unified Pillars
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-ink dark:text-paper leading-tight mb-4">
            A Single Mesh. Four Dimensions of National Defense.
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 font-sans text-base sm:text-lg leading-relaxed">
            Safety cannot operate in silos. Surakshit Bharat binds physical civic hazards,
            manufactured product authenticity, transport corridor safety, and digital financial
            threats into one shared data model.
          </p>
        </div>

        {/* The 4 Distinct Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Panel 1: Community Safety (Saffron) */}
          <div className="relative rounded-2xl bg-paper-card dark:bg-ink-card border border-hairline border-[#FF8A1F]/30 p-8 flex flex-col justify-between overflow-hidden group hover:border-[#FF8A1F] transition-all">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF8A1F]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs font-bold text-[#FF8A1F] uppercase tracking-wider px-2.5 py-1 rounded bg-[#FF8A1F]/15 border border-[#FF8A1F]/30">
                  Pillar 01 • Community Safety
                </span>
                <Users className="w-6 h-6 text-[#FF8A1F]" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-ink dark:text-paper mb-3">
                Civic Hazard Telemetry & Direct Resolution
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed mb-6">
                Citizens document broken culverts, hazardous electrical wires, and public health
                anomalies. Unique reference tracking enforces departmental resolution timelines.
              </p>

              {/* Mini Visual: Hazard Triage Queue Preview */}
              <div className="p-4 rounded-xl bg-paper dark:bg-ink border border-hairline border-paper-border dark:border-ink-border font-mono text-xs mb-6 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-neutral-400 pb-2 border-b border-paper-border dark:border-ink-border">
                  <span>LIVE TICKET INGESTION</span>
                  <span className="text-[#FF8A1F] font-bold">142 Active in Pilot</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-ink dark:text-paper truncate max-w-[240px]">
                    #SB-2026-00418 Broken High-Tension Cable
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-signalred/15 text-signalred border border-signalred/30">
                    CRITICAL
                  </span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-ink dark:text-paper truncate max-w-[240px]">
                    #SB-2026-00417 Open Drainage on School Route
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-saffron/15 text-saffron border border-saffron/30">
                    HIGH
                  </span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-ink dark:text-paper truncate max-w-[240px]">
                    #SB-2026-00414 Substation Safety Grill Damaged
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-indiagreen/15 text-indiagreen border border-indiagreen/30">
                    RESOLVED
                  </span>
                </div>
              </div>
            </div>

            <Link
              to="/report/new"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FF8A1F] hover:underline"
            >
              <span>Submit Local Hazard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Panel 2: Local Manufacturing (Teal) */}
          <div className="relative rounded-2xl bg-paper-card dark:bg-ink-card border border-hairline border-[#0F9D8A]/30 p-8 flex flex-col justify-between overflow-hidden group hover:border-[#0F9D8A] transition-all">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#0F9D8A]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs font-bold text-[#0F9D8A] uppercase tracking-wider px-2.5 py-1 rounded bg-[#0F9D8A]/15 border border-[#0F9D8A]/30">
                  Pillar 02 • Local Manufacturing
                </span>
                <Factory className="w-6 h-6 text-[#0F9D8A]" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-ink dark:text-paper mb-3">
                Batch Verification & Counterfeit Mitigation
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed mb-6">
                Verifying genuine domestic manufacturing through cryptographic QR codes, BIS
                standard endorsements, and decentralized batch registry audits.
              </p>

              {/* Mini Visual: Interactive QR Scan Demo */}
              <div className="p-4 rounded-xl bg-paper dark:bg-ink border border-hairline border-paper-border dark:border-ink-border font-mono text-xs mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] text-neutral-400">CRYPTOGRAPHIC BATCH CHECK</span>
                  <button
                    onClick={() => setQrScanned(!qrScanned)}
                    className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0F9D8A]/15 text-[#0F9D8A] border border-[#0F9D8A]/30 hover:bg-[#0F9D8A]/30"
                  >
                    {qrScanned ? 'Reset Scan' : 'Simulate Scan'}
                  </button>
                </div>

                {qrScanned ? (
                  <div className="space-y-1.5 p-3 rounded-lg bg-[#0F9D8A]/10 border border-[#0F9D8A]/40">
                    <div className="flex items-center gap-1.5 text-indiagreen font-bold">
                      <CheckCircle className="w-4 h-4 text-[#0F9D8A]" />
                      <span>BATCH VERIFIED: BIS IS 694:2010</span>
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Manufacturer: Bharat Heavy Cables Ltd (MH-REG-482)
                    </div>
                    <div className="text-[10px] text-neutral-500">
                      Hash: <code className="text-[#0F9D8A]">7f9a...3c21 (Valid till 2028)</code>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-neutral-400/40">
                    <QrCode className="w-7 h-7 text-[#0F9D8A] animate-pulse" />
                    <div>
                      <span className="text-xs font-bold text-ink dark:text-paper block">
                        Scan Any Certified Batch QR
                      </span>
                      <span className="text-[10px] text-neutral-500">
                        Click 'Simulate Scan' to test cryptographic verification
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Link
              to="/manufacturers"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0F9D8A] hover:underline"
            >
              <span>Explore Public Registry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Panel 3: Transport Safety (Amber-Yellow) */}
          <div className="relative rounded-2xl bg-paper-card dark:bg-ink-card border border-hairline border-[#F2B705]/30 p-8 flex flex-col justify-between overflow-hidden group hover:border-[#F2B705] transition-all">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#F2B705]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs font-bold text-[#F2B705] uppercase tracking-wider px-2.5 py-1 rounded bg-[#F2B705]/15 border border-[#F2B705]/30">
                  Pillar 03 • Transport Safety
                </span>
                <Car className="w-6 h-6 text-[#F2B705]" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-ink dark:text-paper mb-3">
                Corridor Risk Indexing & Emergency Response
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed mb-6">
                Tracking dangerous highway curves, high-density pothole clusters, structural bridge
                audits, and live ambulance dispatch response times across districts.
              </p>

              {/* Mini Visual: Animated Route Corridor Line */}
              <div className="p-4 rounded-xl bg-paper dark:bg-ink border border-hairline border-paper-border dark:border-ink-border font-mono text-xs mb-6">
                <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-2">
                  <span>CORRIDOR AUDIT: NH-48 (MUMBAI-PUNE)</span>
                  <span className="text-[#F2B705] font-bold">Risk: Moderate (72/100)</span>
                </div>

                <div className="relative h-10 w-full flex items-center">
                  {/* Highway Line SVG with moving beacon */}
                  <svg className="w-full h-8" viewBox="0 0 300 30" fill="none">
                    <path
                      d="M 10 15 Q 75 5 150 20 T 290 15"
                      stroke="currentColor"
                      className="text-neutral-300 dark:text-neutral-700"
                      strokeWidth="3"
                    />
                    <path
                      d="M 10 15 Q 75 5 150 20 T 290 15"
                      stroke="#F2B705"
                      strokeWidth="3"
                      strokeDasharray="10 8"
                    />
                    {/* Pulsing warning node */}
                    <circle cx="150" cy="20" r="5" fill="#D7263D">
                      <animate
                        attributeName="r"
                        values="4;7;4"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>
                </div>

                <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-paper-border dark:border-ink-border">
                  <span>Avg Emergency EMS: <strong className="text-ink dark:text-paper">14.2 min</strong></span>
                  <span className="text-signalred">1 Identified Blackspot Remediated</span>
                </div>
              </div>
            </div>

            <Link
              to="/transport"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#F2B705] hover:underline"
            >
              <span>View Ranked Road Stretches</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Panel 4: Digital Safety (Indigo) */}
          <div className="relative rounded-2xl bg-paper-card dark:bg-ink-card border border-hairline border-[#4C5BD4]/30 p-8 flex flex-col justify-between overflow-hidden group hover:border-[#4C5BD4] transition-all">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#4C5BD4]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs font-bold text-[#4C5BD4] uppercase tracking-wider px-2.5 py-1 rounded bg-[#4C5BD4]/15 border border-[#4C5BD4]/30">
                  Pillar 04 • Digital Safety
                </span>
                <ShieldAlert className="w-6 h-6 text-[#4C5BD4]" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-ink dark:text-paper mb-3">
                Syndicate Vigilance & Rapid Fraud Containment
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed mb-6">
                Real-time advisories against active financial scams, malicious APK distribution,
                instant triage guidance, and direct linkage with the National Cyber Helpline (1930).
              </p>

              {/* Mini Visual: Active Cyber Threat Advisory */}
              <div className="p-4 rounded-xl bg-paper dark:bg-ink border border-hairline border-paper-border dark:border-ink-border font-mono text-xs mb-6 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-neutral-400 pb-2 border-b border-paper-border dark:border-ink-border">
                  <span className="flex items-center gap-1.5 text-indiagreen">
                    <span className="w-2 h-2 rounded-full bg-indiagreen animate-ping" />
                    CERT-IN / I4C VERIFIED
                  </span>
                  <span className="text-[#4C5BD4] font-bold">Helpline: 1930</span>
                </div>

                <div className="p-2.5 rounded bg-[#4C5BD4]/10 border border-[#4C5BD4]/30">
                  <div className="font-bold text-ink dark:text-paper text-xs">
                    Advisory #DS-2026-089: Fake Electricity Bill SMS Syndicate
                  </div>
                  <div className="text-[10px] text-neutral-500 mt-1">
                    Malicious APK masquerading as State Power portal. 42 command servers blocked.
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/digital-safety"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#4C5BD4] hover:underline"
            >
              <span>Explore Advisories & Helplines</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
