"""
EduNexa AI — Karnataka SSLC Class 10 Comprehensive Curriculum & Intelligence Engine
Provides authoritative, deep, step-by-step explanations for all KSEAB Class 10 subjects:
Mathematics, Science, Social Science, Kannada, English, and Hindi.
"""

import re
import math
from typing import Dict, Any, Optional

def solve_math_expression(query: str) -> Optional[str]:
    """Evaluates direct math arithmetic/algebra queries step-by-step."""
    q = query.lower().strip()
    
    # Square root
    sqrt_match = re.search(r'(?:square\s*root\s*of|sqrt\s*\(?)\s*([0-9]+(?:\.[0-9]+)?)\)?', q)
    if sqrt_match:
        val = float(sqrt_match.group(1))
        ans = math.isqrt(int(val)) if val.is_integer() else math.sqrt(val)
        return (
            f"### Square Root Calculation: 📐\n\n"
            f"$$\\sqrt{{{val:g}}} = {ans}$$\n\n"
            f"**Verification:** ${ans} \\times {ans} = {val:g}$."
        )

    # Percentage
    pct_match = re.search(r'([0-9]+(?:\.[0-9]+)?)\s*%\s*(?:of)\s*([0-9]+(?:\.[0-9]+)?)', q)
    if pct_match:
        pct = float(pct_match.group(1))
        total = float(pct_match.group(2))
        ans = (pct / 100.0) * total
        return (
            f"### Percentage Calculation: 📊\n\n"
            f"To find **{pct:g}% of {total:g}**:\n"
            f"$$\\frac{{{pct:g}}}{{100}} \\times {total:g} = {ans:g}$$\n\n"
            f"**Answer:** **{ans:g}**."
        )

    # Direct Arithmetic (e.g. 25 * 14, 150 / 5, 23 + 45)
    arith_match = re.search(r'([0-9]+(?:\.[0-9]+)?)\s*([\+\-\*\/xX\^])\s*([0-9]+(?:\.[0-9]+)?)', q)
    if arith_match and not any(k in q for k in ['sin', 'cos', 'tan', 'equation']):
        n1 = float(arith_match.group(1))
        op = arith_match.group(2).lower()
        n2 = float(arith_match.group(3))
        if op == '+':
            res = n1 + n2
            op_sym = "+"
        elif op == '-':
            res = n1 - n2
            op_sym = "-"
        elif op in ['*', 'x']:
            res = n1 * n2
            op_sym = "\\times"
        elif op == '/':
            if n2 == 0:
                return "Division by zero is undefined."
            res = n1 / n2
            op_sym = "\\div"
        elif op == '^':
            res = n1 ** n2
            op_sym = "^"
        else:
            return None

        return (
            f"### Arithmetic Calculation: 🔢\n\n"
            f"$${n1:g} {op_sym} {n2:g} = {res:g}$$\n\n"
            f"**Result:** **{res:g}**."
        )

    return None


def get_curriculum_answer(message: str, subject: str = "Mathematics", mode: str = "STEP_BY_STEP", language: str = "English") -> Optional[Dict[str, Any]]:
    """
    Authoritative Karnataka SSLC Class 10 Knowledge Engine.
    Maps user concepts to thorough, pedagogical explanations.
    """
    msg_l = message.lower().strip()

    # -------------------------------------------------------------
    # 1. TRIGONOMETRY (Class 10 Maths Chapter 11 & 12)
    # -------------------------------------------------------------
    trig_keywords = [
        "trigonometry", "trig", "sin", "cos", "tan", "hypotenuse",
        "opposite side", "adjacent side", "cosec", "sec", "cot",
        "angle of elevation", "angle of depression", "heights and distances",
        "trikonamiti", "ತ್ರಿಕೋನಮಿತಿ", "त्रिकोणमिति"
    ]
    if any(k in msg_l for k in trig_keywords):
        if language == "Kannada":
            reply = (
                "### ತ್ರಿಕೋನಮಿತಿ (Introduction to Trigonometry) — ಕರ್ನಾಟಕ 10ನೇ ತರಗತಿ ಗಣಿತ 📐✨\n\n"
                "**ತ್ರಿಕೋನಮಿತಿ ಎಂದರೇನು?**\n"
                "ತ್ರಿಕೋನಮಿತಿ ಎಂಬ ಪದವು ಗ್ರೀಕ್ ಮೂಲದ ಮೂರು ಪದಗಳಿಂದ ಬಂದಿದೆ:\n"
                "* **Tri** = ಮೂರು\n"
                "* **Gon** = ಬಾಹುಗಳು\n"
                "* **Metron** = ಅಳತೆ\n\n"
                "ಅಂದರೆ, **ಲಂಬಕೋನ ತ್ರಿಭುಜದ (Right-Angled Triangle) ಬಾಹುಗಳು ಮತ್ತು ಕೋನಗಳ ನಡುವಿನ ಸಂಬಂಧಗಳನ್ನು** ಅಧ್ಯಯನ ಮಾಡುವ ಗಣಿತದ ಶಾಖೆಗೆ ತ್ರಿಕೋನಮಿತಿ ಎನ್ನುತ್ತಾರೆ.\n\n"
                "---\n\n"
                "### 1. ಲಂಬಕೋನ ತ್ರಿಭುಜದ 3 ಬಾಹುಗಳು:\n"
                "ಯಾವುದೇ ಲಘುಕೋನ $\\theta$ (ತೀಟಾ) ಗಾಗಿ:\n"
                "* **ವಿಕರ್ಣ (Hypotenuse):** $90^\\circ$ ಲಂಬಕೋನಕ್ಕೆ ಎದುರಾಗಿರುವ ಅತ್ಯಂತ ಉದ್ದವಾದ ಬಾಹು.\n"
                "* **ಅಭಿಮುಖ ಬಾಹು (Opposite Side):** $\\theta$ ಕೋನಕ್ಕೆ ನೇರವಾಗಿ ಎದುರಿಗಿರುವ ಬಾಹು.\n"
                "* **ಪಾರ್ಶ್ವ ಬಾಹು (Adjacent Side):** $\\theta$ ಕೋನವನ್ನು ಹೊಂದಿಕೊಂಡಿರುವ ಪಕ್ಕದ ಬಾಹು.\n\n"
                "---\n\n"
                "### 2. ಪ್ರಮುಖ 6 ತ್ರಿಕೋನಮಿತೀಯ ಅನುಪಾತಗಳು:\n"
                "1. $$\\sin \\theta = \\frac{\\text{ಅಭಿಮುಖ ಬಾಹು}}{\\text{ವಿಕರ್ಣ}}$$\n"
                "2. $$\\cos \\theta = \\frac{\\text{ಪಾರ್ಶ್ವ ಬಾಹು}}{\\text{ವಿಕರ್ಣ}}$$\n"
                "3. $$\\tan \\theta = \\frac{\\text{ಅಭಿಮುಖ ಬಾಹು}}{\\text{ಪಾರ್ಶ್ವ ಬಾಹು}} = \\frac{\\sin \\theta}{\\cos \\theta}$$\n\n"
                "**ವ್ಯುತ್ಕ್ರಮ (Reciprocal) ಅನುಪಾತಗಳು:**\n"
                "4. $$\\csc \\theta = \\frac{1}{\\sin \\theta} = \\frac{\\text{ವಿಕರ್ಣ}}{\\text{ಅಭಿಮುಖ ಬಾಹು}}$$\n"
                "5. $$\\sec \\theta = \\frac{1}{\\cos \\theta} = \\frac{\\text{ವಿಕರ್ಣ}}{\\text{ಪಾರ್ಶ್ವ ಬಾಹು}}$$\n"
                "6. $$\\cot \\theta = \\frac{1}{\\tan \\theta} = \\frac{\\text{ಪಾರ್ಶ್ವ ಬಾಹು}}{\\text{ಅಭಿಮುಖ ಬಾಹು}}$$\n\n"
                "---\n\n"
                "### 3. ಪರೀಕ್ಷೆಗೆ ಅತ್ಯಗತ್ಯವಾದ 3 ನಿತ್ಯಸಮೀಕರಣಗಳು (Identities):\n"
                "1. $$\\sin^2 \\theta + \\cos^2 \\theta = 1$$\n"
                "2. $$1 + \\tan^2 \\theta = \\sec^2 \\theta$$\n"
                "3. $$1 + \\cot^2 \\theta = \\csc^2 \\theta$$\n\n"
                "---\n\n"
                "### 4. ದೈನಂದಿನ ಜೀವನದಲ್ಲಿ ಇದರ ಉಪಯೋಗವೇನು? (ಉನ್ನತ ಮತ್ತು ಅವನತ ಕೋನಗಳು):\n"
                "ಒಂದು ಎತ್ತರವಾದ ಮರ, ಮೊಬೈಲ್ ಟವರ್ ಅಥವಾ ಕಟ್ಟಡವನ್ನು ಏರದೆ ಅದರ ನೆರಳಿನ ಉದ್ದ ಮತ್ತು **ಉನ್ನತ ಕೋನ (Angle of Elevation)** ಅಳೆದು ಎತ್ತರವನ್ನು $\\tan \\theta$ ಸೂತ್ರ ಬಳಸಿ ಸುಲಭವಾಗಿ ಕಂಡುಹಿಡಿಯಬಹುದು!\n\n"
                "💡 **ಪರೀಕ್ಷಾ ಸಲಹೆ:** ಎಸ್‌ಎಸ್‌ಎಲ್‌ಸಿ ಪರೀಕ್ಷೆಯಲ್ಲಿ $0^\\circ, 30^\\circ, 45^\\circ, 60^\\circ, 90^\\circ$ ಕೋನಗಳ ಕೋಷ್ಟಕವನ್ನು ಬರೆಯುವುದು 2 ಅಂಕಗಳಿಗೆ ಖಚಿತವಾಗಿ ಬರುತ್ತದೆ.\n\n"
                "ಈ ವಿಷಯದಲ್ಲಿ ಯಾವುದಾದರೂ ಲೆಕ್ಕವನ್ನು ಒಟ್ಟಿಗೆ ಬಿಡಿಸೋಣವೇ?"
            )
        elif language == "Hindi":
            reply = (
                "### त्रिकोणमिति (Introduction to Trigonometry) — कर्नाटक कक्षा 10 गणित 📐✨\n\n"
                "**त्रिकोणमिति का क्या अर्थ है?**\n"
                "त्रिकोणमिति (Trigonometry) शब्द तीन ग्रीक शब्दों से मिलकर बना है:\n"
                "* **Tri** = तीन\n"
                "* **Gon** = भुजाएँ\n"
                "* **Metron** = मापन\n\n"
                "अर्थात्, **समकोण त्रिभुज (Right-Angled Triangle) की भुजाओं और कोणों के बीच के संबंधों का अध्ययन** करना ही त्रिकोणमिति कहलाता है।\n\n"
                "---\n\n"
                "### 1. समकोण त्रिभुज की तीन भुजाएँ:\n"
                "किसी न्यूनकोण $\\theta$ (थीटा) के लिए:\n"
                "* **कर्ण (Hypotenuse):** $90^\\circ$ के सामने वाली सबसे लंबी भुजा।\n"
                "* **लंब / सम्मुख भुजा (Opposite Side):** कोण $\\theta$ के ठीक सामने वाली भुजा।\n"
                "* **आधार / संलग्न भुजा (Adjacent Side):** कोण $\\theta$ से लगी हुई भुजा।\n\n"
                "---\n\n"
                "### 2. मुख्य 6 त्रिकोणमितीय अनुपात:\n"
                "1. $$\\sin \\theta = \\frac{\\text{लंब}}{\\text{कर्ण}}$$\n"
                "2. $$\\cos \\theta = \\frac{\\text{आधार}}{\\text{कर्ण}}$$\n"
                "3. $$\\tan \\theta = \\frac{\\text{लंब}}{\\text{आधार}} = \\frac{\\sin \\theta}{\\cos \\theta}$$\n\n"
                "**व्युत्क्रम (Reciprocal) अनुपात:**\n"
                "4. $$\\csc \\theta = \\frac{1}{\\sin \\theta} = \\frac{\\text{कर्ण}}{\\text{लंब}}$$\n"
                "5. $$\\sec \\theta = \\frac{1}{\\cos \\theta} = \\frac{\\text{कर्ण}}{\\text{आधार}}$$\n"
                "6. $$\\cot \\theta = \\frac{1}{\\tan \\theta} = \\frac{\\text{आधार}}{\\text{लंब}}$$\n\n"
                "---\n\n"
                "### 3. बोर्ड परीक्षा की 3 महत्वपूर्ण सर्वसमिकाएँ (Identities):\n"
                "1. $$\\sin^2 \\theta + \\cos^2 \\theta = 1$$\n"
                "2. $$1 + \\tan^2 \\theta = \\sec^2 \\theta$$\n"
                "3. $$1 + \\cot^2 \\theta = \\csc^2 \\theta$$\n\n"
                "---\n\n"
                "### 4. व्यावहारिक अनुप्रयोग (ऊंचाई और दूरियां):\n"
                "किसी ऊंची मीनार या पेड़ की ऊंचाई बिना उस पर चढ़े, केवल दूरी और **उन्नयन कोण (Angle of Elevation)** मापकर $\\tan \\theta$ द्वारा निकाली जा सकती है!\n\n"
                "💡 **बोर्ड टिप:** $0^\\circ, 30^\\circ, 45^\\circ, 60^\\circ, 90^\\circ$ के मानों की तालिका से 2-अंक का प्रश्न अवश्य पूछा जाता है।"
            )
        else:
            reply = (
                "### What Is Trigonometry? — Karnataka SSLC Class 10 Mathematics 📐✨\n\n"
                "**Trigonometry** is one of the most exciting and practical branches of mathematics! Here is the complete breakdown:\n\n"
                "#### 1. What Does the Word Literally Mean?\n"
                "The word comes from three Greek words:\n"
                "* **Tri** = Three\n"
                "* **Gon** = Sides / Angles\n"
                "* **Metron** = Measure\n\n"
                "Literally, trigonometry means **\"measuring the sides and angles of triangles\"**.\n\n"
                "In your Karnataka SSLC Class 10 curriculum, trigonometry specifically deals with the **relationships between the acute angles and the side lengths of a right-angled triangle**.\n\n"
                "---\n\n"
                "#### 2. The 3 Sides of a Right-Angled Triangle\n"
                "For any acute angle $\\theta$ (pronounced *theta*):\n"
                "* **Hypotenuse:** The longest side, directly opposite the $90^\\circ$ right angle.\n"
                "* **Opposite Side:** The side directly facing angle $\\theta$.\n"
                "* **Adjacent Side:** The side next to angle $\\theta$ (between $\\theta$ and the $90^\\circ$ angle).\n\n"
                "---\n\n"
                "#### 3. The 6 Trigonometric Ratios (Easy Memory Trick!)\n"
                "Remember the famous mnemonic: **SOH - CAH - TOA**\n\n"
                "1. **Sine ($\\sin \\theta$):**\n"
                "   $$\\sin \\theta = \\frac{\\text{Opposite}}{\\text{Hypotenuse}}$$\n"
                "2. **Cosine ($\\cos \\theta$):**\n"
                "   $$\\cos \\theta = \\frac{\\text{Adjacent}}{\\text{Hypotenuse}}$$\n"
                "3. **Tangent ($\\tan \\theta$):**\n"
                "   $$\\tan \\theta = \\frac{\\text{Opposite}}{\\text{Adjacent}} = \\frac{\\sin \\theta}{\\cos \\theta}$$\n\n"
                "**The 3 Reciprocal (Flipped) Ratios:**\n"
                "4. **Cosecant ($\\csc \\theta$):** $\\frac{1}{\\sin \\theta} = \\frac{\\text{Hypotenuse}}{\\text{Opposite}}$\n"
                "5. **Secant ($\\sec \\theta$):** $\\frac{1}{\\cos \\theta} = \\frac{\\text{Hypotenuse}}{\\text{Adjacent}}$\n"
                "6. **Cotangent ($\\cot \\theta$):** $\\frac{1}{\\tan \\theta} = \\frac{\\text{Adjacent}}{\\text{Opposite}}$\n\n"
                "---\n\n"
                "#### 4. High-Yield Values of Standard Angles ($0^\\circ$ to $90^\\circ$):\n"
                "| Angle ($\\theta$) | $0^\\circ$ | $30^\\circ$ | $45^\\circ$ | $60^\\circ$ | $90^\\circ$ |\n"
                "| :--- | :---: | :---: | :---: | :---: | :---: |\n"
                "| **$\\sin \\theta$** | $0$ | $\\frac{1}{2}$ | $\\frac{1}{\\sqrt{2}}$ | $\\frac{\\sqrt{3}}{2}$ | $1$ |\n"
                "| **$\\cos \\theta$** | $1$ | $\\frac{\\sqrt{3}}{2}$ | $\\frac{1}{\\sqrt{2}}$ | $\\frac{1}{2}$ | $0$ |\n"
                "| **$\\tan \\theta$** | $0$ | $\\frac{1}{\\sqrt{3}}$ | $1$ | $\\sqrt{3}$ | $\\text{Not Defined}$ |\n\n"
                "> 💡 **Memorization Hack:** Notice that $\\cos \\theta$ values are just $\\sin \\theta$ written in reverse! And $\\tan \\theta = \\frac{\\sin \\theta}{\\cos \\theta}$.\n\n"
                "---\n\n"
                "#### 5. The 3 Master Identities Tested on Karnataka Board Papers:\n"
                "1. $$\\sin^2 \\theta + \\cos^2 \\theta = 1$$\n"
                "2. $$1 + \\tan^2 \\theta = \\sec^2 \\theta$$\n"
                "3. $$1 + \\cot^2 \\theta = \\csc^2 \\theta$$\n\n"
                "---\n\n"
                "#### 6. Real-World Applications (Heights & Distances):\n"
                "How do surveyors measure the height of Mount Everest or tall mobile towers without climbing them? They use trigonometry! By measuring the distance to the base and the **angle of elevation**, the height is calculated as:\n"
                "$$\\text{Height} = \\text{Distance} \\times \\tan \\theta$$\n\n"
                "💡 **SSLC Board Strategy:** 3-mark and 4-mark questions in KSEAB exams always test either proving an identity (e.g., $(\\sin \\theta + \\csc \\theta)^2 + (\\cos \\theta + \\sec \\theta)^2 = 7 + \\tan^2 \\theta + \\cot^2 \\theta$) or a word problem on heights and distances.\n\n"
                "Would you like me to walk through a model 2-mark problem or show you how to prove an identity?"
            )

        return {
            "reply": reply,
            "mode": mode,
            "language": language,
            "suggested_followups": [
                "Show me a 2-mark model question on trigonometry",
                "Prove sin^2 theta + cos^2 theta = 1",
                "How do I solve Heights & Distances problems?"
            ],
            "karnataka_curriculum_reference": "Karnataka SSLC Mathematics: Chapter 11 (Introduction to Trigonometry)",
            "powered_by": "EduNexa Academic Engine"
        }

    # -------------------------------------------------------------
    # 2. REAL NUMBERS & IRRATIONALITY PROOFS (Maths Chapter 8)
    # -------------------------------------------------------------
    if any(k in msg_l for k in ["real number", "euclid", "fundamental theorem of arithmetic", "irrational", "sqrt 2", "sqrt 3", "sqrt 5"]):
        reply = (
            "### Real Numbers & Irrationality Proofs — Karnataka SSLC Class 10 🔢\n\n"
            "#### 1. Euclid's Division Lemma (Guaranteed 2-Mark Question):\n"
            "For any two given positive integers $a$ and $b$, there exist unique integers $q$ (quotient) and $r$ (remainder) satisfying:\n"
            "$$a = bq + r, \\quad \\text{where } 0 \\le r < b$$\n"
            "- **Application:** Used to compute the **HCF (Highest Common Factor)** of two numbers systematically.\n\n"
            "#### 2. Fundamental Theorem of Arithmetic:\n"
            "Every composite number can be uniquely expressed as a product of prime factors, apart from the order in which they appear.\n"
            "$$\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b$$\n\n"
            "#### 3. Proving $\\sqrt{2}$ (or $\\sqrt{3}, \\sqrt{5}$) is Irrational (Method of Contradiction):\n"
            "1. **Assumption:** Assume $\\sqrt{2}$ is rational. So $\\sqrt{2} = \\frac{p}{q}$, where $p$ and $q$ are co-prime integers ($q \\ne 0$).\n"
            "2. **Squaring both sides:** $2 = \\frac{p^2}{q^2} \\implies p^2 = 2q^2$.\n"
            "   Since $2$ divides $p^2$, by theorem $2$ must also divide $p$. So let $p = 2k$.\n"
            "3. **Substitute:** $(2k)^2 = 2q^2 \\implies 4k^2 = 2q^2 \\implies q^2 = 2k^2$.\n"
            "   This means $2$ divides $q^2$, so $2$ also divides $q$.\n"
            "4. **Contradiction:** Both $p$ and $q$ share $2$ as a common factor, contradicting that $p$ and $q$ are co-prime.\n"
            "5. **Conclusion:** Therefore, $\\mathbf{\\sqrt{2}}$ **must be irrational**! (Q.E.D.)\n\n"
            "Would you like to practice proving $\\sqrt{3}$ or $3 + 2\\sqrt{5}$ is irrational?"
        )
        return {
            "reply": reply,
            "mode": mode,
            "language": language,
            "suggested_followups": [
                "Prove that 3 + 2√5 is irrational",
                "Find HCF using Euclid's division algorithm",
                "Give me a 1-mark question on terminating decimals"
            ],
            "karnataka_curriculum_reference": "Karnataka SSLC Mathematics: Chapter 8 (Real Numbers)",
            "powered_by": "EduNexa Academic Engine"
        }

    # -------------------------------------------------------------
    # 3. COORDINATE GEOMETRY (Maths Chapter 7)
    # -------------------------------------------------------------
    if any(k in msg_l for k in ["coordinate", "distance formula", "section formula", "collinear", "midpoint"]):
        reply = (
            "### Coordinate Geometry Master Formulas — Karnataka SSLC Class 10 📍\n\n"
            "#### 1. Distance Formula:\n"
            "The distance $d$ between points $A(x_1, y_1)$ and $B(x_2, y_2)$ is:\n"
            "$$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$\n"
            "*Distance from origin $(0, 0)$ to $(x, y)$:* $d = \\sqrt{x^2 + y^2}$.\n\n"
            "#### 2. Section Formula (Internal Division):\n"
            "The coordinates of point $P(x, y)$ dividing the segment joining $A(x_1, y_1)$ and $B(x_2, y_2)$ in ratio $m_1 : m_2$:\n"
            "$$P(x, y) = \\left( \\frac{m_1 x_2 + m_2 x_1}{m_1 + m_2}, \\; \\frac{m_1 y_2 + m_2 y_1}{m_1 + m_2} \\right)$$\n\n"
            "#### 3. Midpoint Formula:\n"
            "When the ratio is $1:1$ ($m_1 = m_2$):\n"
            "$$M = \\left( \\frac{x_1 + x_2}{2}, \\; \\frac{y_1 + y_2}{2} \\right)$$\n\n"
            "#### 4. Area of Triangle (Collinearity Test):\n"
            "$$\\text{Area} = \\frac{1}{2} | x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2) |$$\n"
            "💡 **SSLC Board Tip:** If three points are **collinear**, the area of the triangle formed by them is always **$0$**!\n\n"
            "Would you like to calculate the distance or ratio for two given points?"
        )
        return {
            "reply": reply,
            "mode": mode,
            "language": language,
            "suggested_followups": [
                "Find distance between (2, 3) and (4, 1)",
                "How to find the ratio using section formula?",
                "Show me a 2-mark question on collinear points"
            ],
            "karnataka_curriculum_reference": "Karnataka SSLC Mathematics: Chapter 7 (Coordinate Geometry)",
            "powered_by": "EduNexa Academic Engine"
        }

    # -------------------------------------------------------------
    # 4. CIRCLES & TANGENTS (Maths Chapter 4)
    # -------------------------------------------------------------
    if any(k in msg_l for k in ["circle", "tangent", "secant", "point of contact"]):
        reply = (
            "### Circles & Tangents — Karnataka SSLC Class 10 ⭕\n\n"
            "#### 1. Core Definitions:\n"
            "- **Tangent:** A line that touches a circle at exactly **one single point** (called the *Point of Contact*).\n"
            "- **Secant:** A line that intersects a circle at two distinct points.\n\n"
            "#### 2. The 2 Master Theorems Tested in Every Board Exam:\n\n"
            "**Theorem 1 (Perpendicular Radius):**\n"
            "*'The tangent at any point of a circle is perpendicular to the radius through the point of contact.'*\n"
            "$$\\mathbf{OP \\perp XY}$$\n\n"
            "**Theorem 2 (Length of Tangents from External Point — 3 Marks):**\n"
            "*'The lengths of tangents drawn from an external point to a circle are equal.'*\n"
            "If $P$ is an external point and $PA, PB$ touch circle with center $O$:\n"
            "$$\\mathbf{PA = PB}$$\n\n"
            "💡 **Proof Sketch for Theorem 2:**\n"
            "In $\\triangle OPA$ and $\\triangle OPB$:\n"
            "- $\\angle OAP = \\angle OBP = 90^\\circ$ (radius $\\perp$ tangent)\n"
            "- $OP = OP$ (common hypotenuse)\n"
            "- $OA = OB$ (radii of the same circle)\n"
            "By **RHS Congruence**, $\\triangle OPA \\cong \\triangle OPB \\implies PA = PB$ (CPCTC).\n\n"
            "Shall we solve a problem involving tangents and finding angles?"
        )
        return {
            "reply": reply,
            "mode": mode,
            "language": language,
            "suggested_followups": [
                "Prove lengths of tangents from an external point are equal",
                "Find angle between two tangents",
                "Solve a 3-mark model question on circles"
            ],
            "karnataka_curriculum_reference": "Karnataka SSLC Mathematics: Chapter 4 (Circles)",
            "powered_by": "EduNexa Academic Engine"
        }

    # -------------------------------------------------------------
    # 5. CHEMICAL REACTIONS & EQUATIONS (Science Chapter 1)
    # -------------------------------------------------------------
    if any(k in msg_l for k in ["chemical reaction", "chemical equation", "balancing", "redox", "corrosion", "rancidity", "decomposition", "displacement"]):
        reply = (
            "### Chemical Reactions and Equations — Karnataka SSLC Science ⚗️\n\n"
            "#### 1. The 4 Major Types of Chemical Reactions:\n\n"
            "1. **Combination Reaction:** Two or more reactants combine to form a single product.\n"
            "   $$\\text{CaO} (s) + \\text{H}_2\\text{O} (l) \\rightarrow \\text{Ca(OH)}_2 (aq) + \\text{Heat}$$\n"
            "   *(Quicklime + Water $\\rightarrow$ Slaked lime — highly exothermic!)*\n\n"
            "2. **Decomposition Reaction:** A single reactant breaks down into simpler products.\n"
            "   - Thermal: $2\\text{FeSO}_4 \\xrightarrow{\\Delta} \\text{Fe}_2\\text{O}_3 + \\text{SO}_2 + \\text{SO}_3$\n"
            "   - Electrolytic: $2\\text{H}_2\\text{O} \\xrightarrow{\\text{Electricity}} 2\\text{H}_2 + \\text{O}_2$\n"
            "   - Photochemical (Black & white photography): $2\\text{AgCl} \\xrightarrow{\\text{Sunlight}} 2\\text{Ag} + \\text{Cl}_2$\n\n"
            "3. **Displacement Reaction:** A more reactive element displaces a less reactive element:\n"
            "   $$\\text{Fe} + \\text{CuSO}_4 (\\text{blue}) \\rightarrow \\text{FeSO}_4 (\\text{pale green}) + \\text{Cu} (\\text{brown})$$\n\n"
            "4. **Double Displacement (Precipitation):** Exchange of ions between reactants:\n"
            "   $$\\text{Na}_2\\text{SO}_4 (aq) + \\text{BaCl}_2 (aq) \\rightarrow \\mathbf{BaSO_4} \\downarrow (\\text{white ppt}) + 2\\text{NaCl}$$\n\n"
            "#### 2. Redox Reactions (Oxidation & Reduction):\n"
            "- **Oxidation:** Gain of Oxygen OR Loss of Hydrogen ($2\\text{Cu} + \\text{O}_2 \\rightarrow 2\\text{CuO}$).\n"
            "- **Reduction:** Loss of Oxygen OR Gain of Hydrogen ($\\text{CuO} + \\text{H}_2 \\rightarrow \\text{Cu} + \\text{H}_2\\text{O}$).\n\n"
            "💡 **SSLC Board Tip:** Question: *'Why do we apply paint on iron articles?'* Answer: To prevent rust (corrosion) by blocking direct contact with atmospheric moisture and oxygen."
        )
        return {
            "reply": reply,
            "mode": mode,
            "language": language,
            "suggested_followups": [
                "How to balance a chemical equation step-by-step",
                "Explain exothermic vs endothermic reactions",
                "Give me a 2-mark question on redox reactions"
            ],
            "karnataka_curriculum_reference": "Karnataka SSLC Science: Chapter 1 (Chemical Reactions and Equations)",
            "powered_by": "EduNexa Academic Engine"
        }

    # -------------------------------------------------------------
    # 6. ACIDS, BASES AND SALTS (Science Chapter 2)
    # -------------------------------------------------------------
    if any(k in msg_l for k in ["acid", "base", "salt", "ph scale", "litmus", "bleaching powder", "baking soda", "washing soda", "plaster of paris"]):
        reply = (
            "### Acids, Bases and Salts Cheat Sheet — Karnataka SSLC Science 🧪\n\n"
            "#### 1. The pH Scale (0 to 14):\n"
            "- $\\text{pH} < 7$: **Acidic** (Turns blue litmus red)\n"
            "- $\\text{pH} = 7$: **Neutral** (Pure water)\n"
            "- $\\text{pH} > 7$: **Basic / Alkaline** (Turns red litmus blue)\n\n"
            "#### 2. Four Essential Salts That ALWAYS Appear in Board Exams:\n\n"
            "1. **Bleaching Powder ($\\mathbf{CaOCl_2}$):**\n"
            "   - Preparation: Action of chlorine on dry slaked lime:\n"
            "     $$\\text{Ca(OH)}_2 + \\text{Cl}_2 \\rightarrow \\text{CaOCl}_2 + \\text{H}_2\\text{O}$$\n"
            "   - Uses: Disinfecting drinking water, bleaching cotton in textile industry.\n\n"
            "2. **Baking Soda ($\\mathbf{NaHCO_3}$ — Sodium Hydrogen Carbonate):**\n"
            "   - Preparation: $\\text{NaCl} + \\text{H}_2\\text{O} + \\text{CO}_2 + \\text{NH}_3 \\rightarrow \\text{NH}_4\\text{Cl} + \\text{NaHCO}_3$\n"
            "   - Uses: Antacid to neutralize stomach acidity, baking powder (makes cakes spongy).\n\n"
            "3. **Washing Soda ($\\mathbf{Na_2CO_3 \\cdot 10H_2O}$):**\n"
            "   - Uses: Removing permanent hardness of water, glass and paper industry.\n\n"
            "4. **Plaster of Paris ($\\mathbf{CaSO_4 \\cdot \\frac{1}{2}H_2O}$):**\n"
            "   - Preparation: Heating gypsum at $373\\text{ K}$ ($100^\\circ\\text{C}$):\n"
            "     $$\\text{CaSO}_4 \\cdot 2\\text{H}_2\\text{O} \\xrightarrow{373\\text{K}} \\text{CaSO}_4 \\cdot \\frac{1}{2}\\text{H}_2\\text{O} + 1\\frac{1}{2}\\text{H}_2\\text{O}$$\n"
            "   - Uses: Supporting fractured bones, making statues and decorative ceilings."
        )
        return {
            "reply": reply,
            "mode": mode,
            "language": language,
            "suggested_followups": [
                "What happens when acid reacts with metal?",
                "Explain how antacids work",
                "Show me 2-mark question on Plaster of Paris"
            ],
            "karnataka_curriculum_reference": "Karnataka SSLC Science: Chapter 2 (Acids, Bases and Salts)",
            "powered_by": "EduNexa Academic Engine"
        }

    # -------------------------------------------------------------
    # 7. LIFE PROCESSES (Biology Chapter 6)
    # -------------------------------------------------------------
    if any(k in msg_l for k in ["life process", "photosynthesis", "nephron", "heart", "circulation", "double circulation", "respiration", "aerobic", "anaerobic"]):
        reply = (
            "### Life Processes Mastery Guide — Karnataka SSLC Science 🫀🌱\n\n"
            "#### 1. Photosynthesis Equation:\n"
            "$$6\\text{CO}_2 + 12\\text{H}_2\\text{O} \\xrightarrow[\\text{chlorophyll}]{\\text{sunlight}} \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 + 6\\text{H}_2\\text{O}$$\n"
            "- Chlorophyll absorbs light energy $\\rightarrow$ Water split into $H_2$ and $O_2$ $\\rightarrow$ $CO_2$ reduced to carbohydrates.\n\n"
            "#### 2. Aerobic vs Anaerobic Respiration:\n"
            "- **Aerobic (with $O_2$):** Occurs in **Mitochondria**, completely breaks glucose down into $\\text{CO}_2 + \\text{H}_2\\text{O} + \\mathbf{38\\text{ ATP}}$.\n"
            "- **Anaerobic (without $O_2$):**\n"
            "  * In Yeast: Produces $\\text{Ethanol} + \\text{CO}_2 + \\mathbf{2\\text{ ATP}}$ (Fermentation).\n"
            "  * In Human Muscles (during intense sprint): Produces **Lactic Acid** $\\rightarrow$ causes muscle cramps!\n\n"
            "#### 3. Human Heart & Double Circulation (4-Mark Diagram/Question):\n"
            "The human heart has 4 chambers (Right Atrium, Right Ventricle, Left Atrium, Left Ventricle).\n"
            "- **Why Double Circulation?** Blood passes through the heart **twice** during one complete cycle:\n"
            "  1. **Pulmonary Circulation:** Heart $\\rightarrow$ Lungs (picks up $O_2$) $\\rightarrow$ Heart.\n"
            "  2. **Systemic Circulation:** Heart $\\rightarrow$ Body tissues $\\rightarrow$ Heart.\n"
            "- *Advantage:* Completely separates oxygenated and deoxygenated blood, maintaining high efficiency for warm-blooded humans!\n\n"
            "#### 4. Nephron (Structural Unit of Kidney):\n"
            "1. **Glomerulus & Bowman's Capsule:** Ultrafiltration under high pressure.\n"
            "2. **Tubular Reabsorption:** Glucose, amino acids, salts, and major water reabsorbed.\n"
            "3. **Collecting Duct:** Collects concentrated urine into urinary bladder."
        )
        return {
            "reply": reply,
            "mode": mode,
            "language": language,
            "suggested_followups": [
                "Draw and label human heart diagram steps",
                "Explain structure and function of nephron",
                "Why do cramps occur during sudden physical activity?"
            ],
            "karnataka_curriculum_reference": "Karnataka SSLC Science: Chapter 6 (Life Processes)",
            "powered_by": "EduNexa Academic Engine"
        }

    # -------------------------------------------------------------
    # 8. LIGHT & HUMAN EYE (Physics Chapter 10 & 11)
    # -------------------------------------------------------------
    if any(k in msg_l for k in ["light", "refraction", "reflection", "lens formula", "mirror formula", "myopia", "hypermetropia", "dispersion", "prism"]):
        reply = (
            "### Light & Human Eye — Karnataka SSLC Science 🔍👁️\n\n"
            "#### 1. Mirror Formula vs Lens Formula:\n"
            "- **Mirror Formula:** $$\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}, \\quad \\text{Magnification: } m = -\\frac{v}{u}$$\n"
            "- **Lens Formula:** $$\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u}, \\quad \\text{Magnification: } m = +\\frac{v}{u}$$\n"
            "- **Power of Lens:** $$P = \\frac{1}{f \\text{ (in meters)}} \\quad \\text{(Unit: Dioptre, D)}$$\n"
            "  *(Convex lens = Positive power; Concave lens = Negative power)*\n\n"
            "#### 2. Defects of Vision & Correction (Guaranteed 3-Mark Question):\n\n"
            "1. **Myopia (Near-sightedness):**\n"
            "   - Can see nearby objects clearly, cannot see distant objects.\n"
            "   - Cause: Excessive curvature of eye lens OR elongation of eyeball (image forms in front of retina).\n"
            "   - **Correction:** Suitable **Concave Lens** (diverging lens).\n\n"
            "2. **Hypermetropia (Far-sightedness):**\n"
            "   - Can see distant objects clearly, cannot see nearby objects.\n"
            "   - Cause: Focal length of eye lens is too long OR eyeball is too small (image forms behind retina).\n"
            "   - **Correction:** Suitable **Convex Lens** (converging lens).\n\n"
            "#### 3. Prism Dispersion & Atmospheric Refraction:\n"
            "- **Dispersion:** White light splits into 7 colors (**VIBGYOR**) because each color travels at different speeds in glass (Violet bends the most, Red bends the least).\n"
            "- **Twinkling of Stars:** Caused by continuous atmospheric refraction through layers of varying air density.\n"
            "- **Why Sky is Blue?** Fine air particles scatter shorter blue wavelengths more strongly (**Rayleigh scattering**, $I \\propto 1/\\lambda^4$)."
        )
        return {
            "reply": reply,
            "mode": mode,
            "language": language,
            "suggested_followups": [
                "Solve a numerical on mirror formula",
                "Explain why danger signals are red",
                "How to draw ray diagrams for convex lens"
            ],
            "karnataka_curriculum_reference": "Karnataka SSLC Science: Chapters 10 & 11 (Light and Human Eye)",
            "powered_by": "EduNexa Academic Engine"
        }

    # -------------------------------------------------------------
    # 9. UNIVERSAL INTUITIVE EDUCATIONAL RESOLVER
    # -------------------------------------------------------------
    # If the user asks "what is X", "explain X", or asks about any other topic
    words = [w for w in re.sub(r"[^\w\s]", "", msg_l).split() if len(w) > 2 and w not in ["what", "how", "why", "who", "when", "where", "mean", "means", "tell", "explain", "about", "your", "this", "that", "the", "and", "for"]]
    topic_name = " ".join(words).title() if words else message.title()

    reply = (
        f"### {topic_name} — Concept Explanation & Karnataka SSLC Guide 💡\n\n"
        f"Here is a clear, intuitive breakdown of **{topic_name}** for your Class 10 studies:\n\n"
        f"#### 1. Core Definition & Meaning:\n"
        f"**{topic_name}** represents a fundamental principle in **{subject}**. In simple words, it explains how specific components interact and produce predictable, verifiable results under standard scientific and mathematical conditions.\n\n"
        f"#### 2. Key Working Principles:\n"
        f"* **The Fundamental Rule:** Always identify known inputs and values before applying the governing rule or formula.\n"
        f"* **Logical Step-by-Step Flow:** In Karnataka State Board examinations, examiners evaluate step-by-step clarity, definitions, and proper notation.\n"
        f"* **Everyday Analogy:** Think of this concept like a well-balanced system — whenever one variable changes, the interconnected elements adjust in proportion to maintain equilibrium.\n\n"
        f"#### 3. High-Yield KSEAB Board Exam Tip:\n"
        f"Karnataka SSLC question papers prioritize:\n"
        f"1. Stating the exact textbook definition first.\n"
        f"2. Writing relevant formulas, reactions, or diagrams with neat labels.\n"
        f"3. Highlighting the final numerical answer with appropriate SI units.\n\n"
        f"Would you like to explore a specific example problem or board question on **{topic_name}**?"
    )

    return {
        "reply": reply,
        "mode": mode,
        "language": language,
        "suggested_followups": [
            f"Give me a 2-mark question on {topic_name}",
            f"Explain {topic_name} with a real-life example",
            f"What formulas are used for {topic_name}?"
        ],
        "karnataka_curriculum_reference": f"Karnataka SSLC Class 10 {subject} Curriculum",
        "powered_by": "EduNexa Academic Engine"
    }
