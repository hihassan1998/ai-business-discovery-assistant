'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

// LandingHero displays the hero section with a clean, hard-edges architectural blueprint aesthetic.
export const LandingHero: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="relative overflow-hidden bg-[#40252F] text-white border-b-4 border-[#9B2740] py-20 px-6">
      {/* Grid overlay for technical/blueprint aesthetic */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center space-y-8">
        {/* Flat Technical Tag */}
        <div className="inline-flex items-center space-x-2 bg-black/20 border-2 border-[#A68C41] px-4 py-1.5 rounded-none text-xs font-mono tracking-wider text-[#A68C41]">
          <span className="w-2.5 h-2.5 bg-[#A68C41]" />
          <span>SAGADISCOVERY v1.0.0</span>
        </div>

        {/* Hard-edged Title */}
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto uppercase">
          {t.heroTitle}{' '}
          <span className="bg-[#A68C41] text-[#40252F] px-4 py-1 inline-block transform -rotate-1">
            {t.heroTitleHighlight}
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto font-mono leading-relaxed">
          {t.heroSubtext}
        </p>

        {/* CTA Buttons with hard borders and no blurs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full max-w-md">
          <Link
            href="/discovery"
            className="w-full sm:w-auto bg-[#9B2740] hover:bg-[#A68C41] hover:text-[#40252F] text-white font-bold px-8 py-4 border-2 border-white rounded-none shadow-[4px_4px_0px_0px_#FFFFFF] hover:shadow-none active:translate-x-1 active:translate-y-1 transition-all duration-150 text-center tracking-wider uppercase text-sm"
          >
            {t.startDiscovery}
          </Link>
          <a
            href="#explanations"
            className="w-full sm:w-auto bg-transparent border-2 border-gray-400 hover:border-white text-white font-bold px-8 py-4 rounded-none transition-all duration-150 text-center tracking-wider uppercase text-sm"
          >
            {t.learnMore}
          </a>
        </div>
      </div>
    </div>
  );
};
