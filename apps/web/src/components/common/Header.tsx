import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sun, Moon, Globe, AlertTriangle, ArrowRight, ShieldCheck, Activity, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage, Language } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { DEMO_RESOLVED_TICKER } from '@surakshit-bharat/shared';

export const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { profile, isAuthenticated, signOut, role } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-hairline border-paper-border dark:border-ink-border bg-paper/90 dark:bg-ink/90 backdrop-blur-md transition-colors">
      {/* Top Ticker Bar with Live-feeling Demo Events */}
      <div className="w-full bg-paper-muted/60 dark:bg-ink-muted/80 border-b border-hairline border-paper-border dark:border-ink-border py-1.5 px-4 text-xs font-mono overflow-hidden flex items-center justify-between">
        <div className="flex items-center gap-2 shrink-0 pr-4">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-saffron"></span>
          </span>
          <span className="font-semibold text-saffron uppercase tracking-wider text-[11px]">LIVE PILOT FEED</span>
          <span className="px-1.5 py-0.5 rounded bg-signalred/15 text-signalred dark:text-red-400 font-bold text-[10px] tracking-widest border border-signalred/30">
            DEMO DATA
          </span>
        </div>

        {/* Marquee ticker */}
        <div className="overflow-hidden whitespace-nowrap flex-1 hidden md:block">
          <div className="inline-flex animate-[marquee_25s_linear_infinite] gap-8 text-neutral-600 dark:text-neutral-300">
            {DEMO_RESOLVED_TICKER.map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-1.5 text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-indiagreen inline" />
                <span className="text-saffron font-bold">{item.ref}</span>: {item.title}
                <span className="text-neutral-400 dark:text-neutral-500 font-sans">({item.district})</span>
                <span className="text-[10px] text-neutral-400">• {item.timeAgo}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 pl-4 font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
          <span>STATUS: <strong className="text-indiagreen">OPERATIONAL</strong></span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">CYCLE: 2026-Q4</span>
        </div>
      </div>

      {/* Primary Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & National Tagline */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-navy to-ink dark:from-navy-surface dark:to-ink-card p-2 border border-hairline border-saffron/40 flex items-center justify-center shadow-sm group-hover:border-saffron transition-all">
            <Shield className="w-6 h-6 text-saffron" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-ink dark:text-paper">
                Surakshit Bharat
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold bg-saffron/15 text-saffron border border-saffron/30">
                IN-PILOT
              </span>
            </div>
            <span className="text-[10.5px] font-mono tracking-wider uppercase text-neutral-500 dark:text-neutral-400 -mt-0.5">
              {t.tagline}
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <Link
            to="/safety-grid"
            className="text-neutral-700 dark:text-neutral-200 hover:text-saffron dark:hover:text-saffron transition-colors flex items-center gap-1.5"
          >
            <Activity className="w-4 h-4 text-saffron" />
            <span>{t.safetyGrid}</span>
          </Link>
          <Link
            to="/manufacturers"
            className="text-neutral-700 dark:text-neutral-200 hover:text-pillar-manufacturing dark:hover:text-pillar-manufacturing transition-colors"
          >
            {t.manufacturers}
          </Link>
          <Link
            to="/transport"
            className="text-neutral-700 dark:text-neutral-200 hover:text-pillar-transport dark:hover:text-pillar-transport transition-colors"
          >
            {t.transportSafety}
          </Link>
          <Link
            to="/digital-safety"
            className="text-neutral-700 dark:text-neutral-200 hover:text-pillar-digital dark:hover:text-pillar-digital transition-colors"
          >
            {t.digitalSafety}
          </Link>
          <Link
            to="/methodology"
            className="text-neutral-500 dark:text-neutral-400 hover:text-ink dark:hover:text-paper transition-colors font-mono text-xs"
          >
            {t.methodology}
          </Link>
        </nav>

        {/* Action Controls: Language, Theme, Auth / Dashboard */}
        <div className="flex items-center gap-3">
          {/* Enhanced Multi-Lingual Selector */}
          <div className="relative group">
            <button
              aria-label="Language selector"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono border border-paper-border dark:border-ink-border text-neutral-700 dark:text-neutral-300 hover:bg-paper-muted dark:hover:bg-ink-muted transition-colors shadow-sm"
            >
              <Globe className="w-3.5 h-3.5 text-saffron" />
              <span className="uppercase font-bold">
                {language === 'en' ? 'EN' : language === 'hi' ? 'HI हिन्दी' : 'TA தமிழ்'}
              </span>
            </button>
            <div className="absolute right-0 mt-1 hidden group-hover:flex flex-col w-36 bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border rounded-xl shadow-2xl p-1 text-xs font-mono z-50">
              <button
                onClick={() => setLanguage('en')}
                className={`text-left px-3 py-2 rounded-lg hover:bg-saffron/15 transition-colors flex items-center justify-between ${
                  language === 'en' ? 'font-bold text-saffron bg-saffron/10' : 'text-neutral-700 dark:text-neutral-300'
                }`}
              >
                <span>English</span>
                <span className="text-[10px] text-neutral-400">EN</span>
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`text-left px-3 py-2 rounded-lg hover:bg-saffron/15 transition-colors flex items-center justify-between ${
                  language === 'hi' ? 'font-bold text-saffron bg-saffron/10' : 'text-neutral-700 dark:text-neutral-300'
                }`}
              >
                <span>हिन्दी</span>
                <span className="text-[10px] text-neutral-400">HI</span>
              </button>
              <button
                onClick={() => setLanguage('ta')}
                className={`text-left px-3 py-2 rounded-lg hover:bg-saffron/15 transition-colors flex items-center justify-between ${
                  language === 'ta' ? 'font-bold text-saffron bg-saffron/10' : 'text-neutral-700 dark:text-neutral-300'
                }`}
              >
                <span>தமிழ்</span>
                <span className="text-[10px] text-neutral-400">TA</span>
              </button>
            </div>
          </div>

          {/* Theme Toggle (Paper vs Control-Room Dark) */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme mode"
            title={isDark ? "Switch to Editorial Paper mode" : "Switch to Control-Room Dark mode"}
            className="p-2 rounded-lg border border-hairline border-paper-border dark:border-ink-border text-neutral-600 dark:text-neutral-300 hover:text-saffron dark:hover:text-saffron hover:bg-paper-muted dark:hover:bg-ink-muted transition-all"
          >
            {isDark ? <Sun className="w-4 h-4 text-saffron" /> : <Moon className="w-4 h-4 text-navy" />}
          </button>

          {/* Report Hazard Primary CTA */}
          <Link
            to="/report/new"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-saffron hover:bg-saffron-muted text-ink dark:text-ink font-semibold text-xs tracking-tight shadow-sm hover:shadow-control-room transition-all"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{t.reportHazard}</span>
          </Link>

          {/* Auth State: Show Profile / Dashboard or Sign In & Register */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-paper-card dark:bg-ink-card border border-hairline border-saffron/50 text-ink dark:text-paper text-xs font-mono font-bold hover:border-saffron shadow-sm"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-saffron" />
                <span className="hidden sm:inline">{profile?.full_name?.split(' ')[0] || 'Dashboard'}</span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-saffron/20 text-saffron uppercase">
                  {role}
                </span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-hairline border-ink/20 dark:border-paper/20 hover:border-saffron text-ink dark:text-paper text-xs font-medium hover:bg-paper-muted dark:hover:bg-ink-muted transition-all"
              >
                <span>{t.signIn}</span>
              </Link>
              <Link
                to="/register"
                className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-paper-card dark:bg-ink-card border border-saffron/40 text-saffron text-xs font-mono font-bold hover:bg-saffron/10 transition-all"
              >
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
