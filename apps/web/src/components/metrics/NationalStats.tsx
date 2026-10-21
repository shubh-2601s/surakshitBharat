import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Clock, FileCheck } from 'lucide-react';
import { AnimatedCounter } from '../common/AnimatedCounter';

export const NationalStats: React.FC = () => {
  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 border-b border-hairline border-paper-border dark:border-ink-border bg-ink overflow-hidden">
      {/* Background Indian Landmark: Central Secretariat & Ministry of Home Affairs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/secretariat-bg.jpg"
          alt="Central Secretariat & North Block New Delhi"
          className="w-full h-full object-cover object-center opacity-80 dark:opacity-75 brightness-95 contrast-120"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/45 to-ink/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
        <div className="absolute inset-0 bg-grain opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Bar with Demo Badge */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-hairline border-white/15">
          <div className="flex items-center gap-2 font-mono text-xs text-saffron uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-saffron" />
            </span>
            <Activity className="w-4 h-4 text-saffron" />
            <span>Consolidated National Pilot Metrics</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-signalred/15 text-signalred border border-signalred/30">
            DEMO DATA • SIMULATED AGGREGATES
          </span>
        </div>

        {/* 4 Animated Number Stat Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
          {/* Card 1: Citizen Hazards Resolved */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.25 }}
            className="p-6 rounded-2xl bg-ink/85 text-white border border-white/15 hover:border-emerald-500/50 shadow-xl backdrop-blur-md transition-all group"
          >
            <span className="text-xs uppercase text-neutral-400 tracking-wider block mb-2">
              Citizen Hazards Resolved
            </span>
            <div className="font-serif text-4xl sm:text-5xl font-bold text-paper tracking-tight mb-2">
              <AnimatedCounter value={10248} suffix="+" duration={1.8} />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-indiagreen">
              <ShieldCheck className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span>91.4% Validated Resolution</span>
            </div>
          </motion.div>

          {/* Card 2: Verified Batches */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.25, delay: 0.05 }}
            className="p-6 rounded-2xl bg-ink/85 text-white border border-white/15 hover:border-[#0F9D8A]/50 shadow-xl backdrop-blur-md transition-all group"
          >
            <span className="text-xs uppercase text-neutral-400 tracking-wider block mb-2">
              Verified Batches & Standards
            </span>
            <div className="font-serif text-4xl sm:text-5xl font-bold text-[#0F9D8A] tracking-tight mb-2">
              <AnimatedCounter value={3820} duration={1.8} />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
              <FileCheck className="w-3.5 h-3.5 text-[#0F9D8A] group-hover:scale-110 transition-transform" />
              <span>BIS / FSSAI Correlated</span>
            </div>
          </motion.div>

          {/* Card 3: Monitored Highway Corridors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.25, delay: 0.1 }}
            className="p-6 rounded-2xl bg-ink/85 text-white border border-white/15 hover:border-[#F2B705]/50 shadow-xl backdrop-blur-md transition-all group"
          >
            <span className="text-xs uppercase text-neutral-400 tracking-wider block mb-2">
              Monitored Highway Corridors
            </span>
            <div className="font-serif text-4xl sm:text-5xl font-bold text-[#F2B705] tracking-tight mb-2">
              <AnimatedCounter value={44120} duration={1.8} />{' '}
              <span className="text-lg font-sans font-normal text-neutral-400">km</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
              <Clock className="w-3.5 h-3.5 text-[#F2B705] group-hover:scale-110 transition-transform" />
              <span>13.8 min Avg EMS Latency</span>
            </div>
          </motion.div>

          {/* Card 4: Cyber Syndicates Dismantled */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.25, delay: 0.15 }}
            className="p-6 rounded-2xl bg-ink/85 text-white border border-white/15 hover:border-[#4C5BD4]/50 shadow-xl backdrop-blur-md transition-all group"
          >
            <span className="text-xs uppercase text-neutral-400 tracking-wider block mb-2">
              Cyber Syndicates Dismantled
            </span>
            <div className="font-serif text-4xl sm:text-5xl font-bold text-[#4C5BD4] tracking-tight mb-2">
              <AnimatedCounter value={1290} suffix="+" duration={1.8} />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-[#4C5BD4] inline-block animate-ping mr-1" />
              <span>₹48.2 Cr Held via 1930 Triage</span>
            </div>
          </motion.div>
        </div>

        {/* Verified Data Sources Marquee Strip */}
        <div className="mt-12 pt-6 border-t border-hairline border-paper-border dark:border-ink-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-neutral-500">
          <span className="text-[11px] uppercase tracking-wider text-saffron shrink-0">
            Verified Authority References:
          </span>
          <div className="flex items-center flex-wrap gap-4 text-xs font-semibold text-neutral-600 dark:text-neutral-400">
            <span className="px-2.5 py-1 rounded bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border hover:border-saffron transition-colors">
              Bureau of Indian Standards (BIS)
            </span>
            <span className="px-2.5 py-1 rounded bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border hover:border-saffron transition-colors">
              National Highways Authority (NHAI)
            </span>
            <span className="px-2.5 py-1 rounded bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border hover:border-saffron transition-colors">
              Indian Cyber Crime Coordination Centre (I4C)
            </span>
            <span className="px-2.5 py-1 rounded bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border hover:border-saffron transition-colors">
              CERT-In
            </span>
            <span className="px-2.5 py-1 rounded bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border hover:border-saffron transition-colors">
              State Police Telecoms
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
