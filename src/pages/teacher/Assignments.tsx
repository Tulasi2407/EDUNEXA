import React, { useState } from 'react';
import { useEduData } from '../../contexts/DataContext';
import { ClipboardList, Plus, CheckCircle2, Clock, Calendar } from 'lucide-react';

export const TeacherAssignments: React.FC = () => {
  const { addToast } = useEduData();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [dueDate, setDueDate] = useState('2026-11-28');

  const [list, setList] = useState([
    { id: '1', title: 'Linear Equations Problem Set 4', subject: 'Mathematics', dueDate: 'Nov 24', submissions: 24, total: 28 },
    { id: '2', title: 'Optics Focal Length Calculations', subject: 'Physics', dueDate: 'Nov 26', submissions: 19, total: 28 },
  ]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setList(prev => [{ id: Date.now().toString(), title, subject, dueDate, submissions: 0, total: 28 }, ...prev]);
    setShowModal(false);
    setTitle('');
    addToast('Published new class assignment successfully!', 'success');
  };

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#3B82F6]/20 text-[#60A5FA]">
              Coursework Management
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Assignment Builder & Review</h1>
          <p className="text-xs text-slate-300 mt-1">Deploy coursework and monitor student submission completion status.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3B82F6] hover:bg-blue-600 text-xs font-bold text-white shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Assignment</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.map(asg => (
          <div key={asg.id} className="p-5 rounded-2xl bg-[#171F3A] border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#A78BFA]">{asg.subject}</span>
              <span className="text-xs text-slate-400">Due: {asg.dueDate}</span>
            </div>
            <h3 className="text-sm font-bold text-white">{asg.title}</h3>
            <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-white/5">
              <span>Submissions: <strong>{asg.submissions} / {asg.total}</strong></span>
              <span className="text-[#10B981] font-semibold">{Math.round((asg.submissions / asg.total) * 100)}% Turned In</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <form onSubmit={handleCreate} className="bg-[#171F3A] border border-white/10 rounded-2xl w-full max-w-md p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Create Class Assignment</h3>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Assignment Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Negative Numbers Review Set"
                className="w-full px-3.5 py-2 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Subject</label>
              <select
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none"
              >
                <option>Mathematics</option>
                <option>Physics</option>
                <option>Chemistry</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl bg-white/5 text-xs font-semibold text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#3B82F6] text-xs font-bold text-white"
              >
                Deploy Assignment
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
