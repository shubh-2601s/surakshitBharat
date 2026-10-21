import React, { useState } from 'react';
import { AlertTriangle, Camera, MapPin, CheckCircle, ArrowRight, ShieldCheck, UploadCloud } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createReport } from '../services/reports';
import { useAuth } from '../context/AuthContext';

export const ReportHazardPage: React.FC = () => {
  const { user } = useAuth();
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [pillar, setPillar] = useState<'community' | 'transport' | 'manufacturing' | 'digital'>('community');
  const [category, setCategory] = useState('Electrical Hazard');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [district, setDistrict] = useState('Bengaluru Urban (Karnataka)');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const created = await createReport({
      pillar,
      category,
      title,
      description,
      district,
      reporter_id: user?.id
    });

    setLoading(false);
    setSubmittedRef(created.ref_no);
  };

  return (
    <div className="relative min-h-[90vh] w-full overflow-hidden">
      {/* Subtle Indian Smart City Infrastructure Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/civic-smartcity-bg.jpg"
          alt="Indian Smart City Boulevard and Infrastructure"
          className="w-full h-full object-cover object-center opacity-10 dark:opacity-20 brightness-90 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/90 via-paper/95 to-paper dark:from-ink/85 dark:via-ink/95 dark:to-ink" />
        <div className="absolute inset-0 bg-grain" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="border-b border-hairline border-paper-border dark:border-ink-border pb-6 mb-8">
          <div className="flex items-center gap-2 font-mono text-xs text-saffron uppercase tracking-widest mb-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Citizen Intake Portal • SLA-Bound Triage</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-ink dark:text-paper tracking-tight">
            File Civic or Infrastructure Hazard
          </h1>
          <p className="font-sans text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Geo-tagged incidents are routed to assigned nodal officers within 45 minutes.
            Reporter identity remains strictly confidential.
          </p>
        </div>

        {submittedRef ? (
          <div className="p-8 rounded-3xl bg-paper-card/90 dark:bg-ink-card/90 border border-hairline border-saffron/40 font-mono text-center shadow-2xl backdrop-blur-md">
            <div className="w-12 h-12 rounded-full bg-indiagreen/20 text-indiagreen mx-auto flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-ink dark:text-paper mb-2">
              Incident Successfully Ingested
            </h2>
            <p className="font-sans text-sm text-neutral-600 dark:text-neutral-300 max-w-md mx-auto mb-6">
              Your report has been hashed into the municipal dispatch queue. Keep your unique reference
              safe to track field inspection status.
            </p>

            <div className="p-4 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border max-w-sm mx-auto mb-6">
              <span className="text-[10px] uppercase text-neutral-400 block">Incident Reference Number</span>
              <span className="text-2xl font-bold text-saffron tracking-wider">{submittedRef}</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs">
              <Link
                to={`/reports/${submittedRef}`}
                className="px-5 py-3 rounded-xl bg-saffron text-ink font-bold shadow-md hover:shadow-control-room transition-all flex items-center gap-1.5"
              >
                <span>Track This Incident Live</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => {
                  setSubmittedRef(null);
                  setTitle('');
                  setDescription('');
                }}
                className="px-4 py-3 rounded-xl border border-paper-border dark:border-ink-border text-neutral-600 dark:text-neutral-300 hover:text-ink dark:hover:text-paper"
              >
                Submit Another Incident
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-paper-card/90 dark:bg-ink-card/90 border border-hairline border-paper-border dark:border-ink-border shadow-xl backdrop-blur-md space-y-6 font-mono text-xs">
            {/* Pillar Selector */}
            <div>
              <label className="block text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2 font-bold">
                1. Incident Domain Pillar
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => { setPillar('community'); setCategory('Civic / Sanitation Hazard'); }}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    pillar === 'community'
                      ? 'bg-[#FF8A1F]/20 border-[#FF8A1F] text-[#FF8A1F] font-bold'
                      : 'bg-paper dark:bg-ink border-paper-border dark:border-ink-border text-neutral-500'
                  }`}
                >
                  Community Hazard
                </button>
                <button
                  type="button"
                  onClick={() => { setPillar('transport'); setCategory('Road / Highway Defect'); }}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    pillar === 'transport'
                      ? 'bg-[#F2B705]/20 border-[#F2B705] text-[#F2B705] font-bold'
                      : 'bg-paper dark:bg-ink border-paper-border dark:border-ink-border text-neutral-500'
                  }`}
                >
                  Road / Transport
                </button>
                <button
                  type="button"
                  onClick={() => { setPillar('manufacturing'); setCategory('Suspect Illicit Batch'); }}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    pillar === 'manufacturing'
                      ? 'bg-[#0F9D8A]/20 border-[#0F9D8A] text-[#0F9D8A] font-bold'
                      : 'bg-paper dark:bg-ink border-paper-border dark:border-ink-border text-neutral-500'
                  }`}
                >
                  Fake Product / Batch
                </button>
                <button
                  type="button"
                  onClick={() => { setPillar('digital'); setCategory('Cyber Syndicate / Scam'); }}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    pillar === 'digital'
                      ? 'bg-[#4C5BD4]/20 border-[#4C5BD4] text-[#4C5BD4] font-bold'
                      : 'bg-paper dark:bg-ink border-paper-border dark:border-ink-border text-neutral-500'
                  }`}
                >
                  Digital / Cyber Scam
                </button>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2 font-bold">
                2. Incident Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Uncovered electrical manhole near bus shelter"
                className="w-full p-3 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border text-ink dark:text-paper focus:outline-none focus:border-saffron font-sans text-sm"
              />
            </div>

            {/* Location & District */}
            <div>
              <label className="block text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2 font-bold">
                3. Jurisdiction District & Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-saffron" />
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border text-ink dark:text-paper focus:outline-none focus:border-saffron"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2 font-bold">
                4. Technical Description & Severity Context
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe physical dimensions, potential pedestrian or vehicle risks, landmark references..."
                className="w-full p-3 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border text-ink dark:text-paper focus:outline-none focus:border-saffron font-sans text-sm"
              />
            </div>

            {/* Evidence Upload Mock */}
            <div>
              <label className="block text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2 font-bold">
                5. Photographic Evidence (Geo-tagged JPG/PNG &lt; 5MB)
              </label>
              <div className="border border-dashed border-paper-border dark:border-ink-border rounded-xl p-6 text-center bg-paper/50 dark:bg-ink/50 hover:border-saffron transition-colors cursor-pointer">
                <Camera className="w-6 h-6 text-neutral-400 mx-auto mb-2" />
                <span className="text-neutral-600 dark:text-neutral-300 block font-sans">
                  Drag and drop site photo or click to browse
                </span>
                <span className="text-[10px] text-neutral-500 block mt-1">
                  EXIF GPS metadata preserved for automated location verification
                </span>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-saffron hover:bg-saffron-muted text-ink font-bold font-mono text-sm shadow-lg hover:shadow-control-room transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Hashing & Dispatched to Queue...</span>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4" />
                  <span>Generate Reference & Dispatch Incident</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
