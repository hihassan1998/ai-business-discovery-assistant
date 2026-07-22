# Development Plan (Execution Order)

## Git Commit Strategy (Milestone-Based)

**Antigravity must commit changes after completing each MILESTONE (not every step).**

### Commit Milestones:

| Milestone | Steps Covered | Commit Message |
|-----------|---------------|----------------|
| **M1: Project Setup** | Steps 1-2 | `chore: initialize Next.js project with dependencies` |
| **M2: Core Types & Prompts** | Steps 3-4 | `feat: add ReportData types and AI prompts` |
| **M3: API Route** | Step 5 | `feat: implement secure OpenAI API route` |
| **M4: Chat Interface** | Step 6 | `feat: build discovery chat interface` |
| **M5: Discovery Page** | Step 7 | `feat: assemble discovery page with chat + report` |
| **M6: Chart Component** | Step 8 | `feat: add effort distribution chart` |
| **M7: Landing Page** | Step 9 | `feat: build landing page with Consid branding` |
| **M8: Deployment Ready** | Step 10 | `chore: prepare for Vercel deployment` |

### Total Commits: 8 (not 10)

---

## Development Steps

1. **Initialize**: `npx create-next-app@latest . --typescript --tailwind --app`
2. **Install Dependencies**: 
   `npm install openai chart.js react-chartjs-2`
   
   **[COMMIT M1]**

3. **Build `types/index.ts`**: Define `ReportData` interface matching the JSON schema.
4. **Build `lib/prompts.ts`**: Paste the System Prompt and the template function.
   
   **[COMMIT M2]**

5. **Build `app/api/generate-report/route.ts`**: 
   - Instantiate OpenAI.
   - Parse incoming messages.
   - Call OpenAI with JSON response format (`response_format: { type: "json_object" }`).
   - Include security guardrails (timeout, token cap, input validation).
   
   **[COMMIT M3]**

6. **Build `components/ui/ChatInterface.tsx`**: 
   - State for `messages`.
   - Auto-scroll to bottom.
   - Disable input while loading.
   
   **[COMMIT M4]**

7. **Build `app/discovery/page.tsx`**: Assemble Chat + Report side-by-side.
   
   **[COMMIT M5]**

8. **Build `components/ui/EffortChart.tsx`**: Render Doughnut chart with provided data.
   
   **[COMMIT M6]**

9. **Build `app/page.tsx`**: Landing page with Consid colors from UI_SPEC.
   
   **[COMMIT M7]**

10. **Deploy**: Push to GitHub → Connect to Vercel → Add `OPENAI_API_KEY` env var.
    
    **[COMMIT M8]**