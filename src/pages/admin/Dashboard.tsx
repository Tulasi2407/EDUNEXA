import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Users,
  GraduationCap,
  ShieldCheck,
  FolderTree,
  Activity,
  BarChart3,
  Server,
  Sparkles,
  CheckCircle2,
  AlertTriangle
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

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const activityData = [
    { grade: 'Grade 8', students: 180, avgGPA: 3.52 },
    { grade: 'Grade 9', students: 210, avgGPA: 3.64 },
    { grade: 'Grade 10', students: 240, avgGPA: 3.71 },
    { grade: 'Grade 11', students: 110, avgGPA: 3.58 },
    { grade: 'Grade 12', students: 102, avgGPA: 3.69 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#171F3A] to-[#1A2342] border border-[#FFC857]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#FFC857]/20 text-[#FFC857] border border-[#FFC857]/40">
              System Administration
            </span>
            <span className="text-xs text-slate-400">Institutional Governance Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Welcome, {user.name}
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            EduNexa Platform Health: All operational services, AI inference engines, and database synchronization active.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            Gemini AI Connected
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#171F3A] border border-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Total Enrolled Students</p>
            <p className="text-2xl font-bold text-white mt-1">842</p>
            <p className="text-[11px] text-[#10B981] mt-1">+12 this term</p>
          </div>
          <GraduationCap className="w-8 h-8 text-[#7657F6]/40" />
        </div>

        <div className="p-5 rounded-2xl bg-[#171F3A] border border-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Faculty Teachers</p>
            <p className="text-2xl font-bold text-white mt-1">48</p>
            <p className="text-[11px] text-[#A78BFA] mt-1">6 Departments</p>
          </div>
          <Users className="w-8 h-8 text-[#3B82F6]/40" />
        </div>

        <div className="p-5 rounded-2xl bg-[#171F3A] border border-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Registered Parents</p>
            <p className="text-2xl font-bold text-white mt-1">790</p>
            <p className="text-[11px] text-[#10B981] mt-1">94% Connected</p>
          </div>
          <ShieldCheck className="w-8 h-8 text-[#10B981]/40" />
        </div>

        <div className="p-5 rounded-2xl bg-[#171F3A] border border-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Active Classes</p>
            <p className="text-2xl font-bold text-white mt-1">28</p>
            <p className="text-[11px] text-[#FFC857] mt-1">Grades 8 - 12</p>
          </div>
          <FolderTree className="w-8 h-8 text-[#FFC857]/40" />
        </div>
      </div>

      {/* Cross-Grade Academic Distribution Chart */}
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-4">
        <h2 className="text-base font-bold text-white">Student Enrollment & GPA Across Grades</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222D52" />
              <XAxis dataKey="grade" stroke="#A5B0C5" fontSize={11} />
              <YAxis stroke="#A5B0C5" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111831',
                  borderColor: '#FFC857',
                  borderRadius: '0.75rem',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="students" name="Enrolled Students" fill="#7657F6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
