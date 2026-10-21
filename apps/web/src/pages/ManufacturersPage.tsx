import React, { useState } from 'react';
import { Factory, QrCode, CheckCircle, Search, ShieldCheck, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DEMO_MANUFACTURERS = [
  { id: 'MFG-001', name: 'Bharat Heavy Cables & Conductors Ltd', state: 'Maharashtra', bisLicense: 'CM/L-8491201', standard: 'IS 694:2010 (PVC Wires)', status: 'Active & Verified', batchCount: 42, complianceRate: '99.4%' },
  { id: 'MFG-002', name: 'Kaveri Steel Structural Fabricators', state: 'Tamil Nadu', bisLicense: 'CM/L-3921092', standard: 'IS 1786:2008 (TMT Rebars)', status: 'Active & Verified', batchCount: 28, complianceRate: '98.8%' },
  { id: 'MFG-003', name: 'Indus Agro Chemical Formulations', state: 'Gujarat', bisLicense: 'CM/L-5421033', standard: 'IS 8964:2014 (Crop Safety)', status: 'Audit Pending', batchCount: 19, complianceRate: '96.2%' },
  { id: 'MFG-004', name: 'Himalayan Medical Oxygen & Cylinders', state: 'Himachal Pradesh', bisLicense: 'CM/L-7821944', standard: 'IS 7285:2018 (High Pressure Gas)', status: 'Active & Verified', batchCount: 35, complianceRate: '100%' }
];

export const ManufacturersPage: React.FC = () => {
  const [search, setSearch] = useState('');

  const filtered = DEMO_MANUFACTURERS.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.standard.toLowerCase().includes(search.toLowerCase()) ||
    m.state.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-[90vh] w-full overflow-hidden">
      {/* Indian Advanced Certification Lab Background - Fixed Viewport Backdrop */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/manufacturing-bg.jpg"
          alt="Indian Advanced Certification Lab"
          className="w-full h-full object-cover object-center opacity-85 dark:opacity-80 brightness-95 contrast-115"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/60 via-paper/75 to-paper/95 dark:from-ink/60 via-ink/75 to-ink/95" />
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-hairline border-paper-border dark:border-ink-border">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#0F9D8A] uppercase tracking-widest mb-2">
              <Factory className="w-4 h-4" />
              <span>Pillar 02 • National Manufacturing Integrity</span>
              <span className="px-1.5 py-0.5 rounded font-mono font-bold bg-signalred/15 text-signalred text-[10px] border border-signalred/30">
                DEMO DATA
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-ink dark:text-paper tracking-tight">
              Certified Manufacturer Registry & Batch Audits
            </h1>
            <p className="font-sans text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl">
              Public verification registry for standard conformance, BIS licenses, and cryptographic
              QR-scannable batch authenticity.
            </p>
          </div>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F9D8A] hover:bg-[#0F9D8A]/90 text-white font-mono text-xs font-bold shadow-sm"
          >
            <Factory className="w-3.5 h-3.5" />
            <span>Manufacturer Portal</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative max-w-md font-mono text-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search manufacturer, BIS standard (e.g. IS 694)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border text-ink dark:text-paper focus:outline-none focus:border-[#0F9D8A] backdrop-blur-md"
          />
        </div>

        {/* Registry Table */}
        <div className="overflow-x-auto rounded-2xl border border-hairline border-paper-border dark:border-ink-border bg-paper-card/90 dark:bg-ink-card/90 backdrop-blur-md shadow-xl">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-paper-muted/80 dark:bg-ink-muted/80 text-neutral-500 uppercase text-[10px] border-b border-paper-border dark:border-ink-border">
              <tr>
                <th className="p-3.5">Registration ID</th>
                <th className="p-3.5">Manufacturer Name</th>
                <th className="p-3.5">State Base</th>
                <th className="p-3.5">BIS License & Standard</th>
                <th className="p-3.5 text-center">Batch Compliance</th>
                <th className="p-3.5 text-right">Verification Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-paper-border dark:divide-ink-border">
              {filtered.map((mfg) => (
                <tr key={mfg.id} className="hover:bg-paper/50 dark:hover:bg-ink/50 transition-colors">
                  <td className="p-3.5 font-bold text-[#0F9D8A]">{mfg.id}</td>
                  <td className="p-3.5 font-sans font-semibold text-ink dark:text-paper">
                    {mfg.name}
                  </td>
                  <td className="p-3.5 text-neutral-500">{mfg.state}</td>
                  <td className="p-3.5">
                    <div className="font-bold text-ink dark:text-paper">{mfg.standard}</div>
                    <div className="text-[10px] text-neutral-400">{mfg.bisLicense}</div>
                  </td>
                  <td className="p-3.5 text-center font-bold text-indiagreen">
                    {mfg.complianceRate}
                  </td>
                  <td className="p-3.5 text-right">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#0F9D8A]/15 text-[#0F9D8A] border border-[#0F9D8A]/30">
                      <CheckCircle className="w-3 h-3" />
                      <span>{mfg.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
