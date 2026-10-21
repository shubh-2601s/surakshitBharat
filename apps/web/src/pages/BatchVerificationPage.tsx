import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShieldCheck,
  QrCode,
  Search,
  CheckCircle,
  AlertTriangle,
  Factory,
  Calendar,
  Layers,
  ArrowLeft,
  FileCheck2,
  ExternalLink
} from 'lucide-react';

interface BatchInfo {
  batchCode: string;
  productName: string;
  manufacturerName: string;
  state: string;
  bisLicense: string;
  standard: string;
  manufacturedOn: string;
  validUntil: string;
  unitCount: number;
  isVerified: boolean;
  sha256Hash: string;
  testingLab: string;
}

const DEMO_BATCH_REGISTRY: Record<string, BatchInfo> = {
  'BHC-2026-8812': {
    batchCode: 'BHC-2026-8812',
    productName: 'Heavy Duty Flame-Retardant Multistrand Copper Cable (4 sq mm)',
    manufacturerName: 'Bharat Heavy Cables & Conductors Ltd',
    state: 'Maharashtra (Pune Plant #02)',
    bisLicense: 'CM/L-8491201',
    standard: 'IS 694:2010 (PVC Insulated Cables)',
    manufacturedOn: '14 January 2026',
    validUntil: '13 January 2031',
    unitCount: 5000,
    isVerified: true,
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    testingLab: 'National Test House (NTH), Mumbai'
  },
  'KSF-2026-4409': {
    batchCode: 'KSF-2026-4409',
    productName: 'High-Strength Corrosion Resistant Fe-550D TMT Steel Rebar',
    manufacturerName: 'Kaveri Steel Structural Fabricators',
    state: 'Tamil Nadu (Salem Works)',
    bisLicense: 'CM/L-3921092',
    standard: 'IS 1786:2008 (High Strength Deformed Steel Bars)',
    manufacturedOn: '02 February 2026',
    validUntil: '01 February 2036',
    unitCount: 12000,
    isVerified: true,
    sha256Hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
    testingLab: 'CSIR - Structural Engineering Research Centre'
  }
};

export const BatchVerificationPage: React.FC = () => {
  const { batchCode } = useParams<{ batchCode?: string }>();
  const [queryCode, setQueryCode] = useState(batchCode || 'BHC-2026-8812');
  const [batch, setBatch] = useState<BatchInfo | null>(null);
  const [notFound, setNotFound] = useState(false);

  const lookupBatch = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (DEMO_BATCH_REGISTRY[trimmed]) {
      setBatch(DEMO_BATCH_REGISTRY[trimmed]);
      setNotFound(false);
    } else {
      setBatch(null);
      setNotFound(true);
    }
  };

  useEffect(() => {
    if (batchCode) {
      lookupBatch(batchCode);
    } else {
      lookupBatch('BHC-2026-8812');
    }
  }, [batchCode]);

  return (
    <div className="relative min-h-[90vh] w-full overflow-hidden">
      {/* Subtle Manufacturing Lab Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/manufacturing-bg.jpg"
          alt="Indian Manufacturing Lab Background"
          className="w-full h-full object-cover object-center opacity-10 dark:opacity-20 brightness-90 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/90 via-paper/95 to-paper dark:from-ink/85 dark:via-ink/95 dark:to-ink" />
        <div className="absolute inset-0 bg-grain" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation & Header */}
        <div className="mb-8">
          <Link
            to="/manufacturers"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-saffron hover:underline mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Manufacturing Registry</span>
          </Link>

          <div className="flex items-center gap-2 font-mono text-xs text-[#0F9D8A] uppercase tracking-widest mb-2">
            <QrCode className="w-4 h-4" />
            <span>Pillar 02 • Cryptographic QR Batch Verification</span>
            <span className="px-1.5 py-0.5 rounded font-mono font-bold bg-signalred/15 text-signalred text-[10px] border border-signalred/30">
              DEMO DATA
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink dark:text-paper tracking-tight">
            Product Batch Authenticity & BIS Conformance Seal
          </h1>
          <p className="font-sans text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl">
            Scan any physical product QR code or enter the batch code below to confirm BIS laboratory
            certification and manufacturer legitimacy.
          </p>

          {/* Quick Search Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              lookupBatch(queryCode);
            }}
            className="mt-6 flex flex-col sm:flex-row gap-2 font-mono text-xs"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={queryCode}
                onChange={(e) => setQueryCode(e.target.value)}
                placeholder="Enter Batch Code (e.g. BHC-2026-8812)..."
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-paper-card/90 dark:bg-ink-card/90 border border-paper-border dark:border-ink-border text-ink dark:text-paper focus:outline-none focus:border-[#0F9D8A] backdrop-blur-md uppercase"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#0F9D8A] hover:bg-[#0F9D8A]/90 text-white font-bold shadow-md transition-all shrink-0"
            >
              Verify Batch
            </button>
          </form>
        </div>

        {notFound ? (
          <div className="p-8 rounded-3xl bg-signalred/10 border border-signalred/30 text-center font-mono text-xs backdrop-blur-md shadow-xl">
            <div className="w-12 h-12 rounded-full bg-signalred/20 text-signalred mx-auto flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-signalred mb-2">
              Unverified / Suspect Batch Code
            </h2>
            <p className="font-sans text-neutral-700 dark:text-neutral-300 max-w-md mx-auto mb-6 text-sm">
              No matching laboratory certification record was found for "{queryCode}". This product batch
              may be uncertified, counterfeit, or mislabeled.
            </p>
            <Link
              to="/report/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-signalred text-white font-bold"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Report Counterfeit Product to Authorities</span>
            </Link>
          </div>
        ) : batch ? (
          /* Verified Batch Details Card */
          <div className="p-6 sm:p-8 rounded-3xl bg-paper-card/90 dark:bg-ink-card/90 border border-hairline border-[#0F9D8A]/50 shadow-2xl backdrop-blur-md font-mono text-xs">
            {/* Verification Badge Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-paper-border dark:border-ink-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indiagreen/15 text-indiagreen border border-indiagreen/30 flex items-center justify-center">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-indiagreen font-bold text-sm tracking-wider uppercase">
                      CRYPTOGRAPHICALLY VERIFIED CONFORMANCE
                    </span>
                  </div>
                  <span className="text-xl font-bold text-ink dark:text-paper font-serif block mt-0.5">
                    Batch: {batch.batchCode}
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] text-neutral-400 block uppercase">BIS Standard Mark</span>
                <span className="px-2.5 py-1 rounded bg-[#0F9D8A]/15 text-[#0F9D8A] font-bold border border-[#0F9D8A]/30 inline-block mt-0.5">
                  {batch.standard}
                </span>
              </div>
            </div>

            {/* Product Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-paper-border dark:border-ink-border">
              <div>
                <span className="text-[10px] text-neutral-400 uppercase block mb-1">Certified Product</span>
                <span className="text-sm font-bold text-ink dark:text-paper font-sans block">
                  {batch.productName}
                </span>
                <span className="text-[11px] text-neutral-500 mt-1 block">
                  Total Certified Units in Batch: {batch.unitCount.toLocaleString()}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-neutral-400 uppercase block mb-1">Licensed Manufacturer</span>
                <span className="text-sm font-bold text-ink dark:text-paper font-sans block">
                  {batch.manufacturerName}
                </span>
                <span className="text-[11px] text-neutral-500 mt-1 block">
                  Plant Location: {batch.state}
                </span>
              </div>
            </div>

            {/* Technical Verification Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-b border-paper-border dark:border-ink-border">
              <div className="p-3.5 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border">
                <span className="text-[10px] text-neutral-400 uppercase block">BIS License Number</span>
                <span className="font-bold text-ink dark:text-paper text-xs mt-0.5 block">
                  {batch.bisLicense}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border">
                <span className="text-[10px] text-neutral-400 uppercase block">Sampling Test Lab</span>
                <span className="font-bold text-ink dark:text-paper text-xs mt-0.5 block truncate">
                  {batch.testingLab}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border">
                <span className="text-[10px] text-neutral-400 uppercase block">Production Date</span>
                <span className="font-bold text-ink dark:text-paper text-xs mt-0.5 block">
                  {batch.manufacturedOn}
                </span>
              </div>
            </div>

            {/* Digital Signature Salt */}
            <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-neutral-500 text-[11px]">
              <div>
                <span className="text-[10px] uppercase text-neutral-400 block">Cryptographic Hash (SHA-256)</span>
                <code className="text-[#0F9D8A] font-bold text-[10px] break-all">
                  {batch.sha256Hash}
                </code>
              </div>

              <Link
                to="/report/new"
                className="text-signalred hover:underline shrink-0 font-bold"
              >
                Suspect Tampering? Report Batch &rarr;
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
