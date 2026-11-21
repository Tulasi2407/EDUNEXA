import uuid
from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query
from backend.app.schemas.models import LearningGapItem, DiagnosticRequest
from backend.app.database.mongodb import db_manager

router = APIRouter(prefix="/learning-gaps", tags=["Learning Gaps Engine"])

@router.get("/")
def get_learning_gaps(student_id: Optional[str] = "student-10-alex"):
    col = db_manager.get_collection("learning_gaps")
    results = col.find({"student_id": student_id}) if student_id else col.find()
    
    # If empty, return standard Karnataka SSLC Class 10 gaps
    if not results:
        default_gaps = [
            {
                "id": "gap-sslc-01",
                "student_id": "student-10-alex",
                "subject": "Mathematics",
                "chapter": "Quadratic Equations",
                "topic": "Completing the Square & Discriminant Nature of Roots",
                "performance_score": 34,
                "severity": "CRITICAL",
                "identified_gap": "Struggles to determine root nature using b² - 4ac and sign conversions",
                "prerequisite_weakness": "Splitting the Middle Term & Algebraic Identities (Class 9)",
                "evidence": "Scored 1/5 on discriminant calculation in Unit Test 2; repeated sign mistakes",
                "recommended_sequence": [
                    "Review (a+b)² and (a-b)² expansion",
                    "Master factoring quadratic polynomials",
                    "Understand b²-4ac cases (>0, =0, <0)",
                    "Solve 5 Karnataka SSLC standard discriminant drill problems"
                ],
                "status": "PENDING",
                "detected_date": "2026-11-18"
            },
            {
                "id": "gap-sslc-02",
                "student_id": "student-10-alex",
                "subject": "Science",
                "chapter": "Electricity",
                "topic": "Series and Parallel Resistor Combinations & Joule's Heating Law",
                "performance_score": 42,
                "severity": "CRITICAL",
                "identified_gap": "Confuses inverse addition in parallel circuits (1/Rp = 1/R1 + 1/R2) with direct addition",
                "prerequisite_weakness": "Ohm's Law (V=IR) ratio intuition and reciprocal addition of fractions",
                "evidence": "Mistake in 3-mark circuit question in Midterm Exam; added resistors directly in parallel branch",
                "recommended_sequence": [
                    "Hands-on analogy: Water pipes in parallel vs single pipe",
                    "Derive equivalent resistance formulas mathematically",
                    "Solve 3 circuit numericals from SSLC 2023 Board Paper"
                ],
                "status": "IN_PROGRESS",
                "detected_date": "2026-11-19"
            },
            {
                "id": "gap-sslc-03",
                "student_id": "student-10-alex",
                "subject": "Mathematics",
                "chapter": "Trigonometry",
                "topic": "Trigonometric Identities (sin²θ + cos²θ = 1) and Applications",
                "performance_score": 58,
                "severity": "MODERATE",
                "identified_gap": "Slow algebraic manipulation when proving standard 4-mark identity questions",
                "prerequisite_weakness": "Pythagoras Theorem & Right-Angled Triangle ratios (Class 9)",
                "evidence": "Time ran out during Model Exam Section D proving identity",
                "recommended_sequence": [
                    "Memorize the 3 core Pythagorean identities",
                    "Convert everything into sinθ and cosθ as a golden strategy",
                    "Practice 4 standard KSEAB proof templates"
                ],
                "status": "PENDING",
                "detected_date": "2026-11-20"
            }
        ]
        return default_gaps

    for r in results:
        r["_id"] = str(r.get("_id", ""))
    return results

@router.post("/diagnostic")
def run_diagnostic_analysis(req: DiagnosticRequest):
    """Diagnoses root cause gaps based on topic scores in Karnataka SSLC Class 10."""
    gaps_found = []
    
    # Prerequisite Root-Cause Knowledge Graph for SSLC Class 10
    knowledge_graph = {
        "Quadratic Equations": {
            "prerequisite": "Splitting Middle Term & Algebraic Identities (Class 9)",
            "severity_threshold": 60,
            "gap_name": "Discriminant analysis and quadratic formula derivation",
            "evidence": "Score under 60% indicates foundational weakness in factorizing expressions",
            "sequence": ["Identity revision", "Factorization drill", "Quadratic formula mastery"]
        },
        "Electricity": {
            "prerequisite": "Electric Potential difference and fractional arithmetic",
            "severity_threshold": 60,
            "gap_name": "Parallel resistor equivalence & Ohm's Law circuit problems",
            "evidence": "Inability to decouple voltage drop across parallel branches",
            "sequence": ["Current flow fundamentals", "Ohm's law verification", "Equivalent resistance circuits"]
        },
        "Trigonometry": {
            "prerequisite": "Similar Triangles & Right Triangle Ratios (Class 9)",
            "severity_threshold": 65,
            "gap_name": "Identity proofs & angle of elevation/depression word problems",
            "evidence": "Struggles to form trigonometric equations from height and distance word problems",
            "sequence": ["Ratio definitions", "Standard angles table (0-90°)", "Application problem diagrams"]
        },
        "Life Processes": {
            "prerequisite": "Cellular respiration & organ system anatomy (Class 9)",
            "severity_threshold": 60,
            "gap_name": "Nephron structure and double circulation pathway",
            "evidence": "Missing directional arrows in circulatory system diagram and filtration mechanics",
            "sequence": ["Heart chamber labeling", "Nephron urine formation steps", "5-mark diagram practice"]
        }
    }

    col = db_manager.get_collection("learning_gaps")

    for topic, score in req.test_scores.items():
        if score < 70 and topic in knowledge_graph:
            kg_info = knowledge_graph[topic]
            severity = "CRITICAL" if score < 45 else ("MODERATE" if score < 65 else "MILD")
            gap_doc = {
                "id": f"gap-{uuid.uuid4().hex[:6]}",
                "student_id": req.student_id,
                "subject": req.subject,
                "chapter": topic,
                "topic": kg_info["gap_name"],
                "performance_score": score,
                "severity": severity,
                "identified_gap": f"Below target mastery in {topic} ({score}%)",
                "prerequisite_weakness": kg_info["prerequisite"],
                "evidence": kg_info["evidence"],
                "recommended_sequence": kg_info["sequence"],
                "status": "PENDING",
                "detected_date": datetime.utcnow().strftime("%Y-%m-%d")
            }
            col.insert_one(gap_doc)
            gaps_found.append(gap_doc)

    return {
        "success": True,
        "gaps_count": len(gaps_found),
        "gaps": gaps_found,
        "actionable_insight": "Root-cause diagnostics mapped. High-priority remediation plans generated."
    }

@router.post("/{gap_id}/resolve")
def resolve_learning_gap(gap_id: str):
    col = db_manager.get_collection("learning_gaps")
    success = col.update_one({"id": gap_id}, {"$set": {"status": "RESOLVED"}})
    return {"success": True, "gap_id": gap_id, "status": "RESOLVED"}
