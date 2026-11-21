from typing import List, Optional, Dict, Any
from pydantic import BaseModel, EmailStr, Field

class UserRegister(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr
    password: str = Field(..., min_length=6)
    role: str = "STUDENT"  # STUDENT, TEACHER, PARENT, ADMIN
    grade: str = "Class 10"
    board: str = "Karnataka State Board"
    preferred_language: str = "English"  # English, Kannada, Hindi
    section: Optional[str] = "Section A"
    phone: Optional[str] = None
    student_id_to_link: Optional[str] = None
    specialization: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str
    role: Optional[str] = "STUDENT"

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str
    grade: str
    board: str
    preferred_language: str
    avatar: str

class TextbookItem(BaseModel):
    id: str
    title: str
    subject: str
    medium: str
    academic_year: str
    total_chapters: int
    pdf_url: str
    file_size: str
    thumbnail: str
    download_allowed: bool = True
    chapters: Optional[List[Dict[str, Any]]] = []

class QuestionPaperItem(BaseModel):
    id: str
    title: str
    subject: str
    year: int
    exam_type: str  # Annual Main Exam, Supplementary Exam, Model Exam
    total_marks: int
    duration_hours: float
    pdf_url: str
    download_allowed: bool = True
    solution_available: bool = True

class ChapterNote(BaseModel):
    id: str
    subject: str
    chapter_no: int
    chapter_title: str
    summary: str
    important_points: List[str]
    formulae_or_terms: List[str]
    model_qa: List[Dict[str, str]]
    pdf_url: Optional[str] = None

class LearningGapItem(BaseModel):
    id: str
    student_id: str
    subject: str
    chapter: str
    topic: str
    performance_score: int
    severity: str  # CRITICAL, MODERATE, MILD
    identified_gap: str
    prerequisite_weakness: str
    evidence: str
    recommended_sequence: List[str]
    status: str  # PENDING, IN_PROGRESS, RESOLVED
    detected_date: str

class DiagnosticRequest(BaseModel):
    student_id: str
    subject: str
    test_scores: Dict[str, int]  # topic -> percentage

class AIChatRequest(BaseModel):
    message: str
    subject: Optional[str] = "General"
    mode: Optional[str] = "simple"  # simple, real_life, step_by_step, analogy, summary
    language: Optional[str] = "English"  # English, Kannada, Hindi
    student_id: Optional[str] = "student-10-alex"

class AIChatResponse(BaseModel):
    reply: str
    mode: str
    language: str
    suggested_followups: List[str]
    karnataka_curriculum_reference: Optional[str] = None

class StudyPlanGenerateRequest(BaseModel):
    student_id: str
    daily_available_hours: float = 3.5
    school_start_time: str = "08:00 AM"
    school_end_time: str = "03:30 PM"
    sleep_time: str = "10:30 PM"
    wake_time: str = "06:00 AM"
    target_subjects: List[str] = ["Mathematics", "Science", "Social Science"]
    preferred_language: str = "English"
