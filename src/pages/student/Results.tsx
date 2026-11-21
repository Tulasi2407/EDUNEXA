import React from 'react';
import { useEduData } from '../../contexts/DataContext';
import {
  BarChart3,
  TrendingUp,
  Award,
  CheckCircle2,
  Calendar,
  FileText
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid
} from 'recharts';

export const Results: React.FC = () => {
  const { marks, subjects } = useEduData();

  // Filter Alex's marks
  const alexMarks = marks.filter(m => m.studentId === 'usr_student_01');

  const historyData = [
    { exam: 'Unit 1', math: 68, physics: 78, chemistry: 85 },
    { exam: 'Mid-Term', math: 74, physics: 82, chemistry: 88 },
    { exam: 'Unit 2', math: 78, physics: 85, chemistry: 92 },
    { exam: 'Diag Quiz', math: 85, physics: 88, chemistry: 94 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
              Academic Transcript
            </span>
            <span className="text-xs text-slate-400">Cumulative GPA: 3.78</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">My Results & Examination History</h1>
          <p className="text-xs text-slate-300 mt-1">
            Track multi-exam trajectory, subject mastery trends, and verified teacher feedback.
          </p>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-4">
        <h2 className="text-base font-bold text-white">Multi-Assessment Improvement Curve</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222D52" />
              <XAxis dataKey="exam" stroke="#A5B0C5" fontSize={11} />
              <YAxis stroke="#A5B0C5" fontSize={11} domain={[50, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111831',
                  borderColor: '#7657F6',
                  borderRadius: '0.75rem',
                  fontSize: '12px'
                }}
              />
              <Line type="monotone" dataKey="math" name="Mathematics" stroke="#7657F6" strokeWidth={3} />
              <Line type="monotone" dataKey="physics" name="Physics" stroke="#3B82F6" strokeWidth={3} />
              <Line type="monotone" dataKey="chemistry" name="Chemistry" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Marks Records Table */}
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-4">
        <h2 className="text-base font-bold text-white">Recorded Examination Marks</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111831] text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3 rounded-l-xl">Exam Name</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Score</th>
                <th className="p-3">Grade</th>
                <th className="p-3">Date</th>
                <th className="p-3 rounded-r-xl">Teacher Feedback</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {alexMarks.map((m) => (
                <tr key={m.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3 font-bold text-white">{m.examName}</td>
                  <td className="p-3 text-slate-300">{m.subject}</td>
                  <td className="p-3 font-extrabold text-[#FFC857]">{m.marksObtained} / {m.totalMarks}</td>
                  <td className="p-3">
                    <span className="font-bold px-2 py-0.5 rounded bg-[#7657F6]/20 text-[#A78BFA]">
                      {m.grade}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400">{m.date}</td>
                  <td className="p-3 text-slate-300 italic">{m.feedback || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
