'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-1 bg-[#2F1620] border border-[#9B2740]/40 p-1 rounded-lg">
      <button
        onClick={() => setLanguage('sv')}
        className={`px-3 py-1 text-xs font-bold uppercase transition-all duration-200 rounded-md ${
          language === 'sv'
            ? 'bg-[#9B2740] text-white shadow-sm'
            : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        SV
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 text-xs font-bold uppercase transition-all duration-200 rounded-md ${
          language === 'en'
            ? 'bg-[#9B2740] text-white shadow-sm'
            : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        EN
      </button>
    </div>
  );
};
