import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SafetyGridCartogram } from './SafetyGridCartogram';
import { PillarType, StateTile } from '@surakshit-bharat/shared';
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
  Compass
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<PillarType | 'all'>('all');
  const [selectedTile, setSelectedTile] = useState<StateTile | null>(null);
  const [viewMode, setViewMode] = useState<'cartogram' | 'radar'>('cartogram');

  return (
    <section className="relative min-h-[94vh] w-full flex flex-col justify-center overflow-hidden border-b border-hairline border-paper-border dark:border-ink-border bg-ink">
      {/* Background Image: India Gate Twilight at Dusk */}
      <div className="absolute inset-0 z-0">
        <img
          src="/india-gate-hero.jpg"
          alt="India Gate Monument New Delhi at Twilight"
          className="w-full h-full object-cover object-center opacity-40 md:opacity-50 brightness-90 contrast-110"
        />
        {/* Cinematic Vignette & Radial Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/65 dark:from-ink dark:via-ink/90 dark:to-ink/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/70" />
        <div className="absolute inset-0 bg-grain pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: National Editorial Typography & Metrics */}
          <div className="lg:col-span-5 flex flex-col justify-center text-white">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 w-fit mb-6 shadow-sm backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs font-semibold tracking-wider text-emerald-300">
                A Safer India, Together
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-signalred/20 text-red-300 border border-signalred/40 ml-1">
                DEMO DATA
              </span>
            </div>

            {/* Confident Landmark Headline matching user inspiration */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.08] mb-5 text-paper">
              Safer People. <br />
              Stronger Communities. <br />
              A <span className="text-[#10B981] font-semibold">Surakshit</span>{' '}
              <span className="text-saffron font-bold">Bharat</span>.
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 font-sans leading-relaxed mb-8 max-w-xl">
              A unified national intelligence platform to strengthen community hazard resolution,
              verify standard local manufacturing, secure road corridors, and build a vigilant digital India.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10 font-mono text-xs">
              <Link
                to="/report/new"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-ink font-bold shadow-lg shadow-emerald-900/30 transition-all hover:scale-[1.02]"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Report an Issue</span>
              </Link>
              <Link
                to="/safety-grid"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-ink-card/80 hover:bg-ink-card border border-neutral-600 hover:border-saffron text-white font-medium transition-all backdrop-blur-md"
              >
                <span>Explore Safety Grid</span>
                <ArrowRight className="w-4 h-4 text-saffron" />
              </Link>
            </div>

            {/* High-Impact National Pilot Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-hairline border-neutral-700/60 font-mono">
              <div>
                <span className="text-2xl sm:text-3xl font-bold font-serif text-emerald-400 block">
                  1.4M+
                </span>
                <span className="text-[11px] text-neutral-400 block mt-0.5 font-sans">
                  Community Reports
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-bold font-serif text-[#0F9D8A] block">
                  28K+
                </span>
                <span className="text-[11px] text-neutral-400 block mt-0.5 font-sans">
                  Verified Batches
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-bold font-serif text-saffron block">
                  700+
                </span>
                <span className="text-[11px] text-neutral-400 block mt-0.5 font-sans">
                  High-Risk Zones
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-bold font-serif text-indigo-400 block">
                  750+
                </span>
                <span className="text-[11px] text-neutral-400 block mt-0.5 font-sans">
                  Active Authorities
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Holographic National Telemetry & Safety Grid */}
          <div className="lg:col-span-7 w-full flex flex-col items-center">
            {/* View Switcher: Cartogram vs Holographic Radar */}
            <div className="w-full flex items-center justify-between mb-3 px-1 font-mono text-xs">
              <span className="text-neutral-400 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-saffron" />
                <span>Telemetry View Mode:</span>
              </span>
              <div className="flex items-center gap-1 p-1 rounded-xl bg-ink-card/90 border border-neutral-700 text-[11px]">
                <button
                  onClick={() => setViewMode('cartogram')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    viewMode === 'cartogram'
                      ? 'bg-saffron text-ink font-bold shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Cartogram Grid
                </button>
                <button
                  onClick={() => setViewMode('radar')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    viewMode === 'radar'
                      ? 'bg-emerald-500 text-ink font-bold shadow-sm'
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
              /* Holographic Radar Mesh Visual matching the user's reference */
              <div className="relative w-full aspect-[4/3] rounded-3xl bg-ink-card/90 border border-cyan-500/40 p-6 flex flex-col items-center justify-center overflow-hidden shadow-2xl backdrop-blur-md">
                {/* Radar Grid Circles */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[85%] h-[85%] rounded-full border border-cyan-500/20" />
                  <div className="absolute w-[65%] h-[65%] rounded-full border border-cyan-500/25" />
                  <div className="absolute w-[45%] h-[45%] rounded-full border border-cyan-500/30" />
                  <div className="absolute w-[25%] h-[25%] rounded-full border border-cyan-500/40" />
                  {/* Crosshairs */}
                  <div className="absolute w-full h-[1px] bg-cyan-500/20" />
                  <div className="absolute h-full w-[1px] bg-cyan-500/20" />
                  {/* Rotating Radar Sweep */}
                  <div className="absolute w-full h-full rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(6,182,212,0.25)_360deg)] animate-[spin_6s_linear_infinite]" />
                </div>

                {/* India Silhouette Hologram Map */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <img
                    src="/civic-hero-bg.jpg"
                    alt="India Geographic Radar Mesh"
                    className="w-[80%] h-[80%] object-contain opacity-80 filter drop-shadow-[0_0_20px_rgba(6,182,212,0.6)]"
                  />

                  {/* Pulsing Telemetry Nodes over major hubs */}
                  <div className="absolute top-[28%] left-[45%] flex flex-col items-center">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[10px] font-mono text-emerald-300 font-bold bg-ink/80 px-1 rounded mt-1 border border-emerald-500/30">
                      DELHI (98%)
                    </span>
                  </div>
                  <div className="absolute top-[55%] left-[36%] flex flex-col items-center">
                    <span className="w-3 h-3 rounded-full bg-saffron animate-ping" />
                    <span className="text-[10px] font-mono text-saffron font-bold bg-ink/80 px-1 rounded mt-1 border border-saffron/30">
                      MUMBAI (96%)
                    </span>
                  </div>
                  <div className="absolute top-[68%] left-[42%] flex flex-col items-center">
                    <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-[10px] font-mono text-cyan-300 font-bold bg-ink/80 px-1 rounded mt-1 border border-cyan-500/30">
                      BENGALURU (95%)
                    </span>
                  </div>
                  <div className="absolute top-[48%] left-[72%] flex flex-col items-center">
                    <span className="w-3 h-3 rounded-full bg-indigo-400 animate-ping" />
                    <span className="text-[10px] font-mono text-indigo-300 font-bold bg-ink/80 px-1 rounded mt-1 border border-indigo-500/30">
                      KOLKATA (88%)
                    </span>
                  </div>
                </div>

                {/* Floating Telemetry Widgets matching reference */}
                <div className="absolute bottom-5 left-5 z-20 p-3 rounded-2xl bg-ink/85 border border-cyan-500/40 backdrop-blur-md font-mono text-xs">
                  <span className="text-emerald-400 font-bold text-[11px] block uppercase tracking-wider">
                    NATIONAL SAFETY GRID
                  </span>
                  <span className="text-[10px] text-neutral-300">
                    Real-time telemetry • 768 Districts Synchronized
                  </span>
                </div>

                <div className="absolute top-5 right-5 z-20 w-24 h-24 rounded-full border border-cyan-500/50 bg-ink/80 flex flex-col items-center justify-center font-mono shadow-lg backdrop-blur-md">
                  <span className="text-xl font-bold text-white font-serif">4</span>
                  <span className="text-[9px] uppercase font-bold text-cyan-300 -mt-1">PILLARS</span>
                  <span className="text-[8px] text-neutral-400 uppercase">ONE INDIA</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
