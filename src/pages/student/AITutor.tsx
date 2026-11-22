import React, { useState, useRef, useEffect } from 'react';
import { askNexaTutor } from '../../lib/gemini';
import { useAuth } from '../../contexts/AuthContext';
import { useEduData } from '../../contexts/DataContext';
import { useLanguage, LanguageCode } from '../../contexts/LanguageContext';
import { UserAvatar } from '../../components/common/UserAvatar';
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
  const { user, role } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { learningGaps, addXP } = useEduData();

  const studentName = user?.name ? user.name.trim() : 'Scholar';

  const [subject, setSubject] = useState('Mathematics');
  const [learningMode, setLearningMode] = useState<'BEGINNER' | 'STEP_BY_STEP' | 'EXAM_PREP' | 'PRACTICE' | 'QUICK_REVISION'>('STEP_BY_STEP');
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getWelcomeContent = (lang: LanguageCode) => {
    if (lang === 'kn') {
      return `ನಮಸ್ಕಾರ ${studentName}! ನಾನು **ನೆಕ್ಸಾ ಎಐ (Nexa AI)**, ನಿಮ್ಮ 24/7 ವೈಯಕ್ತಿಕ ಕಲಿಕಾ ಮಾರ್ಗದರ್ಶಿ.
ಕರ್ನಾಟಕ 10ನೇ ತರಗತಿ ಪಠ್ಯಕ್ರಮದ **ಗಣಿತ, ವಿಜ್ಞಾನ, ಸಮಾಜ ವಿಜ್ಞಾನ ಅಥವಾ ಭಾಷೆಗಳ** ಯಾವುದೇ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ.
ಹಂತ-ಹಂತವಾಗಿ ಲೆಕ್ಕಗಳನ್ನು ಬಿಡಿಸಲು ಅಥವಾ ಪರೀಕ್ಷಾ ತಯಾರಿಗೆ ನಾನು ಸಿದ್ಧನಾಗಿದ್ದೇನೆ!`;
    }
    if (lang === 'hi') {
      return `नमस्ते ${studentName}! मैं **नेക്ಸಾ एआई (Nexa AI)** हूँ, आपका 24/7 व्यक्तिगत अध्ययन सहायक।
कर्नाटक बोर्ड कक्षा 10 के किसी भी विषय (**गणित, विज्ञान, सामाजिक विज्ञान या भाषा**) पर प्रश्न पूछें!
स्टेप-बाय-स्टेप समाधान और परीक्षा तैयारी के लिए नीचे दिए गए सुझावों को आजमाएं।`;
    }
    return `Hello ${studentName}! I am **Nexa AI**, your 24/7 personalized study companion and tutor.
I see you are logged in to your **Karnataka SSLC Class 10** workspace.
How would you like to explore today? Ask any question in **Mathematics, Science, Social Science, or Languages** — or try one of the suggested prompts below!`;
  };

  const [messages, setMessages] = useState<ChatBubble[]>([
    {
      id: 'init_1',
      sender: 'assistant',
      content: getWelcomeContent(language),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mode: 'STEP_BY_STEP',
      language: language
    }
  ]);

  // Keep initial message updated when user or language changes
  useEffect(() => {
    setMessages(prev => {
      if (prev.length <= 1) {
        return [
          {
            id: 'init_1',
            sender: 'assistant',
            content: getWelcomeContent(language),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            mode: learningMode,
            language: language
          }
        ];
      }
      return prev;
    });
  }, [language, user?.name]);

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

      const reply = await askNexaTutor(text, subject, learningMode, language, history, studentName);

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
              <span className="px-2 py-0.5 rounded-full bg-[#7657F6]/20 border border-[#7657F6]/40 text-[#A78BFA] text-[10px] font-bold">
                Student: {studentName}
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Personalized 24/7 Companion for {studentName} • Karnataka SSLC</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Subject Selector */}
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-[#171F3A] border border-white/10 text-white font-medium focus:outline-none"
          >
            <option>Kannada</option>
            <option>English</option>
            <option>Hindi</option>
            <option>Mathematics</option>
            <option>Science</option>
            <option>Social Science</option>
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
              <UserAvatar name={studentName} role={role} size="md" rounded="xl" />
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

      {/* TEQORA Objective 3: Explain It Differently bar */}
      <div className="px-4 py-2 border-t border-white/5 bg-[#171F3A]/80 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] font-bold text-[#FFC857] flex items-center gap-1.5 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-[#FFC857]" />
          <span>Explain It Differently:</span>
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleSendMessage(`Can you explain that again using very simple language suitable for a beginner?`)}
            className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-[#111831] hover:bg-[#7657F6]/20 border border-white/5 text-slate-300 hover:text-white transition-colors"
          >
            🗣️ Simple Language
          </button>
          <button
            type="button"
            onClick={() => handleSendMessage(`Please explain this concept using a concrete, real-life everyday example.`)}
            className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-[#111831] hover:bg-[#7657F6]/20 border border-white/5 text-slate-300 hover:text-white transition-colors"
          >
            🌍 Real-Life Example
          </button>
          <button
            type="button"
            onClick={() => handleSendMessage(`Break down this concept step-by-step with clearly numbered milestones.`)}
            className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-[#111831] hover:bg-[#7657F6]/20 border border-white/5 text-slate-300 hover:text-white transition-colors"
          >
            🔢 Step-by-Step Method
          </button>
          <button
            type="button"
            onClick={() => handleSendMessage(`Give me an intuitive real-world analogy to help me picture this concept.`)}
            className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-[#111831] hover:bg-[#7657F6]/20 border border-white/5 text-slate-300 hover:text-white transition-colors"
          >
            💡 An Analogy
          </button>
          <button
            type="button"
            onClick={() => handleSendMessage(`Give me a 60-second high-yield bulleted summary of this concept.`)}
            className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-[#111831] hover:bg-[#7657F6]/20 border border-white/5 text-slate-300 hover:text-white transition-colors"
          >
            ⚡ Short Summary
          </button>
        </div>
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
            placeholder={t('tutor.placeholder', `Ask Nexa anything about ${subject}...`)}
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
