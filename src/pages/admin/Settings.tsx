import React from 'react';
import { useEduData } from '../../contexts/DataContext';
import { Settings, ShieldCheck, Cpu, Bell, Lock } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { addToast } = useEduData();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Institutional settings updated!', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5">
        <h1 className="text-2xl font-extrabold text-white">Platform Configuration & Governance</h1>
        <p className="text-xs text-slate-300 mt-1">Configure AI inference provider models, RBAC rules, and institutional defaults.</p>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-4">
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-[#111831] border border-white/5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-white">Google Gemini Generative AI Engine</p>
              <p className="text-[11px] text-slate-400">Model: gemini-1.5-flash with educational prompting system</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981]">Active</span>
          </div>

          <div className="p-4 rounded-xl bg-[#111831] border border-white/5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-white">Rule-Based Pedagogical Fallback</p>
              <p className="text-[11px] text-slate-400">Guarantees 100% platform uptime even if external APIs encounter rate limits</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981]">Enabled</span>
          </div>

          <div className="p-4 rounded-xl bg-[#111831] border border-white/5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-white">Multilingual Localization</p>
              <p className="text-[11px] text-slate-400">English, Hindi (हिंदी), and Kannada (ಕನ್ನಡ)</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#7657F6]/20 text-[#A78BFA]">3 Locales</span>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-[#7657F6] text-xs font-bold text-white shadow-glow-primary"
        >
          Save Configuration
        </button>
      </form>
    </div>
  );
};
