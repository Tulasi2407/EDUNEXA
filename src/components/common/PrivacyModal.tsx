import React from 'react';
import { ShieldCheck, Lock, X, CheckCircle2, AlertCircle } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="bg-[#171F3A] border border-[#10B981]/40 rounded-2xl w-full max-w-xl p-6 shadow-2xl relative space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center text-[#10B981]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#34D399]">
                TEQORA Objective 10
              </span>
              <h2 className="text-base font-bold text-white mt-0.5">Data Privacy & Responsible AI Framework</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs text-slate-300 leading-relaxed max-h-80 overflow-y-auto pr-1">
          <div className="p-3.5 rounded-xl bg-[#111831] border border-white/5 space-y-1">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              Immutable Academic Records Protection
            </h4>
            <p className="text-[11px] text-slate-400">
              AI systems are strictly read-only regarding official grades and attendance. The AI cannot modify, overwrite, or delete verified teacher gradebooks.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#111831] border border-white/5 space-y-1">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              Explainable & Reviewable Recommendations
            </h4>
            <p className="text-[11px] text-slate-400">
              The AI never presents inferred prerequisite diagnoses as absolute certainty. Observed errors are explicitly separated from suggested root causes for student and teacher review.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#111831] border border-white/5 space-y-1">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              Student Privacy & Zero PII Leakage
            </h4>
            <p className="text-[11px] text-slate-400">
              Private student identifiers, personal phone numbers, and home addresses are never passed to external AI prompt payloads. Only anonymous topic tokens are processed.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#111831] border border-white/5 space-y-1">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              Anti-Discrimination & Positive Growth Mindset
            </h4>
            <p className="text-[11px] text-slate-400">
              Our pedagogical engines prohibit derogatory or negative labeling based on learning speed or diagnostic scores.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#10B981] hover:bg-emerald-600 text-xs font-bold text-white shadow-lg transition-all"
          >
            I Acknowledge & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
