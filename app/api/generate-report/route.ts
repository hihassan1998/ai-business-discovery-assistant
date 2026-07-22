import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/lib/openai-client';
import { REPORT_SYSTEM_PROMPT, getReportUserPrompt } from '@/lib/prompts';

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

    // Format transcript for OpenAI
    const formattedTranscript = messages
      .map((m: any) => `${m.role === 'user' ? 'Customer (User)' : 'Consultant (AI)'}: ${m.content}`)
      .join('\n');

    // --- Guard Rail 3: OpenAI call with token cap ---
    const response = await openai.chat.completions.create(
      {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: REPORT_SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: getReportUserPrompt(formattedTranscript),
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
