# 🌟 SagaDiscovery: AI Business Discovery Assistant

A premium, production-ready SaaS prototype that turns raw client conversations into structured software blueprints. SagaDiscovery acts as an AI-powered Junior Business Analyst, automating up to 40% of the manual requirement gathering phase for software consultants.

---

## 🎨 Brand Identity (Consid-Aligned)
- **Primary Burgundy:** `#9B2740`
- **Deep Rosewood:** `#40252F`
- **Gold Accent:** `#A68C41`
- **Clean Slate:** `#1E293B`

---

## 🚀 Key Features
- **Interactive BA Chat:** Simulated live consulting session prompting clients on industry challenges, integrations, and scopes.
- **Instant Scoping Reports:** Generates structured client briefs including customer overview, pain points, functional requirements, and user stories.
- **Interactive Effort Charts:** Renders a responsive `Chart.js` Doughnut chart showcasing frontend, backend, design, testing, and management effort allocations.
- **Human-in-the-Loop Refinements:** Allows consultants to manually edit and polish any generated card segment directly on-screen before delivering.
- **Success Handoff Triggers:** Mock triggers to deliver final briefs instantly to engineering teams.

---

## 🛠️ Tech Stack
- **Framework:** Next.js 16 (App Router + Turbopack)
- **Type Safety:** Strict TypeScript typing (`ReportData`)
- **Styling:** Tailwind CSS
- **API integrations:** OpenAI (`gpt-4o-mini`)
- **Visuals:** Chart.js & React-Chartjs-2

---

## 🔒 Security & Token Drain Prevention
To prevent excessive API usage and safeguard against billing exploits, our backend includes:
- **Input Validation:** Restricts payloads to between 1 and 50 messages.
- **Hard Token Cap:** Enforces `max_tokens: 1000` limit on the OpenAI LLM endpoint.
- **Timeout Kill Switch:** Integrates an `AbortController` terminating unresolved calls at 25 seconds.
- **Server-Only Secrets:** Enforces server-side instantiation, keeping all API keys protected from browser inspection.

---

## 📦 Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/hihassan1998/ai-business-discovery-assistant.git
cd ai-business-discovery-assistant
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root of the project:
```env
OPENAI_API_KEY=your-openai-api-key-here
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## ☁️ Vercel Deployment Guide

To deploy SagaDiscovery to production on Vercel:

1. **Push Changes to GitHub:**
   Ensure all changes are committed and pushed to your repository branch.

2. **Connect to Vercel:**
   - Log into the [Vercel Dashboard](https://vercel.com).
   - Click **Add New...** -> **Project**.
   - Import your `ai-business-discovery-assistant` GitHub repository.

3. **Configure Environment Variables:**
   - Expand the **Environment Variables** section.
   - Add `OPENAI_API_KEY` as the key and paste your OpenAI API token as the value.

4. **Deploy:**
   - Click **Deploy**. Vercel will automatically build the Next.js project using Turbopack and make it live in under a minute!