"""
EduNexa AI — Database Folder Exporter & Synchronizer
Syncs all MongoDB Atlas collections to persistent local files in:
c:/Users/WCT/Documents/EDUNEXA/data/db/

Run anytime with: python backend/app/scripts/sync_db_folder.py
"""

import os
import sys
import json
from datetime import datetime
from bson import ObjectId

# Ensure root in sys.path
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../"))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from backend.app.core.config import settings
from backend.app.database.mongodb import db_manager

LOCAL_DB_DIR = os.path.join(ROOT, "data", "db")

class MongoJSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, datetime):
            return o.isoformat()
        return super().default(o)

def sync_collections_to_folder():
    os.makedirs(LOCAL_DB_DIR, exist_ok=True)
    print("=" * 70)
    print("  EDUNEXA AI — DATABASE FOLDER SYNCHRONIZER")
    print(f"  Target Local Folder: {LOCAL_DB_DIR}")
    print(f"  Source Database:     {settings.DATABASE_NAME} (MongoDB Atlas)")
    print("=" * 70)

    db_manager.connect()
    db = db_manager.db

    collections = [
        "users",
        "textbooks",
        "question_papers",
        "attendance",
        "learning_gaps",
        "study_plans",
        "notes",
        "learning_materials"
    ]

    summary = []

    for col_name in collections:
        col = db[col_name]
        docs = list(col.find())
        file_path = os.path.join(LOCAL_DB_DIR, f"{col_name}.json")
        
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(docs, f, indent=2, cls=MongoJSONEncoder, ensure_ascii=False)
            
        print(f"  ✓ Exported [{col_name}]: {len(docs)} documents -> {col_name}.json")
        summary.append((col_name, len(docs)))

    # Write README.md in the database folder
    readme_content = f"""# EduNexa AI — Local Database Store

**Directory:** `{LOCAL_DB_DIR}`  
**Cluster:** `edunexa-cluster.2ct8ljm.mongodb.net`  
**Database:** `edunexa_ai`  
**Scope:** Karnataka State Board (KSEAB) SSLC Class 10  
**Last Synchronized:** {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}

---

### Collections Stored in this Folder

| File | Collection Name | Records | Purpose |
| :--- | :--- | :--- | :--- |
| `users.json` | `users` | {dict(summary).get('users', 0)} | Registered user accounts, bcrypt hashed passwords & roles |
| `textbooks.json` | `textbooks` | {dict(summary).get('textbooks', 0)} | 6 Official KSEAB Class 10 textbooks with full chapter lists |
| `question_papers.json` | `question_papers` | {dict(summary).get('question_papers', 0)} | 11 Karnataka SSLC PYQs (2021-2024) |
| `attendance.json` | `attendance` | {dict(summary).get('attendance', 0)} | Daily attendance records for Kannada, English, Hindi, Math, Science, Social Science |
| `learning_gaps.json` | `learning_gaps` | {dict(summary).get('learning_gaps', 0)} | Diagnostic error patterns and prerequisite blocker records |
| `study_plans.json` | `study_plans` | {dict(summary).get('study_plans', 0)} | Personalized adaptive study timetables |
| `notes.json` | `notes` | {dict(summary).get('notes', 0)} | Chapter revision summaries and formula sheets |
| `learning_materials.json` | `learning_materials` | {dict(summary).get('learning_materials', 0)} | Official KSEAB model blueprint question papers |

---

### How this Folder Works
1. **Live Synchronization:** Whenever a user registers or an assessment is saved, records are persisted directly to **MongoDB Atlas** and mirrored into this local folder.
2. **Offline Resilience:** If internet connectivity drops, EduNexa reads directly from these local `.json` database files without crashing.
3. **Manual Sync CLI:** Run `python backend/app/scripts/sync_db_folder.py` anytime to refresh these files from Atlas.
"""
    with open(os.path.join(LOCAL_DB_DIR, "README.md"), "w", encoding="utf-8") as f:
        f.write(readme_content)

    print("\n" + "=" * 70)
    print("  STATUS: ALL COLLECTIONS SAVED SUCCESSFULLY TO LOCAL DATABASE FOLDER!")
    print(f"  View files at: {LOCAL_DB_DIR}")
    print("=" * 70)

if __name__ == "__main__":
    sync_collections_to_folder()
