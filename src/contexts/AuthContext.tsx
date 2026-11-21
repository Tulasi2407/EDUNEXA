import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { DEMO_USERS } from '../data/mockData';

interface AuthContextType {
  user: User;
  role: UserRole;
  switchRole: (role: UserRole) => void;
  login: (email: string, role?: UserRole) => boolean;
  register: (userData: Partial<User> & { password?: string; preferredLanguage?: string }) => boolean;
  logout: () => void;
  isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('edunexa_user_role');
    return (saved as UserRole) || 'STUDENT';
  });

  const [user, setUser] = useState<User>(() => {
    const savedUser = localStorage.getItem('edunexa_active_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        // fallback
      }
    }
    const savedRole = (localStorage.getItem('edunexa_user_role') as UserRole) || 'STUDENT';
    return DEMO_USERS[savedRole] || DEMO_USERS.STUDENT;
  });

  const [isDemoMode] = useState<boolean>(true);

  useEffect(() => {
    localStorage.setItem('edunexa_user_role', role);
  }, [role]);

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    const demoUser = DEMO_USERS[newRole] || DEMO_USERS.STUDENT;
    setUser(demoUser);
    localStorage.setItem('edunexa_active_user', JSON.stringify(demoUser));
  };

  const login = (email: string, forcedRole?: UserRole): boolean => {
    if (forcedRole && DEMO_USERS[forcedRole]) {
      setRole(forcedRole);
      const u = DEMO_USERS[forcedRole];
      setUser(u);
      localStorage.setItem('edunexa_active_user', JSON.stringify(u));
      return true;
    }
    
    // Check if custom registered user exists in localStorage
    const savedRegistered = localStorage.getItem('edunexa_custom_user');
    if (savedRegistered) {
      try {
        const parsed = JSON.parse(savedRegistered);
        if (parsed.email.toLowerCase() === email.toLowerCase()) {
          setRole(parsed.role as UserRole);
          setUser(parsed);
          localStorage.setItem('edunexa_active_user', JSON.stringify(parsed));
          return true;
        }
      } catch (e) {}
    }

    // Check demo accounts
    const foundRole = (Object.keys(DEMO_USERS) as UserRole[]).find(
      r => DEMO_USERS[r].email.toLowerCase() === email.toLowerCase()
    );
    if (foundRole) {
      setRole(foundRole);
      const u = DEMO_USERS[foundRole];
      setUser(u);
      localStorage.setItem('edunexa_active_user', JSON.stringify(u));
      return true;
    }

    // Default fallback
    setRole('STUDENT');
    const defaultUser = DEMO_USERS.STUDENT;
    setUser(defaultUser);
    localStorage.setItem('edunexa_active_user', JSON.stringify(defaultUser));
    return true;
  };

  const register = (userData: Partial<User> & { password?: string; preferredLanguage?: string }): boolean => {
    const newUserRole = (userData.role as UserRole) || 'STUDENT';
    const newUser: User = {
      id: userData.id || `user-${Date.now().toString().slice(-6)}`,
      name: userData.name || 'SSLC Scholar',
      email: userData.email || 'scholar@sslc.karnataka.gov.in',
      role: newUserRole,
      avatar: userData.avatar || (
        newUserRole === 'STUDENT' ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80' :
        newUserRole === 'TEACHER' ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80' :
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'
      ),
      grade: 'Class 10',
      section: userData.section || 'Section A',
      phone: userData.phone,
      studentId: userData.studentId,
      department: userData.department
    };

    setRole(newUserRole);
    setUser(newUser);
    localStorage.setItem('edunexa_user_role', newUserRole);
    localStorage.setItem('edunexa_active_user', JSON.stringify(newUser));
    localStorage.setItem('edunexa_custom_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setRole('STUDENT');
    setUser(DEMO_USERS.STUDENT);
    localStorage.removeItem('edunexa_active_user');
  };

  return (
    <AuthContext.Provider value={{ user, role, switchRole, login, register, logout, isDemoMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
