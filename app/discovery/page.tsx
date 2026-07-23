'use client';

import React, { useState, useEffect } from 'react';
import { ChatInterface } from '@/components/ui/ChatInterface';
import { ReportView } from '@/components/ui/ReportView';
import { ReportData } from '@/types';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { LanguageToggle } from '@/components/ui/LanguageToggle';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// DiscoveryPage handles the side-by-side Chat and ReportView layout with multilingual support.
export default function DiscoveryPage() {
  const { language } = useLanguage();
  const t = translations[language];

  // Set first message based on current language
  const [messages, setMessages] = useState<Message[]>([]);

  // Effect to initialize first message on mount and language change if conversation is empty
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content:
            language === 'sv'
              ? 'Hej! Jag är din AI-kravanalytiker. Låt oss designa din nästa applikation tillsammans. För att starta, vilken bransch är ditt företag verksamt inom, och vad är det primära problemet du vill lösa?'
              : "Hello! I'm your AI Business Discovery Assistant. Let's design your next application together. To start, what industry is your business in, and what is the main business challenge you're looking to solve?",
        },
      ]);
    } else {
      // Dynamic translation of first message if no user interactions occurred yet
      setMessages((prev) => {
        if (prev.length === 1 && prev[0].role === 'assistant') {
          return [
            {
              role: 'assistant',
              content:
                language === 'sv'
                  ? 'Hej! Jag är din AI-kravanalytiker. Låt oss designa din nästa applikation tillsammans. För att starta, vilken bransch är ditt företag verksamt inom, och vad är det primära problemet du vill lösa?'
                  : "Hello! I'm your AI Business Discovery Assistant. Let's design your next application together. To start, what industry is your business in, and what is the main business challenge you're looking to solve?",
            },
          ];
        }
        return prev;
      });
    }
  }, [language]);

  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, mode: 'report' }),
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.error || 'Failed to generate report');
      }

      const data = await response.json();
      if (data.data) {
        setReportData(data.data);
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (err: any) {
      console.error(err);
      setError(
        err.message ||
          (language === 'sv'
            ? 'Ett fel uppstod när rapporten skulle skapas. Försök igen.'
            : 'An error occurred while generating the report. Please try again.')
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpdateReport = (updated: ReportData) => {
    setReportData(updated);
  };

  return (
    <main className="min-h-screen bg-[#F3F0F1] text-[#1E293B]">
      {/* Navbar / Header */}
      <nav className="bg-[#40252F] text-white py-4 px-6 border-b border-[#9B2740]/30 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <span className="text-xl font-black text-[#A68C41] tracking-wider group-hover:text-white transition-all">
                SAGADISCOVERY
              </span>
            </Link>
            <LanguageToggle />
          </div>
          <Link
            href="/"
            className="text-xs font-semibold px-4 py-2 border border-gray-400 rounded-full hover:bg-white hover:text-[#40252F] transition-all"
          >
            {t.backToHome}
          </Link>
        </div>
      </nav>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          {/* Chat Interface Column */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            <ChatInterface
              messages={messages}
              setMessages={setMessages}
              onGenerateReport={handleGenerateReport}
              isGeneratingReport={isGenerating}
            />
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Report Preview Column */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[88px] max-h-[calc(100vh-120px)] overflow-y-auto pr-1">
              {reportData ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-extrabold text-[#40252F] tracking-wide">
                      {t.briefHeader}
                    </h2>
                    <span className="bg-[#A68C41]/20 border border-[#A68C41] text-[#A68C41] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      {t.draft}
                    </span>
                  </div>
                  <ReportView data={reportData} onUpdate={handleUpdateReport} />
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl h-[650px] flex flex-col justify-center items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-[#F3F0F1] rounded-full flex items-center justify-center text-2xl">
                    🗒️
                  </div>
                  <h3 className="font-bold text-lg text-[#40252F]">{t.noReportTitle}</h3>
                  <p className="text-sm text-gray-500 max-w-[280px]">
                    {t.noReportText}
                  </p>
                  <div className="pt-4 w-full border-t border-gray-100 flex flex-col space-y-2 text-left text-xs text-gray-500">
                    <div className="flex items-center space-x-2">
                      <span className="text-[#A68C41]">✓</span>
                      <span>{language === 'sv' ? 'Analyserar kundkrav' : 'Analyzes client requirements'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#A68C41]">✓</span>
                      <span>{language === 'sv' ? 'Bygger backlog & user stories' : 'Builds backlog & user stories'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#A68C41]">✓</span>
                      <span>{language === 'sv' ? 'Levererar detaljerade projektestimat' : 'Provides detailed effort chart'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
