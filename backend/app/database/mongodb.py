import os
import json
import logging
from typing import Dict, Any, List, Optional
from pymongo import MongoClient, ASCENDING
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError, OperationFailure
from backend.app.core.config import settings

logger = logging.getLogger("edunexa_db")

LOCAL_DB_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../data/db"))

class InMemoryCollection:
    """Local JSON-backed persistent collection used as robust offline store."""
    def __init__(self, name: str):
        self.name = name
        self.file_path = os.path.join(LOCAL_DB_DIR, f"{name}.json")
        self.docs: List[Dict[str, Any]] = self._load()

    def _load(self) -> List[Dict[str, Any]]:
        if os.path.exists(self.file_path):
            try:
                with open(self.file_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    if isinstance(data, list):
                        return data
            except Exception as e:
                logger.debug(f"Note loading local file {self.file_path}: {e}")
        return []

    def _save(self):
        try:
            os.makedirs(LOCAL_DB_DIR, exist_ok=True)
            with open(self.file_path, "w", encoding="utf-8") as f:
                json.dump(self.docs, f, indent=2, ensure_ascii=False)
        except Exception as e:
            logger.warning(f"Failed to persist collection {self.name} to {self.file_path}: {e}")

    def insert_one(self, doc: Dict[str, Any]):
        if "_id" not in doc:
            import uuid
            doc["_id"] = str(uuid.uuid4())
        self.docs.append(doc)
        self._save()
        class InsertResult:
            def __init__(self, inserted_id):
                self.inserted_id = inserted_id
        return InsertResult(doc["_id"])

    def insert_many(self, docs: List[Dict[str, Any]]):
        for d in docs:
            if "_id" not in d:
                import uuid
                d["_id"] = str(uuid.uuid4())
            self.docs.append(d)
        self._save()
        return docs

    def find(self, query: Optional[Dict[str, Any]] = None):
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

    def find_one(self, query: Optional[Dict[str, Any]] = None):
        res = self.find(query)
        return res[0] if res else None

    def update_one(self, query: Dict[str, Any], update: Dict[str, Any], upsert: bool = False):
        doc = self.find_one(query)
        if doc and "$set" in update:
            doc.update(update["$set"])
            self._save()
            class UpdateResult:
                modified_count = 1
            return UpdateResult()
        elif not doc and upsert:
            new_doc = query.copy()
            if "$set" in update:
                new_doc.update(update["$set"])
            self.insert_one(new_doc)
            class UpsertResult:
                modified_count = 1
            return UpsertResult()
        class UpdateResultZero:
            modified_count = 0
        return UpdateResultZero()

    def delete_one(self, query: Dict[str, Any]):
        doc = self.find_one(query)
        if doc and doc in self.docs:
            self.docs.remove(doc)
            self._save()
            class DeleteResult:
                deleted_count = 1
            return DeleteResult()
        class DeleteResultZero:
            deleted_count = 0
        return DeleteResultZero()

    def count_documents(self, query: Optional[Dict[str, Any]] = None):
        return len(self.find(query))


class MongoDBManager:
    def __init__(self):
        self.client: Optional[MongoClient] = None
        self.db = None
        self.is_connected: bool = False
        self.last_error: Optional[str] = None
        self.in_memory_db: Dict[str, InMemoryCollection] = {}
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

    def connect(self) -> bool:
        """Connects to MongoDB Atlas cluster and verifies connection with ping."""
        uri = settings.MONGODB_URI.strip()
        
        if not uri:
            self.is_connected = False
            self.last_error = "MONGODB_URI is not set in .env"
            logger.error("MongoDB Atlas connection failed: MONGODB_URI is empty.")
            self._init_fallback()
            return False

        if "<db_password>" in uri:
            self.is_connected = False
            self.last_error = "MONGODB_URI contains placeholder '<db_password>'. Please replace with real Atlas password."
            logger.error("MongoDB Atlas configuration error: '<db_password>' placeholder detected.")
            self._init_fallback()
            return False

        try:
            logger.info("Connecting to MongoDB Atlas cluster...")
            self.client = MongoClient(uri, serverSelectionTimeoutMS=5000)
            # Verify Atlas connection with admin ping
            self.client.admin.command("ping")
            self.db = self.client[settings.DATABASE_NAME]
            self.is_connected = True
            self.last_error = None
            logger.info(f"Successfully authenticated and connected to MongoDB Atlas! Database: {settings.DATABASE_NAME}")
            
            # Ensure indexes on key collections
            self._ensure_indexes()
            return True

        except (ConnectionFailure, ServerSelectionTimeoutError, OperationFailure, Exception) as e:
            self.is_connected = False
            self.last_error = str(e)
            logger.error(f"MongoDB Atlas connection failure: {e}")
            self._init_fallback()
            return False

    def _init_fallback(self):
        """Initializes in-memory fallback stores if Atlas is unreachable."""
        for col in self.collection_names:
            if col not in self.in_memory_db:
                self.in_memory_db[col] = InMemoryCollection(col)

    def _ensure_indexes(self):
        """Creates indexes for efficient queries and unique constraints."""
        try:
            if self.is_connected and self.db is not None:
                # Unique index on user email
                self.db["users"].create_index([("email", ASCENDING)], unique=True)
                # Query index on student learning gaps
                self.db["learning_gaps"].create_index([("student_id", ASCENDING)])
                # Index on study materials
                self.db["textbooks"].create_index([("subject", ASCENDING)])
                self.db["question_papers"].create_index([("subject", ASCENDING), ("year", ASCENDING)])
                self.db["notes"].create_index([("subject", ASCENDING), ("chapter_no", ASCENDING)])
                # Index on attendance
                self.db["attendance"].create_index([("studentId", ASCENDING), ("date", ASCENDING)])
                logger.info("MongoDB Atlas indexes verified and initialized.")
        except Exception as e:
            logger.warning(f"Index creation note: {e}")

    def mirror_to_local_file(self, collection_name: str, doc: Dict[str, Any]):
        """Mirrors inserted or updated document to data/db/<collection>.json."""
        try:
            file_path = os.path.join(LOCAL_DB_DIR, f"{collection_name}.json")
            docs = []
            if os.path.exists(file_path):
                with open(file_path, "r", encoding="utf-8") as f:
                    docs = json.load(f)
            clean_doc = {k: (str(v) if k == "_id" else v) for k, v in doc.items()}
            # Deduplicate by id or email
            docs = [d for d in docs if d.get("id") != clean_doc.get("id") and d.get("email") != clean_doc.get("email")]
            docs.append(clean_doc)
            os.makedirs(LOCAL_DB_DIR, exist_ok=True)
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(docs, f, indent=2, ensure_ascii=False)
        except Exception as e:
            logger.debug(f"Local file mirror note ({collection_name}): {e}")

    def get_collection(self, name: str):
        if self.is_connected and self.db is not None:
            return self.db[name]
        if name not in self.in_memory_db:
            self.in_memory_db[name] = InMemoryCollection(name)
        return self.in_memory_db[name]

db_manager = MongoDBManager()
