import uuid
from typing import Optional
from datetime import datetime, timezone
from pydantic import BaseModel
from fastapi import APIRouter, HTTPException, Depends, status
from backend.app.schemas.models import UserRegister, UserLogin
from backend.app.database.mongodb import db_manager
from backend.app.core.security import hash_password, verify_password, create_access_token
from backend.app.core.dependencies import get_current_user, get_optional_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

# Predefined demo accounts for Karnataka SSLC Class 10 evaluation
DEMO_ACCOUNTS = {
    "alex.johnson@edunexa.ai": {
        "id": "student-10-alex",
        "name": "Alex Johnson",
        "role": "STUDENT",
        "grade": "Class 10",
        "board": "Karnataka State Board",
        "preferred_language": "English",
        "section": "Section A",
        "avatar": ""
    },
    "sarah.chen@edunexa.ai": {
        "id": "teacher-10-sarah",
        "name": "Ms. Sarah Chen",
        "role": "TEACHER",
        "grade": "Class 10",
        "board": "Karnataka State Board",
        "preferred_language": "English",
        "specialization": "Mathematics & Natural Sciences",
        "avatar": ""
    },
    "robert.johnson@edunexa.ai": {
        "id": "parent-10-robert",
        "name": "Robert Johnson",
        "role": "PARENT",
        "grade": "Class 10",
        "board": "Karnataka State Board",
        "preferred_language": "English",
        "student_id_to_link": "student-10-alex",
        "avatar": ""
    },
    "emma.wilson@edunexa.ai": {
        "id": "admin-10-emma",
        "name": "Dr. Emma Wilson",
        "role": "ADMIN",
        "grade": "Class 10",
        "board": "Karnataka State Board",
        "preferred_language": "English",
        "avatar": ""
    }
}

def ensure_demo_users_in_db():
    """Seeds default demo accounts with secure bcrypt hashed passwords if missing."""
    users_col = db_manager.get_collection("users")
    for email, info in DEMO_ACCOUNTS.items():
        existing = users_col.find_one({"email": email.lower()})
        if not existing:
            demo_doc = {
                "id": info["id"],
                "name": info["name"],
                "email": email.lower(),
                "password": hash_password("demo123"),
                "role": info["role"],
                "grade": info["grade"],
                "board": info["board"],
                "preferred_language": info["preferred_language"],
                "section": info.get("section", "Section A"),
                "specialization": info.get("specialization"),
                "student_id_to_link": info.get("student_id_to_link"),
                "avatar": info["avatar"],
                "created_at": datetime.now(timezone.utc).isoformat()
            }
            users_col.insert_one(demo_doc)

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register_user(payload: UserRegister):
    # Strict Karnataka SSLC Class 10 scope enforcement
    if payload.board != "Karnataka State Board" or payload.grade != "Class 10":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="EduNexa AI is strictly restricted to Karnataka State Board SSLC Class 10."
        )

    users_col = db_manager.get_collection("users")
    existing = users_col.find_one({"email": payload.email.lower()})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email address already exists. Please sign in."
        )

    new_id = f"user-{uuid.uuid4().hex[:8]}"
    avatar = ""

    # Securely hash password with bcrypt
    hashed_pwd = hash_password(payload.password)

    user_doc = {
        "id": new_id,
        "name": payload.name,
        "email": payload.email.strip().lower(),
        "password": hashed_pwd,
        "role": payload.role.upper(),
        "grade": payload.grade,
        "board": payload.board,
        "preferred_language": payload.preferred_language,
        "section": payload.section,
        "phone": payload.phone,
        "specialization": payload.specialization,
        "avatar": avatar,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    users_col.insert_one(user_doc)
    db_manager.mirror_to_local_file("users", user_doc)

    # Issue signed JWT access token
    token = create_access_token({
        "sub": new_id,
        "role": payload.role.upper(),
        "email": payload.email.lower(),
        "name": payload.name
    })

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
        "token": token,
        "token_type": "bearer"
    }

@router.post("/login")
def login_user(payload: UserLogin):
    # Ensure demo users exist in Atlas if testing with evaluation accounts
    ensure_demo_users_in_db()

    clean_email = payload.email.strip().lower()
    users_col = db_manager.get_collection("users")
    user = users_col.find_one({"email": clean_email})

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password. Please verify your credentials."
        )

    # Secure bcrypt password verification
    stored_password = user.get("password", "")
    if not verify_password(payload.password, stored_password):
        # Fallback for unhashed legacy records if any exist
        if stored_password != payload.password:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password. Please verify your credentials."
            )
        else:
            # Upgrade legacy unhashed password to bcrypt hash in Atlas
            users_col.update_one({"id": user["id"]}, {"$set": {"password": hash_password(payload.password)}})

    # Record login session audit event
    session_id = f"sess-{uuid.uuid4().hex[:10]}"
    now_iso = datetime.now(timezone.utc).isoformat()
    session_doc = {
        "id": session_id,
        "user_id": user.get("id"),
        "name": user.get("name"),
        "email": user.get("email"),
        "role": user.get("role"),
        "event": "LOGIN",
        "timestamp": now_iso,
        "status": "SUCCESS"
    }
    sessions_col = db_manager.get_collection("user_sessions")
    sessions_col.insert_one(session_doc)
    db_manager.mirror_to_local_file("user_sessions", session_doc)

    # Update user record with last_login and online state
    users_col.update_one(
        {"id": user["id"]},
        {"$set": {"last_login": now_iso, "is_online": True}}
    )
    user["last_login"] = now_iso
    user["is_online"] = True
    db_manager.mirror_to_local_file("users", user)

    # Issue signed JWT token
    token = create_access_token({
        "sub": user.get("id"),
        "role": user.get("role"),
        "email": user.get("email"),
        "name": user.get("name")
    })

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
            "section": user.get("section", "Section A"),
            "avatar": user.get("avatar")
        },
        "token": token,
        "token_type": "bearer"
    }

class UserLogout(BaseModel):
    email: Optional[str] = None

@router.post("/logout")
def logout_user(payload: Optional[UserLogout] = None, current_user: Optional[dict] = Depends(get_optional_current_user)):
    """Logs out user and records timestamped LOGOUT event in MongoDB Atlas."""
    user_email = (payload.email if payload and payload.email else (current_user.get("email") if current_user else None))
    now_iso = datetime.now(timezone.utc).isoformat()
    
    session_id = f"sess-{uuid.uuid4().hex[:10]}"
    session_doc = {
        "id": session_id,
        "email": user_email or "guest",
        "event": "LOGOUT",
        "timestamp": now_iso,
        "status": "SUCCESS"
    }
    sessions_col = db_manager.get_collection("user_sessions")
    sessions_col.insert_one(session_doc)
    db_manager.mirror_to_local_file("user_sessions", session_doc)

    if user_email:
        users_col = db_manager.get_collection("users")
        users_col.update_one(
            {"email": user_email.lower()},
            {"$set": {"last_logout": now_iso, "is_online": False}}
        )

    return {"success": True, "message": "Successfully logged out."}

@router.get("/me")
def get_current_user_profile(current_user: dict = Depends(get_current_user)):
    """Returns the authenticated user's profile from MongoDB Atlas."""
    return {
        "success": True,
        "user": current_user
    }
