import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import { Sparkles, ArrowRight, Lock, Mail, Eye, EyeOff, AlertCircle, UserPlus } from 'lucide-react';
import { DEMO_USERS } from '../data/mockData';
import { EduNexaLogo } from '../components/common/EduNexaLogo';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('STUDENT');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [userNotFound, setUserNotFound] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setUserNotFound(false);

    try {
      await login(email, password, selectedRole);
      navigate('/welcome');
    } catch (err: any) {
      const msg = err?.message || 'Invalid email or password. Please verify your credentials.';
      setErrorMsg(msg);
      if (
        msg.toLowerCase().includes('not found') ||
        msg.toLowerCase().includes('invalid credentials') ||
        msg.toLowerCase().includes('does not exist')
      ) {
        setUserNotFound(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectDemo = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(DEMO_USERS[role].email);
    setPassword('demo123');
    setErrorMsg('');
    setUserNotFound(false);
  };

  return (
    <div className="min-h-screen bg-[#0B1020] flex items-center justify-center p-4">
      {/* Background glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#7657F6]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full bg-[#171F3A] border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10 space-y-6">
        {/* Brand header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <EduNexaLogo
            size="lg"
            layout="stacked"
            subtitle="Karnataka State Board SSLC Class 10 Portal"
            onClick={() => navigate('/')}
          />
          <h1 className="text-xl sm:text-2xl font-extrabold text-white pt-2">Sign In to Your Workspace</h1>
        </div>

        {/* 1-Click Demo Profiles (For Reference & Evaluation) */}
        <div className="space-y-2 p-3 rounded-xl bg-[#111831]/80 border border-white/5">
          <div className="flex items-center justify-between">
            <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
              1-Click Demo Profiles (Reference Evaluation)
            </label>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#7657F6]/20 text-[#A78BFA]">Atlas Pre-seeded</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {(['STUDENT', 'TEACHER', 'PARENT', 'ADMIN'] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => handleSelectDemo(r)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedRole === r
                    ? 'bg-[#7657F6]/20 border-[#7657F6] text-white shadow-sm'
                    : 'bg-[#0B1020] border-white/5 text-slate-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#A78BFA]">{r}</span>
                  {selectedRole === r && <div className="w-1.5 h-1.5 rounded-full bg-[#FFC857]" />}
                </div>
                <p className="text-xs font-bold text-white mt-1 truncate">{DEMO_USERS[r].name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Error / User Not Found Notice */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 space-y-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
            {userNotFound && (
              <div className="pt-2 border-t border-red-500/20">
                <p className="text-[11px] text-slate-300">
                  New to EduNexa? Your account does not exist in the Karnataka SSLC database yet.
                </p>
                <Link
                  to={`/register?email=${encodeURIComponent(email)}`}
                  className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-bold text-[#FFC857] hover:underline"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Create your Class 10 Account Now →</span>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              required
              placeholder="e.g. your.email@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMsg('');
                setUserNotFound(false);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7657F6] transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Password</span>
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showPassword ? 'Hide' : 'Show'}</span>
              </button>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg('');
                }}
                className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7657F6] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#7657F6] hover:bg-[#6442E8] disabled:opacity-50 text-xs font-bold text-white shadow-glow-primary transition-all cursor-pointer"
          >
            <span>{isLoading ? 'Verifying with MongoDB Atlas...' : `Sign In to ${selectedRole} Portal`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Link to Register & Back */}
        <div className="text-center pt-2 border-t border-white/5 space-y-2">
          <p className="text-xs text-slate-400">
            Don't have an SSLC account?{' '}
            <Link to="/register" className="text-[#A78BFA] hover:text-white font-bold transition-colors">
              Register here
            </Link>
          </p>
          <div>
            <button
              onClick={() => navigate('/')}
              className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              ← Back to Landing Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
