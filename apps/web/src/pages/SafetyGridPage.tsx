import React, { useState, useMemo } from 'react';
import { SafetyGridCartogram } from '../components/hero/SafetyGridCartogram';
import { INDIA_STATE_TILES, PillarType, StateTile } from '@surakshit-bharat/shared';
import { Search, Table as TableIcon, Grid as GridIcon, Filter, Download, ArrowUpDown, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SafetyGridPage: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<PillarType | 'all'>('all');
  const [viewMode, setViewMode] = useState<'cartogram' | 'table'>('cartogram');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'score' | 'coverage'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredTiles = useMemo(() => {
    return INDIA_STATE_TILES.filter((tile) =>
      tile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tile.code.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'score') {
        comparison = a.safetyScore - b.safetyScore;
      } else if (sortBy === 'coverage') {
        comparison = a.coveragePercent - b.coveragePercent;
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });
  }, [searchQuery, sortBy, sortOrder]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-hairline border-paper-border dark:border-ink-border">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-saffron uppercase tracking-widest mb-2">
            <span className="w-2 h-2 rounded-full bg-saffron" />
            <span>National Telemetry Console</span>
            <span className="px-1.5 py-0.5 rounded font-mono font-bold bg-signalred/15 text-signalred text-[10px] border border-signalred/30">
              DEMO DATA
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-ink dark:text-paper tracking-tight">
            The Safety Grid™ District & State Index
          </h1>
          <p className="font-sans text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl">
            Normalized civic telemetry mesh across 36 States & UTs. View via interactive cartogram
            or high-density accessible data table.
          </p>
        </div>

        {/* View mode toggle (Cartogram vs Table) & Export */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="flex items-center p-1 rounded-xl bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border">
            <button
              onClick={() => setViewMode('cartogram')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'cartogram'
                  ? 'bg-saffron text-ink font-bold shadow-sm'
                  : 'text-neutral-500 hover:text-ink dark:hover:text-paper'
              }`}
            >
              <GridIcon className="w-3.5 h-3.5" />
              <span>Cartogram</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'table'
                  ? 'bg-saffron text-ink font-bold shadow-sm'
                  : 'text-neutral-500 hover:text-ink dark:hover:text-paper'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table View</span>
            </button>
          </div>

          <Link
            to="/methodology"
            className="px-3 py-2 rounded-xl bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border text-neutral-600 dark:text-neutral-300 hover:text-saffron transition-all"
          >
            Methodology
          </Link>
        </div>
      </div>

      {/* Render Cartogram View */}
      {viewMode === 'cartogram' && (
        <div className="space-y-6">
          <SafetyGridCartogram
            selectedPillar={selectedPillar}
            onSelectPillar={setSelectedPillar}
          />
          <div className="p-4 rounded-xl bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border font-mono text-xs flex items-center justify-between">
            <span className="flex items-center gap-2 text-neutral-500">
              <Info className="w-4 h-4 text-saffron" />
              States with hatch pattern lack the required 60% coverage across all 4 pillars.
            </span>
            <button
              onClick={() => setViewMode('table')}
              className="text-saffron hover:underline font-bold"
            >
              Switch to sortable table view &rarr;
            </button>
          </div>
        </div>
      )}

      {/* Render Accessible Sortable Table View */}
      {viewMode === 'table' && (
        <div className="space-y-4">
          {/* Table Search & Sort Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 font-mono text-xs">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search state or territory code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border text-ink dark:text-paper focus:outline-none focus:border-saffron"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-neutral-500">Sort by:</span>
              <button
                onClick={() => {
                  if (sortBy === 'score') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  else { setSortBy('score'); setSortOrder('desc'); }
                }}
                className={`px-3 py-1.5 rounded-lg border flex items-center gap-1 ${
                  sortBy === 'score'
                    ? 'border-saffron text-saffron font-bold'
                    : 'border-paper-border dark:border-ink-border text-neutral-500'
                }`}
              >
                <span>Score</span>
                <ArrowUpDown className="w-3 h-3" />
              </button>
              <button
                onClick={() => {
                  if (sortBy === 'coverage') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  else { setSortBy('coverage'); setSortOrder('desc'); }
                }}
                className={`px-3 py-1.5 rounded-lg border flex items-center gap-1 ${
                  sortBy === 'coverage'
                    ? 'border-saffron text-saffron font-bold'
                    : 'border-paper-border dark:border-ink-border text-neutral-500'
                }`}
              >
                <span>Coverage %</span>
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-hairline border-paper-border dark:border-ink-border bg-paper-card dark:bg-ink-card shadow-sm">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-paper-muted/80 dark:bg-ink-muted/80 text-neutral-500 uppercase text-[10px] border-b border-paper-border dark:border-ink-border">
                <tr>
                  <th className="p-3.5">Code</th>
                  <th className="p-3.5">State / Union Territory</th>
                  <th className="p-3.5">Districts</th>
                  <th className="p-3.5 text-center text-[#FF8A1F]">Community</th>
                  <th className="p-3.5 text-center text-[#0F9D8A]">Manufacturing</th>
                  <th className="p-3.5 text-center text-[#F2B705]">Transport</th>
                  <th className="p-3.5 text-center text-[#4C5BD4]">Digital</th>
                  <th className="p-3.5 text-center">Data Coverage</th>
                  <th className="p-3.5 text-right font-bold">Safety Index</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-paper-border dark:divide-ink-border">
                {filteredTiles.map((tile) => (
                  <tr
                    key={tile.code}
                    className="hover:bg-paper/50 dark:hover:bg-ink/50 transition-colors"
                  >
                    <td className="p-3.5 font-bold text-saffron">{tile.code}</td>
                    <td className="p-3.5 font-sans font-semibold text-ink dark:text-paper">
                      {tile.name}
                    </td>
                    <td className="p-3.5 text-neutral-500">{tile.districtCount}</td>
                    <td className="p-3.5 text-center font-bold text-[#FF8A1F]">
                      {tile.pillarScores.community ?? '—'}
                    </td>
                    <td className="p-3.5 text-center font-bold text-[#0F9D8A]">
                      {tile.pillarScores.manufacturing ?? '—'}
                    </td>
                    <td className="p-3.5 text-center font-bold text-[#F2B705]">
                      {tile.pillarScores.transport ?? '—'}
                    </td>
                    <td className="p-3.5 text-center font-bold text-[#4C5BD4]">
                      {tile.pillarScores.digital ?? '—'}
                    </td>
                    <td className="p-3.5 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] ${
                          tile.coveragePercent >= 80
                            ? 'bg-indiagreen/15 text-indiagreen'
                            : 'bg-signalred/15 text-signalred'
                        }`}
                      >
                        {tile.coveragePercent}%
                      </span>
                    </td>
                    <td className="p-3.5 text-right font-bold text-sm">
                      {tile.hasInsufficientData ? (
                        <span className="px-2 py-0.5 rounded bg-hatch border border-neutral-400 text-neutral-400 text-[10px]">
                          NO DATA (&lt;60%)
                        </span>
                      ) : (
                        <span className="font-serif text-base text-ink dark:text-paper">
                          {tile.safetyScore}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
