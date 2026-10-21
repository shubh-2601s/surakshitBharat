import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SafetyGridCartogram } from './SafetyGridCartogram';
import { PillarType, StateTile } from '@surakshit-bharat/shared';
import { Shield, ArrowRight, Activity, AlertTriangle, CheckCircle, Database, Layers } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedPillar, setSelectedPillar] = useState<PillarType | 'all'>('all');
  const [selectedTile, setSelectedTile] = useState<StateTile | null>(null);

  return (
    <section className="relative min-h-[92vh] w-full flex flex-col justify-center overflow-hidden border-b border-hairline border-paper-border dark:border-ink-border">
      {/* Background with custom civic control-room image & subtle grain */}
      <div className="absolute inset-0 z-0">
        <img
          src="/civic-hero-bg.jpg"
          alt="Civic Intelligence Infrastructure Background"
          className="w-full h-full object-cover object-center opacity-15 dark:opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/85 via-paper/95 to-paper dark:from-ink/80 dark:via-ink/90 dark:to-ink pointer-events-none" />
        <div className="absolute inset-0 bg-grain pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Operational Metrics */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* National Pilot Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-paper-card dark:bg-ink-card border border-hairline border-saffron/40 w-fit mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-saffron animate-pulse" />
              <span className="font-mono text-xs font-semibold tracking-wider uppercase text-ink dark:text-paper">
                Surakshit Bharat Core • v1.0 Pilot
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-signalred/15 text-signalred border border-signalred/25">
                DEMO DATA
              </span>
            </div>

            {/* Editorial Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-ink dark:text-paper leading-[1.08] mb-6">
              Measure. <br />
              <span className="italic font-light text-saffron">Route.</span> <br />
              Resolve.
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed mb-8 max-w-xl">
              India’s unified civic-intelligence platform bridging citizen hazard reporting,
              cryptographic manufacturing verification, high-risk transport corridor telemetry,
              and coordinated digital defense.
            </p>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10">
              <Link
                to="/report/new"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-saffron hover:bg-saffron-muted text-ink font-semibold text-sm shadow-md hover:shadow-control-room transition-all"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>File Hazard Report</span>
              </Link>
              <Link
                to="/safety-grid"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-paper-card dark:bg-ink-card border border-hairline border-paper-border dark:border-ink-border text-ink dark:text-paper hover:border-saffron font-medium text-sm transition-all"
              >
                <span>Explore Full Grid</span>
                <ArrowRight className="w-4 h-4 text-saffron" />
              </Link>
            </div>

            {/* Quick KPI Strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-hairline border-paper-border dark:border-ink-border font-mono">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
                  States & UTs
                </span>
                <span className="text-2xl font-bold text-ink dark:text-paper font-serif">36</span>
                <span className="text-[10px] text-indiagreen block mt-0.5">● In Mesh</span>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
                  Districts
                </span>
                <span className="text-2xl font-bold text-ink dark:text-paper font-serif">768</span>
                <span className="text-[10px] text-neutral-500 block mt-0.5">Scored & Mapped</span>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
                  Avg. Resolution
                </span>
                <span className="text-2xl font-bold text-saffron font-serif">72h</span>
                <span className="text-[10px] text-neutral-500 block mt-0.5">SLA SLA-Bound</span>
              </div>
            </div>
          </div>

          {/* Right Column: Signature Safety Grid Cartogram */}
          <div className="lg:col-span-7 w-full flex flex-col items-center">
            <SafetyGridCartogram
              selectedPillar={selectedPillar}
              onSelectPillar={setSelectedPillar}
              onSelectTile={setSelectedTile}
            />

            {/* Cartogram Footnote & Methodology Callout */}
            <div className="w-full mt-3 flex items-center justify-between px-2 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-saffron" />
                Aggregated normalized scores [0-100] • Updated minutely
              </span>
              <Link
                to="/methodology"
                className="hover:text-saffron underline decoration-dotted transition-colors"
              >
                Read Index Methodology →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
