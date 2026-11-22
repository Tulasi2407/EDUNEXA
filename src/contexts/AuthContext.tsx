import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { DEMO_USERS } from '../data/mockData';
import { authApi, getStoredToken, setStoredToken, removeStoredToken } from '../lib/api';

export const GUEST_USER: User = {
  id: '',
  name: 'Student',
  email: '',
  role: 'STUDENT',
  avatar: '',
  grade: 'Class 10',
  section: 'Section A'
};

interface AuthContextType {
  user: User;
  role: UserRole;
  isAuthenticated: boolean;
  switchRole: (role: UserRole) => void;
  login: (email: string, password?: string, forcedRole?: UserRole) => Promise<boolean>;
  register: (userData: Partial<User> & { password?: string; preferredLanguage?: string }) => Promise<boolean>;
  logout: () => void;
  isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('edunexa_user_role');
    return (saved as UserRole) || 'STUDENT';
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem('edunexa_token');
    const savedUser = localStorage.getItem('edunexa_active_user');
    return !!token && !!savedUser;
  });

  const [user, setUser] = useState<User>(() => {
    const savedUser = localStorage.getItem('edunexa_active_user');
    const token = localStorage.getItem('edunexa_token');
    if (savedUser && token) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed && parsed.email) {
          return parsed;
        }
      } catch (e) {}
    }
    return GUEST_USER;
  });

  const DEMO_EMAILS = [
    'alex.johnson@edunexa.ai',
    'sarah.chen@edunexa.ai',
    'robert.johnson@edunexa.ai',
    'admin@edunexa.ai'
  ];

  const isDemoMode = !user?.email || DEMO_EMAILS.includes(user.email.toLowerCase().trim());

  // Sync active user role
  useEffect(() => {
    if (role) {
      localStorage.setItem('edunexa_user_role', role);
    }
  }, [role]);

  // Check token on mount and hydrate real user from MongoDB Atlas
  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      authApi.getMe().then((res) => {
        if (res && res.user) {
          const u = res.user;
          const mappedRole = (u.role as UserRole) || 'STUDENT';
          setRole(mappedRole);
          setIsAuthenticated(true);
          const hydratedUser: User = {
            id: u.id,
            name: u.name,
            email: u.email,
            role: mappedRole,
            avatar: u.avatar || '',
            grade: u.grade || 'Class 10',
            section: u.section || 'Section A',
            phone: u.phone,
            department: u.specialization
          };
          setUser(hydratedUser);
          localStorage.setItem('edunexa_active_user', JSON.stringify(hydratedUser));
        }
      }).catch(() => {
        // Token expired or invalid
        removeStoredToken();
        localStorage.removeItem('edunexa_active_user');
        setIsAuthenticated(false);
        setUser(GUEST_USER);
      });
    } else {
      setIsAuthenticated(false);
      setUser(GUEST_USER);
    }
  }, []);

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    const demoUser = DEMO_USERS[newRole] || DEMO_USERS.STUDENT;
    // Attempt real login on backend for evaluation demo account
    authApi.login(demoUser.email, 'demo123', newRole).then((res) => {
      if (res && res.token && res.user) {
        setStoredToken(res.token);
        setIsAuthenticated(true);
        const mappedUser: User = {
          id: res.user.id,
          name: res.user.name,
          email: res.user.email,
          role: newRole,
          avatar: res.user.avatar || demoUser.avatar,
          grade: res.user.grade || 'Class 10',
          section: res.user.section || 'Section A'
        };
        setUser(mappedUser);
        localStorage.setItem('edunexa_active_user', JSON.stringify(mappedUser));
      }
    }).catch(() => {
      setUser(demoUser);
      setIsAuthenticated(true);
      localStorage.setItem('edunexa_active_user', JSON.stringify(demoUser));
    });
  };

  const login = async (email: string, password: string = 'demo123', forcedRole?: UserRole): Promise<boolean> => {
    try {
      const res = await authApi.login(email.trim().toLowerCase(), password, forcedRole);
      if (res && res.token && res.user) {
        setStoredToken(res.token);
        setIsAuthenticated(true);
        const mappedRole = (res.user.role as UserRole) || forcedRole || 'STUDENT';
        setRole(mappedRole);
        const loggedUser: User = {
          id: res.user.id,
          name: res.user.name,
          email: res.user.email,
          role: mappedRole,
          avatar: res.user.avatar || '',
          grade: res.user.grade || 'Class 10',
          section: res.user.section || 'Section A'
        };
        setUser(loggedUser);
        localStorage.setItem('edunexa_active_user', JSON.stringify(loggedUser));
        return true;
      }
      throw new Error('Authentication failed.');
    } catch (err: any) {
      // Check if it's a demo account offline
      if (forcedRole && DEMO_USERS[forcedRole] && email.toLowerCase() === DEMO_USERS[forcedRole].email.toLowerCase()) {
        setRole(forcedRole);
        setIsAuthenticated(true);
        const u = DEMO_USERS[forcedRole];
        setUser(u);
        localStorage.setItem('edunexa_active_user', JSON.stringify(u));
        return true;
      }
      // Re-throw genuine error so Login screen can show "User not found" and link to Register!
      throw err;
    }
  };

  const register = async (userData: Partial<User> & { password?: string; preferredLanguage?: string }): Promise<boolean> => {
    const newUserRole = (userData.role as UserRole) || 'STUDENT';
    const pwd = userData.password || 'demo123';

    const res = await authApi.register({
      name: userData.name || 'SSLC Scholar',
      email: userData.email?.trim().toLowerCase() || 'scholar@sslc.karnataka.gov.in',
      password: pwd,
      role: newUserRole,
      section: userData.section || 'Section A',
      preferred_language: userData.preferredLanguage || 'English',
      specialization: userData.department
    });

    if (res && res.token && res.user) {
      setStoredToken(res.token);
      setIsAuthenticated(true);
      const createdUser: User = {
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        role: newUserRole,
        avatar: res.user.avatar || '',
        grade: res.user.grade || 'Class 10',
        section: res.user.section || 'Section A'
      };
      setRole(newUserRole);
      setUser(createdUser);
      localStorage.setItem('edunexa_active_user', JSON.stringify(createdUser));
      return true;
    }

    throw new Error('Registration failed.');
  };

  const logout = () => {
    if (user && user.email) {
      authApi.logout(user.email);
    }
    removeStoredToken();
    localStorage.removeItem('edunexa_active_user');
    setIsAuthenticated(false);
    setUser(GUEST_USER);
    setRole('STUDENT');
  };

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated, switchRole, login, register, logout, isDemoMode }}>
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
