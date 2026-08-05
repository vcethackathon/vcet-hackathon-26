'use client';

import { motion } from 'framer-motion';
import { Clock, Zap, Users } from 'lucide-react';

// Window Top Control Dots component [ □ □ ☒ ]
function WindowDots() {
  return (
    <div className="flex items-center gap-1">
      <div className="w-2 h-2 bg-[#00F0FF] rounded-none" />
      <div className="w-2 h-2 bg-[#FFD700] rounded-none" />
      <div className="w-2 h-2 bg-[#FF007F] rounded-none" />
    </div>
  );
}

export default function StatsStrip() {
  return (
    <section className="relative py-16 bg-[#0B0C10] border-y-4 border-[#FF007F] shadow-[0_0_25px_rgba(255,0,127,0.3)] overflow-hidden">

      {/* Background Subtle Retro Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #00F0FF 1px, transparent 1px), linear-gradient(to bottom, #FF007F 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Pill */}
        <div className="text-center mb-10">
          <span className="font-pixel text-xs text-[#FFD700] tracking-widest uppercase bg-black px-4 py-1.5 border border-[#FFD700] inline-block shadow-[3px_3px_0px_#FF007F]">
            ★ HIGH SCOREBOARD // STATS STRIP ★
          </span>
        </div>

        {/* Main 2×2 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ═══ Panel 1: ₹1,00,000 TOTAL PRIZE POOL ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#0E1017] border-4 border-[#00F0FF] p-6 relative min-h-[200px] flex flex-col shadow-[6px_6px_0px_#000]"
          >
            {/* Corner Accent */}
            <div className="absolute top-1 left-1 w-2.5 h-2.5 bg-[#FF007F]" />
            <div className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-[#00F0FF]" />

            {/* Window Header */}
            <div className="flex items-center justify-between mb-6">
              <span className="font-pixel text-[9px] text-[#00F0FF] uppercase tracking-wider pl-3">
                // ARCADE_JACKPOT_PANEL
              </span>
              <WindowDots />
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className="text-3xl">💸</span>
                  <div className="font-pixel text-3xl sm:text-4xl md:text-5xl text-[#FFD700] tracking-tight drop-shadow-[0_0_12px_rgba(255,215,0,0.5)]">
                    <span className="rupee">₹</span>85000
                  </div>
                </div>
                <div className="font-pixel text-xs text-[#00F0FF] tracking-[0.2em] uppercase">
                  TOTAL PRIZE POOL
                </div>
              </div>
            </div>
          </motion.div>

          {/* ═══ Panel 2: 2 DAYS — DAYS OF HACKING ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-[#0E1017] border-4 border-[#00F0FF] p-6 relative min-h-[200px] flex flex-col shadow-[6px_6px_0px_#000]"
          >
            {/* Corner Accent */}
            <div className="absolute top-1 left-1 w-2.5 h-2.5 bg-[#FF007F]" />
            <div className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-[#00F0FF]" />

            {/* Window Header */}
            <div className="flex items-center justify-between mb-6">
              <span className="font-pixel text-[9px] text-[#00F0FF] uppercase tracking-wider pl-3">
                // HACK_DURATION_MODULE
              </span>
              <WindowDots />
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-center gap-6">
              {/* Stat */}
              <div className="text-center">
                <div className="font-pixel text-3xl sm:text-4xl md:text-5xl text-[#FFD700] leading-none mb-2 drop-shadow-[0_0_12px_rgba(255,215,0,0.5)]">
                  2 DAYS
                </div>
                <div className="font-pixel text-xs text-[#00F0FF] tracking-[0.2em] uppercase">
                  DAYS OF CODING
                </div>
              </div>

              {/* Pixel Robot Mascot (decorative) */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="shrink-0"
              >
                <svg viewBox="0 0 32 32" className="w-16 h-16 drop-shadow-[0_0_10px_rgba(255,0,127,0.6)]">
                  {/* Antenna */}
                  <rect x="15" y="1" width="2" height="4" fill="#FF007F" />
                  <rect x="14" y="0" width="4" height="2" fill="#FFD700" />
                  {/* Head */}
                  <rect x="8" y="5" width="16" height="10" fill="#0B0C10" stroke="#00F0FF" strokeWidth="1.5" />
                  {/* Eyes */}
                  <rect x="10" y="8" width="3" height="3" fill="#FF007F" />
                  <rect x="19" y="8" width="3" height="3" fill="#FF007F" />
                  {/* Mouth */}
                  <rect x="12" y="12" width="8" height="1" fill="#FFD700" />
                  {/* Body */}
                  <rect x="6" y="16" width="20" height="12" fill="#0B0C10" stroke="#00F0FF" strokeWidth="1.5" />
                  {/* Core Gem */}
                  <rect x="14" y="19" width="4" height="4" fill="#00F0FF" />
                  {/* Arms */}
                  <rect x="2" y="18" width="4" height="6" fill="#8A2BE2" />
                  <rect x="26" y="18" width="4" height="6" fill="#8A2BE2" />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          {/* ═══ Panel 3: 36+ HRS — HOURS OF CODE ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#0E1017] border-4 border-[#00F0FF] p-6 relative min-h-[200px] flex flex-col shadow-[6px_6px_0px_#000]"
          >
            {/* Corner Accent */}
            <div className="absolute top-1 left-1 w-2.5 h-2.5 bg-[#FF007F]" />
            <div className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-[#00F0FF]" />

            {/* Window Header */}
            <div className="flex items-center justify-between mb-6">
              <span className="font-pixel text-[9px] text-[#00F0FF] uppercase tracking-wider pl-3">
                // SPRINT_TIMELINE_MODULE
              </span>
              <WindowDots />
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black/60 border-2 border-[#FFD700] flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div>
                  <div className="font-pixel text-3xl sm:text-4xl md:text-5xl text-[#FFD700] leading-none mb-2 drop-shadow-[0_0_12px_rgba(255,215,0,0.5)]">
                    30 HRS
                  </div>
                  <div className="font-pixel text-xs text-[#00F0FF] tracking-[0.2em] uppercase">
                    HOURS OF CODE
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ═══ Panel 4: 500+ EXPECTED HACKERS ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="bg-[#0E1017] border-4 border-[#00F0FF] p-6 relative min-h-[200px] flex flex-col shadow-[6px_6px_0px_#000]"
          >
            {/* Corner Accent */}
            <div className="absolute top-1 left-1 w-2.5 h-2.5 bg-[#FF007F]" />
            <div className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-[#00F0FF]" />

            {/* Window Header */}
            <div className="flex items-center justify-between mb-6">
              <span className="font-pixel text-[9px] text-[#00F0FF] uppercase tracking-wider pl-3">
                // HACKER_HEADCOUNT_MODULE
              </span>
              <WindowDots />
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black/60 border-2 border-[#FF007F] flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-[#FF007F]" />
                </div>
                <div>
                  <div className="font-pixel text-3xl sm:text-4xl md:text-5xl text-[#FFD700] leading-none mb-2 drop-shadow-[0_0_12px_rgba(255,215,0,0.5)]">
                    200+
                  </div>
                  <div className="font-pixel text-xs text-[#00F0FF] tracking-[0.2em] uppercase">
                    EXPECTED CODERS
                  </div>

                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
