'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  onGenerateReport: () => void;
  isGeneratingReport: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  setMessages,
  onGenerateReport,
  isGeneratingReport,
}) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || isGeneratingReport) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages, mode: 'chat' }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        throw new Error('No reply from assistant');
      }
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Could you please try repeating that?',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Determine if there are at least 5 exchanges (5 user messages or 5 total messages)
  // Let's allow generating after 5 total messages to match "5+ exchanges" (or 5 messages).
  const canGenerate = messages.length >= 5;

  return (
    <div className="flex flex-col h-[650px] bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-[#40252F] text-white px-6 py-4 flex items-center justify-between border-b border-[#9B2740]/20">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-[#A68C41] rounded-full animate-ping" />
          <div>
            <h2 className="font-bold text-base tracking-wide">AI Discovery Session</h2>
            <p className="text-xs text-gray-300">Live consultation with Junior BA</p>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 bg-[#9B2740]/40 rounded-full font-semibold border border-[#9B2740]/60 text-gray-200">
          Consid Partner
        </span>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#F3F0F1]/30">
        {messages.map((msg, index) => (
          <ChatMessage key={index} role={msg.role} content={msg.content} />
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center space-x-1.5">
              <div className="w-2.5 h-2.5 bg-[#9B2740] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2.5 h-2.5 bg-[#9B2740] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2.5 h-2.5 bg-[#9B2740] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Actions & Input Footer */}
      <div className="p-4 bg-white border-t border-gray-100 flex flex-col space-y-3">
        {canGenerate && (
          <button
            onClick={onGenerateReport}
            disabled={isLoading || isGeneratingReport}
            className="w-full bg-gradient-to-r from-[#9B2740] to-[#A68C41] hover:from-[#40252F] hover:to-[#9B2740] text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:pointer-events-none text-sm tracking-wide"
          >
            {isGeneratingReport ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>Analyzing Conversations & Generating Report...</span>
              </>
            ) : (
              <>
                <span>⚡ Generate Discovery Report</span>
              </>
            )}
          </button>
        )}

        <form onSubmit={handleSend} className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading || isGeneratingReport}
            placeholder="Type your response here..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#9B2740] focus:border-transparent transition-all duration-200 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || isGeneratingReport || !input.trim()}
            className="bg-[#40252F] hover:bg-[#9B2740] text-white p-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center"
          >
            <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};
