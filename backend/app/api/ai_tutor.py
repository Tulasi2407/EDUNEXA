import httpx
from fastapi import APIRouter
from backend.app.schemas.models import AIChatRequest, AIChatResponse
from backend.app.core.config import settings

router = APIRouter(prefix="/ai-tutor", tags=["Nexa AI Tutor"])

MODE_INSTRUCTIONS = {
    "simple": "Explain in simple everyday words, avoid heavy academic jargon, and make it welcoming.",
    "real_life": "Explain using vivid, real-life practical examples that a Class 10 student in Karnataka experiences.",
    "step_by_step": "Break down the concept into numbered, structured sequential steps (1, 2, 3...) with formulas.",
    "analogy": "Use an engaging, memorable analogy (like traffic on a highway, water flowing through pipes, or a cricket match).",
    "summary": "Provide a bulleted quick-revision summary with key terms, formulas, and 3 high-yield exam takeaways."
}

LANGUAGE_NAMES = {
    "English": "English",
    "Kannada": "Kannada (ಕನ್ನಡ) script with key technical English terms in parentheses",
    "Hindi": "Hindi (हिंदी) with clear Devanagari script"
}

@router.post("/chat", response_model=AIChatResponse)
async def chat_with_tutor(req: AIChatRequest):
    prompt_mode = MODE_INSTRUCTIONS.get(req.mode.lower(), MODE_INSTRUCTIONS["simple"])
    lang_instruction = LANGUAGE_NAMES.get(req.language, "English")

    system_prompt = (
        f"You are Nexa AI Tutor, an empathetic, high-caliber personal AI tutor for Karnataka State Board SSLC Class 10.\n"
        f"Strict Scope: Only Karnataka SSLC Class 10 syllabus (KSEAB). Never discuss unrelated university or CBSE topics.\n"
        f"Pedagogical Instruction: {prompt_mode}\n"
        f"Response Language: {lang_instruction}.\n"
        f"Include a Karnataka SSLC Exam Tip or relevant chapter reference at the end."
    )

    # Attempt to query Gemini API if key is present
    gemini_key = settings.GEMINI_API_KEY
    if gemini_key and gemini_key != "your_gemini_api_key_here":
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={gemini_key}"
            payload = {
                "contents": [
                    {
                        "parts": [
                            {"text": f"System Directive: {system_prompt}\n\nStudent Query: {req.message}"}
                        ]
                    }
                ],
                "generationConfig": {
                    "temperature": 0.4,
                    "maxOutputTokens": 800
                }
            }
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.post(url, json=payload)
                if res.status_code == 200:
                    data = res.json()
                    candidates = data.get("candidates", [])
                    if candidates:
                        text = candidates[0].get("content", {}).get("parts", [{}])[0].get("text", "")
                        if text:
                            return AIChatResponse(
                                reply=text,
                                mode=req.mode,
                                language=req.language,
                                suggested_followups=[
                                    "Can you solve a previous Karnataka SSLC question on this?",
                                    "Explain it differently using an analogy",
                                    "What are the common mistakes students make in exams?"
                                ],
                                karnataka_curriculum_reference=f"Karnataka SSLC Class 10 {req.subject} Curriculum"
                            )
        except Exception:
            pass  # Resilient fallback below

    # Intelligent curated SSLC Class 10 fallback response
    msg_lower = req.message.lower()
    if "quadratic" in msg_lower or "discriminant" in msg_lower:
        if req.language == "Kannada":
            reply = (
                "**ವರ್ಗ ಸಮೀಕರಣಗಳು (Quadratic Equations) - ಶೋಧಕ (Discriminant b² - 4ac):**\n\n"
                "ax² + bx + c = 0 ರೂಪದ ಸಮೀಕರಣದಲ್ಲಿ, ಮೂಲಗಳ ಸ್ವರೂಪವನ್ನು ತಿಳಿಯಲು Δ = b² - 4ac ಶೋಧಕವನ್ನು ಬಳಸುತ್ತೇವೆ:\n"
                "1. **b² - 4ac > 0**: ಮೂಲಗಳು ನೈಜ ಮತ್ತು ಭಿನ್ನವಾಗಿರುತ್ತವೆ.\n"
                "2. **b² - 4ac = 0**: ಮೂಲಗಳು ನೈಜ ಮತ್ತು ಸಮನಾಗಿರುತ್ತವೆ (ಉದಾ: -b/2a).\n"
                "3. **b² - 4ac < 0**: ಯಾವುದೇ ನೈಜ ಮೂಲಗಳಿರುವುದಿಲ್ಲ (ಕಾಲ್ಪನಿಕ).\n\n"
                "💡 **SSLC ಪರೀಕ್ಷಾ ಸಲಹೆ**: ವಾರ್ಷಿಕ ಪರೀಕ್ಷೆಯಲ್ಲಿ ಈ ಪರಿಕಲ್ಪನೆಯ ಮೇಲೆ 2 ಅಂಕಗಳ ಪ್ರಶ್ನೆ ಖಚಿತವಾಗಿ ಬರುತ್ತದೆ!"
            )
        elif req.language == "Hindi":
            reply = (
                "**द्विघात समीकरण (Quadratic Equations) - विविक्तकर (Discriminant b² - 4ac):**\n\n"
                "समीकरण ax² + bx + c = 0 के लिए विविक्तकर D = b² - 4ac होता है:\n"
                "1. **D > 0**: मूल वास्तविक और असमान (भिन्न) होते हैं।\n"
                "2. **D = 0**: मूल वास्तविक और बराबर होते हैं।\n"
                "3. **D < 0**: कोई वास्तविक मूल नहीं होता।\n\n"
                "💡 **SSLC परीक्षा टिप**: कर्नाटक बोर्ड परीक्षा में इस पर 2 अंक का प्रश्न निश्चित रूप से पूछा जाता है।"
            )
        else:
            if req.mode == "analogy":
                reply = (
                    "**Analogy: The Traffic Light of Quadratic Roots!** 🚦\n\n"
                    "Think of the Discriminant **D = b² - 4ac** as a traffic control light for roots:\n"
                    "- 🟢 **Green Light (D > 0)**: Two distinct roads open! The parabola crosses the X-axis at two separate points (two real and distinct roots).\n"
                    "- 🟡 **Yellow Light (D = 0)**: A single turnaround spot! The parabola just touches the X-axis at one exact point (two equal real roots).\n"
                    "- 🔴 **Red Light (D < 0)**: The bridge is up! The parabola floats in the air and never touches the X-axis (no real roots).\n\n"
                    "📌 **SSLC Exam Tip**: In KSEAB Board papers, questions often ask: 'Find the value of k if roots are equal (b² - 4ac = 0)'."
                )
            else:
                reply = (
                    "**Discriminant (b² - 4ac) & Nature of Roots:**\n\n"
                    "In a standard quadratic equation `ax² + bx + c = 0`:\n"
                    "1. **Case 1: b² - 4ac > 0** → Two distinct real roots.\n"
                    "2. **Case 2: b² - 4ac = 0** → Two equal real roots (x = -b / 2a).\n"
                    "3. **Case 3: b² - 4ac < 0** → No real roots (roots are complex).\n\n"
                    "📌 **Karnataka SSLC High-Yield Rule**: If KSEAB asks 'roots are real and equal', set `b² - 4ac = 0` and solve for the unknown parameter `k`."
                )
    elif "ohm" in msg_lower or "electric" in msg_lower or "resistor" in msg_lower:
        reply = (
            "**Ohm's Law & Resistor Combinations (Karnataka SSLC Science):**\n\n"
            "At constant temperature, potential difference (V) across a conductor is directly proportional to current (I):\n"
            "**V = I × R** (Unit of R is Ohm, Ω)\n\n"
            "**Key Differences in Circuits:**\n"
            "- **Series Combination**: `Rs = R1 + R2 + R3` (Current is identical; Voltage divides)\n"
            "- **Parallel Combination**: `1/Rp = 1/R1 + 1/R2 + 1/R3` (Voltage is identical; Current divides)\n\n"
            "📌 **SSLC Board Exam Alert**: KSEAB frequently tests advantages of parallel circuits in domestic wiring (independent switches, same voltage, failure of one does not break the circuit)."
        )
    else:
        reply = (
            f"Here is a targeted breakdown for your SSLC Class 10 query on **{req.message}**:\n\n"
            f"1. **Core Concept**: Aligned with Karnataka State Board Chapter competencies.\n"
            f"2. **Key Application**: Focus on standard textbook definitions and textbook exercise problems.\n"
            f"3. **Exam Strategy**: Always write the standard formula, show intermediate steps with proper units (e.g., Ω, V, cm²), and enclose your final answer in a box.\n\n"
            f"💡 **Nexa Study Tip**: Would you like to practice a 2-mark or 3-mark model question on this topic?"
        )

    return AIChatResponse(
        reply=reply,
        mode=req.mode,
        language=req.language,
        suggested_followups=[
            "Show me a step-by-step example",
            "Give me a real-life application",
            "Solve a 2024 SSLC Board paper question"
        ],
        karnataka_curriculum_reference="Karnataka SSLC Class 10 Curriculum Guidelines"
    )
