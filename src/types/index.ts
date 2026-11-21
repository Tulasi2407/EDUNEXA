export type UserRole = 'STUDENT' | 'TEACHER' | 'PARENT' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  grade?: string;
  section?: string;
  phone?: string;
  studentId?: string; // For parents linked to student
  linkedStudentName?: string;
  department?: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  color: string;
  teacherName: string;
  currentScore: number;
  totalChapters: number;
  completedChapters: number;
}

export interface QuizQuestion {
  id: string;
  subjectId: string;
  topic: string;
  chapter: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  prerequisiteConcept?: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}

export interface LearningGap {
  id: string;
  subject: string;
  chapter: string;
  topic: string;
  performanceScore: number; // e.g. 35
  severity: 'CRITICAL' | 'MODERATE' | 'MILD';
  identifiedGap: string;
  prerequisiteWeakness: string;
  evidence: string;
  recommendedSequence: string[];
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED';
  detectedDate: string;
}

export interface StudyTask {
  id: string;
  day: string; // 'Monday', 'Tuesday', etc.
  timeSlot: string; // '04:00 PM - 05:00 PM'
  subject: string;
  topic: string;
  type: 'CONCEPT_REVIEW' | 'PREREQUISITE_FIX' | 'PRACTICE_QUIZ' | 'ACTIVE_RECALL' | 'BREAK';
  durationMinutes: number;
  completed: boolean;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface StudyPlan {
  id: string;
  title: string;
  weeklyTargetHours: number;
  completedHours: number;
  dailyGoalHours: number;
  examDate?: string;
  tasks: StudyTask[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  subject?: string;
  mode?: 'BEGINNER' | 'STEP_BY_STEP' | 'EXAM_PREP' | 'PRACTICE' | 'QUICK_REVISION';
  language?: 'en' | 'hi' | 'kn';
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
  subject?: string;
}

export interface MarkRecord {
  id: string;
  studentId: string;
  studentName: string;
  examName: string;
  subject: string;
  marksObtained: number;
  totalMarks: number;
  grade: string;
  feedback?: string;
  date: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  targetRole: 'ALL' | 'STUDENTS' | 'PARENTS' | 'TEACHERS';
  priority: 'NORMAL' | 'URGENT';
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  category: 'STREAK' | 'MASTERY' | 'QUIZ' | 'SPEED';
}
