import React from 'react';
import Link from 'next/link';

export const LandingHero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#40252F] via-[#2F1620] to-[#120007] text-white py-24 md:py-32 px-6">
      {/* Background patterns / glowing circles */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#9B2740]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#A68C41]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center relative z-10 space-y-8">
        {/* Brand Tag */}
        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-gray-300 backdrop-blur-md animate-pulse">
          <span className="w-2 h-2 rounded-full bg-[#A68C41]" />
          <span>CONSID PARTNER ECOSYSTEM</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto">
          Turn Customer Conversations into{' '}
          <span className="bg-gradient-to-r from-[#A68C41] via-[#E2C785] to-[#A68C41] bg-clip-text text-transparent">
            Software Blueprints
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
          AI-powered discovery for software consultants. Accelerate requirement gathering, eliminate manual documentation, and align teams instantly.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/discovery"
            className="w-full sm:w-auto bg-gradient-to-r from-[#9B2740] to-[#A68C41] hover:from-[#A68C41] hover:to-[#9B2740] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-center tracking-wide"
          >
            Start Discovery Session
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-full transition-all duration-200 text-center tracking-wide backdrop-blur-md"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};
