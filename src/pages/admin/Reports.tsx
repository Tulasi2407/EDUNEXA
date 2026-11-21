import React from 'react';
import { useEduData } from '../../contexts/DataContext';
import { FileText, Download, CheckCircle2, TrendingUp } from 'lucide-react';

export const AdminReports: React.FC = () => {
  const { addToast } = useEduData();

  const handleDownloadReport = (title: string) => {
    addToast(`Exported ${title} report PDF successfully!`, 'success');
  };

  const reports = [
    { title: 'School-Wide Prerequisite Gap & Mastery Audit', period: 'Q3 2026', size: '2.4 MB' },
    { title: 'Faculty Attendance & Syllabus Completion Index', period: 'November 2026', size: '1.8 MB' },
    { title: 'Parent Engagement & Notification Telemetry', period: 'Term 1', size: '940 KB' },
    { title: 'Student Academic Intervention Outcomes Report', period: 'October 2026', size: '3.1 MB' },
  ];

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Institutional Academic Reports</h1>
        <p className="text-xs text-slate-300 mt-1">Generate and export aggregated analytics for school boards and accreditation reviews.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((r, i) => (
          <div key={i} className="p-5 rounded-2xl bg-[#171F3A] border border-white/5 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 text-[#A78BFA]">{r.period}</span>
              <h3 className="text-sm font-bold text-white mt-2">{r.title}</h3>
              <p className="text-xs text-slate-400 mt-1">Generated File Size: {r.size}</p>
            </div>

            <button
              onClick={() => handleDownloadReport(r.title)}
              className="flex items-center justify-center gap-2 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors"
            >
              <Download className="w-4 h-4 text-[#FFC857]" />
              <span>Download PDF Report</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
