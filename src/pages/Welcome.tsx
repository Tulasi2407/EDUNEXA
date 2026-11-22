import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { EduNexaLogo } from '../components/common/EduNexaLogo';
import { UserAvatar } from '../components/common/UserAvatar';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Bot,
  Flame,
  CheckCircle2,
  LogOut,
  Users,
  BarChart3,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { user, role, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated || !user || !user.id || !user.email) {
    return <Navigate to="/login" replace />;
  }

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

  const getCardsForRole = () => {
    if (role === 'TEACHER') {
      return [
        {
          title: 'Class Gap Analytics',
          desc: 'Class-wide prerequisite diagnostic heatmaps & gap clusters',
          path: '/teacher/analytics',
          icon: BarChart3,
          color: '#3B82F6',
          bg: 'bg-[#3B82F6]/20',
          textColor: 'text-[#60A5FA]',
          borderHover: 'hover:border-[#3B82F6]'
        },
        {
          title: 'Student Roster',
          desc: 'Monitor Class 10 student progress, attendance & mastery',
          path: '/teacher/students',
          icon: Users,
          color: '#10B981',
          bg: 'bg-[#10B981]/20',
          textColor: 'text-[#34D399]',
          borderHover: 'hover:border-[#10B981]'
        },
        {
          title: 'Quiz & Test Builder',
          desc: 'Create KSEAB blueprint-aligned assessments & practice drills',
          path: '/teacher/quiz-builder',
          icon: GraduationCap,
          color: '#FFC857',
          bg: 'bg-[#FFC857]/20',
          textColor: 'text-[#FFC857]',
          borderHover: 'hover:border-[#FFC857]'
        }
      ];
    }
    if (role === 'PARENT') {
      return [
        {
          title: 'Academic Progress',
          desc: 'Plain-language progress summaries and mastery breakdown',
          path: '/parent/progress',
          icon: Sparkles,
          color: '#7657F6',
          bg: 'bg-[#7657F6]/20',
          textColor: 'text-[#A78BFA]',
          borderHover: 'hover:border-[#7657F6]'
        },
        {
          title: 'Attendance Alerts',
          desc: 'Real-time school attendance logs & leave notifications',
          path: '/parent/attendance',
          icon: ShieldCheck,
          color: '#10B981',
          bg: 'bg-[#10B981]/20',
          textColor: 'text-[#34D399]',
          borderHover: 'hover:border-[#10B981]'
        },
        {
          title: 'Teacher Notices',
          desc: 'Direct announcements & upcoming board exam milestones',
          path: '/parent/communication',
          icon: BookOpen,
          color: '#FFC857',
          bg: 'bg-[#FFC857]/20',
          textColor: 'text-[#FFC857]',
          borderHover: 'hover:border-[#FFC857]'
        }
      ];
    }
    if (role === 'ADMIN') {
      return [
        {
          title: 'User Management',
          desc: 'Manage Class 10 students, teachers, parents and roles',
          path: '/admin/users',
          icon: Users,
          color: '#FFC857',
          bg: 'bg-[#FFC857]/20',
          textColor: 'text-[#FFC857]',
          borderHover: 'hover:border-[#FFC857]'
        },
        {
          title: 'Class & Sections',
          desc: 'Class 10 section configurations, allocations & teachers',
          path: '/admin/classes',
          icon: BarChart3,
          color: '#3B82F6',
          bg: 'bg-[#3B82F6]/20',
          textColor: 'text-[#60A5FA]',
          borderHover: 'hover:border-[#3B82F6]'
        },
        {
          title: 'System Reports',
          desc: 'Atlas database sync status, exam readiness & audit logs',
          path: '/admin/reports',
          icon: Sparkles,
          color: '#7657F6',
          bg: 'bg-[#7657F6]/20',
          textColor: 'text-[#A78BFA]',
          borderHover: 'hover:border-[#7657F6]'
        }
      ];
    }
    // Default: STUDENT
    return [
      {
        title: 'AI Gap Finder',
        desc: 'Detect root cause weaknesses & prerequisite dependency graphs',
        path: '/student/gap-finder',
        icon: Sparkles,
        color: '#7657F6',
        bg: 'bg-[#7657F6]/20',
        textColor: 'text-[#A78BFA]',
        borderHover: 'hover:border-[#7657F6]'
      },
      {
        title: 'Nexa AI Tutor',
        desc: '5 learning modes in English, Kannada & Hindi with step-by-step guidance',
        path: '/student/tutor',
        icon: Bot,
        color: '#FFC857',
        bg: 'bg-[#FFC857]/20',
        textColor: 'text-[#FFC857]',
        borderHover: 'hover:border-[#FFC857]'
      },
      {
        title: 'Study Materials',
        desc: 'Official KTBS Textbooks, PYQs (2020-2024), Solutions & Notes',
        path: '/student/study-materials',
        icon: BookOpen,
        color: '#10B981',
        bg: 'bg-[#10B981]/20',
        textColor: 'text-[#34D399]',
        borderHover: 'hover:border-[#10B981]'
      }
    ];
  };

  const featureCards = getCardsForRole();

  return (
    <div className="min-h-screen bg-[#0B1020] flex items-center justify-center p-4">
      {/* Background radial glow */}
      <div className="absolute w-[600px] h-[600px] bg-[#7657F6]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-2xl w-full bg-[#171F3A] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl relative z-10 space-y-6">
        {/* Top bar with Logo & Logout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
          <EduNexaLogo
            size="sm"
            subtitle="Karnataka SSLC Class 10"
            onClick={() => navigate('/')}
          />

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#7657F6]/20 text-[#A78BFA] border border-[#7657F6]/30 uppercase">
              {role} Portal
            </span>

            <button
              type="button"
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Welcome Top Banner */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <UserAvatar name={user.name} role={role} size="2xl" rounded="2xl" />
          <div className="text-center sm:text-left space-y-1.5 flex-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome, {user.name}! 👋
            </h1>
            <p className="text-xs text-slate-300">
              Your personalized SSLC learning workspace is live and connected directly to MongoDB Atlas.
            </p>
            <p className="text-[11px] text-slate-400">
              Signed in as: <strong className="text-slate-200">{user.email}</strong>
            </p>
          </div>
        </div>

        {/* SSLC Exam Target Widget */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-[#111831] via-[#1A2342] to-[#111831] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFC857]/20 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 text-[#FFC857]" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Karnataka SSLC Board Exam Preparation</p>
              <p className="text-[11px] text-slate-400">Targeting Distinction (95%+) in KSEAB State Board Exams</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-center px-3 py-1.5 rounded-lg bg-[#0B1020] border border-white/5">
              <span className="text-base font-extrabold text-white">Class 10</span>
              <span className="block text-[9px] text-slate-400 uppercase">Karnataka</span>
            </div>
            <div className="text-center px-3 py-1.5 rounded-lg bg-[#0B1020] border border-white/5">
              <span className="text-base font-extrabold text-[#A78BFA]">6</span>
              <span className="block text-[9px] text-slate-400 uppercase">Subjects</span>
            </div>
          </div>
        </div>

        {/* Quick Launch Recommendations */}
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Choose Your Starting Point (Click to Open Directly):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {featureCards.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.title}
                  type="button"
                  onClick={() => handleProceed(card.path)}
                  className={`p-3.5 rounded-xl bg-[#111831] hover:bg-[#1A2342] border border-white/5 ${card.borderHover} text-left transition-all group cursor-pointer`}
                >
                  <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-4 h-4 ${card.textColor}`} />
                  </div>
                  <p className={`text-xs font-bold text-white group-hover:${card.textColor} transition-colors`}>
                    {card.title}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">
                    {card.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            <span>MongoDB Atlas persistence active</span>
          </div>

          <button
            type="button"
            onClick={() => handleProceed()}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#7657F6] hover:bg-[#6442E8] text-xs font-bold text-white shadow-glow-primary flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Enter Full Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
