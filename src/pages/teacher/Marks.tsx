import React, { useState } from 'react';
import { useEduData } from '../../contexts/DataContext';
import { CLASS_ROSTER } from '../../data/mockData';
import {
  CheckSquare,
  Save,
  CheckCircle2,
  TrendingUp,
  Award
} from 'lucide-react';

export const TeacherMarks: React.FC = () => {
  const { addOrUpdateMark, marks } = useEduData();

  const [examName, setExamName] = useState('Mid-Term Assessment');
  const [subject, setSubject] = useState('Mathematics');

  // Input states for each student
  const [scores, setScores] = useState<Record<string, { marks: number; feedback: string }>>({
    usr_student_01: { marks: 74, feedback: 'Solid arithmetic, needs revision on negative linear equations.' },
    usr_student_02: { marks: 96, feedback: 'Outstanding problem solving precision.' },
    usr_student_03: { marks: 62, feedback: 'Frequent calculation errors in multi-step problems.' },
    usr_student_04: { marks: 88, feedback: 'Great performance in geometric proofs.' },
    usr_student_05: { marks: 90, feedback: 'Consistent accuracy across all sections.' },
  });

  const calculateGrade = (score: number) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    return 'D';
  };

  const handleScoreChange = (id: string, val: number) => {
    setScores(prev => ({
      ...prev,
      [id]: { ...prev[id], marks: val }
    }));
  };

  const handleFeedbackChange = (id: string, val: string) => {
    setScores(prev => ({
      ...prev,
      [id]: { ...prev[id], feedback: val }
    }));
  };

  const handlePublishAll = () => {
    CLASS_ROSTER.forEach(s => {
      const data = scores[s.id] || { marks: 75, feedback: 'Satisfactory performance.' };
      addOrUpdateMark({
        id: `mrk_${Date.now()}_${s.id}`,
        studentId: s.id,
        studentName: s.name,
        examName,
        subject,
        marksObtained: data.marks,
        totalMarks: 100,
        grade: calculateGrade(data.marks),
        feedback: data.feedback,
        date: new Date().toISOString().split('T')[0]
      });
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#7657F6]/20 text-[#A78BFA] border border-[#7657F6]/40">
              Examination Module
            </span>
            <span className="text-xs text-slate-400">Section 11 of Master Prompt</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Marks & Gradebook Management</h1>
          <p className="text-xs text-slate-300 mt-1">
            Enter examination scores and qualitative pedagogical feedback. Grades auto-calculate and synchronize with student and parent portals.
          </p>
        </div>

        <button
          onClick={handlePublishAll}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#7657F6] hover:bg-[#6442E8] text-xs font-bold text-white shadow-glow-primary transition-all hover:scale-105"
        >
          <Save className="w-4 h-4" />
          <span>Publish Results to Portals</span>
        </button>
      </div>

      {/* Exam Selector */}
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-300">Examination Name</label>
          <select
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7657F6]"
          >
            <option>Mid-Term Assessment</option>
            <option>Unit Test 2</option>
            <option>Algebra Diagnostic Quiz</option>
            <option>Final Term Mock</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-300">Subject</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7657F6]"
          >
            <option>Kannada</option>
            <option>English</option>
            <option>Hindi</option>
            <option>Mathematics</option>
            <option>Science</option>
            <option>Social Science</option>
          </select>
        </div>
      </div>

      {/* Marks Table */}
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111831] text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3 rounded-l-xl">Student Name</th>
                <th className="p-3">Marks Obtained (/100)</th>
                <th className="p-3">Calculated Grade</th>
                <th className="p-3 rounded-r-xl">Teacher Feedback & Action Items</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {CLASS_ROSTER.map((st) => {
                const item = scores[st.id] || { marks: 75, feedback: '' };
                const grade = calculateGrade(item.marks);
                return (
                  <tr key={st.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-bold text-white">{st.name}</td>
                    <td className="p-3">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={item.marks}
                        onChange={(e) => handleScoreChange(st.id, parseInt(e.target.value) || 0)}
                        className="w-24 px-3 py-1.5 rounded-lg bg-[#111831] border border-white/10 text-xs text-white font-bold text-center focus:outline-none focus:border-[#7657F6]"
                      />
                    </td>
                    <td className="p-3">
                      <span className="font-extrabold px-2.5 py-1 rounded bg-[#7657F6]/20 text-[#A78BFA]">
                        {grade}
                      </span>
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={item.feedback}
                        onChange={(e) => handleFeedbackChange(st.id, e.target.value)}
                        placeholder="Add targeted learning advice..."
                        className="w-full px-3 py-1.5 rounded-lg bg-[#111831] border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-[#7657F6]"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
