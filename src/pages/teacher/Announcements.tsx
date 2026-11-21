import React, { useState } from 'react';
import { useEduData } from '../../contexts/DataContext';
import { Bell, Send, AlertTriangle } from 'lucide-react';

export const TeacherAnnouncements: React.FC = () => {
  const { announcements, addAnnouncement } = useEduData();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [targetRole, setTargetRole] = useState<'ALL' | 'STUDENTS' | 'PARENTS'>('STUDENTS');
  const [priority, setPriority] = useState<'NORMAL' | 'URGENT'>('NORMAL');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    addAnnouncement({
      id: `ann_${Date.now()}`,
      title,
      content,
      author: 'Ms. Sarah Chen',
      date: new Date().toISOString().split('T')[0],
      targetRole,
      priority
    });

    setTitle('');
    setContent('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5">
        <h1 className="text-2xl font-extrabold text-white">Broadcast Notices & Communication</h1>
        <p className="text-xs text-slate-300 mt-1">
          Post announcements to students and parents regarding upcoming exams, remedial clinics, and coursework.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-4">
        <h2 className="text-base font-bold text-white">Compose Notice</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-medium text-slate-300">Notice Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Algebra Prerequisite Remediation Session"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Audience</label>
            <select
              value={targetRole}
              onChange={e => setTargetRole(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
            >
              <option value="STUDENTS">Students Only</option>
              <option value="PARENTS">Parents Only</option>
              <option value="ALL">Entire Community</option>
            </select>
          </div>

          <div className="md:col-span-3 space-y-1">
            <label className="text-xs font-medium text-slate-300">Notice Body</label>
            <textarea
              rows={3}
              required
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Write message details..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#3B82F6] hover:bg-blue-600 text-xs font-bold text-white shadow-lg transition-all"
        >
          <Send className="w-4 h-4" />
          <span>Broadcast Notice</span>
        </button>
      </form>

      {/* Announcements Stream */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white">Active Broadcasts</h3>
        {announcements.map(ann => (
          <div key={ann.id} className="p-4 rounded-xl bg-[#171F3A] border border-white/5 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">{ann.title}</span>
              <span className="text-[10px] text-slate-400">{ann.date} • Target: {ann.targetRole}</span>
            </div>
            <p className="text-xs text-slate-300">{ann.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
