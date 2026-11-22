import React from 'react';

interface EduNexaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  layout?: 'horizontal' | 'stacked' | 'icon-only';
  subtitle?: string | null;
  showBadge?: boolean;
  className?: string;
  onClick?: () => void;
}

export const EduNexaEmblem: React.FC<{ sizePx?: number; className?: string }> = ({
  sizePx = 40,
  className = ''
}) => {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}
      style={{ width: sizePx, height: sizePx }}
    >
      {/* Outer ambient blur glow */}
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#7657F6] via-[#06B6D4] to-[#FFC857] opacity-35 blur-md -z-10 group-hover:opacity-60 transition-opacity duration-300"
      />

      {/* Razor-sharp Vector SVG Emblem */}
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <linearGradient id="bgGradComp" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#0B1020" />
          </linearGradient>

          <linearGradient id="borderGradComp" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#7657F6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="leftWingComp" x1="25" y1="35" x2="60" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>

          <linearGradient id="rightWingComp" x1="60" y1="35" x2="95" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          <linearGradient id="nexusBridgeComp" x1="30" y1="40" x2="90" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>

          <radialGradient id="coreGlowComp" cx="60" cy="58" r="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFC857" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#7657F6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#7657F6" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="sparkGradComp" x1="55" y1="50" x2="65" y2="66" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="40%" stopColor="#FFD166" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>

        {/* Base Squircle Container */}
        <rect
          x="6"
          y="6"
          width="108"
          height="108"
          rx="26"
          fill="url(#bgGradComp)"
          stroke="url(#borderGradComp)"
          strokeWidth="2.5"
        />

        {/* Ambient Glow */}
        <circle cx="60" cy="58" r="30" fill="url(#coreGlowComp)" />

        {/* Left Knowledge Leaf (Book of Learning) */}
        <path
          d="M 58 38 C 45 36 32 42 27 54 C 23 64 26 77 34 83 C 41 89 51 86 58 80 Z"
          fill="url(#leftWingComp)"
          opacity="0.92"
        />

        {/* Right Ascending Leaf (Future & Mastery) */}
        <path
          d="M 62 38 C 75 36 88 42 93 54 C 97 64 94 77 86 83 C 79 89 69 86 62 80 Z"
          fill="url(#rightWingComp)"
          opacity="0.92"
        />

        {/* Central Möbius Infinity Nexus Loop */}
        <path
          d="M 38 68 C 44 76 54 78 60 70 C 66 62 74 48 84 54 C 90 58 88 68 82 74 C 74 82 64 78 60 70 C 56 62 46 48 36 54 C 30 58 32 64 38 68 Z"
          fill="url(#nexusBridgeComp)"
          opacity="0.88"
        />

        {/* Connected Synaptic Trinity Nodes (Student, Teacher, Parent) */}
        <circle cx="34" cy="48" r="3.2" fill="#A78BFA" opacity="0.9" />
        <circle cx="86" cy="48" r="3.2" fill="#38BDF8" opacity="0.9" />
        <circle cx="60" cy="85" r="3" fill="#10B981" opacity="0.9" />

        {/* Thin Filaments */}
        <path
          d="M 34 48 Q 46 54 60 58"
          stroke="#A78BFA"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.5"
          strokeDasharray="2 3"
        />
        <path
          d="M 86 48 Q 74 54 60 58"
          stroke="#38BDF8"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.5"
          strokeDasharray="2 3"
        />
        <path
          d="M 60 85 L 60 66"
          stroke="#10B981"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.5"
          strokeDasharray="2 3"
        />

        {/* AI Intelligence Core Spark */}
        <g>
          <path
            d="M 60 46 Q 60 58 48 58 Q 60 58 60 70 Q 60 58 72 58 Q 60 58 60 46 Z"
            fill="url(#sparkGradComp)"
          />
          <path
            d="M 60 52 Q 60 58 54 58 Q 60 58 60 64 Q 60 58 66 58 Q 60 58 60 52 Z"
            fill="#FFFBEB"
            opacity="0.95"
          />
          <circle cx="60" cy="58" r="2.2" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
};

export const EduNexaLogo: React.FC<EduNexaLogoProps> = ({
  size = 'md',
  layout = 'horizontal',
  subtitle = 'Smart Learning Ecosystem',
  showBadge = true,
  className = '',
  onClick
}) => {
  const sizeConfig = {
    sm: { px: 32, textClass: 'text-base', badgeClass: 'text-[9px] px-1 py-0.2', subClass: 'text-[9px]' },
    md: { px: 40, textClass: 'text-xl', badgeClass: 'text-[10px] px-1.5 py-0.5', subClass: 'text-[10px]' },
    lg: { px: 52, textClass: 'text-2xl', badgeClass: 'text-xs px-2 py-0.5', subClass: 'text-xs' },
    xl: { px: 68, textClass: 'text-3xl sm:text-4xl', badgeClass: 'text-xs px-2.5 py-1', subClass: 'text-sm' }
  }[size];

  const content = (
    <div
      onClick={onClick}
      className={`group select-none flex ${
        layout === 'stacked'
          ? 'flex-col items-center text-center gap-3'
          : 'flex-row items-center gap-3'
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Innovative Emblem */}
      <EduNexaEmblem sizePx={sizeConfig.px} />

      {layout !== 'icon-only' && (
        <div className={layout === 'stacked' ? 'text-center' : 'text-left'}>
          <div className="flex items-center justify-center sm:justify-start gap-1.5 leading-none">
            <span className={`font-black tracking-tight text-white ${sizeConfig.textClass}`}>
              Edu<span className="bg-gradient-to-r from-[#A78BFA] via-[#C084FC] to-[#38BDF8] bg-clip-text text-transparent">Nexa</span>
            </span>

            {showBadge && (
              <span
                className={`inline-flex items-center gap-1 font-extrabold uppercase rounded-md bg-gradient-to-r from-[#7657F6]/20 to-[#06B6D4]/20 text-[#38BDF8] border border-[#38BDF8]/40 shadow-sm ${sizeConfig.badgeClass}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                AI
              </span>
            )}
          </div>

          {subtitle && (
            <p className={`text-slate-400 font-medium tracking-normal mt-1 ${sizeConfig.subClass}`}>
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );

  return content;
};
