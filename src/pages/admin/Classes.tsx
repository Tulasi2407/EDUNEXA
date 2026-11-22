import React from 'react';
import { FolderTree, Plus, BookOpen, Users } from 'lucide-react';

export const AdminClasses: React.FC = () => {
  const classes = [
    { name: 'Class 10 - Section A', students: 28, head: 'Ms. Sarah Chen', room: 'Room 101' },
    { name: 'Class 10 - Section B', students: 30, head: 'Dr. Marcus Vance', room: 'Room 102' },
    { name: 'Class 10 - Section C', students: 32, head: 'Mrs. Anita Rao', room: 'Room 103' },
    { name: 'Class 10 - Section D (Kannada Medium)', students: 26, head: 'ಶ್ರೀ ರಮೇಶ್ ಭಟ್', room: 'Room 104' },
  ];

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Class & Curriculum Management</h1>
          <p className="text-xs text-slate-300 mt-1">Configure academic classes, assign lead faculty, and structure curriculum paths.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {classes.map((c, i) => (
          <div key={i} className="p-5 rounded-2xl bg-[#171F3A] border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">{c.name}</h3>
              <span className="text-xs text-[#A78BFA] font-semibold">{c.students} Students</span>
            </div>
            <p className="text-xs text-slate-400">Class Lead: <strong className="text-slate-200">{c.head}</strong></p>
            <p className="text-xs text-slate-400">Location: {c.room}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
