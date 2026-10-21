import React, { useState } from 'react';
import { Shield, Lock, ArrowRight, Mail, KeyRound, Sparkles, AlertTriangle, CheckCircle, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '@surakshit-bharat/shared';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, signInAsDemo } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const res = await signIn(email, password);
    setLoading(false);

    if (!res.success) {
      setErrorMsg(res.error || 'Authentication failed. Please verify credentials or register.');
    } else {
      navigate('/dashboard');
    }
  };

  const handleQuickDemo = async (role: UserRole) => {
    await signInAsDemo(role);
    navigate('/dashboard');
  };

  return (
    <div className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden py-16 px-4">
      {/* Subtle Central Secretariat Sandstone Facade Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/secretariat-bg.jpg"
          alt="Central Secretariat New Delhi at Dusk"
          className="w-full h-full object-cover object-center opacity-15 dark:opacity-25 brightness-85 contrast-120"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/85 via-paper/95 to-paper dark:from-ink/85 dark:via-ink/95 dark:to-ink" />
        <div className="absolute inset-0 bg-grain" />
      </div>

      <div className="relative z-10 max-w-md w-full">
        <div className="p-8 rounded-3xl bg-paper-card/90 dark:bg-ink-card/90 border border-hairline border-paper-border dark:border-ink-border shadow-2xl backdrop-blur-md">
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

          {errorMsg && (
            <div className="p-3 mb-4 rounded-xl bg-signalred/10 border border-signalred/30 text-signalred text-xs font-mono flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1 font-bold">
                National ID / Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.gov.in or personal email"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border text-ink dark:text-paper focus:outline-none focus:border-saffron font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1 font-bold">
                Access Token / Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border text-ink dark:text-paper focus:outline-none focus:border-saffron font-sans"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-saffron hover:bg-saffron-muted text-ink font-bold font-mono text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Authenticate Secure Session'}</span>
            </button>
          </form>

          {/* Create account callout */}
          <div className="mt-4 text-center font-mono text-xs text-neutral-500">
            Need an account?{' '}
            <Link to="/register" className="text-saffron font-bold hover:underline inline-flex items-center gap-1">
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create Account Here</span>
            </Link>
          </div>

          {/* 1-Click Demo Profiles */}
          <div className="mt-6 pt-6 border-t border-paper-border dark:border-ink-border">
            <div className="flex items-center gap-1.5 font-mono text-xs text-neutral-500 mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-saffron" />
              <span className="font-bold uppercase tracking-wider">Fast 1-Click Demo Sign In:</span>
            </div>
            <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
              <button
                onClick={() => handleQuickDemo('citizen')}
                className="p-2 rounded-lg bg-paper dark:bg-ink border border-paper-border dark:border-ink-border hover:border-saffron text-neutral-600 dark:text-neutral-300 text-left"
              >
                Citizen Account
              </button>
              <button
                onClick={() => handleQuickDemo('manufacturer')}
                className="p-2 rounded-lg bg-paper dark:bg-ink border border-paper-border dark:border-ink-border hover:border-[#0F9D8A] text-neutral-600 dark:text-neutral-300 text-left"
              >
                Manufacturer
              </button>
              <button
                onClick={() => handleQuickDemo('authority')}
                className="p-2 rounded-lg bg-paper dark:bg-ink border border-paper-border dark:border-ink-border hover:border-saffron text-neutral-600 dark:text-neutral-300 text-left"
              >
                Authority Desk
              </button>
              <button
                onClick={() => handleQuickDemo('admin')}
                className="p-2 rounded-lg bg-paper dark:bg-ink border border-paper-border dark:border-ink-border hover:border-signalred text-neutral-600 dark:text-neutral-300 text-left"
              >
                Admin Console
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
