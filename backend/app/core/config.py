import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "EduNexa AI Backend"
    VERSION: str = "2.0.0"
    API_PREFIX: str = "/api"
    
    # MongoDB Atlas
    MONGODB_URI: str = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    DATABASE_NAME: str = os.getenv("DATABASE_NAME", "edunexa_ai")
    
    # Google Gemini AI Key
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", os.getenv("VITE_GEMINI_API_KEY", "AIzaSyDRMFHzwyh3xadlxVFEDBPtrEpfWFIdBC0"))
    
    # JWT Settings
    JWT_SECRET: str = os.getenv("JWT_SECRET", "edunexa-sslc-secret-key-2026")
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # Education Scope
    BOARD: str = "Karnataka State Board"
    CLASS_STANDARD: str = "SSLC Class 10"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
