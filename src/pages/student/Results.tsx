import React from 'react';
import { useEduData } from '../../contexts/DataContext';
import {
  BarChart3,
  TrendingUp,
  Award,
  CheckCircle2,
  Calendar,
  FileText,
  Download,
  Sparkles,
  Milestone,
  ArrowRight,
  BrainCircuit,
  Target
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
  const { marks, subjects, addToast } = useEduData();

  // Filter Alex's marks
  const alexMarks = marks.filter(m => m.studentId === 'usr_student_01');

  const historyData = [
    { exam: 'Unit 1', math: 68, science: 78, social: 85 },
    { exam: 'Mid-Term', math: 74, science: 82, social: 88 },
    { exam: 'Unit 2', math: 78, science: 85, social: 92 },
    { exam: 'Diag Quiz', math: 85, science: 88, social: 94 },
  ];

  const handleExportReport = (type: 'Weekly' | 'Monthly') => {
    addToast(`Exported Alex Johnson's ${type} Academic Growth & Gap Audit Report (PDF)`, 'success');
  };

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

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExportReport('Weekly')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#A78BFA]" />
            <span>Weekly Report (PDF)</span>
          </button>
          <button
            onClick={() => handleExportReport('Monthly')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7657F6] hover:bg-[#6442E8] text-xs font-bold text-white shadow-glow-primary transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Monthly Growth Audit</span>
          </button>
        </div>
      </div>

      {/* TEQORA Objective 8: My Learning Journey Timeline */}
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-[#7657F6]/30 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFC857]/20 text-[#FFC857]">
                TEQORA Objective 8
              </span>
              <h2 className="text-base font-bold text-white">My Learning Journey</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Where you started, skills conquered, and next milestone targets</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#111831] border border-white/5 space-y-2">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase">1. Where You Started</span>
            <p className="text-xs font-bold text-white">Grade 9 Diagnostic Baseline</p>
            <p className="text-[11px] text-slate-400">
              Initial diagnostic score: 68% average with conceptual hesitation in Algebra.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#111831] border border-white/5 space-y-2">
            <span className="text-[10px] font-extrabold text-[#10B981] uppercase">2. Improved Areas</span>
            <p className="text-xs font-bold text-[#10B981]">+18.5% Net Growth</p>
            <p className="text-[11px] text-slate-300">
              Optics (+24%), Redox Reactions (+18%), and Triangle Proofs (+14%) fully mastered.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#111831] border border-white/5 space-y-2">
            <span className="text-[10px] font-extrabold text-[#EF4444] uppercase">3. Remaining Needs</span>
            <p className="text-xs font-bold text-[#EF4444]">Negative Sign Division</p>
            <p className="text-[11px] text-slate-300">
              Linear Equations Node 2 prerequisite remediation at 40% complete.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#111831] border border-[#7657F6]/40 space-y-2">
            <span className="text-[10px] font-extrabold text-[#A78BFA] uppercase">4. What To Study Next</span>
            <p className="text-xs font-bold text-white">Quadratic Trinomials</p>
            <p className="text-[11px] text-slate-300">
              Scheduled for Saturday 10:00 AM after final prerequisite check.
            </p>
          </div>
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
              <Line type="monotone" dataKey="science" name="Science" stroke="#3B82F6" strokeWidth={3} />
              <Line type="monotone" dataKey="social" name="Social Science" stroke="#10B981" strokeWidth={3} />
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
