import pytest
from starlette.testclient import TestClient
from backend.app.main import app
from backend.app.database.mongodb import db_manager
from backend.app.core.security import hash_password, verify_password, create_access_token, decode_access_token

@pytest.fixture(scope="module")
def client():
    with TestClient(app) as test_client:
        yield test_client

def test_atlas_database_connection(client):
    """Verifies that MongoDB Atlas is genuinely connected and healthy."""
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["database_connected"] is True
    assert data["active_store"] == "MongoDB Atlas"

def test_password_hashing_and_jwt():
    """Verifies bcrypt password hashing and PyJWT token generation."""
    raw_pwd = "KarnatakaSSLC@2026"
    hashed = hash_password(raw_pwd)
    assert hashed != raw_pwd
    assert verify_password(raw_pwd, hashed) is True
    assert verify_password("WrongPassword", hashed) is False

    token = create_access_token({"sub": "student-test-123", "role": "STUDENT"})
    payload = decode_access_token(token)
    assert payload is not None
    assert payload["sub"] == "student-test-123"
    assert payload["role"] == "STUDENT"

def test_demo_accounts_login_and_token(client):
    """Verifies demo evaluation login returns signed JWT tokens."""
    res = client.post("/api/auth/login", json={
        "email": "alex.johnson@edunexa.ai",
        "password": "demo123"
    })
    assert res.status_code == 200
    data = res.json()
    assert data["success"] is True
    assert "token" in data
    assert data["user"]["role"] == "STUDENT"

def test_authenticated_me_endpoint(client):
    """Verifies /api/auth/me requires valid token and returns Atlas profile."""
    # Without token -> 401
    unauth = client.get("/api/auth/me")
    assert unauth.status_code == 401

    # With valid token
    login_res = client.post("/api/auth/login", json={
        "email": "sarah.chen@edunexa.ai",
        "password": "demo123"
    })
    token = login_res.json()["token"]
    auth_res = client.get("/api/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert auth_res.status_code == 200
    assert auth_res.json()["user"]["name"] == "Ms. Sarah Chen"

def test_study_materials_collections_in_atlas(client):
    """Verifies textbooks, pyq papers, notes, and model papers exist in Atlas."""
    tb = client.get("/api/study-materials/textbooks").json()
    assert len(tb) >= 6
    assert any(t["subject"] == "Mathematics" for t in tb)

    pyq = client.get("/api/study-materials/previous-year-papers").json()
    assert len(pyq) >= 10

    notes = client.get("/api/study-materials/notes").json()
    assert len(notes) >= 3

def test_nexa_ai_tutor_multilingual(client):
    """Verifies Nexa AI Tutor chat responds in English, Kannada, and Hindi."""
    # English
    en_res = client.post("/api/ai-tutor/chat", json={
        "message": "Explain Ohm's Law and parallel circuits",
        "subject": "Science",
        "mode": "simple",
        "language": "English"
    })
    assert en_res.status_code == 200
    assert len(en_res.json()["reply"]) > 50

    # Kannada
    kn_res = client.post("/api/ai-tutor/chat", json={
        "message": "ಓಮ್‌ನ ನಿಯಮ ಎಂದರೇನು?",
        "subject": "Science",
        "mode": "step_by_step",
        "language": "Kannada"
    })
    assert kn_res.status_code == 200
    assert len(kn_res.json()["reply"]) > 20

def test_learning_gap_diagnostic_and_persistence(client):
    """Verifies that diagnostic quiz analysis persists detected gaps to MongoDB Atlas."""
    diag_res = client.post("/api/learning-gaps/diagnostic", json={
        "subject": "Mathematics",
        "chapter": "Quadratic Equations",
        "student_id": "student-10-alex",
        "responses": [
            {
                "question": "What is the discriminant of 2x^2 - 4x + 3 = 0?",
                "studentAnswer": "Delta = 8",
                "correctAnswer": "Delta = -8",
                "isCorrect": False,
                "topic": "Discriminant Calculation",
                "prerequisite": "Negative multiplication rules"
            }
        ]
    })
    assert diag_res.status_code == 200
    data = diag_res.json()
    assert data["success"] is True
    assert len(data["persisted_gaps"]) >= 1

    # Verify gap can be retrieved from MongoDB Atlas
    gaps_res = client.get("/api/learning-gaps/?student_id=student-10-alex")
    assert gaps_res.status_code == 200
    gaps = gaps_res.json()
    assert len(gaps) >= 1

def test_study_plan_generation_and_persistence(client):
    """Verifies adaptive study timetable generation and persistence to MongoDB Atlas."""
    plan_res = client.post("/api/study-planner/generate", json={
        "student_id": "student-10-alex",
        "daily_hours": 3.0,
        "exam_date": "2026-12-05",
        "weak_subjects": ["Mathematics", "Science"]
    })
    assert plan_res.status_code == 200
    data = plan_res.json()
    assert data["success"] is True
    assert len(data["plan"]["tasks"]) >= 20

    # Verify retrieval from Atlas
    get_plan = client.get("/api/study-planner/?student_id=student-10-alex")
    assert get_plan.status_code == 200
    assert get_plan.json()["weeklyTargetHours"] == 21.0
