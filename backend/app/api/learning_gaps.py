import uuid
from datetime import datetime, timezone
from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query, Depends
from pydantic import BaseModel
from backend.app.schemas.models import LearningGapItem
from backend.app.database.mongodb import db_manager
from backend.app.services.gemini_service import gemini_service
from backend.app.core.dependencies import get_optional_current_user

router = APIRouter(prefix="/learning-gaps", tags=["Learning Gaps Engine"])

class DiagnosticQuizItem(BaseModel):
    question: str
    studentAnswer: str
    correctAnswer: str
    isCorrect: bool
    topic: str
    prerequisite: Optional[str] = None

class FullDiagnosticRequest(BaseModel):
    subject: str
    chapter: str
    student_id: Optional[str] = "student-10-alex"
    responses: List[DiagnosticQuizItem]

@router.get("/")
def get_learning_gaps(
    student_id: Optional[str] = "student-10-alex",
    current_user: Optional[dict] = Depends(get_optional_current_user)
):
    """Retrieves learning gaps from MongoDB Atlas for the specified or current student."""
    col = db_manager.get_collection("learning_gaps")
    active_student_id = student_id
    if current_user and current_user.get("role") == "STUDENT":
        active_student_id = current_user.get("id")

    results = list(col.find({"student_id": active_student_id})) if active_student_id else list(col.find())
    
    # Clean MongoDB _id
    for r in results:
        r["_id"] = str(r.get("_id", ""))

    return results

@router.post("/diagnostic")
async def run_diagnostic_analysis(
    req: FullDiagnosticRequest,
    current_user: Optional[dict] = Depends(get_optional_current_user)
):
    """
    Analyzes quiz responses using Gemini AI, detects root cause prerequisite weaknesses,
    and persists identified learning gaps into MongoDB Atlas.
    """
    student_id = req.student_id or (current_user.get("id") if current_user else "student-10-alex")
    
    # Run analysis through Gemini AI service
    analysis_result = await gemini_service.diagnose_learning_gaps(
        subject=req.subject,
        chapter=req.chapter,
        quiz_responses=[r.model_dump() for r in req.responses]
    )

    gaps_col = db_manager.get_collection("learning_gaps")
    persisted_gaps = []

    for wt in analysis_result.get("weakTopics", []):
        gap_id = f"gap-{uuid.uuid4().hex[:8]}"
        doc = {
            "id": gap_id,
            "student_id": student_id,
            "subject": req.subject,
            "chapter": req.chapter,
            "topic": wt.get("topic", "Foundational Concept"),
            "performanceScore": wt.get("accuracyScore", 40),
            "severity": wt.get("severity", "CRITICAL"),
            "identifiedGap": wt.get("identifiedGap", "Prerequisite deficiency detected"),
            "prerequisiteWeakness": wt.get("prerequisiteWeakness", "Basic arithmetic conventions"),
            "evidence": wt.get("evidence", "Diagnostic error evidence cited"),
            "recommendedSequence": wt.get("revisionSteps", [
                "Review foundational definition",
                "Practice 3 guided sub-problems",
                "Complete 5-question mastery checkpoint",
                "Discuss with Nexa AI Tutor"
            ]),
            "status": "PENDING",
            "detectedDate": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        gaps_col.insert_one(doc)
        db_manager.mirror_to_local_file("learning_gaps", doc)
        doc["_id"] = str(doc.get("_id", ""))
        persisted_gaps.append(doc)

    return {
        "success": True,
        "overallDiagnosis": analysis_result.get("overallDiagnosis", "Prerequisite gaps identified."),
        "recommendedFocus": analysis_result.get("recommendedFocus", "Remediate prerequisite blockers before moving ahead."),
        "weakTopics": analysis_result.get("weakTopics", []),
        "persisted_gaps": persisted_gaps
    }

@router.post("/{gap_id}/resolve")
def resolve_learning_gap(gap_id: str):
    """Marks a learning gap as RESOLVED in MongoDB Atlas."""
    col = db_manager.get_collection("learning_gaps")
    result = col.update_one({"id": gap_id}, {"$set": {"status": "RESOLVED", "resolved_at": datetime.now(timezone.utc).isoformat()}})
    return {
        "success": True,
        "gap_id": gap_id,
        "status": "RESOLVED",
        "updated": result.modified_count > 0
    }
