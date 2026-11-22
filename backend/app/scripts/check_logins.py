"""
EduNexa AI — User Login & Logout Audit Inspector
Checks real-time login and logout activity from MongoDB Atlas and local database store.
Run anytime in terminal / CMD:
python backend/app/scripts/check_logins.py
"""

import os
import sys

# Ensure root in sys.path
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../"))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from backend.app.core.config import settings
from backend.app.database.mongodb import db_manager

def main():
    print("=" * 80)
    print("  EDUNEXA AI — USER LOGIN & LOGOUT ACTIVITY AUDIT")
    print("  Cluster: edunexa-cluster.2ct8ljm.mongodb.net")
    print("  Database: edunexa_ai  |  Collection: user_sessions & users")
    print("=" * 80)

    try:
        db_manager.connect()
        db = db_manager.db

        sessions_col = db["user_sessions"]
        users_col = db["users"]

        total_sessions = sessions_col.count_documents({})
        online_users = list(users_col.find({"is_online": True}))

        print(f"\n📊 Summary:")
        print(f"  • Total Tracked Session Events: {total_sessions}")
        print(f"  • Currently Online Users:        {len(online_users)}")

        if online_users:
            print("\n🟢 Online Users Right Now:")
            for u in online_users:
                print(f"  - {u.get('name')} ({u.get('email')}) — Role: {u.get('role')} — Last Login: {u.get('last_login', 'N/A')}")

        print("\n📜 Recent Login / Logout Events (Most Recent First):")
        print("-" * 80)
        print(f"{'TIMESTAMP':<24} {'EVENT':<8} {'ROLE':<10} {'EMAIL':<30}")
        print("-" * 80)

        recent_events = list(sessions_col.find().sort("timestamp", -1).limit(15))
        if not recent_events:
            print("  No login/logout events recorded yet.")
        else:
            for s in recent_events:
                ts = s.get("timestamp", "")[:19].replace("T", " ")
                ev = s.get("event", "UNKNOWN")
                role = s.get("role", "-")
                email = s.get("email", "-")
                print(f"{ts:<24} {ev:<8} {role:<10} {email:<30}")

        print("-" * 80)
        print("\n💡 Verification Locations:")
        print("  1. In MongoDB Atlas: Open cloud.mongodb.com -> edunexa_ai -> 'user_sessions' collection")
        print("  2. In Project Files: Check data/db/user_sessions.json")
        print("=" * 80)

    except Exception as e:
        print(f"Error inspecting database: {e}")

if __name__ == "__main__":
    main()
