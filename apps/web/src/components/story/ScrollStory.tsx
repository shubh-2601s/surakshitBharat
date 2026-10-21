import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, CheckSquare, Clock, UserCheck, ShieldCheck, BarChart3, ArrowRight, CornerDownRight } from 'lucide-react';

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
      sublabel: 'Zero duplicate duplicate ticket dispersion'
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
  const currentStep = STEPS.find((s) => s.id === activeStepId) || STEPS[0];

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
              <span className="w-2 h-2 rounded-full bg-saffron" />
              Operational Architecture
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-ink dark:text-paper">
              The 5-Stage Resolution Cycle
            </h2>
          </div>
          <p className="mt-3 md:mt-0 font-mono text-xs text-neutral-500 dark:text-neutral-400 max-w-md">
            How a civic hazard or safety anomaly flows from raw citizen telemetry to validated
            district index measurement.
          </p>
        </div>

        {/* Step Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-10 font-mono text-xs">
          {STEPS.map((step) => {
            const isActive = step.id === activeStepId;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepId(step.id)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isActive
                    ? 'bg-paper-card dark:bg-ink-card border-saffron shadow-md scale-[1.02]'
                    : 'bg-paper dark:bg-ink border-paper-border dark:border-ink-border text-neutral-500 hover:text-ink dark:hover:text-paper'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold ${isActive ? 'text-saffron' : 'text-neutral-400'}`}>
                    {step.stage}
                  </span>
                  <step.icon
                    className="w-4 h-4"
                    style={{ color: isActive ? step.accentColor : 'currentColor' }}
                  />
                </div>
                <span className="font-bold text-sm mt-2 text-ink dark:text-paper">{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Stage Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-paper-card dark:bg-ink-card p-6 sm:p-10 rounded-2xl border border-hairline border-paper-border dark:border-ink-border shadow-lg">
          {/* Stage Narrative (Left) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
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

                <h3 className="font-serif text-3xl sm:text-4xl font-medium text-ink dark:text-paper mb-2">
                  {currentStep.title}: <span className="italic font-light">{currentStep.tagline}</span>
                </h3>

                <p className="text-base text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed mb-6">
                  {currentStep.description}
                </p>

                {/* Telemetry Metric Box */}
                <div className="p-4 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border font-mono flex items-center justify-between">
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

          {/* Live Incident Record Simulation (Right) */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="rounded-xl border border-hairline border-paper-border dark:border-ink-border bg-paper dark:bg-ink p-5 font-mono shadow-inner"
              >
                {/* Header of mock card */}
                <div className="flex items-center justify-between pb-3 border-b border-paper-border dark:border-ink-border text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentStep.accentColor }} />
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
                <div className="py-4 space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] uppercase text-neutral-400 block">Location Telemetry</span>
                    <span className="text-ink dark:text-paper font-semibold">{currentStep.mockCard.location}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase text-neutral-400 block">Anomaly Description</span>
                    <span className="text-neutral-600 dark:text-neutral-300 font-sans text-xs">
                      {currentStep.mockCard.detail}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-paper-border dark:border-ink-border">
                    <span className="text-[10px] uppercase text-neutral-400 block">System Action</span>
                    <span className="text-xs text-saffron flex items-center gap-1.5 mt-0.5 font-semibold">
                      <CornerDownRight className="w-3.5 h-3.5" />
                      {currentStep.mockCard.actionDone}
                    </span>
                  </div>
                </div>

                {/* Footer progress indicator */}
                <div className="pt-3 border-t border-paper-border dark:border-ink-border flex items-center justify-between text-[11px] text-neutral-400">
                  <span>Cycle Progress: {activeStepId}/5</span>
                  <button
                    onClick={() => setActiveStepId((prev) => (prev < 5 ? prev + 1 : 1))}
                    className="text-saffron hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>Next Stage</span>
                    <ArrowRight className="w-3 h-3" />
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
