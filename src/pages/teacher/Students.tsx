import React, { useState } from 'react';
import { CLASS_ROSTER } from '../../data/mockData';
import { useEduData } from '../../contexts/DataContext';
import {
  Users,
  Search,
  BrainCircuit,
  Filter,
  CheckCircle2,
  AlertTriangle,
  X,
  Sparkles
} from 'lucide-react';

export const TeacherStudents: React.FC = () => {
  const { learningGaps } = useEduData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  const filtered = CLASS_ROSTER.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.weakTopic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#3B82F6]/20 text-[#60A5FA] border border-[#3B82F6]/40">
              Grade 10-A
            </span>
            <span className="text-xs text-slate-400">{CLASS_ROSTER.length} Students Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Class Roster & Student Profiles</h1>
          <p className="text-xs text-slate-300 mt-1">
            Search students, inspect individual learning curves, and trigger targeted remediation interventions.
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search student or topic..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
          />
        </div>
      </div>

      {/* Roster Table */}
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111831] text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3 rounded-l-xl">Student</th>
                <th className="p-3">Grade & Section</th>
                <th className="p-3">GPA</th>
                <th className="p-3">Attendance</th>
                <th className="p-3">Status</th>
                <th className="p-3">Identified Weak Topic</th>
                <th className="p-3 rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((st) => (
                <tr key={st.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3 font-bold text-white">{st.name}</td>
                  <td className="p-3 text-slate-300">{st.grade} - {st.section}</td>
                  <td className="p-3 font-semibold text-[#FFC857]">{st.gpa}</td>
                  <td className="p-3 text-[#10B981] font-semibold">{st.attendance}%</td>
                  <td className="p-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        st.status.includes('Needs Attention')
                          ? 'bg-[#EF4444]/20 text-[#EF4444]'
                          : 'bg-[#10B981]/20 text-[#10B981]'
                      }`}
                    >
                      {st.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300 font-medium">{st.weakTopic}</td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedStudent(st)}
                      className="px-3 py-1 rounded-lg bg-[#3B82F6]/20 hover:bg-[#3B82F6]/30 text-xs font-semibold text-[#60A5FA]"
                    >
                      Deep Dive
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Individual Student Deep Dive Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-[#171F3A] border border-white/10 rounded-2xl w-full max-w-xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/20 border border-[#3B82F6]/40 flex items-center justify-center text-[#60A5FA] font-bold">
                  {selectedStudent.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{selectedStudent.name}</h3>
                  <p className="text-xs text-slate-400">{selectedStudent.grade} • GPA: {selectedStudent.gpa}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#111831] border border-white/5 space-y-1">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <BrainCircuit className="w-4 h-4 text-[#EF4444]" />
                  Active Prerequisite Remediation Needs:
                </p>
                <p className="text-slate-300">
                  Topic: <strong className="text-white">{selectedStudent.weakTopic}</strong>
                </p>
                <p className="text-slate-400 text-[11px]">
                  Underlying Root Cause: Misapplication of signed arithmetic operations during equation balancing.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#111831] border border-white/5 flex justify-between items-center">
                <span>Verified Attendance:</span>
                <span className="font-bold text-[#10B981]">{selectedStudent.attendance}%</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Assigned tailored prerequisite remediation module to ${selectedStudent.name}`);
                  setSelectedStudent(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#3B82F6] hover:bg-blue-600 text-xs font-bold text-white"
              >
                Assign Targeted Practice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
