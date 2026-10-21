import React from 'react';
import { motion } from 'framer-motion';
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
    <div className="relative min-h-[90vh] w-full overflow-hidden">
      {/* Background Indian Landmark: Modern National Expressway Corridor - Fixed Viewport Backdrop */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/expressway-hero.jpg"
          alt="Modern Indian National Highway Corridor"
          className="w-full h-full object-cover object-center opacity-85 dark:opacity-80 brightness-95 contrast-115"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/60 via-paper/75 to-paper/95 dark:from-ink/60 via-ink/75 to-ink/95" />
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Visual Hero Banner with Indian Expressway Photograph */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-3xl overflow-hidden mb-10 border border-hairline border-paper-border dark:border-ink-border shadow-2xl h-72 sm:h-80 flex items-end group"
        >
          <img
            src="/expressway-hero.jpg"
            alt="Modern Indian National Highway Corridor"
            className="absolute inset-0 w-full h-full object-cover brightness-75 contrast-110 transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
          
          <div className="relative z-10 p-6 sm:p-8 w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2B705]/20 text-[#F2B705] border border-[#F2B705]/40 font-mono text-xs font-bold mb-2 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F2B705] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F2B705]" />
                </span>
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
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-saffron hover:bg-saffron-muted text-ink font-bold font-mono text-xs shadow-md shrink-0 hover:scale-105 transition-all"
            >
              <AlertTriangle className="w-4 h-4 animate-pulse" />
              <span>Report Road Hazard</span>
            </Link>
          </div>
        </motion.div>

        {/* Corridor Table & Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="p-5 rounded-2xl bg-paper-card dark:bg-ink-card border border-hairline border-paper-border dark:border-ink-border font-mono shadow-md"
          >
            <span className="text-[11px] uppercase text-neutral-400 block mb-1">Total Monitored Arterials</span>
            <div className="font-serif text-3xl font-bold text-ink dark:text-paper">44,120 km</div>
            <div className="text-[10px] text-neutral-500 mt-1">Spanning 68 National Corridors</div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="p-5 rounded-2xl bg-paper-card dark:bg-ink-card border border-hairline border-paper-border dark:border-ink-border font-mono shadow-md"
          >
            <span className="text-[11px] uppercase text-neutral-400 block mb-1">Active Road Hazards Logged</span>
            <div className="font-serif text-3xl font-bold text-[#F2B705]">342</div>
            <div className="text-[10px] text-indiagreen mt-1">112 Potholes Resurfaced this week</div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="p-5 rounded-2xl bg-paper-card dark:bg-ink-card border border-hairline border-paper-border dark:border-ink-border font-mono shadow-md"
          >
            <span className="text-[11px] uppercase text-neutral-400 block mb-1">National Avg Ambulance Dispatch</span>
            <div className="font-serif text-3xl font-bold text-ink dark:text-paper">13.8 min</div>
            <div className="text-[10px] text-neutral-500 mt-1">Target: &lt;15 min across rural NH</div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="p-5 rounded-2xl bg-paper-card dark:bg-ink-card border border-hairline border-paper-border dark:border-ink-border font-mono shadow-md"
          >
            <span className="text-[11px] uppercase text-neutral-400 block mb-1">Remediated Blackspots</span>
            <div className="font-serif text-3xl font-bold text-indiagreen">84%</div>
            <div className="text-[10px] text-neutral-500 mt-1">High-risk accident curves cured</div>
          </motion.div>
        </div>

        {/* Corridors List with Interactive Hover Lift */}
        <div className="rounded-2xl border border-hairline border-paper-border dark:border-ink-border bg-paper-card dark:bg-ink-card p-6 shadow-xl">
          <h3 className="font-serif text-xl font-bold text-ink dark:text-paper mb-4 flex items-center gap-2">
            <span>Priority Monitored Highway Segments</span>
            <span className="text-[10px] px-2 py-0.5 rounded font-mono font-semibold bg-[#F2B705]/15 text-[#F2B705] border border-[#F2B705]/30">
              LIVE TELEMETRY
            </span>
          </h3>

          <div className="space-y-3.5">
            {DEMO_CORRIDORS.map((corridor) => (
              <motion.div
                key={corridor.id}
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="p-4 rounded-xl bg-paper dark:bg-ink border border-hairline border-paper-border dark:border-ink-border font-mono flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#F2B705]/60 hover:shadow-lg transition-all"
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
