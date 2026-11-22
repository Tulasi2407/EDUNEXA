import React from 'react';
import { UserRole } from '../../types';
import { User as UserIcon, GraduationCap, BookOpen, Shield, Users } from 'lucide-react';

interface UserAvatarProps {
  name?: string;
  role?: UserRole | string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  rounded?: 'full' | 'xl' | '2xl' | 'lg';
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  name,
  role = 'STUDENT',
  size = 'md',
  rounded = 'full',
  className = ''
}) => {
  // Extract clean uppercase initials (e.g., 'Thippesh' -> 'T', 'Alex Johnson' -> 'AJ')
  const getInitials = (fullName?: string): string => {
    if (!fullName) return '';
    // Strip honorifics like Ms., Mr., Dr.
    const cleaned = fullName.replace(/^(mr\.|ms\.|mrs\.|dr\.|prof\.)\s+/i, '').trim();
    const parts = cleaned.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '';
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  };

  const initials = getInitials(name);
  const normalizedRole = (role || 'STUDENT').toUpperCase();

  // Size styling maps
  const sizeStyles: Record<string, { container: string; text: string; icon: string }> = {
    xs: { container: 'w-6 h-6', text: 'text-[10px] font-bold', icon: 'w-3 h-3' },
    sm: { container: 'w-7 h-7', text: 'text-xs font-bold', icon: 'w-3.5 h-3.5' },
    md: { container: 'w-8 h-8', text: 'text-xs font-bold', icon: 'w-4 h-4' },
    lg: { container: 'w-12 h-12', text: 'text-base font-bold', icon: 'w-6 h-6' },
    xl: { container: 'w-16 h-16', text: 'text-xl font-bold', icon: 'w-8 h-8' },
    '2xl': { container: 'w-20 h-20', text: 'text-2xl font-extrabold', icon: 'w-10 h-10' }
  };

  const currentSize = sizeStyles[size] || sizeStyles.md;

  // Role gradient styling (vibrant, modern dark-navy aesthetic)
  const roleGradients: Record<string, string> = {
    STUDENT: 'bg-gradient-to-br from-[#7657F6] to-[#4F46E5] ring-2 ring-[#7657F6]/40 text-white shadow-glow-primary',
    TEACHER: 'bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] ring-2 ring-[#3B82F6]/40 text-white',
    PARENT: 'bg-gradient-to-br from-[#10B981] to-[#047857] ring-2 ring-[#10B981]/40 text-white',
    ADMIN: 'bg-gradient-to-br from-[#F59E0B] to-[#D97706] ring-2 ring-[#F59E0B]/40 text-white'
  };

  const gradientClass = roleGradients[normalizedRole] || roleGradients.STUDENT;

  const roundedClasses: Record<string, string> = {
    full: 'rounded-full',
    '2xl': 'rounded-2xl',
    xl: 'rounded-xl',
    lg: 'rounded-lg'
  };

  const roundedClass = roundedClasses[rounded] || 'rounded-full';

  // Fallback role icon if no name or initials
  const renderFallbackIcon = () => {
    switch (normalizedRole) {
      case 'STUDENT':
        return <GraduationCap className={currentSize.icon} />;
      case 'TEACHER':
        return <BookOpen className={currentSize.icon} />;
      case 'PARENT':
        return <Users className={currentSize.icon} />;
      case 'ADMIN':
        return <Shield className={currentSize.icon} />;
      default:
        return <UserIcon className={currentSize.icon} />;
    }
  };

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 select-none overflow-hidden ${currentSize.container} ${roundedClass} ${gradientClass} ${className}`}
      title={name || normalizedRole}
      aria-label={name || normalizedRole}
    >
      {initials ? (
        <span className={`${currentSize.text} tracking-tight uppercase leading-none`}>
          {initials}
        </span>
      ) : (
        renderFallbackIcon()
      )}
    </div>
  );
};
