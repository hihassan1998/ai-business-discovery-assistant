# Technical Specification

## File Structure (Strict)
app/
├── layout.tsx
├── page.tsx # Landing page
├── discovery/
│ └── page.tsx # Chat + Report page
├── api/
│ └── generate-report/
│ └── route.ts # POST handler for OpenAI
components/
├── ui/
│ ├── ChatInterface.tsx
│ ├── ChatMessage.tsx
│ ├── ReportView.tsx
│ ├── EffortChart.tsx
│ └── LandingHero.tsx
lib/
├── openai-client.ts # OpenAI initialization
└── prompts.ts # System & User prompt templates
types/
└── index.ts # TypeScript interfaces
public/ # Assets
.env.local # OPENAI_API_KEY

text

## API Route (`/api/generate-report`) — SECURE IMPLEMENTATION

### File Path
`app/api/generate-report/route.ts`

### Security & Token Drain Prevention (Non-negotiable)
This route must include the following guard rails to prevent infinite loops, abuse, and excessive OpenAI costs:

| Guard Rail | Implementation |
|------------|----------------|
| **Input Validation** | Reject requests with < 2 messages or > 50 messages. |
| **Hard Token Cap** | `max_tokens: 1000` in the OpenAI call. |
| **Timeout Kill Switch** | `AbortController` with 25-second timeout. |
| **Vercel Duration** | `export const maxDuration = 30;` (Vercel default is 10s – this overrides it). |
| **Error Handling** | Catch `AbortError` and generic errors, return clean 500/504 responses. |
| **No Client-Side Key** | `process.env.OPENAI_API_KEY` is accessed ONLY on the server. Never use `NEXT_PUBLIC_` for this key. |

### Complete Route Code Template (Copy this exactly)
```typescript
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Override Vercel's default 10s timeout to 30s
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    // --- Guard Rail 1: Validate input ---
    if (!messages || messages.length < 2) {
      return NextResponse.json(
        { error: 'Need at least a few messages to generate a report.' },
        { status: 400 }
      );
    }
    if (messages.length > 50) {
      return NextResponse.json(
        { error: 'Too many messages. Please keep it under 50 exchanges.' },
        { status: 400 }
      );
    }

    // --- Guard Rail 2: AbortController (25s timeout) ---
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    // --- Guard Rail 3: OpenAI call with token cap ---
    const response = await openai.chat.completions.create(
      {
        model: 'gpt-4o-mini', // Cheap model for MVP
        messages: [
          {
            role: 'system',
            content: 'You are a senior software consultant. Return ONLY valid JSON.',
          },
          {
            role: 'user',
            content: `Generate a discovery report based on this conversation: ${JSON.stringify(messages)}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000, // <--- HARD CAP. Prevents token drain.
        response_format: { type: 'json_object' },
      },
      { signal: controller.signal }
    );

    clearTimeout(timeoutId);
    const reportData = JSON.parse(response.choices[0].message.content || '{}');
    return NextResponse.json({ data: reportData });

  } catch (error: any) {
    if (error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timed out. Please try again.' },
        { status: 504 }
      );
    }
    console.error('OpenAI Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate report. Check server logs.' },
      { status: 500 }
    );
  }
}

## State Management
- Use React `useState` and `useReducer` (No Redux/Zustand required for MVP).
- Chat history stored in component state.

## Environment Variables
- `OPENAI_API_KEY` (required)
- `NEXT_PUBLIC_APP_NAME` (optional, for branding)