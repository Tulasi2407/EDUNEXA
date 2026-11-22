# EduNexa AI — Local Database Store

**Directory:** `C:\Users\WCT\Documents\EDUNEXA\data\db`  
**Cluster:** `edunexa-cluster.2ct8ljm.mongodb.net`  
**Database:** `edunexa_ai`  
**Scope:** Karnataka State Board (KSEAB) SSLC Class 10  
**Last Synchronized:** 2026-11-22 06:11:34

---

### Collections Stored in this Folder

| File | Collection Name | Records | Purpose |
| :--- | :--- | :--- | :--- |
| `users.json` | `users` | 6 | Registered user accounts, bcrypt hashed passwords & roles |
| `textbooks.json` | `textbooks` | 6 | 6 Official KSEAB Class 10 textbooks with full chapter lists |
| `question_papers.json` | `question_papers` | 11 | 11 Karnataka SSLC PYQs (2021-2024) |
| `attendance.json` | `attendance` | 10 | Daily attendance records for Kannada, English, Hindi, Math, Science, Social Science |
| `learning_gaps.json` | `learning_gaps` | 17 | Diagnostic error patterns and prerequisite blocker records |
| `study_plans.json` | `study_plans` | 1 | Personalized adaptive study timetables |
| `notes.json` | `notes` | 3 | Chapter revision summaries and formula sheets |
| `learning_materials.json` | `learning_materials` | 2 | Official KSEAB model blueprint question papers |

---

### How this Folder Works
1. **Live Synchronization:** Whenever a user registers or an assessment is saved, records are persisted directly to **MongoDB Atlas** and mirrored into this local folder.
2. **Offline Resilience:** If internet connectivity drops, EduNexa reads directly from these local `.json` database files without crashing.
3. **Manual Sync CLI:** Run `python backend/app/scripts/sync_db_folder.py` anytime to refresh these files from Atlas.
