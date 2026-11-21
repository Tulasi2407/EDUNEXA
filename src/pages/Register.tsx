import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import {
  Sparkles,
  ArrowRight,
  UserCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [role, setRole] = useState<UserRole>('STUDENT');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [preferredLanguage, setPreferredLanguage] = useState<'English' | 'Kannada' | 'Hindi'>('English');
  const [section, setSection] = useState('Section A');
  const [specialization, setSpecialization] = useState('Mathematics');
  const [linkedChildName, setLinkedChildName] = useState('Alex Johnson');
  const [termsAgreed, setTermsAgreed] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    if (!termsAgreed) {
      setErrorMsg('Please accept the Karnataka SSLC Board evaluation terms.');
      return;
    }

    // Call register in AuthContext
    register({
      name,
      email,
      role,
      section,
      preferredLanguage,
      department: role === 'TEACHER' ? specialization : undefined,
      linkedStudentName: role === 'PARENT' ? linkedChildName : undefined
    });

    // Also inform FastAPI backend asynchronously if available
    try {
      fetch('http://127.0.0.1:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          grade: 'Class 10',
          board: 'Karnataka State Board',
          preferred_language: preferredLanguage,
          section,
          specialization: role === 'TEACHER' ? specialization : undefined
        })
      }).catch(() => {});
    } catch (err) {}

    // Redirect to personalized welcome screen
    navigate('/welcome');
  };

  return (
    <div className="min-h-screen bg-[#0B1020] flex items-center justify-center p-4">
      {/* Background ambient glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#7657F6]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-xl w-full bg-[#171F3A] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#7657F6] to-[#A78BFA] flex items-center justify-center mx-auto shadow-glow-primary">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Join EduNexa AI</h1>
          <p className="text-xs text-slate-400">
            Dedicated Personalized Learning for <strong className="text-[#FFC857]">Karnataka SSLC Class 10</strong>
          </p>
        </div>

        {/* Karnataka Board Scope Badge */}
        <div className="p-3 rounded-xl bg-[#111831] border border-white/5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#7657F6]" />
            <span className="text-slate-300 font-semibold">Curriculum Scope:</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#7657F6]/20 text-[#A78BFA] border border-[#7657F6]/30">
              Karnataka State Board (KSEAB)
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFC857]/20 text-[#FFC857] border border-[#FFC857]/30">
              Class 10
            </span>
          </div>
        </div>

        {/* Role Selector */}
        <div className="space-y-2">
          <label className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
            Select Your Role
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['STUDENT', 'TEACHER', 'PARENT'] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`py-2.5 px-3 rounded-xl border text-center font-bold text-xs transition-all ${
                  role === r
                    ? 'bg-[#7657F6] border-[#7657F6] text-white shadow-glow-primary'
                    : 'bg-[#111831] border-white/5 text-slate-300 hover:bg-white/5'
                }`}
              >
                {r === 'STUDENT' ? 'Student' : r === 'TEACHER' ? 'Teacher' : 'Parent'}
              </button>
            ))}
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              required
              placeholder={role === 'STUDENT' ? 'e.g. Alex Johnson' : role === 'TEACHER' ? 'e.g. Ms. Sarah Chen' : 'e.g. Robert Johnson'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7657F6] transition-colors"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              required
              placeholder="e.g. student@edunexa.ai"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7657F6] transition-colors"
            />
          </div>

          {/* Password with Show/Hide Toggle */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Password</span>
              </div>
              <span className="text-[10px] text-slate-400">Min 6 characters</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Create a secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7657F6] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Language / Medium Selection */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">
                Instruction Medium / Language
              </label>
              <select
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7657F6] transition-colors"
              >
                <option value="English">English Medium</option>
                <option value="Kannada">ಕನ್ನಡ ಮಾಧ್ಯಮ (Kannada)</option>
                <option value="Hindi">हिंदी माध्यम (Hindi)</option>
              </select>
            </div>

            {role === 'STUDENT' && (
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">
                  Class 10 Section
                </label>
                <select
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7657F6] transition-colors"
                >
                  <option value="Section A">Section A (Regular)</option>
                  <option value="Section B">Section B (Advanced)</option>
                  <option value="Section C">Section C (Remedial Focus)</option>
                </select>
              </div>
            )}

            {role === 'TEACHER' && (
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">
                  Subject Specialization
                </label>
                <select
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7657F6] transition-colors"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science (Physics/Chem/Bio)</option>
                  <option value="Social Science">Social Science</option>
                  <option value="Kannada">First Language Kannada</option>
                  <option value="English">Second Language English</option>
                </select>
              </div>
            )}

            {role === 'PARENT' && (
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">
                  Linked Student
                </label>
                <input
                  type="text"
                  value={linkedChildName}
                  onChange={(e) => setLinkedChildName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7657F6] transition-colors"
                />
              </div>
            )}
          </div>

          {/* Terms Agreement */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="terms"
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
              className="w-4 h-4 rounded bg-[#111831] border-white/20 text-[#7657F6] focus:ring-0"
            />
            <label htmlFor="terms" className="text-xs text-slate-400">
              I agree to the <span className="text-[#A78BFA] font-medium">Karnataka SSLC Board Honor Code</span> & Data Privacy Policy
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#7657F6] hover:bg-[#6442E8] text-xs font-bold text-white shadow-glow-primary transition-all cursor-pointer"
          >
            <span>Create My SSLC Class 10 Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Switch to Login */}
        <div className="text-center pt-2 border-t border-white/5">
          <p className="text-xs text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-[#A78BFA] hover:text-white font-bold transition-colors">
              Sign In here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
