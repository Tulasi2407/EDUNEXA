import { User, Subject, QuizQuestion, LearningGap, StudyPlan, AttendanceRecord, MarkRecord, Announcement, Badge } from '../types';

export const DEMO_USERS: Record<string, User> = {
  STUDENT: {
    id: 'usr_student_01',
    name: 'Alex Johnson',
    email: 'alex.johnson@edunexa.ai',
    role: 'STUDENT',
    avatar: '',
    grade: 'Grade 10',
    section: 'Section A',
  },
  TEACHER: {
    id: 'usr_teacher_01',
    name: 'Ms. Sarah Chen',
    email: 'sarah.chen@edunexa.ai',
    role: 'TEACHER',
    avatar: '',
    department: 'Mathematics & Natural Sciences',
  },
  PARENT: {
    id: 'usr_parent_01',
    name: 'Robert Johnson',
    email: 'robert.johnson@edunexa.ai',
    role: 'PARENT',
    avatar: '',
    studentId: 'usr_student_01',
    linkedStudentName: 'Alex Johnson',
  },
  ADMIN: {
    id: 'usr_admin_01',
    name: 'Dr. Emma Wilson',
    email: 'admin@edunexa.ai',
    role: 'ADMIN',
    avatar: '',
    department: 'Central Academic Administration',
  }
};

export const INITIAL_SUBJECTS: Subject[] = [
  { id: 'sub_kan', name: 'Kannada', code: 'KAN-10', color: '#10B981', teacherName: 'ಶ್ರೀ ರಮೇಶ್ ಭಟ್', currentScore: 88, totalChapters: 18, completedChapters: 12 },
  { id: 'sub_eng', name: 'English', code: 'ENG-10', color: '#3B82F6', teacherName: 'Ms. Claire Harper', currentScore: 92, totalChapters: 14, completedChapters: 10 },
  { id: 'sub_hin', name: 'Hindi', code: 'HIN-10', color: '#F59E0B', teacherName: 'श्रीमती सुनीता शर्मा', currentScore: 85, totalChapters: 12, completedChapters: 8 },
  { id: 'sub_math', name: 'Mathematics', code: 'MATH-10', color: '#7657F6', teacherName: 'Ms. Sarah Chen', currentScore: 78, totalChapters: 15, completedChapters: 9 },
  { id: 'sub_sci', name: 'Science', code: 'SCI-10', color: '#06B6D4', teacherName: 'Dr. Marcus Vance', currentScore: 84, totalChapters: 16, completedChapters: 11 },
  { id: 'sub_soc', name: 'Social Science', code: 'SOC-10', color: '#EC4899', teacherName: 'Mrs. Anita Rao', currentScore: 89, totalChapters: 24, completedChapters: 16 },
];

export const DIAGNOSTIC_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q_alg_01',
    subjectId: 'sub_math',
    chapter: 'Algebra & Linear Equations',
    topic: 'Linear Equations in Two Variables',
    question: 'Solve for x: -3x + 7 = -14',
    options: ['x = 7', 'x = -7', 'x = 21/3', 'x = -2.33'],
    correctIndex: 0,
    explanation: '-3x = -14 - 7 => -3x = -21 => x = -21 / -3 = 7. Remember dividing negative by negative yields positive.',
    prerequisiteConcept: 'Negative numbers arithmetic & inverse operations',
    difficulty: 'MEDIUM'
  },
  {
    id: 'q_alg_02',
    subjectId: 'sub_math',
    chapter: 'Algebra & Linear Equations',
    topic: 'Linear Equations in Two Variables',
    question: 'If 4(2x - 3) = -20, what is the value of x?',
    options: ['x = -1', 'x = -4', 'x = 1', 'x = 2'],
    correctIndex: 0,
    explanation: 'Distribute: 8x - 12 = -20 => 8x = -20 + 12 = -8 => x = -1.',
    prerequisiteConcept: 'Distributive property & integer addition',
    difficulty: 'EASY'
  },
  {
    id: 'q_alg_03',
    subjectId: 'sub_math',
    chapter: 'Quadratic Equations',
    topic: 'Roots of Quadratic Equations',
    question: 'What are the roots of x² - 5x + 6 = 0?',
    options: ['x = 2 and x = 3', 'x = -2 and x = -3', 'x = 1 and x = 6', 'x = -1 and x = -6'],
    correctIndex: 0,
    explanation: 'Factoring: (x - 2)(x - 3) = 0 => x = 2 or x = 3.',
    prerequisiteConcept: 'Factoring quadratic trinomials',
    difficulty: 'MEDIUM'
  },
  {
    id: 'q_sci_01',
    subjectId: 'sub_sci',
    chapter: 'Light - Reflection and Refraction',
    topic: 'Spherical Mirrors & Focal Length',
    question: 'According to Cartesian sign convention, the focal length of a concave mirror is always:',
    options: ['Negative', 'Positive', 'Zero', 'Depends on object position'],
    correctIndex: 0,
    explanation: 'In concave mirrors, the focal point lies in front of the reflecting surface (towards the left of the pole), making it negative.',
    prerequisiteConcept: 'Cartesian coordinate system conventions in ray optics',
    difficulty: 'EASY'
  },
  {
    id: 'q_sci_02',
    subjectId: 'sub_sci',
    chapter: 'Chemical Reactions and Equations',
    topic: 'Redox Reactions & Oxidation',
    question: 'In the reaction CuO + H₂ → Cu + H₂O, which substance is oxidized?',
    options: ['H₂', 'CuO', 'Cu', 'H₂O'],
    correctIndex: 0,
    explanation: 'H₂ gains oxygen to form H₂O, representing oxidation. CuO loses oxygen, meaning it is reduced.',
    prerequisiteConcept: 'Classical definition of oxidation (gain of oxygen / loss of electrons)',
    difficulty: 'MEDIUM'
  },
  {
    id: 'q_sci_03',
    subjectId: 'sub_sci',
    chapter: 'Life Processes',
    topic: 'Cellular Respiration Pathways',
    question: 'The breakdown of pyruvate to give carbon dioxide, water and energy takes place in:',
    options: ['Mitochondria', 'Cytoplasm', 'Chloroplast', 'Endoplasmic Reticulum'],
    correctIndex: 0,
    explanation: 'Glycolysis occurs in cytoplasm, but aerobic respiration (Krebs cycle) breaks pyruvate down in mitochondria.',
    prerequisiteConcept: 'Aerobic vs anaerobic cellular pathways',
    difficulty: 'MEDIUM'
  },
  {
    id: 'q_soc_01',
    subjectId: 'sub_soc',
    chapter: 'Advent of Europeans to India',
    topic: 'Carnatic Wars & Battle of Plassey',
    question: 'Which treaty ended the First Anglo-Maratha War in 1782?',
    options: ['Salbai Agreement', 'Treaty of Bassein', 'Treaty of Madras', 'Treaty of Srirangapatna'],
    correctIndex: 0,
    explanation: 'The Salbai Agreement was signed between the Marathas and the British East India Company in 1782.',
    prerequisiteConcept: 'Chronology of British expansion treaties in India',
    difficulty: 'MEDIUM'
  },
  {
    id: 'q_kan_01',
    subjectId: 'sub_kan',
    chapter: 'ಯುದ್ಧ (ಕಥೆ)',
    topic: 'ಕನ್ನಡ ವ್ಯಾಕರಣ - ಸಂಧಿಗಳು',
    question: '‘ಮಳೆಗಾಲ’ ಪದವು ಈ ಕೆಳಗಿನ ಯಾವ ಸಂಧಿಗೆ ಉದಾಹರಣೆಯಾಗಿದೆ?',
    options: ['ಆದೇಶ ಸಂಧಿ', 'ಲೋಪ ಸಂಧಿ', 'ಆಗಮ ಸಂಧಿ', 'ಗುಣ ಸಂಧಿ'],
    correctIndex: 0,
    explanation: 'ಮಳೆ + ಕಾಲ = ಮಳೆಗಾಲ. ‘ಕ’ ಕಾರಕ್ಕೆ ‘ಗ’ ಕಾರ ಆದೇಶವಾಗಿ ಬಂದಿರುವುದರಿಂದ ಇದು ಆದೇಶ ಸಂಧಿ.',
    prerequisiteConcept: 'ಕನ್ನಡ ವ್ಯಾಕರಣದ ಮೂಲ ಸಂಧಿ ನಿಯಮಗಳು',
    difficulty: 'EASY'
  },
  {
    id: 'q_eng_01',
    subjectId: 'sub_eng',
    chapter: 'A Hero (R. K. Narayan)',
    topic: 'Reported Speech & Tenses',
    question: 'Identify the correct passive voice: "Swami caught the burglar."',
    options: [
      'The burglar was caught by Swami.',
      'The burglar is caught by Swami.',
      'Swami was catching the burglar.',
      'The burglar has been caught by Swami.'
    ],
    correctIndex: 0,
    explanation: 'Simple past tense active (Subject + V2 + Object) converts to (Object + was/were + V3 + by Subject).',
    prerequisiteConcept: 'Active to Passive Voice transformation rules',
    difficulty: 'EASY'
  },
  {
    id: 'q_hin_01',
    subjectId: 'sub_hin',
    chapter: 'मातृभूमि (भगवतीचरण वर्मा)',
    topic: 'हिंदी व्याकरण - समास',
    question: '‘यथाशक्ति’ में कौन सा समास है?',
    options: ['अव्ययीभाव समास', 'तत्पुरुष समास', 'द्विगु समास', 'द्वंद्व समास'],
    correctIndex: 0,
    explanation: 'जिस समास का पहला पद प्रधान और अव्यय हो, उसे अव्ययीभाव समास कहते हैं (यथा + शक्ति = शक्ति के अनुसार).',
    prerequisiteConcept: 'समास के भेद और पहचान के नियम',
    difficulty: 'MEDIUM'
  }
];

export const INITIAL_LEARNING_GAPS: LearningGap[] = [
  {
    id: 'gap_01',
    subject: 'Mathematics',
    chapter: 'Algebra',
    topic: 'Linear Equations & Variable Transposition',
    performanceScore: 35,
    severity: 'CRITICAL',
    identifiedGap: 'Struggles with negative coefficient division and sign flipping across equality sign.',
    prerequisiteWeakness: 'Integer arithmetic & rules for multiplying/dividing signed numbers (-a/-b = +c).',
    evidence: 'Missed 3 out of 3 diagnostic questions involving negative variable multipliers (e.g., -3x + 7 = -14).',
    recommendedSequence: [
      'Step 1: 15-min visual refresher on negative number line operations.',
      'Step 2: Interactive drill on 1-step equations with negative multipliers.',
      'Step 3: Multi-step linear equation solving with parenthetical distribution.',
      'Step 4: 5-question mastery checkpoint quiz.'
    ],
    status: 'IN_PROGRESS',
    detectedDate: '2026-11-18'
  },
  {
    id: 'gap_02',
    subject: 'Science',
    chapter: 'Light - Reflection and Refraction',
    topic: 'Mirror Formula & Cartesian Sign Conventions',
    performanceScore: 52,
    severity: 'MODERATE',
    identifiedGap: 'Inconsistent application of negative signs for focal lengths in concave mirrors.',
    prerequisiteWeakness: 'Cartesian coordinate axis conventions (left of origin is negative).',
    evidence: 'Substituted positive focal length +15cm instead of -15cm in mirror formula calculations.',
    recommendedSequence: [
      'Step 1: Quick revision of 2D coordinate graphs relative to optical pole.',
      'Step 2: Sign convention rule table review (object distance u, image distance v, focal length f).',
      'Step 3: 3 guided numerical calculation walkthroughs.'
    ],
    status: 'PENDING',
    detectedDate: '2026-11-19'
  },
  {
    id: 'gap_03',
    subject: 'Science',
    chapter: 'Chemical Reactions and Equations',
    topic: 'Balancing Redox Equations with Oxidation States',
    performanceScore: 64,
    severity: 'MILD',
    identifiedGap: 'Difficulty tracking electron transfer in ionic redox reactions.',
    prerequisiteWeakness: 'Valency concepts and ion charges.',
    evidence: 'Struggled to identify reducing agent when no oxygen atoms were involved.',
    recommendedSequence: [
      'Step 1: OIL RIG mnemonic review (Oxidation Is Loss, Reduction Is Gain of electrons).',
      'Step 2: Identifying oxidation state shifts practice set.'
    ],
    status: 'PENDING',
    detectedDate: '2026-11-20'
  }
];

export const INITIAL_STUDY_PLAN: StudyPlan = {
  id: 'plan_alex_w47',
  title: 'Weekly Mastery & Prerequisite Remediation Plan',
  weeklyTargetHours: 18,
  completedHours: 12.5,
  dailyGoalHours: 2.5,
  examDate: '2026-12-05',
  tasks: [
    { id: 'st_01', day: 'Monday', timeSlot: '04:30 PM - 05:30 PM', subject: 'Mathematics', topic: 'Negative Integers & 1-Step Equations (Gap Remediation)', type: 'PREREQUISITE_FIX', durationMinutes: 60, completed: true, priority: 'HIGH' },
    { id: 'st_02', day: 'Monday', timeSlot: '05:45 PM - 06:30 PM', subject: 'Science', topic: 'Ray Diagrams for Concave Mirrors', type: 'CONCEPT_REVIEW', durationMinutes: 45, completed: true, priority: 'MEDIUM' },
    { id: 'st_03', day: 'Tuesday', timeSlot: '04:30 PM - 05:15 PM', subject: 'Mathematics', topic: 'Linear Equations with Fractions & Parentheses', type: 'ACTIVE_RECALL', durationMinutes: 45, completed: true, priority: 'HIGH' },
    { id: 'st_04', day: 'Tuesday', timeSlot: '05:30 PM - 06:15 PM', subject: 'Science', topic: 'Oxidation States & Redox Identification', type: 'CONCEPT_REVIEW', durationMinutes: 45, completed: true, priority: 'MEDIUM' },
    { id: 'st_05', day: 'Wednesday', timeSlot: '04:30 PM - 05:00 PM', subject: 'General', topic: 'Active Rest / Brain Recharge', type: 'BREAK', durationMinutes: 30, completed: true, priority: 'LOW' },
    { id: 'st_06', day: 'Wednesday', timeSlot: '05:00 PM - 06:00 PM', subject: 'Social Science', topic: 'Advent of Europeans & Treaties Review', type: 'PRACTICE_QUIZ', durationMinutes: 60, completed: true, priority: 'HIGH' },
    { id: 'st_07', day: 'Thursday', timeSlot: '04:30 PM - 05:30 PM', subject: 'English', topic: 'Reported Speech & Active-Passive Voice Drills', type: 'PREREQUISITE_FIX', durationMinutes: 60, completed: false, priority: 'HIGH' },
    { id: 'st_08', day: 'Friday', timeSlot: '04:30 PM - 05:30 PM', subject: 'Kannada', topic: 'ಸಿರಿ ಕನ್ನಡ ವ್ಯಾಕರಣ: ಸಂಧಿ ಮತ್ತು ಸಮಾಸಗಳು', type: 'CONCEPT_REVIEW', durationMinutes: 60, completed: false, priority: 'MEDIUM' },
    { id: 'st_09', day: 'Saturday', timeSlot: '10:00 AM - 11:30 AM', subject: 'Hindi', topic: 'व्याकरण: समास और मुहावरे अभ्यास', type: 'PRACTICE_QUIZ', durationMinutes: 90, completed: false, priority: 'HIGH' },
    { id: 'st_10', day: 'Sunday', timeSlot: '03:00 PM - 04:00 PM', subject: 'All Subjects', topic: 'Weekly Flashcard Spaced Repetition (KSEAB Blueprint)', type: 'ACTIVE_RECALL', durationMinutes: 60, completed: false, priority: 'MEDIUM' },
  ]
};

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: 'att_01', studentId: 'usr_student_01', studentName: 'Alex Johnson', date: '2026-11-17', status: 'PRESENT', subject: 'Kannada' },
  { id: 'att_02', studentId: 'usr_student_01', studentName: 'Alex Johnson', date: '2026-11-18', status: 'PRESENT', subject: 'English' },
  { id: 'att_03', studentId: 'usr_student_01', studentName: 'Alex Johnson', date: '2026-11-19', status: 'PRESENT', subject: 'Hindi' },
  { id: 'att_04', studentId: 'usr_student_01', studentName: 'Alex Johnson', date: '2026-11-20', status: 'LATE', subject: 'Mathematics' },
  { id: 'att_05', studentId: 'usr_student_01', studentName: 'Alex Johnson', date: '2026-11-21', status: 'PRESENT', subject: 'Science' },
  { id: 'att_06', studentId: 'usr_student_01', studentName: 'Alex Johnson', date: '2026-11-22', status: 'PRESENT', subject: 'Social Science' },
  { id: 'att_07', studentId: 'usr_student_02', studentName: 'Maya Patel', date: '2026-11-22', status: 'PRESENT', subject: 'Mathematics' },
  { id: 'att_08', studentId: 'usr_student_03', studentName: 'Lucas Silva', date: '2026-11-22', status: 'ABSENT', subject: 'Mathematics' },
  { id: 'att_09', studentId: 'usr_student_04', studentName: 'Chloe Bennett', date: '2026-11-22', status: 'PRESENT', subject: 'Mathematics' },
  { id: 'att_10', studentId: 'usr_student_05', studentName: 'Aarav Sharma', date: '2026-11-22', status: 'PRESENT', subject: 'Mathematics' },
];

export const INITIAL_MARKS: MarkRecord[] = [
  { id: 'mrk_01', studentId: 'usr_student_01', studentName: 'Alex Johnson', examName: 'Mid-Term Assessment', subject: 'Mathematics', marksObtained: 74, totalMarks: 100, grade: 'B', feedback: 'Solid arithmetic, needs revision on negative linear equations.', date: '2026-10-15' },
  { id: 'mrk_02', studentId: 'usr_student_01', studentName: 'Alex Johnson', examName: 'Unit Test 2', subject: 'Science', marksObtained: 85, totalMarks: 100, grade: 'A', feedback: 'Very strong light reflection & chemistry concepts.', date: '2026-11-02' },
  { id: 'mrk_03', studentId: 'usr_student_01', studentName: 'Alex Johnson', examName: 'Unit Test 2', subject: 'Social Science', marksObtained: 92, totalMarks: 100, grade: 'A+', feedback: 'Excellent conceptual clarity in history and geography.', date: '2026-11-05' },
  { id: 'mrk_04', studentId: 'usr_student_01', studentName: 'Alex Johnson', examName: 'Diagnostic Quiz', subject: 'Mathematics', marksObtained: 35, totalMarks: 100, grade: 'D', feedback: 'Learning gap identified in linear equations algebra.', date: '2026-11-18' },
  { id: 'mrk_05', studentId: 'usr_student_02', studentName: 'Maya Patel', examName: 'Mid-Term Assessment', subject: 'Mathematics', marksObtained: 96, totalMarks: 100, grade: 'A+', feedback: 'Outstanding problem solving precision.', date: '2026-10-15' },
  { id: 'mrk_06', studentId: 'usr_student_03', studentName: 'Lucas Silva', examName: 'Mid-Term Assessment', subject: 'Mathematics', marksObtained: 62, totalMarks: 100, grade: 'C', feedback: 'Frequent calculation errors in multi-step problems.', date: '2026-10-15' },
  { id: 'mrk_07', studentId: 'usr_student_04', studentName: 'Chloe Bennett', examName: 'Mid-Term Assessment', subject: 'Mathematics', marksObtained: 88, totalMarks: 100, grade: 'A', feedback: 'Great performance in geometric proofs.', date: '2026-10-15' },
  { id: 'mrk_08', studentId: 'usr_student_05', studentName: 'Aarav Sharma', examName: 'Mid-Term Assessment', subject: 'Mathematics', marksObtained: 90, totalMarks: 100, grade: 'A', feedback: 'Consistent accuracy across all sections.', date: '2026-10-15' },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann_01',
    title: 'Mid-Semester Examination Schedule Announced',
    content: 'The Grade 10 Mid-Semester assessments will commence on December 5, 2026. Review your AI study planner to target weak prerequisite concepts early.',
    author: 'Principal Wilson',
    date: '2026-11-20',
    targetRole: 'ALL',
    priority: 'URGENT'
  },
  {
    id: 'ann_02',
    title: 'Math Diagnostic Remediation Clinic',
    content: 'Ms. Chen is hosting an interactive clinic for students working through Algebra and Linear Equation prerequisite modules this Thursday.',
    author: 'Ms. Sarah Chen',
    date: '2026-11-19',
    targetRole: 'STUDENTS',
    priority: 'NORMAL'
  },
  {
    id: 'ann_03',
    title: 'Parent-Teacher Academic Growth Conference',
    content: 'Appointments are now open in the Parent Portal for personalized academic reviews focusing on individual student learning curve heatmaps.',
    author: 'Administration',
    date: '2026-11-16',
    targetRole: 'PARENTS',
    priority: 'NORMAL'
  }
];

export const INITIAL_BADGES: Badge[] = [
  { id: 'bdg_01', title: 'Curious Mind', description: 'Asked 20+ questions to Nexa AI Tutor', icon: 'BrainCircuit', unlockedAt: '2026-11-10', category: 'QUIZ' },
  { id: 'bdg_02', title: '7-Day Fire Streak', description: 'Maintained active daily study schedule for a full week', icon: 'Flame', unlockedAt: '2026-11-20', category: 'STREAK' },
  { id: 'bdg_03', title: 'Gap Crusher', description: 'Identified and remediated a critical prerequisite concept', icon: 'Target', unlockedAt: '2026-11-15', category: 'MASTERY' },
  { id: 'bdg_04', title: 'Speed Solver', description: 'Completed a 10-question quiz in under 3 minutes with 90%+ accuracy', icon: 'Zap', category: 'SPEED' },
  { id: 'bdg_05', title: 'Polyglot Learner', description: 'Engaged with AI Tutor in multiple regional languages', icon: 'Globe', category: 'MASTERY' },
];

export const CLASS_ROSTER = [
  { id: 'usr_student_01', name: 'Alex Johnson', grade: 'Grade 10', section: 'A', gpa: 3.78, attendance: 94.2, status: 'Needs Attention (Math)', weakTopic: 'Linear Equations' },
  { id: 'usr_student_02', name: 'Maya Patel', grade: 'Grade 10', section: 'A', gpa: 3.98, attendance: 98.5, status: 'Excelling', weakTopic: 'None' },
  { id: 'usr_student_03', name: 'Lucas Silva', grade: 'Grade 10', section: 'A', gpa: 2.85, attendance: 82.0, status: 'Needs Attention (Attendance & Math)', weakTopic: 'Fractions & Ratios' },
  { id: 'usr_student_04', name: 'Chloe Bennett', grade: 'Grade 10', section: 'A', gpa: 3.65, attendance: 95.0, status: 'On Track', weakTopic: 'Optics Ray Diagrams' },
  { id: 'usr_student_05', name: 'Aarav Sharma', grade: 'Grade 10', section: 'A', gpa: 3.82, attendance: 96.4, status: 'On Track', weakTopic: 'Chemical Bonding' },
];

export const WEEKLY_PERFORMANCE_DATA = [
  { day: 'Mon', score: 72, target: 80, studyHours: 2.5 },
  { day: 'Tue', score: 75, target: 80, studyHours: 3.0 },
  { day: 'Wed', score: 68, target: 80, studyHours: 2.0 },
  { day: 'Thu', score: 82, target: 80, studyHours: 3.5 },
  { day: 'Fri', score: 88, target: 80, studyHours: 2.8 },
  { day: 'Sat', score: 92, target: 80, studyHours: 4.0 },
  { day: 'Sun', score: 85, target: 80, studyHours: 3.0 },
];
