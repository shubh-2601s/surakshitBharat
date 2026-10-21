import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, PhoneCall, AlertTriangle, FileText, CheckCircle2, Globe, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-hairline border-paper-border dark:border-ink-border bg-paper-card dark:bg-ink-card transition-colors">
      {/* Emergency Hotlines Strip */}
      <div className="w-full bg-paper-muted/50 dark:bg-ink-muted/50 border-b border-hairline border-paper-border dark:border-ink-border py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-ink dark:text-paper font-semibold">
            <PhoneCall className="w-4 h-4 text-signalred animate-pulse" />
            <span>CRITICAL NATIONAL EMERGENCY RESPONSE HELPLINES:</span>
          </div>

          <div className="flex items-center flex-wrap gap-4 text-neutral-600 dark:text-neutral-300">
            <span className="flex items-center gap-1.5">
              <strong className="text-signalred">112</strong> National All-Emergency
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <strong className="text-[#4C5BD4]">1930</strong> National Cyber Crime
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <strong className="text-[#0F9D8A]">1915</strong> National Consumer Grievance
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <strong className="text-[#F2B705]">1033</strong> NHAI National Highway Helpline
            </span>
          </div>
        </div>
      </div>

      {/* Main Editorial Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Mandate */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-ink dark:bg-paper-card p-1.5 border border-saffron/40 flex items-center justify-center">
                <Shield className="w-5 h-5 text-saffron" />
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight text-ink dark:text-paper">
                Surakshit Bharat
              </span>
            </div>

            <p className="font-serif italic text-sm text-saffron font-light">
              Measure. Route. Resolve.
            </p>

            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed max-w-sm">
              Unified National Safety Intelligence Platform. Connecting citizen-reported civic hazards,
              standardized local manufacturing audits, transport corridor risks, and coordinated cyber defense
              into one transparent data mesh.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-signalred/10 border border-signalred/30 text-signalred text-[11px] font-mono">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>DEMONSTRATION PILOT • All district scores are simulated demonstration records</span>
              </div>
            </div>
          </div>

          {/* Pillars Column */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="font-bold text-ink dark:text-paper uppercase tracking-wider text-[11px]">
              Platform Pillars
            </h4>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
              <li>
                <Link to="/report/new" className="hover:text-saffron transition-colors">
                  Community Hazard Triage
                </Link>
              </li>
              <li>
                <Link to="/manufacturers" className="hover:text-[#0F9D8A] transition-colors">
                  Local Manufacturing Registry
                </Link>
              </li>
              <li>
                <Link to="/transport" className="hover:text-[#F2B705] transition-colors">
                  Transport Risk Corridors
                </Link>
              </li>
              <li>
                <Link to="/digital-safety" className="hover:text-[#4C5BD4] transition-colors">
                  Digital Vigilance & Advisories
                </Link>
              </li>
              <li>
                <Link to="/safety-grid" className="hover:text-saffron transition-colors font-bold">
                  The Safety Grid™ Cartogram
                </Link>
              </li>
            </ul>
          </div>

          {/* Standards & Transparency */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="font-bold text-ink dark:text-paper uppercase tracking-wider text-[11px]">
              Methodology & Audits
            </h4>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
              <li>
                <Link to="/methodology" className="hover:text-saffron transition-colors">
                  Scoring Methodology (v1.0)
                </Link>
              </li>
              <li>
                <Link to="/methodology#weights" className="hover:text-saffron transition-colors">
                  Sub-indicator Weight Matrix
                </Link>
              </li>
              <li>
                <Link to="/methodology#coverage" className="hover:text-saffron transition-colors">
                  Data Coverage Rules (&ge;60%)
                </Link>
              </li>
              <li>
                <span className="text-neutral-400">WCAG 2.2 AA Contrast Compliant</span>
              </li>
              <li>
                <span className="text-neutral-400">Zero Commercial Advertising</span>
              </li>
            </ul>
          </div>

          {/* Portals & Access */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="font-bold text-ink dark:text-paper uppercase tracking-wider text-[11px]">
              Portals & Roles
            </h4>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
              <li>
                <Link to="/login" className="hover:text-saffron transition-colors">
                  Citizen Portal
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#0F9D8A] transition-colors">
                  Manufacturer Verification Hub
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-saffron transition-colors">
                  Municipal Authority Desk
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-saffron transition-colors">
                  National Administrative Console
                </Link>
              </li>
              <li>
                <Link to="/assistant" className="hover:text-saffron transition-colors text-saffron font-bold">
                  Suraksha Assistant (AI)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-12 pt-6 border-t border-hairline border-paper-border dark:border-ink-border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-500">
          <div>
            &copy; 2026 Surakshit Bharat Initiative • National Safety Intelligence Mesh • Open Architecture
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Designed for Public Good</span>
            <span>•</span>
            <span className="text-indiagreen">End-to-End Encrypted Audits</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
