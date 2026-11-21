import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useEduData } from '../../contexts/DataContext';
import {
  Users,
  CalendarCheck,
  CheckSquare,
  Sparkles,
  AlertTriangle,
  TrendingUp,
  BrainCircuit,
  ArrowRight,
  BookOpen,
  Bell,
  ChevronRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { CLASS_ROSTER } from '../../data/mockData';

export const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const { learningGaps } = useEduData();
  const navigate = useNavigate();

  const attentionStudents = CLASS_ROSTER.filter(s => s.status.includes('Needs Attention'));

  const classPerformance = [
    { subject: 'Algebra', classAvg: 76, target: 85 },
    { subject: 'Geometry', classAvg: 88, target: 85 },
    { subject: 'Optics', classAvg: 81, target: 85 },
    { subject: 'Mechanics', classAvg: 84, target: 85 },
    { subject: 'Thermodynamics', classAvg: 79, target: 85 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#171F3A] to-[#1A2342] border border-[#3B82F6]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#3B82F6]/20 text-[#60A5FA] border border-[#3B82F6]/40">
              Teacher Faculty Cockpit
            </span>
            <span className="text-xs text-slate-400">Department: Mathematics & Natural Sciences</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Welcome, {user.name}
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Monitoring Grade 10-A & Grade 9-B. 2 students flagged today with foundational prerequisite gaps.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/teacher/attendance')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#3B82F6] hover:bg-blue-600 text-xs font-bold text-white shadow-lg transition-all"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Mark Attendance</span>
          </button>
          <button
            onClick={() => navigate('/teacher/marks')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors"
          >
            <CheckSquare className="w-4 h-4 text-[#FFC857]" />
            <span>Input Marks</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#171F3A] border border-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Total Enrolled</p>
            <p className="text-2xl font-bold text-white mt-1">124 Students</p>
            <p className="text-[11px] text-slate-400 mt-1">4 Active Sections</p>
          </div>
          <Users className="w-8 h-8 text-[#7657F6]/40" />
        </div>

        <div className="p-5 rounded-2xl bg-[#171F3A] border border-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Today's Attendance</p>
            <p className="text-2xl font-bold text-[#10B981] mt-1">95.2%</p>
            <p className="text-[11px] text-[#10B981] mt-1">Above target (92%)</p>
          </div>
          <CalendarCheck className="w-8 h-8 text-[#10B981]/40" />
        </div>

        <div className="p-5 rounded-2xl bg-[#171F3A] border border-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Students Flagged</p>
            <p className="text-2xl font-bold text-[#EF4444] mt-1">{attentionStudents.length} Students</p>
            <p className="text-[11px] text-[#EF4444] mt-1">Prerequisite gaps detected</p>
          </div>
          <AlertTriangle className="w-8 h-8 text-[#EF4444]/40" />
        </div>

        <div className="p-5 rounded-2xl bg-[#171F3A] border border-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Class Average GPA</p>
            <p className="text-2xl font-bold text-[#FFC857] mt-1">3.61 / 4.0</p>
            <p className="text-[11px] text-slate-400 mt-1">Mid-term benchmark</p>
          </div>
          <TrendingUp className="w-8 h-8 text-[#FFC857]/40" />
        </div>
      </div>

      {/* Flagged Students Requiring Attention (Pedagogical Interventions) */}
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-[#EF4444]/30 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-[#EF4444]" />
            <h2 className="text-base font-bold text-white">Students Requiring Immediate Support (AI Diagnostic)</h2>
          </div>
          <button
            onClick={() => navigate('/teacher/students')}
            className="text-xs text-[#A78BFA] hover:text-white font-semibold"
          >
            View Full Roster →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {attentionStudents.map((st) => (
            <div
              key={st.id}
              className="p-4 rounded-xl bg-[#111831] border border-white/5 flex items-start justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">{st.name}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EF4444]/20 text-[#EF4444]">
                    {st.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Identified Weakness: <strong className="text-slate-200">{st.weakTopic}</strong>
                </p>
                <p className="text-xs text-slate-400">
                  GPA: {st.gpa} • Attendance: {st.attendance}%
                </p>
              </div>

              <button
                onClick={() => navigate('/teacher/students')}
                className="px-3 py-1.5 rounded-lg bg-[#7657F6]/20 hover:bg-[#7657F6]/30 text-xs font-semibold text-[#A78BFA] whitespace-nowrap"
              >
                Inspect Analytics
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Class Topic Performance Chart */}
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-4">
        <h2 className="text-base font-bold text-white">Class Proficiency by Topic</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={classPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222D52" />
              <XAxis dataKey="subject" stroke="#A5B0C5" fontSize={11} />
              <YAxis stroke="#A5B0C5" fontSize={11} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111831',
                  borderColor: '#3B82F6',
                  borderRadius: '0.75rem',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="classAvg" name="Class Average %" fill="#3B82F6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
