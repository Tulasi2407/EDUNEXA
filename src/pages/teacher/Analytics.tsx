import React from 'react';
import {
  BarChart3,
  BrainCircuit,
  TrendingUp,
  AlertTriangle,
  PieChart as PieIcon,
  CheckCircle2
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

export const TeacherAnalytics: React.FC = () => {
  const topicGapsData = [
    { topic: 'Linear Equations', failureRate: 42, affectedStudents: 8 },
    { topic: 'Spherical Mirrors', failureRate: 28, affectedStudents: 5 },
    { topic: 'Redox Balancing', failureRate: 22, affectedStudents: 4 },
    { topic: 'Triangles Similarity', failureRate: 15, affectedStudents: 3 },
    { topic: 'Cell Respiration', failureRate: 12, affectedStudents: 2 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#3B82F6]/20 text-[#60A5FA] border border-[#3B82F6]/40">
              Pedagogical Insights
            </span>
            <span className="text-xs text-slate-400">Class 10-A Diagnostic Aggregate</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Learning Gap & Mastery Analytics</h1>
          <p className="text-xs text-slate-300 mt-1">
            Aggregated diagnostic data isolating systemic prerequisite blockers across the entire cohort.
          </p>
        </div>
      </div>

      {/* Topic Failure Distribution Chart */}
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-[#EF4444]" />
          <span>Cohort Prerequisite Failure Frequency</span>
        </h2>
        <p className="text-xs text-slate-400">
          Topics with highest diagnostic failure rates requiring classroom-wide review
        </p>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topicGapsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222D52" />
              <XAxis dataKey="topic" stroke="#A5B0C5" fontSize={11} />
              <YAxis stroke="#A5B0C5" fontSize={11} domain={[0, 50]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111831',
                  borderColor: '#EF4444',
                  borderRadius: '0.75rem',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="failureRate" name="Failure Rate %" fill="#EF4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pedagogical Action Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-[#111831] border border-white/5 space-y-3">
          <div className="flex items-center gap-2 text-[#FFC857]">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="text-sm font-bold text-white">Recommended Cohort Review</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Over <strong>42% of students</strong> in Grade 10-A exhibited hesitation or errors when dividing linear equations by negative numbers.
            A 20-minute recap of signed number multiplication is recommended before advancing to simultaneous linear systems.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#111831] border border-white/5 space-y-3">
          <div className="flex items-center gap-2 text-[#10B981]">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="text-sm font-bold text-white">Cohort Strengths</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Geometric similarity proofs and chemical bonding fundamentals demonstrated a <strong>91% mastery rate</strong> across all active assessments.
          </p>
        </div>
      </div>
    </div>
  );
};
