import React from 'react';
import { Activity, ShieldCheck, Clock, FileCheck } from 'lucide-react';

export const NationalStats: React.FC = () => {
  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 border-b border-hairline border-paper-border dark:border-ink-border bg-paper/60 dark:bg-ink/60">
      <div className="max-w-7xl mx-auto">
        {/* Header Bar with Demo Badge */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-hairline border-paper-border dark:border-ink-border">
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-500 uppercase tracking-widest">
            <Activity className="w-4 h-4 text-saffron" />
            <span>Consolidated National Pilot Metrics</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-signalred/15 text-signalred border border-signalred/30">
            DEMO DATA • SIMULATED AGGREGATES
          </span>
        </div>

        {/* 4 Large Number Stat Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
          <div className="p-6 rounded-2xl bg-paper-card dark:bg-ink-card border border-hairline border-paper-border dark:border-ink-border">
            <span className="text-xs uppercase text-neutral-500 tracking-wider block mb-2">
              Citizen Hazards Resolved
            </span>
            <div className="font-serif text-4xl sm:text-5xl font-bold text-ink dark:text-paper tracking-tight mb-2">
              12,480+
            </div>
            <div className="flex items-center gap-1.5 text-xs text-indiagreen">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>91.4% Validated Resolution</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-paper-card dark:bg-ink-card border border-hairline border-paper-border dark:border-ink-border">
            <span className="text-xs uppercase text-neutral-500 tracking-wider block mb-2">
              Verified Batches & Standards
            </span>
            <div className="font-serif text-4xl sm:text-5xl font-bold text-[#0F9D8A] tracking-tight mb-2">
              3,820
            </div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-500">
              <FileCheck className="w-3.5 h-3.5 text-[#0F9D8A]" />
              <span>BIS / FSSAI Correlated</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-paper-card dark:bg-ink-card border border-hairline border-paper-border dark:border-ink-border">
            <span className="text-xs uppercase text-neutral-500 tracking-wider block mb-2">
              Monitored Highway Corridors
            </span>
            <div className="font-serif text-4xl sm:text-5xl font-bold text-[#F2B705] tracking-tight mb-2">
              44,120 <span className="text-lg font-sans font-normal text-neutral-400">km</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-500">
              <Clock className="w-3.5 h-3.5 text-[#F2B705]" />
              <span>13.8 min Avg EMS Latency</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-paper-card dark:bg-ink-card border border-hairline border-paper-border dark:border-ink-border">
            <span className="text-xs uppercase text-neutral-500 tracking-wider block mb-2">
              Cyber Syndicates Dismantled
            </span>
            <div className="font-serif text-4xl sm:text-5xl font-bold text-[#4C5BD4] tracking-tight mb-2">
              1,290+
            </div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-500">
              <span className="w-2 h-2 rounded-full bg-[#4C5BD4] inline-block" />
              <span>₹48.2 Cr Held via 1930 Triage</span>
            </div>
          </div>
        </div>

        {/* Verified Data Sources Marquee Strip */}
        <div className="mt-12 pt-6 border-t border-hairline border-paper-border dark:border-ink-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-neutral-500">
          <span className="text-[11px] uppercase tracking-wider text-saffron shrink-0">
            Verified Authority References:
          </span>
          <div className="flex items-center flex-wrap gap-4 text-xs font-semibold text-neutral-600 dark:text-neutral-400">
            <span className="px-2.5 py-1 rounded bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border">
              Bureau of Indian Standards (BIS)
            </span>
            <span className="px-2.5 py-1 rounded bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border">
              National Highways Authority (NHAI)
            </span>
            <span className="px-2.5 py-1 rounded bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border">
              Indian Cyber Crime Coordination Centre (I4C)
            </span>
            <span className="px-2.5 py-1 rounded bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border">
              CERT-In
            </span>
            <span className="px-2.5 py-1 rounded bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border">
              State Police Telecoms
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
