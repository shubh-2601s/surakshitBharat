import React from 'react';
import { Shield, BookOpen, AlertCircle, CheckCircle2, Scale, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { METHODOLOGY_WEIGHTS } from '@surakshit-bharat/shared';

export const MethodologyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs font-mono text-saffron hover:underline mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Platform Core</span>
      </Link>

      {/* Header */}
      <div className="border-b border-hairline border-paper-border dark:border-ink-border pb-8 mb-10">
        <div className="flex items-center gap-2 font-mono text-xs text-saffron uppercase tracking-widest mb-3">
          <BookOpen className="w-4 h-4" />
          <span>Documentation Reference • v1.0-DEMO</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-ink dark:text-paper mb-4">
          The Safety Grid™ Scoring Methodology
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
          The mathematical principles, indicator weightings, data coverage thresholds, and honesty
          constraints governing Surakshit Bharat's composite safety indices.
        </p>

        {/* Prominent Demo Badge Alert */}
        <div className="mt-6 p-4 rounded-xl bg-signalred/10 border border-signalred/30 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-signalred shrink-0 mt-0.5" />
          <div className="text-xs text-neutral-700 dark:text-neutral-300 font-mono">
            <strong className="text-signalred uppercase tracking-wider block mb-1">
              DEMONSTRATION PILOT DISCLOSURE:
            </strong>
            All current metrics displayed on Surakshit Bharat are simulated demonstration records (`is_demo = true`).
            They are structured to test routing, indexing, and visualization infrastructure and should not be used as official government statistics.
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-12 font-sans text-neutral-800 dark:text-neutral-200">
        {/* Section 1: Honesty Rules */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-ink dark:text-paper mb-4 flex items-center gap-2">
            <Scale className="w-5 h-5 text-saffron" />
            <span>1. Core Honesty Rules & Principles</span>
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
            <p>
              Surakshit Bharat is founded on radical civic honesty. Conventional ranking dashboards
              frequently assign misleading scores to areas where zero data was collected, rewarding
              districts simply because nobody reported hazards. We reject this approach:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>No Data &ne; Safe:</strong> A district with zero submitted reports is marked as{' '}
                <span className="font-mono bg-paper-muted dark:bg-ink-muted px-1.5 py-0.5 rounded border border-neutral-400">
                  INSUFFICIENT DATA
                </span>{' '}
                with a diagonal hatch pattern. It is never assigned a top score by default.
              </li>
              <li>
                <strong>Coverage Threshold Requirement (&ge; 60%):</strong> A composite score is computed
                only if all four pillars (Community, Manufacturing, Transport, Digital) have data
                coverage exceeding 60%.
              </li>
              <li>
                <strong>Immutable Audit Trail:</strong> Every state change, assignment, and score adjustment
                writes an append-only row into the secure audit log.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2: Mathematical Formulation */}
        <section className="p-6 rounded-2xl bg-paper-card dark:bg-ink-card border border-hairline border-paper-border dark:border-ink-border">
          <h2 className="font-serif text-2xl font-bold text-ink dark:text-paper mb-4">
            2. Mathematical Formulation
          </h2>

          <div className="space-y-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border">
              <span className="text-neutral-400 uppercase text-[10px] block mb-1">
                2.1 Sub-Indicator Normalization (Min-Max Scaling)
              </span>
              <div className="font-bold text-sm text-saffron">
                z(i, d) = ((x(i, d) - min(X)) / (max(X) - min(X))) &times; 100
              </div>
              <p className="text-neutral-500 mt-2 font-sans text-xs">
                Where lower values represent greater safety (e.g., emergency ambulance response time or hazard backlog days), the value is inverted: <code>z_inv = 100 - z</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border">
              <span className="text-neutral-400 uppercase text-[10px] block mb-1">
                2.2 Composite Safety Index Formula
              </span>
              <div className="font-bold text-sm text-ink dark:text-paper">
                Score(d) = 0.25 &times; S(Community) + 0.25 &times; S(Manufacturing) + 0.25 &times; S(Transport) + 0.25 &times; S(Digital)
              </div>
              <p className="text-neutral-500 mt-2 font-sans text-xs">
                Evaluated if and only if Coverage(d) &ge; {METHODOLOGY_WEIGHTS.minCoverageThreshold * 100}%. Otherwise returns NULL.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Four Pillar Weights Table */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-ink dark:text-paper mb-4">
            3. Pillar Weight Allocation
          </h2>
          <div className="overflow-x-auto rounded-xl border border-hairline border-paper-border dark:border-ink-border">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-paper-muted dark:bg-ink-muted text-neutral-500 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Pillar Name</th>
                  <th className="p-3">Weight</th>
                  <th className="p-3">Core Ingestion Feeds</th>
                  <th className="p-3">Cadence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-paper-border dark:divide-ink-border">
                <tr>
                  <td className="p-3 font-bold text-[#FF8A1F]">Community Safety</td>
                  <td className="p-3">25% (0.25)</td>
                  <td className="p-3 font-sans text-neutral-600 dark:text-neutral-300">
                    Municipal civic hazard reports, open drainage, high-tension wire hazard tracking
                  </td>
                  <td className="p-3">Hourly</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#0F9D8A]">Local Manufacturing</td>
                  <td className="p-3">25% (0.25)</td>
                  <td className="p-3 font-sans text-neutral-600 dark:text-neutral-300">
                    BIS/FSSAI certification compliance, cryptographic batch QR audits, seizure logs
                  </td>
                  <td className="p-3">Daily</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#F2B705]">Transport Safety</td>
                  <td className="p-3">25% (0.25)</td>
                  <td className="p-3 font-sans text-neutral-600 dark:text-neutral-300">
                    Highway blackspots, road surface degradation, emergency 108/112 EMS response latency
                  </td>
                  <td className="p-3">15 Minutes</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#4C5BD4]">Digital Safety</td>
                  <td className="p-3">25% (0.25)</td>
                  <td className="p-3 font-sans text-neutral-600 dark:text-neutral-300">
                    Cyber fraud syndicate alerts, fraudulent APK blocking, 1930 recovery velocity
                  </td>
                  <td className="p-3">Real-time</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};
