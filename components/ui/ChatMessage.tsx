import React from 'react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  const isUser = role === 'user';
  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm transition-all duration-200 hover:shadow-md ${
          isUser
            ? 'bg-[#9B2740] text-white rounded-br-none'
            : 'bg-white text-[#1E293B] border border-gray-100 rounded-bl-none'
        }`}
      >
        <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{content}</p>
        <span className="text-[10px] opacity-75 mt-1 block text-right">
          {isUser ? 'You' : 'AI Consultant'}
        </span>
      </div>
    </div>
  );
};
