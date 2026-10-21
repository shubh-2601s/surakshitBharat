import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Shield,
  Sun,
  Moon,
  Globe,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Activity,
  User,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  Bot,
  QrCode,
  Search,
  FileText,
  Factory,
  Truck,
  Lock,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage, Language } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { DEMO_RESOLVED_TICKER } from '@surakshit-bharat/shared';

export const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { profile, isAuthenticated, signOut, role } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Automatically close mobile menu upon route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-hairline border-paper-border dark:border-ink-border bg-paper/95 dark:bg-ink/95 backdrop-blur-md transition-colors">
      {/* Top Ticker Bar with Live-feeling Demo Events */}
      <div className="w-full bg-paper-muted/60 dark:bg-ink-muted/80 border-b border-hairline border-paper-border dark:border-ink-border py-1 px-3 sm:px-4 text-xs font-mono overflow-hidden flex items-center justify-between">
        <div className="flex items-center gap-2 shrink-0 pr-2 sm:pr-4">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-saffron"></span>
          </span>
          <span className="font-semibold text-saffron uppercase tracking-wider text-[10px] sm:text-[11px]">
            LIVE PILOT FEED
          </span>
          <span className="px-1.5 py-0.2 rounded bg-signalred/15 text-signalred dark:text-red-400 font-bold text-[9px] sm:text-[10px] tracking-widest border border-signalred/30">
            DEMO DATA
          </span>
        </div>

        {/* Marquee ticker on desktop/tablet */}
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

        <div className="flex items-center gap-2 sm:gap-3 shrink-0 pl-2 sm:pl-4 font-mono text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400">
          <span>STATUS: <strong className="text-indiagreen">OPERATIONAL</strong></span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">CYCLE: 2026-Q4</span>
        </div>
      </div>

      {/* Primary Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand Logo & National Tagline */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-navy to-ink dark:from-navy-surface dark:to-ink-card p-1.5 sm:p-2 border border-hairline border-saffron/40 flex items-center justify-center shadow-sm group-hover:border-saffron transition-all shrink-0">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-saffron" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-serif font-bold text-lg sm:text-2xl tracking-tight text-ink dark:text-paper leading-tight">
                Surakshit Bharat
              </span>
              <span className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.2 rounded font-mono font-semibold bg-saffron/15 text-saffron border border-saffron/30">
                IN-PILOT
              </span>
            </div>
            <span className="text-[9.5px] sm:text-[10.5px] font-mono tracking-wider uppercase text-neutral-500 dark:text-neutral-400 -mt-0.5 truncate max-w-[160px] sm:max-w-none">
              {t.tagline}
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation Links */}
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

        {/* Action Controls: Language, Theme, Auth, Mobile Menu Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Enhanced Multi-Lingual Selector (Desktop) */}
          <div className="relative group hidden sm:block">
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

          {/* Report Hazard Primary CTA (Desktop / Tablet) */}
          <Link
            to="/report/new"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-saffron hover:bg-saffron-muted text-ink font-semibold text-xs tracking-tight shadow-sm hover:shadow-control-room transition-all"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{t.reportHazard}</span>
          </Link>

          {/* Auth State (Desktop) */}
          {isAuthenticated ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-paper-card dark:bg-ink-card border border-hairline border-saffron/50 text-ink dark:text-paper text-xs font-mono font-bold hover:border-saffron shadow-sm"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-saffron" />
                <span className="hidden md:inline">{profile?.full_name?.split(' ')[0] || 'Dashboard'}</span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-saffron/20 text-saffron uppercase">
                  {role}
                </span>
              </Link>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5">
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

          {/* Mobile Hamburger Navigation Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2 rounded-lg border border-hairline border-paper-border dark:border-ink-border text-neutral-700 dark:text-neutral-200 hover:text-saffron dark:hover:text-saffron hover:bg-paper-muted dark:hover:bg-ink-muted transition-all focus:outline-none focus:ring-2 focus:ring-saffron"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-saffron" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="lg:hidden w-full border-t border-hairline border-paper-border dark:border-ink-border bg-paper/98 dark:bg-ink/98 backdrop-blur-2xl shadow-2xl overflow-y-auto max-h-[calc(100vh-70px)] z-50"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Primary Mobile CTA: Report Hazard */}
              <Link
                to="/report/new"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-saffron via-amber-500 to-amber-600 text-ink font-bold shadow-lg shadow-saffron/20 transition-all active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-black/15 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5 text-ink animate-pulse" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold tracking-tight text-ink">
                      {t.reportHazard}
                    </span>
                    <span className="text-[10px] font-mono opacity-80 uppercase text-ink">
                      Direct Citizen Incident Escalation
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-ink shrink-0" />
              </Link>

              {/* Quick AI & Batch Tools */}
              <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                <Link
                  to="/assistant"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border hover:border-saffron transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-saffron/15 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-saffron" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-ink dark:text-paper truncate">Suraksha AI</span>
                    <span className="text-[10px] text-neutral-500 truncate">National Advisor</span>
                  </div>
                </Link>

                <Link
                  to="/verify"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-paper-card dark:bg-ink-card border border-paper-border dark:border-ink-border hover:border-saffron transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#0F9D8A]/15 flex items-center justify-center shrink-0">
                    <QrCode className="w-4 h-4 text-[#0F9D8A]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-ink dark:text-paper truncate">Verify QR</span>
                    <span className="text-[10px] text-neutral-500 truncate">Batch Lookup</span>
                  </div>
                </Link>
              </div>

              {/* Primary Navigation Links with Category Badges */}
              <div className="border-t border-b border-hairline border-paper-border dark:border-ink-border py-3 space-y-1 font-mono text-xs">
                <div className="px-2 pb-1 text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                  Platform Core Pillars
                </div>

                <Link
                  to="/safety-grid"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-lg text-neutral-800 dark:text-neutral-200 hover:bg-saffron/10 hover:text-saffron transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 text-saffron shrink-0" />
                    <span className="font-semibold">{t.safetyGrid}</span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-saffron/15 text-saffron font-bold">
                    CARTOGRAM
                  </span>
                </Link>

                <Link
                  to="/manufacturers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-lg text-neutral-800 dark:text-neutral-200 hover:bg-teal-500/10 hover:text-teal-400 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Factory className="w-4 h-4 text-[#0F9D8A] shrink-0" />
                    <span className="font-semibold">{t.manufacturers}</span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#0F9D8A]/15 text-[#0F9D8A] font-bold">
                    QC LABS
                  </span>
                </Link>

                <Link
                  to="/transport"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-lg text-neutral-800 dark:text-neutral-200 hover:bg-amber-500/10 hover:text-amber-400 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-[#F2B705] shrink-0" />
                    <span className="font-semibold">{t.transportSafety}</span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#F2B705]/15 text-[#F2B705] font-bold">
                    HIGHWAYS
                  </span>
                </Link>

                <Link
                  to="/digital-safety"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-lg text-neutral-800 dark:text-neutral-200 hover:bg-indigo-500/10 hover:text-indigo-400 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Lock className="w-4 h-4 text-[#4C5BD4] shrink-0" />
                    <span className="font-semibold">{t.digitalSafety}</span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#4C5BD4]/15 text-[#4C5BD4] font-bold">
                    CERT-IN
                  </span>
                </Link>

                <Link
                  to="/reports"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-lg text-neutral-800 dark:text-neutral-200 hover:bg-paper-muted dark:hover:bg-ink-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Search className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span>Track Incident Report</span>
                  </div>
                  <span className="text-[9px] text-neutral-400">REF #</span>
                </Link>

                <Link
                  to="/methodology"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-lg text-neutral-800 dark:text-neutral-200 hover:bg-paper-muted dark:hover:bg-ink-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span>{t.methodology}</span>
                  </div>
                  <span className="text-[9px] text-neutral-400">RUBRIC</span>
                </Link>
              </div>

              {/* Multilingual Selector Touch Pills */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between px-1 text-[11px] font-mono text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-saffron" />
                    <span>Select Language / भाषा</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold text-saffron">
                    {language.toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`py-2 px-2.5 rounded-lg border text-center font-bold transition-all ${
                      language === 'en'
                        ? 'bg-saffron text-ink border-saffron shadow-sm'
                        : 'border-paper-border dark:border-ink-border text-neutral-700 dark:text-neutral-300 bg-paper-card dark:bg-ink-card'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('hi')}
                    className={`py-2 px-2.5 rounded-lg border text-center font-bold transition-all ${
                      language === 'hi'
                        ? 'bg-saffron text-ink border-saffron shadow-sm'
                        : 'border-paper-border dark:border-ink-border text-neutral-700 dark:text-neutral-300 bg-paper-card dark:bg-ink-card'
                    }`}
                  >
                    हिन्दी
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('ta')}
                    className={`py-2 px-2.5 rounded-lg border text-center font-bold transition-all ${
                      language === 'ta'
                        ? 'bg-saffron text-ink border-saffron shadow-sm'
                        : 'border-paper-border dark:border-ink-border text-neutral-700 dark:text-neutral-300 bg-paper-card dark:bg-ink-card'
                    }`}
                  >
                    தமிழ்
                  </button>
                </div>
              </div>

              {/* Mobile Auth / Profile Section */}
              <div className="pt-2">
                {isAuthenticated ? (
                  <div className="p-3.5 rounded-xl bg-paper-card dark:bg-ink-card border border-hairline border-saffron/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-saffron/20 border border-saffron/50 flex items-center justify-center text-saffron font-bold text-xs">
                          {profile?.full_name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-ink dark:text-paper">
                            {profile?.full_name || 'Authorized Officer'}
                          </span>
                          <span className="text-[10px] font-mono text-neutral-400">
                            {profile?.email}
                          </span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-saffron/20 text-saffron uppercase border border-saffron/30">
                        {role}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
                      <Link
                        to="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-saffron text-ink font-bold shadow-sm"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        <span>Dashboard</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          signOut();
                          setMobileMenuOpen(false);
                        }}
                        className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-red-500/40 text-red-500 hover:bg-red-500/10 font-bold"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-paper-border dark:border-ink-border hover:border-saffron text-ink dark:text-paper font-semibold bg-paper-card dark:bg-ink-card transition-all"
                    >
                      <User className="w-3.5 h-3.5 text-saffron" />
                      <span>{t.signIn}</span>
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-saffron/15 border border-saffron/50 text-saffron font-bold hover:bg-saffron/25 transition-all"
                    >
                      <span>{t.register}</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Emergency National Helpline Strip */}
              <div className="pt-2 border-t border-hairline border-paper-border dark:border-ink-border">
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-neutral-400 mb-2">
                  <PhoneCall className="w-3 h-3 text-signalred animate-pulse" />
                  <span>EMERGENCY HELPLINES (TAP TO CALL):</span>
                </div>
                <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
                  <a
                    href="tel:112"
                    className="p-2 rounded-lg bg-signalred/10 border border-signalred/30 text-signalred text-center font-bold"
                  >
                    112 <span className="block text-[9px] font-normal text-neutral-400">All Emergencies</span>
                  </a>
                  <a
                    href="tel:1930"
                    className="p-2 rounded-lg bg-[#4C5BD4]/10 border border-[#4C5BD4]/30 text-[#4C5BD4] text-center font-bold"
                  >
                    1930 <span className="block text-[9px] font-normal text-neutral-400">Cyber Crime</span>
                  </a>
                  <a
                    href="tel:1033"
                    className="p-2 rounded-lg bg-[#F2B705]/10 border border-[#F2B705]/30 text-[#F2B705] text-center font-bold"
                  >
                    1033 <span className="block text-[9px] font-normal text-neutral-400">NHAI Highway</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
