/**
 * @jest-environment node
 */

// Polyfill Web standards for Next.js NextRequest/NextResponse in Jest node environment
if (typeof global.Request === 'undefined') {
  global.Request = globalThis.Request;
  global.Response = globalThis.Response;
  global.Headers = globalThis.Headers;
}

import { POST } from '@/app/api/generate-report/route';
import { NextRequest } from 'next/server';
import { openai } from '@/lib/openai-client';

// Mock openai client
jest.mock('@/lib/openai-client', () => ({
  openai: {
    chat: {
      completions: {
        create: jest.fn(),
      },
    },
  },
}));

describe('POST /api/generate-report Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const createMockRequest = (body: any) => {
    return new NextRequest('http://localhost:3000/api/generate-report', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  };

  it('returns 400 when message history is empty or missing', async () => {
    const req = createMockRequest({ messages: [] });
    const res = await POST(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.error).toBe('Need at least one message.');
  });

  it('returns 400 when message history exceeds limit of 50', async () => {
    const messages = Array.from({ length: 55 }, () => ({ role: 'user', content: 'hello' }));
    const req = createMockRequest({ messages });
    const res = await POST(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.error).toBe('Too many messages. Please keep it under 50 exchanges.');
  });

  it('returns response successfully in chat mode', async () => {
    const mockReply = 'Hej! Vad kan jag hjälpa dig med idag?';
    (openai.chat.completions.create as jest.Mock).mockResolvedValue({
      choices: [
        {
          message: {
            content: mockReply,
          },
        },
      ],
    });

    const req = createMockRequest({
      messages: [{ role: 'user', content: 'Hej' }],
      mode: 'chat',
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.reply).toBe(mockReply);
    expect(openai.chat.completions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        model: 'gpt-4o-mini',
        max_tokens: 150,
      }),
      expect.any(Object)
    );
  });

  it('returns generated report in report mode', async () => {
    const mockReport = {
      customerOverview: 'Overview in Swedish',
      businessProblems: ['problem'],
      painPoints: [],
      solutionProposal: '',
      functionalRequirements: [],
      userStories: [],
      technicalArchitecture: '',
      scopeEstimate: {
        frontend: 40,
        backend: 20,
        design: 20,
        testing: 10,
        management: 10,
      },
    };

    (openai.chat.completions.create as jest.Mock).mockResolvedValue({
      choices: [
        {
          message: {
            content: JSON.stringify(mockReport),
          },
        },
      ],
    });

    const req = createMockRequest({
      messages: [
        { role: 'user', content: 'Hej' },
        { role: 'assistant', content: 'Hej! Vad vill du bygga?' },
      ],
      mode: 'report',
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.data).toEqual(mockReport);
    expect(openai.chat.completions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        model: 'gpt-4o-mini',
        max_tokens: 1000,
        response_format: { type: 'json_object' },
      }),
      expect.any(Object)
    );
  });
});
