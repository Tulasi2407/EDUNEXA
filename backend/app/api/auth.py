import uuid
from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends
from backend.app.schemas.models import UserRegister, UserLogin, UserResponse
from backend.app.database.mongodb import db_manager

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register")
def register_user(payload: UserRegister):
    # Strict Karnataka SSLC Class 10 scope enforcement
    if payload.board != "Karnataka State Board" or payload.grade != "Class 10":
        raise HTTPException(
            status_code=400,
            detail="EduNexa AI is strictly restricted to Karnataka State Board SSLC Class 10."
        )

    users_col = db_manager.get_collection("users")
    existing = users_col.find_one({"email": payload.email.lower()})
    if existing:
        raise HTTPException(status_code=400, detail="A user with this email address already exists.")

    new_id = f"user-{uuid.uuid4().hex[:8]}"
    avatar = f"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80" if payload.role == "STUDENT" else (
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80" if payload.role == "TEACHER" else
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80"
    )

    user_doc = {
        "id": new_id,
        "name": payload.name,
        "email": payload.email.lower(),
        "password": payload.password,  # In production, use bcrypt hash
        "role": payload.role.upper(),
        "grade": payload.grade,
        "board": payload.board,
        "preferred_language": payload.preferred_language,
        "section": payload.section,
        "phone": payload.phone,
        "specialization": payload.specialization,
        "avatar": avatar,
        "created_at": datetime.utcnow().isoformat()
    }
    users_col.insert_one(user_doc)

    return {
        "success": True,
        "message": f"Successfully registered {payload.name} for Karnataka SSLC Class 10.",
        "user": {
            "id": new_id,
            "name": payload.name,
            "email": payload.email.lower(),
            "role": payload.role.upper(),
            "grade": payload.grade,
            "board": payload.board,
            "preferred_language": payload.preferred_language,
            "avatar": avatar
        },
        "token": f"bearer-{new_id}"
    }

@router.post("/login")
def login_user(payload: UserLogin):
    users_col = db_manager.get_collection("users")
    user = users_col.find_one({"email": payload.email.lower()})

    # Allow demo fallbacks if user not registered yet
    if not user:
        # Predefined demo accounts
        demo_accounts = {
            "alex.johnson@edunexa.ai": {"name": "Alex Johnson", "role": "STUDENT"},
            "sarah.chen@edunexa.ai": {"name": "Ms. Sarah Chen", "role": "TEACHER"},
            "robert.johnson@edunexa.ai": {"name": "Robert Johnson", "role": "PARENT"},
            "emma.wilson@edunexa.ai": {"name": "Dr. Emma Wilson", "role": "ADMIN"}
        }
        if payload.email.lower() in demo_accounts:
            demo_info = demo_accounts[payload.email.lower()]
            return {
                "success": True,
                "user": {
                    "id": f"demo-{demo_info['role'].lower()}",
                    "name": demo_info["name"],
                    "email": payload.email.lower(),
                    "role": demo_info["role"],
                    "grade": "Class 10",
                    "board": "Karnataka State Board",
                    "preferred_language": "English",
                    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
                },
                "token": "demo-token"
            }
        raise HTTPException(status_code=401, detail="Invalid credentials. Please verify your email and password.")

    if user.get("password") != payload.password:
        raise HTTPException(status_code=401, detail="Invalid password.")

    return {
        "success": True,
        "user": {
            "id": user.get("id"),
            "name": user.get("name"),
            "email": user.get("email"),
            "role": user.get("role"),
            "grade": user.get("grade", "Class 10"),
            "board": user.get("board", "Karnataka State Board"),
            "preferred_language": user.get("preferred_language", "English"),
            "avatar": user.get("avatar")
        },
        "token": f"bearer-{user.get('id')}"
    }

@router.get("/me")
def get_current_user():
    return {
        "id": "student-10-alex",
        "name": "Alex Johnson",
        "email": "alex.johnson@edunexa.ai",
        "role": "STUDENT",
        "grade": "Class 10",
        "board": "Karnataka State Board",
        "preferred_language": "English"
    }
