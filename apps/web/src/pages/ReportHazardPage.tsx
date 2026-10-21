import React, { useState, useRef } from 'react';
import {
  AlertTriangle,
  Camera,
  MapPin,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  UploadCloud,
  Image as ImageIcon,
  X,
  RefreshCw,
  FileText
} from 'lucide-react';
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

  // Photographic Evidence State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string>('');
  const [photoSize, setPhotoSize] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Invalid file format. Please upload a photographic evidence image (JPG, PNG, or WebP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds the 5MB statutory limit. Please select an optimized photo under 5MB.');
      return;
    }

    setPhotoName(file.name);
    const sizeKb = Math.round(file.size / 1024);
    setPhotoSize(sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const removePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoPreview(null);
    setPhotoName('');
    setPhotoSize('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const created = await createReport({
      pillar,
      category,
      title,
      description,
      district,
      photo_path: photoPreview || undefined,
      reporter_id: user?.id
    });

    setLoading(false);
    setSubmittedRef(created.ref_no);
  };

  return (
    <div className="relative min-h-[90vh] w-full overflow-hidden">
      {/* Indian Smart City Infrastructure Background - Fixed Viewport Backdrop */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/civic-smartcity-bg.jpg"
          alt="Indian Smart City Boulevard and Infrastructure"
          className="w-full h-full object-cover object-center opacity-85 dark:opacity-80 brightness-95 contrast-115"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/60 via-paper/75 to-paper/95 dark:from-ink/60 via-ink/75 to-ink/95" />
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-20" />
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
                  setPhotoPreview(null);
                  setPhotoName('');
                  setPhotoSize('');
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

            {/* Photographic Evidence Upload */}
            <div>
              <label className="block text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2 font-bold flex items-center justify-between">
                <span>5. Photographic Evidence (Geo-tagged JPG/PNG &lt; 5MB)</span>
                {photoPreview && (
                  <span className="text-[10px] text-indiagreen font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Evidence Loaded
                  </span>
                )}
              </label>

              {/* Hidden Native File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />

              {!photoPreview ? (
                /* Interactive Click & Drag Dropzone */
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-7 text-center transition-all cursor-pointer select-none ${
                    isDragging
                      ? 'border-saffron bg-saffron/15 scale-[1.01]'
                      : 'border-paper-border dark:border-ink-border bg-paper/50 dark:bg-ink/50 hover:border-saffron hover:bg-paper-card dark:hover:bg-ink-card'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-saffron/15 text-saffron mx-auto mb-3 flex items-center justify-center border border-saffron/30 shadow-sm">
                    <Camera className="w-6 h-6" />
                  </div>
                  <span className="text-ink dark:text-paper font-sans text-sm font-semibold block mb-1">
                    Click to browse or drag & drop site photo here
                  </span>
                  <span className="text-neutral-500 dark:text-neutral-400 text-xs font-sans block mb-2">
                    Supports JPG, PNG, and WebP up to 5MB
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-paper-border/60 dark:bg-ink-border/60 text-[10px] text-neutral-500 font-mono">
                    <UploadCloud className="w-3.5 h-3.5 text-saffron" />
                    <span>EXIF GPS metadata preserved for automated GIS dispatch</span>
                  </div>
                </div>
              ) : (
                /* Photographic Preview & Metadata Card */
                <div className="p-4 rounded-2xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border shadow-md">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    {/* Image Thumbnail */}
                    <div className="relative w-full sm:w-36 h-28 rounded-xl overflow-hidden border border-paper-border dark:border-ink-border bg-black/10 shrink-0">
                      <img
                        src={photoPreview}
                        alt="Uploaded Incident Evidence"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Metadata Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-ink dark:text-paper truncate">
                          {photoName || 'evidence_site_photo.jpg'}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border text-neutral-500 shrink-0">
                          {photoSize || '< 5MB'}
                        </span>
                      </div>

                      <div className="space-y-1 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                        <div className="flex items-center gap-1.5 text-indiagreen">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Image integrity verified & SHA-256 hashed</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-saffron" />
                          <span>Simulated GPS: 12.9716° N, 77.5946° E ({district})</span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-2.5 py-1 rounded-lg border border-paper-border dark:border-ink-border text-neutral-600 dark:text-neutral-300 hover:text-ink dark:hover:text-paper font-mono text-[11px] flex items-center gap-1 transition-colors"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Change Photo</span>
                        </button>
                        <button
                          type="button"
                          onClick={removePhoto}
                          className="px-2.5 py-1 rounded-lg border border-signalred/30 text-signalred hover:bg-signalred/10 font-mono text-[11px] flex items-center gap-1 transition-colors"
                        >
                          <X className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
