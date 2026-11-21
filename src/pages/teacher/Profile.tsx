import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserCheck, BookOpen, Mail } from 'lucide-react';

export const TeacherProfile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 flex items-center gap-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#3B82F6]"
        />
        <div>
          <h1 className="text-xl font-bold text-white">{user.name}</h1>
          <p className="text-xs text-slate-400">{user.email} • {user.department}</p>
          <span className="mt-1 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#3B82F6]/20 text-[#60A5FA]">
            Teacher Faculty Profile
          </span>
        </div>
      </div>
    </div>
  );
};
