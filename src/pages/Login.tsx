import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import { Sparkles, ArrowRight, UserCheck, Lock, Mail, ShieldAlert } from 'lucide-react';
import { DEMO_USERS } from '../data/mockData';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('alex.johnson@edunexa.ai');
  const [password, setPassword] = useState('demo123');
  const [selectedRole, setSelectedRole] = useState<UserRole>('STUDENT');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, selectedRole);
    if (selectedRole === 'STUDENT') navigate('/student');
    else if (selectedRole === 'TEACHER') navigate('/teacher');
    else if (selectedRole === 'PARENT') navigate('/parent');
    else if (selectedRole === 'ADMIN') navigate('/admin');
  };

  const handleSelectDemo = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(DEMO_USERS[role].email);
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen bg-[#0B1020] flex items-center justify-center p-4">
      {/* Background glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#7657F6]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full bg-[#171F3A] border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10 space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#7657F6] to-[#A78BFA] flex items-center justify-center mx-auto shadow-glow-primary">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Sign In to EduNexa</h1>
          <p className="text-xs text-slate-400">Select any pre-configured demo account or log in</p>
        </div>

        {/* 1-Click Demo Account Selector */}
        <div className="space-y-2">
          <label className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
            1-Click Demo Profiles (For Evaluation)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['STUDENT', 'TEACHER', 'PARENT', 'ADMIN'] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => handleSelectDemo(r)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  selectedRole === r
                    ? 'bg-[#7657F6]/20 border-[#7657F6] text-white shadow-sm'
                    : 'bg-[#111831] border-white/5 text-slate-300 hover:bg-white/5'
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7657F6] transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Password</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7657F6] transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#7657F6] hover:bg-[#6442E8] text-xs font-bold text-white shadow-glow-primary transition-all"
          >
            <span>Sign In to {selectedRole} Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Landing Page
          </button>
        </div>
      </div>
    </div>
  );
};
