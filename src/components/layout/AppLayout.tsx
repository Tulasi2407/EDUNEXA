import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { ToastContainer } from '../ui/ToastContainer';
import { useLanguage } from '../../contexts/LanguageContext';

export const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0B1020] text-slate-100 flex flex-col">
      <Sidebar isOpen={sidebarOpen} onCloseMobile={() => setSidebarOpen(false)} />

      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        <TopNav
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          selectedLanguage={language}
          onChangeLanguage={setLanguage}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in-50 duration-300">
          <Outlet context={{ language }} />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};
