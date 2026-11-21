import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Trophy, ChevronRight, CheckCircle, ArrowRight, X, Sparkles, UserCheck } from 'lucide-react';

interface DemoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOUR_STEPS = [
  {
    step: 1,
    title: 'Student Dashboard Experience',
    role: 'STUDENT',
    targetRoute: '/student',
    desc: 'Explore Alex Johnson\'s live academic overview, current 8-day streak, 2,850 XP, GPA progress, and today\'s schedule.',
    highlight: 'Notice the immediate answers to: How am I performing? What should I improve?'
  },
  {
    step: 2,
    title: 'Core Innovation: AI Learning Gap Finder',
    role: 'STUDENT',
    targetRoute: '/student/gap-finder',
    desc: 'Inspect detected learning gaps tracing root causes. Takes diagnostic assessments and isolates foundational prerequisite weaknesses.',
    highlight: 'Example: Linear Equations 35% failure traced to negative integer operations prerequisite.'
  },
  {
    step: 3,
    title: 'AI Personalized Study Timetable',
    role: 'STUDENT',
    targetRoute: '/student/planner',
    desc: 'Generates an intelligent weekly timetable prioritizing weak prerequisite concepts, balanced with revision and scheduled breaks.',
    highlight: 'Try checking off tasks to see real-time XP rewards and completed study hour tracking!'
  },
  {
    step: 4,
    title: 'Nexa AI Tutor with 5 Learning Modes',
    role: 'STUDENT',
    targetRoute: '/student/tutor',
    desc: 'Interactive AI tutor powered by Google Gemini with modes: Beginner, Step-by-Step, Exam Prep, Practice, and Quick Revision in English, Hindi & Kannada.',
    highlight: 'Ask a doubt or switch to "Explain Like I\'m a Beginner" mode!'
  },
  {
    step: 5,
    title: 'Adaptive Topic Quiz & XP System',
    role: 'STUDENT',
    targetRoute: '/student/quiz',
    desc: 'Instant diagnostic evaluation, question timers, instant score calculation, and direct feedback updating learning gaps.',
    highlight: 'Complete a quick quiz to observe real-time XP accumulation.'
  },
  {
    step: 6,
    title: 'Teacher Cockpit & Class Analytics',
    role: 'TEACHER',
    targetRoute: '/teacher',
    desc: 'Switch to Ms. Sarah Chen. View class-wide academic curves, students requiring attention, and quick pedagogical interventions.',
    highlight: 'See students flagged automatically for prerequisite intervention.'
  },
  {
    step: 7,
    title: 'Teacher Attendance & Marks Management',
    role: 'TEACHER',
    targetRoute: '/teacher/attendance',
    desc: 'One-click attendance recording (Present/Absent/Late) and real-time marks entry with grade calculation.',
    highlight: 'Save attendance and observe instant synchronization across parent and student views.'
  },
  {
    step: 8,
    title: 'Parent Portal — Clear Non-Technical Insight',
    role: 'PARENT',
    targetRoute: '/parent',
    desc: 'Log in as Robert Johnson (Alex\'s parent). Plain-English explanations of child strengths, attendance trends, and teacher notices.',
    highlight: 'Designed specifically to eliminate academic jargon for parents.'
  },
  {
    step: 9,
    title: 'Admin Control Center',
    role: 'ADMIN',
    targetRoute: '/admin',
    desc: 'Dr. Emma Wilson\'s system health dashboard: user roster, cross-grade performance metrics, and administrative governance.',
    highlight: 'Role-based access control and system audit telemetry.'
  }
];

export const DemoTourModal: React.FC<DemoTourModalProps> = ({ isOpen, onClose }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const currentStep = TOUR_STEPS[currentStepIndex];

  const handleGoToStep = (index: number) => {
    setCurrentStepIndex(index);
    const step = TOUR_STEPS[index];
    switchRole(step.role as any);
    navigate(step.targetRoute);
  };

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      handleGoToStep(currentStepIndex + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="bg-[#171F3A] border border-[#7657F6]/40 rounded-2xl w-full max-w-2xl p-6 shadow-2xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#7657F6]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#7657F6]/20 border border-[#7657F6]/40 text-[#A78BFA]">
              <Trophy className="w-6 h-6 text-[#FFC857]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FFC857]/20 text-[#FFC857] border border-[#FFC857]/30">
                  Judge Demo Flow
                </span>
                <span className="text-xs text-slate-400">Step {currentStepIndex + 1} of {TOUR_STEPS.length}</span>
              </div>
              <h2 className="text-lg font-bold text-white mt-0.5">{currentStep.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step details */}
        <div className="py-5 space-y-4">
          <div className="p-4 rounded-xl bg-[#111831] border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-slate-400 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-[#7657F6]" /> Switched Role: <strong className="text-white">{currentStep.role}</strong>
              </span>
              <span className="text-[#A78BFA] font-mono">{currentStep.targetRoute}</span>
            </div>
            <p className="text-slate-200 text-sm leading-relaxed">{currentStep.desc}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#7657F6]/10 border border-[#7657F6]/30 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#FFC857] shrink-0 mt-0.5" />
            <p className="text-xs text-[#E2E8F0] leading-relaxed">
              <strong className="text-[#FFC857]">Evaluation Highlight: </strong>
              {currentStep.highlight}
            </p>
          </div>

          {/* Stepper dots */}
          <div className="grid grid-cols-9 gap-1.5 pt-2">
            {TOUR_STEPS.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => handleGoToStep(idx)}
                title={s.title}
                className={`h-2 rounded-full transition-all ${
                  idx === currentStepIndex
                    ? 'bg-[#FFC857] shadow-glow-accent'
                    : idx < currentStepIndex
                    ? 'bg-[#7657F6]'
                    : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <button
            onClick={() => handleGoToStep(Math.max(0, currentStepIndex - 1))}
            disabled={currentStepIndex === 0}
            className="text-xs text-slate-400 hover:text-white disabled:opacity-30 px-3 py-2 rounded-lg transition-colors"
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleGoToStep(currentStepIndex)}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10 transition-colors"
            >
              Navigate to Page
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#7657F6] hover:bg-[#6442E8] text-xs font-semibold text-white shadow-glow-primary transition-all"
            >
              {currentStepIndex === TOUR_STEPS.length - 1 ? 'Finish Tour' : 'Next Step'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
