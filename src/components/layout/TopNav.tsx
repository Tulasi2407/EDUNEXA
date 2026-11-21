import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useEduData } from '../../contexts/DataContext';
import { UserRole } from '../../types';
import {
  Menu,
  Sparkles,
  Trophy,
  Bell,
  Globe,
  ChevronDown,
  Search,
  ExternalLink,
  Flame,
  Check,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { DemoTourModal } from '../common/DemoTourModal';
import { OnboardingWizardModal } from '../common/OnboardingWizardModal';
import { PrivacyModal } from '../common/PrivacyModal';

interface TopNavProps {
  onToggleSidebar: () => void;
  selectedLanguage: 'en' | 'hi' | 'kn';
  onChangeLanguage: (lang: 'en' | 'hi' | 'kn') => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  onToggleSidebar,
  selectedLanguage,
  onChangeLanguage
}) => {
  const { user, role, switchRole } = useAuth();
  const { announcements, studentXP } = useEduData();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी (Hindi)' },
    { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
  ];

  const roles: { role: UserRole; label: string; desc: string }[] = [
    { role: 'STUDENT', label: 'Alex Johnson', desc: 'Grade 10 Student' },
    { role: 'TEACHER', label: 'Ms. Sarah Chen', desc: 'Math & Science Teacher' },
    { role: 'PARENT', label: 'Robert Johnson', desc: 'Parent of Alex' },
    { role: 'ADMIN', label: 'Dr. Emma Wilson', desc: 'System Administrator' },
  ];

  return (
    <>
      <header className="sticky top-0 z-20 h-16 bg-[#0B1020]/80 backdrop-blur-md border-b border-white/5 px-4 lg:px-8 flex items-center justify-between">
        {/* Left: Mobile hamburger & Context Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 lg:hidden"
            aria-label="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-medium text-slate-400">Environment:</span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
              Live AI Demo Mode
            </span>
          </div>
        </div>

        {/* Right action group */}
        <div className="flex items-center gap-2.5">
          {/* Onboarding Wizard (TEQORA Objective 9) */}
          <button
            onClick={() => setShowOnboarding(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>Onboarding</span>
          </button>

          {/* Privacy & Responsible AI (TEQORA Objective 10) */}
          <button
            onClick={() => setShowPrivacy(true)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
            <span>AI Privacy</span>
          </button>

          {/* Judge Tour Button */}
          <button
            onClick={() => setShowTour(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#FFC857]/20 to-[#F59E0B]/20 hover:from-[#FFC857]/30 hover:to-[#F59E0B]/30 border border-[#FFC857]/40 text-[#FFC857] text-xs font-bold shadow-sm transition-all hover:scale-105"
          >
            <Trophy className="w-4 h-4 text-[#FFC857]" />
            <span className="hidden md:inline">Judge Demo Tour</span>
          </button>

          {/* Multilingual Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 transition-colors"
            >
              <Globe className="w-4 h-4 text-[#A78BFA]" />
              <span className="uppercase font-bold">{selectedLanguage}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#171F3A] border border-white/10 shadow-2xl py-1 z-50">
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 border-b border-white/5">
                  Platform Language
                </div>
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      onChangeLanguage(l.code as any);
                      setShowLangMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium hover:bg-white/5 transition-colors ${
                      selectedLanguage === l.code ? 'text-[#7657F6] font-bold bg-[#7657F6]/10' : 'text-slate-300'
                    }`}
                  >
                    <span>{l.label}</span>
                    {selectedLanguage === l.code && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <Bell className="w-4 h-4" />
              {announcements.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#171F3A] border border-white/10 shadow-2xl p-3 z-50 animate-in fade-in-50">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                  <h4 className="text-xs font-bold text-white">Broadcast Notices ({announcements.length})</h4>
                  <span className="text-[10px] text-[#A78BFA]">Live updates</span>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {announcements.map((ann) => (
                    <div key={ann.id} className="p-2.5 rounded-xl bg-[#111831] border border-white/5 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-white truncate">{ann.title}</span>
                        {ann.priority === 'URGENT' && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#EF4444]/20 text-[#EF4444]">
                            Urgent
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{ann.content}</p>
                      <span className="text-[9px] text-slate-400 mt-1 block">From: {ann.author} • {ann.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-lg object-cover ring-1 ring-[#7657F6]/50"
              />
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-white leading-tight">{user.name}</p>
                <p className="text-[10px] text-[#A78BFA] leading-tight font-medium uppercase tracking-wider">{role}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#171F3A] border border-white/10 shadow-2xl p-2 z-50 animate-in fade-in-50">
                <div className="px-3 py-2 border-b border-white/10 mb-1">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Switch Demo Account</p>
                  <p className="text-xs text-slate-300">Test different user perspectives</p>
                </div>
                {roles.map((r) => (
                  <button
                    key={r.role}
                    onClick={() => {
                      switchRole(r.role);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors ${
                      role === r.role ? 'bg-[#7657F6]/20 border border-[#7657F6]/40' : 'hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold text-white">{r.label}</p>
                      <p className="text-[10px] text-slate-400">{r.desc}</p>
                    </div>
                    {role === r.role && <Check className="w-4 h-4 text-[#7657F6]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Interactive Judge Tour Modal */}
      <DemoTourModal isOpen={showTour} onClose={() => setShowTour(false)} />

      {/* TEQORA Objective 9: 7-Step Onboarding Wizard */}
      <OnboardingWizardModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />

      {/* TEQORA Objective 10: Responsible AI & Privacy Modal */}
      <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </>
  );
};
