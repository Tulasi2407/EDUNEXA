import React from 'react';
import { useEduData } from '../../contexts/DataContext';
import { CalendarCheck, CheckCircle2, Clock, XCircle, Bell } from 'lucide-react';

export const ParentAttendance: React.FC = () => {
  const { attendance } = useEduData();
  const alexRecords = attendance.filter(a => a.studentId === 'usr_student_01');

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5">
        <h1 className="text-2xl font-extrabold text-white">Alex's Verified Attendance History</h1>
        <p className="text-xs text-slate-300 mt-1">Direct classroom records entered daily by course instructors.</p>
      </div>

      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Daily Log Records</h2>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#10B981]/20 text-[#10B981]">
            94.2% Overall Attendance
          </span>
        </div>

        <div className="space-y-3">
          {alexRecords.map(rec => (
            <div key={rec.id} className="p-4 rounded-xl bg-[#111831] border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white">{rec.date}</span>
                <p className="text-[11px] text-slate-400 mt-0.5">Subject: {rec.subject || 'Core Mathematics'}</p>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
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
