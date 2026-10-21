import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '@surakshit-bharat/shared';
import {
  Shield,
  User,
  Factory,
  Building2,
  Lock,
  Mail,
  MapPin,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { signUp, signInAsDemo } = useAuth();

  const [role, setRole] = useState<UserRole>('citizen');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organization, setOrganization] = useState('');
  const [district, setDistrict] = useState('Bengaluru Urban (KA)');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    const result = await signUp(email, password, {
      full_name: fullName,
      role,
      organization: role !== 'citizen' ? organization : undefined,
      district
    });

    setLoading(false);
    if (!result.success) {
      setErrorMsg(result.error || 'Registration failed. You can also use Instant Demo Profile below.');
    } else {
      setSuccessMsg('Account registered successfully! Redirecting to your command dashboard...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Editorial Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron/15 text-saffron border border-saffron/30 font-mono text-xs font-bold mb-3">
          <Shield className="w-3.5 h-3.5" />
          <span>Surakshit Bharat Access Registry</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink dark:text-paper tracking-tight">
          Create National Intelligence Account
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-sans mt-2 max-w-lg mx-auto">
          Join the unified safety mesh. Report civic hazards, verify manufacturing batch compliance,
          or manage municipal dispatch.
        </p>
      </div>

      {/* Main Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-paper-card dark:bg-ink-card border border-hairline border-paper-border dark:border-ink-border shadow-2xl">
        {/* Role Selector Tabs */}
        <div className="mb-8">
          <label className="block text-neutral-700 dark:text-neutral-300 font-mono text-xs uppercase tracking-wider mb-2 font-bold">
            Select Your Account Scope / Role:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
            <button
              type="button"
              onClick={() => setRole('citizen')}
              className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                role === 'citizen'
                  ? 'bg-saffron text-ink font-bold border-saffron shadow-sm'
                  : 'bg-paper dark:bg-ink border-paper-border dark:border-ink-border text-neutral-500 hover:text-ink dark:hover:text-paper'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Citizen</span>
            </button>

            <button
              type="button"
              onClick={() => setRole('manufacturer')}
              className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                role === 'manufacturer'
                  ? 'bg-[#0F9D8A] text-white font-bold border-[#0F9D8A] shadow-sm'
                  : 'bg-paper dark:bg-ink border-paper-border dark:border-ink-border text-neutral-500 hover:text-ink dark:hover:text-paper'
              }`}
            >
              <Factory className="w-4 h-4" />
              <span>Manufacturer</span>
            </button>

            <button
              type="button"
              onClick={() => setRole('authority')}
              className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                role === 'authority'
                  ? 'bg-navy text-white font-bold border-navy dark:border-saffron shadow-sm'
                  : 'bg-paper dark:bg-ink border-paper-border dark:border-ink-border text-neutral-500 hover:text-ink dark:hover:text-paper'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Authority</span>
            </button>

            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                role === 'admin'
                  ? 'bg-signalred text-white font-bold border-signalred shadow-sm'
                  : 'bg-paper dark:bg-ink border-paper-border dark:border-ink-border text-neutral-500 hover:text-ink dark:hover:text-paper'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Admin</span>
            </button>
          </div>

          <div className="mt-2.5 p-3 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border text-[11px] font-mono text-neutral-500">
            {role === 'citizen' && '• Citizen: Log community hazards, get unique reference numbers, track SLAs, access AI assistant.'}
            {role === 'manufacturer' && '• Manufacturer: Register product batches, generate cryptographic QR verification slugs, submit claims.'}
            {role === 'authority' && '• Authority: Municipal triage desk, assign divisional engineers, upload resolution photo evidence.'}
            {role === 'admin' && '• Administrator: Review claims, publish verified digital advisories, inspect tamper-proof audit log.'}
          </div>
        </div>

        {/* Alerts */}
        {errorMsg && (
          <div className="p-3.5 mb-6 rounded-xl bg-signalred/10 border border-signalred/30 text-signalred text-xs font-mono flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 mb-6 rounded-xl bg-indiagreen/10 border border-indiagreen/30 text-indiagreen text-xs font-mono flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Real Supabase Sign Up Form */}
        <form onSubmit={handleRegister} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1 font-bold">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Ramesh Chandra Sharma"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border text-ink dark:text-paper focus:outline-none focus:border-saffron font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1 font-bold">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="citizen@domain.com or officer@gov.in"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border text-ink dark:text-paper focus:outline-none focus:border-saffron font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1 font-bold">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border text-ink dark:text-paper focus:outline-none focus:border-saffron font-sans"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {role !== 'citizen' && (
            <div>
              <label className="block text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1 font-bold">
                {role === 'manufacturer' ? 'Company / Enterprise Name' : 'Government Department / Agency'}
              </label>
              <input
                type="text"
                required
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder={role === 'manufacturer' ? 'e.g. Bharat Heavy Cables Ltd' : 'e.g. Municipal Road Infrastructure Division'}
                className="w-full p-2.5 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border text-ink dark:text-paper focus:outline-none focus:border-saffron font-sans"
              />
            </div>
          )}

          <div>
            <label className="block text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1 font-bold">
              District / State Jurisdiction
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-paper dark:bg-ink border border-paper-border dark:border-ink-border text-ink dark:text-paper focus:outline-none focus:border-saffron font-sans"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-saffron hover:bg-saffron-muted text-ink font-bold font-mono text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <span>Registering Credentials...</span>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Create Verified Supabase Account</span>
              </>
            )}
          </button>
        </form>

        {/* Instant Demo Role Testing Strip */}
        <div className="mt-8 pt-6 border-t border-hairline border-paper-border dark:border-ink-border">
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-500 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-saffron" />
            <span className="font-bold uppercase tracking-wider">Instant 1-Click Demo Login:</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
            <button
              onClick={async () => {
                await signInAsDemo('citizen');
                navigate('/dashboard');
              }}
              className="p-2 rounded-lg bg-paper dark:bg-ink border border-paper-border dark:border-ink-border hover:border-saffron text-neutral-600 dark:text-neutral-300"
            >
              Demo Citizen
            </button>
            <button
              onClick={async () => {
                await signInAsDemo('manufacturer');
                navigate('/dashboard');
              }}
              className="p-2 rounded-lg bg-paper dark:bg-ink border border-paper-border dark:border-ink-border hover:border-[#0F9D8A] text-neutral-600 dark:text-neutral-300"
            >
              Demo Manufacturer
            </button>
            <button
              onClick={async () => {
                await signInAsDemo('authority');
                navigate('/dashboard');
              }}
              className="p-2 rounded-lg bg-paper dark:bg-ink border border-paper-border dark:border-ink-border hover:border-saffron text-neutral-600 dark:text-neutral-300"
            >
              Demo Authority
            </button>
            <button
              onClick={async () => {
                await signInAsDemo('admin');
                navigate('/dashboard');
              }}
              className="p-2 rounded-lg bg-paper dark:bg-ink border border-paper-border dark:border-ink-border hover:border-signalred text-neutral-600 dark:text-neutral-300"
            >
              Demo Admin
            </button>
          </div>
        </div>

        {/* Existing account footer */}
        <div className="mt-6 text-center font-mono text-xs text-neutral-500">
          Already have credentials?{' '}
          <Link to="/login" className="text-saffron font-bold hover:underline">
            Sign In Here &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
