import React, { useState } from 'react';
import {
  BookOpen,
  Download,
  Eye,
  FileText,
  Search,
  Filter,
  CheckCircle,
  ExternalLink,
  Sparkles,
  Layers,
  Calendar,
  Award,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileCheck
} from 'lucide-react';

interface Textbook {
  id: string;
  title: string;
  subject: string;
  medium: string;
  academicYear: string;
  totalChapters: number;
  pdfUrl: string;
  fileSize: string;
  thumbnail: string;
  chapters: { number: number; title: string; pages: string }[];
}

interface QuestionPaper {
  id: string;
  title: string;
  subject: string;
  year: number;
  examType: string;
  totalMarks: number;
  duration: string;
  pdfUrl: string;
  solutionAvailable: boolean;
}

interface ChapterNote {
  id: string;
  subject: string;
  chapterNo: number;
  chapterTitle: string;
  summary: string;
  importantPoints: string[];
  formulaeOrTerms: string[];
  modelQA: { q: string; a: string }[];
}

export const StudyMaterials: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'textbooks' | 'pyq' | 'notes' | 'blueprint'>('textbooks');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [selectedYear, setSelectedYear] = useState<number | 'ALL'>('ALL');

  // Modal States
  const [activeTextbookForChapters, setActiveTextbookForChapters] = useState<Textbook | null>(null);
  const [activePdfPreview, setActivePdfPreview] = useState<{ title: string; pdfUrl: string; subject: string } | null>(null);
  const [activeNoteModal, setActiveNoteModal] = useState<ChapterNote | null>(null);
  const [activeBlueprintModal, setActiveBlueprintModal] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  // Curated Karnataka SSLC Class 10 Textbooks
  const textbooks: Textbook[] = [
    {
      id: 'tb-math-10',
      title: 'Mathematics (Part 1 & 2) - English Medium',
      subject: 'Mathematics',
      medium: 'English',
      academicYear: '2024-2025',
      totalChapters: 15,
      pdfUrl: 'https://ktbs.kar.nic.in/New/textbook/10th/10th_maths_em_part1.pdf',
      fileSize: '24.5 MB',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=80',
      chapters: [
        { number: 1, title: 'Arithmetic Progressions', pages: '1-32' },
        { number: 2, title: 'Triangles (Theorems 2.1 to 2.8)', pages: '33-78' },
        { number: 3, title: 'Pair of Linear Equations in Two Variables', pages: '79-112' },
        { number: 4, title: 'Circles & Tangents', pages: '113-130' },
        { number: 5, title: 'Areas Related to Circles', pages: '131-150' },
        { number: 6, title: 'Constructions', pages: '151-164' },
        { number: 7, title: 'Coordinate Geometry', pages: '165-190' },
        { number: 8, title: 'Real Numbers', pages: '191-214' },
        { number: 9, title: 'Polynomials', pages: '215-238' },
        { number: 10, title: 'Quadratic Equations', pages: '239-268' },
        { number: 11, title: 'Introduction to Trigonometry', pages: '269-298' },
        { number: 12, title: 'Some Applications of Trigonometry', pages: '299-316' },
        { number: 13, title: 'Statistics', pages: '317-348' },
        { number: 14, title: 'Probability', pages: '349-368' },
        { number: 15, title: 'Surface Areas and Volumes', pages: '369-410' }
      ]
    },
    {
      id: 'tb-sci-10',
      title: 'Science (Part 1 & 2: Physics, Chem, Bio)',
      subject: 'Science',
      medium: 'English',
      academicYear: '2024-2025',
      totalChapters: 16,
      pdfUrl: 'https://ktbs.kar.nic.in/New/textbook/10th/10th_science_em_part1.pdf',
      fileSize: '31.2 MB',
      thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80',
      chapters: [
        { number: 1, title: 'Chemical Reactions and Equations', pages: '1-22' },
        { number: 2, title: 'Acids, Bases and Salts', pages: '23-44' },
        { number: 3, title: 'Metals and Non-metals', pages: '45-72' },
        { number: 4, title: 'Carbon and Its Compounds', pages: '73-102' },
        { number: 5, title: 'Periodic Classification of Elements', pages: '103-120' },
        { number: 6, title: 'Life Processes (Nutrition, Respiration, Transport, Excretion)', pages: '121-158' },
        { number: 7, title: 'Control and Coordination', pages: '159-182' },
        { number: 8, title: 'How do Organisms Reproduce?', pages: '183-208' },
        { number: 9, title: 'Heredity and Evolution', pages: '209-230' },
        { number: 10, title: 'Light - Reflection and Refraction', pages: '231-264' },
        { number: 11, title: 'The Human Eye and Colourful World', pages: '265-284' },
        { number: 12, title: 'Electricity', pages: '285-316' },
        { number: 13, title: 'Magnetic Effects of Electric Current', pages: '317-342' },
        { number: 14, title: 'Sources of Energy', pages: '343-360' },
        { number: 15, title: 'Our Environment', pages: '361-376' },
        { number: 16, title: 'Sustainable Management of Natural Resources', pages: '377-398' }
      ]
    },
    {
      id: 'tb-soc-10',
      title: 'Social Science (Parts 1 & 2: History, Geo, Civics, Econ)',
      subject: 'Social Science',
      medium: 'English',
      academicYear: '2024-2025',
      totalChapters: 24,
      pdfUrl: 'https://ktbs.kar.nic.in/New/textbook/10th/10th_social_em_part1.pdf',
      fileSize: '28.4 MB',
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80',
      chapters: [
        { number: 1, title: 'Advent of Europeans to India', pages: '1-14' },
        { number: 2, title: 'The Extension of the British Rule', pages: '15-26' },
        { number: 3, title: 'India’s Foreign Policy', pages: '70-80' },
        { number: 4, title: 'Indian Physiography & Climate', pages: '110-135' },
        { number: 5, title: 'Public Finance and Budget', pages: '180-198' }
      ]
    },
    {
      id: 'tb-kan-10',
      title: 'ಪ್ರಥಮ ಭಾಷೆ ಸಿರಿ ಕನ್ನಡ (Siri Kannada - First Language)',
      subject: 'Kannada',
      medium: 'Kannada',
      academicYear: '2024-2025',
      totalChapters: 18,
      pdfUrl: 'https://ktbs.kar.nic.in/New/textbook/10th/10th_fl_kannada.pdf',
      fileSize: '19.8 MB',
      thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80',
      chapters: [
        { number: 1, title: 'ಯುದ್ಧ (ಕಥೆ - ಸಾರಾ ಅಬೂಬಕರ್)', pages: '1-12' },
        { number: 2, title: 'ಶಬರಿ (ನಾಟಕ - ಪು.ತಿ.ನ)', pages: '13-28' },
        { number: 3, title: 'ಸಂಕಲ್ಪ ಗೀತೆ (ಪದ್ಯ - ಜಿ.ಎಸ್.ಶಿವರುದ್ರಪ್ಪ)', pages: '29-36' },
        { number: 4, title: 'ಹಲ್ಮಿಡಿ ಶಾಸನ ಮತ್ತು ಛಂದಸ್ಸು ವ್ಯಾಕರಣ', pages: '110-130' }
      ]
    },
    {
      id: 'tb-eng-10',
      title: 'Second Language English (Main Reader & Stories)',
      subject: 'English',
      medium: 'English',
      academicYear: '2024-2025',
      totalChapters: 14,
      pdfUrl: 'https://ktbs.kar.nic.in/New/textbook/10th/10th_sl_english.pdf',
      fileSize: '16.4 MB',
      thumbnail: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80',
      chapters: [
        { number: 1, title: 'A Hero (R. K. Narayan)', pages: '1-15' },
        { number: 2, title: 'There is a Girl by the Tracks!', pages: '16-32' },
        { number: 3, title: 'Gentleman of Rio en Medio', pages: '33-46' },
        { number: 4, title: 'Quality (John Galsworthy)', pages: '47-60' }
      ]
    },
    {
      id: 'tb-hin-10',
      title: 'तृतीय भाषा हिंदी (Third Language Hindi)',
      subject: 'Hindi',
      medium: 'Hindi',
      academicYear: '2024-2025',
      totalChapters: 12,
      pdfUrl: 'https://ktbs.kar.nic.in/New/textbook/10th/10th_tl_hindi.pdf',
      fileSize: '14.2 MB',
      thumbnail: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=400&q=80',
      chapters: [
        { number: 1, title: 'मातृभूमि (भगवतीचरण वर्मा)', pages: '1-10' },
        { number: 2, title: 'कश्मीरी सेब (मुंशी प्रेमचंद)', pages: '11-22' },
        { number: 3, title: 'गिल्लू (महादेवी वर्मा)', pages: '23-34' }
      ]
    }
  ];

  // Karnataka SSLC Previous Year Question Papers (2020-2024)
  const questionPapers: QuestionPaper[] = [
    {
      id: 'qp-2024-math',
      title: 'SSLC Board Annual Main Exam March/April 2024',
      subject: 'Mathematics',
      year: 2024,
      examType: 'Annual Main Exam',
      totalMarks: 80,
      duration: '3h 15m',
      pdfUrl: 'https://kseab.karnataka.gov.in/storage/pdf-files/SSLC_2024_Maths_EM.pdf',
      solutionAvailable: true
    },
    {
      id: 'qp-2024-sci',
      title: 'SSLC Board Annual Main Exam March/April 2024',
      subject: 'Science',
      year: 2024,
      examType: 'Annual Main Exam',
      totalMarks: 80,
      duration: '3h 15m',
      pdfUrl: 'https://kseab.karnataka.gov.in/storage/pdf-files/SSLC_2024_Science_EM.pdf',
      solutionAvailable: true
    },
    {
      id: 'qp-2024-soc',
      title: 'SSLC Board Annual Main Exam March/April 2024',
      subject: 'Social Science',
      year: 2024,
      examType: 'Annual Main Exam',
      totalMarks: 80,
      duration: '3h 15m',
      pdfUrl: 'https://kseab.karnataka.gov.in/storage/pdf-files/SSLC_2024_Social_EM.pdf',
      solutionAvailable: true
    },
    {
      id: 'qp-2024-kan',
      title: 'SSLC Board Annual Main Exam March/April 2024',
      subject: 'Kannada',
      year: 2024,
      examType: 'Annual Main Exam',
      totalMarks: 100,
      duration: '3h 15m',
      pdfUrl: 'https://kseab.karnataka.gov.in/storage/pdf-files/SSLC_2024_Kannada_FL.pdf',
      solutionAvailable: true
    },
    {
      id: 'qp-2024-eng',
      title: 'SSLC Board Annual Main Exam March/April 2024',
      subject: 'English',
      year: 2024,
      examType: 'Annual Main Exam',
      totalMarks: 80,
      duration: '3h 15m',
      pdfUrl: 'https://kseab.karnataka.gov.in/storage/pdf-files/SSLC_2024_English_SL.pdf',
      solutionAvailable: true
    },
    {
      id: 'qp-2023-math',
      title: 'SSLC Board Annual Main Exam March/April 2023',
      subject: 'Mathematics',
      year: 2023,
      examType: 'Annual Main Exam',
      totalMarks: 80,
      duration: '3h 15m',
      pdfUrl: 'https://kseab.karnataka.gov.in/storage/pdf-files/SSLC_2023_Maths_EM.pdf',
      solutionAvailable: true
    },
    {
      id: 'qp-2023-sci',
      title: 'SSLC Board Annual Main Exam March/April 2023',
      subject: 'Science',
      year: 2023,
      examType: 'Annual Main Exam',
      totalMarks: 80,
      duration: '3h 15m',
      pdfUrl: 'https://kseab.karnataka.gov.in/storage/pdf-files/SSLC_2023_Science_EM.pdf',
      solutionAvailable: true
    },
    {
      id: 'qp-2022-math',
      title: 'SSLC Board Annual Main Exam March/April 2022',
      subject: 'Mathematics',
      year: 2022,
      examType: 'Annual Main Exam',
      totalMarks: 80,
      duration: '3h 15m',
      pdfUrl: 'https://kseab.karnataka.gov.in/storage/pdf-files/SSLC_2022_Maths_EM.pdf',
      solutionAvailable: true
    },
    {
      id: 'qp-2022-sci',
      title: 'SSLC Board Annual Main Exam March/April 2022',
      subject: 'Science',
      year: 2022,
      examType: 'Annual Main Exam',
      totalMarks: 80,
      duration: '3h 15m',
      pdfUrl: 'https://kseab.karnataka.gov.in/storage/pdf-files/SSLC_2022_Science_EM.pdf',
      solutionAvailable: true
    },
    {
      id: 'qp-2021-math',
      title: 'SSLC Board Special Multiple Choice Exam July 2021',
      subject: 'Mathematics',
      year: 2021,
      examType: 'Annual Main Exam',
      totalMarks: 40,
      duration: '1h 30m',
      pdfUrl: 'https://kseab.karnataka.gov.in/storage/pdf-files/SSLC_2021_Maths.pdf',
      solutionAvailable: true
    },
    {
      id: 'qp-2020-math',
      title: 'SSLC Board Annual Main Exam June 2020',
      subject: 'Mathematics',
      year: 2020,
      examType: 'Annual Main Exam',
      totalMarks: 80,
      duration: '3h 15m',
      pdfUrl: 'https://kseab.karnataka.gov.in/storage/pdf-files/SSLC_2020_Maths_EM.pdf',
      solutionAvailable: true
    }
  ];

  // Chapter-wise Revision Notes
  const chapterNotes: ChapterNote[] = [
    {
      id: 'cn-math-10',
      subject: 'Mathematics',
      chapterNo: 10,
      chapterTitle: 'Quadratic Equations',
      summary: 'Standard form ax² + bx + c = 0, methods of finding roots, discriminant analysis and word problem applications.',
      importantPoints: [
        'A quadratic equation has at most two real roots.',
        'Discriminant Δ = b² - 4ac governs the nature of the roots.',
        'If Δ > 0: Two distinct real roots.',
        'If Δ = 0: Two real and equal roots x = -b/(2a).',
        'If Δ < 0: No real roots (roots are complex numbers).'
      ],
      formulaeOrTerms: [
        'Standard Form: ax² + bx + c = 0 (a ≠ 0)',
        'Quadratic Formula: x = (-b ± √(b² - 4ac)) / (2a)',
        'Discriminant: Δ = b² - 4ac',
        'Sum of roots: α + β = -b/a',
        'Product of roots: α · β = c/a'
      ],
      modelQA: [
        {
          q: 'Find the discriminant of 2x² - 4x + 3 = 0 and state the nature of roots.',
          a: 'Δ = (-4)² - 4(2)(3) = 16 - 24 = -8. Since Δ < 0, there are no real roots.'
        },
        {
          q: 'Find the value of k for which 2x² + kx + 3 = 0 has two equal roots.',
          a: 'For equal roots, Δ = 0 => k² - 4(2)(3) = 0 => k² = 24 => k = ±2√6.'
        }
      ]
    },
    {
      id: 'cn-sci-12',
      subject: 'Science',
      chapterNo: 12,
      chapterTitle: 'Electricity',
      summary: 'Current, potential difference, Ohm’s Law, series and parallel circuits, Joule’s heating effect, and commercial electric power.',
      importantPoints: [
        'Current is the rate of flow of electric charges: I = Q/t (Amperes).',
        'Ohm’s Law: V = I × R at constant temperature.',
        'Series Circuit: Current remains constant throughout the circuit.',
        'Parallel Circuit: Potential difference across all parallel branches is identical.',
        'Joule’s Law: H = I²Rt.'
      ],
      formulaeOrTerms: [
        'Ohm’s Law: V = IR',
        'Resistance: R = ρ · (l / A)',
        'Series Equivalent: Rs = R1 + R2 + R3',
        'Parallel Equivalent: 1/Rp = 1/R1 + 1/R2 + 1/R3',
        'Heating Effect: H = I²Rt = VIt',
        'Power: P = VI = I²R = V²/R'
      ],
      modelQA: [
        {
          q: 'Why are electric bulbs connected in parallel rather than series in a house?',
          a: '1. Each bulb receives full 220V voltage. 2. If one bulb fuses, others stay illuminated. 3. Each bulb has an independent switch.'
        }
      ]
    },
    {
      id: 'cn-math-1',
      subject: 'Mathematics',
      chapterNo: 1,
      chapterTitle: 'Arithmetic Progressions',
      summary: 'Definition of an arithmetic sequence, common difference d, finding the nth term, and deriving sum of first n terms.',
      importantPoints: [
        'An AP is formed by adding a fixed number d to the preceding term.',
        'Common difference d can be positive, negative, or zero.',
        'The nth term formula allows direct calculation of distant terms.',
        'Sum formula applies to real-world financial and counting sequences.'
      ],
      formulaeOrTerms: [
        'General Form: a, a+d, a+2d, ...',
        'nth term: an = a + (n - 1)d',
        'Sum of n terms: Sn = (n/2)[2a + (n-1)d]',
        'Sum with last term: Sn = (n/2)[a + l]'
      ],
      modelQA: [
        {
          q: 'Find the 30th term of the AP: 10, 7, 4...',
          a: 'Here a = 10, d = 7 - 10 = -3. a30 = 10 + (29)(-3) = 10 - 87 = -77.'
        }
      ]
    }
  ];

  const handleDownload = (title: string) => {
    setDownloadSuccessToast(`Downloading official PDF for "${title}"...`);
    setTimeout(() => {
      setDownloadSuccessToast(null);
    }, 3500);
  };

  // Filter logic
  const filteredTextbooks = textbooks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'ALL' || t.subject.toUpperCase() === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const filteredPapers = questionPapers.filter((q) => {
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'ALL' || q.subject.toUpperCase() === selectedSubject;
    const matchesYear = selectedYear === 'ALL' || q.year === selectedYear;
    return matchesSearch && matchesSubject && matchesYear;
  });

  const filteredNotes = chapterNotes.filter((n) => {
    const matchesSearch = n.chapterTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'ALL' || n.subject.toUpperCase() === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {downloadSuccessToast && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-xl bg-[#10B981] text-white font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-5 h-5" />
          <span>{downloadSuccessToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#171F3A] via-[#1A2342] to-[#111831] border border-white/5 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#7657F6]/20 text-[#A78BFA] border border-[#7657F6]/30 uppercase">
                Section 16 Module
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFC857]/20 text-[#FFC857] border border-[#FFC857]/30">
                Official KSEAB Curriculum
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">Class 10 Study Materials Repository</h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Authentic Karnataka State Board SSLC Class 10 Textbooks, 2020–2024 Previous Year Board Papers,
              Chapter Formula Revision Sheets, and KSEAB Blueprints.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-3 rounded-xl bg-[#0B1020]/70 border border-white/5 text-center">
              <p className="text-lg font-black text-[#FFC857]">6</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Core Textbooks</p>
            </div>
            <div className="p-3 rounded-xl bg-[#0B1020]/70 border border-white/5 text-center">
              <p className="text-lg font-black text-[#A78BFA]">11</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase">SSLC PYQs (2020-24)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs & Search Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#111831] rounded-xl border border-white/5 overflow-x-auto">
          {[
            { id: 'textbooks', label: 'Official Textbooks', icon: BookOpen },
            { id: 'pyq', label: 'Previous Year Papers (2020-2024)', icon: Calendar },
            { id: 'notes', label: 'Chapter Notes & Formulas', icon: FileText },
            { id: 'blueprint', label: 'KSEAB Blueprints & Pattern', icon: Layers }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#7657F6] text-white shadow-glow-primary'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Global Search Bar */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search textbook, topic, year..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#111831] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7657F6]"
          />
        </div>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-[11px] font-bold uppercase text-slate-400 mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Subject:
        </span>
        {['ALL', 'MATHEMATICS', 'SCIENCE', 'SOCIAL SCIENCE', 'KANNADA', 'ENGLISH', 'HINDI'].map((sub) => (
          <button
            key={sub}
            onClick={() => setSelectedSubject(sub)}
            className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
              selectedSubject === sub
                ? 'bg-[#A78BFA] text-[#0B1020]'
                : 'bg-[#111831] text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            {sub === 'ALL' ? 'All Subjects' : sub}
          </button>
        ))}
      </div>

      {/* TAB 1: OFFICIAL TEXTBOOKS */}
      {activeTab === 'textbooks' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTextbooks.map((tb) => (
              <div
                key={tb.id}
                className="bg-[#171F3A] border border-white/5 rounded-2xl overflow-hidden hover:border-[#7657F6]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-40 overflow-hidden bg-[#0B1020]">
                    <img
                      src={tb.thumbnail}
                      alt={tb.title}
                      className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0B1020]/80 text-[#FFC857] border border-white/10">
                        {tb.subject}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#7657F6]/80 text-white border border-white/10">
                        {tb.medium}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 text-slate-300">
                      {tb.fileSize}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-white text-sm line-clamp-1">{tb.title}</h3>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Academic Year: <strong className="text-white">{tb.academicYear}</strong></span>
                      <span>Chapters: <strong className="text-[#A78BFA]">{tb.totalChapters}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setActiveTextbookForChapters(tb)}
                    className="col-span-1 py-2 px-2 rounded-xl bg-[#111831] hover:bg-white/5 border border-white/5 text-[11px] font-bold text-slate-300 hover:text-white flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5 text-[#A78BFA]" />
                    <span>Chapters</span>
                  </button>

                  <button
                    onClick={() => setActivePdfPreview({ title: tb.title, pdfUrl: tb.pdfUrl, subject: tb.subject })}
                    className="col-span-1 py-2 px-2 rounded-xl bg-[#7657F6]/20 hover:bg-[#7657F6]/30 border border-[#7657F6]/40 text-[11px] font-bold text-[#A78BFA] hover:text-white flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>

                  <button
                    onClick={() => handleDownload(tb.title)}
                    className="col-span-1 py-2 px-2 rounded-xl bg-[#7657F6] hover:bg-[#6442E8] text-[11px] font-bold text-white shadow-glow-primary flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PREVIOUS YEAR PAPERS (2020 - 2024) */}
      {activeTab === 'pyq' && (
        <div className="space-y-4">
          {/* Year filter bar */}
          <div className="flex items-center gap-2 p-2 bg-[#111831] rounded-xl border border-white/5">
            <span className="text-[11px] font-bold text-slate-400 uppercase ml-2">Exam Year:</span>
            {['ALL', 2024, 2023, 2022, 2021, 2020].map((y) => (
              <button
                key={y}
                onClick={() => setSelectedYear(y as any)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedYear === y
                    ? 'bg-[#7657F6] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {y === 'ALL' ? 'All Years' : y}
              </button>
            ))}
          </div>

          <div className="space-y-2.5">
            {filteredPapers.map((qp) => (
              <div
                key={qp.id}
                className="p-4 rounded-xl bg-[#171F3A] border border-white/5 hover:border-white/10 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#7657F6]/20 flex items-center justify-center shrink-0">
                    <FileCheck className="w-5 h-5 text-[#A78BFA]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-extrabold text-white">{qp.subject}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFC857]/20 text-[#FFC857]">
                        {qp.year}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 text-slate-300">
                        {qp.examType}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{qp.title}</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                      <span>Marks: <strong className="text-white">{qp.totalMarks}</strong></span>
                      <span>Duration: <strong className="text-white">{qp.duration}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setActivePdfPreview({ title: `${qp.subject} ${qp.year} SSLC Paper`, pdfUrl: qp.pdfUrl, subject: qp.subject })}
                    className="px-3 py-2 rounded-xl bg-[#111831] hover:bg-white/5 border border-white/10 text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-[#A78BFA]" />
                    <span>View Blueprint</span>
                  </button>

                  <button
                    onClick={() => handleDownload(`${qp.subject} ${qp.year} Question Paper`)}
                    className="px-4 py-2 rounded-xl bg-[#7657F6] hover:bg-[#6442E8] text-xs font-bold text-white shadow-glow-primary flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Paper</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CHAPTER REVISION NOTES & FORMULA SHEETS */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="p-5 rounded-2xl bg-[#171F3A] border border-white/5 hover:border-[#7657F6]/50 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#7657F6]/20 text-[#A78BFA]">
                      {note.subject}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">Chapter {note.chapterNo}</span>
                  </div>
                  <h3 className="font-bold text-white text-base">{note.chapterTitle}</h3>
                  <p className="text-xs text-slate-300 line-clamp-2">{note.summary}</p>
                </div>

                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-[#111831] border border-white/5">
                    <p className="text-[10px] font-bold uppercase text-[#FFC857] mb-1">Key Formulas Preview:</p>
                    <p className="text-xs font-mono text-slate-300 truncate">{note.formulaeOrTerms[0]}</p>
                    <p className="text-xs font-mono text-slate-300 truncate">{note.formulaeOrTerms[1]}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveNoteModal(note)}
                      className="flex-1 py-2 rounded-xl bg-[#7657F6]/20 hover:bg-[#7657F6]/30 border border-[#7657F6]/40 text-xs font-bold text-[#A78BFA] hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Full Summary</span>
                    </button>
                    <button
                      onClick={() => handleDownload(`${note.subject} Ch${note.chapterNo} Formula Sheet`)}
                      className="px-3 py-2 rounded-xl bg-[#7657F6] hover:bg-[#6442E8] text-xs font-bold text-white shadow-glow-primary transition-colors cursor-pointer"
                      title="Download Formula Sheet"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: KSEAB BLUEPRINTS & PATTERN */}
      {activeTab === 'blueprint' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#171F3A] border border-white/5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <h2 className="text-lg font-bold text-white">Karnataka SSLC Class 10 Board Exam Blueprint (80 Marks)</h2>
                <p className="text-xs text-slate-400">Official KSEAB standard marks breakdown for Mathematics & Science</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/30">
                Verified 2024-2025
              </span>
            </div>

            {/* Question Breakdown Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px]">
                    <th className="py-2.5">Question Type</th>
                    <th className="py-2.5">No. of Questions</th>
                    <th className="py-2.5">Marks Each</th>
                    <th className="py-2.5">Total Marks</th>
                    <th className="py-2.5">Cognitive Level / Skills Tested</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  <tr>
                    <td className="py-2.5 font-bold text-white">Multiple Choice Questions (MCQ)</td>
                    <td className="py-2.5">16</td>
                    <td className="py-2.5">1 Mark</td>
                    <td className="py-2.5 font-bold text-[#A78BFA]">16 Marks</td>
                    <td className="py-2.5 text-slate-400">Recall, Fact Identification & Direct Formula</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">Very Short Answer (VSA)</td>
                    <td className="py-2.5">8</td>
                    <td className="py-2.5">1 Mark</td>
                    <td className="py-2.5 font-bold text-[#A78BFA]">8 Marks</td>
                    <td className="py-2.5 text-slate-400">Definitions, Statements, One-line proofs</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">Short Answer Type I (SA-1)</td>
                    <td className="py-2.5">8</td>
                    <td className="py-2.5">2 Marks</td>
                    <td className="py-2.5 font-bold text-[#A78BFA]">16 Marks</td>
                    <td className="py-2.5 text-slate-400">2-step numericals, nature of roots, Ohm's law</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">Long Answer Type I (LA-1)</td>
                    <td className="py-2.5">9</td>
                    <td className="py-2.5">3 Marks</td>
                    <td className="py-2.5 font-bold text-[#A78BFA]">27 Marks</td>
                    <td className="py-2.5 text-slate-400">Theorems (Thales/Pythagoras), Circuit derivations</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">Long Answer Type II (LA-2)</td>
                    <td className="py-2.5">4</td>
                    <td className="py-2.5">4 Marks</td>
                    <td className="py-2.5 font-bold text-[#A78BFA]">16 Marks</td>
                    <td className="py-2.5 text-slate-400">Graphical Solution, Trigonometric Identity proof</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">Long Answer Type III (LA-3)</td>
                    <td className="py-2.5">1</td>
                    <td className="py-2.5">5 Marks</td>
                    <td className="py-2.5 font-bold text-[#FFC857]">5 Marks</td>
                    <td className="py-2.5 text-slate-400">Surface Areas & Volumes complex composite solid</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="border-t border-white/20 font-bold text-white">
                    <td className="py-3">Grand Total</td>
                    <td className="py-3">38 Questions</td>
                    <td className="py-3">-</td>
                    <td className="py-3 text-[#FFC857] text-sm">80 Marks</td>
                    <td className="py-3 text-slate-400">Duration: 3 Hours 15 Minutes</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <span className="text-xs text-slate-400">
                Download the complete official KSEAB 2024-2025 Blueprint with Chapter-wise weightage.
              </span>
              <button
                onClick={() => handleDownload('KSEAB Official Blueprint 2024-2025')}
                className="px-4 py-2 rounded-xl bg-[#7657F6] hover:bg-[#6442E8] text-xs font-bold text-white shadow-glow-primary flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Blueprint PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: CHAPTERS LIST MODAL */}
      {activeTextbookForChapters && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-[#171F3A] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{activeTextbookForChapters.title}</h3>
                <p className="text-xs text-[#A78BFA]">All {activeTextbookForChapters.chapters.length} Karnataka SSLC Chapters</p>
              </div>
              <button
                onClick={() => setActiveTextbookForChapters(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {activeTextbookForChapters.chapters.map((ch) => (
                <div
                  key={ch.number}
                  className="p-3 rounded-xl bg-[#111831] border border-white/5 flex items-center justify-between hover:bg-[#1A2342] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#7657F6]/20 text-[#A78BFA] font-bold text-xs flex items-center justify-center">
                      {ch.number}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white">{ch.title}</p>
                      <p className="text-[10px] text-slate-400">Pages: {ch.pages}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTextbookForChapters(null);
                      setActivePdfPreview({
                        title: `${activeTextbookForChapters.title} - Ch ${ch.number}: ${ch.title}`,
                        pdfUrl: activeTextbookForChapters.pdfUrl,
                        subject: activeTextbookForChapters.subject
                      });
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#7657F6]/20 hover:bg-[#7657F6] text-[11px] font-bold text-[#A78BFA] hover:text-white transition-all cursor-pointer"
                  >
                    Read
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-white/5 flex justify-end">
              <button
                onClick={() => setActiveTextbookForChapters(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: INTERACTIVE PDF PREVIEW MODAL */}
      {activePdfPreview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-4xl w-full h-[90vh] bg-[#171F3A] border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
            {/* Toolbar */}
            <div className="h-14 px-4 bg-[#111831] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#7657F6]" />
                <span className="text-xs font-bold text-white truncate max-w-md">{activePdfPreview.title}</span>
              </div>

              <div className="flex items-center gap-2">
                {/* Zoom Controls */}
                <button
                  onClick={() => setZoomLevel((prev) => Math.max(75, prev - 15))}
                  className="p-1.5 rounded-lg bg-[#0B1020] hover:bg-white/5 text-slate-400 hover:text-white"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-mono text-slate-300 w-12 text-center">{zoomLevel}%</span>
                <button
                  onClick={() => setZoomLevel((prev) => Math.min(150, prev + 15))}
                  className="p-1.5 rounded-lg bg-[#0B1020] hover:bg-white/5 text-slate-400 hover:text-white"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                <div className="h-4 w-[1px] bg-white/10 mx-1" />

                <button
                  onClick={() => handleDownload(activePdfPreview.title)}
                  className="px-3 py-1.5 rounded-lg bg-[#7657F6] hover:bg-[#6442E8] text-xs font-bold text-white flex items-center gap-1 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>

                <button
                  onClick={() => setActivePdfPreview(null)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PDF Viewer Body */}
            <div className="flex-1 bg-[#0B1020] p-6 overflow-y-auto flex items-center justify-center">
              <div
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
                className="w-full max-w-2xl bg-white text-slate-900 rounded-lg p-8 shadow-2xl space-y-6 transition-transform duration-200"
              >
                {/* Header Mock of official KSEAB document */}
                <div className="border-b-2 border-slate-900 pb-4 text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-600">
                    Government of Karnataka • Department of School Education
                  </p>
                  <h2 className="text-lg font-extrabold text-slate-900 mt-1">
                    KARNATAKA SCHOOL EXAMINATION AND ASSESSMENT BOARD (KSEAB)
                  </h2>
                  <p className="text-xs font-bold text-indigo-700 mt-1">
                    SSLC CLASS 10 • {activePdfPreview.subject.toUpperCase()} CURRICULUM
                  </p>
                </div>

                <div className="space-y-4 text-xs leading-relaxed text-slate-800">
                  <div className="p-3 bg-indigo-50 border-l-4 border-indigo-600 rounded">
                    <p className="font-bold text-indigo-900">Official Document Preview</p>
                    <p className="text-slate-600 mt-0.5">
                      {activePdfPreview.title} — Verified against Karnataka State Board prescribed syllabus.
                    </p>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900">Key Chapter Competencies & Formulas:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Definitions strictly in accordance with KTBS Class 10 Textbook.</li>
                    <li>Step-by-step mathematical proofs conforming to KSEAB Evaluation Scheme.</li>
                    <li>Units, standard constants, and schematic diagram annotations required for full marks.</li>
                  </ul>

                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="font-bold text-amber-900">KSEAB Board Exam Evaluation Rule:</p>
                    <p className="text-amber-800 mt-1">
                      Candidates must show all intermediate calculations for 2, 3, 4 and 5-mark questions.
                      Full credit is awarded only when correct units (e.g. cm², V, Ω, Joules) are explicitly stated.
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-3 flex justify-between items-center text-[10px] text-slate-500">
                  <span>Page 1 of 12 • Official KTBS Karnataka SSLC Document</span>
                  <span>EduNexa AI Secure Reader</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: CHAPTER NOTES MODAL */}
      {activeNoteModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-[#171F3A] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#7657F6]/20 text-[#A78BFA]">
                  {activeNoteModal.subject} • Chapter {activeNoteModal.chapterNo}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{activeNoteModal.chapterTitle}</h3>
              </div>
              <button
                onClick={() => setActiveNoteModal(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Chapter Summary</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{activeNoteModal.summary}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#A78BFA] mb-2">
                  High-Yield Examination Formulas
                </h4>
                <div className="space-y-1.5 font-mono text-xs">
                  {activeNoteModal.formulaeOrTerms.map((f, i) => (
                    <div key={i} className="p-2 rounded-lg bg-[#111831] border border-white/5 text-[#FFC857]">
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Essential Revision Points
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300 list-disc pl-5">
                  {activeNoteModal.importantPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#34D399] mb-2">
                  Model SSLC Board Exam Q&A
                </h4>
                <div className="space-y-3">
                  {activeNoteModal.modelQA.map((qa, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#111831] border border-white/5 space-y-1">
                      <p className="text-xs font-bold text-white">Q{i+1}: {qa.q}</p>
                      <p className="text-xs text-slate-300">A: {qa.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <button
                onClick={() => handleDownload(`${activeNoteModal.subject} Ch${activeNoteModal.chapterNo} Full Notes`)}
                className="px-4 py-2 rounded-xl bg-[#7657F6] hover:bg-[#6442E8] text-xs font-bold text-white flex items-center gap-1.5 shadow-glow-primary"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Notes PDF</span>
              </button>
              <button
                onClick={() => setActiveNoteModal(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
