from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
from backend.app.database.mongodb import db_manager

router = APIRouter(prefix="/study-materials", tags=["Study Materials"])

@router.get("/textbooks")
def get_textbooks(subject: Optional[str] = None):
    col = db_manager.get_collection("textbooks")
    query = {}
    if subject and subject.upper() != "ALL":
        query["subject"] = subject
    results = list(col.find(query))
    for r in results:
        r["_id"] = str(r.get("_id", ""))
    return results

@router.get("/pyqs")
@router.get("/previous-year-papers")
def get_pyq_papers(subject: Optional[str] = None, year: Optional[int] = None):
    col = db_manager.get_collection("question_papers")
    query = {}
    if subject and subject.upper() != "ALL":
        query["subject"] = subject
    if year:
        query["year"] = int(year)
    results = list(col.find(query))
    for r in results:
        r["_id"] = str(r.get("_id", ""))
    return results

@router.get("/notes")
def get_chapter_notes(subject: Optional[str] = None, chapter: Optional[str] = None):
    col = db_manager.get_collection("notes")
    query = {}
    if subject and subject.upper() != "ALL":
        query["subject"] = subject
    if chapter:
        query["chapter_title"] = chapter
    results = list(col.find(query))
    for r in results:
        r["_id"] = str(r.get("_id", ""))
    return results

@router.get("/model-papers")
def get_model_papers(subject: Optional[str] = None):
    col = db_manager.get_collection("learning_materials")
    query = {"type": "MODEL_QUESTION_PAPER"}
    if subject and subject.upper() != "ALL":
        query["subject"] = subject
    results = list(col.find(query))
    for r in results:
        r["_id"] = str(r.get("_id", ""))
    return results
