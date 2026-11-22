import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useEduData } from '../../contexts/DataContext';
import { UserCheck, Mail, BookOpen, ShieldCheck, Save } from 'lucide-react';
import { UserAvatar } from '../../components/common/UserAvatar';

export const StudentProfile: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useEduData();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [grade, setGrade] = useState(user.grade || 'Grade 10');
  const [learningPace, setLearningPace] = useState('Visual & Step-by-Step');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Profile preferences updated successfully!', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 flex items-center gap-4">
        <UserAvatar name={user.name} role={user.role} size="xl" rounded="2xl" />
        <div>
          <h1 className="text-xl font-bold text-white">{user.name}</h1>
          <p className="text-xs text-slate-400">{user.email} • {user.grade} ({user.section})</p>
          <span className="mt-1 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#7657F6]/20 text-[#A78BFA]">
            Student Profile
          </span>
        </div>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-4">
        <h2 className="text-base font-bold text-white">Academic Profile & AI Preferences</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7657F6]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7657F6]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Grade Level</label>
            <input
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7657F6]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Preferred Learning Modality</label>
            <select
              value={learningPace}
              onChange={(e) => setLearningPace(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7657F6]"
            >
              <option>Visual & Step-by-Step</option>
              <option>Intensive Problem Solving</option>
              <option>Exam Pattern & High-Yield Drills</option>
              <option>Conceptual Metaphors & Analogies</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#7657F6] hover:bg-[#6442E8] text-xs font-bold text-white shadow-glow-primary transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </form>
    </div>
  );
};
