import React from 'react';
import { useEduData } from '../../contexts/DataContext';
import { BarChart3, TrendingUp, CheckCircle2, AlertTriangle, BookOpen } from 'lucide-react';

export const ParentProgress: React.FC = () => {
  const { subjects, learningGaps } = useEduData();

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5">
        <h1 className="text-2xl font-extrabold text-white">Alex's Subject-by-Subject Academic Growth</h1>
        <p className="text-xs text-slate-300 mt-1">
          Plain-language explanations of curriculum mastery without overwhelming technical jargon.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjects.map(s => (
          <div key={s.id} className="p-5 rounded-2xl bg-[#171F3A] border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">{s.name}</h3>
              <span className="text-sm font-extrabold text-[#10B981]">{s.currentScore}% Proficiency</span>
            </div>

            <div className="w-full bg-[#111831] h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#7657F6] to-[#10B981] h-full rounded-full"
                style={{ width: `${s.currentScore}%` }}
              />
            </div>

            <div className="text-xs text-slate-300 space-y-1">
              <p>Faculty Instructor: <strong className="text-white">{s.teacherName}</strong></p>
              <p>Curriculum Progress: {s.completedChapters} of {s.totalChapters} chapters mastered</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
