import React, { useState, useRef, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { askNexaTutor } from '../../lib/gemini';
import { useEduData } from '../../contexts/DataContext';
import {
  Bot,
  Send,
  Sparkles,
  RotateCcw,
  BookOpen,
  HelpCircle,
  Volume2,
  Globe,
  Flame,
  CheckCircle2,
  BrainCircuit
} from 'lucide-react';

interface ChatBubble {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  mode: string;
  language: string;
}

export const AITutor: React.FC = () => {
  const { language: parentLang } = useOutletContext<{ language: 'en' | 'hi' | 'kn' }>() || { language: 'en' };
  const { learningGaps, addXP } = useEduData();

  const [subject, setSubject] = useState('Mathematics');
  const [learningMode, setLearningMode] = useState<'BEGINNER' | 'STEP_BY_STEP' | 'EXAM_PREP' | 'PRACTICE' | 'QUICK_REVISION'>('STEP_BY_STEP');
  const [language, setLanguage] = useState<'en' | 'hi' | 'kn'>(parentLang || 'en');
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<ChatBubble[]>([
    {
      id: 'init_1',
      sender: 'assistant',
      content: `Hello Alex! I am **Nexa AI**, your 24/7 personalized tutor.
I see you are working on **Algebra & Linear Equations**, and we detected a prerequisite gap with **negative integer rules**.
How would you like to explore this today? Feel free to ask any question or try one of the suggested prompts below!`,
      timestamp: '19:40',
      mode: 'STEP_BY_STEP',
      language: 'en'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const suggestedPrompts = [
    'Why does dividing by a negative number flip the equality or inequality?',
    'Walk me through solving -3x + 7 = -14 step by step.',
    'Explain concave vs convex mirrors with an everyday kitchen spoon analogy.',
    'Give me a 3-question quick quiz on factoring quadratic equations.'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isTyping) return;

    const userMsg: ChatBubble = {
      id: `msg_u_${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mode: learningMode,
      language
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Build brief history
      const history = messages.slice(-4).map(m => ({
        role: (m.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
        parts: m.content
      }));

      const reply = await askNexaTutor(text, subject, learningMode, language, history);

      const aiMsg: ChatBubble = {
        id: `msg_ai_${Date.now()}`,
        sender: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode: learningMode,
        language
      };

      setMessages(prev => [...prev, aiMsg]);
      addXP(15, 'Tutor Interaction');
    } catch (e) {
      console.error(e);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `init_${Date.now()}`,
        sender: 'assistant',
        content: 'Chat refreshed. What topic should we master next?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode: learningMode,
        language
      }
    ]);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col rounded-2xl bg-[#171F3A] border border-white/5 overflow-hidden shadow-2xl">
      {/* Top Configuration Bar */}
      <div className="p-4 border-b border-white/5 bg-[#111831] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7657F6] to-[#A78BFA] flex items-center justify-center text-white shadow-glow-primary">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white">Nexa AI Tutor</h2>
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            </div>
            <p className="text-[10px] text-slate-400">Powered by Gemini AI • Multilingual & Adaptive</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Subject Selector */}
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-[#171F3A] border border-white/10 text-white font-medium focus:outline-none"
          >
            <option>Mathematics</option>
            <option>Physics</option>
            <option>Chemistry</option>
            <option>Biology</option>
            <option>Computer Science</option>
            <option>English Literature</option>
          </select>

          {/* 5 Pedagogic Modes */}
          <select
            value={learningMode}
            onChange={(e) => setLearningMode(e.target.value as any)}
            className="px-2.5 py-1.5 rounded-lg bg-[#7657F6]/20 border border-[#7657F6]/40 text-[#A78BFA] font-bold focus:outline-none"
          >
            <option value="BEGINNER">🌱 Explain Like Beginner</option>
            <option value="STEP_BY_STEP">🔢 Step-by-Step</option>
            <option value="EXAM_PREP">🎯 Exam Prep</option>
            <option value="PRACTICE">✏️ Practice Mode</option>
            <option value="QUICK_REVISION">⚡ 60-Sec Revision</option>
          </select>

          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="px-2.5 py-1.5 rounded-lg bg-[#171F3A] border border-white/10 text-slate-300 font-medium focus:outline-none"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी (Hindi)</option>
            <option value="kn">ಕನ್ನಡ (Kannada)</option>
          </select>

          <button
            onClick={handleClearChat}
            title="Clear Chat"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-3xl ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
            }`}
          >
            {msg.sender === 'assistant' ? (
              <div className="w-8 h-8 rounded-xl bg-[#7657F6]/20 border border-[#7657F6]/40 flex items-center justify-center shrink-0 text-[#A78BFA]">
                <Bot className="w-4 h-4" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-xl bg-[#FFC857]/20 border border-[#FFC857]/40 flex items-center justify-center shrink-0 text-[#FFC857] font-bold text-xs">
                AJ
              </div>
            )}

            <div
              className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-[#7657F6] text-white shadow-glow-primary rounded-tr-none'
                  : 'bg-[#111831] border border-white/5 text-slate-200 rounded-tl-none whitespace-pre-wrap'
              }`}
            >
              {msg.content}

              <div className="flex items-center justify-between text-[10px] opacity-60 pt-1">
                <span>{msg.mode.replace('_', ' ')}</span>
                <span>{msg.timestamp}</span>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 max-w-xl">
            <div className="w-8 h-8 rounded-xl bg-[#7657F6]/20 border border-[#7657F6]/40 flex items-center justify-center shrink-0 text-[#A78BFA]">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-[#111831] border border-white/5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7657F6] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#7657F6] animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#7657F6] animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px] text-slate-400 ml-1">Nexa is formulating pedagogical guidance...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Chips */}
      <div className="px-4 py-2 border-t border-white/5 bg-[#111831]/50 overflow-x-auto flex items-center gap-2">
        <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">Try Asking:</span>
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="text-[11px] font-medium px-3 py-1 rounded-full bg-[#171F3A] hover:bg-[#7657F6]/20 border border-white/10 hover:border-[#7657F6]/40 text-slate-300 hover:text-white whitespace-nowrap transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Message Input Box */}
      <div className="p-4 border-t border-white/5 bg-[#111831]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={`Ask Nexa anything about ${subject} (${learningMode.replace('_', ' ')})...`}
            className="flex-1 px-4 py-3 rounded-xl bg-[#171F3A] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-[#7657F6] transition-colors"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isTyping}
            className="p-3 rounded-xl bg-[#7657F6] hover:bg-[#6442E8] disabled:opacity-40 text-white shadow-glow-primary transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
