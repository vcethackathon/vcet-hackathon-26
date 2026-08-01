'use client';

import { motion } from 'framer-motion';
import { Lock, Sparkles, HelpCircle } from 'lucide-react';

export default function TracksSection() {
  const lockedTracks = [
    {
      id: 'TRACK_01',
      title: 'LOCKED TRACK #01',
      category: 'AI & INTELLIGENT AGENTS',
      difficulty: 'CLASS LEVEL: NIGHTMARE',
      hint: 'Neural networks, autonomous workflows & LLM engines',
    },
    {
      id: 'TRACK_02',
      title: 'LOCKED TRACK #02',
      category: 'WEB3 & DECENTRALIZED ARCHITECTURE',
      difficulty: 'CLASS LEVEL: HARD',
      hint: 'Smart contracts, zero-knowledge proofs & privacy',
    },
    {
      id: 'TRACK_03',
      title: 'LOCKED TRACK #03',
      category: 'FINTECH & DEVSYSTEMS',
      difficulty: 'CLASS LEVEL: BOSS FIGHT',
      hint: 'High-frequency APIs, security tooling & infrastructure',
    },
    {
      id: 'TRACK_04',
      title: 'LOCKED TRACK #04',
      category: 'OPEN INNOVATION / WILD CARD',
      difficulty: 'CLASS LEVEL: UNRESTRICTED',
      hint: 'Hardware hacks, spatial computing & rogue tech',
    },
  ];

  return (
    <section id="tracks" className="relative py-24 bg-[#0B0C10] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#FF007F]/20 border border-[#FF007F] mb-4">
            <Lock className="w-4 h-4 text-[#FF007F] animate-pulse" />
            <span className="font-pixel text-[10px] sm:text-xs text-[#FF007F] tracking-widest uppercase">
              // 02. COMPETITION DOMAINS
            </span>
          </div>

          <h2 className="font-pixel text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase mb-4">
            TRACKS <span className="text-[#FFD700] animate-glitch">DROPPING SOON</span>
          </h2>

          <p className="font-mono text-sm sm:text-base text-gray-400 max-w-2xl">
            Challenge domains are encrypted under stage security. Track details and specialized problem statements will be unlocked on <span className="text-[#00F0FF] font-semibold">[Date TBD - Check back soon]</span>.
          </p>
        </div>

        {/* 4 Locked Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {lockedTracks.map((track, idx) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative bg-[#12131C] border-2 border-gray-800 p-6 overflow-hidden group hover:border-[#FF007F] transition-all hover:-translate-y-1 shadow-[4px_4px_0px_#000]"
            >
              {/* Blur Overlay & Lock Icon */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-10 flex flex-col items-center justify-center p-6 text-center group-hover:bg-black/50 transition-colors">
                <div className="w-12 h-12 bg-[#FF007F] border-2 border-black flex items-center justify-center mb-3 shadow-[3px_3px_0px_#00F0FF] group-hover:scale-110 transition-transform">
                  <Lock className="w-6 h-6 text-black" />
                </div>
                <span className="font-pixel text-xs text-[#FFD700] tracking-widest mb-1">
                  ??? LOCKED ???
                </span>
                <span className="text-[10px] font-mono text-gray-300 bg-[#8A2BE2]/40 border border-[#8A2BE2] px-2 py-1 mt-2">
                  REVEAL DATE TBD
                </span>
              </div>

              {/* Blurred Card Content Preview (Intrigue) */}
              <div className="filter blur-[3px] select-none opacity-40">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-pixel text-[9px] text-[#00F0FF]">
                    {track.id}
                  </span>
                  <HelpCircle className="w-4 h-4 text-gray-600" />
                </div>

                <h3 className="font-pixel text-sm text-white mb-2">
                  {track.title}
                </h3>

                <div className="text-[11px] font-mono text-[#FF007F] mb-3">
                  {track.difficulty}
                </div>

                <p className="text-xs text-gray-400 font-sans-custom mb-6">
                  {track.hint}
                </p>

                <div className="w-full h-8 bg-gray-800 rounded border border-gray-700 flex items-center justify-center text-[10px] font-pixel text-gray-500">
                  UNAVAILABLE
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Teaser Announcement Callout */}
        <div className="mt-12 text-center bg-[#12131C] border border-[#00F0FF]/40 p-6 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
          <div className="flex items-center gap-3 text-left">
            <Sparkles className="w-6 h-6 text-[#FFD700] shrink-0" />
            <div>
              <h4 className="font-pixel text-xs text-white">
                WANT EARLY TRACK ANNOUNCEMENT NOTIFICATIONS?
              </h4>
              <p className="text-xs text-gray-400 font-mono mt-1">
                Register early on Unstop to receive track briefs straight to your inbox.
              </p>
            </div>
          </div>
          <span className="font-pixel text-[10px] text-[#00F0FF] border border-[#00F0FF] px-3 py-2 whitespace-nowrap">
            STAY TUNED
          </span>
        </div>

      </div>
    </section>
  );
}
