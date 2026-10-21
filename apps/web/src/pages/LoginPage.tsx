import React from 'react';
import { Shield, Lock, ArrowRight, UserCheck, KeyRound } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="p-8 rounded-2xl bg-paper-card dark:bg-ink-card border border-hairline border-paper-border dark:border-ink-border shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-saffron/15 border border-saffron/30 flex items-center justify-center text-saffron">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-ink dark:text-paper">
              Surakshit Bharat Access
            </h1>
            <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
              Unified Single Sign-On
            </span>
          </div>
        </div>

        <p className="text-xs text-neutral-600 dark:text-neutral-400 font-sans mb-6 leading-relaxed">
          Sign in using your citizen email, verified manufacturer BIS registration credentials, or
          official municipal authority credentials.
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1 font-bold">
              National ID / Email
            </label>
            <input
              type="email"
              placeholder="name@domain.gov.in or personal email"
              className="w-full p-3 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border text-ink dark:text-paper focus:outline-none focus:border-saffron font-sans"
            />
          </div>

          <div>
            <label className="block text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1 font-bold">
              Access Token / Password
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              className="w-full p-3 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border text-ink dark:text-paper focus:outline-none focus:border-saffron font-sans"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-saffron hover:bg-saffron-muted text-ink font-bold font-mono text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>Authenticate Secure Session</span>
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-paper-border dark:border-ink-border text-center font-mono text-xs text-neutral-500">
          <span>Role-based access enforced via Row-Level Security (RLS)</span>
        </div>
      </div>
    </div>
  );
};
