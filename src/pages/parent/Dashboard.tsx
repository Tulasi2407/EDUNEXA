import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useEduData } from '../../contexts/DataContext';
import {
  Heart,
  TrendingUp,
  CalendarCheck,
  BrainCircuit,
  Award,
  BookOpen,
  Bell,
  Clock,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const ParentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { learningGaps, studyPlan, attendance, marks, announcements } = useEduData();
  const navigate = useNavigate();

  const alexGaps = learningGaps.filter(g => g.status !== 'RESOLVED');
  const parentNotices = announcements.filter(a => a.targetRole === 'ALL' || a.targetRole === 'PARENTS');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#171F3A] to-[#1A2342] border border-[#10B981]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40">
              Parent Insights Portal
            </span>
            <span className="text-xs text-slate-400">Linked Student: <strong>Alex Johnson (Grade 10-A)</strong></span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Hello, {user.name}
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            A clear, jargon-free view into Alex's academic wellbeing, learning milestones, and home support recommendations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/parent/communication')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#10B981] hover:bg-emerald-600 text-xs font-bold text-white shadow-lg transition-all"
          >
            <Bell className="w-4 h-4" />
            <span>Teacher Notices</span>
          </button>
        </div>
      </div>

      {/* 3 Plain-Language Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#171F3A] border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">Overall Academic Health</span>
            <TrendingUp className="w-4 h-4 text-[#10B981]" />
          </div>
          <p className="text-2xl font-bold text-white">Doing Great (Grade A)</p>
          <p className="text-xs text-slate-300">
            Alex is maintaining strong scores across Science and English. Extra practice is underway for Math equations.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#171F3A] border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">School Attendance</span>
            <CalendarCheck className="w-4 h-4 text-[#10B981]" />
          </div>
          <p className="text-2xl font-bold text-[#10B981]">94.2% Verified</p>
          <p className="text-xs text-slate-300">
            Alex has attended all morning classes this week on time with consistent participation.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#171F3A] border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">Study Plan Consistency</span>
            <Clock className="w-4 h-4 text-[#FFC857]" />
          </div>
          <p className="text-2xl font-bold text-[#FFC857]">
            {studyPlan.completedHours}h completed
          </p>
          <p className="text-xs text-slate-300">
            Alex followed 85% of their scheduled study blocks with an active 8-day learning streak!
          </p>
        </div>
      </div>

      {/* Actionable Advice: How Parents Can Help at Home (Section 13) */}
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-[#7657F6]/30 space-y-4">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-[#EF4444]" />
          <h2 className="text-base font-bold text-white">How You Can Support Alex at Home This Week</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#111831] border border-white/5 space-y-2">
            <span className="text-xs font-bold text-[#FFC857]">Target Focus: Algebra Negative Signs</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              EduNexa AI detected that Alex understands algebraic rules well, but occasionally slips on negative integer division (e.g. dividing -21 by -3). Encourage 15 minutes of quick mental math games before dinner!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#111831] border border-white/5 space-y-2">
            <span className="text-xs font-bold text-[#10B981]">Celebration: Physics Wave Optics</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Alex scored in the top 10% of their class on the latest light reflection quiz. Be sure to acknowledge their hard work!
            </p>
          </div>
        </div>
      </div>

      {/* Recent Examination Results */}
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-4">
        <h2 className="text-base font-bold text-white">Recent Exam Grades & Teacher Notes</h2>
        <div className="space-y-3">
          {marks.filter(m => m.studentId === 'usr_student_01').map(m => (
            <div key={m.id} className="p-4 rounded-xl bg-[#111831] border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white">{m.subject} • {m.examName}</span>
                <p className="text-xs text-slate-400 mt-0.5">Teacher Note: "{m.feedback}"</p>
              </div>
              <span className="text-sm font-extrabold text-[#FFC857]">{m.marksObtained}/100 ({m.grade})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
