import React, { useState } from 'react';
import { useEduData } from '../../contexts/DataContext';
import { CLASS_ROSTER } from '../../data/mockData';
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Save,
  Users,
  Calendar
} from 'lucide-react';

export const TeacherAttendance: React.FC = () => {
  const { recordAttendance } = useEduData();
  const [selectedClass, setSelectedClass] = useState('Grade 10 - Section A');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Attendance map: studentId -> 'PRESENT' | 'ABSENT' | 'LATE'
  const [statuses, setStatuses] = useState<Record<string, 'PRESENT' | 'ABSENT' | 'LATE'>>({
    usr_student_01: 'PRESENT',
    usr_student_02: 'PRESENT',
    usr_student_03: 'LATE',
    usr_student_04: 'PRESENT',
    usr_student_05: 'PRESENT',
  });

  const handleToggle = (studentId: string, status: 'PRESENT' | 'ABSENT' | 'LATE') => {
    setStatuses(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSave = () => {
    const records = CLASS_ROSTER.map(s => ({
      id: `att_${Date.now()}_${s.id}`,
      studentId: s.id,
      studentName: s.name,
      date: selectedDate,
      status: statuses[s.id] || 'PRESENT',
      subject: selectedSubject
    }));
    recordAttendance(records);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#3B82F6]/20 text-[#60A5FA] border border-[#3B82F6]/40">
              Attendance Module
            </span>
            <span className="text-xs text-slate-400">Section 10 of Master Prompt</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Mark Classroom Attendance</h1>
          <p className="text-xs text-slate-300 mt-1">
            Recorded daily attendance writes directly to the shared persistent state, updating Student and Parent dashboards instantly.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#10B981] hover:bg-emerald-600 text-xs font-bold text-white shadow-lg transition-all hover:scale-105"
        >
          <Save className="w-4 h-4" />
          <span>Save Today's Attendance</span>
        </button>
      </div>

      {/* Class & Date Filter Bar */}
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-300">Select Class</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
          >
            <option>Grade 10 - Section A</option>
            <option>Grade 9 - Section B</option>
            <option>Grade 11 - Advanced Physics</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-300">Subject Session</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
          >
            <option>Mathematics</option>
            <option>Physics</option>
            <option>Chemistry</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-300">Attendance Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
          >
          </input>
        </div>
      </div>

      {/* Student List with Status Toggles */}
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Student Roster ({CLASS_ROSTER.length})</h2>
          <span className="text-xs text-slate-400">Click a status to update</span>
        </div>

        <div className="space-y-3">
          {CLASS_ROSTER.map((st) => {
            const currentStatus = statuses[st.id] || 'PRESENT';
            return (
              <div
                key={st.id}
                className="p-4 rounded-xl bg-[#111831] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <h4 className="text-xs font-bold text-white">{st.name}</h4>
                  <p className="text-[11px] text-slate-400">
                    ID: {st.id} • Historical Attendance: {st.attendance}%
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggle(st.id, 'PRESENT')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      currentStatus === 'PRESENT'
                        ? 'bg-[#10B981] text-white shadow-md'
                        : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Present</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggle(st.id, 'LATE')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      currentStatus === 'LATE'
                        ? 'bg-[#F59E0B] text-white shadow-md'
                        : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Late</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggle(st.id, 'ABSENT')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      currentStatus === 'ABSENT'
                        ? 'bg-[#EF4444] text-white shadow-md'
                        : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Absent</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
