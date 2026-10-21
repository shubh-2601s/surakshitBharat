import React, { useState } from 'react';
import { Bot, Lock, Send, ShieldAlert, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AssistantPage: React.FC = () => {
  // Signed in gate demonstration check (Phase 1 unauthenticated gate check)
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="border-b border-hairline border-paper-border dark:border-ink-border pb-6 mb-8">
        <div className="flex items-center gap-2 font-mono text-xs text-saffron uppercase tracking-widest mb-2">
          <Sparkles className="w-4 h-4" />
          <span>National AI Intelligence Agent</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-ink dark:text-paper tracking-tight">
          Suraksha Assistant
        </h1>
        <p className="font-sans text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl">
          Context-grounded assistant powered by Google Gemini API. Triage civic reports, look up
          incident reference numbers, query Safety Grid indices, and obtain verified digital safety
          guidance.
        </p>
      </div>

      {!isSignedIn ? (
        /* Mandatory signed-in gating from Section 9 */
        <div className="p-8 sm:p-12 rounded-3xl bg-paper-card dark:bg-ink-card border border-hairline border-paper-border dark:border-ink-border text-center max-w-xl mx-auto shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-saffron/15 text-saffron mx-auto flex items-center justify-center mb-6 border border-saffron/30">
            <Lock className="w-8 h-8" />
          </div>

          <h3 className="font-serif text-2xl font-bold text-ink dark:text-paper mb-3">
            Sign In Required for Suraksha Assistant
          </h3>

          <p className="font-sans text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
            In accordance with national security safeguards and per-user token quotas, Suraksha
            Assistant is restricted to authenticated users. All conversation sessions are end-to-end
            encrypted and scoped solely to your verified reports.
          </p>

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
              onClick={() => setIsSignedIn(true)}
              className="w-full sm:w-auto px-4 py-3 rounded-xl border border-paper-border dark:border-ink-border text-neutral-500 hover:text-ink dark:hover:text-paper"
            >
              Simulate Demo Auth Session
            </button>
          </div>
        </div>
      ) : (
        /* Authenticated Interactive Chat Session */
        <div className="rounded-2xl border border-hairline border-paper-border dark:border-ink-border bg-paper-card dark:bg-ink-card p-6 shadow-xl font-mono text-xs">
          <div className="flex items-center justify-between pb-4 border-b border-paper-border dark:border-ink-border mb-6">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-saffron" />
              <span className="font-bold text-sm text-ink dark:text-paper">Session Active (Demo Auth)</span>
            </div>
            <button
              onClick={() => setIsSignedIn(false)}
              className="text-neutral-400 hover:text-signalred"
            >
              Disconnect
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="p-4 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border">
              <span className="text-[10px] text-saffron uppercase font-bold block mb-1">
                Suraksha Assistant • Grounded
              </span>
              <p className="font-sans text-neutral-700 dark:text-neutral-200 text-sm leading-relaxed">
                Namaste. I am your Suraksha Assistant. I can help look up your active incident references,
                explain the Safety Grid scoring weights, or provide official contacts for cyber fraud.
                Please note all current statistics reflect demonstration data. How may I assist you today?
              </p>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Ask a question or enter incident reference number (e.g. SB-2026-00412)..."
              className="w-full p-3.5 pr-12 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border text-ink dark:text-paper focus:outline-none focus:border-saffron font-sans text-sm"
            />
            <button
              aria-label="Send query"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-saffron text-ink hover:bg-saffron-muted"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
