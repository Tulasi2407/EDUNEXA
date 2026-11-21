import React, { useState } from 'react';
import { useEduData } from '../../contexts/DataContext';
import {
  BrainCircuit,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Timer,
  Zap,
  Target,
  Trophy,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PracticeQuestion {
  id: string;
  type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'APPLICATION_BASED' | 'SHORT_ANSWER';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  topic: string;
}

const PRACTICE_BANK: Record<string, PracticeQuestion[]> = {
  QUICK: [
    {
      id: 'pq_1',
      type: 'MULTIPLE_CHOICE',
      question: 'What is (-12) / (-4)?',
      options: ['-3', '3', '8', '-16'],
      correctAnswer: '3',
      explanation: 'Dividing two negative integers always produces a positive quotient: (-a)/(-b) = +(a/b).',
      topic: 'Negative Integer Division'
    },
    {
      id: 'pq_2',
      type: 'TRUE_FALSE',
      question: 'True or False: The focal length of a concave mirror is taken as positive in Cartesian sign conventions.',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: 'False. The focal point of a concave mirror lies in front of the mirror (left of the pole), making it negative.',
      topic: 'Ray Optics Sign Conventions'
    },
    {
      id: 'pq_3',
      type: 'MULTIPLE_CHOICE',
      question: 'Solve: 2x - 5 = 15. What is x?',
      options: ['x = 5', 'x = 10', 'x = -10', 'x = 20'],
      correctAnswer: 'x = 10',
      explanation: '2x = 15 + 5 = 20 => x = 10.',
      topic: 'Linear Equations'
    },
    {
      id: 'pq_4',
      type: 'TRUE_FALSE',
      question: 'True or False: In redox reactions, oxidation always refers to the loss of electrons (OIL).',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: 'True. Remember the OIL RIG mnemonic: Oxidation Is Loss, Reduction Is Gain.',
      topic: 'Chemical Redox Processes'
    },
    {
      id: 'pq_5',
      type: 'APPLICATION_BASED',
      question: 'A car decelerates uniformly from 20 m/s to 0 m/s in 4 seconds. What is its acceleration?',
      options: ['-5 m/s²', '+5 m/s²', '-10 m/s²', '-80 m/s²'],
      correctAnswer: '-5 m/s²',
      explanation: 'a = (v - u)/t = (0 - 20)/4 = -5 m/s² (negative indicates deceleration).',
      topic: 'Kinematics & Acceleration'
    }
  ],
  FOCUS: [
    {
      id: 'pf_1',
      type: 'MULTIPLE_CHOICE',
      question: 'Solve: -5y + 15 = -10. What is y?',
      options: ['y = 5', 'y = -5', 'y = 1', 'y = -1'],
      correctAnswer: 'y = 5',
      explanation: '-5y = -10 - 15 = -25 => y = -25 / -5 = 5.',
      topic: 'Negative Coefficient Linear Equations'
    },
    {
      id: 'pf_2',
      type: 'MULTIPLE_CHOICE',
      question: 'Simplify: -3(4 - 2x)',
      options: ['-12 + 6x', '-12 - 6x', '12 - 6x', '-12 + 2x'],
      correctAnswer: '-12 + 6x',
      explanation: 'Distribute: (-3 * 4) + (-3 * -2x) = -12 + 6x.',
      topic: 'Distributive Property with Negatives'
    },
    {
      id: 'pf_3',
      type: 'MULTIPLE_CHOICE',
      question: 'If -x/3 = 7, what is x?',
      options: ['x = -21', 'x = 21', 'x = 4', 'x = -10'],
      correctAnswer: 'x = -21',
      explanation: 'Multiply both sides by -3: x = 7 * (-3) = -21.',
      topic: 'Fractional Negative Equations'
    }
  ],
  CHALLENGE: [
    {
      id: 'pc_1',
      type: 'APPLICATION_BASED',
      question: 'A real inverted image is formed 30 cm in front of a concave mirror of focal length 20 cm. Find the object distance u.',
      options: ['-60 cm', '-12 cm', '-15 cm', '-40 cm'],
      correctAnswer: '-60 cm',
      explanation: '1/f = 1/v + 1/u => 1/(-20) = 1/(-30) + 1/u => 1/u = -1/20 + 1/30 = -1/60 => u = -60 cm.',
      topic: 'Mirror Formula Numerical Application'
    },
    {
      id: 'pc_2',
      type: 'APPLICATION_BASED',
      question: 'Two numbers differ by 16. If one-third of the smaller equals one-fifth of the larger, what is the smaller number?',
      options: ['24', '40', '16', '32'],
      correctAnswer: '24',
      explanation: 'Let smaller be x, larger is x + 16. x/3 = (x + 16)/5 => 5x = 3x + 48 => 2x = 48 => x = 24.',
      topic: 'Multi-Step Algebraic Word Problems'
    }
  ]
};

export const PracticeGenerator: React.FC = () => {
  const { addXP, addToast } = useEduData();

  const [mode, setMode] = useState<'QUICK' | 'FOCUS' | 'CHALLENGE'>('QUICK');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  const questions = PRACTICE_BANK[mode];

  const handleSelectOption = (ans: string) => {
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: ans }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      finishPractice();
    }
  };

  const finishPractice = () => {
    setIsFinished(true);
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) correct++;
    });
    const xp = correct * 30 + 30;
    addXP(xp, `Completed ${mode} Practice Session`);
    try {
      confetti({ particleCount: 60, spread: 50 });
    } catch (e) {}
  };

  const handleReset = (newMode?: 'QUICK' | 'FOCUS' | 'CHALLENGE') => {
    if (newMode) setMode(newMode);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setIsFinished(false);
  };

  const score = questions.reduce(
    (acc, q, i) => (selectedAnswers[i] === q.correctAnswer ? acc + 1 : acc),
    0
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#171F3A] to-[#1A2342] border border-[#7657F6]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#FFC857]/20 text-[#FFC857] border border-[#FFC857]/30">
              TEQORA Objective 6
            </span>
            <span className="text-xs text-slate-400">AI Personalized Practice Generator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Personalized Practice Drills
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Targeted questions dynamically generated around your detected weak prerequisite concepts, previous errors, and mastery requirements.
          </p>
        </div>

        {/* 3 Mode Switchers */}
        <div className="flex items-center gap-2 bg-[#111831] p-1.5 rounded-xl border border-white/5">
          <button
            onClick={() => handleReset('QUICK')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mode === 'QUICK' ? 'bg-[#7657F6] text-white shadow-glow-primary' : 'text-slate-400 hover:text-white'
            }`}
          >
            ⚡ Quick Practice
          </button>
          <button
            onClick={() => handleReset('FOCUS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mode === 'FOCUS' ? 'bg-[#EF4444] text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            🎯 Focus (Weak Topics)
          </button>
          <button
            onClick={() => handleReset('CHALLENGE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mode === 'CHALLENGE' ? 'bg-[#FFC857] text-[#0B1020] shadow-glow-accent' : 'text-slate-400 hover:text-white'
            }`}
          >
            🏆 Challenge Mode
          </button>
        </div>
      </div>

      {!isFinished ? (
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#171F3A] border border-white/10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#A78BFA]">
                {mode} Practice • Question {currentIdx + 1} of {questions.length}
              </span>
              <p className="text-xs font-bold text-white mt-0.5">{questions[currentIdx].topic}</p>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/5 text-slate-300">
              {questions[currentIdx].type.replace('_', ' ')}
            </span>
          </div>

          <div className="space-y-4">
            <p className="text-base font-semibold text-white leading-relaxed">
              {questions[currentIdx].question}
            </p>

            <div className="space-y-2.5">
              {questions[currentIdx].options?.map((opt, oIdx) => {
                const isSelected = selectedAnswers[currentIdx] === opt;
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full p-4 rounded-xl border text-left text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-[#7657F6]/20 border-[#7657F6] text-white shadow-sm'
                        : 'bg-[#111831] border-white/5 text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt}</span>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-[#FFC857]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              onClick={() => handleReset()}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Regenerate & Retry</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!selectedAnswers[currentIdx]}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#7657F6] hover:bg-[#6442E8] disabled:opacity-40 text-xs font-bold text-white shadow-glow-primary transition-all"
            >
              <span>{currentIdx === questions.length - 1 ? 'Finish Drill' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in-50">
          <div className="p-6 rounded-2xl bg-[#171F3A] border border-[#7657F6]/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#7657F6]/20 border border-[#7657F6]/40 flex items-center justify-center text-[#FFC857] font-extrabold text-xl">
                {Math.round((score / questions.length) * 100)}%
              </div>
              <div>
                <h2 className="text-base font-bold text-white">
                  Practice Complete! You scored {score} of {questions.length}
                </h2>
                <p className="text-xs text-slate-300">
                  Topic mastery updated • Earned <strong className="text-[#FFC857]">+{score * 30 + 30} XP</strong>
                </p>
              </div>
            </div>

            <button
              onClick={() => handleReset()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7657F6] text-xs font-bold text-white shadow-glow-primary"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Practice</span>
            </button>
          </div>

          {/* Detailed Explanations */}
          <div className="space-y-3">
            {questions.map((q, idx) => {
              const picked = selectedAnswers[idx];
              const isCorrect = picked === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border space-y-2 ${
                    isCorrect ? 'bg-[#10B981]/5 border-[#10B981]/20' : 'bg-[#EF4444]/5 border-[#EF4444]/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Q{idx + 1}: {q.question}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isCorrect ? 'bg-[#10B981]/20 text-[#10B981]' : 'bg-[#EF4444]/20 text-[#EF4444]'
                    }`}>
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    <strong className="text-slate-400">Your Answer: </strong>
                    <span className={isCorrect ? 'text-[#10B981]' : 'text-[#EF4444]'}>{picked}</span>
                    {!isCorrect && <span className="text-[#10B981] ml-2 font-semibold">Correct: {q.correctAnswer}</span>}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    <strong className="text-slate-300">Explanation: </strong>{q.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
