import uuid
from datetime import datetime, timezone
from typing import List, Optional
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from backend.app.database.mongodb import db_manager
from backend.app.services.gemini_service import gemini_service
from backend.app.core.dependencies import get_optional_current_user

router = APIRouter(prefix="/study-planner", tags=["Smart Study Planner"])

class StudyPlanRequest(BaseModel):
    student_id: Optional[str] = "student-10-alex"
    daily_hours: float = 3.0
    exam_date: str = "2026-12-05"
    weak_subjects: Optional[List[str]] = ["Mathematics", "Science"]
    strong_subjects: Optional[List[str]] = ["English", "Social Science"]

@router.get("/")
def get_study_plan(
    student_id: Optional[str] = "student-10-alex",
    current_user: Optional[dict] = Depends(get_optional_current_user)
):
    """Retrieves the active study plan from MongoDB Atlas."""
    active_student_id = student_id
    if current_user and current_user.get("role") == "STUDENT":
        active_student_id = current_user.get("id")

    col = db_manager.get_collection("study_plans")
    plan = col.find_one({"student_id": active_student_id})
    if plan:
        plan["_id"] = str(plan.get("_id", ""))
        return plan

    # Default starter plan if none generated yet
    return {
        "id": "plan-default",
        "title": "Karnataka SSLC Class 10 Foundation Plan",
        "weeklyTargetHours": 21.0,
        "completedHours": 0.0,
        "dailyGoalHours": 3.0,
        "examDate": "2026-12-05",
        "tasks": []
    }

@router.post("/generate")
async def generate_plan(
    req: StudyPlanRequest,
    current_user: Optional[dict] = Depends(get_optional_current_user)
):
    """
    Generates a personalized study plan using Gemini AI, allocating high-priority slots
    to detected prerequisite gaps, and persists it to MongoDB Atlas.
    """
    student_id = req.student_id or (current_user.get("id") if current_user else "student-10-alex")

    plan_result = await gemini_service.generate_study_plan(
        daily_hours=req.daily_hours,
        exam_date=req.exam_date,
        weak_subjects=req.weak_subjects or ["Mathematics", "Science"],
        strong_subjects=req.strong_subjects or ["English"]
    )

    plan_doc = {
        "id": f"plan-{uuid.uuid4().hex[:8]}",
        "student_id": student_id,
        "title": f"AI Prerequisite Remediation Timetable ({req.daily_hours}h/day)",
        "weeklyTargetHours": plan_result["weeklyTargetHours"],
        "completedHours": 0.0,
        "dailyGoalHours": plan_result["dailyGoalHours"],
        "examDate": req.exam_date,
        "tasks": plan_result["tasks"],
        "updated_at": datetime.now(timezone.utc).isoformat()
    }

    col = db_manager.get_collection("study_plans")
    # Upsert plan for student
    col.update_one({"student_id": student_id}, {"$set": plan_doc}, upsert=True)
    plan_doc["_id"] = str(plan_doc.get("_id", ""))

    return {
        "success": True,
        "plan": plan_doc
    }
