import React from 'react';
import { HeroSection } from '../components/hero/HeroSection';
import { NationalStats } from '../components/metrics/NationalStats';
import { ScrollStory } from '../components/story/ScrollStory';
import { PillarsSection } from '../components/pillars/PillarsSection';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, AlertTriangle, FileText, Lock } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. Full Hero Section with Safety Grid Cartogram & Ticker */}
      <HeroSection />

      {/* 2. National Performance & Verified Authorities Strip */}
      <NationalStats />

      {/* 3. The 4 Distinct Pillar Panels */}
      <PillarsSection />

      {/* 4. The 5-Stage Pinned Lifecycle (Report -> Review -> Assignment -> Resolution -> Measurement) */}
      <ScrollStory />

      {/* 5. Direct Citizen Action Banner */}
      <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-paper-card dark:bg-ink-card border-b border-hairline border-paper-border dark:border-ink-border">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-navy via-navy-deep to-ink p-8 sm:p-12 text-white border border-hairline border-saffron/40 shadow-2xl relative overflow-hidden">
          {/* Real Indian Landmark Background: India Gate Monument */}
          <div className="absolute inset-0 z-0">
            <img
              src="/india-gate-hero.jpg"
              alt="India Gate National Monument"
              className="w-full h-full object-cover object-center opacity-45 brightness-90 contrast-120"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/65" />
          </div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-saffron/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron/20 border border-saffron/40 text-saffron font-mono text-xs font-semibold mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero Citizen Registration Barrier</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white mb-3 leading-snug">
                Spot a Hazard. Protect Your Neighborhood.
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
                Open drains, live wiring, missing guardrails, or illicit products—file a geo-verified
                report in 60 seconds. Receive an official tracking reference and status notifications as
                field authorities act.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full md:w-auto shrink-0 font-mono text-xs">
              <Link
                to="/report/new"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-saffron hover:bg-saffron-muted text-ink font-bold shadow-lg hover:shadow-control-room transition-all"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>File Hazard Now</span>
              </Link>
              <Link
                to="/safety-grid"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
              >
                <span>View District Rankings</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
