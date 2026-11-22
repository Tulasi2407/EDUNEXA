import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEduData } from '../../contexts/DataContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { DIAGNOSTIC_QUESTIONS } from '../../data/mockData';
import { analyzeLearningGapsWithAI, LearningGapAnalysisResult } from '../../lib/gemini';
import {
  Sparkles,
  BrainCircuit,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  RotateCcw,
  BookOpen,
  CalendarDays,
  Bot,
  Flame,
  Award,
  ChevronRight,
  Activity,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ConceptDependencyMap } from '../../components/common/ConceptDependencyMap';

export const SSLC_SUBJECTS = [
  'Kannada',
  'English',
  'Hindi',
  'Mathematics',
  'Science',
  'Social Science'
] as const;

export const SSLC_CHAPTERS: Record<string, string[]> = {
  'Mathematics': [
    'Arithmetic Progressions',
    'Triangles',
    'Pair of Linear Equations in Two Variables',
    'Circles',
    'Areas Related to Circles',
    'Constructions',
    'Coordinate Geometry',
    'Real Numbers',
    'Polynomials',
    'Quadratic Equations',
    'Introduction to Trigonometry',
    'Some Applications of Trigonometry',
    'Statistics',
    'Probability',
    'Surface Areas and Volumes'
  ],
  'Science': [
    'Chemical Reactions and Equations',
    'Acids, Bases and Salts',
    'Metals and Non-metals',
    'Carbon and Its Compounds',
    'Periodic Classification of Elements',
    'Life Processes',
    'Control and Coordination',
    'How do Organisms Reproduce?',
    'Heredity and Evolution',
    'Light - Reflection and Refraction',
    'The Human Eye and Colourful World',
    'Electricity',
    'Magnetic Effects of Electric Current',
    'Sources of Energy',
    'Our Environment',
    'Sustainable Management of Natural Resources'
  ],
  'Social Science': [
    'Advent of Europeans to India',
    'The Extension of the British Rule',
    'The Impact of the British Rule',
    'Opposition to British Rule in Karnataka',
    'Social and Religious Reformation Movements',
    'First War of Indian Independence (1857)',
    'Freedom Movement',
    'Era of Gandhi and National Movement',
    'Post Independent India',
    'Political Dimensions of the 20th Century',
    "India's Foreign Policy",
    'Global Problems and India’s Role',
    'Indian Physiography & Climate',
    'Indian Soils & Forest Resources',
    'Economy and Government',
    'Rural Development & Banking'
  ],
  'Kannada': [
    'ಯುದ್ಧ (ಕಥೆ - ಸಾರಾ ಅಬೂಬಕ್ಕರ್)',
    'ಶಬರಿ (ನಾಟಕ - ಪು.ತಿ.ನ.)',
    'ಭಾಗ್ಯಶಿಲ್ಪಿಗಳು (ವ್ಯಕ್ತಿಚಿತ್ರ)',
    'ಎದೆಗೆ ಬಿದ್ದ ಅಕ್ಷರ (ದೇವನೂರ ಮಹಾದೇವ)',
    'ವ್ಯಾಘ್ರಗೀತೆ (ಎ.ಎನ್. ಮೂರ್ತಿರಾವ್)',
    'ಸಂಕಲ್ಪ ಗೀತೆ (ಜಿ.ಎಸ್. ಶಿವರುದ್ರಪ್ಪ)',
    'ಹಲ್ಮಿಡಿ ಶಾಸನ ಮತ್ತು ಸಂಧಿ-ಸಮಾಸಗಳು'
  ],
  'English': [
    'A Hero (R. K. Narayan)',
    "There's a Girl by the Tracks! (Deven Kanal)",
    'Gentleman of Rio en Medio (Juan A.A. Sedillo)',
    'Dr. B. R. Ambedkar (Sri R. Venkataraman)',
    'The Concert (Shanta Rameshwar Rao)',
    'Colours of School (Anuradha De)',
    'Quality (John Galsworthy)',
    'Grammar: Reported Speech, Voice & Clauses'
  ],
  'Hindi': [
    'मातृभूमि (भगवतीचरण वर्मा)',
    'कश्मीरी सेब (प्रेमचंद)',
    'गिल्लू (महादेवी वर्मा)',
    'अभिनव मनुष्य (रामधारी सिंह दिनकर)',
    'मेरा बचपन (सुभद्रा कुमारी चौहान)',
    'व्याकरण: संधि, समास और मुहावरे'
  ]
};

export const LearningGapFinder: React.FC = () => {
  const { learningGaps, addLearningGap, resolveLearningGap, addXP } = useEduData();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Wizard State
  const [selectedGrade, setSelectedGrade] = useState('Class 10');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [selectedChapter, setSelectedChapter] = useState('Pair of Linear Equations in Two Variables');
  const [reportedDifficulty, setReportedDifficulty] = useState('Struggling with negative signs when rearranging equations.');

  // Diagnostic Quiz State
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiResult, setAiResult] = useState<LearningGapAnalysisResult | null>(null);

  // Relevant questions for diagnostic matching active subject
  const subjectIdMap: Record<string, string> = {
    'Kannada': 'sub_kan',
    'English': 'sub_eng',
    'Hindi': 'sub_hin',
    'Mathematics': 'sub_math',
    'Science': 'sub_sci',
    'Social Science': 'sub_soc',
  };

  const matchedQuestions = DIAGNOSTIC_QUESTIONS.filter(
    q => q.subjectId === subjectIdMap[selectedSubject]
  );
  const activeQuestions = matchedQuestions.length > 0 ? matchedQuestions : DIAGNOSTIC_QUESTIONS.slice(0, 4);

  const handleSelectOption = (optionIndex: number) => {
    const updated = [...userAnswers];
    updated[currentQuestionIndex] = optionIndex;
    setUserAnswers(updated);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleCompleteQuiz();
    }
  };

  const handleCompleteQuiz = async () => {
    setIsSubmitting(true);

    const responses = activeQuestions.map((q, idx) => ({
      question: q.question,
      studentAnswer: q.options[userAnswers[idx]] || 'No answer',
      correctAnswer: q.options[q.correctIndex],
      isCorrect: userAnswers[idx] === q.correctIndex,
      topic: q.topic,
      prerequisite: q.prerequisiteConcept
    }));

    try {
      const result = await analyzeLearningGapsWithAI(selectedSubject, selectedChapter, responses);
      setAiResult(result);

      // Save each identified gap into global state
      result.weakTopics.forEach((wt) => {
        addLearningGap({
          id: `gap_ai_${Date.now()}_${Math.random().toString().slice(2, 5)}`,
          subject: wt.subject,
          chapter: wt.chapter,
          topic: wt.topic,
          performanceScore: wt.accuracyScore,
          severity: wt.severity,
          identifiedGap: wt.identifiedGap,
          prerequisiteWeakness: wt.prerequisiteWeakness,
          evidence: wt.evidence,
          recommendedSequence: wt.revisionSteps,
          status: 'PENDING',
          detectedDate: new Date().toISOString().split('T')[0]
        });
      });

      addXP(80, 'Diagnostic Assessment Completed');
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      } catch (e) {}
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setAiResult(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#171F3A] to-[#1A2342] border border-[#7657F6]/30">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#FFC857]/20 text-[#FFC857] border border-[#FFC857]/30">
              Core Innovation
            </span>
            <span className="text-xs text-slate-400">Step 1-5 Complete Workflow</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            AI Learning Gap Finder
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Go beyond simple test scoring. EduNexa analyzes incorrect answer patterns to detect foundational prerequisite concepts that block mastery.
          </p>
        </div>

        <button
          onClick={() => navigate('/student/tutor')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors"
        >
          <Bot className="w-4 h-4 text-[#A78BFA]" />
          <span>Open Nexa AI Tutor</span>
        </button>
      </div>

      {!quizStarted && !aiResult && (
        /* STEP 1: Collect Learning Information Form */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">{t('gap.title', 'Step 1: Diagnostic Scope Selection')}</h2>
              <p className="text-xs text-slate-400">{t('gap.subtitle', 'Tell us what you want to assess today')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-300">{t('common.gradeLevel', 'Grade Level')}</label>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFC857]/20 text-[#FFC857] border border-[#FFC857]/30 font-bold">
                    Class 10 Exclusively
                  </span>
                </div>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-[#7657F6]/40 text-xs text-white focus:outline-none focus:border-[#7657F6] font-bold"
                >
                  <option value="Class 10">Class 10 (Karnataka SSLC State Board)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-300">{t('common.subject', 'Subject')}</label>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7657F6]/20 text-[#A78BFA] border border-[#7657F6]/30 font-semibold">
                    6 Board Subjects
                  </span>
                </div>
                <select
                  value={selectedSubject}
                  onChange={(e) => {
                    const newSub = e.target.value;
                    setSelectedSubject(newSub);
                    const chaps = SSLC_CHAPTERS[newSub] || [];
                    setSelectedChapter(chaps[0] || 'Chapter 1');
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7657F6] font-semibold"
                >
                  <option value="Kannada">{t('sub.kannada', 'Kannada (First Language)')}</option>
                  <option value="English">{t('sub.english', 'English (Second Language)')}</option>
                  <option value="Hindi">{t('sub.hindi', 'Hindi (Third Language)')}</option>
                  <option value="Mathematics">{t('sub.mathematics', 'Mathematics')}</option>
                  <option value="Science">{t('sub.science', 'Science')}</option>
                  <option value="Social Science">{t('sub.socialScience', 'Social Science')}</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-medium text-slate-300">{t('common.targetChapter', 'Target Chapter')}</label>
                <select
                  value={selectedChapter}
                  onChange={(e) => setSelectedChapter(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7657F6]"
                >
                  {(SSLC_CHAPTERS[selectedSubject] || ['General Chapter']).map((chap) => (
                    <option key={chap} value={chap}>{chap}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  {t('gap.stumblingBlocks', 'Self-Reported Stumbling Blocks (Optional)')}
                </label>
                <textarea
                  rows={3}
                  value={reportedDifficulty}
                  onChange={(e) => setReportedDifficulty(e.target.value)}
                  placeholder="e.g. I get confused whenever negative signs are involved in division..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7657F6]"
                />
              </div>
            </div>

            <button
              onClick={() => setQuizStarted(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7657F6] hover:bg-[#6442E8] text-xs font-bold text-white shadow-glow-primary transition-all hover:scale-105"
            >
              <span>{t('gap.startBtn', 'Begin AI Diagnostic Assessment (4 Questions)')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Explanation Card */}
          <div className="p-6 rounded-2xl bg-[#111831] border border-white/5 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#7657F6]/15 border border-[#7657F6]/30 flex items-center justify-center text-[#A78BFA]">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">How EduNexa Traces Root Causes</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When a student misses an equation like <code className="text-[#FFC857]">-3x = -21</code>, the error isn't algebraic concept blindness — it's usually unmastered integer arithmetic rules from earlier grades.
            </p>
            <div className="p-3 rounded-xl bg-[#171F3A] border border-white/5 text-xs text-slate-400 space-y-1.5">
              <p className="font-semibold text-[#A78BFA]">What the engine analyzes:</p>
              <ul className="list-disc list-inside space-y-1 text-[11px]">
                <li>Sign transformation error patterns</li>
                <li>Distributive property adherence</li>
                <li>Sub-concept prerequisite dependency mapping</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Interactive Diagnostic Assessment in Progress */}
      {quizStarted && !aiResult && (
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#171F3A] border border-white/10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#A78BFA]">
                Diagnostic Question {currentQuestionIndex + 1} of {activeQuestions.length}
              </span>
              <h3 className="text-sm font-bold text-white mt-0.5">
                {activeQuestions[currentQuestionIndex].topic}
              </h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 text-slate-300">
              {activeQuestions[currentQuestionIndex].difficulty}
            </span>
          </div>

          <div className="space-y-4">
            <p className="text-base font-semibold text-white">
              {activeQuestions[currentQuestionIndex].question}
            </p>

            <div className="space-y-2.5">
              {activeQuestions[currentQuestionIndex].options.map((option, idx) => {
                const isSelected = userAnswers[currentQuestionIndex] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-[#7657F6]/20 border-[#7657F6] text-white shadow-sm'
                        : 'bg-[#111831] border-white/5 text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-[#FFC857]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className="text-xs text-slate-400 hover:text-white disabled:opacity-30"
            >
              Previous
            </button>

            <button
              onClick={handleNextQuestion}
              disabled={userAnswers[currentQuestionIndex] === undefined || isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#7657F6] hover:bg-[#6442E8] disabled:opacity-50 text-xs font-bold text-white shadow-glow-primary transition-all"
            >
              {isSubmitting ? (
                <span>AI Analyzing Error Patterns...</span>
              ) : currentQuestionIndex === activeQuestions.length - 1 ? (
                <span>Complete Assessment & Generate AI Diagnosis</span>
              ) : (
                <>
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 3, 4, 5: AI Gap Analysis Results & Actionable Remediation */}
      {aiResult && (
        <div className="space-y-6 animate-in fade-in-50">
          {/* Summary Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#171F3A] to-[#111831] border border-[#7657F6]/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                <h2 className="text-xl font-bold text-white">Diagnostic Analysis Complete</h2>
              </div>
              <p className="text-xs text-slate-300 max-w-2xl">{aiResult.overallDiagnosis}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake</span>
              </button>
              <button
                onClick={() => navigate('/student/planner')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7657F6] hover:bg-[#6442E8] text-xs font-bold text-white shadow-glow-primary transition-all"
              >
                <CalendarDays className="w-4 h-4" />
                <span>Build Timetable for Gaps</span>
              </button>
            </div>
          </div>

          {/* Identified Gaps Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiResult.weakTopics.map((wt, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#171F3A] border border-[#EF4444]/40 shadow-xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#A78BFA] uppercase tracking-wider">
                    {wt.subject} • {wt.chapter}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                      wt.severity === 'CRITICAL'
                        ? 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40'
                        : 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40'
                    }`}
                  >
                    {wt.severity} GAP ({wt.accuracyScore}%)
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white">{wt.topic}</h3>

                {/* Root Cause & Prerequisite Distinction (Strict brief requirement) */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-[#111831] border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      Identified Learning Difficulty:
                    </span>
                    <p className="text-xs text-slate-200">{wt.identifiedGap}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/20 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#EF4444]">
                      Inferred Prerequisite Weakness:
                    </span>
                    <p className="text-xs font-semibold text-white">{wt.prerequisiteWeakness}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-slate-300">
                    <strong className="text-slate-400">Evidence from Responses: </strong>
                    {wt.evidence}
                  </div>
                </div>

                {/* 4-Step Remediation Sequence */}
                <div className="pt-2 border-t border-white/10 space-y-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-[#FFC857]" />
                    Recommended Remediation Roadmap
                  </span>
                  <div className="space-y-1.5">
                    {wt.revisionSteps.map((step, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7657F6] shrink-0 mt-1.5" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => navigate('/student/tutor')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#7657F6]/20 hover:bg-[#7657F6]/30 border border-[#7657F6]/40 text-xs font-bold text-[#A78BFA] transition-colors"
                >
                  <Bot className="w-4 h-4" />
                  <span>Practice this Prerequisite with Nexa AI Tutor</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TEQORA Objective 2: Concept Dependency Map */}
      <ConceptDependencyMap />

      {/* TEQORA Objective 1: Strong vs Weak Learning Areas & Repeated Mistake Detector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#171F3A] border border-[#10B981]/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              <span>Verified Strong Learning Areas (Mastery &gt; 80%)</span>
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981]">
              4 Topics
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-[#111831] border border-white/5 flex items-center justify-between">
              <div>
                <p className="font-bold text-white">Wave Optics & Reflection</p>
                <p className="text-[10px] text-slate-400">Science • Ray diagrams & Laws of reflection</p>
              </div>
              <span className="font-bold text-[#10B981]">92% Mastery</span>
            </div>
            <div className="p-3 rounded-xl bg-[#111831] border border-white/5 flex items-center justify-between">
              <div>
                <p className="font-bold text-white">Triangles & Similar Figures</p>
                <p className="text-[10px] text-slate-400">Geometry • Proportionality theorems</p>
              </div>
              <span className="font-bold text-[#10B981]">88% Mastery</span>
            </div>
            <div className="p-3 rounded-xl bg-[#111831] border border-white/5 flex items-center justify-between">
              <div>
                <p className="font-bold text-white">Cellular Aerobic Pathways</p>
                <p className="text-[10px] text-slate-400">Biology • Krebs cycle & ATP formation</p>
              </div>
              <span className="font-bold text-[#10B981]">85% Mastery</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#171F3A] border border-[#EF4444]/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
              <span>Repeated Mistake Patterns (Requires Revision)</span>
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EF4444]/20 text-[#EF4444]">
              High Priority
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-[#111831] border border-white/5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Pattern: Sign Transposition Errors</span>
                <span className="text-[10px] text-[#EF4444] font-bold">3 Repeated Occurrences</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Dropping negative multipliers when isolating variables (e.g., writing x = 21 instead of x = 7 from -3x = -21).
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[#111831] border border-white/5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Pattern: Mirror Sign Convention Confusion</span>
                <span className="text-[10px] text-[#F59E0B] font-bold">2 Repeated Occurrences</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Assuming concave mirror focal lengths are positive rather than adhering to the left-of-pole negative convention.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* STEP 5: Interactive Learning Gap Dashboard Heatmap */}
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Prerequisite Knowledge Gap Registry</h2>
            <p className="text-xs text-slate-400">All historical and active learning gaps for Alex Johnson</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#7657F6]/20 text-[#A78BFA]">
            {learningGaps.filter(g => g.status === 'RESOLVED').length} Resolved Gaps
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {learningGaps.map((gap) => (
            <div
              key={gap.id}
              className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                gap.status === 'RESOLVED'
                  ? 'bg-[#10B981]/5 border-[#10B981]/20 opacity-70'
                  : 'bg-[#111831] border-white/5 hover:border-[#7657F6]/40'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{gap.subject}</span>
                  <span
                    className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                      gap.status === 'RESOLVED'
                        ? 'bg-[#10B981]/20 text-[#10B981]'
                        : gap.severity === 'CRITICAL'
                        ? 'bg-[#EF4444]/20 text-[#EF4444]'
                        : 'bg-[#F59E0B]/20 text-[#F59E0B]'
                    }`}
                  >
                    {gap.status === 'RESOLVED' ? 'RESOLVED' : `${gap.severity} (${gap.performanceScore}%)`}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white">{gap.topic}</h4>
                <p className="text-[11px] text-slate-400">
                  <strong className="text-slate-300">Prerequisite:</strong> {gap.prerequisiteWeakness}
                </p>
              </div>

              {gap.status !== 'RESOLVED' && (
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => resolveLearningGap(gap.id)}
                    className="text-[11px] font-semibold text-[#10B981] hover:underline"
                  >
                    Mark Remediated (+150 XP)
                  </button>
                  <button
                    onClick={() => navigate('/student/tutor')}
                    className="text-[11px] font-semibold text-[#7657F6] hover:text-[#9178F8]"
                  >
                    Tutor →
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
