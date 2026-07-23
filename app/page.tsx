'use client';

import React from 'react';
import { LandingHero } from '@/components/ui/LandingHero';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

// Home represents the primary landing page showcasing the 3 core explanations of SagaDiscovery.
export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  const explanations = [
    {
      title: t.problemTitle,
      quote: t.problemQuote,
      tag: '01 / SYSTEM_GAP',
      accentColor: 'border-[#9B2740]',
      bgColor: 'bg-[#9B2740]/5',
    },
    {
      title: t.fixTitle,
      quote: t.fixQuote,
      tag: '02 / AGENT_FIX',
      accentColor: 'border-[#A68C41]',
      bgColor: 'bg-[#A68C41]/5',
    },
    {
      title: t.aiTitle,
      quote: t.aiQuote,
      tag: '03 / COGNITIVE_TOOL',
      accentColor: 'border-[#40252F]',
      bgColor: 'bg-[#40252F]/5',
    },
  ];

  return (
    <main className="min-h-screen bg-[#F3F0F1] text-[#1E293B] font-sans">
      {/* LandingHero Component */}
      <LandingHero />

      {/* Core Explanations Section */}
      <section id="explanations" className="py-20 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {explanations.map((exp, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-none border-2 ${exp.accentColor} shadow-[6px_6px_0px_0px_rgba(64,37,47,0.1)] p-8 flex flex-col justify-between transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(64,37,47,0.15)]`}
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <span className="text-xs font-mono font-bold text-gray-400">
                    {exp.tag}
                  </span>
                  <div className={`w-2.5 h-2.5 rounded-none ${idx === 0 ? 'bg-[#9B2740]' : idx === 1 ? 'bg-[#A68C41]' : 'bg-[#40252F]'}`} />
                </div>
                <h3 className="text-xl font-black text-[#40252F] tracking-tight uppercase">
                  {exp.title}
                </h3>
                <blockquote className={`border-l-4 ${exp.accentColor} pl-4 py-1 text-sm text-[#1E293B] italic leading-relaxed ${exp.bgColor}`}>
                  "{exp.quote}"
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#40252F] text-white py-16 border-t-4 border-[#A68C41]">
        <div className="max-w-4xl mx-auto text-center px-6 space-y-6">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider">
            Ready to Begin Discovery?
          </h2>
          <p className="text-gray-300 font-mono text-sm max-w-xl mx-auto">
            Experience the automated workflow. Convert user stories and technical stack requirements instantly.
          </p>
          <div className="pt-2">
            <Link
              href="/discovery"
              className="bg-[#A68C41] hover:bg-[#9B2740] hover:border-white text-[#40252F] hover:text-white font-bold px-8 py-4 border-2 border-[#40252F] rounded-none shadow-[4px_4px_0px_0px_#FFFFFF] hover:shadow-none active:translate-x-1 active:translate-y-1 transition-all duration-150 tracking-wider uppercase text-sm inline-block"
            >
              {t.startDiscovery}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
