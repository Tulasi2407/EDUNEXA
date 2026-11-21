import React, { useState } from 'react';
import { useEduData } from '../../contexts/DataContext';
import { MessageSquare, Send, UserCheck, Bell } from 'lucide-react';

export const ParentCommunication: React.FC = () => {
  const { announcements, addToast } = useEduData();
  const [replyText, setReplyText] = useState('');

  const parentNotices = announcements.filter(a => a.targetRole === 'ALL' || a.targetRole === 'PARENTS');

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    addToast('Message sent to Ms. Sarah Chen!', 'success');
    setReplyText('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5">
        <h1 className="text-2xl font-extrabold text-white">Teacher Notices & Messages</h1>
        <p className="text-xs text-slate-300 mt-1">Direct communication channel with Alex's faculty instructors.</p>
      </div>

      <div className="space-y-4">
        {parentNotices.map(notice => (
          <div key={notice.id} className="p-5 rounded-2xl bg-[#171F3A] border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">{notice.title}</span>
              <span className="text-xs text-slate-400">{notice.date}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{notice.content}</p>
            <div className="pt-2 text-[11px] text-[#A78BFA] font-medium">
              Sender: {notice.author}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendReply} className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-3">
        <h3 className="text-sm font-bold text-white">Send Direct Note to Ms. Sarah Chen</h3>
        <textarea
          rows={3}
          value={replyText}
          onChange={e => setReplyText(e.target.value)}
          placeholder="e.g. Thanks for the algebra update! We practiced with negative numbers this evening..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#10B981]"
        />
        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-emerald-600 text-xs font-bold text-white shadow-lg transition-all"
        >
          <Send className="w-4 h-4" />
          <span>Deliver Message</span>
        </button>
      </form>
    </div>
  );
};
