import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SafetyGridCartogram } from './SafetyGridCartogram';
import { PillarType, StateTile, INDIA_STATE_TILES } from '@surakshit-bharat/shared';
import { AnimatedCounter } from '../common/AnimatedCounter';
import {
  Shield,
  ArrowRight,
  AlertTriangle,
  Activity,
  Layers,
  Radio,
  Sparkles,
  CheckCircle2,
  Database,
  Compass,
  Zap,
  ShieldCheck
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<PillarType | 'all'>('all');
  const [selectedTile, setSelectedTile] = useState<StateTile | null>(null);
  const [viewMode, setViewMode] = useState<'cartogram' | 'radar'>('cartogram');
  const [hoveredHub, setHoveredHub] = useState<string | null>(null);

  // Exact dynamically calculated statistics from the national registry
  const totalExactReports = INDIA_STATE_TILES.reduce(
    (sum, t) => sum + t.activeReportsCount + t.resolvedReportsCount,
    0
  ); // Exactly 11,362
  const totalActiveReports = INDIA_STATE_TILES.reduce((sum, t) => sum + t.activeReportsCount, 0); // 1,114
  const totalResolvedReports = INDIA_STATE_TILES.reduce((sum, t) => sum + t.resolvedReportsCount, 0); // 10,248
  const totalDistricts = INDIA_STATE_TILES.reduce((sum, t) => sum + t.districtCount, 0); // 788 districts

  return (
    <section className="relative min-h-[94vh] w-full flex flex-col justify-center overflow-hidden border-b border-hairline border-paper-border dark:border-ink-border bg-ink">
      {/* Background Image: India Gate Twilight at Dusk - Vivid & Atmospheric */}
      <div className="absolute inset-0 z-0">
        <img
          src="/india-gate-hero.jpg"
          alt="India Gate Monument New Delhi at Twilight"
          className="w-full h-full object-cover object-center brightness-95 contrast-110 opacity-90 transition-transform duration-1000 scale-105"
        />
        {/* Cinematic Vignette - Soft so India Gate is clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/45 to-ink/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-30" />

        {/* Dynamic Animated Ambient Orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-saffron/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: National Editorial Typography & Animated Metrics */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col justify-center text-white"
          >
            {/* Pill Badge with Animated Signal Beacon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 w-fit mb-6 shadow-lg shadow-emerald-950/40 backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="font-mono text-xs font-semibold tracking-wider text-emerald-300">
                A Safer India, Together
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-signalred/25 text-red-300 border border-signalred/40 ml-1">
                DEMO DATA
              </span>
            </motion.div>

            {/* Confident Landmark Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.08] mb-5 text-paper drop-shadow-sm">
              Safer People. <br />
              Stronger Communities. <br />
              A <span className="text-[#10B981] font-semibold drop-shadow-[0_0_25px_rgba(16,185,129,0.4)]">Surakshit</span>{' '}
              <span className="text-saffron font-bold drop-shadow-[0_0_25px_rgba(255,138,31,0.4)]">Bharat</span>.
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 font-sans leading-relaxed mb-8 max-w-xl">
              A unified national intelligence platform to strengthen community hazard resolution,
              verify standard local manufacturing, secure road corridors, and build a vigilant digital India.
            </p>

            {/* Action Buttons with Interactive Glow */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8 font-mono text-xs">
              <Link
                to="/report/new"
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-ink font-bold shadow-lg shadow-emerald-950/60 transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] overflow-hidden"
              >
                {/* Button shine sweep animation */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform" />
                <AlertTriangle className="w-4 h-4 text-ink animate-pulse" />
                <span>Report an Issue</span>
              </Link>
              <Link
                to="/safety-grid"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-ink-card/85 hover:bg-ink-card border border-neutral-600 hover:border-saffron text-white font-medium transition-all backdrop-blur-md hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,138,31,0.25)]"
              >
                <span>Explore Safety Grid</span>
                <ArrowRight className="w-4 h-4 text-saffron transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* High-Impact National Pilot Statistics - EXACT DATA with Smooth Count-Up Animation */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-hairline border-neutral-700/60 font-mono">
              {/* Stat 1: Exact Community Reports (Calculated, not fabricated) */}
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="p-3 rounded-xl bg-ink-card/70 border border-white/10 hover:border-emerald-500/50 backdrop-blur-md transition-all shadow-lg"
              >
                <div className="flex items-center justify-between mb-1">
                  <AnimatedCounter
                    value={totalExactReports}
                    duration={1.8}
                    className="text-2xl sm:text-3xl font-bold font-serif text-emerald-400 block tracking-tight"
                  />
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                </div>
                <span className="text-[11px] text-neutral-300 block font-sans font-medium">
                  Exact Reports
                </span>
                <span className="text-[9.5px] font-mono text-emerald-300/80 block mt-0.5 truncate">
                  {totalActiveReports.toLocaleString('en-IN')} Active • {totalResolvedReports.toLocaleString('en-IN')} Solved
                </span>
              </motion.div>

              {/* Stat 2: Verified Batches */}
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="p-3 rounded-xl bg-ink-card/70 border border-white/10 hover:border-[#0F9D8A]/50 backdrop-blur-md transition-all shadow-lg"
              >
                <div className="flex items-center justify-between mb-1">
                  <AnimatedCounter
                    value={3820}
                    duration={1.8}
                    className="text-2xl sm:text-3xl font-bold font-serif text-[#0F9D8A] block tracking-tight"
                  />
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0F9D8A]" />
                </div>
                <span className="text-[11px] text-neutral-300 block font-sans font-medium">
                  Verified Batches
                </span>
                <span className="text-[9.5px] font-mono text-teal-300/80 block mt-0.5 truncate">
                  BIS / QR Audit QC
                </span>
              </motion.div>

              {/* Stat 3: Monitored Districts */}
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="p-3 rounded-xl bg-ink-card/70 border border-white/10 hover:border-saffron/50 backdrop-blur-md transition-all shadow-lg"
              >
                <div className="flex items-center justify-between mb-1">
                  <AnimatedCounter
                    value={totalDistricts}
                    duration={1.8}
                    className="text-2xl sm:text-3xl font-bold font-serif text-saffron block tracking-tight"
                  />
                  <Activity className="w-3.5 h-3.5 text-saffron" />
                </div>
                <span className="text-[11px] text-neutral-300 block font-sans font-medium">
                  Districts Monitored
                </span>
                <span className="text-[9.5px] font-mono text-amber-300/80 block mt-0.5 truncate">
                  All 36 States & UTs
                </span>
              </motion.div>

              {/* Stat 4: Active Authorities */}
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="p-3 rounded-xl bg-ink-card/70 border border-white/10 hover:border-indigo-400/50 backdrop-blur-md transition-all shadow-lg"
              >
                <div className="flex items-center justify-between mb-1">
                  <AnimatedCounter
                    value={750}
                    suffix="+"
                    duration={1.8}
                    className="text-2xl sm:text-3xl font-bold font-serif text-indigo-400 block tracking-tight"
                  />
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <span className="text-[11px] text-neutral-300 block font-sans font-medium">
                  Active Authorities
                </span>
                <span className="text-[9.5px] font-mono text-indigo-300/80 block mt-0.5 truncate">
                  Police, NHAI, Cyber
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Holographic National Telemetry & Safety Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 w-full flex flex-col items-center"
          >
            {/* View Switcher: Cartogram vs Holographic Radar */}
            <div className="w-full flex items-center justify-between mb-3 px-1 font-mono text-xs">
              <span className="text-neutral-300 flex items-center gap-1.5 font-medium">
                <Compass className="w-3.5 h-3.5 text-saffron" />
                <span>Telemetry View Mode:</span>
              </span>
              <div className="flex items-center gap-1 p-1 rounded-xl bg-ink-card/90 border border-neutral-700 text-[11px] shadow-lg">
                <button
                  onClick={() => setViewMode('cartogram')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    viewMode === 'cartogram'
                      ? 'bg-saffron text-ink font-bold shadow-md shadow-saffron/20'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Cartogram Grid
                </button>
                <button
                  onClick={() => setViewMode('radar')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    viewMode === 'radar'
                      ? 'bg-emerald-500 text-ink font-bold shadow-md shadow-emerald-500/20'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Radar Mesh
                </button>
              </div>
            </div>

            {viewMode === 'cartogram' ? (
              <SafetyGridCartogram
                selectedPillar={selectedPillar}
                onSelectPillar={setSelectedPillar}
                onSelectTile={setSelectedTile}
              />
            ) : (
              /* Holographic Radar Mesh Visual with Interactive Pulsing Telemetry Nodes */
              <div className="relative w-full aspect-[4/3] rounded-3xl bg-ink-card/95 border border-cyan-500/40 p-6 flex flex-col items-center justify-center overflow-hidden shadow-2xl backdrop-blur-md">
                {/* Radar Grid Circles */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[85%] h-[85%] rounded-full border border-cyan-500/20 animate-[pulse_4s_ease-in-out_infinite]" />
                  <div className="absolute w-[65%] h-[65%] rounded-full border border-cyan-500/25" />
                  <div className="absolute w-[45%] h-[45%] rounded-full border border-cyan-500/30" />
                  <div className="absolute w-[25%] h-[25%] rounded-full border border-cyan-500/40" />
                  {/* Crosshairs */}
                  <div className="absolute w-full h-[1px] bg-cyan-500/20" />
                  <div className="absolute h-full w-[1px] bg-cyan-500/20" />
                  {/* Rotating Radar Sweep */}
                  <div className="absolute w-full h-full rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(6,182,212,0.3)_360deg)] animate-[spin_5s_linear_infinite]" />
                </div>

                {/* India Silhouette Hologram Map */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <img
                    src="/civic-hero-bg.jpg"
                    alt="India Geographic Radar Mesh"
                    className="w-[80%] h-[80%] object-contain opacity-80 filter drop-shadow-[0_0_25px_rgba(6,182,212,0.7)]"
                  />

                  {/* Pulsing Telemetry Nodes with Interactive Hover Tooltips */}
                  {/* Delhi Hub */}
                  <div
                    onMouseEnter={() => setHoveredHub('delhi')}
                    onMouseLeave={() => setHoveredHub(null)}
                    className="absolute top-[28%] left-[45%] flex flex-col items-center cursor-pointer group"
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-ping absolute" />
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 relative border-2 border-ink" />
                    <span className="text-[10px] font-mono text-emerald-300 font-bold bg-ink/90 px-1.5 py-0.5 rounded mt-1 border border-emerald-500/40 shadow-md">
                      DELHI (98%)
                    </span>
                    {hoveredHub === 'delhi' && (
                      <div className="absolute -top-14 bg-ink/95 border border-emerald-500 rounded-lg p-2 text-[10px] font-mono text-white shadow-2xl z-30 whitespace-nowrap">
                        <span className="text-emerald-400 font-bold">NCT Command Center</span>: 89 Active Reports
                      </div>
                    )}
                  </div>

                  {/* Mumbai Hub */}
                  <div
                    onMouseEnter={() => setHoveredHub('mumbai')}
                    onMouseLeave={() => setHoveredHub(null)}
                    className="absolute top-[55%] left-[36%] flex flex-col items-center cursor-pointer group"
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-saffron animate-ping absolute" />
                    <span className="w-3.5 h-3.5 rounded-full bg-saffron relative border-2 border-ink" />
                    <span className="text-[10px] font-mono text-saffron font-bold bg-ink/90 px-1.5 py-0.5 rounded mt-1 border border-saffron/40 shadow-md">
                      MUMBAI (96%)
                    </span>
                    {hoveredHub === 'mumbai' && (
                      <div className="absolute -top-14 bg-ink/95 border border-saffron rounded-lg p-2 text-[10px] font-mono text-white shadow-2xl z-30 whitespace-nowrap">
                        <span className="text-saffron font-bold">Western Corridor</span>: 92 Active Reports
                      </div>
                    )}
                  </div>

                  {/* Bengaluru Hub */}
                  <div
                    onMouseEnter={() => setHoveredHub('bengaluru')}
                    onMouseLeave={() => setHoveredHub(null)}
                    className="absolute top-[68%] left-[42%] flex flex-col items-center cursor-pointer group"
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-cyan-400 animate-ping absolute" />
                    <span className="w-3.5 h-3.5 rounded-full bg-cyan-400 relative border-2 border-ink" />
                    <span className="text-[10px] font-mono text-cyan-300 font-bold bg-ink/90 px-1.5 py-0.5 rounded mt-1 border border-cyan-500/40 shadow-md">
                      BENGALURU (95%)
                    </span>
                    {hoveredHub === 'bengaluru' && (
                      <div className="absolute -top-14 bg-ink/95 border border-cyan-400 rounded-lg p-2 text-[10px] font-mono text-white shadow-2xl z-30 whitespace-nowrap">
                        <span className="text-cyan-300 font-bold">Tech Command</span>: 78 Active Reports
                      </div>
                    )}
                  </div>

                  {/* Kolkata Hub */}
                  <div
                    onMouseEnter={() => setHoveredHub('kolkata')}
                    onMouseLeave={() => setHoveredHub(null)}
                    className="absolute top-[48%] left-[72%] flex flex-col items-center cursor-pointer group"
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-indigo-400 animate-ping absolute" />
                    <span className="w-3.5 h-3.5 rounded-full bg-indigo-400 relative border-2 border-ink" />
                    <span className="text-[10px] font-mono text-indigo-300 font-bold bg-ink/90 px-1.5 py-0.5 rounded mt-1 border border-indigo-500/40 shadow-md">
                      KOLKATA (88%)
                    </span>
                    {hoveredHub === 'kolkata' && (
                      <div className="absolute -top-14 bg-ink/95 border border-indigo-400 rounded-lg p-2 text-[10px] font-mono text-white shadow-2xl z-30 whitespace-nowrap">
                        <span className="text-indigo-300 font-bold">Eastern Hub</span>: 58 Active Reports
                      </div>
                    )}
                  </div>
                </div>

                {/* Floating Telemetry Widgets with Live Status */}
                <div className="absolute bottom-5 left-5 z-20 p-3 rounded-2xl bg-ink/90 border border-cyan-500/40 backdrop-blur-md font-mono text-xs shadow-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span className="text-emerald-400 font-bold text-[11px] uppercase tracking-wider">
                      NATIONAL SAFETY TELEMETRY
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-300 block">
                    Real-time mesh • {totalDistricts} Districts Synchronized across 36 States/UTs
                  </span>
                </div>

                <div className="absolute top-5 right-5 z-20 w-24 h-24 rounded-full border border-cyan-500/50 bg-ink/85 flex flex-col items-center justify-center font-mono shadow-2xl backdrop-blur-md">
                  <span className="text-xl font-bold text-white font-serif">4</span>
                  <span className="text-[9px] uppercase font-bold text-cyan-300 -mt-1">PILLARS</span>
                  <span className="text-[8px] text-neutral-400 uppercase">ONE INDIA</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
