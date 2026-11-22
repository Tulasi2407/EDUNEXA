import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'en' | 'hi' | 'kn';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, fallback?: string) => string;
  isKannada: boolean;
  isHindi: boolean;
  isEnglish: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.gapFinder': 'AI Gap Finder',
    'nav.planner': 'Study Planner',
    'nav.tutor': 'Nexa AI Tutor',
    'nav.materials': 'Study Materials',
    'nav.quiz': 'Quizzes & Tests',
    'nav.practice': 'Practice Drills',
    'nav.pace': 'Learning Pace',
    'nav.results': 'My Results',
    'nav.attendance': 'Attendance',
    'nav.assignments': 'Assignments',
    'nav.achievements': 'Achievements',
    'nav.profile': 'My Profile',
    'nav.students': 'Class & Students',
    'nav.marks': 'Marks & Exams',
    'nav.quizBuilder': 'Quiz Builder',
    'nav.analytics': 'Learning Analytics',
    'nav.announcements': 'Announcements',
    'nav.childOverview': 'Child Overview',
    'nav.academicProgress': 'Academic Progress',
    'nav.communication': 'Teacher Notices',
    'nav.userDirectory': 'User Directory',
    'nav.classes': 'Classes & Sections',
    'nav.reports': 'System Reports',
    'nav.settings': 'Platform Settings',
    'nav.logout': 'Sign Out',

    // TopNav & Common
    'top.karnatakaScope': 'Karnataka SSLC Class 10',
    'top.stateBoard': 'Karnataka State Board (KSEAB)',
    'top.platformLanguage': 'Platform Language',
    'top.notices': 'Broadcast Notices',
    'top.liveUpdates': 'Live updates',
    'top.judgeTour': 'Judge Demo Tour',
    'top.switchRole': 'Quick Role Switch',
    'top.switchDemo': 'Switch Demo Account',
    'top.testPerspectives': 'Test different user perspectives',

    // Roles
    'role.student': 'Student',
    'role.teacher': 'Teacher',
    'role.parent': 'Parent',
    'role.admin': 'Admin',
    'role.studentDesc': 'Grade 10 Scholar',
    'role.teacherDesc': 'SSLC Faculty Lead',
    'role.parentDesc': 'Guardian / Parent',
    'role.adminDesc': 'System Administrator',

    // Subjects
    'sub.kannada': 'Kannada (First Language)',
    'sub.english': 'English (Second Language)',
    'sub.hindi': 'Hindi (Third Language)',
    'sub.mathematics': 'Mathematics',
    'sub.science': 'Science',
    'sub.socialScience': 'Social Science',

    // Common UI
    'common.gradeLevel': 'Grade Level',
    'common.subject': 'Subject',
    'common.targetChapter': 'Target Chapter',
    'common.questions': 'Questions',
    'common.next': 'Next Question',
    'common.submit': 'Submit',
    'common.start': 'Start',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.active': 'Active',
    'common.pending': 'Pending',
    'common.resolved': 'Resolved',
    'common.rootCause': 'Root Cause',
    'common.evidence': 'AI Evidence',
    'common.remediate': 'Remediate with Nexa AI',

    // Diagnostic & Gap Finder
    'gap.title': 'Step 1: Diagnostic Scope Selection',
    'gap.subtitle': 'Tell us what you want to assess today',
    'gap.stumblingBlocks': 'Self-Reported Stumbling Blocks (Optional)',
    'gap.startBtn': 'Begin AI Diagnostic Assessment (4 Questions)',
    'gap.howTraces': 'How EduNexa Traces Root Causes',
    'gap.howTracesDesc': "When a student misses an equation like -3x = -21, the error isn't algebraic concept blindness — it's usually unmastered integer arithmetic rules from earlier grades.",

    // Nexa AI Tutor
    'tutor.title': 'Nexa AI Tutor',
    'tutor.subtitle': 'Powered by Gemini AI • Multilingual & Adaptive',
    'tutor.placeholder': 'Ask Nexa AI about Karnataka Class 10 curriculum (Type in English, ಕನ್ನಡ, or हिन्दी)...',
    'tutor.send': 'Send',
    'tutor.mode.beginner': '🌱 Explain Like Beginner',
    'tutor.mode.stepByStep': '🔢 Step-by-Step',
    'tutor.mode.examPrep': '🎯 Exam Prep',
    'tutor.mode.practice': '✏️ Practice Mode',
    'tutor.mode.quickRevision': '⚡ 60-Sec Revision',

    // Study Materials
    'materials.title': 'Study Materials & Resources',
    'materials.subtitle': 'Official Karnataka State Board (KSEAB) SSLC Textbooks, PYQs (2020-2024) & Notes',
    'materials.tabTextbooks': 'Official Textbooks',
    'materials.tabPyq': 'Previous Year Papers (2020-2024)',
    'materials.tabNotes': 'Chapter Notes & Formulae',
    'materials.tabBlueprint': 'KSEAB Model Blueprints',
  },
  kn: {
    // Navigation
    'nav.dashboard': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    'nav.gapFinder': 'ಎಐ ಕಲಿಕಾ ನ್ಯೂನತೆ ಪತ್ತೆದಾರ',
    'nav.planner': 'ಅಧ್ಯಯನ ವೇಳಾಪಟ್ಟಿ',
    'nav.tutor': 'ನೆಕ್ಸಾ ಎಐ ಬೋಧಕ',
    'nav.materials': 'ಅಧ್ಯಯನ ಸಾಮಗ್ರಿಗಳು',
    'nav.quiz': 'ರಸಪ್ರಶ್ನೆ ಮತ್ತು ಪರೀಕ್ಷೆಗಳು',
    'nav.practice': 'ಅಭ್ಯಾಸ ಡ್ರಿಲ್‌ಗಳು',
    'nav.pace': 'ಕಲಿಕೆಯ ವೇಗ',
    'nav.results': 'ನನ್ನ ಫಲಿತಾಂಶಗಳು',
    'nav.attendance': 'ಹಾಜರಾತಿ ದಾಖಲೆ',
    'nav.assignments': 'ನಿಯೋಜನೆಗಳು (ಅಸೈನ್‌ಮೆಂಟ್)',
    'nav.achievements': 'ಸಾಧನೆಗಳು & ಪದಕಗಳು',
    'nav.profile': 'ನನ್ನ ಪ್ರೊಫೈಲ್',
    'nav.students': 'ತರಗತಿ & ವಿದ್ಯಾರ್ಥಿಗಳು',
    'nav.marks': 'ಅಂಕಗಳು & ಪರೀಕ್ಷೆಗಳು',
    'nav.quizBuilder': 'ಪ್ರಶ್ನೆ ಪತ್ರಿಕೆ ತಯಾರಕ',
    'nav.analytics': 'ಕಲಿಕಾ ವಿಶ್ಲೇಷಣೆ',
    'nav.announcements': 'ಪ್ರಕಟಣೆಗಳು',
    'nav.childOverview': 'ಮಗುವಿನ ಅವಲೋಕನ',
    'nav.academicProgress': 'ಶೈಕ್ಷಣಿಕ ಪ್ರಗತಿ',
    'nav.communication': 'ಶಿಕ್ಷಕರ ಸೂಚನೆಗಳು',
    'nav.userDirectory': 'ಬಳಕೆದಾರರ ಪಟ್ಟಿ',
    'nav.classes': 'ತರಗತಿಗಳು & ವಿಭಾಗಗಳು',
    'nav.reports': 'ವ್ಯವಸ್ಥಾ ವರದಿಗಳು',
    'nav.settings': 'ವೇದಿಕೆ ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    'nav.logout': 'ನಿರ್ಗಮಿಸಿ (ಲಾಗ್‌ಔಟ್)',

    // TopNav & Common
    'top.karnatakaScope': 'ಕರ್ನಾಟಕ ಎಸ್‌.ಎಸ್‌.ಎಲ್‌.ಸಿ. 10ನೇ ತರಗತಿ',
    'top.stateBoard': 'ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪರೀಕ್ಷಾ ಮಂಡಳಿ (KSEAB)',
    'top.platformLanguage': 'ವೇದಿಕೆಯ ಭಾಷೆ',
    'top.notices': 'ಪ್ರಸಾರ ಪ್ರಕಟಣೆಗಳು',
    'top.liveUpdates': 'ನೇರ ಅಪ್‌ಡೇಟ್‌ಗಳು',
    'top.judgeTour': 'ಮೌಲ್ಯಮಾಪನ ಪರಿಚಯ ಪ್ರವಾಸ',
    'top.switchRole': 'ತ್ವರಿತ ಪಾತ್ರ ಬದಲಾವಣೆ',
    'top.switchDemo': 'ಡೆಮೊ ಖಾತೆ ಬದಲಾಯಿಸಿ',
    'top.testPerspectives': 'ವಿವಿಧ ಬಳಕೆದಾರರ ನೋಟವನ್ನು ಪರೀಕ್ಷಿಸಿ',

    // Roles
    'role.student': 'ವಿದ್ಯಾರ್ಥಿ',
    'role.teacher': 'ಶಿಕ್ಷಕರು',
    'role.parent': 'ಪೋಷಕರು',
    'role.admin': 'ಆಡಳಿತಾಧಿಕಾರಿ',
    'role.studentDesc': '10ನೇ ತರಗತಿ ವಿದ್ಯಾರ್ಥಿ',
    'role.teacherDesc': 'ಎಸ್‌.ಎಸ್‌.ಎಲ್‌.ಸಿ. ಬೋಧಕ ಸಿಬ್ಬಂದಿ',
    'role.parentDesc': 'ಪೋಷಕರು / ಪಾಲಕರು',
    'role.adminDesc': 'ಕೇಂದ್ರ ವ್ಯವಸ್ಥಾಪಕರು',

    // Subjects
    'sub.kannada': 'ಪ್ರಥಮ ಭಾಷೆ ಸಿರಿ ಕನ್ನಡ',
    'sub.english': 'ದ್ವಿತೀಯ ಭಾಷೆ ಇಂಗ್ಲಿಷ್',
    'sub.hindi': 'ತೃತೀಯ ಭಾಷೆ ಹಿಂದಿ',
    'sub.mathematics': 'ಗಣಿತ (Mathematics)',
    'sub.science': 'ವಿಜ್ಞಾನ (Science)',
    'sub.socialScience': 'ಸಮಾಜ ವಿಜ್ಞಾನ (Social Science)',

    // Common UI
    'common.gradeLevel': 'ತರಗತಿ ಮಟ್ಟ',
    'common.subject': 'ವಿಷಯ',
    'common.targetChapter': 'ಗುರಿ ಅಧ್ಯಾಯ',
    'common.questions': 'ಪ್ರಶ್ನೆಗಳು',
    'common.next': 'ಮುಂದಿನ ಪ್ರಶ್ನೆ',
    'common.submit': 'ಸಲ್ಲಿಸಿ (Submit)',
    'common.start': 'ಪ್ರಾರಂಭಿಸಿ',
    'common.save': 'ಉಳಿಸಿ (Save)',
    'common.cancel': 'ರದ್ದುಮಾಡಿ',
    'common.active': 'ಸಕ್ರಿಯ',
    'common.pending': 'ಬಾಕಿ ಇದೆ',
    'common.resolved': 'ಪರಿಹರಿಸಲಾಗಿದೆ',
    'common.rootCause': 'ಮೂಲ ಕಾರಣ (Root Cause)',
    'common.evidence': 'ಎಐ ಸಾಕ್ಷ್ಯ ಪುರಾವೆ',
    'common.remediate': 'ನೆಕ್ಸಾ ಎಐ ಮೂಲಕ ಸುಧಾರಿಸಿ →',

    // Diagnostic & Gap Finder
    'gap.title': 'ಹಂತ 1: ರೋಗನಿರ್ಣಯ ವ್ಯಾಪ್ತಿ ಆಯ್ಕೆ',
    'gap.subtitle': 'ಇಂದು ನೀವು ಮೌಲ್ಯಮಾಪನ ಮಾಡಲು ಬಯಸುವ ವಿಷಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    'gap.stumblingBlocks': 'ನೀವು ಎದುರಿಸುತ್ತಿರುವ ಕಷ್ಟಗಳು (ಐಚ್ಛಿಕ)',
    'gap.startBtn': 'ಎಐ ರೋಗನಿರ್ಣಯ ಮೌಲ್ಯಮಾಪನ ಪ್ರಾರಂಭಿಸಿ (4 ಪ್ರಶ್ನೆಗಳು)',
    'gap.howTraces': 'ಎಡುನೆಕ್ಸಾ ಮೂಲ ಕಾರಣವನ್ನು ಹೇಗೆ ಪತ್ತೆ ಮಾಡುತ್ತದೆ?',
    'gap.howTracesDesc': 'ವಿದ್ಯಾರ್ಥಿಯು -3x = -21 ನಂತಹ ಸಮೀಕರಣವನ್ನು ತಪ್ಪಿಸಿದಾಗ, ತಪ್ಪು ಬೀಜಗಣಿತದ ಕಲ್ಪನೆಯದ್ದಲ್ಲ - ಅದು ಹಿಂದಿನ ತರಗತಿಯ ಋಣಾತ್ಮಕ ಪೂರ್ಣಾಂಕಗಳ ಲೆಕ್ಕಾಚಾರದ ನಿಯಮಗಳ ಕೊರತೆಯಾಗಿರುತ್ತದೆ.',

    // Nexa AI Tutor
    'tutor.title': 'ನೆಕ್ಸಾ ಎಐ ಬೋಧಕ',
    'tutor.subtitle': 'ಜೆಮಿನಿ ಎಐ ಚಾಲಿತ • ಬಹುಭಾಷಾ ಮತ್ತು ಹೊಂದಾಣಿಕೆಯ ಮಾರ್ಗದರ್ಶಿ',
    'tutor.placeholder': 'ಕರ್ನಾಟಕ 10ನೇ ತರಗತಿಯ ಪಠ್ಯಕ್ರಮದ ಬಗ್ಗೆ ಪ್ರಶ್ನೆ ಕೇಳಿ (ಕನ್ನಡ, English, ಅಥವಾ हिन्दी ನಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ)...',
    'tutor.send': 'ಕಳುಹಿಸಿ',
    'tutor.mode.beginner': '🌱 ಸರಳವಾಗಿ ವಿವರಿಸಿ',
    'tutor.mode.stepByStep': '🔢 ಹಂತ-ಹಂತವಾಗಿ ಲೆಕ್ಕ',
    'tutor.mode.examPrep': '🎯 ಬೋರ್ಡ್ ಪರೀಕ್ಷಾ ತಯಾರಿ',
    'tutor.mode.practice': '✏️ ಅಭ್ಯಾಸ ಕ್ರಮ',
    'tutor.mode.quickRevision': '⚡ 60-ಸೆಕೆಂಡ್ ಪುನರಾವರ್ತನೆ',

    // Study Materials
    'materials.title': 'ಅಧ್ಯಯನ ಸಾಮಗ್ರಿಗಳು & ಪುಸ್ತಕಗಳು',
    'materials.subtitle': 'ಕರ್ನಾಟಕ ಕೆ.ಎಸ್‌.ಇ.ಎ.ಬಿ. ಅಧಿಕೃತ 10ನೇ ತರಗತಿ ಪಠ್ಯಪುಸ್ತಕಗಳು, ಹಿಂದಿನ ಪ್ರಶ್ನೆ ಪತ್ರಿಕೆಗಳು (2020-2024) ಮತ್ತು ನೋಟ್ಸ್‌',
    'materials.tabTextbooks': 'ಅಧಿಕೃತ ಪಠ್ಯಪುಸ್ತಕಗಳು (KTBS)',
    'materials.tabPyq': 'ಹಿಂದಿನ ವರ್ಷಗಳ ಪ್ರಶ್ನೆ ಪತ್ರಿಕೆಗಳು (2020-2024)',
    'materials.tabNotes': 'ಅಧ್ಯಾಯವಾರು ನೋಟ್ಸ್ & ಸೂತ್ರಗಳು',
    'materials.tabBlueprint': 'ಬೋರ್ಡ್ ಪರೀಕ್ಷಾ ಬ್ಲೂಪ್ರಿಂಟ್',
  },
  hi: {
    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.gapFinder': 'एआई लर्निंग गैप फाइंडर',
    'nav.planner': 'अध्ययन योजनाकार (समय सारणी)',
    'nav.tutor': 'नेक्सा एआई ट्यूटर',
    'nav.materials': 'अध्ययन सामग्री और पाठ्यपुस्तकें',
    'nav.quiz': 'प्रश्नोत्तरी और टेस्ट',
    'nav.practice': 'अभ्यास अभ्यास (ड्रिल्स)',
    'nav.pace': 'सीखने की गति',
    'nav.results': 'मेरे परीक्षा परिणाम',
    'nav.attendance': 'उपस्थिति रिकॉर्ड',
    'nav.assignments': 'असाइनमेंट',
    'nav.achievements': 'उपलब्धियां और पदक',
    'nav.profile': 'मेरी प्रोफ़ाइल',
    'nav.students': 'कक्षा और छात्र',
    'nav.marks': 'अंक और परीक्षा',
    'nav.quizBuilder': 'प्रश्न पत्र निर्माता',
    'nav.analytics': 'सीखने की विश्लेषिकी',
    'nav.announcements': 'सूचनाएं और घोषणाएं',
    'nav.childOverview': 'बाल अवलोकन',
    'nav.academicProgress': 'शैक्षणिक प्रगति',
    'nav.communication': 'शिक्षक नोटिस',
    'nav.userDirectory': 'उपयोगकर्ता निर्देशिका',
    'nav.classes': 'कक्षाएं और अनुभाग',
    'nav.reports': 'सिस्टम रिपोर्ट',
    'nav.settings': 'प्लेटफ़ॉर्म सेटिंग्स',
    'nav.logout': 'साइन आउट (लॉग आउट)',

    // TopNav & Common
    'top.karnatakaScope': 'कर्नाटक एसएसएलसी कक्षा 10',
    'top.stateBoard': 'कर्नाटक राज्य बोर्ड (KSEAB)',
    'top.platformLanguage': 'प्लेटफ़ॉर्म भाषा',
    'top.notices': 'प्रसारण नोटिस',
    'top.liveUpdates': 'लाइव अपडेट',
    'top.judgeTour': 'मूल्यांकनकर्ता डेमो टूर',
    'top.switchRole': 'त्वरित भूमिका स्विच',
    'top.switchDemo': 'डेमो खाता बदलें',
    'top.testPerspectives': 'विभिन्न उपयोगकर्ता दृष्टिकोण का परीक्षण करें',

    // Roles
    'role.student': 'छात्र',
    'role.teacher': 'शिक्षक',
    'role.parent': 'अभिभावक / माता-पिता',
    'role.admin': 'प्रशासक',
    'role.studentDesc': 'कक्षा 10 छात्र',
    'role.teacherDesc': 'एसएसएलसी संकाय',
    'role.parentDesc': 'अभिभावक',
    'role.adminDesc': 'केंद्रीय प्रशासक',

    // Subjects
    'sub.kannada': 'कन्नड़ (प्रथम भाषा)',
    'sub.english': 'अंग्रेजी (द्वितीय भाषा)',
    'sub.hindi': 'तृतीय भाषा हिंदी',
    'sub.mathematics': 'गणित (Mathematics)',
    'sub.science': 'विज्ञान (Science)',
    'sub.socialScience': 'सामाजिक विज्ञान (Social Science)',

    // Common UI
    'common.gradeLevel': 'कक्षा स्तर',
    'common.subject': 'विषय',
    'common.targetChapter': 'लक्षित अध्याय',
    'common.questions': 'प्रश्न',
    'common.next': 'अगला प्रश्न',
    'common.submit': 'जमा करें (Submit)',
    'common.start': 'आरंभ करें',
    'common.save': 'सहेजें (Save)',
    'common.cancel': 'रद्द करें',
    'common.active': 'सक्रिय',
    'common.pending': 'लंबित',
    'common.resolved': 'हल किया गया',
    'common.rootCause': 'मूल कारण (Root Cause)',
    'common.evidence': 'एआई साक्ष्य',
    'common.remediate': 'नेक्सा एआई के साथ सीखें →',

    // Diagnostic & Gap Finder
    'gap.title': 'चरण 1: नैदानिक दायरा चयन',
    'gap.subtitle': 'चुनें कि आज आप किस विषय का आकलन करना चाहते हैं',
    'gap.stumblingBlocks': 'आपकी कठिनाइयां (वैकल्पिक)',
    'gap.startBtn': 'एआई नैदानिक मूल्यांकन शुरू करें (4 प्रश्न)',
    'gap.howTraces': 'एड्युनेक्सा मूल कारणों का पता कैसे लगाता है?',
    'gap.howTracesDesc': 'जब कोई छात्र -3x = -21 जैसे समीकरण को गलत करता है, तो त्रुटि बीजगणित की नहीं, बल्कि पिछली कक्षाओं के ऋणात्मक पूर्णांक नियमों की होती है।',

    // Nexa AI Tutor
    'tutor.title': 'नेक्सा एआई ट्यूटर',
    'tutor.subtitle': 'जेमिनी एआई द्वारा संचालित • बहुभाषी और अनुकूली',
    'tutor.placeholder': 'कर्नाटक कक्षा 10 पाठ्यक्रम के बारे में प्रश्न पूछें (हिन्दी, ಕನ್ನಡ, या English में टाइप करें)...',
    'tutor.send': 'भेजें',
    'tutor.mode.beginner': '🌱 सरलता से समझाएं',
    'tutor.mode.stepByStep': '🔢 चरण-दर-चरण समाधान',
    'tutor.mode.examPrep': '🎯 बोर्ड परीक्षा की तैयारी',
    'tutor.mode.practice': '✏️ अभ्यास मोड',
    'tutor.mode.quickRevision': '⚡ 60-सेकंड त्वरित संशोधन',

    // Study Materials
    'materials.title': 'अध्ययन सामग्री और पाठ्यपुस्तकें',
    'materials.subtitle': 'आधिकारिक कर्नाटक बोर्ड (KSEAB) एसएसएलसी पाठ्यपुस्तकें, पिछले वर्षों के प्रश्न पत्र (2020-2024) और नोट्स',
    'materials.tabTextbooks': 'आधिकारिक पाठ्यपुस्तकें (KTBS)',
    'materials.tabPyq': 'पिछले वर्षों के प्रश्न पत्र (2020-2024)',
    'materials.tabNotes': 'अध्यायवार नोट्स और सूत्र',
    'materials.tabBlueprint': 'बोर्ड मॉडल ब्लूप्रिंट',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('edunexa_language') as LanguageCode;
    return saved === 'kn' || saved === 'hi' || saved === 'en' ? saved : 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('edunexa_language', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string, fallback?: string): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    if (dict[key]) {
      return dict[key];
    }
    // Fall back to English dictionary if key missing in current language
    if (TRANSLATIONS.en[key]) {
      return TRANSLATIONS.en[key];
    }
    return fallback || key;
  };

  const isKannada = language === 'kn';
  const isHindi = language === 'hi';
  const isEnglish = language === 'en';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isKannada, isHindi, isEnglish }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
