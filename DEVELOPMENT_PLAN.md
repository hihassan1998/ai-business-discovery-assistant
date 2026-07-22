# Development Plan (Execution Order)

1. **Initialize**: `npx create-next-app@latest . --typescript --tailwind --app`
2. **Install Dependencies**: 
   `npm install openai chart.js react-chartjs-2`
3. **Build `types/index.ts`**: Define `ReportData` interface matching the JSON schema.
4. **Build `lib/prompts.ts`**: Paste the System Prompt and the template function.
5. **Build `app/api/generate-report/route.ts`**: 
   - Instantiate OpenAI.
   - Parse incoming messages.
   - Call OpenAI with JSON response format (`response_format: { type: "json_object" }`).
6. **Build `components/ui/ChatInterface.tsx`**: 
   - State for `messages`.
   - Auto-scroll to bottom.
   - Disable input while loading.
7. **Build `app/discovery/page.tsx`**: Assemble Chat + Report side-by-side.
8. **Build `components/ui/EffortChart.tsx`**: Render Doughnut chart with provided data.
9. **Build `app/page.tsx`**: Landing page.
10. **Deploy**: Push to GitHub → Connect to Vercel → Add `OPENAI_API_KEY` env var.