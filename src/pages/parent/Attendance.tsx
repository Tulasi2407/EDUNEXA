import React from 'react';
import { useEduData } from '../../contexts/DataContext';
import { CalendarCheck, CheckCircle2, Clock, XCircle, Bell } from 'lucide-react';

const TEACHER_MAP: Record<string, string> = {
  Kannada: 'ಶ್ರೀ ರಮೇಶ್ ಭಟ್',
  English: 'Ms. Claire Harper',
  Hindi: 'श्रीमती सुनीता शर्मा',
  Mathematics: 'Ms. Sarah Chen',
  Science: 'Dr. Marcus Vance',
  'Social Science': 'Mrs. Anita Rao'
};

export const ParentAttendance: React.FC = () => {
  const { attendance } = useEduData();
  const alexRecords = attendance.filter(a => a.studentId === 'usr_student_01');

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
              Verified Attendance
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#FFC857]/20 text-[#FFC857] border border-[#FFC857]/30">
              Karnataka SSLC Class 10
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1">Alex's Verified Attendance History</h1>
          <p className="text-xs text-slate-300 mt-1">Official daily records entered directly by KSEAB subject teachers.</p>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-400">Term Attendance</p>
          <span className="text-xl font-extrabold text-[#10B981]">
            94.2%
          </span>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Daily Board Subject Attendance Records</h2>
          <span className="text-xs text-slate-400">Class 10 - Section A</span>
        </div>

        <div className="space-y-3">
          {alexRecords.map(rec => (
            <div key={rec.id} className="p-4 rounded-xl bg-[#111831] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{rec.date}</span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#7657F6]/20 text-[#A78BFA] border border-[#7657F6]/30">
                    {rec.subject}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Faculty: {(rec.subject && TEACHER_MAP[rec.subject]) || 'Ms. Sarah Chen'}</p>
              </div>
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full w-fit ${
                rec.status === 'PRESENT'
                  ? 'bg-[#10B981]/20 text-[#10B981]'
                  : rec.status === 'LATE'
                  ? 'bg-[#F59E0B]/20 text-[#F59E0B]'
                  : 'bg-[#EF4444]/20 text-[#EF4444]'
              }`}>
                {rec.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
