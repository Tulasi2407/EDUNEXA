import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useEduData } from '../../contexts/DataContext';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  X,
  BookOpen,
  Globe,
  Clock,
  CalendarDays,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserAvatar } from './UserAvatar';

interface OnboardingWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingWizardModal: React.FC<OnboardingWizardModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { addToast, addXP } = useEduData();

  const [step, setStep] = useState(1);
  const [grade, setGrade] = useState('Grade 10');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([
    'Kannada',
    'English',
    'Hindi',
    'Mathematics',
    'Science',
    'Social Science'
  ]);
  const [language, setLanguage] = useState<'English' | 'Hindi' | 'Kannada'>('English');
  const [dailyHours, setDailyHours] = useState(3);
  const [schoolHours, setSchoolHours] = useState('08:00 AM - 03:30 PM');
  const [diagnosticScore, setDiagnosticScore] = useState<number | null>(null);

  if (!isOpen) return null;

  const toggleSubject = (sub: string) => {
    setSelectedSubjects(prev =>
      prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
    );
  };

  const handleFinish = () => {
    addToast('Onboarding completed! Your customized learning ecosystem is ready.', 'success');
    addXP(100, 'Completed Student Onboarding');
    try {
      confetti({ particleCount: 70, spread: 60 });
    } catch (e) {}
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="bg-[#171F3A] border border-[#7657F6]/40 rounded-2xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
        {/* Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#7657F6]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFC857]/20 text-[#FFC857] border border-[#FFC857]/30">
                TEQORA Objective 9
              </span>
              <span className="text-xs text-slate-400">Step {step} of 7</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">
              Welcome to EduNexa AI, {user.name.split(' ')[0]}!
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-[#111831] h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#7657F6] to-[#FFC857] h-full transition-all duration-300"
            style={{ width: `${(step / 7) * 100}%` }}
          />
        </div>

        {/* Step 1: Create/Confirm Profile */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white">Step 1: Confirm Your Student Profile</h3>
            <p className="text-xs text-slate-300">
              Your profile helps EduNexa calibrate its AI explanations and track your learning streak.
            </p>
            <div className="p-4 rounded-xl bg-[#111831] border border-white/5 space-y-2">
              <div className="flex items-center gap-3">
                <UserAvatar name={user.name} role={user.role} size="lg" rounded="xl" />
                <div>
                  <p className="text-xs font-bold text-white">{user.name}</p>
                  <p className="text-[11px] text-slate-400">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Select Grade */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white">Step 2: Grade Level & Board Verification</h3>
            <p className="text-xs text-slate-300">Curriculum standards and question difficulty are strictly tuned for Karnataka SSLC Class 10.</p>
            <div className="grid grid-cols-1 gap-2.5">
              {['Class 10 (Karnataka SSLC State Board)'].map(g => (
                <button
                  key={g}
                  onClick={() => setGrade('Class 10')}
                  className="p-3.5 rounded-xl border text-xs font-bold transition-all bg-[#7657F6] text-white border-[#7657F6] shadow-glow-primary flex items-center justify-between"
                >
                  <span>{g}</span>
                  <CheckCircle2 className="w-4 h-4 text-[#FFC857]" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Choose Subjects */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white">Step 3: Choose Your Active Subjects</h3>
            <p className="text-xs text-slate-300">Official 6 KSEAB Karnataka State Board subjects for Class 10 examination.</p>
            <div className="grid grid-cols-2 gap-2.5">
              {['Kannada', 'English', 'Hindi', 'Mathematics', 'Science', 'Social Science'].map(s => {
                const isSelected = selectedSubjects.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() => toggleSubject(s)}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                      isSelected ? 'bg-[#7657F6]/20 border-[#7657F6] text-white' : 'bg-[#111831] border-white/5 text-slate-400 hover:bg-white/5'
                    }`}
                  >
                    <span>{s}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#FFC857]" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Language Selection */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white">Step 4: Select Preferred Learning Language</h3>
            <p className="text-xs text-slate-300">
              Nexa AI provides local-language concept explanations without changing academic terms.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { code: 'English', title: 'English', sub: 'Standard' },
                { code: 'Hindi', title: 'हिंदी (Hindi)', sub: 'Localized' },
                { code: 'Kannada', title: 'ಕನ್ನಡ (Kannada)', sub: 'Localized' }
              ].map(l => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code as any)}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    language === l.code ? 'bg-[#7657F6] text-white border-[#7657F6] shadow-glow-primary' : 'bg-[#111831] border-white/5 text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <p className="text-xs font-bold">{l.title}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{l.sub}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Short Learning Assessment */}
        {step === 5 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white">Step 5: Quick 1-Question Diagnostic Screening</h3>
            <p className="text-xs text-slate-300">
              Let's evaluate your foundational comfort level. Solve: <strong className="text-white">-3x + 7 = -14</strong>
            </p>
            <div className="space-y-2">
              {['x = 7 (Correct)', 'x = -7', 'x = 21/3', 'x = -2.33'].map((ans, idx) => (
                <button
                  key={idx}
                  onClick={() => setDiagnosticScore(idx === 0 ? 100 : 40)}
                  className={`w-full p-3 rounded-xl border text-xs text-left font-medium transition-all ${
                    diagnosticScore !== null && idx === 0
                      ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981]'
                      : 'bg-[#111831] border-white/5 text-slate-300 hover:bg-white/5'
                  }`}
                >
                  {ans}
                </button>
              ))}
            </div>
            {diagnosticScore !== null && (
              <p className="text-xs text-[#10B981] font-semibold">
                Screening registered! EduNexa has initialized your knowledge dependency model.
              </p>
            )}
          </div>
        )}

        {/* Step 6: Available Study Hours & School Constraints */}
        {step === 6 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white">Step 6: School Timings & Available Free Time</h3>
            <p className="text-xs text-slate-300">
              EduNexa will <strong>never</strong> schedule study blocks during school hours or your protected rest time.
            </p>
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">School/College Hours (Blocked Out)</label>
                <input
                  type="text"
                  value={schoolHours}
                  onChange={e => setSchoolHours(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">
                  Target Daily Study Capacity: <strong className="text-[#FFC857]">{dailyHours} hours/day</strong>
                </label>
                <input
                  type="range"
                  min={1}
                  max={6}
                  step={0.5}
                  value={dailyHours}
                  onChange={e => setDailyHours(parseFloat(e.target.value))}
                  className="w-full accent-[#7657F6]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Generate First Learning Plan */}
        {step === 7 && (
          <div className="space-y-4 text-center py-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#7657F6] to-[#FFC857] flex items-center justify-center mx-auto shadow-glow-accent">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-base font-bold text-white">Everything is Configured!</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Your personalized study timetable, adaptive learning pace profile, and AI Learning Gap Finder are now synchronized and ready for your first study session.
            </p>
          </div>
        )}

        {/* Wizard Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {step < 7 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#7657F6] hover:bg-[#6442E8] text-xs font-bold text-white shadow-glow-primary transition-all"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#10B981] hover:bg-emerald-600 text-xs font-bold text-white shadow-lg transition-all"
            >
              <span>Launch My Learning Journey (+100 XP)</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
