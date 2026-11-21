import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { Landing } from '../pages/Landing';
import { Login } from '../pages/Login';

// Student Pages
import { StudentDashboard } from '../pages/student/Dashboard';
import { LearningGapFinder } from '../pages/student/LearningGapFinder';
import { StudyPlanner } from '../pages/student/StudyPlanner';
import { AITutor } from '../pages/student/AITutor';
import { Quiz } from '../pages/student/Quiz';
import { Results } from '../pages/student/Results';
import { Attendance } from '../pages/student/Attendance';
import { Assignments } from '../pages/student/Assignments';
import { Achievements } from '../pages/student/Achievements';
import { StudentProfile } from '../pages/student/Profile';

// Teacher Pages
import { TeacherDashboard } from '../pages/teacher/Dashboard';
import { TeacherStudents } from '../pages/teacher/Students';
import { TeacherAttendance } from '../pages/teacher/Attendance';
import { TeacherMarks } from '../pages/teacher/Marks';
import { TeacherAssignments } from '../pages/teacher/Assignments';
import { QuizBuilder } from '../pages/teacher/QuizBuilder';
import { TeacherAnalytics } from '../pages/teacher/Analytics';
import { TeacherAnnouncements } from '../pages/teacher/Announcements';
import { TeacherProfile } from '../pages/teacher/Profile';

// Parent Pages
import { ParentDashboard } from '../pages/parent/Dashboard';
import { ParentProgress } from '../pages/parent/Progress';
import { ParentAttendance } from '../pages/parent/Attendance';
import { ParentCommunication } from '../pages/parent/Communication';
import { ParentProfile } from '../pages/parent/Profile';

// Admin Pages
import { AdminDashboard } from '../pages/admin/Dashboard';
import { AdminUsers } from '../pages/admin/Users';
import { AdminClasses } from '../pages/admin/Classes';
import { AdminReports } from '../pages/admin/Reports';
import { AdminSettings } from '../pages/admin/Settings';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* Student Portal */}
      <Route path="/student" element={<AppLayout />}>
        <Route index element={<StudentDashboard />} />
        <Route path="gap-finder" element={<LearningGapFinder />} />
        <Route path="planner" element={<StudyPlanner />} />
        <Route path="tutor" element={<AITutor />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="results" element={<Results />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="achievements" element={<Achievements />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>

      {/* Teacher Portal */}
      <Route path="/teacher" element={<AppLayout />}>
        <Route index element={<TeacherDashboard />} />
        <Route path="students" element={<TeacherStudents />} />
        <Route path="attendance" element={<TeacherAttendance />} />
        <Route path="marks" element={<TeacherMarks />} />
        <Route path="assignments" element={<TeacherAssignments />} />
        <Route path="quiz-builder" element={<QuizBuilder />} />
        <Route path="analytics" element={<TeacherAnalytics />} />
        <Route path="announcements" element={<TeacherAnnouncements />} />
        <Route path="profile" element={<TeacherProfile />} />
      </Route>

      {/* Parent Portal */}
      <Route path="/parent" element={<AppLayout />}>
        <Route index element={<ParentDashboard />} />
        <Route path="progress" element={<ParentProgress />} />
        <Route path="attendance" element={<ParentAttendance />} />
        <Route path="communication" element={<ParentCommunication />} />
        <Route path="profile" element={<ParentProfile />} />
      </Route>

      {/* Admin Portal */}
      <Route path="/admin" element={<AppLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="classes" element={<AdminClasses />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
