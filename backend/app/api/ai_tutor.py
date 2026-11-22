from fastapi import APIRouter, Depends
from backend.app.schemas.models import AIChatRequest, AIChatResponse
from backend.app.services.gemini_service import gemini_service
from backend.app.core.dependencies import get_optional_current_user

router = APIRouter(prefix="/ai-tutor", tags=["Nexa AI Tutor"])

@router.post("/chat", response_model=AIChatResponse)
async def chat_with_tutor(req: AIChatRequest, current_user: dict = Depends(get_optional_current_user)):
    """
    Nexa AI Educational Assistant Chat endpoint.
    Powered by official Google GenAI Python SDK.
    Supports 5 pedagogical modes and multilingual queries (English, Kannada, Hindi).
    """
    result = await gemini_service.chat_with_nexa(
        message=req.message,
        subject=req.subject or "Mathematics",
        mode=req.mode or "STEP_BY_STEP",
        language=req.language or "English",
        history=req.history or []
    )

    return AIChatResponse(
        reply=result["reply"],
        mode=result["mode"],
        language=result["language"],
        suggested_followups=result.get("suggested_followups", [
            "Show me a step-by-step example",
            "Explain it with a real-life analogy",
            "Solve a 2024 SSLC Board paper question"
        ]),
        karnataka_curriculum_reference=result.get("karnataka_curriculum_reference", "Karnataka SSLC Class 10 Curriculum Guidelines")
    )
