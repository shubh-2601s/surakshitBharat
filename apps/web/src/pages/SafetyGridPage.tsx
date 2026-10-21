import React, { useState, useMemo } from 'react';
import { SafetyGridCartogram } from '../components/hero/SafetyGridCartogram';
import { INDIA_STATE_TILES, PillarType, StateTile, PILLAR_METADATA } from '@surakshit-bharat/shared';
import {
  Search,
  Table as TableIcon,
  Grid as GridIcon,
  ArrowUpDown,
  Info,
  Download,
  Plus,
  X,
  TrendingUp,
  SlidersHorizontal,
  Layers,
  FileSpreadsheet,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const SafetyGridPage: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<PillarType | 'all'>('all');
  const [viewMode, setViewMode] = useState<'cartogram' | 'table'>('cartogram');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'score' | 'coverage'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Phase 2: Multi-district Comparison (up to 4 states/districts)
  const [comparedCodes, setComparedCodes] = useState<string[]>(['DL', 'MH', 'KA']);
  // Phase 2: Time Range Selector for Historical Trends
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

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

  const comparedTiles = useMemo(() => {
    return INDIA_STATE_TILES.filter((t) => comparedCodes.includes(t.code));
  }, [comparedCodes]);

  const toggleComparison = (code: string) => {
    if (comparedCodes.includes(code)) {
      setComparedCodes(comparedCodes.filter((c) => c !== code));
    } else {
      if (comparedCodes.length >= 4) {
        alert('You can compare a maximum of 4 states/districts side by side.');
        return;
      }
      setComparedCodes([...comparedCodes, code]);
    }
  };

  // Phase 2: CSV Export Functionality
  const exportToCsv = () => {
    const headers = [
      'Code',
      'Name',
      'Districts',
      'Community Score',
      'Manufacturing Score',
      'Transport Score',
      'Digital Score',
      'Coverage Percent',
      'Safety Index',
      'Status'
    ];

    const rows = INDIA_STATE_TILES.map((t) => [
      t.code,
      `"${t.name}"`,
      t.districtCount,
      t.pillarScores.community ?? 'N/A',
      t.pillarScores.manufacturing ?? 'N/A',
      t.pillarScores.transport ?? 'N/A',
      t.pillarScores.digital ?? 'N/A',
      `${t.coveragePercent}%`,
      t.hasInsufficientData ? 'INSUFFICIENT DATA' : t.safetyScore,
      t.hasInsufficientData ? 'INCOMPLETE (<60%)' : 'VALIDATED'
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `surakshit_bharat_safety_grid_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-[90vh] w-full overflow-hidden">
      {/* Background Indian Landmark: Central Secretariat & Sandstone Colonnade - Fixed Viewport Backdrop */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/secretariat-bg.jpg"
          alt="Central Secretariat New Delhi"
          className="w-full h-full object-cover object-center opacity-85 dark:opacity-80 brightness-100 contrast-115"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/60 via-paper/75 to-paper/95 dark:from-ink/65 via-ink/75 to-ink/95" />
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-hairline border-white/20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink/80 border border-saffron/40 font-mono text-xs text-saffron uppercase tracking-wider mb-3 backdrop-blur-md shadow-md">
              <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
              <span className="font-semibold">Phase 2 • Telemetry Grid & Analytical Benchmarking</span>
              <span className="px-1.5 py-0.5 rounded font-mono font-bold bg-signalred/20 text-red-300 text-[10px] border border-signalred/40 ml-1">
                DEMO DATA
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-md leading-tight">
              The Safety Grid<span className="text-saffron">™</span> District & State Index
            </h1>
            <p className="font-sans text-sm sm:text-base text-neutral-200 mt-2 max-w-2xl leading-relaxed drop-shadow">
              Normalized civic telemetry mesh across 36 States & UTs. View via interactive topological
              cartogram, high-density accessible data table, or multi-district comparative radar.
            </p>
          </div>

          {/* View mode toggle + CSV Export */}
          <div className="flex items-center flex-wrap gap-2 font-mono text-xs">
            <div className="flex items-center p-1 rounded-xl bg-ink/85 border border-white/20 shadow-md backdrop-blur-md">
              <button
                onClick={() => setViewMode('cartogram')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all ${
                  viewMode === 'cartogram'
                    ? 'bg-saffron text-ink font-bold shadow-md'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                <GridIcon className="w-3.5 h-3.5" />
                <span>Cartogram</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all ${
                  viewMode === 'table'
                    ? 'bg-saffron text-ink font-bold shadow-md'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Table View</span>
              </button>
            </div>

            <button
              onClick={exportToCsv}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-ink/85 border border-white/20 text-neutral-200 hover:border-saffron hover:text-saffron transition-all font-mono text-xs shadow-md backdrop-blur-md"
              title="Export approved aggregate data to CSV"
            >
              <Download className="w-3.5 h-3.5 text-saffron" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

      {/* Cartogram / Table View Display */}
      {viewMode === 'cartogram' ? (
        <div className="space-y-6">
          <SafetyGridCartogram
            selectedPillar={selectedPillar}
            onSelectPillar={setSelectedPillar}
            onSelectTile={(tile) => toggleComparison(tile.code)}
          />
        </div>
      ) : (
        /* Accessible Sortable Table View */
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 font-mono text-xs">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search state, territory code or district..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border text-ink dark:text-paper focus:outline-none focus:border-saffron"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-neutral-500">Sort:</span>
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

          <div className="overflow-x-auto rounded-2xl border border-hairline border-paper-border dark:border-ink-border bg-paper-card dark:bg-ink-card shadow-sm">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-paper-muted/80 dark:bg-ink-muted/80 text-neutral-500 uppercase text-[10px] border-b border-paper-border dark:border-ink-border">
                <tr>
                  <th className="p-3.5">Compare</th>
                  <th className="p-3.5">Code</th>
                  <th className="p-3.5">State / Union Territory</th>
                  <th className="p-3.5">Districts</th>
                  <th className="p-3.5 text-center text-[#FF8A1F]">Community</th>
                  <th className="p-3.5 text-center text-[#0F9D8A]">Manufacturing</th>
                  <th className="p-3.5 text-center text-[#F2B705]">Transport</th>
                  <th className="p-3.5 text-center text-[#4C5BD4]">Digital</th>
                  <th className="p-3.5 text-center">Coverage</th>
                  <th className="p-3.5 text-right font-bold">Safety Index</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-paper-border dark:divide-ink-border">
                {filteredTiles.map((tile) => {
                  const isCompared = comparedCodes.includes(tile.code);
                  return (
                    <tr
                      key={tile.code}
                      className="hover:bg-paper/50 dark:hover:bg-ink/50 transition-colors"
                    >
                      <td className="p-3.5">
                        <input
                          type="checkbox"
                          checked={isCompared}
                          onChange={() => toggleComparison(tile.code)}
                          className="rounded accent-saffron cursor-pointer"
                        />
                      </td>
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Phase 2: Multi-District Side-by-Side Comparison Module */}
      <div className="mt-12 pt-10 border-t border-hairline border-paper-border dark:border-ink-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-saffron uppercase tracking-widest mb-1">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Comparative Benchmarking (Up to 4 Regions)</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-ink dark:text-paper">
              Side-by-Side Pillar Dissection
            </h2>
          </div>

          {/* Time range selector */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border font-mono text-xs">
            <span className="text-neutral-400 text-[11px] px-2 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Window:</span>
            </span>
            {(['7d', '30d', '90d', '1y'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-2.5 py-1 rounded-lg uppercase ${
                  timeRange === r
                    ? 'bg-saffron text-ink font-bold shadow-sm'
                    : 'text-neutral-500 hover:text-ink dark:hover:text-paper'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Selected comparison pills */}
        <div className="flex items-center flex-wrap gap-2 mb-6">
          <span className="text-xs font-mono text-neutral-400">Comparing:</span>
          {comparedTiles.map((tile) => (
            <span
              key={tile.code}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper-card dark:bg-ink-card border border-saffron/40 font-mono text-xs font-bold text-ink dark:text-paper"
            >
              <span>{tile.name} ({tile.code})</span>
              <button
                onClick={() => toggleComparison(tile.code)}
                className="hover:text-signalred"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {comparedTiles.length < 4 && (
            <span className="text-[11px] font-mono text-neutral-500">
              (Select up to {4 - comparedTiles.length} more in the grid or table above)
            </span>
          )}
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          {comparedTiles.map((tile) => (
            <div
              key={tile.code}
              className="p-6 rounded-2xl bg-paper-card dark:bg-ink-card border border-hairline border-paper-border dark:border-ink-border shadow-lg space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-paper-border dark:border-ink-border">
                <div>
                  <h3 className="font-serif text-lg font-bold text-ink dark:text-paper font-sans">
                    {tile.name}
                  </h3>
                  <span className="text-[11px] text-neutral-400">
                    {tile.districtCount} Districts Monitored
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-neutral-400 block uppercase">Composite</span>
                  <span className="font-serif text-2xl font-bold text-saffron">
                    {tile.hasInsufficientData ? 'NO DATA' : tile.safetyScore}
                  </span>
                </div>
              </div>

              {/* Sub-Pillar Metric Bars */}
              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-[#FF8A1F] font-bold">Community Safety</span>
                    <span>{tile.pillarScores.community ?? 'N/A'}/100</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-paper dark:bg-ink overflow-hidden border border-paper-border dark:border-ink-border">
                    <div
                      className="h-full bg-[#FF8A1F] rounded-full"
                      style={{ width: `${tile.pillarScores.community || 0}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-[#0F9D8A] font-bold">Local Manufacturing</span>
                    <span>{tile.pillarScores.manufacturing ?? 'N/A'}/100</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-paper dark:bg-ink overflow-hidden border border-paper-border dark:border-ink-border">
                    <div
                      className="h-full bg-[#0F9D8A] rounded-full"
                      style={{ width: `${tile.pillarScores.manufacturing || 0}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-[#F2B705] font-bold">Transport Safety</span>
                    <span>{tile.pillarScores.transport ?? 'N/A'}/100</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-paper dark:bg-ink overflow-hidden border border-paper-border dark:border-ink-border">
                    <div
                      className="h-full bg-[#F2B705] rounded-full"
                      style={{ width: `${tile.pillarScores.transport || 0}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-[#4C5BD4] font-bold">Digital Vigilance</span>
                    <span>{tile.pillarScores.digital ?? 'N/A'}/100</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-paper dark:bg-ink overflow-hidden border border-paper-border dark:border-ink-border">
                    <div
                      className="h-full bg-[#4C5BD4] rounded-full"
                      style={{ width: `${tile.pillarScores.digital || 0}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* District Telemetry Footer */}
              <div className="pt-3 border-t border-paper-border dark:border-ink-border text-[11px] text-neutral-400 flex justify-between">
                <span>Coverage: <strong className="text-ink dark:text-paper">{tile.coveragePercent}%</strong></span>
                <span>Active: <strong className="text-saffron">{tile.activeReportsCount}</strong></span>
                <span>Resolved: <strong className="text-indiagreen">{tile.resolvedReportsCount}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};
