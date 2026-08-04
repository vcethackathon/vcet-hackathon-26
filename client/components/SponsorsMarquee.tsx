'use client';

import { Terminal, Shield, Cpu, Zap, Cloud, Globe, Layers, Database } from 'lucide-react';

export default function SponsorsMarquee() {
  const sponsorPlaceholders = [
    { name: 'POLYMER_LABS', icon: Terminal, category: 'TITLE SPONSOR' },
    { name: 'NEON_CLOUD', icon: Cloud, category: 'INFRASTRUCTURE' },
    { name: 'CYBER_SEC', icon: Shield, category: 'SECURITY PARTNER' },
    { name: 'SILICON_CORE', icon: Cpu, category: 'HARDWARE' },
    { name: 'DEFI_VAULT', icon: Layers, category: 'WEB3 COMMUNITY' },
    { name: 'DATA_PULSE', icon: Database, category: 'ANALYTICS' },
    { name: 'NEXUS_DEV', icon: Globe, category: 'COMMUNITY' },
    { name: 'QUANTUM_AI', icon: Zap, category: 'AI TECH' },
  ];

  // Double list for smooth infinite scroll
  const marqueeItems = [...sponsorPlaceholders, ...sponsorPlaceholders];

  return (
    <section id="sponsors" className="relative py-16 bg-[#0B0C10] border-t-2 border-[#8A2BE2]/40 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
        <span className="font-pixel text-xs text-[#00F0FF] tracking-widest uppercase bg-black px-4 py-1 border border-[#00F0FF] inline-block">
          // 05. POWERED BY INDUSTRY LEADERS
        </span>
        <h3 className="font-pixel text-xl sm:text-2xl text-white mt-3 uppercase">
          SPONSORS & ECOSYSTEM PARTNERS
        </h3>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden bg-[#12131C] py-8 border-y border-gray-800">
        
        {/* Fade gradient edges */}
        <div className="absolute top-0 bottom-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-[#0B0C10] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-[#0B0C10] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-8 sm:gap-12">
          {marqueeItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-6 py-3 bg-[#0B0C10] border border-gray-800 hover:border-[#00F0FF] transition-all group grayscale hover:grayscale-0 cursor-pointer shrink-0"
            >
              <item.icon className="w-6 h-6 text-gray-400 group-hover:text-[#FF007F] transition-colors" />
              <div className="flex flex-col text-left">
                <span className="font-pixel text-xs text-gray-300 group-hover:text-white transition-colors tracking-wider">
                  {item.name}
                </span>
                <span className="text-[9px] font-mono text-gray-500 group-hover:text-[#00F0FF]">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
