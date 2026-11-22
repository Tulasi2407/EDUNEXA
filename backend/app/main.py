import os
import sys
import logging
from contextlib import asynccontextmanager

# Ensure project root is in sys.path so direct execution (python backend/app/main.py) works
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
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
        "status": "healthy" if db_manager.is_connected else "degraded",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "scope": f"{settings.BOARD} — {settings.CLASS_STANDARD}",
        "database_connected": db_manager.is_connected,
        "active_store": "MongoDB Atlas" if db_manager.is_connected else "Resilient In-Memory Store (Atlas Disconnected)",
        "database_error": db_manager.last_error
    }

@app.get("/", response_class=HTMLResponse)
def root(request: Request):
    accept = request.headers.get("accept", "")
    if "application/json" in accept and "text/html" not in accept:
        return JSONResponse({
            "message": "Welcome to EduNexa AI Backend API",
            "scope": "Karnataka State Board SSLC Class 10",
            "docs_url": "/docs"
        })
    
    db_status = "Connected to MongoDB Atlas" if db_manager.is_connected else "Fallback Memory Store"
    status_color = "#10B981" if db_manager.is_connected else "#F59E0B"
    
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EduNexa AI Backend — Karnataka SSLC Class 10</title>
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }}
    body {{ background: #0B1020; color: #F1F5F9; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }}
    .card {{ background: #171F3A; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; max-width: 620px; width: 100%; padding: 36px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(118, 87, 246, 0.15); }}
    .badge {{ display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700; background: rgba(16, 185, 129, 0.15); color: #10B981; border: 1px solid rgba(16, 185, 129, 0.3); }}
    .dot {{ width: 8px; height: 8px; border-radius: 50%; background: {status_color}; box-shadow: 0 0 8px {status_color}; }}
    h1 {{ font-size: 24px; font-weight: 800; color: #FFFFFF; margin-top: 14px; margin-bottom: 6px; }}
    p.sub {{ color: #94A3B8; font-size: 13px; line-height: 1.5; margin-bottom: 24px; }}
    .grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }}
    .btn {{ display: flex; align-items: center; justify-content: center; gap: 8px; padding: 13px 18px; border-radius: 12px; font-size: 13px; font-weight: 700; text-decoration: none; transition: all 0.2s; text-align: center; }}
    .btn-primary {{ background: linear-gradient(135deg, #7657F6, #6366F1); color: #FFFFFF; box-shadow: 0 4px 20px rgba(118, 87, 246, 0.4); }}
    .btn-primary:hover {{ transform: translateY(-2px); box-shadow: 0 6px 25px rgba(118, 87, 246, 0.6); }}
    .btn-secondary {{ background: rgba(255, 255, 255, 0.05); color: #E2E8F0; border: 1px solid rgba(255, 255, 255, 0.1); }}
    .btn-secondary:hover {{ background: rgba(255, 255, 255, 0.1); transform: translateY(-2px); }}
    .endpoints {{ background: #111831; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.05); padding: 16px; margin-top: 10px; }}
    .endpoints h3 {{ font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #94A3B8; margin-bottom: 10px; }}
    .link-row {{ display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); font-size: 12px; }}
    .link-row:last-child {{ border-bottom: none; }}
    .link-row a {{ color: #38BDF8; text-decoration: none; font-family: monospace; font-size: 12px; }}
    .link-row a:hover {{ text-decoration: underline; }}
    .tag {{ font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 700; background: rgba(118, 87, 246, 0.2); color: #A78BFA; }}
  </style>
</head>
<body>
  <div class="card">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <span class="badge"><span class="dot"></span> {db_status}</span>
      <span style="font-size: 11px; font-weight: 600; color: #FFC857; background: rgba(255, 200, 87, 0.15); padding: 4px 10px; border-radius: 9999px; border: 1px solid rgba(255, 200, 87, 0.3);">Karnataka SSLC Class 10</span>
    </div>
    <h1>EduNexa AI — Backend API Gateway</h1>
    <p class="sub">FastAPI engine powering adaptive diagnostics, AI tutoring, real MongoDB Atlas persistence, and official KSEAB textbooks & previous year question papers.</p>
    
    <div class="grid">
      <a href="/docs" class="btn btn-primary">
        <span>Interactive API Docs (/docs)</span> &rarr;
      </a>
      <a href="http://localhost:5173" target="_blank" class="btn btn-secondary">
        <span>Launch Web App (5173)</span> &nearr;
      </a>
    </div>

    <div class="endpoints">
      <h3>Live Atlas Endpoints</h3>
      <div class="link-row">
        <a href="/api/study-materials/textbooks" target="_blank">GET /api/study-materials/textbooks</a>
        <span class="tag">6 KTBS Books</span>
      </div>
      <div class="link-row">
        <a href="/api/study-materials/pyqs" target="_blank">GET /api/study-materials/pyqs</a>
        <span class="tag">11 Board PYQs</span>
      </div>
      <div class="link-row">
        <a href="/api/health" target="_blank">GET /api/health</a>
        <span class="tag">Cluster Health</span>
      </div>
    </div>
  </div>
</body>
</html>
"""
    return HTMLResponse(content=html)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="127.0.0.1", port=8000, reload=True)
