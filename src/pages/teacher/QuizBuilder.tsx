import React, { useState } from 'react';
import { useEduData } from '../../contexts/DataContext';
import { BookOpen, Plus, Sparkles, BrainCircuit } from 'lucide-react';

export const QuizBuilder: React.FC = () => {
  const { addToast } = useEduData();
  const [quizTitle, setQuizTitle] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [chapter, setChapter] = useState('Linear Equations');
  const [prerequisiteTag, setPrerequisiteTag] = useState('Negative Integer Arithmetic');

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(`Published "${quizTitle || 'Diagnostic Assessment'}" with prerequisite tracking!`, 'success');
    setQuizTitle('');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5">
        <h1 className="text-2xl font-extrabold text-white">Pedagogical Quiz Builder</h1>
        <p className="text-xs text-slate-300 mt-1">
          Create adaptive quizzes tagged with foundational prerequisite concepts for AI error tracing.
        </p>
      </div>

      <form onSubmit={handlePublish} className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Quiz Title</label>
            <input
              type="text"
              required
              value={quizTitle}
              onChange={e => setQuizTitle(e.target.value)}
              placeholder="e.g. Linear Equations Diagnostic"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Subject</label>
            <select
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
            >
              <option>Mathematics</option>
              <option>Physics</option>
              <option>Chemistry</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Chapter / Topic</label>
            <input
              type="text"
              value={chapter}
              onChange={e => setChapter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <BrainCircuit className="w-3.5 h-3.5 text-[#FFC857]" />
              <span>Prerequisite Skill to Track</span>
            </label>
            <input
              type="text"
              value={prerequisiteTag}
              onChange={e => setPrerequisiteTag(e.target.value)}
              placeholder="e.g. Negative Numbers Arithmetic"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#3B82F6] hover:bg-blue-600 text-xs font-bold text-white shadow-lg transition-all"
        >
          <BookOpen className="w-4 h-4" />
          <span>Publish Quiz to Class 10-A</span>
        </button>
      </form>
    </div>
  );
};
