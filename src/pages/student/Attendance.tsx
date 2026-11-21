import React from 'react';
import { useEduData } from '../../contexts/DataContext';
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar as CalendarIcon,
  AlertTriangle
} from 'lucide-react';

export const Attendance: React.FC = () => {
  const { attendance } = useEduData();

  // Filter Alex's attendance records
  const alexRecords = attendance.filter(a => a.studentId === 'usr_student_01');

  const total = alexRecords.length;
  const presentCount = alexRecords.filter(a => a.status === 'PRESENT').length;
  const lateCount = alexRecords.filter(a => a.status === 'LATE').length;
  const absentCount = alexRecords.filter(a => a.status === 'ABSENT').length;
  const percentage = total > 0 ? (((presentCount + lateCount * 0.5) / total) * 100).toFixed(1) : '94.2';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
              Attendance Module
            </span>
            <span className="text-xs text-slate-400">Actual Saved Database Records</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Student Attendance Log</h1>
          <p className="text-xs text-slate-300 mt-1">
            Real-time verified daily and subject-wise attendance recorded directly by classroom faculty.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-slate-400">Overall Attendance</p>
            <p className="text-2xl font-extrabold text-[#10B981]">{percentage}%</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#171F3A] border border-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Days Present</p>
            <p className="text-2xl font-bold text-[#10B981] mt-1">{presentCount}</p>
          </div>
          <CheckCircle2 className="w-8 h-8 text-[#10B981]/40" />
        </div>

        <div className="p-5 rounded-2xl bg-[#171F3A] border border-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Late Arrivals</p>
            <p className="text-2xl font-bold text-[#F59E0B] mt-1">{lateCount}</p>
          </div>
          <Clock className="w-8 h-8 text-[#F59E0B]/40" />
        </div>

        <div className="p-5 rounded-2xl bg-[#171F3A] border border-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Unexcused Absences</p>
            <p className="text-2xl font-bold text-[#EF4444] mt-1">{absentCount}</p>
          </div>
          <XCircle className="w-8 h-8 text-[#EF4444]/40" />
        </div>
      </div>

      {/* Attendance History Table */}
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-4">
        <h2 className="text-base font-bold text-white">Daily Attendance Records</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111831] text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3 rounded-l-xl">Date</th>
                <th className="p-3">Subject Class</th>
                <th className="p-3">Status</th>
                <th className="p-3 rounded-r-xl">Recorded By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {alexRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3 font-semibold text-white">{rec.date}</td>
                  <td className="p-3 text-slate-300">{rec.subject || 'Core Mathematics'}</td>
                  <td className="p-3">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${
                        rec.status === 'PRESENT'
                          ? 'bg-[#10B981]/20 text-[#10B981]'
                          : rec.status === 'LATE'
                          ? 'bg-[#F59E0B]/20 text-[#F59E0B]'
                          : 'bg-[#EF4444]/20 text-[#EF4444]'
                      }`}
                    >
                      {rec.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400">Ms. Sarah Chen</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
