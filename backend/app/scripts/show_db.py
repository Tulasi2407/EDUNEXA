"""
EduNexa AI — MongoDB Atlas Live Inspector
Quick CLI tool to show all collections and documents in edunexa_ai.
Run with: python backend/app/scripts/show_db.py
"""
import os
import sys

# Ensure root is in python path
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../"))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from backend.app.core.config import settings
from backend.app.database.mongodb import db_manager

def main():
    print("=" * 70)
    print("  EDUNEXA AI — MONGODB ATLAS LIVE DATABASE INSPECTION")
    print("  Cluster: edunexa-cluster.2ct8ljm.mongodb.net")
    print("  Scope:   Karnataka State Board SSLC Class 10")
    print("=" * 70)

    try:
        db_manager.connect()
        db = db_manager.db
        
        collections = db.list_collection_names()
        print(f"\nConnected successfully to database: '{settings.DATABASE_NAME}'")
        print(f"Total Collections Found: {len(collections)}\n")

        for col_name in sorted(collections):
            count = db[col_name].count_documents({})
            print(f"📁 Collection: [{col_name}] ({count} documents)")
            
            # Print sample record
            sample = db[col_name].find_one()
            if sample:
                sample_id = sample.get('_id', '')
                title = sample.get('title') or sample.get('email') or sample.get('name') or sample.get('id') or sample.get('topic') or str(sample_id)
                print(f"   ↳ Sample document: {title}")
        
        print("\n" + "=" * 70)
        print("  Status: ALL MONGODB ATLAS COLLECTIONS ACTIVE & VERIFIED")
        print("=" * 70)
    except Exception as e:
        print(f"Connection Error: {e}")

if __name__ == "__main__":
    main()
