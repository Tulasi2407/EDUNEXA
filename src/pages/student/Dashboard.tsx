import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useEduData } from '../../contexts/DataContext';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  Sparkles,
  Flame,
  Award,
  CalendarCheck,
  TrendingUp,
  BrainCircuit,
  ArrowRight,
  BookOpen,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  ChevronRight,
  Bot
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid
} from 'recharts';
import { WEEKLY_PERFORMANCE_DATA } from '../../data/mockData';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { subjects, learningGaps, studyPlan, marks, studentXP, streakDays } = useEduData();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const unresolvedGaps = learningGaps.filter(g => g.status !== 'RESOLVED');
  const todayTasks = studyPlan.tasks.slice(0, 3);

  // Subject performance data for chart
  const subjectChartData = subjects.map(s => ({
    name: s.name.split(' ')[0],
    score: s.currentScore,
  }));

  const welcomeText = language === 'kn' ? 'ಮರಳಿ ಸ್ವಾಗತ' : language === 'hi' ? 'वापसी पर स्वागत है' : 'Welcome back';
  const gradeBadge = language === 'kn' ? '10ನೇ ತರಗತಿ-A' : language === 'hi' ? 'कक्षा 10-A' : 'Class 10-A';

  return (
    <div className="space-y-8">
      {/* 1. Personalized Welcome Header & 3 Core Answers */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#171F3A] to-[#1A2342] border border-white/5 relative overflow-hidden">
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {welcomeText}, {user.name.split(' ')[0]}! 👋
            </h1>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#7657F6]/20 text-[#A78BFA] border border-[#7657F6]/40">
              {gradeBadge}
            </span>
          </div>
          <p className="text-xs text-slate-300">
            {language === 'kn'
              ? `ನೀವು ${streakDays}-ದಿನಗಳ ಸತತ ಕಲಿಕೆಯಲ್ಲಿದ್ದೀರಿ. ಇಂದು ನಿಮ್ಮ ಕಲಿಕಾ ನ್ಯೂನತೆಗಳನ್ನು ಸುಧಾರಿಸೋಣ!`
              : language === 'hi'
              ? `आप ${streakDays}-दिनों की अध्ययन लकीर पर हैं। आइए आज अपनी अध्ययन कमियों को दूर करें!`
              : `You're on an ${streakDays}-day learning streak. Let's conquer your identified prerequisite gaps today!`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 z-10">
          <button
            onClick={() => navigate('/student/gap-finder')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#7657F6] hover:bg-[#6442E8] text-xs font-bold text-white shadow-glow-primary transition-all hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFC857]" />
            <span>{t('nav.gapFinder', 'AI Gap Finder')}</span>
          </button>
          <button
            onClick={() => navigate('/student/practice')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#EF4444]/20 hover:bg-[#EF4444]/30 border border-[#EF4444]/40 text-[#EF4444] text-xs font-bold transition-colors"
          >
            <span>🎯 {t('nav.practice', 'Practice Drills')}</span>
          </button>
          <button
            onClick={() => navigate('/student/pace')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors"
          >
            <span>⚙️ {t('nav.pace', 'Learning Pace')}</span>
          </button>
          <button
            onClick={() => navigate('/student/tutor')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors"
          >
            <Bot className="w-3.5 h-3.5 text-[#A78BFA]" />
            <span>{t('nav.tutor', 'Nexa AI')}</span>
          </button>
        </div>
      </div>

      {/* 2. Instant Answers to the 3 Essential Questions (Brief requirement) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Question 1: How am I performing? */}
        <div className="p-5 rounded-2xl bg-[#171F3A] border border-white/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase font-bold text-slate-400">1. How am I performing?</span>
              <TrendingUp className="w-4 h-4 text-[#10B981]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">3.78</span>
              <span className="text-xs font-semibold text-[#10B981]">+0.3 from last month</span>
            </div>
            <p className="text-xs text-slate-300 mt-2">
              Overall Grade: <strong className="text-white">A (88.4% Average)</strong> across 6 subjects.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
            <span className="text-slate-400">Attendance: 94.2%</span>
            <span className="text-[#FFC857] font-semibold">{studentXP.toLocaleString()} XP</span>
          </div>
        </div>

        {/* Question 2: What should I improve? */}
        <div className="p-5 rounded-2xl bg-[#171F3A] border border-[#EF4444]/30 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#EF4444]/10 rounded-full blur-xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase font-bold text-slate-400">2. What should I improve?</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EF4444]/20 text-[#EF4444]">
                {unresolvedGaps.length} Gaps Detected
              </span>
            </div>
            <p className="text-base font-bold text-white leading-snug">
              {unresolvedGaps[0]?.topic || 'Linear Equations'}
            </p>
            <p className="text-xs text-[#EF4444] mt-1.5 font-medium">
              Root Cause: {unresolvedGaps[0]?.prerequisiteWeakness || 'Negative integer operations'}
            </p>
          </div>
          <button
            onClick={() => navigate('/student/gap-finder')}
            className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#A78BFA] hover:text-white font-semibold transition-colors"
          >
            <span>Inspect Root Cause Analysis</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Question 3: What should I study next? */}
        <div className="p-5 rounded-2xl bg-[#171F3A] border border-[#7657F6]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase font-bold text-slate-400">3. What should I study next?</span>
              <Clock className="w-4 h-4 text-[#7657F6]" />
            </div>
            <p className="text-base font-bold text-white leading-snug">
              {todayTasks[0]?.topic || 'Prerequisite Integer Drill'}
            </p>
            <p className="text-xs text-slate-300 mt-1.5 flex items-center gap-1.5">
              <span>{todayTasks[0]?.timeSlot || '04:30 PM - 05:30 PM'}</span>
              <span>•</span>
              <span className="text-[#A78BFA] font-medium">{todayTasks[0]?.subject || 'Mathematics'}</span>
            </p>
          </div>
          <button
            onClick={() => navigate('/student/planner')}
            className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#7657F6] hover:text-[#9178F8] font-semibold transition-colors"
          >
            <span>Open Study Timetable</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Performance Charts & Subject Mastery */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Performance Line Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Weekly Performance & Study Trajectory</h2>
              <p className="text-xs text-slate-400">Quiz score averages vs. daily target score</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#10B981]/15 text-[#10B981]">
              On Track
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={WEEKLY_PERFORMANCE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222D52" />
                <XAxis dataKey="day" stroke="#A5B0C5" fontSize={11} />
                <YAxis stroke="#A5B0C5" fontSize={11} domain={[50, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111831',
                    borderColor: '#7657F6',
                    borderRadius: '0.75rem',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  name="Quiz Score %"
                  stroke="#7657F6"
                  strokeWidth={3}
                  dot={{ fill: '#7657F6', r: 4 }}
                  activeDot={{ r: 6, fill: '#FFC857' }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  name="Target Score"
                  stroke="#FFC857"
                  strokeDasharray="4 4"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject-wise Bar Chart */}
        <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-4">
          <div>
            <h2 className="text-base font-bold text-white">Subject Mastery Level</h2>
            <p className="text-xs text-slate-400">Current percentage proficiency</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectChartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#222D52" />
                <XAxis type="number" stroke="#A5B0C5" domain={[0, 100]} fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#A5B0C5" fontSize={11} width={50} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111831',
                    borderColor: '#7657F6',
                    borderRadius: '0.75rem',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="score" name="Score %" fill="#7657F6" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. Active Learning Gaps & Today's Timetable */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Identified Gaps Widget */}
        <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-[#FFC857]" />
              <h2 className="text-base font-bold text-white">Active Learning Gaps (AI Identified)</h2>
            </div>
            <button
              onClick={() => navigate('/student/gap-finder')}
              className="text-xs text-[#A78BFA] hover:text-white font-semibold"
            >
              Run Diagnostic →
            </button>
          </div>

          <div className="space-y-3">
            {unresolvedGaps.map((gap) => (
              <div
                key={gap.id}
                className="p-4 rounded-xl bg-[#111831] border border-white/5 space-y-2 hover:border-[#7657F6]/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{gap.topic}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      gap.severity === 'CRITICAL'
                        ? 'bg-[#EF4444]/20 text-[#EF4444]'
                        : gap.severity === 'MODERATE'
                        ? 'bg-[#F59E0B]/20 text-[#F59E0B]'
                        : 'bg-[#10B981]/20 text-[#10B981]'
                    }`}
                  >
                    {gap.severity} ({gap.performanceScore}%)
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  <strong className="text-slate-400">Root Cause:</strong> {gap.prerequisiteWeakness}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-400">Subject: {gap.subject}</span>
                  <button
                    onClick={() => navigate('/student/tutor')}
                    className="text-xs text-[#7657F6] hover:text-[#9178F8] font-semibold"
                  >
                    Remediate with Nexa AI →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Study Tasks */}
        <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#7657F6]" />
              <h2 className="text-base font-bold text-white">Today's Study Schedule</h2>
            </div>
            <button
              onClick={() => navigate('/student/planner')}
              className="text-xs text-[#A78BFA] hover:text-white font-semibold"
            >
              Full Timetable →
            </button>
          </div>

          <div className="space-y-3">
            {todayTasks.map((task) => (
              <div
                key={task.id}
                className="p-3.5 rounded-xl bg-[#111831] border border-white/5 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-10 rounded-full ${
                      task.type === 'PREREQUISITE_FIX'
                        ? 'bg-[#EF4444]'
                        : task.type === 'PRACTICE_QUIZ'
                        ? 'bg-[#7657F6]'
                        : 'bg-[#3B82F6]'
                    }`}
                  />
                  <div>
                    <p className="text-xs font-bold text-white">{task.topic}</p>
                    <p className="text-[11px] text-slate-400">
                      {task.timeSlot} • {task.durationMinutes} mins
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    task.completed
                      ? 'bg-[#10B981]/20 text-[#10B981]'
                      : 'bg-[#FFC857]/20 text-[#FFC857]'
                  }`}
                >
                  {task.completed ? 'Completed' : 'Upcoming'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
