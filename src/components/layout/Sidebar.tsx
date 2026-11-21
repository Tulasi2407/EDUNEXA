import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useEduData } from '../../contexts/DataContext';
import { UserRole } from '../../types';
import {
  LayoutDashboard,
  Sparkles,
  CalendarDays,
  Bot,
  GraduationCap,
  Award,
  CheckSquare,
  FileText,
  Users,
  BarChart3,
  Bell,
  Settings,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  ShieldAlert,
  Flame,
  ChevronRight,
  LogOut,
  FolderTree,
  UserCheck,
  Zap,
  Sliders
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onCloseMobile }) => {
  const { user, role, switchRole, logout } = useAuth();
  const { studentXP, streakDays, learningGaps } = useEduData();

  const unresolvedGaps = learningGaps.filter(g => g.status !== 'RESOLVED').length;

  const getNavLinks = () => {
    switch (role) {
      case 'STUDENT':
        return [
          { to: '/student', label: 'Dashboard', icon: LayoutDashboard },
          {
            to: '/student/gap-finder',
            label: 'AI Gap Finder',
            icon: Sparkles,
            badge: unresolvedGaps > 0 ? `${unresolvedGaps} Gaps` : undefined,
            badgeColor: 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30 animate-pulse'
          },
          { to: '/student/planner', label: 'Study Planner', icon: CalendarDays },
          { to: '/student/tutor', label: 'Nexa AI Tutor', icon: Bot, highlight: true },
          { to: '/student/quiz', label: 'Quizzes & Tests', icon: GraduationCap },
          { to: '/student/practice', label: 'Practice Drills', icon: Zap },
          { to: '/student/pace', label: 'Learning Pace', icon: Sliders },
          { to: '/student/results', label: 'My Results', icon: BarChart3 },
          { to: '/student/attendance', label: 'Attendance', icon: CalendarCheck },
          { to: '/student/assignments', label: 'Assignments', icon: ClipboardList },
          { to: '/student/achievements', label: 'Achievements', icon: Award },
          { to: '/student/profile', label: 'My Profile', icon: UserCheck },
        ];
      case 'TEACHER':
        return [
          { to: '/teacher', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/teacher/students', label: 'Class & Students', icon: Users },
          { to: '/teacher/attendance', label: 'Attendance', icon: CalendarCheck },
          { to: '/teacher/marks', label: 'Marks & Exams', icon: CheckSquare },
          { to: '/teacher/assignments', label: 'Assignments', icon: ClipboardList },
          { to: '/teacher/quiz-builder', label: 'Quiz Builder', icon: BookOpen },
          { to: '/teacher/analytics', label: 'Learning Analytics', icon: BarChart3 },
          { to: '/teacher/announcements', label: 'Announcements', icon: Bell },
          { to: '/teacher/profile', label: 'Profile', icon: UserCheck },
        ];
      case 'PARENT':
        return [
          { to: '/parent', label: 'Child Overview', icon: LayoutDashboard },
          { to: '/parent/progress', label: 'Academic Progress', icon: BarChart3 },
          { to: '/parent/attendance', label: 'Attendance Records', icon: CalendarCheck },
          { to: '/parent/communication', label: 'Teacher Notices', icon: Bell },
          { to: '/parent/profile', label: 'Family Profile', icon: UserCheck },
        ];
      case 'ADMIN':
        return [
          { to: '/admin', label: 'Platform Overview', icon: LayoutDashboard },
          { to: '/admin/users', label: 'User Directory', icon: Users },
          { to: '/admin/classes', label: 'Classes & Courses', icon: FolderTree },
          { to: '/admin/reports', label: 'System Reports', icon: FileText },
          { to: '/admin/settings', label: 'Platform Settings', icon: Settings },
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#111831] border-r border-white/5 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7657F6] to-[#A78BFA] flex items-center justify-center shadow-glow-primary">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white">EduNexa</span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#7657F6]/30 text-[#A78BFA] border border-[#7657F6]/40">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Smart Learning System</p>
            </div>
          </div>
        </div>

        {/* Current Active Role Indicator */}
        <div className="px-5 py-3 bg-[#0B1020]/40 border-b border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Active Role</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
              role === 'STUDENT' ? 'bg-[#7657F6]/20 text-[#A78BFA] border border-[#7657F6]/40' :
              role === 'TEACHER' ? 'bg-[#3B82F6]/20 text-[#60A5FA] border border-[#3B82F6]/40' :
              role === 'PARENT' ? 'bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40' :
              'bg-[#FFC857]/20 text-[#FFC857] border border-[#FFC857]/40'
            }`}>
              {role}
            </span>
          </div>
        </div>

        {/* Nav Links List */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/student' || item.to === '/teacher' || item.to === '/parent' || item.to === '/admin'}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#7657F6] text-white shadow-glow-primary'
                      : item.highlight
                      ? 'bg-[#7657F6]/10 text-[#A78BFA] hover:bg-[#7657F6]/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor || 'bg-white/10 text-white'}`}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Gamification footer card (for students) */}
        {role === 'STUDENT' && (
          <div className="p-3 mx-3 mb-2 rounded-xl bg-gradient-to-br from-[#171F3A] to-[#1A2342] border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#FFC857]" />
                <span className="text-xs font-bold text-white">{streakDays} Day Streak</span>
              </div>
              <span className="text-[11px] font-extrabold text-[#A78BFA]">{studentXP.toLocaleString()} XP</span>
            </div>
            <div className="w-full bg-[#0B1020] h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-[#7657F6] to-[#FFC857] h-full rounded-full" style={{ width: '72%' }} />
            </div>
            <p className="text-[10px] text-slate-400 mt-1.5 flex justify-between">
              <span>Level 14 Scholar</span>
              <span>150 XP to Level 15</span>
            </p>
          </div>
        )}

        {/* User Card & Demo Quick-Switch */}
        <div className="p-3 border-t border-white/5 bg-[#0B1020]/60">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#7657F6]/40"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{user.name}</p>
              <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
            </div>
            <NavLink
              to="/login"
              title="Logout / Change Account"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </NavLink>
          </div>

          {/* Quick Demo Switcher Pills */}
          <div className="pt-2 border-t border-white/5">
            <p className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Quick Role Switch</p>
            <div className="grid grid-cols-4 gap-1">
              {(['STUDENT', 'TEACHER', 'PARENT', 'ADMIN'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => switchRole(r)}
                  className={`text-[9px] font-bold py-1 rounded transition-colors ${
                    role === r
                      ? 'bg-[#7657F6] text-white shadow-sm'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {r.slice(0, 4)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
