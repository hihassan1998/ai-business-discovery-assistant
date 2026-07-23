# SagaDiscovery — Update Specification

## Overview
Update the existing SagaDiscovery application with the following changes. Keep all existing functionality (chat, report generation, editability, chart, API security, colors) exactly as it is.

**Purpose:** This prototype is designed to demonstrate to hiring managers that you are AI-native, can build and deploy products, understand testing and CI/CD pipelines, and write clean, documented code.

---

## 1. Landing Page — Replace Completely with 3 Core Explanations

**Replace the entire landing page content** with these 3 clear messages. Remove all previous content (no feature cards, no customer-facing UI language):

### What Problem I Saw
> *"Business stakeholders and technical teams struggle to communicate effectively during project discovery. Non-technical people describe what they want, while technical people need requirements. This leads to misunderstandings, rework, and failed projects."*

### What My Fix Does
> *"SagaDiscovery acts as a neutral AI assistant that bridges this gap. It conducts a structured discovery conversation with the stakeholder, then translates their responses into technical requirements, user stories, and project estimates that developers can act on."*

### Why AI Is the Right Tool
> *"This is a non-deterministic problem. Every project, stakeholder, and domain is different. Generative AI is uniquely suited to handle this variability — it can adapt its questions to any industry, interpret ambiguous responses, and generate structured output from unstructured conversation."*

**Keep:** The "Start Discovery" button, header, footer, and overall layout.

---

## 2. Remove All Consid Branding

- Remove any mention of "Consid" from:
  - Code (comments, variables, constants)
  - UI (text, headings, buttons)
  - README and documentation
- Keep the color palette (it's generic enough to work for any company)

---

## 3. Multilingual Support

### UI Language
- **Default:** Swedish
- **Toggle:** English (add language toggle in header)
- All UI text must support both languages.

### Chat & Report Language
- The AI should respond in **the same language the user uses** in the chat.
- The generated report should be in the **same language as the conversation**.
- No language restrictions are applied to the model.

### Implementation
- Add `LanguageContext` or use a simple i18n system.
- Update system prompts to instruct AI to match the user's language.
- **Note:** Antigravity will handle the report generation prompt updates — you don't need to specify the exact prompt.

---

## 4. Testing (Jest + React Testing Library + Supertest)

### Unit Tests
- `ChatInterface`: renders, sends messages, disables input during loading
- `EffortChart`: renders chart with provided data
- `ReportView`: displays all sections, handles editing
- `LanguageToggle`: switches between Swedish and English

### Integration Tests (Supertest)
- `POST /api/generate-report`: returns valid JSON, handles errors, enforces token limit
- `POST /api/generate-report`: responds in the requested language
- `POST /api/generate-report`: returns 400 for invalid input

### Setup
- Add `jest.config.js` and `jest.setup.js`
- Create a `__tests__/` folder for tests
- Tests should pass locally and in CI/CD

---

## 5. GitHub Actions CI/CD Pipeline

Add a GitHub Actions workflow so tests run automatically on push to the `main` branch.

### File: `.github/workflows/test.yml`

```yaml
name: Run Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Run integration tests
        run: npm run test:integration
```
Add to package.json
json
{
  "scripts": {
    "test": "jest",
    "test:integration": "jest --testMatch='**/__tests__/**/*.test.ts'"
  }
}
6. Code Comments
Add short, meaningful comments throughout the codebase to demonstrate clean, documented code:

Examples:
typescript
// ChatInterface.tsx
// Handles user input, sends messages to the AI, and manages conversation state

// ReportView.tsx
// Displays the generated report with editable sections and effort chart

// api/generate-report/route.ts
// Secure API route with token limits, timeout protection, and input validation
Goal: Show hiring managers you write code that is easy to understand and maintain.

7. File Structure Updates
text
SagaDiscovery/
├── .github/
│   └── workflows/
│       └── test.yml                 # NEW: CI/CD pipeline
├── app/
│   ├── api/generate-report/route.ts
│   ├── discovery/page.tsx
│   ├── page.tsx                     # UPDATED: New landing page
│   ├── layout.tsx                   # UPDATED: Add language toggle
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── ChatInterface.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── ReportView.tsx
│   │   ├── EffortChart.tsx
│   │   ├── LandingHero.tsx          # UPDATED: 3 explanations
│   │   └── LanguageToggle.tsx       # NEW
│   └── __tests__/                   # NEW
│       ├── ChatInterface.test.tsx
│       ├── ReportView.test.tsx
│       └── EffortChart.test.tsx
├── lib/
│   ├── openai-client.ts
│   ├── prompts.ts                   # UPDATED: Language support
│   └── translations.ts              # NEW: UI translations
├── types/
│   └── index.ts
├── context/
│   └── LanguageContext.tsx          # NEW
├── __tests__/                       # NEW
│   └── api/
│       └── generate-report.test.ts  # NEW: Integration tests
├── jest.config.js                   # NEW
├── jest.setup.js                    # NEW
├── .env.local
└── README.md                        # UPDATED
8. What to Keep (Unchanged)
Feature	Status
Chat interface functionality	✅ Keep as is
Report generation	✅ Keep as is
Editable report sections	✅ Keep as is
Effort chart	✅ Keep as is
"Send to Consultant" flow	✅ Keep as is
API security (timeout, token cap, validation)	✅ Keep as is
Color palette	✅ Keep as is (generic)
Vercel deployment	✅ Keep as is
Note: Antigravity will handle the report generation prompt updates — you don't need to specify the exact prompt.

9. Commit Milestones
Milestone	Commit Message
M1	docs: replace landing page with 3 core explanations
M2	feat: add multilingual support (Swedish/English)
M3	test: add unit and integration tests
M4	ci: add GitHub Actions workflow for testing
M5	chore: remove Consid branding and add code comments
10. Updated README
Update the README to include:

SagaDiscovery name and purpose

The 3 core explanations (from the landing page)

Language support (Swedish/English)

Testing instructions (npm test)

CI/CD badge (GitHub Actions)

All other content remains the same

11. Summary of Changes
Change:	Action:
Landing page	Replace completely with 3 explanations
Branding	Remove all Consid references
Language	Add Swedish/English support (UI toggle + AI adapts)
Testing	Add Jest + React Testing Library + Supertest
CI/CD	Add GitHub Actions workflow
Code comments	Add short comments throughout codebase
README	Update with new content
Everything else	Keep exactly as is

## Summary of Name Change

| Aspect | Old Name | New Name |
|--------|----------|----------|
| App Name | AnvänderSaga | **SagaDiscovery** |
| Folder name | `anvandersaga/` | `SagaDiscovery/` |
| Landing page copy | "AnvänderSaga acts as..." | **"SagaDiscovery acts as..."** |
| README | AnvänderSaga | **SagaDiscovery** |
| Everything else | Same | Same |

**The short prompt for Antigravity2.0:**
> *"Read UPDATE_SPEC.md. Apply all changes to the existing SagaDiscovery codebase. Keep all existing functionality. Commit after each milestone. Do not break anything that already works."*
