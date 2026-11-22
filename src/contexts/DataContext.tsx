import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  LearningGap,
  StudyPlan,
  AttendanceRecord,
  MarkRecord,
  Announcement,
  Badge,
  Subject,
} from '../types';
import {
  INITIAL_LEARNING_GAPS,
  INITIAL_STUDY_PLAN,
  INITIAL_ATTENDANCE,
  INITIAL_MARKS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_BADGES,
  INITIAL_SUBJECTS,
} from '../data/mockData';

interface DataContextType {
  subjects: Subject[];
  learningGaps: LearningGap[];
  studyPlan: StudyPlan;
  attendance: AttendanceRecord[];
  marks: MarkRecord[];
  announcements: Announcement[];
  badges: Badge[];
  studentXP: number;
  streakDays: number;
  // Mutations
  addLearningGap: (gap: LearningGap) => void;
  resolveLearningGap: (gapId: string) => void;
  toggleStudyTask: (taskId: string) => void;
  updateStudyPlan: (newPlan: StudyPlan) => void;
  recordAttendance: (newRecords: AttendanceRecord[]) => void;
  addOrUpdateMark: (newMark: MarkRecord) => void;
  addAnnouncement: (announcement: Announcement) => void;
  addXP: (amount: number, reason?: string) => void;
  toasts: { id: string; message: string; type: 'success' | 'info' | 'warning' }[];
  addToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem('edunexa_subjects');
    return saved ? JSON.parse(saved) : INITIAL_SUBJECTS;
  });

  const [learningGaps, setLearningGaps] = useState<LearningGap[]>(() => {
    const saved = localStorage.getItem('edunexa_learning_gaps');
    return saved ? JSON.parse(saved) : INITIAL_LEARNING_GAPS;
  });

  const [studyPlan, setStudyPlan] = useState<StudyPlan>(() => {
    const saved = localStorage.getItem('edunexa_study_plan');
    return saved ? JSON.parse(saved) : INITIAL_STUDY_PLAN;
  });

  const SSLC_SUBJECT_LIST = ['Kannada', 'English', 'Hindi', 'Mathematics', 'Science', 'Social Science'];

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    try {
      const saved = localStorage.getItem('edunexa_attendance_kseab');
      if (saved) {
        const parsed: AttendanceRecord[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasInvalidSubject = parsed.some(
            p => !p.subject || !SSLC_SUBJECT_LIST.includes(p.subject)
          );
          if (!hasInvalidSubject) {
            return parsed;
          }
        }
      }
    } catch (e) {}
    localStorage.removeItem('edunexa_attendance');
    localStorage.setItem('edunexa_attendance_kseab', JSON.stringify(INITIAL_ATTENDANCE));
    return INITIAL_ATTENDANCE;
  });

  // Guard against any non-SSLC subjects persisted in memory or storage
  useEffect(() => {
    setAttendance(prev => {
      const hasInvalid = prev.some(p => !p.subject || !SSLC_SUBJECT_LIST.includes(p.subject));
      if (hasInvalid) {
        localStorage.setItem('edunexa_attendance_kseab', JSON.stringify(INITIAL_ATTENDANCE));
        localStorage.setItem('edunexa_attendance', JSON.stringify(INITIAL_ATTENDANCE));
        return INITIAL_ATTENDANCE;
      }
      return prev;
    });
  }, []);

  const [marks, setMarks] = useState<MarkRecord[]>(() => {
    const saved = localStorage.getItem('edunexa_marks');
    return saved ? JSON.parse(saved) : INITIAL_MARKS;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('edunexa_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [badges, setBadges] = useState<Badge[]>(() => {
    const saved = localStorage.getItem('edunexa_badges');
    return saved ? JSON.parse(saved) : INITIAL_BADGES;
  });

  const [studentXP, setStudentXP] = useState<number>(() => {
    const saved = localStorage.getItem('edunexa_xp');
    return saved ? parseInt(saved, 10) : 2850;
  });

  const [streakDays] = useState<number>(8);

  const [toasts, setToasts] = useState<{ id: string; message: string; type: 'success' | 'info' | 'warning' }[]>([]);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('edunexa_learning_gaps', JSON.stringify(learningGaps));
  }, [learningGaps]);

  useEffect(() => {
    localStorage.setItem('edunexa_study_plan', JSON.stringify(studyPlan));
  }, [studyPlan]);

  useEffect(() => {
    localStorage.setItem('edunexa_attendance_kseab', JSON.stringify(attendance));
    localStorage.setItem('edunexa_attendance', JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem('edunexa_marks', JSON.stringify(marks));
  }, [marks]);

  useEffect(() => {
    localStorage.setItem('edunexa_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('edunexa_badges', JSON.stringify(badges));
  }, [badges]);

  useEffect(() => {
    localStorage.setItem('edunexa_xp', studentXP.toString());
  }, [studentXP]);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addLearningGap = (gap: LearningGap) => {
    setLearningGaps(prev => [gap, ...prev]);
    addToast(`New Learning Gap identified in ${gap.topic}`, 'warning');
  };

  const resolveLearningGap = (gapId: string) => {
    setLearningGaps(prev =>
      prev.map(g => (g.id === gapId ? { ...g, status: 'RESOLVED' } : g))
    );
    addXP(150, 'Learning Gap Resolved');
    addToast('Learning Gap resolved! +150 XP awarded', 'success');
  };

  const toggleStudyTask = (taskId: string) => {
    setStudyPlan(prev => {
      const updatedTasks = prev.tasks.map(t => {
        if (t.id === taskId) {
          const nextVal = !t.completed;
          if (nextVal) {
            addXP(40, 'Study Task Completed');
            addToast(`Task completed! +40 XP: ${t.topic}`, 'success');
          }
          return { ...t, completed: nextVal };
        }
        return t;
      });
      const completedCount = updatedTasks.filter(t => t.completed).length;
      return {
        ...prev,
        tasks: updatedTasks,
        completedHours: +(completedCount * 1.25).toFixed(1)
      };
    });
  };

  const updateStudyPlan = (newPlan: StudyPlan) => {
    setStudyPlan(newPlan);
    addToast('Personalized AI Study Timetable generated!', 'success');
  };

  const recordAttendance = (newRecords: AttendanceRecord[]) => {
    setAttendance(prev => [...newRecords, ...prev]);
    addToast(`Saved attendance for ${newRecords.length} students.`, 'success');
  };

  const addOrUpdateMark = (newMark: MarkRecord) => {
    setMarks(prev => {
      const exists = prev.findIndex(m => m.studentId === newMark.studentId && m.examName === newMark.examName && m.subject === newMark.subject);
      if (exists >= 0) {
        const copy = [...prev];
        copy[exists] = newMark;
        return copy;
      }
      return [newMark, ...prev];
    });
    addToast(`Published marks for ${newMark.studentName} in ${newMark.subject}`, 'success');
  };

  const addAnnouncement = (ann: Announcement) => {
    setAnnouncements(prev => [ann, ...prev]);
    addToast('Broadcasted class announcement successfully', 'success');
  };

  const addXP = (amount: number, reason?: string) => {
    setStudentXP(prev => prev + amount);
    if (reason) {
      addToast(`+${amount} XP: ${reason}`, 'success');
    }
  };

  return (
    <DataContext.Provider
      value={{
        subjects,
        learningGaps,
        studyPlan,
        attendance,
        marks,
        announcements,
        badges,
        studentXP,
        streakDays,
        addLearningGap,
        resolveLearningGap,
        toggleStudyTask,
        updateStudyPlan,
        recordAttendance,
        addOrUpdateMark,
        addAnnouncement,
        addXP,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useEduData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useEduData must be used within a DataProvider');
  }
  return context;
};
