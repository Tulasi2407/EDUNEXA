import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "EduNexa AI Backend"
    VERSION: str = "2.0.0"
    API_PREFIX: str = "/api"
    
    # MongoDB Atlas
    MONGODB_URI: str = os.getenv("MONGODB_URI", "")
    DATABASE_NAME: str = os.getenv("DATABASE_NAME", "edunexa_ai")
    
    # Google Gemini AI Key (Backend-only; never exposed to browser)
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    
    # JWT Settings
    JWT_SECRET: str = os.getenv("JWT_SECRET", "edunexa-sslc-2026-b8f419c8e9b62a14d59a7201c74f518e")
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # Education Scope
    BOARD: str = "Karnataka State Board"
    CLASS_STANDARD: str = "SSLC Class 10"

    class Config:
        env_file = [".env", "backend/.env", "../.env"]
        extra = "ignore"

settings = Settings()
