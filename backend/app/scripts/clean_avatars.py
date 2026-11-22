import os
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../"))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from backend.app.database.mongodb import db_manager

def clean_avatars():
    db_manager.connect()
    db = db_manager.db
    if db is not None:
        res = db["users"].update_many({}, {"$set": {"avatar": ""}})
        print(f"Updated {res.modified_count} users in MongoDB Atlas to have empty avatar.")
    else:
        print("Database not connected, skipping remote update.")

if __name__ == "__main__":
    clean_avatars()
