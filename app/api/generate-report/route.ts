// api/generate-report/route.ts
// Secure API route with token limits, timeout protection, and input validation

import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/lib/openai-client';
import { REPORT_SYSTEM_PROMPT, getReportUserPrompt, DISCOVERY_SYSTEM_PROMPT } from '@/lib/prompts';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, mode = 'report' } = body;

    // --- Guard Rail 1: Validate input ---
    if (!messages || messages.length < 1) {
      return NextResponse.json(
        { error: 'Need at least one message.' },
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

    if (mode === 'chat') {
      // Chat mode: returns the next question dynamically matching user's language
      const response = await openai.chat.completions.create(
        {
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: DISCOVERY_SYSTEM_PROMPT,
            },
            ...messages.map((m: any) => ({
              role: m.role,
              content: m.content,
            })),
          ],
          temperature: 0.7,
          max_tokens: 150,
        },
        { signal: controller.signal }
      );

      clearTimeout(timeoutId);
      return NextResponse.json({ reply: response.choices[0].message.content || '' });
    } else {
      // Report mode: parses conversation and generates structured JSON project brief matching user's language
      const formattedTranscript = messages
        .map((m: any) => `${m.role === 'user' ? 'Customer (User)' : 'Consultant (AI)'}: ${m.content}`)
        .join('\n');

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
    }

  } catch (error: any) {
    if (error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timed out. Please try again.' },
        { status: 504 }
      );
    }
    console.error('OpenAI Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response. Check server logs.' },
      { status: 500 }
    );
  }
}
