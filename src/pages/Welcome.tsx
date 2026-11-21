import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  GraduationCap,
  CalendarDays,
  Bot,
  Zap,
  CheckCircle2,
  Flame,
  Award
} from 'lucide-react';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { user, role } = useAuth();
  const [secondsLeft, setSecondsLeft] = useState(6);
  const [autoRedirectPaused, setAutoRedirectPaused] = useState(false);

  useEffect(() => {
    if (autoRedirectPaused) return;
    if (secondsLeft <= 1) {
      handleProceed();
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft, autoRedirectPaused]);

  const handleProceed = (targetPath?: string) => {
    if (targetPath) {
      navigate(targetPath);
      return;
    }
    if (role === 'STUDENT') navigate('/student');
    else if (role === 'TEACHER') navigate('/teacher');
    else if (role === 'PARENT') navigate('/parent');
    else if (role === 'ADMIN') navigate('/admin');
    else navigate('/student');
  };

  return (
    <div className="min-h-screen bg-[#0B1020] flex items-center justify-center p-4">
      {/* Background radial glow */}
      <div className="absolute w-[600px] h-[600px] bg-[#7657F6]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-2xl w-full bg-[#171F3A] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl relative z-10 space-y-6">
        {/* Welcome Top Banner */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 border-b border-white/5 pb-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-[#7657F6]/40 shadow-glow-primary shrink-0"
          />
          <div className="text-center sm:text-left space-y-1.5 flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#7657F6]/20 text-[#A78BFA] border border-[#7657F6]/30 uppercase">
                {role} Portal
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FFC857]/20 text-[#FFC857] border border-[#FFC857]/30">
                Karnataka SSLC Class 10
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-xs text-slate-300">
              Your personalized AI learning workspace is loaded and synchronized.
            </p>
          </div>
        </div>

        {/* SSLC Exam Countdown Widget */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-[#111831] via-[#1A2342] to-[#111831] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFC857]/20 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 text-[#FFC857]" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Karnataka SSLC Board Exam 2025</p>
              <p className="text-[11px] text-slate-400">Target score: 95%+ Distinction across all 6 subjects</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-center px-3 py-1.5 rounded-lg bg-[#0B1020] border border-white/5">
              <span className="text-base font-extrabold text-white">64</span>
              <span className="block text-[9px] text-slate-400 uppercase">Days</span>
            </div>
            <div className="text-center px-3 py-1.5 rounded-lg bg-[#0B1020] border border-white/5">
              <span className="text-base font-extrabold text-[#A78BFA]">14</span>
              <span className="block text-[9px] text-slate-400 uppercase">Hours</span>
            </div>
            <div className="text-center px-3 py-1.5 rounded-lg bg-[#0B1020] border border-white/5">
              <span className="text-base font-extrabold text-[#FFC857]">32</span>
              <span className="block text-[9px] text-slate-400 uppercase">Mins</span>
            </div>
          </div>
        </div>

        {/* Quick Launch Recommendations */}
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Recommended Starting Points for SSLC Class 10:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handleProceed('/student/gap-finder')}
              className="p-3.5 rounded-xl bg-[#111831] hover:bg-[#1A2342] border border-white/5 hover:border-[#7657F6]/50 text-left transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#7657F6]/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Sparkles className="w-4 h-4 text-[#A78BFA]" />
              </div>
              <p className="text-xs font-bold text-white group-hover:text-[#A78BFA] transition-colors">
                AI Gap Finder
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Detect root cause weaknesses & concept graphs
              </p>
            </button>

            <button
              onClick={() => handleProceed('/student/tutor')}
              className="p-3.5 rounded-xl bg-[#111831] hover:bg-[#1A2342] border border-white/5 hover:border-[#7657F6]/50 text-left transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#FFC857]/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Bot className="w-4 h-4 text-[#FFC857]" />
              </div>
              <p className="text-xs font-bold text-white group-hover:text-[#FFC857] transition-colors">
                Nexa AI Tutor
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                5 explanation modes in English, Kannada & Hindi
              </p>
            </button>

            <button
              onClick={() => handleProceed('/student/study-materials')}
              className="p-3.5 rounded-xl bg-[#111831] hover:bg-[#1A2342] border border-white/5 hover:border-[#7657F6]/50 text-left transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#10B981]/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <BookOpen className="w-4 h-4 text-[#34D399]" />
              </div>
              <p className="text-xs font-bold text-white group-hover:text-[#34D399] transition-colors">
                Study Materials
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                KSEAB Textbooks, PYQs (2020-2024) & Notes
              </p>
            </button>
          </div>
        </div>

        {/* Action / Auto-redirect Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-white/5">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Auto-entering dashboard in</span>
            <span className="font-extrabold text-[#FFC857]">{secondsLeft}s</span>
            <button
              onClick={() => setAutoRedirectPaused(!autoRedirectPaused)}
              className="text-[10px] underline hover:text-white ml-1"
            >
              {autoRedirectPaused ? 'Resume countdown' : 'Pause'}
            </button>
          </div>

          <button
            onClick={() => handleProceed()}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#7657F6] hover:bg-[#6442E8] text-xs font-bold text-white shadow-glow-primary flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Enter Dashboard Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
