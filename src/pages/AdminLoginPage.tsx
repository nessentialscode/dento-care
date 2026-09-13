import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ShieldAlert, ArrowLeft, Loader2 } from 'lucide-react';
import { signInAdmin, isAuthorizedAdmin, signOutAdmin } from '../services/authService';

interface AdminLoginPageProps {
  onSuccess: () => void;
  onNavigateHome: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onSuccess,
  onNavigateHome,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Please provide both your administrator email and password.');
      return;
    }

    setLoading(true);

    try {
      const { user } = await signInAdmin(email, password);

      // Verify administrative authorization
      if (!isAuthorizedAdmin(user)) {
        // Sign out immediately so unauthorized token is not retained
        await signOutAdmin();
        setError('Access denied. This account does not possess administrator privileges.');
        setLoading(false);
        return;
      }

      onSuccess();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '';
      if (msg.includes('Invalid login credentials')) {
        setError('Invalid administrator email or password. Please try again.');
      } else if (msg.includes('Email not confirmed')) {
        setError('Your email address has not been confirmed yet.');
      } else {
        setError(msg || 'An authentication error occurred. Please verify your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#D8EEE1] text-slate-900 flex flex-col justify-between selection:bg-[#E5FE40] selection:text-slate-900">
      {/* TOP BAR */}
      <header className="w-full px-6 py-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-700 hover:text-slate-950 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Clinic Website</span>
        </button>
      </header>

      {/* LOGIN CARD */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white rounded-[32px] sm:rounded-[36px] shadow-2xl shadow-slate-900/10 border border-slate-200/80 p-6 sm:p-10 relative overflow-hidden">
          {/* Subtle brand top accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#4B91E0] via-[#5B9DE6] to-[#E5FE40]" />

          {/* LOGO & TITLE */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#5B9DE6] shadow-md shadow-sky-900/10 p-2 mb-3">
              <img
                src="/images/dento-care-icon.png"
                alt="Dento Care Icon"
                className="w-full h-full object-contain filter brightness-0 invert"
              />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Dento Care Dental Clinic
            </h1>
            <p className="text-xs uppercase tracking-widest text-sky-700 font-semibold mt-1">
              Staff &amp; Admin Portal
            </p>
          </div>

          {/* ERROR ALERT */}
          {error && (
            <div
              role="alert"
              className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-xs sm:text-sm animate-in fade-in duration-200"
            >
              <ShieldAlert size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* EMAIL */}
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                Administrator Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@dentocaredental.com"
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B9DE6] focus:bg-white transition-all text-slate-900 placeholder:text-slate-400 disabled:opacity-60"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  disabled={loading}
                  className="w-full pl-10 pr-11 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B9DE6] focus:bg-white transition-all text-slate-900 placeholder:text-slate-400 disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-lg shadow-slate-900/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Verifying credentials...</span>
                </>
              ) : (
                <span>Sign In to Admin Portal</span>
              )}
            </button>
          </form>

          {/* SECURITY NOTE */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Authorized clinical personnel only. All access attempts and administrative modifications are logged securely.
            </p>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Dento Care Dental Clinic • Ponnani, Kerala
      </footer>
    </div>
  );
};
