import os
import logging
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
from backend.app.core.config import settings

logger = logging.getLogger("edunexa_db")

class InMemoryCollection:
    """High-fidelity in-memory MongoDB collection fallback for offline/demo scenarios."""
    def __init__(self, name):
        self.name = name
        self.docs = []

    def insert_one(self, doc):
        if "_id" not in doc:
            import uuid
            doc["_id"] = str(uuid.uuid4())
        self.docs.append(doc)
        class InsertResult:
            def __init__(self, inserted_id):
                self.inserted_id = inserted_id
        return InsertResult(doc["_id"])

    def insert_many(self, docs):
        for d in docs:
            self.insert_one(d)
        return docs

    def find(self, query=None):
        query = query or {}
        results = []
        for d in self.docs:
            match = True
            for k, v in query.items():
                if d.get(k) != v:
                    match = False
                    break
            if match:
                results.append(d)
        return results

    def find_one(self, query=None):
        res = self.find(query)
        return res[0] if res else None

    def update_one(self, query, update):
        doc = self.find_one(query)
        if doc and "$set" in update:
            doc.update(update["$set"])
            return True
        return False

    def count_documents(self, query=None):
        return len(self.find(query))


class MongoDBManager:
    def __init__(self):
        self.client = None
        self.db = None
        self.is_connected = False
        self.in_memory_db = {}
        self.collection_names = [
            "users", "student_profiles", "teacher_profiles", "parent_profiles",
            "parent_student_links", "classes", "subjects", "chapters", "topics",
            "learning_materials", "textbooks", "question_papers", "notes",
            "questions", "assessments", "assessment_attempts", "learning_gaps",
            "root_cause_analysis", "study_plans", "study_tasks", "attendance",
            "examinations", "examination_results", "assignments", "submissions",
            "ai_chat_sessions", "ai_chat_messages", "learning_progress",
            "notifications", "announcements", "achievements"
        ]

    def connect(self):
        try:
            logger.info(f"Connecting to MongoDB Atlas at {settings.MONGODB_URI}...")
            # Short timeout to detect if Atlas is reachable without blocking
            self.client = MongoClient(settings.MONGODB_URI, serverSelectionTimeoutMS=2000)
            self.client.admin.command('ping')
            self.db = self.client[settings.DATABASE_NAME]
            self.is_connected = True
            logger.info("Successfully connected to MongoDB Atlas database: edunexa_ai")
        except (ConnectionFailure, ServerSelectionTimeoutError, Exception) as e:
            logger.warning(f"MongoDB Atlas connection unconfirmed ({e}). Initializing resilient in-memory local fallback store.")
            self.is_connected = False
            for col in self.collection_names:
                self.in_memory_db[col] = InMemoryCollection(col)

    def get_collection(self, name: str):
        if self.is_connected and self.db is not None:
            return self.db[name]
        if name not in self.in_memory_db:
            self.in_memory_db[name] = InMemoryCollection(name)
        return self.in_memory_db[name]

db_manager = MongoDBManager()
