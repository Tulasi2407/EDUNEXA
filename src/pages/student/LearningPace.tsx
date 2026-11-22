import React, { useState } from 'react';
import { useEduData } from '../../contexts/DataContext';
import {
  Gauge,
  Sparkles,
  TrendingUp,
  BrainCircuit,
  Award,
  Sliders,
  CheckCircle2,
  Zap,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LearningPace: React.FC = () => {
  const { learningGaps, studentXP, addToast } = useEduData();
  const navigate = useNavigate();

  const [currentLevel, setCurrentLevel] = useState<'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'>('INTERMEDIATE');
  const [explanationComplexity, setExplanationComplexity] = useState('Step-by-Step with Visuals');
  const [revisionFrequency, setRevisionFrequency] = useState('Daily Spaced Repetition');
  const [adaptiveDifficulty, setAdaptiveDifficulty] = useState(65); // 0-100%

  const handleSavePreferences = () => {
    addToast('Learning Pace preferences updated! Content will adapt automatically.', 'success');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#171F3A] to-[#1A2342] border border-[#7657F6]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#FFC857]/20 text-[#FFC857] border border-[#FFC857]/30">
              TEQORA Objective 5
            </span>
            <span className="text-xs text-slate-400">Adaptive Learning Pace Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Personalized Learning Pace Profile</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Education calibrated to your individual velocity. High-performing topics advance automatically while challenging prerequisite concepts receive gentler step-by-step reinforcement.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-slate-400">Active Velocity</p>
            <p className="text-base font-extrabold text-[#10B981]">1.25x Normal Speed</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center text-[#10B981]">
            <Zap className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 3 Core Velocity Cards (No negative labeling) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#171F3A] border border-white/5 space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400">Current Knowledge Mastery Level</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">{currentLevel}</span>
            <span className="text-xs text-[#A78BFA] font-semibold">(Level 14 Scholar)</span>
          </div>
          <p className="text-xs text-slate-300">
            Fast-tracks advanced problem sets in Science and Mathematics; provides scaffolded drills for Algebra.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#171F3A] border border-white/5 space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400">Adaptive Question Calibration</span>
          <p className="text-2xl font-bold text-[#FFC857]">{adaptiveDifficulty}% Rigor</p>
          <p className="text-xs text-slate-300">
            Dynamically increases question complexity by +5% after two consecutive accurate answers.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#171F3A] border border-white/5 space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400">Prerequisite Scaffolding Rule</span>
          <p className="text-2xl font-bold text-[#7657F6]">Active</p>
          <p className="text-xs text-slate-300">
            If score falls below 45% on any concept, the engine immediately schedules foundational reviews.
          </p>
        </div>
      </div>

      {/* Pace Configuration Controls */}
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#7657F6]" />
            <span>Learning Experience Adjustments</span>
          </h2>
          <span className="text-xs text-slate-400">Adjustable to personal preference</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Target Curriculum Tier</label>
            <div className="grid grid-cols-3 gap-2">
              {(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as const).map(tier => (
                <button
                  key={tier}
                  onClick={() => setCurrentLevel(tier)}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                    currentLevel === tier
                      ? 'bg-[#7657F6] text-white border-[#7657F6] shadow-glow-primary'
                      : 'bg-[#111831] border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">
              Adaptive Difficulty Level: <strong className="text-[#FFC857]">{adaptiveDifficulty}%</strong>
            </label>
            <input
              type="range"
              min={30}
              max={95}
              value={adaptiveDifficulty}
              onChange={e => setAdaptiveDifficulty(parseInt(e.target.value))}
              className="w-full accent-[#7657F6]"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Gentle Ramp (30%)</span>
              <span>Balanced (65%)</span>
              <span>High Rigor / Olympiad (95%)</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">AI Explanation Complexity</label>
            <select
              value={explanationComplexity}
              onChange={e => setExplanationComplexity(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7657F6]"
            >
              <option>Step-by-Step with Visuals</option>
              <option>Intuitive Metaphors & Analogies</option>
              <option>Rigorous Mathematical Proofs</option>
              <option>Concise High-Yield Summary</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Spaced Revision Schedule</label>
            <select
              value={revisionFrequency}
              onChange={e => setRevisionFrequency(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7657F6]"
            >
              <option>Daily Spaced Repetition</option>
              <option>Bi-Weekly Diagnostic Checkpoints</option>
              <option>Pre-Examination Intensive Drills</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <p className="text-xs text-slate-400">
            Pace changes reflect instantaneously in Nexa AI Tutor and Study Timetable generation.
          </p>
          <button
            onClick={handleSavePreferences}
            className="px-6 py-2.5 rounded-xl bg-[#7657F6] hover:bg-[#6442E8] text-xs font-bold text-white shadow-glow-primary transition-all"
          >
            Save Pace Profile
          </button>
        </div>
      </div>

      {/* Recommended Next Milestones */}
      <div className="p-6 rounded-2xl bg-[#111831] border border-white/5 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#10B981]" />
          <span>Recommended Learning Trajectory</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-[#171F3A] border border-white/5 space-y-1">
            <p className="font-bold text-[#FFC857]">Mathematics Next Step:</p>
            <p className="text-slate-300">
              Complete 10 minutes on negative integer arithmetic, then unlock Quadratic Trinomials factoring module.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#171F3A] border border-white/5 space-y-1">
            <p className="font-bold text-[#10B981]">Science Next Step:</p>
            <p className="text-slate-300">
              88% mastery verified in spherical mirrors & refraction. Recommended to advance directly to Snell's Law and Total Internal Reflection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
