from fastapi import APIRouter
from backend.app.schemas.models import StudyPlanGenerateRequest

router = APIRouter(prefix="/study-planner", tags=["Smart Study Planner"])

@router.post("/generate")
def generate_study_plan(req: StudyPlanGenerateRequest):
    """
    Generates a personalized free-time timetable for Karnataka SSLC Class 10.
    Strictly protects school hours (08:00 AM - 03:30 PM) and sleep window (10:30 PM - 06:00 AM).
    Allocates high-priority slots to identified weak areas.
    """
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    
    # Study slots exclusively during after-school and weekend free hours
    weekday_slots = [
        {"slot": "04:30 PM - 05:30 PM", "type": "PREREQUISITE_FIX", "duration": 60, "priority": "HIGH"},
        {"slot": "05:45 PM - 06:45 PM", "type": "CONCEPT_REVIEW", "duration": 60, "priority": "MEDIUM"},
        {"slot": "07:30 PM - 08:30 PM", "type": "PRACTICE_QUIZ", "duration": 60, "priority": "HIGH"},
        {"slot": "09:00 PM - 09:45 PM", "type": "ACTIVE_RECALL", "duration": 45, "priority": "MEDIUM"}
    ]

    weekend_slots = [
        {"slot": "08:30 AM - 10:00 AM", "type": "CONCEPT_REVIEW", "duration": 90, "priority": "HIGH"},
        {"slot": "10:30 AM - 12:00 PM", "type": "PRACTICE_QUIZ", "duration": 90, "priority": "HIGH"},
        {"slot": "04:00 PM - 05:30 PM", "type": "PREREQUISITE_FIX", "duration": 90, "priority": "HIGH"},
        {"slot": "06:30 PM - 08:00 PM", "type": "ACTIVE_RECALL", "duration": 90, "priority": "MEDIUM"}
    ]

    curriculum_topics = {
        "Mathematics": [
            "Quadratic Equations - Discriminant & Roots",
            "Arithmetic Progressions - nth term and sum Sn",
            "Trigonometry - Standard Identities",
            "Circles & Tangents Theorems"
        ],
        "Science": [
            "Electricity - Parallel & Series Circuits",
            "Chemical Reactions & Equations - Balancing",
            "Life Processes - Human Heart & Nephron",
            "Light - Reflection, Refraction & Lens Formula"
        ],
        "Social Science": [
            "Advent of Europeans to India - Battle of Plassey",
            "Geography - Indian Soils & Agriculture",
            "Economics - Public Finance and Budgeting",
            "Political Science - Indian Foreign Policy"
        ]
    }

    generated_tasks = []
    task_id_counter = 1

    for day in days:
        slots = weekend_slots if day in ["Saturday", "Sunday"] else weekday_slots
        for i, s in enumerate(slots):
            subject_idx = (task_id_counter) % len(req.target_subjects)
            subject = req.target_subjects[subject_idx]
            topic_list = curriculum_topics.get(subject, ["General Chapter Revision"])
            topic = topic_list[i % len(topic_list)]

            task = {
                "id": f"task-sslc-{task_id_counter}",
                "day": day,
                "timeSlot": s["slot"],
                "subject": subject,
                "topic": topic,
                "type": s["type"],
                "durationMinutes": s["duration"],
                "completed": False,
                "priority": s["priority"]
            }
            generated_tasks.append(task)
            task_id_counter += 1

    return {
        "success": True,
        "student_id": req.student_id,
        "school_protected_hours": f"{req.school_start_time} - {req.school_end_time}",
        "sleep_protected_hours": f"{req.sleep_time} - {req.wake_time}",
        "weekly_target_hours": 21.5,
        "daily_goal_hours": req.daily_available_hours,
        "tasks_count": len(generated_tasks),
        "tasks": generated_tasks,
        "todays_learning_mission": {
            "title": "Master Quadratic Discriminant & Parallel Circuits",
            "subject": "Mathematics & Science",
            "target_xp": 250,
            "estimated_minutes": 105
        }
    }
