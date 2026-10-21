import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INDIA_STATE_TILES, PILLAR_METADATA, PillarType, StateTile } from '@surakshit-bharat/shared';
import { Shield, Info, ArrowUpRight, CheckCircle2, AlertOctagon } from 'lucide-react';

interface SafetyGridCartogramProps {
  selectedPillar: PillarType | 'all';
  onSelectPillar: (pillar: PillarType | 'all') => void;
  onSelectTile?: (tile: StateTile) => void;
}

export const SafetyGridCartogram: React.FC<SafetyGridCartogramProps> = ({
  selectedPillar,
  onSelectPillar,
  onSelectTile
}) => {
  const [hoveredTile, setHoveredTile] = useState<StateTile | null>(null);

  // Helper to calculate fill color based on selected pillar and score
  const getTileColor = (tile: StateTile) => {
    if (tile.hasInsufficientData) {
      return 'bg-hatch border-neutral-400/40 text-neutral-400 dark:text-neutral-500';
    }

    let score = tile.safetyScore;
    if (selectedPillar !== 'all') {
      const pScore = tile.pillarScores[selectedPillar];
      if (pScore === null) {
        return 'bg-hatch border-neutral-400/40 text-neutral-400 dark:text-neutral-500';
      }
      score = pScore;
    }

    // Dynamic color ramp based on pillar or composite
    if (selectedPillar === 'community') {
      return score >= 85
        ? 'bg-[#FF8A1F]/30 border-[#FF8A1F] text-[#FF8A1F] hover:bg-[#FF8A1F]/45'
        : score >= 75
        ? 'bg-[#FF8A1F]/20 border-[#FF8A1F]/70 text-[#FF8A1F]'
        : 'bg-[#FF8A1F]/10 border-[#FF8A1F]/40 text-neutral-300';
    }

    if (selectedPillar === 'manufacturing') {
      return score >= 85
        ? 'bg-[#0F9D8A]/30 border-[#0F9D8A] text-[#0F9D8A] hover:bg-[#0F9D8A]/45'
        : score >= 75
        ? 'bg-[#0F9D8A]/20 border-[#0F9D8A]/70 text-[#0F9D8A]'
        : 'bg-[#0F9D8A]/10 border-[#0F9D8A]/40 text-neutral-300';
    }

    if (selectedPillar === 'transport') {
      return score >= 85
        ? 'bg-[#F2B705]/30 border-[#F2B705] text-[#F2B705] hover:bg-[#F2B705]/45'
        : score >= 75
        ? 'bg-[#F2B705]/20 border-[#F2B705]/70 text-[#F2B705]'
        : 'bg-[#F2B705]/10 border-[#F2B705]/40 text-neutral-300';
    }

    if (selectedPillar === 'digital') {
      return score >= 85
        ? 'bg-[#4C5BD4]/30 border-[#4C5BD4] text-[#4C5BD4] hover:bg-[#4C5BD4]/45'
        : score >= 75
        ? 'bg-[#4C5BD4]/20 border-[#4C5BD4]/70 text-[#4C5BD4]'
        : 'bg-[#4C5BD4]/10 border-[#4C5BD4]/40 text-neutral-300';
    }

    // All pillars composite
    if (score >= 85) {
      return 'bg-indiagreen/20 border-indiagreen/80 text-indiagreen dark:text-green-400 hover:bg-indiagreen/30';
    }
    if (score >= 75) {
      return 'bg-saffron/20 border-saffron/80 text-saffron hover:bg-saffron/30';
    }
    return 'bg-signalred/15 border-signalred/60 text-signalred hover:bg-signalred/25';
  };

  const getScoreDisplay = (tile: StateTile) => {
    if (tile.hasInsufficientData) return 'N/A';
    if (selectedPillar === 'all') return `${tile.safetyScore}`;
    const pScore = tile.pillarScores[selectedPillar];
    return pScore !== null ? `${pScore}` : 'N/A';
  };

  return (
    <div className="relative w-full rounded-2xl bg-paper-card/90 dark:bg-ink-card/90 border border-hairline border-paper-border dark:border-ink-border p-4 sm:p-6 shadow-xl backdrop-blur-sm">
      {/* Control Bar: Pillar Selectors + Legend */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-hairline border-paper-border dark:border-ink-border">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-saffron/15 border border-saffron/30 text-saffron">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-ink dark:text-paper uppercase font-mono">
              The Safety Grid™ Cartogram
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Topological state & UT density mesh • Hover cell for telemetry
            </p>
          </div>
        </div>

        {/* Pillar Toggle Buttons */}
        <div className="flex items-center flex-wrap gap-1.5 p-1 rounded-xl bg-paper-muted/60 dark:bg-ink-muted/80 border border-paper-border dark:border-ink-border text-xs font-mono">
          <button
            onClick={() => onSelectPillar('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedPillar === 'all'
                ? 'bg-ink text-paper dark:bg-paper dark:text-ink font-bold shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-ink dark:hover:text-paper'
            }`}
          >
            Composite (All)
          </button>
          <button
            onClick={() => onSelectPillar('community')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedPillar === 'community'
                ? 'bg-[#FF8A1F] text-ink font-bold shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-[#FF8A1F]'
            }`}
          >
            Community
          </button>
          <button
            onClick={() => onSelectPillar('manufacturing')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedPillar === 'manufacturing'
                ? 'bg-[#0F9D8A] text-white font-bold shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-[#0F9D8A]'
            }`}
          >
            Manufacturing
          </button>
          <button
            onClick={() => onSelectPillar('transport')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedPillar === 'transport'
                ? 'bg-[#F2B705] text-ink font-bold shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-[#F2B705]'
            }`}
          >
            Transport
          </button>
          <button
            onClick={() => onSelectPillar('digital')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedPillar === 'digital'
                ? 'bg-[#4C5BD4] text-white font-bold shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-[#4C5BD4]'
            }`}
          >
            Digital
          </button>
        </div>
      </div>

      {/* Cartogram Grid Matrix */}
      <div className="py-6 flex justify-center overflow-x-auto">
        <div
          className="grid grid-cols-8 gap-2 sm:gap-2.5 p-2 min-w-[340px] max-w-[620px]"
          style={{ gridTemplateRows: 'repeat(9, minmax(0, 1fr))' }}
        >
          {INDIA_STATE_TILES.map((tile) => {
            const isHovered = hoveredTile?.code === tile.code;
            return (
              <motion.div
                key={tile.code}
                style={{
                  gridRowStart: tile.row + 1,
                  gridColumnStart: tile.col + 1
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: (tile.row * 8 + tile.col) * 0.012 }}
                whileHover={{ scale: 1.08, zIndex: 30 }}
                onMouseEnter={() => setHoveredTile(tile)}
                onMouseLeave={() => setHoveredTile(null)}
                onClick={() => onSelectTile?.(tile)}
                className={`relative aspect-square rounded-lg border flex flex-col items-center justify-center p-1 cursor-pointer transition-colors shadow-sm select-none ${getTileColor(
                  tile
                )}`}
              >
                <span className="font-mono font-bold text-[11px] sm:text-xs leading-none tracking-tight">
                  {tile.code}
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] mt-0.5 opacity-85 font-semibold">
                  {getScoreDisplay(tile)}
                </span>

                {/* Insufficient data indicator dot */}
                {tile.hasInsufficientData && (
                  <span
                    title="Insufficient coverage (<60%)"
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-neutral-400 dark:bg-neutral-600 rounded-full border border-paper dark:border-ink"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Tooltip & Details Inspector Drawer */}
      <div className="mt-2 pt-4 border-t border-hairline border-paper-border dark:border-ink-border">
        {hoveredTile ? (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border font-mono"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-saffron/15 border border-saffron/30 flex items-center justify-center text-saffron font-bold text-sm">
                {hoveredTile.code}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-ink dark:text-paper font-sans">
                    {hoveredTile.name}
                  </h4>
                  <span className="text-[11px] text-neutral-500">
                    ({hoveredTile.districtCount} Districts)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  <span>Coverage: {hoveredTile.coveragePercent}%</span>
                  <span>•</span>
                  <span>Active Reports: {hoveredTile.activeReportsCount}</span>
                  <span>•</span>
                  <span>Resolved: {hoveredTile.resolvedReportsCount}</span>
                </div>
              </div>
            </div>

            {/* Sub-pillar indicators */}
            <div className="flex items-center gap-3 text-xs w-full sm:w-auto justify-between sm:justify-end">
              <div className="text-center">
                <span className="text-[10px] text-neutral-400 uppercase block">Community</span>
                <span className="font-bold text-[#FF8A1F]">
                  {hoveredTile.pillarScores.community ?? 'N/A'}
                </span>
              </div>
              <div className="text-center">
                <span className="text-[10px] text-neutral-400 uppercase block">Mfg</span>
                <span className="font-bold text-[#0F9D8A]">
                  {hoveredTile.pillarScores.manufacturing ?? 'N/A'}
                </span>
              </div>
              <div className="text-center">
                <span className="text-[10px] text-neutral-400 uppercase block">Transport</span>
                <span className="font-bold text-[#F2B705]">
                  {hoveredTile.pillarScores.transport ?? 'N/A'}
                </span>
              </div>
              <div className="text-center">
                <span className="text-[10px] text-neutral-400 uppercase block">Digital</span>
                <span className="font-bold text-[#4C5BD4]">
                  {hoveredTile.pillarScores.digital ?? 'N/A'}
                </span>
              </div>
              <div className="pl-2 border-l border-paper-border dark:border-ink-border text-center">
                <span className="text-[10px] text-neutral-400 uppercase block">Index</span>
                <span className="font-bold text-sm text-ink dark:text-paper">
                  {hoveredTile.hasInsufficientData ? 'NO DATA' : hoveredTile.safetyScore}
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 font-mono px-2 py-1">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-saffron" />
              Hover any state cell to inspect telemetry and pillar sub-scores
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-indiagreen/70 inline-block"></span> 85+ High
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-saffron/70 inline-block"></span> 75-84 Moderate
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-signalred/70 inline-block"></span> &lt;75 Alert
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-hatch border border-neutral-400 inline-block"></span> Insufficient Data
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
