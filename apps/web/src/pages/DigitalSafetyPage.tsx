import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, ExternalLink, PhoneCall, CheckCircle, Search, ShieldCheck } from 'lucide-react';

const DEMO_ADVISORIES = [
  { id: 'ADV-2026-104', title: 'Fake PM Solar Scheme WhatsApp Syndicate', category: 'Phishing / Malware', severity: 'Critical', source: 'I4C / CERT-In', verifiedAt: '2 hours ago', description: 'Malicious links offering subsidised solar panels installing Trojan.AndroidOS.SmsStealer. 14 servers neutralized.' },
  { id: 'ADV-2026-103', title: 'Aadhaar Biometric Update APK Clone', category: 'Identity Fraud', severity: 'High', source: 'UIDAI Advisory', verifiedAt: 'Yesterday', description: 'Counterfeit APK harvesting Aadhaar OTPs and biometric credentials. Direct citizens to official mAadhaar application.' },
  { id: 'ADV-2026-102', title: 'Part-Time Task Job Scam (Telegram Ring)', category: 'Financial Fraud', severity: 'High', source: 'State Cyber Cell', verifiedAt: '3 days ago', description: 'Victims lured into review tasks with frozen withdrawal balances. ₹4.2 Crores blocked in mule accounts.' }
];

export const DigitalSafetyPage: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState('');

  return (
    <div className="relative min-h-[90vh] w-full overflow-hidden">
      {/* Indian Cyber Command Center Background - Vivid & Atmospheric */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/digital-safety-bg.jpg"
          alt="NCSC India Cyber Command Center"
          className="w-full h-full object-cover object-center opacity-85 dark:opacity-80 brightness-95 contrast-115"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/60 via-paper/75 to-paper/95 dark:from-ink/60 via-ink/75 to-ink/95" />
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-hairline border-paper-border dark:border-ink-border">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#4C5BD4] uppercase tracking-widest mb-2">
              <ShieldAlert className="w-4 h-4" />
              <span>Pillar 04 • National Digital Vigilance</span>
              <span className="px-1.5 py-0.5 rounded font-mono font-bold bg-signalred/15 text-signalred text-[10px] border border-signalred/30">
                DEMO DATA
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-ink dark:text-paper tracking-tight">
              Cyber Threat Advisories & Fraud Defense
            </h1>
            <p className="font-sans text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl">
              Live syndication of verified cyber crime alerts, malicious APK indicators, and rapid
              financial lien triage via National Helpline 1930.
            </p>
          </div>

          <a
            href="tel:1930"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-signalred hover:bg-signalred/90 text-white font-mono text-xs font-bold shadow-lg shadow-red-900/30"
          >
            <PhoneCall className="w-4 h-4 animate-bounce" />
            <span>Call 1930 Emergency Helpline</span>
          </a>
        </div>

        {/* Advisories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="p-6 rounded-2xl bg-paper-card/90 dark:bg-ink-card/90 border border-hairline border-paper-border dark:border-ink-border font-mono backdrop-blur-md shadow-lg">
            <span className="text-xs uppercase text-neutral-400 block mb-1">National Cyber Recovery Rate</span>
            <div className="font-serif text-3xl font-bold text-indiagreen">74.2%</div>
            <div className="text-[11px] text-neutral-500 mt-1">When reported within golden hour (&lt;2h)</div>
          </div>
          <div className="p-6 rounded-2xl bg-paper-card/90 dark:bg-ink-card/90 border border-hairline border-paper-border dark:border-ink-border font-mono backdrop-blur-md shadow-lg">
            <span className="text-xs uppercase text-neutral-400 block mb-1">Mule Accounts Frozen</span>
            <div className="font-serif text-3xl font-bold text-[#4C5BD4]">148,000+</div>
            <div className="text-[11px] text-neutral-500 mt-1">Inter-bank coordination via CFCFRMS</div>
          </div>
          <div className="p-6 rounded-2xl bg-paper-card/90 dark:bg-ink-card/90 border border-hairline border-paper-border dark:border-ink-border font-mono backdrop-blur-md shadow-lg">
            <span className="text-xs uppercase text-neutral-400 block mb-1">Active Phishing Advisories</span>
            <div className="font-serif text-3xl font-bold text-ink dark:text-paper">42 Live</div>
            <div className="text-[11px] text-neutral-500 mt-1">Verified with CERT-In and Police I4C</div>
          </div>
        </div>

        {/* List of Verified Advisories */}
        <div className="rounded-2xl border border-hairline border-paper-border dark:border-ink-border bg-paper-card/90 dark:bg-ink-card/90 p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-paper-border dark:border-ink-border">
            <h3 className="font-serif text-xl font-bold text-ink dark:text-paper">
              Current Verified Threat Bulletins
            </h3>
            <span className="font-mono text-xs text-neutral-500">Official Government Ingestion</span>
          </div>

          <div className="space-y-4">
            {DEMO_ADVISORIES.map((adv) => (
              <div
                key={adv.id}
                className="p-5 rounded-xl bg-paper dark:bg-ink border border-hairline border-paper-border dark:border-ink-border font-mono space-y-2 hover:border-[#4C5BD4]/50 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#4C5BD4]">{adv.id}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-signalred/15 text-signalred font-bold uppercase border border-signalred/30">
                      {adv.severity}
                    </span>
                    <span className="text-[11px] text-neutral-500 font-sans">Source: {adv.source}</span>
                  </div>
                  <span className="text-[11px] text-neutral-400">{adv.verifiedAt}</span>
                </div>

                <h4 className="font-sans font-bold text-base text-ink dark:text-paper">{adv.title}</h4>
                <p className="font-sans text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {adv.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
