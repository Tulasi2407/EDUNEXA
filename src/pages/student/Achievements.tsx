import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useEduData } from '../../contexts/DataContext';
import {
  Award,
  Flame,
  Zap,
  Trophy,
  Target,
  BrainCircuit,
  Globe,
  Medal,
  CheckCircle2
} from 'lucide-react';
import { CLASS_ROSTER } from '../../data/mockData';

export const Achievements: React.FC = () => {
  const { user } = useAuth();
  const { studentXP, streakDays, badges } = useEduData();

  const studentName = user?.name ? user.name.trim() : 'Scholar';

  // Simulated leaderboard
  const leaderboard = [
    { rank: 1, name: 'Maya Patel', xp: 3420, level: 17, streak: 14, isUser: false },
    { rank: 2, name: 'Aarav Sharma', xp: 3100, level: 15, streak: 11, isUser: false },
    { rank: 3, name: `${studentName} (You)`, xp: studentXP, level: 14, streak: streakDays, isUser: true },
    { rank: 4, name: 'Chloe Bennett', xp: 2650, level: 13, streak: 6, isUser: false },
    { rank: 5, name: 'Lucas Silva', xp: 1980, level: 10, streak: 3, isUser: false },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#171F3A] to-[#1A2342] border border-[#FFC857]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#FFC857]/20 text-[#FFC857] border border-[#FFC857]/30">
              Gamification Center
            </span>
            <span className="text-xs text-slate-400">Class Rank: #3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Achievements & Leaderboard</h1>
          <p className="text-xs text-slate-300 mt-1">
            Earn XP and badges by remediating prerequisite learning gaps, completing practice quizzes, and sustaining daily study streaks.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-[#111831] border border-white/5">
            <Flame className="w-6 h-6 text-[#FFC857]" />
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Learning Streak</p>
              <p className="text-base font-extrabold text-white">{streakDays} Days</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-[#111831] border border-white/5">
            <Trophy className="w-6 h-6 text-[#7657F6]" />
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Total XP</p>
              <p className="text-base font-extrabold text-[#FFC857]">{studentXP.toLocaleString()} XP</p>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-[#FFC857]" />
          <span>Earned Badges & Milestones</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
                b.unlockedAt
                  ? 'bg-[#111831] border-[#7657F6]/40 shadow-glow-primary/20'
                  : 'bg-[#111831]/40 border-white/5 opacity-50'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7657F6]/30 to-[#FFC857]/30 flex items-center justify-center text-white">
                <Medal className="w-5 h-5 text-[#FFC857]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">{b.title}</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">{b.description}</p>
              </div>
              <span className="text-[10px] font-semibold text-[#A78BFA]">
                {b.unlockedAt ? `Unlocked: ${b.unlockedAt}` : 'Locked'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Class Leaderboard */}
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#FFC857]" />
          <span>Grade 10-A Class Leaderboard</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111831] text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3 rounded-l-xl">Rank</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Level</th>
                <th className="p-3">Streak</th>
                <th className="p-3 rounded-r-xl">Total XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leaderboard.map((s) => (
                <tr
                  key={s.rank}
                  className={`transition-colors ${
                    s.isUser ? 'bg-[#7657F6]/20 font-bold border-l-4 border-[#FFC857]' : 'hover:bg-white/5'
                  }`}
                >
                  <td className="p-3 font-extrabold text-sm">
                    {s.rank === 1 ? '🥇' : s.rank === 2 ? '🥈' : s.rank === 3 ? '🥉' : `#${s.rank}`}
                  </td>
                  <td className="p-3 text-white">{s.name}</td>
                  <td className="p-3 text-slate-300">Level {s.level}</td>
                  <td className="p-3 text-[#FFC857] flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" /> {s.streak} Days
                  </td>
                  <td className="p-3 font-extrabold text-[#A78BFA]">{s.xp.toLocaleString()} XP</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
