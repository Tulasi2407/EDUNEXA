import React, { useState } from 'react';
import { useEduData } from '../../contexts/DataContext';
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  UploadCloud,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AssignmentItem {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  points: number;
  status: 'PENDING' | 'SUBMITTED' | 'GRADED';
  grade?: string;
}

export const Assignments: React.FC = () => {
  const { addXP, addToast } = useEduData();

  const [assignmentList, setAssignmentList] = useState<AssignmentItem[]>([
    {
      id: 'asg_01',
      title: 'Linear Equation Word Problems & Prerequisite Drill',
      subject: 'Mathematics',
      dueDate: 'Tomorrow, 11:59 PM',
      points: 100,
      status: 'PENDING'
    },
    {
      id: 'asg_02',
      title: 'Ray Optics Mirror Formula Numerical Set',
      subject: 'Science',
      dueDate: 'Nov 25, 2026',
      points: 50,
      status: 'PENDING'
    },
    {
      id: 'asg_03',
      title: 'Social Science: European Expansion Treaty Analysis',
      subject: 'Social Science',
      dueDate: 'Nov 18, 2026',
      points: 50,
      status: 'GRADED',
      grade: '48 / 50 (A)'
    },
    {
      id: 'asg_04',
      title: 'English: Reported Speech & Active-Passive Worksheet',
      subject: 'English',
      dueDate: 'Nov 15, 2026',
      points: 40,
      status: 'GRADED',
      grade: '38 / 40 (A)'
    }
  ]);

  const handleSimulateSubmit = (id: string, title: string) => {
    setAssignmentList(prev =>
      prev.map(a => (a.id === id ? { ...a, status: 'SUBMITTED' } : a))
    );
    addXP(50, `Submitted Assignment: ${title}`);
    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch (e) {}
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#7657F6]/20 text-[#A78BFA] border border-[#7657F6]/30">
              Coursework Hub
            </span>
            <span className="text-xs text-slate-400">2 Pending Submissions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Assignments & Homework</h1>
          <p className="text-xs text-slate-300 mt-1">
            Submit coursework online with instant confirmation and track teacher review feedback.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assignmentList.map((asg) => (
          <div
            key={asg.id}
            className="p-5 rounded-2xl bg-[#171F3A] border border-white/5 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#A78BFA]">{asg.subject}</span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    asg.status === 'PENDING'
                      ? 'bg-[#F59E0B]/20 text-[#F59E0B]'
                      : asg.status === 'SUBMITTED'
                      ? 'bg-[#3B82F6]/20 text-[#60A5FA]'
                      : 'bg-[#10B981]/20 text-[#10B981]'
                  }`}
                >
                  {asg.status}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mt-2">{asg.title}</h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Due: {asg.dueDate}</span>
                <span>•</span>
                <span>{asg.points} Points</span>
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              {asg.status === 'PENDING' ? (
                <button
                  onClick={() => handleSimulateSubmit(asg.id, asg.title)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7657F6] hover:bg-[#6442E8] text-xs font-bold text-white shadow-glow-primary transition-all"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Submit Assignment (+50 XP)</span>
                </button>
              ) : asg.status === 'SUBMITTED' ? (
                <span className="text-xs text-[#60A5FA] flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> Awaiting Teacher Grading
                </span>
              ) : (
                <span className="text-xs text-[#10B981] font-bold">
                  Score: {asg.grade}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
