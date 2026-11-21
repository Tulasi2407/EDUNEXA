import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { DEMO_USERS } from '../data/mockData';

interface AuthContextType {
  user: User;
  role: UserRole;
  switchRole: (role: UserRole) => void;
  login: (email: string, role?: UserRole) => boolean;
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
    const saved = localStorage.getItem('edunexa_user_role') as UserRole;
    return DEMO_USERS[saved] || DEMO_USERS.STUDENT;
  });

  const [isDemoMode] = useState<boolean>(true);

  useEffect(() => {
    localStorage.setItem('edunexa_user_role', role);
    setUser(DEMO_USERS[role] || DEMO_USERS.STUDENT);
  }, [role]);

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
  };

  const login = (email: string, forcedRole?: UserRole): boolean => {
    if (forcedRole && DEMO_USERS[forcedRole]) {
      setRole(forcedRole);
      return true;
    }
    // Check email match
    const foundRole = (Object.keys(DEMO_USERS) as UserRole[]).find(
      r => DEMO_USERS[r].email.toLowerCase() === email.toLowerCase()
    );
    if (foundRole) {
      setRole(foundRole);
      return true;
    }
    // Default fallback
    setRole('STUDENT');
    return true;
  };

  const logout = () => {
    setRole('STUDENT');
  };

  return (
    <AuthContext.Provider value={{ user, role, switchRole, login, logout, isDemoMode }}>
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
