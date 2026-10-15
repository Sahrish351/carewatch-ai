# CareWatch AI — Health Navigation & Recovery Follow-Up Platform

> **"Understand today. Check in tomorrow. Act when it matters."**

CareWatch AI is an AI-powered health-support and recovery-tracking platform. Traditional symptom checkers give a one-time answer and disappear. CareWatch creates an ongoing health journey with scheduled follow-ups, quantitative severity comparison, and proactive clinical escalation when symptoms worsen.

---

## 🌟 The Core Differentiator: Continuous Follow-Up Loop

$$\text{ASSESS} \longrightarrow \text{PLAN} \longrightarrow \text{CHECK IN} \longrightarrow \text{COMPARE} \longrightarrow \text{REASSESS} \longrightarrow \text{ESCALATE}$$

1. **Describe a Health Concern**: Natural conversational narrative in English or Roman Urdu.
2. **Adaptive Clinical Questions**: The AI asks one focused question at a time (4–5 questions total).
3. **Urgency Assessment**: Triage into `Self-Care`, `Monitor Closely`, `See a Healthcare Professional`, or `Urgent Attention`.
4. **Evidence-Informed Action Plan**: Immediate comfort steps, monitoring guidance, and red flags.
5. **Scheduled Follow-up**: Automated check-in window (12h, 24h, or 48h).
6. **Return for Check-in**: Quick 30-second progress log (Better, Same, Worse, New symptoms + 1–10 severity slider).
7. **Change Comparison**: Compares current metrics against initial baseline.
8. **Reassessment & Escalation**: Dynamically updates the care pathway to prevent home delays.

---

## 🤖 Multi-Agent Architecture

CareWatch uses 8 discrete agents with strict Zod schema validation:
- **Intake Agent**: Parses patient narrative, extracts symptoms, duration, severity, and context.
- **Question Agent**: Identifies missing information and generates single targeted questions.
- **Triage Agent**: Assesses clinical urgency into conservative tiers.
- **Evidence Agent**: Matches clinical criteria against peer-reviewed guidelines (NICE, CDC, AAFP, WHO).
- **Action Plan Agent**: Formulates scannable next-step plans.
- **Explanation Agent**: Explains decision factors, clinical uncertainties, and reassessment triggers.
- **Follow-up Agent**: Evaluates check-in progress against baseline.
- **Reassessment Agent**: Calculates delta changes and updates recommendations on worsening.

---

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript + React 19
- **Styling**: Tailwind CSS + shadcn/ui design tokens
- **Icons & Animation**: Lucide React + Framer Motion
- **Database**: Supabase PostgreSQL with 15 relational tables & Row Level Security (RLS)
- **Authentication**: Supabase Auth + 1-Click Evaluation Mode
- **AI Engine**: Google Gemini API (`gemini-3.8-flash`) with structured JSON schema outputs

---

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Sahrish351/carewatch-ai.git
cd carewatch-ai
npm install
```

### 2. Environment Configuration
Create a `.env.local` file from `.env.example`:
```bash
cp .env.example .env.local
```

Configure your environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
GEMINI_API_KEY=your-gemini-api-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Supabase Database Migration
Open your Supabase dashboard at [https://supabase.com/dashboard](https://supabase.com/dashboard):
1. Navigate to the **SQL Editor**.
2. Open `supabase/migrations/20261015000000_carewatch_schema.sql`.
3. Copy the entire contents, paste it into the SQL Editor, and click **Run**.
4. This creates all 15 tables, indexes, Row Level Security policies, and seeds peer-reviewed clinical guidelines!

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## ⏱️ 3-Minute Hackathon Demo Guide

1. **The Problem & Solution (0:00–0:40)**:
   - Open `/` (Landing page).
   - Highlight: *"Most symptom checkers give one answer and disappear. CareWatch checks back tomorrow."*
2. **Live Guided Assessment (0:40–1:30)**:
   - Click **Start a Health Check** (`/assessment/new`).
   - Enter: *"I've had a headache for three days and today I also feel dizzy."*
   - Watch the Intake and Question agents ask 4 targeted questions.
3. **Risk Reveal & Plan (1:30–2:10)**:
   - View results (`/assessment/[id]/result`).
   - Notice the **Monitor Closely** badge, evidence sources, and scheduled 24-hour follow-up.
4. **Follow-Up & Reassessment Loop (2:10–2:45)**:
   - Open `/follow-ups` and select the check-in.
   - Report **Worse**, severity **8/10**, and new symptom **Dizziness**.
   - Submit to reveal the **Change Visualization**:
     - Baseline: 4/10 (Monitor)
     - Current: 8/10 (+4 points)
     - **Reassessment Triggered**: Care pathway escalated to **See a Doctor Today**!
5. **Safety & Audit Trail (2:45–3:00)**:
   - Show `/timeline` for the full chronological record and `/safety` for medical governance.

---

## 🔒 Medical Safety & Governance

CareWatch AI is an informational triage navigation and recovery-tracking tool. It **does not diagnose conditions** or **prescribe medication**. For emergencies, users are directed to contact local emergency services immediately.
