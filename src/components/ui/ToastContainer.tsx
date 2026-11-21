import React from 'react';
import { useEduData } from '../../contexts/DataContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useEduData();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5 ${
            toast.type === 'success'
              ? 'bg-[#10B981]/15 border-[#10B981]/30 text-[#10B981]'
              : toast.type === 'warning'
              ? 'bg-[#F59E0B]/15 border-[#F59E0B]/30 text-[#F59E0B]'
              : 'bg-[#7657F6]/15 border-[#7657F6]/30 text-[#A78BFA]'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />}
          {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />}
          {toast.type === 'info' && <Info className="w-5 h-5 shrink-0 mt-0.5" />}

          <div className="flex-1 text-sm font-medium text-slate-100">
            {toast.message}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-white transition-colors p-0.5 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
