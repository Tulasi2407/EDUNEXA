import React, { useState } from 'react';
import { useEduData } from '../../contexts/DataContext';
import { generateStudyPlanWithAI } from '../../lib/gemini';
import {
  CalendarDays,
  Sparkles,
  Clock,
  CheckCircle2,
  Calendar,
  AlertCircle,
  BarChart2,
  ChevronRight,
  Plus,
  Play,
  RotateCcw,
  Target
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const StudyPlanner: React.FC = () => {
  const { studyPlan, toggleStudyTask, updateStudyPlan, learningGaps, studentXP } = useEduData();

  // Generator inputs
  const [dailyHours, setDailyHours] = useState<number>(3);
  const [examDate, setExamDate] = useState<string>('2026-12-05');
  const [selectedDayFilter, setSelectedDayFilter] = useState<string>('All');
  const [schoolHours, setSchoolHours] = useState<string>('08:00 AM - 03:30 PM (School Session)');
  const [sleepHours, setSleepHours] = useState<string>('10:30 PM - 06:30 AM (Sleep Window)');
  const [isGenerating, setIsGenerating] = useState(false);

  const daysOfWeek = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const weakSubjects = Array.from(new Set(learningGaps.filter(g => g.status !== 'RESOLVED').map(g => g.subject)));
  const strongSubjects = ['English', 'Social Science'];

  // Today's Mission Tasks (Monday by default for demo)
  const todayTasks = studyPlan.tasks.filter(t => t.day === 'Monday');
  const todayCompleted = todayTasks.filter(t => t.completed).length;
  const todayTotal = todayTasks.length;
  const todayPercent = todayTotal > 0 ? Math.round((todayCompleted / todayTotal) * 100) : 0;
  const todayDuration = todayTasks.reduce((acc, t) => acc + t.durationMinutes, 0);

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    try {
      const generated = await generateStudyPlanWithAI(dailyHours, examDate, weakSubjects, strongSubjects);
      updateStudyPlan({
        id: `plan_${Date.now()}`,
        title: `AI Prerequisite Remediation Timetable (${dailyHours}h/day)`,
        weeklyTargetHours: generated.weeklyTargetHours,
        completedHours: 0,
        dailyGoalHours: generated.dailyGoalHours,
        examDate,
        tasks: generated.tasks.map((t: any, i: number) => ({
          ...t,
          id: `task_${Date.now()}_${i}`,
          completed: false
        }))
      });
      try {
        confetti({ particleCount: 50, spread: 60 });
      } catch (e) {}
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredTasks = selectedDayFilter === 'All'
    ? studyPlan.tasks
    : studyPlan.tasks.filter(t => t.day === selectedDayFilter);

  const totalTasks = studyPlan.tasks.length;
  const completedTasks = studyPlan.tasks.filter(t => t.completed).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#171F3A] to-[#1A2342] border border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#7657F6]/20 text-[#A78BFA] border border-[#7657F6]/30">
              AI Timetable Architect
            </span>
            <span className="text-xs text-slate-400">Exam: {studyPlan.examDate || 'Dec 5, 2026'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Personalized Study Planner
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Automatically allocates extra time to your detected prerequisite gaps while maintaining regular subject revision and restorative breaks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-slate-400">Planned vs Completed</p>
            <p className="text-base font-extrabold text-white">
              {studyPlan.completedHours}h <span className="text-slate-400 text-xs font-normal">/ {studyPlan.weeklyTargetHours}h target</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#7657F6]/20 border border-[#7657F6]/40 flex items-center justify-center text-[#FFC857] font-bold text-sm">
            {progressPercent}%
          </div>
        </div>
      </div>

      {/* TEQORA Objective 7: Today's Learning Mission */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#171F3A] to-[#111831] border border-[#FFC857]/40 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFC857]/20 border border-[#FFC857]/40 flex items-center justify-center text-[#FFC857]">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFC857]/20 text-[#FFC857]">
                  Today's Learning Mission
                </span>
                <span className="text-xs text-slate-400">Total Duration: {Math.round(todayDuration / 60 * 10) / 10} hours</span>
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">
                {todayCompleted} of {todayTotal} Tasks Finished ({todayPercent}% Complete)
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleGeneratePlan}
              disabled={isGenerating}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFC857] hover:bg-amber-400 text-xs font-bold text-[#0B1020] shadow-glow-accent transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Regenerate My Schedule</span>
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-[#0B1020] h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#7657F6] to-[#FFC857] h-full transition-all duration-300"
            style={{ width: `${todayPercent}%` }}
          />
        </div>

        {/* Quick Task Pills for Today */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {todayTasks.map(t => (
            <div
              key={t.id}
              onClick={() => toggleStudyTask(t.id)}
              className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                t.completed
                  ? 'bg-[#10B981]/10 border-[#10B981]/30 text-slate-300'
                  : 'bg-[#171F3A] border-white/5 hover:border-[#7657F6]/40 text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                  t.completed ? 'bg-[#10B981] border-[#10B981] text-white' : 'border-white/20'
                }`}>
                  {t.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate">{t.topic}</p>
                  <p className="text-[10px] text-slate-400">{t.timeSlot} • {t.durationMinutes}m</p>
                </div>
              </div>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                t.type === 'PREREQUISITE_FIX' ? 'bg-[#EF4444]/20 text-[#EF4444]' : 'bg-[#7657F6]/20 text-[#A78BFA]'
              }`}>
                {t.type.replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Timetable Generator Controls */}
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FFC857]" />
            Free-Time Schedule Calibration
          </h2>
          <span className="text-xs text-slate-400">Strictly respects unavailable hours</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              Available Free Time: <strong className="text-[#FFC857]">{dailyHours} hours/day</strong>
            </label>
            <input
              type="range"
              min={1}
              max={6}
              step={0.5}
              value={dailyHours}
              onChange={(e) => setDailyHours(parseFloat(e.target.value))}
              className="w-full accent-[#7657F6] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>1 hr (Light)</span>
              <span>3 hrs (Balanced)</span>
              <span>6 hrs (Intensive)</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">School / College Timings (Protected)</label>
            <input
              type="text"
              value={schoolHours}
              onChange={e => setSchoolHours(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#111831] border border-white/10 text-xs text-slate-300"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Target Exam Date</label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7657F6]"
            />
          </div>
        </div>
      </div>

      {/* Day Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {daysOfWeek.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDayFilter(day)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedDayFilter === day
                ? 'bg-[#7657F6] text-white shadow-glow-primary'
                : 'bg-[#171F3A] text-slate-400 hover:text-white hover:bg-white/5 border border-white/5'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Timetable Task List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleStudyTask(task.id)}
            className={`p-4 rounded-xl border flex items-center justify-between gap-4 cursor-pointer transition-all ${
              task.completed
                ? 'bg-[#111831]/60 border-white/5 opacity-60'
                : 'bg-[#171F3A] border-white/5 hover:border-[#7657F6]/50 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <button
                type="button"
                className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                  task.completed
                    ? 'bg-[#10B981] border-[#10B981] text-white'
                    : 'border-white/20 hover:border-[#7657F6]'
                }`}
              >
                {task.completed && <CheckCircle2 className="w-4 h-4" />}
              </button>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    task.type === 'PREREQUISITE_FIX'
                      ? 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30'
                      : task.type === 'PRACTICE_QUIZ'
                      ? 'bg-[#7657F6]/20 text-[#A78BFA] border border-[#7657F6]/30'
                      : task.type === 'BREAK'
                      ? 'bg-[#10B981]/20 text-[#10B981]'
                      : 'bg-[#3B82F6]/20 text-[#60A5FA]'
                  }`}>
                    {task.type.replace('_', ' ')}
                  </span>
                  <span className="text-xs font-bold text-white truncate">{task.topic}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {task.day} • {task.timeSlot} ({task.durationMinutes} mins) • Subject: <strong className="text-slate-300">{task.subject}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[10px] font-bold text-[#FFC857]">
                {task.completed ? '+40 XP Awarded' : '+40 XP on Complete'}
              </span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                task.priority === 'HIGH' ? 'text-[#EF4444]' : 'text-slate-400'
              }`}>
                {task.priority} Priority
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
