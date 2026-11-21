import os
import sys
import logging

# Ensure root is in python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../")))

from backend.app.database.mongodb import db_manager

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("seed_data")

def seed():
    logger.info("Initializing database manager connection...")
    db_manager.connect()

    # 1. Textbooks (Karnataka SSLC Class 10)
    textbooks = [
        {
            "id": "tb-math-10-en",
            "title": "Mathematics (Part 1 & 2) - English Medium",
            "subject": "Mathematics",
            "medium": "English",
            "academic_year": "2024-2025",
            "total_chapters": 15,
            "pdf_url": "https://ktbs.kar.nic.in/New/textbook/10th/10th_maths_em_part1.pdf",
            "file_size": "24.5 MB",
            "thumbnail": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=80",
            "download_allowed": True,
            "chapters": [
                {"number": 1, "title": "Arithmetic Progressions", "pages": "1-32"},
                {"number": 2, "title": "Triangles (Theorems 2.1 to 2.8)", "pages": "33-78"},
                {"number": 3, "title": "Pair of Linear Equations in Two Variables", "pages": "79-112"},
                {"number": 4, "title": "Circles", "pages": "113-130"},
                {"number": 5, "title": "Areas Related to Circles", "pages": "131-150"},
                {"number": 6, "title": "Constructions", "pages": "151-164"},
                {"number": 7, "title": "Coordinate Geometry", "pages": "165-190"},
                {"number": 8, "title": "Real Numbers", "pages": "191-214"},
                {"number": 9, "title": "Polynomials", "pages": "215-238"},
                {"number": 10, "title": "Quadratic Equations", "pages": "239-268"},
                {"number": 11, "title": "Introduction to Trigonometry", "pages": "269-298"},
                {"number": 12, "title": "Some Applications of Trigonometry", "pages": "299-316"},
                {"number": 13, "title": "Statistics", "pages": "317-348"},
                {"number": 14, "title": "Probability", "pages": "349-368"},
                {"number": 15, "title": "Surface Areas and Volumes", "pages": "369-410"}
            ]
        },
        {
            "id": "tb-sci-10-en",
            "title": "Science (Part 1 & 2) - English Medium",
            "subject": "Science",
            "medium": "English",
            "academic_year": "2024-2025",
            "total_chapters": 16,
            "pdf_url": "https://ktbs.kar.nic.in/New/textbook/10th/10th_science_em_part1.pdf",
            "file_size": "31.2 MB",
            "thumbnail": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80",
            "download_allowed": True,
            "chapters": [
                {"number": 1, "title": "Chemical Reactions and Equations", "pages": "1-22"},
                {"number": 2, "title": "Acids, Bases and Salts", "pages": "23-44"},
                {"number": 3, "title": "Metals and Non-metals", "pages": "45-72"},
                {"number": 4, "title": "Carbon and Its Compounds", "pages": "73-102"},
                {"number": 5, "title": "Periodic Classification of Elements", "pages": "103-120"},
                {"number": 6, "title": "Life Processes (Nutrition, Respiration, Transport, Excretion)", "pages": "121-158"},
                {"number": 7, "title": "Control and Coordination", "pages": "159-182"},
                {"number": 8, "title": "How do Organisms Reproduce?", "pages": "183-208"},
                {"number": 9, "title": "Heredity and Evolution", "pages": "209-230"},
                {"number": 10, "title": "Light - Reflection and Refraction", "pages": "231-264"},
                {"number": 11, "title": "The Human Eye and Colourful World", "pages": "265-284"},
                {"number": 12, "title": "Electricity", "pages": "285-316"},
                {"number": 13, "title": "Magnetic Effects of Electric Current", "pages": "317-342"},
                {"number": 14, "title": "Sources of Energy", "pages": "343-360"},
                {"number": 15, "title": "Our Environment", "pages": "361-376"},
                {"number": 16, "title": "Sustainable Management of Natural Resources", "pages": "377-398"}
            ]
        },
        {
            "id": "tb-soc-10-en",
            "title": "Social Science (Parts 1 & 2) - English Medium",
            "subject": "Social Science",
            "medium": "English",
            "academic_year": "2024-2025",
            "total_chapters": 24,
            "pdf_url": "https://ktbs.kar.nic.in/New/textbook/10th/10th_social_em_part1.pdf",
            "file_size": "28.4 MB",
            "thumbnail": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
            "download_allowed": True,
            "chapters": [
                {"number": 1, "title": "Advent of Europeans to India", "pages": "1-14"},
                {"number": 2, "title": "The Extension of the British Rule", "pages": "15-26"},
                {"number": 3, "title": "India's Foreign Policy", "pages": "70-80"},
                {"number": 4, "title": "Indian Physiography & Climate", "pages": "110-135"},
                {"number": 5, "title": "Economy and Government", "pages": "180-198"}
            ]
        },
        {
            "id": "tb-kan-10-kn",
            "title": "ಪ್ರಥಮ ಭಾಷೆ ಸಿರಿ ಕನ್ನಡ (Siri Kannada - First Language)",
            "subject": "Kannada",
            "medium": "Kannada",
            "academic_year": "2024-2025",
            "total_chapters": 18,
            "pdf_url": "https://ktbs.kar.nic.in/New/textbook/10th/10th_fl_kannada.pdf",
            "file_size": "19.8 MB",
            "thumbnail": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80",
            "download_allowed": True,
            "chapters": [
                {"number": 1, "title": "ಯುದ್ಧ (ಕಥೆ)", "pages": "1-12"},
                {"number": 2, "title": "ಶಬರಿ (ನಾಟಕ)", "pages": "13-28"},
                {"number": 3, "title": "ಸಂಕಲ್ಪ ಗೀತೆ (ಪದ್ಯ)", "pages": "29-36"},
                {"number": 4, "title": "ಹಲ್ಮಿಡಿ ಶಾಸನ ಮತ್ತು ವ್ಯಾಕರಣ", "pages": "110-130"}
            ]
        },
        {
            "id": "tb-eng-10-en",
            "title": "Second Language English (Main Reader & Supplementary)",
            "subject": "English",
            "medium": "English",
            "academic_year": "2024-2025",
            "total_chapters": 14,
            "pdf_url": "https://ktbs.kar.nic.in/New/textbook/10th/10th_sl_english.pdf",
            "file_size": "16.4 MB",
            "thumbnail": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80",
            "download_allowed": True,
            "chapters": [
                {"number": 1, "title": "A Hero (R. K. Narayan)", "pages": "1-15"},
                {"number": 2, "title": "There's a Girl by the Tracks!", "pages": "16-32"},
                {"number": 3, "title": "Gentleman of Rio en Medio", "pages": "33-46"},
                {"number": 4, "title": "Quality (John Galsworthy)", "pages": "47-60"}
            ]
        },
        {
            "id": "tb-hin-10-hi",
            "title": "तृतीय भाषा हिंदी (Third Language Hindi)",
            "subject": "Hindi",
            "medium": "Hindi",
            "academic_year": "2024-2025",
            "total_chapters": 12,
            "pdf_url": "https://ktbs.kar.nic.in/New/textbook/10th/10th_tl_hindi.pdf",
            "file_size": "14.2 MB",
            "thumbnail": "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=400&q=80",
            "download_allowed": True,
            "chapters": [
                {"number": 1, "title": "मातृभूमि (भगवतीचरण वर्मा)", "pages": "1-10"},
                {"number": 2, "title": "कश्मीरी सेब (प्रेमचंद)", "pages": "11-22"},
                {"number": 3, "title": "गिल्लू (महादेवी वर्मा)", "pages": "23-34"}
            ]
        }
    ]

    tb_col = db_manager.get_collection("textbooks")
    for tb in textbooks:
        tb_col.insert_one(tb)
    logger.info(f"Seeded {len(textbooks)} official Karnataka SSLC Class 10 textbooks.")

    # 2. Previous Year Question Papers (2020 - 2024)
    pyq_papers = [
        {
            "id": "pyq-math-2024",
            "title": "Karnataka SSLC Annual Examination March/April 2024",
            "subject": "Mathematics",
            "year": 2024,
            "exam_type": "Annual Main Exam",
            "total_marks": 80,
            "duration_hours": 3.0,
            "pdf_url": "https://kseab.karnataka.gov.in/storage/pdf-files/SSLC_2024_Maths_EM.pdf",
            "download_allowed": True,
            "solution_available": True
        },
        {
            "id": "pyq-sci-2024",
            "title": "Karnataka SSLC Annual Examination March/April 2024",
            "subject": "Science",
            "year": 2024,
            "exam_type": "Annual Main Exam",
            "total_marks": 80,
            "duration_hours": 3.0,
            "pdf_url": "https://kseab.karnataka.gov.in/storage/pdf-files/SSLC_2024_Science_EM.pdf",
            "download_allowed": True,
            "solution_available": True
        },
        {
            "id": "pyq-soc-2024",
            "title": "Karnataka SSLC Annual Examination March/April 2024",
            "subject": "Social Science",
            "year": 2024,
            "exam_type": "Annual Main Exam",
            "total_marks": 80,
            "duration_hours": 3.0,
            "pdf_url": "https://kseab.karnataka.gov.in/storage/pdf-files/SSLC_2024_Social_EM.pdf",
            "download_allowed": True,
            "solution_available": True
        },
        {
            "id": "pyq-kan-2024",
            "title": "Karnataka SSLC Annual Examination March/April 2024",
            "subject": "Kannada",
            "year": 2024,
            "exam_type": "Annual Main Exam",
            "total_marks": 100,
            "duration_hours": 3.0,
            "pdf_url": "https://kseab.karnataka.gov.in/storage/pdf-files/SSLC_2024_Kannada_FL.pdf",
            "download_allowed": True,
            "solution_available": True
        },
        {
            "id": "pyq-eng-2024",
            "title": "Karnataka SSLC Annual Examination March/April 2024",
            "subject": "English",
            "year": 2024,
            "exam_type": "Annual Main Exam",
            "total_marks": 80,
            "duration_hours": 3.0,
            "pdf_url": "https://kseab.karnataka.gov.in/storage/pdf-files/SSLC_2024_English_SL.pdf",
            "download_allowed": True,
            "solution_available": True
        },
        {
            "id": "pyq-math-2023",
            "title": "Karnataka SSLC Annual Examination March/April 2023",
            "subject": "Mathematics",
            "year": 2023,
            "exam_type": "Annual Main Exam",
            "total_marks": 80,
            "duration_hours": 3.0,
            "pdf_url": "https://kseab.karnataka.gov.in/storage/pdf-files/SSLC_2023_Maths_EM.pdf",
            "download_allowed": True,
            "solution_available": True
        },
        {
            "id": "pyq-sci-2023",
            "title": "Karnataka SSLC Annual Examination March/April 2023",
            "subject": "Science",
            "year": 2023,
            "exam_type": "Annual Main Exam",
            "total_marks": 80,
            "duration_hours": 3.0,
            "pdf_url": "https://kseab.karnataka.gov.in/storage/pdf-files/SSLC_2023_Science_EM.pdf",
            "download_allowed": True,
            "solution_available": True
        },
        {
            "id": "pyq-math-2022",
            "title": "Karnataka SSLC Annual Examination March/April 2022",
            "subject": "Mathematics",
            "year": 2022,
            "exam_type": "Annual Main Exam",
            "total_marks": 80,
            "duration_hours": 3.0,
            "pdf_url": "https://kseab.karnataka.gov.in/storage/pdf-files/SSLC_2022_Maths_EM.pdf",
            "download_allowed": True,
            "solution_available": True
        },
        {
            "id": "pyq-sci-2022",
            "title": "Karnataka SSLC Annual Examination March/April 2022",
            "subject": "Science",
            "year": 2022,
            "exam_type": "Annual Main Exam",
            "total_marks": 80,
            "duration_hours": 3.0,
            "pdf_url": "https://kseab.karnataka.gov.in/storage/pdf-files/SSLC_2022_Science_EM.pdf",
            "download_allowed": True,
            "solution_available": True
        },
        {
            "id": "pyq-math-2021",
            "title": "Karnataka SSLC State Board Examination 2021 (Special OMR Pattern)",
            "subject": "Mathematics",
            "year": 2021,
            "exam_type": "Annual Main Exam",
            "total_marks": 40,
            "duration_hours": 1.5,
            "pdf_url": "https://kseab.karnataka.gov.in/storage/pdf-files/SSLC_2021_Maths.pdf",
            "download_allowed": True,
            "solution_available": True
        },
        {
            "id": "pyq-math-2020",
            "title": "Karnataka SSLC Annual Examination June 2020",
            "subject": "Mathematics",
            "year": 2020,
            "exam_type": "Annual Main Exam",
            "total_marks": 80,
            "duration_hours": 3.0,
            "pdf_url": "https://kseab.karnataka.gov.in/storage/pdf-files/SSLC_2020_Maths_EM.pdf",
            "download_allowed": True,
            "solution_available": True
        }
    ]

    qp_col = db_manager.get_collection("question_papers")
    for qp in pyq_papers:
        qp_col.insert_one(qp)
    logger.info(f"Seeded {len(pyq_papers)} previous year SSLC question papers (2020-2024).")

    # 3. Chapter-Wise Revision Notes & Formula Sheets
    notes = [
        {
            "id": "note-math-ch10",
            "subject": "Mathematics",
            "chapter_no": 10,
            "chapter_title": "Quadratic Equations",
            "summary": "Covers standard form ax² + bx + c = 0, methods of finding roots (factorization, completing the square, quadratic formula), and nature of roots via discriminant D = b² - 4ac.",
            "important_points": [
                "Standard Form: ax² + bx + c = 0 where a ≠ 0",
                "Quadratic Formula: x = (-b ± √(b² - 4ac)) / (2a)",
                "Discriminant Δ = b² - 4ac determines root nature",
                "If Δ > 0: Two distinct real roots",
                "If Δ = 0: Two equal real roots (-b / 2a)",
                "If Δ < 0: No real roots exist"
            ],
            "formulae_or_terms": [
                "x = (-b ± √(b² - 4ac)) / 2a",
                "Δ = b² - 4ac",
                "Sum of roots α + β = -b / a",
                "Product of roots α · β = c / a"
            ],
            "model_qa": [
                {
                    "q": "Find the discriminant of 2x² - 4x + 3 = 0 and describe the nature of roots.",
                    "a": "Here a = 2, b = -4, c = 3. Δ = b² - 4ac = (-4)² - 4(2)(3) = 16 - 24 = -8. Since Δ < 0, there are no real roots."
                },
                {
                    "q": "Find the value of k for which 2x² + kx + 3 = 0 has two equal roots.",
                    "a": "For equal roots, Δ = 0 => k² - 4(2)(3) = 0 => k² - 24 = 0 => k = ±√24 = ±2√6."
                }
            ],
            "pdf_url": "https://edunexa.ai/materials/notes/SSLC_Class10_Maths_Ch10_Notes.pdf"
        },
        {
            "id": "note-sci-ch12",
            "subject": "Science",
            "chapter_no": 12,
            "chapter_title": "Electricity",
            "summary": "Electric current, potential difference, Ohm's law, factors on which resistance depends, series and parallel circuits, heating effect of electric current, and electric power.",
            "important_points": [
                "Current I = Q / t (Ampere, A)",
                "Potential Difference V = W / Q (Volt, V)",
                "Ohm's Law: V = I × R at constant temperature",
                "Resistance R = ρ × (l / A)",
                "Series: Rs = R1 + R2 + R3",
                "Parallel: 1/Rp = 1/R1 + 1/R2 + 1/R3",
                "Joule's Law of Heating: H = I²Rt",
                "Electric Power: P = VI = I²R = V²/R"
            ],
            "formulae_or_terms": [
                "V = IR",
                "R = ρ(l/A)",
                "Rs = R1 + R2",
                "1/Rp = 1/R1 + 1/R2",
                "H = I²Rt",
                "1 kWh = 3.6 × 10⁶ Joules"
            ],
            "model_qa": [
                {
                    "q": "Why is parallel arrangement used in domestic electrical circuits rather than series?",
                    "a": "1. Each appliance gets the full line voltage (220V). 2. If one appliance fails, others continue working. 3. Each appliance can have an independent on/off switch. 4. Total resistance decreases, ensuring sufficient current."
                }
            ],
            "pdf_url": "https://edunexa.ai/materials/notes/SSLC_Class10_Science_Ch12_Notes.pdf"
        },
        {
            "id": "note-math-ch1",
            "subject": "Mathematics",
            "chapter_no": 1,
            "chapter_title": "Arithmetic Progressions",
            "summary": "Arithmetic Progression definition, common difference d, nth term formula an = a + (n-1)d, and sum of first n terms Sn = n/2 [2a + (n-1)d].",
            "important_points": [
                "AP general form: a, a+d, a+2d, a+3d...",
                "Common difference d = a2 - a1 = a3 - a2",
                "nth term: an = a + (n - 1)d",
                "Sum formula: Sn = n/2 [2a + (n - 1)d] or Sn = n/2 [a + l]"
            ],
            "formulae_or_terms": [
                "an = a + (n-1)d",
                "Sn = (n/2)[2a + (n-1)d]",
                "Sn = (n/2)[a + an]"
            ],
            "model_qa": [
                {
                    "q": "Find the 20th term of the AP: 3, 8, 13, 18...",
                    "a": "Here a = 3, d = 8 - 3 = 5, n = 20. a20 = a + 19d = 3 + 19(5) = 3 + 95 = 98."
                }
            ],
            "pdf_url": "https://edunexa.ai/materials/notes/SSLC_Class10_Maths_Ch1_Notes.pdf"
        }
    ]

    notes_col = db_manager.get_collection("notes")
    for n in notes:
        notes_col.insert_one(n)
    logger.info(f"Seeded {len(notes)} chapter-wise revision notes.")

    # 4. Model Papers
    model_papers = [
        {
            "id": "mod-math-2025",
            "type": "MODEL_QUESTION_PAPER",
            "title": "KSEAB Official Model Paper 2024-2025 with Blueprint",
            "subject": "Mathematics",
            "year": 2025,
            "marks": 80,
            "duration": "3 Hours 15 Minutes",
            "pdf_url": "https://kseab.karnataka.gov.in/model_papers/maths_2025_em.pdf",
            "blueprint_summary": "16 MCQs (1 mark), 8 1-mark VSA, 8 2-mark SA, 9 3-mark LA-1, 4 4-mark LA-2, 1 5-mark LA-3 (Total 38 questions)."
        },
        {
            "id": "mod-sci-2025",
            "type": "MODEL_QUESTION_PAPER",
            "title": "KSEAB Official Model Paper 2024-2025 with Blueprint",
            "subject": "Science",
            "year": 2025,
            "marks": 80,
            "duration": "3 Hours 15 Minutes",
            "pdf_url": "https://kseab.karnataka.gov.in/model_papers/science_2025_em.pdf",
            "blueprint_summary": "Physics (28 marks), Chemistry (25 marks), Biology (27 marks). High weightage on Electricity, Chemical Reactions, Life Processes."
        }
    ]

    mat_col = db_manager.get_collection("learning_materials")
    for m in model_papers:
        mat_col.insert_one(m)
    logger.info(f"Seeded {len(model_papers)} KSEAB official model question papers.")

    logger.info("Database seeding completed successfully for Karnataka SSLC Class 10!")

if __name__ == "__main__":
    seed()
