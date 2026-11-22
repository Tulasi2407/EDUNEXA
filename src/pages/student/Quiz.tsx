import React, { useState, useEffect } from 'react';
import { useEduData } from '../../contexts/DataContext';
import { DIAGNOSTIC_QUESTIONS } from '../../data/mockData';
import { QuizQuestion } from '../../types';
import {
  GraduationCap,
  Timer,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  BrainCircuit,
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Quiz: React.FC = () => {
  const { addXP, addLearningGap } = useEduData();

  const [selectedSubject, setSelectedSubject] = useState('sub_math');
  const [quizActive, setQuizActive] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(25); // 25s per question
  const [quizFinished, setQuizFinished] = useState(false);

  // Filter questions for active subject
  const questions: QuizQuestion[] = DIAGNOSTIC_QUESTIONS;

  useEffect(() => {
    let timer: any;
    if (quizActive && !quizFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && quizActive && !quizFinished) {
      handleNext(true);
    }
    return () => clearInterval(timer);
  }, [quizActive, quizFinished, timeLeft]);

  const handleStart = () => {
    setQuizActive(true);
    setQuizFinished(false);
    setCurrentIdx(0);
    setSelectedAnswers([]);
    setTimeLeft(25);
  };

  const handleSelect = (idx: number) => {
    const updated = [...selectedAnswers];
    updated[currentIdx] = idx;
    setSelectedAnswers(updated);
  };

  const handleNext = (timeout: boolean = false) => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setTimeLeft(25);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setQuizFinished(true);
    let correctCount = 0;
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctIndex) {
        correctCount++;
      } else {
        // Log mistake into learning gaps if not already there
        if (q.prerequisiteConcept) {
          const subNameMap: Record<string, string> = {
            sub_math: 'Mathematics',
            sub_sci: 'Science',
            sub_soc: 'Social Science',
            sub_kan: 'Kannada',
            sub_eng: 'English',
            sub_hin: 'Hindi'
          };
          addLearningGap({
            id: `gap_quiz_${Date.now()}_${i}`,
            subject: subNameMap[q.subjectId] || 'Mathematics',
            chapter: q.chapter,
            topic: q.topic,
            performanceScore: 40,
            severity: 'MODERATE',
            identifiedGap: `Missed question: "${q.question}"`,
            prerequisiteWeakness: q.prerequisiteConcept,
            evidence: `Selected wrong answer under timed pressure.`,
            recommendedSequence: [
              `Review ${q.prerequisiteConcept}`,
              'Practice 3 targeted drills',
              'Retake speed assessment'
            ],
            status: 'PENDING',
            detectedDate: new Date().toISOString().split('T')[0]
          });
        }
      }
    });

    const xpEarned = correctCount * 25 + 50;
    addXP(xpEarned, `Completed Topic Quiz (${correctCount}/${questions.length})`);
    try {
      confetti({ particleCount: 70, spread: 60 });
    } catch (e) {}
  };

  const score = questions.reduce((acc, q, i) => (selectedAnswers[i] === q.correctIndex ? acc + 1 : acc), 0);
  const accuracy = Math.round((score / questions.length) * 100);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#171F3A] to-[#1A2342] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#7657F6]/20 text-[#A78BFA] border border-[#7657F6]/30">
              Assessment Module
            </span>
            <span className="text-xs text-slate-400">Timed Practice & Gap Check</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Quizzes & Assessments</h1>
          <p className="text-xs text-slate-300 mt-1">
            Test your knowledge under timed conditions. Mistakes immediately feed back into your personalized prerequisite remediation roadmap.
          </p>
        </div>

        {!quizActive && (
          <button
            onClick={handleStart}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7657F6] hover:bg-[#6442E8] text-xs font-bold text-white shadow-glow-primary transition-all hover:scale-105"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Launch Timed Quiz ({questions.length} Questions)</span>
          </button>
        )}
      </div>

      {/* Quiz Question Card */}
      {quizActive && !quizFinished && (
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#171F3A] border border-white/10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#A78BFA]">
                Question {currentIdx + 1} of {questions.length} • {questions[currentIdx].chapter}
              </span>
              <h3 className="text-xs font-bold text-white mt-0.5">{questions[currentIdx].topic}</h3>
            </div>

            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold ${
              timeLeft <= 5
                ? 'bg-[#EF4444]/20 border-[#EF4444]/40 text-[#EF4444] animate-pulse'
                : 'bg-white/5 border-white/10 text-white'
            }`}>
              <Timer className="w-4 h-4" />
              <span>{timeLeft}s</span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-base font-semibold text-white leading-relaxed">
              {questions[currentIdx].question}
            </p>

            <div className="space-y-2.5">
              {questions[currentIdx].options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[currentIdx] === oIdx;
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelect(oIdx)}
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
            <span className="text-xs text-slate-400">
              Difficulty: <strong className="text-slate-300">{questions[currentIdx].difficulty}</strong>
            </span>

            <button
              onClick={() => handleNext(false)}
              disabled={selectedAnswers[currentIdx] === undefined}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#7657F6] hover:bg-[#6442E8] disabled:opacity-40 text-xs font-bold text-white shadow-glow-primary transition-all"
            >
              <span>{currentIdx === questions.length - 1 ? 'Finish & Review' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Quiz Review & Results */}
      {quizFinished && (
        <div className="space-y-6 animate-in fade-in-50">
          <div className="p-6 rounded-2xl bg-[#171F3A] border border-[#7657F6]/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#7657F6]/20 border border-[#7657F6]/40 flex items-center justify-center text-[#FFC857] font-extrabold text-2xl shadow-glow-accent">
                {accuracy}%
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Quiz Completed! You scored {score} / {questions.length}
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  Earned <strong className="text-[#FFC857]">+{score * 25 + 50} XP</strong> • Learning gaps updated based on incorrect responses.
                </p>
              </div>
            </div>

            <button
              onClick={handleStart}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7657F6] hover:bg-[#6442E8] text-xs font-bold text-white shadow-glow-primary"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
          </div>

          {/* Question Breakdown with Explanations */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Detailed Pedagogical Review</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions.map((q, idx) => {
                const userPick = selectedAnswers[idx];
                const isCorrect = userPick === q.correctIndex;
                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border space-y-3 ${
                      isCorrect
                        ? 'bg-[#10B981]/5 border-[#10B981]/20'
                        : 'bg-[#EF4444]/5 border-[#EF4444]/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">Question {idx + 1}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        isCorrect
                          ? 'bg-[#10B981]/20 text-[#10B981]'
                          : 'bg-[#EF4444]/20 text-[#EF4444]'
                      }`}>
                        {isCorrect ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-white">{q.question}</p>

                    <div className="text-[11px] space-y-1">
                      <p className="text-slate-400">
                        Your Answer: <span className={isCorrect ? 'text-[#10B981] font-bold' : 'text-[#EF4444] font-bold'}>
                          {userPick !== undefined ? q.options[userPick] : 'Timed Out'}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-[#10B981] font-semibold">
                          Correct: {q.options[q.correctIndex]}
                        </p>
                      )}
                    </div>

                    <div className="p-3 rounded-xl bg-[#111831] border border-white/5 text-[11px] text-slate-300">
                      <strong className="text-slate-400">Explanation: </strong>
                      {q.explanation}
                    </div>

                    {!isCorrect && q.prerequisiteConcept && (
                      <div className="text-[11px] text-[#EF4444] font-medium flex items-center gap-1">
                        <BrainCircuit className="w-3.5 h-3.5" />
                        <span>Prerequisite to review: {q.prerequisiteConcept}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
