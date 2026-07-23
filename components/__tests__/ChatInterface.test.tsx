import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChatInterface } from '../ui/ChatInterface';
import { LanguageProvider } from '@/context/LanguageContext';

describe('ChatInterface Component', () => {
  const mockSetMessages = jest.fn();
  const mockOnGenerateReport = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it('renders chat interface with messages', () => {
    const messages = [{ role: 'assistant' as const, content: 'Hello there' }];

    render(
      <LanguageProvider>
        <ChatInterface
          messages={messages}
          setMessages={mockSetMessages}
          onGenerateReport={mockOnGenerateReport}
          isGeneratingReport={false}
        />
      </LanguageProvider>
    );

    expect(screen.getByText('Hello there')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Skriv ditt svar här/i)).toBeInTheDocument();
  });

  it('disables input when isGeneratingReport is true', () => {
    const messages = [{ role: 'assistant' as const, content: 'Hello' }];

    render(
      <LanguageProvider>
        <ChatInterface
          messages={messages}
          setMessages={mockSetMessages}
          onGenerateReport={mockOnGenerateReport}
          isGeneratingReport={true}
        />
      </LanguageProvider>
    );

    const input = screen.getByPlaceholderText(/Skriv ditt svar här/i);
    expect(input).toBeDisabled();
  });

  it('sends user message and calls setMessages', async () => {
    const messages = [{ role: 'assistant' as const, content: 'Hello' }];
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ reply: 'AI response' }),
    });

    render(
      <LanguageProvider>
        <ChatInterface
          messages={messages}
          setMessages={mockSetMessages}
          onGenerateReport={mockOnGenerateReport}
          isGeneratingReport={false}
        />
      </LanguageProvider>
    );

    const input = screen.getByPlaceholderText(/Skriv ditt svar här/i);
    fireEvent.change(input, { target: { value: 'We need an app' } });
    
    const form = input.closest('form');
    if (form) {
      fireEvent.submit(form);
    }

    // It should add the user message
    expect(mockSetMessages).toHaveBeenCalledWith(
      expect.arrayContaining([
        { role: 'user', content: 'We need an app' }
      ])
    );
  });
});
