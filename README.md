# 🌟 SagaDiscovery: AI Business Discovery Assistant

[![Run Tests](https://github.com/hihassan1998/ai-business-discovery-assistant/actions/workflows/test.yml/badge.svg)](https://github.com/hihassan1998/ai-business-discovery-assistant/actions/workflows/test.yml)

A premium, production-ready SaaS prototype that turns raw client conversations into structured software blueprints. SagaDiscovery acts as a neutral AI assistant that bridges the gap between business stakeholders and technical teams during project discovery.

---

## 📖 Product Philosophy

### 1. What Problem I Saw
> *"Business stakeholders and technical teams struggle to communicate effectively during project discovery. Non-technical people describe what they want, while technical people need requirements. This leads to misunderstandings, rework, and failed projects."*

### 2. What My Fix Does
> *"SagaDiscovery acts as a neutral AI assistant that bridges this gap. It conducts a structured discovery conversation with the stakeholder, then translates their responses into technical requirements, user stories, and project estimates that developers can act on."*

### 3. Why AI Is the Right Tool
> *"This is a non-deterministic problem. Every project, stakeholder, and domain is different. Generative AI is uniquely suited to handle this variability — it can adapt its questions to any industry, interpret ambiguous responses, and generate structured output from unstructured conversation."*

---

## 🚀 Key Features
- **Interactive BA Chat:** Guided live consulting session prompting clients on industry challenges, integrations, and scopes.
- **Multilingual Support:** Dynamic Swedish (default) and English translation toggle. The AI automatically detects and matches the client's language in both conversation and generated specifications.
- **Instant Scoping Reports:** Generates structured project briefs including customer overview, pain points, functional requirements, and user stories.
- **Interactive Effort Charts:** Renders a responsive `Chart.js` Doughnut chart showcasing frontend, backend, design, testing, and management effort allocations.
- **Human-in-the-Loop Refinements:** Allows consultants to manually edit and polish any generated card segment directly on-screen before delivering.
- **Success Handoff Triggers:** Mock triggers to deliver final briefs instantly to engineering teams.

---

## 🎨 Brand Identity
- **Primary Burgundy:** `#9B2740`
- **Deep Rosewood:** `#40252F`
- **Gold Accent:** `#A68C41`
- **Clean Slate:** `#1E293B`

---

## 🛠️ Tech Stack
- **Framework:** Next.js 16 (App Router + Turbopack)
- **Type Safety:** Strict TypeScript typing (`ReportData`)
- **Styling:** Tailwind CSS
- **API integrations:** OpenAI (`gpt-4o-mini`)
- **Visuals:** Chart.js & React-Chartjs-2
- **Testing:** Jest, React Testing Library, and Supertest

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
npm install --legacy-peer-deps
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🧪 Testing Suite

Run the unit and integration test suites:

```bash
# Run all unit tests
npm test

# Run integration tests specifically
npm run test:integration
```

---

## ☁️ Vercel Deployment Guide

To deploy SagaDiscovery to production on Vercel:

1. **Push Changes to GitHub:**
   Ensure all changes are committed and pushed to your repository branch.

2. **Connect to Vercel:**
   - Log into the [Vercel Dashboard](https://vercel.com).
   - Click **Add New...** -> **Project**.
   - Import your GitHub repository.

3. **Configure Environment Variables:**
   - Expand the **Environment Variables** section.
   - Add `OPENAI_API_KEY` as the key and paste your OpenAI API token as the value.

4. **Deploy:**
   - Click **Deploy**. Vercel will automatically build the Next.js project using Turbopack and make it live in under a minute!