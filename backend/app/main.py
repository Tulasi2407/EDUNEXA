import os
import sys
import logging
from contextlib import asynccontextmanager

# Ensure project root is in sys.path so direct execution (python backend/app/main.py) works
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.core.config import settings
from backend.app.database.mongodb import db_manager
from backend.app.api import auth, study_materials, learning_gaps, ai_tutor, study_planner

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("edunexa_backend")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Connect to MongoDB Atlas (or fallback in-memory)
    logger.info(f"Starting {settings.PROJECT_NAME} v{settings.VERSION} for {settings.BOARD} - {settings.CLASS_STANDARD}")
    db_manager.connect()
    
    # Auto-seed if collections are empty
    try:
        from backend.app.scripts.seed_data import seed
        tb_col = db_manager.get_collection("textbooks")
        if tb_col.count_documents({}) == 0:
            logger.info("Textbooks collection empty. Running seed script...")
            seed()
    except Exception as e:
        logger.warning(f"Auto-seed check note: {e}")

    yield
    # Shutdown
    logger.info("Shutting down EduNexa AI Backend server.")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Official Backend API for EduNexa AI — Exclusively Karnataka SSLC Class 10 (KSEAB)",
    lifespan=lifespan
)

# CORS Middleware for local frontend Vite dev server & production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers
app.include_router(auth.router, prefix=settings.API_PREFIX)
app.include_router(study_materials.router, prefix=settings.API_PREFIX)
app.include_router(learning_gaps.router, prefix=settings.API_PREFIX)
app.include_router(ai_tutor.router, prefix=settings.API_PREFIX)
app.include_router(study_planner.router, prefix=settings.API_PREFIX)

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "scope": f"{settings.BOARD} — {settings.CLASS_STANDARD}",
        "database_connected": db_manager.is_connected,
        "active_store": "MongoDB Atlas" if db_manager.is_connected else "Resilient In-Memory Store"
    }

@app.get("/")
def root():
    return {
        "message": "Welcome to EduNexa AI Backend API",
        "scope": "Karnataka State Board SSLC Class 10",
        "docs_url": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="127.0.0.1", port=8000, reload=True)
