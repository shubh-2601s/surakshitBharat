import React, { useState, useEffect } from 'react';
import {
  Bot,
  Lock,
  Send,
  ShieldAlert,
  Sparkles,
  MessageSquare,
  AlertCircle,
  Copy,
  RotateCcw,
  Check,
  Clock,
  Zap,
  RefreshCw,
  AlertTriangle,
  Info,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { sendAssistantMessage, ChatMessage } from '../services/gemini';
import {
  checkRateLimit,
  resetRateLimit,
  RateLimitStatus,
  MAX_REQUESTS_PER_MINUTE,
  MAX_REQUESTS_PER_DAY
} from '../services/rateLimiter';
import { ProfessionalMessage } from '../components/assistant/ProfessionalMessage';

export const AssistantPage: React.FC = () => {
  const { user, profile, isAuthenticated, signInAsDemo } = useAuth();
  const userId = profile?.id || user?.id;

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-01',
      role: 'assistant',
      content:
        'Namaste! I am your **Suraksha Assistant**, powered by Gemini AI.\n\n⚡ **Daily Quota:** You have **30 requests available per day** (maximum **2 requests per minute**).\n\nI can look up incident references (e.g. `SB-2026-00412`), explain our 4-pillar Safety Grid scoring weights, or guide you through emergency reporting. Please note all platform statistics reflect **demonstration pilot data**.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Rate Limiting State
  const [rateLimitStatus, setRateLimitStatus] = useState<RateLimitStatus>(() =>
    checkRateLimit(userId)
  );
  const [cooldown, setCooldown] = useState<number>(() => {
    const initial = checkRateLimit(userId);
    return !initial.allowed && initial.reason === 'minute_limit' ? initial.waitSeconds : 0;
  });

  // Re-sync rate limit on user change
  useEffect(() => {
    const status = checkRateLimit(userId);
    setRateLimitStatus(status);
    if (!status.allowed && status.reason === 'minute_limit') {
      setCooldown(status.waitSeconds);
    } else {
      setCooldown(0);
    }
  }, [userId]);

  // Active 1-second countdown ticker when in cooldown
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          const updated = checkRateLimit(userId);
          setRateLimitStatus(updated);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown, userId]);

  // Periodic status refresh to automatically clear sliding 60-second window
  useEffect(() => {
    const interval = setInterval(() => {
      const current = checkRateLimit(userId);
      setRateLimitStatus(current);
      if (!current.allowed && current.reason === 'minute_limit' && cooldown === 0) {
        setCooldown(current.waitSeconds);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [userId, cooldown]);

  const handleSend = async (textToSend?: string) => {
    const prompt = textToSend || input;
    if (!prompt.trim() || loading) return;

    // Strict client-side rate limit check
    const currentStatus = checkRateLimit(userId);
    if (!currentStatus.allowed) {
      setRateLimitStatus(currentStatus);
      if (currentStatus.reason === 'minute_limit') {
        setCooldown(currentStatus.waitSeconds);
      }
      return;
    }

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const reply = await sendAssistantMessage(prompt, messages, userId);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
      // Refresh rate limit state immediately after message is sent
      const updated = checkRateLimit(userId);
      setRateLimitStatus(updated);
      if (!updated.allowed && updated.reason === 'minute_limit') {
        setCooldown(updated.waitSeconds);
      }
    }
  };

  const handleResetLimits = () => {
    resetRateLimit(userId);
    const refreshed = checkRateLimit(userId);
    setRateLimitStatus(refreshed);
    setCooldown(0);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const isDailyLimitReached = rateLimitStatus.remainingToday <= 0;
  const isMinuteCooldown = cooldown > 0;
  const isSendDisabled = loading || !input.trim() || isDailyLimitReached || isMinuteCooldown;
  const percentageRemaining = Math.round((rateLimitStatus.remainingToday / MAX_REQUESTS_PER_DAY) * 100);

  return (
    <div className="relative min-h-[90vh] w-full overflow-hidden">
      {/* India Gate Dusk Ambient Background - Fixed Viewport Backdrop */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/india-gate-hero.jpg"
          alt="Suraksha Assistant Intelligence Background"
          className="w-full h-full object-cover object-center opacity-85 dark:opacity-80 brightness-95 contrast-115"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/60 via-paper/75 to-paper/95 dark:from-ink/60 via-ink/75 to-ink/95" />
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-20" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="border-b border-hairline border-paper-border dark:border-ink-border pb-6 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-saffron uppercase tracking-widest mb-2">
              <Sparkles className="w-4 h-4 text-saffron" />
              <span>Phase 5 • National AI Grounded Intelligence</span>
              <span className="px-1.5 py-0.5 rounded font-mono font-bold bg-signalred/15 text-signalred text-[10px] border border-signalred/30">
                DEMO DATA
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-ink dark:text-paper tracking-tight">
              Suraksha Assistant (Gemini AI)
            </h1>
            <p className="font-sans text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-xl">
              Context-grounded civic safety assistant. Look up hazard tickets, explore scoring methodology,
              or obtain verified helpline guidance.
            </p>
          </div>

          {isAuthenticated && (
            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
              {/* Daily Quota Counter Badge */}
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono shadow-sm transition-all ${
                  isDailyLimitReached
                    ? 'bg-signalred/10 border-signalred/30 text-signalred font-bold'
                    : rateLimitStatus.remainingToday <= 5
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400 font-semibold'
                    : 'bg-paper-card dark:bg-ink-card border-paper-border dark:border-ink-border text-neutral-700 dark:text-neutral-300'
                }`}
                title={`Daily Quota: ${rateLimitStatus.usedToday}/${MAX_REQUESTS_PER_DAY} used today. Max ${MAX_REQUESTS_PER_MINUTE} req/min.`}
              >
                <Zap className="w-3.5 h-3.5 text-saffron shrink-0" />
                <span className="font-bold text-saffron">{rateLimitStatus.remainingToday}</span>
                <span className="text-neutral-500 dark:text-neutral-400">/{MAX_REQUESTS_PER_DAY} left today</span>
              </div>

              {/* Minute Limit Pill */}
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-mono transition-all ${
                  isMinuteCooldown
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400 animate-pulse'
                    : 'bg-paper-card dark:bg-ink-card border-paper-border dark:border-ink-border text-neutral-500 dark:text-neutral-400'
                }`}
              >
                <Clock className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
                {isMinuteCooldown ? (
                  <span className="font-bold">{cooldown}s cooldown</span>
                ) : (
                  <span>2/min max</span>
                )}
              </div>

              {/* Reset Quota (for testing) */}
              <button
                onClick={handleResetLimits}
                title="Reset demo rate limit counters for testing"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-paper-border dark:border-ink-border hover:border-saffron text-neutral-500 hover:text-ink dark:hover:text-paper font-mono text-xs transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span className="hidden sm:inline">Reset Quota</span>
              </button>

              {/* New Session Button */}
              <button
                onClick={() =>
                  setMessages([
                    {
                      id: 'msg-fresh',
                      role: 'assistant',
                      content:
                        'Session refreshed. ⚡ **Quota:** ' +
                        rateLimitStatus.remainingToday +
                        '/30 queries remaining today (max 2/min). How may I assist you?',
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }
                  ])
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-paper-border dark:border-ink-border text-neutral-500 hover:text-ink dark:hover:text-paper font-mono text-xs transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>New Session</span>
              </button>
            </div>
          )}
        </div>

        {!isAuthenticated ? (
          /* Mandatory signed-in gating */
          <div className="p-8 sm:p-12 rounded-3xl bg-paper-card/90 dark:bg-ink-card/90 border border-hairline border-paper-border dark:border-ink-border text-center max-w-xl mx-auto shadow-2xl backdrop-blur-md">
            <div className="w-16 h-16 rounded-2xl bg-saffron/15 text-saffron mx-auto flex items-center justify-center mb-6 border border-saffron/30">
              <Lock className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-ink dark:text-paper mb-3">
              Sign In Required for Suraksha Assistant
            </h3>

            <p className="font-sans text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
              In accordance with national security safeguards and compute fair-share rules, Suraksha
              Assistant is restricted to authenticated users.
            </p>

            {/* Quota policy announcement card */}
            <div className="p-4 rounded-2xl bg-paper/80 dark:bg-ink/80 border border-paper-border dark:border-ink-border text-left mb-6 font-mono text-xs">
              <div className="flex items-center gap-2 text-saffron font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4 text-saffron" />
                <span>Fair-Use Quota Policy</span>
              </div>
              <ul className="space-y-1.5 text-neutral-600 dark:text-neutral-300">
                <li className="flex items-center justify-between">
                  <span>• Daily Request Limit:</span>
                  <span className="font-bold text-ink dark:text-paper">30 queries / user / day</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>• Velocity Rate Limit:</span>
                  <span className="font-bold text-ink dark:text-paper">Max 2 requests / minute</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>• Quota Refresh:</span>
                  <span className="font-bold text-ink dark:text-paper">Every midnight (00:00 local time)</span>
                </li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-signalred/10 border border-signalred/30 text-xs font-mono text-signalred mb-8 flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Emergency Notice: In life-safety situations, dial 112 immediately.</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 font-mono text-xs">
              <Link
                to="/login"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-saffron hover:bg-saffron-muted text-ink font-bold shadow-sm transition-all"
              >
                Sign In to Activate Assistant
              </Link>
              <button
                onClick={() => signInAsDemo('citizen')}
                className="w-full sm:w-auto px-4 py-3 rounded-xl border border-paper-border dark:border-ink-border text-neutral-600 dark:text-neutral-300 hover:text-ink dark:hover:text-paper"
              >
                1-Click Demo Citizen Login
              </button>
            </div>
          </div>
        ) : (
          /* Authenticated Interactive Chat Session */
          <div className="rounded-3xl border border-hairline border-paper-border dark:border-ink-border bg-paper-card/90 dark:bg-ink-card/90 p-5 sm:p-6 shadow-2xl font-mono text-xs backdrop-blur-md flex flex-col min-h-[540px]">
            {/* Top Dedicated Quota Banner Bar */}
            <div className="p-3 rounded-2xl bg-paper/80 dark:bg-ink/80 border border-paper-border dark:border-ink-border mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-saffron/15 text-saffron flex items-center justify-center font-bold">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-sans font-semibold text-ink dark:text-paper text-sm">
                      {rateLimitStatus.remainingToday} of {MAX_REQUESTS_PER_DAY} Requests Available Today
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                        rateLimitStatus.remainingToday > 10
                          ? 'bg-indiagreen/15 text-indiagreen border border-indiagreen/30'
                          : rateLimitStatus.remainingToday > 0
                          ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                          : 'bg-signalred/15 text-signalred border border-signalred/30'
                      }`}
                    >
                      {percentageRemaining}% Available
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-sans mt-0.5">
                    Speed limit: <strong className="font-mono text-ink dark:text-paper">Max 2 requests/minute</strong> • Daily quota resets at midnight (00:00)
                  </div>
                </div>
              </div>

              {/* Visual Mini Progress Bar */}
              <div className="w-full sm:w-44 flex flex-col gap-1">
                <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                  <span>Usage: {rateLimitStatus.usedToday}/{MAX_REQUESTS_PER_DAY}</span>
                  <span>{rateLimitStatus.remainingToday} left</span>
                </div>
                <div className="w-full h-2 rounded-full bg-paper-border dark:bg-ink-border overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      rateLimitStatus.remainingToday > 10
                        ? 'bg-saffron'
                        : rateLimitStatus.remainingToday > 0
                        ? 'bg-amber-500'
                        : 'bg-signalred'
                    }`}
                    style={{ width: `${percentageRemaining}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Messages Thread */}
            <div className="flex-1 space-y-4 overflow-y-auto mb-4 pr-2 max-h-[440px]">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`p-4 rounded-2xl max-w-[85%] border leading-relaxed font-sans text-sm ${
                      m.role === 'user'
                        ? 'bg-saffron text-ink font-medium border-saffron'
                        : 'bg-paper dark:bg-ink border-paper-border dark:border-ink-border text-neutral-800 dark:text-neutral-200 shadow-sm'
                    }`}
                  >
                    <ProfessionalMessage content={m.content} isUser={m.role === 'user'} />
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-neutral-400 mt-1 px-1 font-mono">
                    <span>{m.timestamp}</span>
                    {m.role === 'assistant' && (
                      <button
                        onClick={() => copyToClipboard(m.content, m.id)}
                        className="hover:text-saffron flex items-center gap-0.5"
                      >
                        {copiedId === m.id ? (
                          <>
                            <Check className="w-3 h-3 text-indiagreen" />
                            <span className="text-indiagreen">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-saffron p-3 rounded-xl bg-saffron/10 border border-saffron/30 w-fit">
                  <span className="w-2 h-2 rounded-full bg-saffron animate-ping" />
                  <span className="font-mono text-xs">Suraksha AI is reasoning...</span>
                </div>
              )}
            </div>

            {/* Suggested Prompts Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-2 font-mono text-[11px]">
              <span className="text-neutral-400 shrink-0">Try asking:</span>
              <button
                onClick={() => handleSend('How is the Safety Grid composite score calculated?')}
                disabled={isSendDisabled && !input.trim()}
                className="px-2.5 py-1 rounded-lg bg-paper dark:bg-ink border border-paper-border dark:border-ink-border hover:border-saffron text-neutral-600 dark:text-neutral-300 shrink-0 disabled:opacity-50"
              >
                Explain Safety Grid weights
              </button>
              <button
                onClick={() => handleSend('What should I do if I receive a fake electricity bill SMS?')}
                disabled={isSendDisabled && !input.trim()}
                className="px-2.5 py-1 rounded-lg bg-paper dark:bg-ink border border-paper-border dark:border-ink-border hover:border-[#4C5BD4] text-neutral-600 dark:text-neutral-300 shrink-0 disabled:opacity-50"
              >
                Cyber fraud helpline (1930)
              </button>
              <button
                onClick={() => handleSend('Status lookup for ticket SB-2026-00412')}
                disabled={isSendDisabled && !input.trim()}
                className="px-2.5 py-1 rounded-lg bg-paper dark:bg-ink border border-paper-border dark:border-ink-border hover:border-saffron text-neutral-600 dark:text-neutral-300 shrink-0 disabled:opacity-50"
              >
                Check ticket SB-2026-00412
              </button>
            </div>

            {/* Rate Limit Active Warning Banners */}
            {isDailyLimitReached ? (
              <div className="mb-3 p-3.5 rounded-2xl bg-signalred/15 border border-signalred/40 text-signalred text-xs font-mono flex items-center gap-3 shadow-sm">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <div>
                  <div className="font-bold">Daily Request Quota Exhausted (30 of 30 queries used today)</div>
                  <div className="text-[11px] text-signalred/90 font-sans mt-0.5">
                    To maintain equitable compute access, your daily allocation of 30 requests has ended. Quota will automatically reset tonight at midnight (00:00).
                  </div>
                </div>
              </div>
            ) : isMinuteCooldown ? (
              <div className="mb-3 p-3 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-700 dark:text-amber-300 text-xs font-mono flex items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 shrink-0 animate-spin text-amber-500" style={{ animationDuration: '3s' }} />
                  <span>
                    Rate limit active (max 2 queries/minute). Please wait <strong>{cooldown} seconds</strong> before sending your next query.
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/25 font-bold text-xs text-amber-800 dark:text-amber-200">
                  {cooldown}s
                </span>
              </div>
            ) : null}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="relative"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isDailyLimitReached}
                placeholder={
                  isDailyLimitReached
                    ? 'Daily rate limit reached (30/30 queries used today). Resets at midnight.'
                    : isMinuteCooldown
                    ? `Rate limit active: please wait ${cooldown}s cooldown...`
                    : 'Ask about civic hazards, tracking numbers, or platform methodology...'
                }
                className="w-full p-3.5 pr-20 rounded-2xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border text-ink dark:text-paper focus:outline-none focus:border-saffron font-sans text-sm shadow-inner disabled:opacity-60 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={isSendDisabled}
                aria-label="Send query"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 px-3.5 py-2 rounded-xl bg-saffron text-ink hover:bg-saffron-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all font-mono text-xs font-semibold flex items-center gap-1.5 shadow-sm"
              >
                {isDailyLimitReached ? (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Locked</span>
                  </>
                ) : isMinuteCooldown ? (
                  <>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{cooldown}s</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </>
                )}
              </button>
            </form>

            {/* Bottom Sub-text showing live quota available */}
            <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono mt-2 px-1">
              <span className="flex items-center gap-1">
                <Info className="w-3 h-3 text-saffron" />
                <span>
                  <strong>{rateLimitStatus.remainingToday} of {MAX_REQUESTS_PER_DAY}</strong> queries available today (Max {MAX_REQUESTS_PER_MINUTE} req/min)
                </span>
              </span>
              <span>Resets daily at 00:00</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
