'use client';

import React from 'react';
import { LandingHero } from '@/components/ui/LandingHero';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      title: 'Understand',
      description: 'Interact with our conversational AI agent trained in software consulting. It extracts business domains, core challenge points, and systems logic.',
      icon: '🧠',
      accent: 'border-[#9B2740]',
    },
    {
      title: 'Generate',
      description: 'Convert real-time dialogue into structured specifications, user stories, user roles, technical architecture blueprints, and effort projections.',
      icon: '⚡',
      accent: 'border-[#A68C41]',
    },
    {
      title: 'Refine',
      description: 'Work hand-in-hand with human expertise. Instantly edit generated specifications to fit tailored architectures, and directly handoff to senior teams.',
      icon: '✏️',
      accent: 'border-[#40252F]',
    },
  ];

  return (
    <main className="min-h-screen bg-[#F3F0F1] text-[#1E293B]">
      {/* Header / Navbar */}
      <nav className="bg-[#40252F] text-white py-4 px-6 border-b border-[#9B2740]/30 sticky top-0 z-40 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-black text-[#A68C41] tracking-wider">
              CONSID
            </span>
            <span className="text-xs text-gray-300 font-semibold border-l border-gray-500 pl-2">
              SagaDiscovery
            </span>
          </div>
          <Link
            href="/discovery"
            className="bg-[#9B2740] hover:bg-[#A68C41] text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Launch Assistant
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <LandingHero />

      {/* Feature Section */}
      <section id="features" className="py-20 md:py-28 max-w-6xl mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-[#40252F]">
            Designed for Modern Consultants
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto font-medium">
            Streamline initial customer calls and create scoping documents in minutes instead of days.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-3xl p-8 border-t-4 ${feature.accent} shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between`}
            >
              <div>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-[#40252F] mb-3">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
              <div className="pt-6">
                <span className="text-xs text-[#A68C41] font-bold tracking-wider hover:underline cursor-pointer">
                  Learn more &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 md:py-20 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <p className="text-4xl md:text-5xl font-black text-[#9B2740]">40%</p>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Time Saved on Scoping</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl md:text-5xl font-black text-[#A68C41]">100%</p>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Client Alignment</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl md:text-5xl font-black text-[#40252F]">10 min</p>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Average Session Duration</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 md:py-28 max-w-5xl mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#40252F]">
            The Discovery Workflow
          </h2>
          <p className="text-gray-500 max-w-sm mx-auto font-medium">
            How SagaDiscovery automates the requirement gathering pipeline.
          </p>
        </div>

        <div className="space-y-12">
          <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-3xl shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#9B2740]/10 flex items-center justify-center font-bold text-[#9B2740] shrink-0 text-lg">
              1
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-lg text-[#40252F]">Engage in Discovery Interview</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Launch the assistant and have a structured, guided interview. The AI acts as your Junior BA, prompting you with relevant product questions.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-3xl shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#A68C41]/10 flex items-center justify-center font-bold text-[#A68C41] shrink-0 text-lg">
              2
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-lg text-[#40252F]">Generate structured Specification</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Click generate to synthesize the entire conversation transcript into a detailed product specification including functional backlogs, user stories, and architecture.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-3xl shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#40252F]/10 flex items-center justify-center font-bold text-[#40252F] shrink-0 text-lg">
              3
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-lg text-[#40252F]">Refine and Handoff</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Edit any field on-the-fly and click "Send to Consultant". SagaDiscovery immediately packages and forwards the final brief to your engineering leads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#40252F] text-white py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-black text-[#A68C41]">CONSID</span>
            <span className="text-[10px] text-gray-400 font-semibold border-l border-gray-500 pl-2">
              SagaDiscovery &copy; 2026
            </span>
          </div>
          <div className="flex items-center space-x-6 text-xs text-gray-400 font-medium">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Contact Support</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
