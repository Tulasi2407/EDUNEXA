import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserCheck, ShieldCheck, Mail, Phone } from 'lucide-react';

export const ParentProfile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 flex items-center gap-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#10B981]"
        />
        <div>
          <h1 className="text-xl font-bold text-white">{user.name}</h1>
          <p className="text-xs text-slate-400">{user.email} • Parent of Alex Johnson</p>
          <span className="mt-1 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#34D399]">
            Parent Portal Account
          </span>
        </div>
      </div>
    </div>
  );
};
