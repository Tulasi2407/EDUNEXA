from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from backend.app.database.mongodb import db_manager

router = APIRouter(prefix="/study-materials", tags=["Study Materials"])

@router.get("/textbooks")
def get_textbooks(subject: Optional[str] = None):
    col = db_manager.get_collection("textbooks")
    query = {}
    if subject:
        query["subject"] = subject
    results = col.find(query)
    # Strip MongoDB _id for JSON serialization
    for r in results:
        r["_id"] = str(r["_id"])
    return results

@router.get("/previous-year-papers")
def get_pyq_papers(subject: Optional[str] = None, year: Optional[int] = None):
    col = db_manager.get_collection("question_papers")
    query = {}
    if subject:
        query["subject"] = subject
    if year:
        query["year"] = year
    results = col.find(query)
    for r in results:
        r["_id"] = str(r["_id"])
    return results

@router.get("/notes")
def get_chapter_notes(subject: Optional[str] = None, chapter: Optional[str] = None):
    col = db_manager.get_collection("notes")
    query = {}
    if subject:
        query["subject"] = subject
    if chapter:
        query["chapter_title"] = chapter
    results = col.find(query)
    for r in results:
        r["_id"] = str(r["_id"])
    return results

@router.get("/model-papers")
def get_model_papers(subject: Optional[str] = None):
    col = db_manager.get_collection("learning_materials")
    query = {"type": "MODEL_QUESTION_PAPER"}
    if subject:
        query["subject"] = subject
    results = col.find(query)
    for r in results:
        r["_id"] = str(r["_id"])
    return results
