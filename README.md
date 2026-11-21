# 🌟 EduNexa AI — Master EdTech Platform

> **Tagline:** *Smart Learning. Personalized Growth. Better Futures.*  
> **Category:** AI-Powered Personalized Education & Smart Learning Ecosystem  
> **Evaluation Mode:** Competitive Hackathon / Project Showcase Ready

---

## 📖 Executive Summary & Core Innovation

Most traditional educational platforms merely record that a student failed a test (e.g. scored 35% on *Linear Equations*). **EduNexa AI** solves the root problem by diagnosing **why** the student struggled.

Using our proprietary **AI Learning Gap Finder**, the platform traces student errors backwards through cognitive dependency graphs to identify underlying prerequisite weaknesses (for example: identifying that failing *Linear Equations* is rooted in an unmastered Grade 7 *negative integer division* rule). It then autonomously generates an adaptive weekly timetable, activates the **Nexa AI Tutor** with tailored learning modes in regional languages (**English, Hindi, Kannada**), and synchronizes real-time analytics across **Students, Teachers, Parents, and Administrators**.

---

## 🚀 Key Features

### 1. 🔍 AI Learning Gap Finder (Core Innovation)
- **Step 1:** Grade, subject, chapter, and self-reported stumbling blocks collection.
- **Step 2:** Interactive 4-question timed diagnostic assessment.
- **Step 3:** Gemini AI analysis engine isolates error patterns and traces root causes to foundational prerequisite skills with evidence citation.
- **Step 4:** Generates an actionable 4-step remediation roadmap.
- **Step 5:** Interactive Learning Gap Registry and severity heatmap (`CRITICAL`, `MODERATE`, `MILD`).
- **Resilience:** Includes an intelligent rule-based pedagogical inference engine that guarantees 100% uptime if offline or rate-limited.

### 2. 📅 AI Personalized Study Planner
- Generates dynamic 7-day study timetables based on available daily hours (1 to 6 hrs), school schedules, and upcoming exam dates.
- Specifically allocates extra focus time to active prerequisite gaps before advancing to new material.
- Interactive task completion tracking, real-time XP rewards (+40 XP), and planned vs. completed study hour analytics.

### 3. 🤖 Nexa AI Educational Assistant (Chat Space)
- Context-aware conversational tutor powered by **Google Gemini AI**.
- **5 Pedagogical Modes:**
  1. *Explain Like I'm a Beginner* (intuitive analogies & metaphors)
  2. *Step-by-Step* (numbered logical milestones)
  3. *Exam Prep* (high-yield traps, marking rubrics, model answers)
  4. *Practice Mode* (interactive Socratic guidance)
  5. *Quick 60-Second Revision* (bulleted axiom recaps)
- **Multilingual Support:** English, Hindi (हिन्दी), and Kannada (ಕನ್ನಡ).

### 4. 📝 Timed Quiz & Assessment System
- Subject-wise and topic-wise assessments with live 25-second countdown timers.
- Instant score computation, answer explanations, and automatic XP distribution.
- Incorrect answers automatically generate new entries in the student's Learning Gap registry.

### 5. 👥 4 Role-Based Dedicated Portals
| Portal | Key Capabilities |
|---|---|
| **Student** | Live GPA (3.78), 8-day streak, 2,850 XP, weekly performance chart, gap finder, study planner, Nexa AI tutor, assignments, badges & leaderboard. |
| **Teacher** | Class performance heatmaps, students requiring immediate intervention, one-click attendance recording, marks & gradebook publisher, assignment creator. |
| **Parent** | Jargon-free academic summaries, attendance verification, exam grades, actionable home coaching tips, teacher noticeboard. |
| **Admin** | Cross-grade enrollment metrics, platform telemetry, user role provisioning, curriculum class manager, PDF report exporter. |

---

## 🏆 Judge Demonstration Flow (10-Step Showcase)

EduNexa AI comes with an integrated **"Judge Demo Tour"** accessible at any time from the top navigation bar. You can also explore all 4 roles with 1-click pre-authenticated demo buttons on the landing page or login screen:

1. **Start as Student (Alex Johnson):** View personalized dashboard, GPA, 8-day streak, and the answers to *How am I performing?*, *What should I improve?*, and *What should I study next?*
2. **Open AI Learning Gap Finder:** Select Grade 10 Mathematics -> Algebra -> Linear Equations.
3. **Take Diagnostic Quiz:** Complete the 4-question assessment.
4. **Inspect AI Root Cause Analysis:** Observe how the AI traces an incorrect answer to the prerequisite: *Negative integer arithmetic & inverse operations*.
5. **Generate AI Study Timetable:** Adjust available hours (3 hrs/day) and click *Generate New Timetable* to see prerequisite remediation tasks scheduled.
6. **Chat with Nexa AI Tutor:** Switch between *Beginner* mode and *Hindi/Kannada* modes to see localized conceptual analogies.
7. **Complete a Practice Quiz:** Take a timed quiz, review correct answers, and observe live XP accumulation.
8. **Switch to Teacher (Ms. Sarah Chen):** Open the Teacher Dashboard. Notice Alex Johnson flagged under *Students Requiring Immediate Support*.
9. **Mark Attendance & Publish Marks:** Record today's attendance (Present/Late/Absent) and save.
10. **Switch to Parent (Robert Johnson):** See the updated attendance and plain-English summary of Alex's progress.

---

## 🛠️ Technology Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling & Design System:** Tailwind CSS (Custom Dark SaaS Palette: `#0B1020`, `#111831`, `#7657F6`, `#A78BFA`, `#FFC857`, `#171F3A`)
- **Visuals & Charts:** Recharts (Responsive LineCharts, BarCharts)
- **Icons:** Lucide React
- **Celebrations:** Canvas Confetti
- **Artificial Intelligence:** Google Gemini AI (`@google/generative-ai` with `gemini-1.5-flash`) + Transparent Rule-Based Fallback Engine
- **State & Data Store:** Reactive React Contexts with LocalStorage persistence

---

## 🔐 Demo Credentials

All accounts are pre-configured for instant 1-click evaluation:

| Role | Name | Email | Password |
|---|---|---|---|
| **Student** | Alex Johnson | `alex.johnson@edunexa.ai` | `demo123` |
| **Teacher** | Ms. Sarah Chen | `sarah.chen@edunexa.ai` | `demo123` |
| **Parent** | Robert Johnson | `robert.johnson@edunexa.ai` | `demo123` |
| **Admin** | Dr. Emma Wilson | `admin@edunexa.ai` | `demo123` |

---

## ⚡ Installation & Local Run

```bash
# 1. Install dependencies
npm install

# 2. Configure Environment (.env)
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# 3. Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.
