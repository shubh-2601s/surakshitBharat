import React from 'react';
import { Car, AlertTriangle, Clock, MapPin, ShieldAlert, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const DEMO_CORRIDORS = [
  { id: 'C-01', name: 'NH-44 Corridor (Delhi-Agra Stretch)', length: '198 km', riskScore: 68, status: 'High Alert', blackspots: 4, avgEms: '12.4 min', district: 'Mathura & Agra, UP' },
  { id: 'C-02', name: 'NH-48 Corridor (Mumbai-Pune Expressway)', length: '94 km', riskScore: 78, status: 'Monitored', blackspots: 1, avgEms: '10.8 min', district: 'Pune & Raigad, MH' },
  { id: 'C-03', name: 'NH-66 Coastal Corridor (Panvel-Goa)', length: '475 km', riskScore: 71, status: 'Active Works', blackspots: 6, avgEms: '18.2 min', district: 'Ratnagiri, MH' },
  { id: 'C-04', name: 'Delhi-Mumbai Expressway (Sohna-Dausa Sector)', length: '246 km', riskScore: 84, status: 'State of Art', blackspots: 0, avgEms: '8.4 min', district: 'Gurugram & Dausa' },
];

export const TransportPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Visual Hero Banner with Indian Expressway Photograph */}
      <div className="relative rounded-3xl overflow-hidden mb-10 border border-hairline border-paper-border dark:border-ink-border shadow-2xl h-72 sm:h-80 flex items-end">
        <img
          src="/expressway-hero.jpg"
          alt="Modern Indian National Highway Corridor"
          className="absolute inset-0 w-full h-full object-cover brightness-75 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        
        <div className="relative z-10 p-6 sm:p-8 w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2B705]/20 text-[#F2B705] border border-[#F2B705]/40 font-mono text-xs font-bold mb-2 backdrop-blur-md">
              <Car className="w-3.5 h-3.5" />
              <span>National Arterial Safety & Telemetry Corridors</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Transport Corridors & Road-Risk Monitoring
            </h1>
            <p className="font-sans text-xs sm:text-sm text-neutral-300 max-w-xl mt-1">
              Live blackspot remediation on Golden Quadrilateral and National Expressways, emergency ambulance dispatch speeds, and surface audit telemetry.
            </p>
          </div>

          <Link
            to="/report/new"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-saffron hover:bg-saffron-muted text-ink font-bold font-mono text-xs shadow-md shrink-0"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Report Road Hazard</span>
          </Link>
        </div>
      </div>

      {/* Corridor Table & Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="p-5 rounded-2xl bg-paper-card dark:bg-ink-card border border-hairline border-paper-border dark:border-ink-border font-mono">
          <span className="text-[11px] uppercase text-neutral-400 block mb-1">Total Monitored Arterials</span>
          <div className="font-serif text-3xl font-bold text-ink dark:text-paper">44,120 km</div>
          <div className="text-[10px] text-neutral-500 mt-1">Spanning 68 National Corridors</div>
        </div>
        <div className="p-5 rounded-2xl bg-paper-card dark:bg-ink-card border border-hairline border-paper-border dark:border-ink-border font-mono">
          <span className="text-[11px] uppercase text-neutral-400 block mb-1">Active Road Hazards Logged</span>
          <div className="font-serif text-3xl font-bold text-[#F2B705]">342</div>
          <div className="text-[10px] text-indiagreen mt-1">112 Potholes Resurfaced this week</div>
        </div>
        <div className="p-5 rounded-2xl bg-paper-card dark:bg-ink-card border border-hairline border-paper-border dark:border-ink-border font-mono">
          <span className="text-[11px] uppercase text-neutral-400 block mb-1">National Avg Ambulance Dispatch</span>
          <div className="font-serif text-3xl font-bold text-ink dark:text-paper">13.8 min</div>
          <div className="text-[10px] text-neutral-500 mt-1">Target: &lt;15 min across rural NH</div>
        </div>
        <div className="p-5 rounded-2xl bg-paper-card dark:bg-ink-card border border-hairline border-paper-border dark:border-ink-border font-mono">
          <span className="text-[11px] uppercase text-neutral-400 block mb-1">Remediated Blackspots</span>
          <div className="font-serif text-3xl font-bold text-indiagreen">84%</div>
          <div className="text-[10px] text-neutral-500 mt-1">High-risk accident curves cured</div>
        </div>
      </div>

      {/* Corridors List */}
      <div className="rounded-2xl border border-hairline border-paper-border dark:border-ink-border bg-paper-card dark:bg-ink-card p-6 shadow-sm">
        <h3 className="font-serif text-xl font-bold text-ink dark:text-paper mb-4">
          Priority Monitored Highway Segments
        </h3>

        <div className="space-y-4">
          {DEMO_CORRIDORS.map((corridor) => (
            <div
              key={corridor.id}
              className="p-4 rounded-xl bg-paper dark:bg-ink border border-hairline border-paper-border dark:border-ink-border font-mono flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-saffron text-sm">{corridor.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#F2B705]/15 text-[#F2B705] border border-[#F2B705]/30">
                    {corridor.status}
                  </span>
                </div>
                <div className="text-xs text-neutral-500 mt-1 font-sans flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  <span>District: {corridor.district}</span>
                  <span>•</span>
                  <span>Length: {corridor.length}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs">
                <div>
                  <span className="text-[10px] text-neutral-400 block uppercase">Blackspots</span>
                  <span className="font-bold text-signalred">{corridor.blackspots} Stretches</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block uppercase">Avg EMS</span>
                  <span className="font-bold text-ink dark:text-paper">{corridor.avgEms}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-neutral-400 block uppercase">Risk Score</span>
                  <span className="font-bold text-base text-[#F2B705]">{corridor.riskScore}/100</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
