import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  CheckSquare,
  Clock,
  UserCheck,
  ShieldCheck,
  BarChart3,
  ArrowRight,
  CornerDownRight,
  Play,
  Pause
} from 'lucide-react';

interface Step {
  id: number;
  stage: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  accentColor: string;
  telemetry: {
    label: string;
    value: string;
    sublabel: string;
  };
  mockCard: {
    ref: string;
    location: string;
    detail: string;
    status: string;
    actionDone: string;
  };
}

const STEPS: Step[] = [
  {
    id: 1,
    stage: '01 / INGESTION',
    title: 'Report',
    tagline: 'Geo-referenced Citizen Hazard Logging',
    description:
      'A citizen spots an unbarricaded road trench or broken high-voltage feeder. Submitting via web or offline PWA captures exact coordinates, timestamp, and photographic verification without exposing identity to the public.',
    icon: Camera,
    accentColor: '#FF8A1F',
    telemetry: {
      label: 'Avg Ingestion Latency',
      value: '1.4s',
      sublabel: 'Cryptographically hashed to audit log'
    },
    mockCard: {
      ref: 'SB-2026-00412',
      location: 'NH-44 Corridor, Bengaluru Urban (KA)',
      detail: 'Exposed culvert reinforcement bars posing tire puncture & collision risk',
      status: 'SUBMITTED',
      actionDone: 'Encrypted payload stored with EXIF timestamp verification'
    }
  },
  {
    id: 2,
    stage: '02 / TRIAGE',
    title: 'Review',
    tagline: 'Duplicate Filtering & Jurisdiction Verification',
    description:
      'Automated spatial clustering matches incident against existing tickets within a 50m radius. Municipal nodal officers verify jurisdiction, assess severity, and assign high-priority classification.',
    icon: CheckSquare,
    accentColor: '#0F9D8A',
    telemetry: {
      label: 'Spatial Match Accuracy',
      value: '99.2%',
      sublabel: 'Zero duplicate ticket dispersion'
    },
    mockCard: {
      ref: 'SB-2026-00412',
      location: 'NH-44 Corridor, Bengaluru Urban (KA)',
      detail: 'Clustered against 1 prior report; upgraded to Level-2 Arterial Hazard',
      status: 'UNDER_REVIEW',
      actionDone: 'Verified by District Disaster Authority Nodal Officer'
    }
  },
  {
    id: 3,
    stage: '03 / DISPATCH',
    title: 'Assignment',
    tagline: 'SLA-Bound Departmental Routing',
    description:
      'The ticket is programmatically dispatched to the road maintenance division. A mandatory 72-hour Service Level Agreement (SLA) countdown starts, binding the assigned engineer to field resolution.',
    icon: UserCheck,
    accentColor: '#F2B705',
    telemetry: {
      label: 'Routing Latency',
      value: '< 42m',
      sublabel: 'Direct API dispatch to division heads'
    },
    mockCard: {
      ref: 'SB-2026-00412',
      location: 'NH-44 Corridor, Bengaluru Urban (KA)',
      detail: 'Assigned to Division 4 Arterial Rapid Repair Unit (Engineer ID: ENG-882)',
      status: 'ASSIGNED',
      actionDone: 'SLA timer active: 68h 12m remaining'
    }
  },
  {
    id: 4,
    stage: '04 / RESOLUTION',
    title: 'Resolution',
    tagline: 'Field Rectification & Photographic Proof',
    description:
      'Work crews execute repairs on-site. The completing officer uploads after-photos with live GPS lock. The reporter receives an automated notification with resolution evidence to endorse or dispute.',
    icon: ShieldCheck,
    accentColor: '#138808',
    telemetry: {
      label: 'Citizen Verification',
      value: '94.8%',
      sublabel: 'Satisfaction rate on closed tickets'
    },
    mockCard: {
      ref: 'SB-2026-00412',
      location: 'NH-44 Corridor, Bengaluru Urban (KA)',
      detail: 'Culvert re-concreted and reflective cat-eye warning studs installed',
      status: 'RESOLVED',
      actionDone: 'Photo evidence verified & approved by Executive Engineer'
    }
  },
  {
    id: 5,
    stage: '05 / SYNTHESIS',
    title: 'Measurement',
    tagline: 'Instant District Index Recalculation',
    description:
      'Resolved incidents immediately feed the district indicators. The Safety Grid updates in real-time, adjusting the district safety index and transport safety score visible to all citizens and planners.',
    icon: BarChart3,
    accentColor: '#4C5BD4',
    telemetry: {
      label: 'Grid Score Impact',
      value: '+0.8 pts',
      sublabel: 'Bengaluru Urban composite index updated'
    },
    mockCard: {
      ref: 'SB-2026-00412',
      location: 'NH-44 Corridor, Bengaluru Urban (KA)',
      detail: 'Bengaluru Urban Transport Index adjusted from 77.2 → 78.0',
      status: 'INDEXED',
      actionDone: 'Reflected in Safety Grid Cartogram public aggregate'
    }
  }
];

export const ScrollStory: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const currentStep = STEPS.find((s) => s.id === activeStepId) || STEPS[0];

  // Auto-advance through the stages every 4.5 seconds
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStepId((prev) => (prev < 5 ? prev + 1 : 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 border-b border-hairline border-paper-border dark:border-ink-border bg-ink overflow-hidden">
      {/* Background Indian Landmark: Indian Smart City Civic Infrastructure */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/civic-smartcity-bg.jpg"
          alt="Indian Smart City Civic Infrastructure & Metro Viaduct"
          className="w-full h-full object-cover object-center opacity-80 dark:opacity-75 brightness-95 contrast-120"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/45 to-ink/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/65" />
        <div className="absolute inset-0 bg-grain opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-hairline border-white/15">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-saffron mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-saffron" />
              </span>
              Operational Architecture
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white">
              The 5-Stage Resolution Cycle
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <p className="font-mono text-xs text-neutral-300 max-w-md hidden sm:block">
              How a civic hazard or safety anomaly flows from raw citizen telemetry to validated
              district index measurement.
            </p>
            {/* Auto-cycle pause / play control */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pause auto rotation" : "Play auto rotation"}
              className="px-3 py-1.5 rounded-lg bg-ink-card/90 border border-neutral-700 text-neutral-300 hover:text-white font-mono text-[11px] flex items-center gap-1.5 shadow-md shrink-0 transition-colors"
            >
              {isPlaying ? <Pause className="w-3 h-3 text-saffron" /> : <Play className="w-3 h-3 text-emerald-400" />}
              <span>{isPlaying ? 'Auto-Cycle' : 'Paused'}</span>
            </button>
          </div>
        </div>

        {/* Step Selector Pills with Progress Fill */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-10 font-mono text-xs">
          {STEPS.map((step) => {
            const isActive = step.id === activeStepId;
            return (
              <button
                key={step.id}
                onClick={() => {
                  setActiveStepId(step.id);
                  setIsPlaying(false); // Pause auto-rotation when user clicks manually
                }}
                className={`relative p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between overflow-hidden ${
                  isActive
                    ? 'bg-paper-card dark:bg-ink-card border-saffron shadow-lg scale-[1.02] shadow-saffron/15'
                    : 'bg-paper dark:bg-ink/80 border-paper-border dark:border-ink-border text-neutral-400 hover:text-ink dark:hover:text-paper hover:bg-paper-card'
                }`}
              >
                {/* Active animated progress bar fill */}
                {isActive && isPlaying && (
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 4.5, ease: 'linear' }}
                    className="absolute top-0 left-0 h-0.5 bg-saffron"
                  />
                )}

                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold ${isActive ? 'text-saffron' : 'text-neutral-400'}`}>
                    {step.stage}
                  </span>
                  <step.icon
                    className={`w-4 h-4 transition-transform ${isActive ? 'scale-110' : ''}`}
                    style={{ color: isActive ? step.accentColor : 'currentColor' }}
                  />
                </div>
                <span className="font-bold text-sm mt-2 text-ink dark:text-paper">{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Stage Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-paper-card dark:bg-ink-card/90 p-6 sm:p-10 rounded-3xl border border-hairline border-paper-border dark:border-ink-border shadow-2xl backdrop-blur-xl">
          {/* Stage Narrative (Left) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                <span
                  className="font-mono text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded border inline-block mb-3"
                  style={{
                    color: currentStep.accentColor,
                    borderColor: `${currentStep.accentColor}40`,
                    backgroundColor: `${currentStep.accentColor}15`
                  }}
                >
                  Stage {currentStep.stage}
                </span>

                <h3 className="font-serif text-3xl sm:text-4xl font-medium text-ink dark:text-paper mb-3">
                  {currentStep.title}: <span className="italic font-light">{currentStep.tagline}</span>
                </h3>

                <p className="text-base text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed mb-6">
                  {currentStep.description}
                </p>

                {/* Telemetry Metric Box */}
                <div className="p-4 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border font-mono flex items-center justify-between shadow-sm">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">
                      {currentStep.telemetry.label}
                    </span>
                    <span
                      className="text-2xl font-bold font-serif"
                      style={{ color: currentStep.accentColor }}
                    >
                      {currentStep.telemetry.value}
                    </span>
                  </div>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 max-w-[200px] text-right">
                    {currentStep.telemetry.sublabel}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Live Incident Record Simulation (Right) with Interactive Animated Card */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.id}
                initial={{ opacity: 0, scale: 0.94, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -10 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="rounded-2xl border border-hairline border-paper-border dark:border-ink-border bg-paper dark:bg-ink p-6 font-mono shadow-2xl relative overflow-hidden"
              >
                {/* Subtle top indicator glow */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: currentStep.accentColor }}
                />

                {/* Header of mock card */}
                <div className="flex items-center justify-between pb-3 border-b border-paper-border dark:border-ink-border text-xs pt-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full animate-pulse"
                      style={{ backgroundColor: currentStep.accentColor }}
                    />
                    <span className="font-bold text-ink dark:text-paper">{currentStep.mockCard.ref}</span>
                  </div>
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border"
                    style={{
                      color: currentStep.accentColor,
                      borderColor: `${currentStep.accentColor}50`,
                      backgroundColor: `${currentStep.accentColor}15`
                    }}
                  >
                    {currentStep.mockCard.status}
                  </span>
                </div>

                {/* Body of mock card */}
                <div className="py-4 space-y-3.5 text-xs">
                  <div>
                    <span className="text-[10px] uppercase text-neutral-400 block mb-0.5">Location Telemetry</span>
                    <span className="text-ink dark:text-paper font-semibold">{currentStep.mockCard.location}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase text-neutral-400 block mb-0.5">Anomaly Description</span>
                    <span className="text-neutral-600 dark:text-neutral-300 font-sans text-xs leading-relaxed">
                      {currentStep.mockCard.detail}
                    </span>
                  </div>

                  <div className="pt-2.5 border-t border-paper-border dark:border-ink-border">
                    <span className="text-[10px] uppercase text-neutral-400 block mb-0.5">System Action</span>
                    <span
                      className="text-xs flex items-center gap-1.5 font-semibold"
                      style={{ color: currentStep.accentColor }}
                    >
                      <CornerDownRight className="w-3.5 h-3.5 shrink-0" />
                      <span>{currentStep.mockCard.actionDone}</span>
                    </span>
                  </div>
                </div>

                {/* Footer progress indicator */}
                <div className="pt-3 border-t border-paper-border dark:border-ink-border flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <span>Cycle Progress:</span>
                    <strong className="text-ink dark:text-paper">{activeStepId}/5</strong>
                  </span>
                  <button
                    onClick={() => {
                      setActiveStepId((prev) => (prev < 5 ? prev + 1 : 1));
                      setIsPlaying(false);
                    }}
                    className="text-saffron hover:underline flex items-center gap-1 font-bold group"
                  >
                    <span>Next Stage</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
