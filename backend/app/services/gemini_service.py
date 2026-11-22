import os
import json
import logging
from typing import List, Dict, Any, Optional
from google import genai
from google.genai import types
from backend.app.core.config import settings

logger = logging.getLogger("gemini_service")

class GeminiAIService:
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY.strip()
        self.client: Optional[genai.Client] = None
        self._init_client()

    def _init_client(self):
        if self.api_key and self.api_key != "your_gemini_api_key_here":
            try:
                self.client = genai.Client(api_key=self.api_key)
                logger.info("Official Google GenAI Python SDK client initialized successfully.")
            except Exception as e:
                logger.warning(f"Google GenAI SDK initialization warning: {e}")
                self.client = None
        else:
            logger.info("GEMINI_API_KEY not configured or placeholder detected; intelligent fallback active.")
            self.client = None

    def is_available(self) -> bool:
        return self.client is not None

    async def chat_with_nexa(
        self,
        message: str,
        subject: str = "Mathematics",
        mode: str = "STEP_BY_STEP",
        language: str = "English",
        history: Optional[List[Dict[str, str]]] = None
    ) -> Dict[str, Any]:
        """
        Nexa AI Tutor Chat powered by Google GenAI Python SDK.
        Strict Karnataka SSLC Class 10 scope enforcement.
        Supports 5 pedagogical modes & multilingual responses (English, Kannada, Hindi).
        """
        mode_upper = mode.upper().replace("-", "_")
        mode_instructions = {
            "BEGINNER": "Explain like a complete beginner using intuitive, real-world everyday analogies. Avoid heavy jargon.",
            "STEP_BY_STEP": "Provide a structured, step-by-step walkthrough. Clearly number each logical milestone with formulas.",
            "EXAM_PREP": "Focus on Karnataka KSEAB board exam patterns, marking rubrics, common traps, and 2-mark/3-mark model answers.",
            "PRACTICE": "Actively guide the student through solving a problem step-by-step, asking them to solve the next sub-step.",
            "QUICK_REVISION": "Give a bulleted high-impact quick revision summary highlighting formulas, definitions, and high-yield SSLC points."
        }
        active_mode_instruction = mode_instructions.get(mode_upper, mode_instructions["STEP_BY_STEP"])

        language_instructions = {
            "English": "Respond in clear, encouraging academic English.",
            "Kannada": "Respond in formal Kannada (ಕನ್ನಡ) script. Put key English technical terms in parentheses, e.g., ವರ್ಗ ಸಮೀಕರಣಗಳು (Quadratic Equations).",
            "Hindi": "Respond in clear Devanagari Hindi (हिंदी). Put key English technical terms in parentheses where helpful."
        }
        lang_instruction = language_instructions.get(language, language_instructions["English"])

        system_instruction = (
            f"You are Nexa AI, a brilliant, warm, and empathetic personal AI study companion and tutor for Karnataka State Board SSLC Class 10 (KSEAB) students.\n"
            f"Subject Context: {subject}\n"
            f"Active Pedagogical Mode: {mode_upper} — {active_mode_instruction}\n"
            f"Language Direction: {lang_instruction}\n\n"
            f"Persona & Conversation Style Guidelines:\n"
            f"1. Conversational & Comfortable: Talk naturally and warmly like Claude or ChatGPT, or a supportive, encouraging top student friend.\n"
            f"2. Natural Greetings: When the student says 'hi', 'hello', or chats casually, respond warmly and conversationally. Do NOT output a stiff syllabus breakdown for simple greetings.\n"
            f"3. Intuitive Explanations: Use real-life analogies, clear step-by-step logic, and intuitive examples that make complex topics click.\n"
            f"4. Supportive & Empathetic: Validate their feelings if they express stress or confusion. Keep their morale high!\n"
            f"5. End with an Engaging Hook: Always conclude with a conversational question or friendly offer to practice a problem together."
        )

        if self.client:
            # Cascade through available Gemini models
            for model_name in ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-1.5-pro"]:
                try:
                    contents = []
                    if history:
                        for h in history[-4:]:
                            role = "user" if h.get("sender") == "user" or h.get("role") == "user" else "model"
                            contents.append(types.Content(
                                role=role,
                                parts=[types.Part.from_text(text=h.get("content") or h.get("parts", ""))]
                            ))
                    contents.append(types.Content(
                        role="user",
                        parts=[types.Part.from_text(text=message)]
                    ))

                    response = self.client.models.generate_content(
                        model=model_name,
                        contents=contents,
                        config=types.GenerateContentConfig(
                            system_instruction=system_instruction,
                            temperature=0.7,
                            max_output_tokens=950
                        )
                    )

                    if response and response.text:
                        return {
                            "reply": response.text.strip(),
                            "mode": mode,
                            "language": language,
                            "suggested_followups": [
                                "Can you give me an example?",
                                "Show me a 2024 SSLC Board question on this",
                                "Explain it in simple everyday words"
                            ],
                            "karnataka_curriculum_reference": f"Karnataka SSLC Class 10 {subject} Curriculum",
                            "powered_by": f"Google Gemini ({model_name})"
                        }
                except Exception as e:
                    logger.debug(f"Google GenAI ({model_name}) query note: {e}")

        # High-Fidelity Conversational SSLC Class 10 Fallback Engine
        return self._offline_tutor_fallback(message, subject, mode, language)

    def _offline_tutor_fallback(self, message: str, subject: str, mode: str, language: str) -> Dict[str, Any]:
        """
        Empathetic, highly conversational, and intuitive dialogue engine.
        Responds naturally like Claude & ChatGPT — friendly, comfortable, and human.
        """
        import re
        msg_l = message.lower().strip()
        clean = re.sub(r"[^\w\s]", "", msg_l).strip()
        words = set(clean.split())

        # -------------------------------------------------------------
        # 1. GREETINGS & CASUAL OPENERS (Hi, Hello, Hey, etc.)
        # -------------------------------------------------------------
        greeting_words = {
            "hi", "hello", "hey", "hlo", "hii", "heyy", "yo", "sup", "howdy",
            "namaste", "namaskara", "namaskar",
            "ನಮಸ್ಕಾರ", "ಹಲೋ", "ನಮಸ್ತೆ",
            "नमस्ते", "प्रणाम", "हेलो"
        }
        indic_greetings = [
            "ನಮಸ್ಕಾರ", "ಹಲೋ", "ನಮಸ್ತೆ", "ಹೇಗಿದ್ದೀರಾ", "ಹೇಗಿದೀರಾ",
            "नमस्ते", "हेलो", "प्रणाम", "कैसे हो", "कैसे हैं आप"
        ]
        is_greeting = clean in [
            "hi", "hello", "hey", "hi there", "hello there", "hey there", "good morning",
            "good afternoon", "good evening", "how are you", "who are you", "whats up",
            "what's up", "wassup", "how r u", "tell me about yourself", "how do you do"
        ] or (bool(words & greeting_words) and len(words) <= 4) or any(g in msg_l for g in indic_greetings)

        if is_greeting:
            if language == "Kannada":
                reply = (
                    "ನಮಸ್ಕಾರ! ಹೇಗಿದ್ದೀರಾ? ನಿಮ್ಮನ್ನು ಭೇಟಿಯಾಗಿದ್ದು ತುಂಬಾ ಸಂತೋಷವಾಯಿತು! 👋😊\n\n"
                    "ನಾನು ನಿಮ್ಮ **ನೆಕ್ಸಾ (Nexa)** — ಕರ್ನಾಟಕ 10ನೇ ತರಗತಿ (SSLC) ಪರೀಕ್ಷಾ ತಯಾರಿಗೆ ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಕಲಿಕಾ ಮಿತ್ರ. "
                    "ಸ್ನೇಹಿತನಂತೆ ನನ್ನೊಂದಿಗೆ ಧೈರ್ಯವಾಗಿ ಮಾತನಾಡಬಹುದು!\n\n"
                    "ಇವತ್ತು ಯಾವ ವಿಷಯ ಅಥವಾ ಪಾಠದ ಬಗ್ಗೆ ಕಲಿಯೋಣ? ಗಣಿತ, ವಿಜ್ಞಾನ, ಸಮಾಜ ವಿಜ್ಞಾನ ಅಥವಾ ಭಾಷೆಗಳಲ್ಲಿ ಯಾವುದೇ ಡೌಟ್ ಇದ್ದರೂ ಕೇಳಿ, "
                    "ನಾವು ಒಟ್ಟಿಗೆ ಸುಲಭವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳೋಣ!"
                )
            elif language == "Hindi":
                reply = (
                    "नमस्ते! कैसे हैं आप? आपसे मिलकर बहुत खुशी हुई! 👋😊\n\n"
                    "मैं हूँ **नेक्ಸಾ (Nexa)** — कर्नाटक बोर्ड क्लास 10 (SSLC) की तैयारी के लिए आपका पर्सनल एआई स्टडी पार्टनर। "
                    "मुझसे आप बिल्कुल एक दोस्त की तरह खुलकर बात कर सकते हैं!\n\n"
                    "आज क्या पढ़ने का मूड है? मैथ्स, साइंस, सोशल साइंस या किसी भाषा में कोई भी डाउट या मुश्किल टॉपिक हो, "
                    "बताइए — हम मिलकर इसे आसान बनाएंगे!"
                )
            else:
                reply = (
                    "Hey there! 👋 Great to see you! How's your day going?\n\n"
                    "I'm **Nexa**, your 24/7 personal study buddy for Karnataka SSLC Class 10. Think of me like a helpful friend who's always around to make studying easier and way less stressful.\n\n"
                    f"Are we working on **{subject}** today, or would you like to explore something else? Whether you have a tricky question, need a concept explained in simple words, or want to practice some board exam problems — I'm right here with you!\n\n"
                    "What's on your mind right now?"
                )
            return {
                "reply": reply,
                "mode": mode,
                "language": language,
                "suggested_followups": [
                    "Let's solve a tricky math problem",
                    "Explain an interesting science concept",
                    "Give me a quick 3-question quiz"
                ],
                "karnataka_curriculum_reference": f"Karnataka SSLC Class 10 {subject}",
                "powered_by": "EduNexa Conversational Engine"
            }

        # -------------------------------------------------------------
        # 2. EMOTIONAL SUPPORT, STRESS & MOTIVATION
        # -------------------------------------------------------------
        stress_indicators = [
            "stress", "anxious", "anxiety", "scared", "fear", "nervous", "tired",
            "exhausted", "bored", "depressed", "give up", "cant do this", "can't do this",
            "fail", "hard to study", "too difficult", "scared of board", "sslc exam fear",
            "i feel overwhelmed", "hate maths", "hate science", "too much syllabus"
        ]
        if any(s in msg_l for s in stress_indicators):
            reply = (
                "Hey, take a deep breath! 💙 I hear you, and honestly, it's completely normal to feel that way.\n\n"
                "Class 10 board exams come with a lot of expectations, and it's easy to look at the entire textbook and feel overwhelmed. But here is the truth that top scorers know:\n\n"
                "✨ **You don't have to master everything in one day.**\n"
                "In Karnataka SSLC, exams follow clear blueprint weightages. When you break big chapters down into small 15-minute bite-sized concepts, everything suddenly becomes manageable.\n\n"
                "How about we do this: forget the whole syllabus for a moment. Pick just **one single, small topic** that felt tricky lately. Let me explain it to you in the simplest way possible, with zero pressure.\n\n"
                "What topic would you like us to conquer first?"
            )
            return {
                "reply": reply,
                "mode": mode,
                "language": language,
                "suggested_followups": [
                    "Help me plan a stress-free daily routine",
                    "What are the highest-scoring chapters in Maths?",
                    "Let's start with something easy and fun"
                ],
                "karnataka_curriculum_reference": "Nexa Wellness & Academic Motivation",
                "powered_by": "EduNexa Conversational Engine"
            }

        # -------------------------------------------------------------
        # 3. CURRICULUM CONCEPTS: INTUITIVE & CONVERSATIONAL EXPLANATIONS
        # -------------------------------------------------------------

        # A) Negative Numbers & Linear Equations
        if any(k in msg_l for k in ["negative", "dividing by a negative", "flip", "-3x", "linear equation"]):
            reply = (
                "Let's make this super intuitive so you never have to memorize it blindly again! 💡\n\n"
                "### Why does multiplying or dividing two negatives make a positive?\n"
                "Think of numbers like walking on a path:\n"
                "- **Positive (+)** means walking **forward**.\n"
                "- **Negative (-)** means walking **backward**.\n\n"
                "Now, imagine you are walking backward (one negative), and someone records a video of you and plays it in **reverse** (a second negative). What does it look like on screen? You look like you're walking **forward**! That's why:\n"
                "$$\\text{Negative} \\times \\text{Negative} = \\text{Positive}$$\n\n"
                "### Let's solve $-3x + 7 = -14$ step-by-step:\n"
                "1. **Isolate the variable term** by moving $+7$ across the equals sign (it becomes $-7$):\n"
                "   $$-3x = -14 - 7$$\n"
                "   $$-3x = -21$$\n"
                "2. **Divide both sides by $-3$**:\n"
                "   $$x = \\frac{-21}{-3}$$\n"
                "3. Since both numbers are negative, the negatives cancel out into a clean positive:\n"
                "   $$\\mathbf{x = 7}$$\n\n"
                "✨ **Quick Sanity Check:** Plug $x = 7$ back in: $-3(7) + 7 = -21 + 7 = -14$. It matches perfectly!\n\n"
                "How does that feel? Would you like to try another equation, or does that click now?"
            )

        # B) Concave vs Convex Mirrors (Spoon Analogy)
        elif any(k in msg_l for k in ["mirror", "spoon", "concave", "convex", "lens", "reflection"]):
            reply = (
                "Here is the coolest everyday trick to remember this for your Karnataka SSLC Science exam — just grab a shiny kitchen spoon! 🥄\n\n"
                "### 1. The Inside of the Spoon = **Concave Mirror**\n"
                "- **How to remember:** Think of a **'cave'** that curves inward.\n"
                "- **What you see:** If you hold it in front of your face, your reflection is **upside down** (inverted real image). As you bring it very close to your eye, suddenly your image becomes right-side up and magnified!\n"
                "- **Where it's used:** Dentist mirrors, solar furnaces, car headlights, and shaving mirrors.\n\n"
                "### 2. The Back (Bulging Outer Side) = **Convex Mirror**\n"
                "- **How to remember:** It **bulges outward** toward you.\n"
                "- **What you see:** Your reflection is always **upright and smaller** (diminished virtual image).\n"
                "- **Where it's used:** Rear-view mirrors in cars and bikes, and security mirrors in shops.\n\n"
                "💡 **High-Yield SSLC 2-Mark Question:**\n"
                "*'Why do vehicles use convex mirrors instead of plane mirrors as rear-view mirrors?'*\n"
                "**Answer:** Because convex mirrors always form an erect, diminished image, which gives the driver a much **wider field of view** of traffic behind them!\n\n"
                "Does this spoon analogy make it easy to picture?"
            )

        # C) Quadratic Equations
        elif any(k in msg_l for k in ["quadratic", "factor", "roots", "discriminant", "b^2 - 4ac", "nature of roots"]):
            reply = (
                "Quadratic Equations are one of the highest-scoring chapters in SSLC Maths! Let's break it down simply. 📐\n\n"
                "Standard form is always:\n"
                "$$ax^2 + bx + c = 0$$\n\n"
                "### The 2 Methods You Must Know for Board Exams:\n\n"
                "**1. The Universal Quadratic Formula:**\n"
                "Whenever factoring looks tough or has decimals, use this golden formula:\n"
                "$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$\n\n"
                "**2. Nature of Roots (Discriminant $\\Delta = b^2 - 4ac$):**\n"
                "Karnataka Board loves asking 1-mark or 2-mark questions on this:\n"
                "- If $b^2 - 4ac > 0$ $\\rightarrow$ **Two distinct real roots**\n"
                "- If $b^2 - 4ac = 0$ $\\rightarrow$ **Two equal real roots** ($x = -b/2a$)\n"
                "- If $b^2 - 4ac < 0$ $\\rightarrow$ **No real roots**\n\n"
                "Want me to solve a problem with you right now, like $2x^2 - 5x + 3 = 0$?"
            )

        # D) Arithmetic Progressions (AP)
        elif any(k in msg_l for k in ["arithmetic progression", "ap", "common difference", "nth term", "sum of ap"]):
            reply = (
                "Think of an Arithmetic Progression like walking up a staircase where every single step has the exact same height! 🪜\n\n"
                "- First step = $a$\n"
                "- Height of each step (common difference) = $d = a_2 - a_1$\n\n"
                "### The 2 Master Formulas:\n"
                "1. **To find any term in the sequence ($n$-th term):**\n"
                "   $$a_n = a + (n - 1)d$$\n"
                "2. **To find the total sum of the first $n$ terms:**\n"
                "   $$S_n = \\frac{n}{2}[2a + (n - 1)d] \\quad \\text{or} \\quad S_n = \\frac{n}{2}[a + l]$$\n"
                "   *(where $l$ is the last term $a_n$)*\n\n"
                "**Quick Example:** In the sequence $3, 7, 11, 15 \\dots$, here $a = 3$ and $d = 4$.\n"
                "Want to find the 20th term? Just plug in:\n"
                "$$a_{20} = 3 + (19 \\times 4) = 3 + 76 = 79$$\n\n"
                "Clean and simple! Would you like to try finding the sum of this sequence?"
            )

        # E) Electricity & Circuits (Physics)
        elif any(k in msg_l for k in ["electricity", "ohm", "circuit", "parallel", "series", "resistance", "joule"]):
            reply = (
                "Electricity is super logical once you picture it as water flowing through pipes! ⚡\n\n"
                "- **Voltage ($V$):** The water pump pressure pushing the current.\n"
                "- **Current ($I$):** The amount of water flowing through per second (Amperes).\n"
                "- **Resistance ($R$):** A narrow pipe restricting the water flow (Ohms, $\\Omega$).\n\n"
                "### 1. Ohm's Law (Guaranteed Board Question):\n"
                "$$V = I \\times R$$\n\n"
                "### 2. Series vs Parallel Circuits:\n"
                "- **Series:** Resistors end-to-end ($R_s = R_1 + R_2 + R_3$). Current is the same everywhere. If one bulb blows, everything turns off!\n"
                "- **Parallel:** Resistors across common points ($\\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2}$). Voltage is the same (220V). If one light turns off, the fan stays on! (This is why homes use parallel wiring).\n\n"
                "💡 **SSLC 3-Mark Tip:** Karnataka examiners always ask: *'Why do we connect domestic electric appliances in parallel rather than in series?'* Keep those 2 points ready!\n\n"
                "Shall we calculate equivalent resistance for a sample circuit?"
            )

        # F) Triangles & Thales Theorem (Geometry)
        elif any(k in msg_l for k in ["triangle", "thales", "bpt", "basic proportionality", "similarity"]):
            reply = (
                "The **Basic Proportionality Theorem (Thales Theorem)** is virtually guaranteed as a 4-mark or 5-mark proof in SSLC Maths! Let's master the intuition. 📐\n\n"
                "### Statement:\n"
                "*'If a line is drawn parallel to one side of a triangle intersecting the other two sides in distinct points, then the other two sides are divided in the same ratio.'*\n\n"
                "In $\\triangle ABC$, if line $DE \\parallel BC$, then:\n"
                "$$\\frac{AD}{DB} = \\frac{AE}{EC}$$\n\n"
                "### The 4 Proof Steps Examiners Look For:\n"
                "1. **Given:** $\\triangle ABC$ where $DE \\parallel BC$.\n"
                "2. **To Prove:** $\\frac{AD}{DB} = \\frac{AE}{EC}$.\n"
                "3. **Construction:** Join $BE$ and $CD$. Draw perpendiculars $EN \\perp AB$ and $DM \\perp AC$.\n"
                "4. **Area Ratio Comparison:** $\\text{Area}(\\triangle ADE) = \\frac{1}{2} \\times \\text{base} \\times \\text{height}$. Compare the areas twice and simplify!\n\n"
                "Would you like me to walk through the complete geometric proof step-by-step?"
            )

        # G) Social Science & History
        elif any(k in msg_l for k in ["advent of europeans", "europeans", "plassey", "buxar", "constitution", "fundamental rights"]):
            reply = (
                "Social Science is all about understanding the storyline! Let's look at this clearly. 🌍\n\n"
                "### Advent of Europeans to India (SSLC History Chapter 1):\n"
                "1. **The Catalyst (1453):** The Ottoman Turks captured Constantinople (the ancient land trade route). This forced Europeans to find a sea route to India for spices.\n"
                "2. **Vasco da Gama (1498):** Portuguese explorer reached Kappad near Calicut, opening the direct sea route.\n"
                "3. **Chronology of European Powers:**\n"
                "   Portuguese $\\rightarrow$ Dutch $\\rightarrow$ English $\\rightarrow$ French\n"
                "4. **British Supremacy:**\n"
                "   - **Battle of Plassey (1757):** Robert Clive defeated Siraj-ud-Daula via Mir Jafar's treachery.\n"
                "   - **Battle of Buxar (1764):** Hector Munro defeated the combined forces of Mir Qasim, Shuja-ud-Daula, and Shah Alam II, securing Diwani rights for the British.\n\n"
                "💡 **SSLC Exam Tip:** Questions often ask for: *'Causes and Results of Battle of Buxar'* — memorize the 3 Diwani provinces granted (Bengal, Bihar, Odisha)!\n\n"
                "What's the next topic in history or civics you'd like to look at?"
            )

        # H) General Question Fallback (Friendly, Claude/ChatGPT-style)
        else:
            reply = (
                f"That's a great question about **{message}**! Let's explore it clearly together. 🌟\n\n"
                f"When studying **{subject}** for Karnataka SSLC Class 10, the most important thing is connecting the core concept to how examiners test it on the board paper.\n\n"
                f"### Here is how to think about this:\n"
                f"1. **The Core Idea:** Break the question down into what you're given vs. what you need to find.\n"
                f"2. **Step-by-Step Logic:** Write down the standard formula or definition first. Karnataka board examiners award partial marks for every single valid step!\n"
                f"3. **Common Pitfall to Avoid:** Double check sign conventions and always include standard units in your final answer.\n\n"
                f"💡 **SSLC Board Tip:** Would you like me to show you a standard 2-mark model question or solve a specific example on this together?"
            )

        return {
            "reply": reply,
            "mode": mode,
            "language": language,
            "suggested_followups": [
                "Can you give me an example?",
                "Show me a 2024 SSLC Board question on this",
                "Explain it in simple everyday words"
            ],
            "karnataka_curriculum_reference": f"Karnataka SSLC Class 10 {subject}",
            "powered_by": "EduNexa Conversational Engine"
        }

    async def diagnose_learning_gaps(
        self,
        subject: str,
        chapter: str,
        quiz_responses: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """
        Diagnoses root causes behind test mistakes using Gemini AI with prerequisite knowledge graphs.
        """
        incorrect = [q for q in quiz_responses if not q.get("isCorrect")]
        accuracy = round(((len(quiz_responses) - len(incorrect)) / max(len(quiz_responses), 1)) * 100)

        if self.client:
            try:
                prompt = (
                    f"You are the EduNexa AI Learning Gap Diagnostic Engine for Karnataka SSLC Class 10.\n"
                    f"Subject: '{subject}', Chapter: '{chapter}'. Student Accuracy: {accuracy}%.\n"
                    f"Student Responses:\n{json.dumps(quiz_responses, indent=2)}\n\n"
                    f"Diagnose the ROOT CAUSE conceptual blocker. Return STRICT JSON conforming to:\n"
                    f'{{\n'
                    f'  "weakTopics": [\n'
                    f'    {{\n'
                    f'      "topic": "string",\n'
                    f'      "chapter": "{chapter}",\n'
                    f'      "subject": "{subject}",\n'
                    f'      "accuracyScore": {accuracy},\n'
                    f'      "severity": "CRITICAL" | "MODERATE" | "MILD",\n'
                    f'      "identifiedGap": "string describing root cause",\n'
                    f'      "prerequisiteWeakness": "string naming foundational prerequisite",\n'
                    f'      "evidence": "string citing student error",\n'
                    f'      "revisionSteps": ["Step 1", "Step 2", "Step 3", "Step 4"]\n'
                    f'    }}\n'
                    f'  ],\n'
                    f'  "overallDiagnosis": "string (2-3 sentences)",\n'
                    f'  "recommendedFocus": "string (1 actionable sentence)"\n'
                    f'}}'
                )

                response = self.client.models.generate_content(
                    model="gemini-2.5-flash",
                    contents=[prompt],
                    config=types.GenerateContentConfig(
                        temperature=0.2,
                        response_mime_type="application/json"
                    )
                )

                if response and response.text:
                    clean_text = response.text.replace("```json", "").replace("```", "").strip()
                    return json.loads(clean_text)
            except Exception as e:
                logger.warning(f"Gemini diagnostic fallback: {e}")

        # Robust Pedagogical Rule-Based Fallback
        detected_topics = list({q.get("topic", "Core Fundamentals") for q in incorrect}) or ["Foundational Fluency"]
        weak_topics = []
        for t in detected_topics:
            matching = [q for q in incorrect if q.get("topic") == t]
            prereq = matching[0].get("prerequisite") if matching else "Foundational arithmetic and conceptual definitions"
            ev = f"Incorrect answer on: '{matching[0].get('question')}'" if matching else "Accuracy below SSLC target threshold"
            sev = "CRITICAL" if accuracy < 50 else ("MODERATE" if accuracy < 75 else "MILD")
            weak_topics.append({
                "topic": t,
                "chapter": chapter,
                "subject": subject,
                "accuracyScore": max(30, accuracy - 10),
                "severity": sev,
                "identifiedGap": f"Difficulty applying core {t} principles when sign rules or inverse transformations are required.",
                "prerequisiteWeakness": prereq or "Foundational Class 9 Competencies",
                "evidence": ev,
                "revisionSteps": [
                    f"Step 1: 15-minute conceptual recap of {prereq}.",
                    "Step 2: Guided practice with immediate feedback on 3 foundational sub-problems.",
                    "Step 3: Self-paced 5-question mastery checkpoint.",
                    "Step 4: Real-time discussion with Nexa AI Tutor."
                ]
            })

        return {
            "weakTopics": weak_topics,
            "overallDiagnosis": f"The diagnostic indicates that the primary difficulty in {chapter} stems from foundational prerequisite concepts ({weak_topics[0]['prerequisiteWeakness'] if weak_topics else 'arithmetic rules'}).",
            "recommendedFocus": "Dedicate 45 minutes to prerequisite remediation before taking another chapter test."
        }

    async def generate_study_plan(
        self,
        daily_hours: float,
        exam_date: str,
        weak_subjects: List[str],
        strong_subjects: List[str]
    ) -> Dict[str, Any]:
        """Generates an adaptive timetable prioritizing weak subjects."""
        days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        tasks = []
        task_id = 1

        weekday_slots = [
            ("04:30 PM - 05:30 PM", "PREREQUISITE_FIX", 60, "HIGH"),
            ("05:45 PM - 06:45 PM", "CONCEPT_REVIEW", 60, "MEDIUM"),
            ("07:30 PM - 08:30 PM", "PRACTICE_QUIZ", 60, "HIGH"),
            ("09:00 PM - 09:45 PM", "ACTIVE_RECALL", 45, "MEDIUM")
        ]

        weekend_slots = [
            ("08:30 AM - 10:00 AM", "CONCEPT_REVIEW", 90, "HIGH"),
            ("10:30 AM - 12:00 PM", "PRACTICE_QUIZ", 90, "HIGH"),
            ("04:00 PM - 05:30 PM", "PREREQUISITE_FIX", 90, "HIGH"),
            ("06:30 PM - 08:00 PM", "ACTIVE_RECALL", 90, "MEDIUM")
        ]

        target_subs = weak_subjects if weak_subjects else ["Mathematics", "Science", "Social Science"]

        for day in days:
            slots = weekend_slots if day in ["Saturday", "Sunday"] else weekday_slots
            for slot_time, slot_type, duration, priority in slots:
                sub = target_subs[task_id % len(target_subs)]
                topic_title = f"{sub}: Prerequisite Remediation & SSLC Drill" if slot_type == "PREREQUISITE_FIX" else f"{sub}: Chapter Concept Mastery"
                tasks.append({
                    "id": f"task-plan-{task_id}",
                    "day": day,
                    "timeSlot": slot_time,
                    "subject": sub,
                    "topic": topic_title,
                    "type": slot_type,
                    "durationMinutes": duration,
                    "completed": False,
                    "priority": priority
                })
                task_id += 1

        return {
            "success": True,
            "weeklyTargetHours": round(daily_hours * 7, 1),
            "dailyGoalHours": daily_hours,
            "examDate": exam_date,
            "tasks": tasks
        }

gemini_service = GeminiAIService()
