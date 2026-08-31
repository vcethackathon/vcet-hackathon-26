'use client';

import { motion } from 'framer-motion';

export default function SponsorsMarquee() {
  return (
    <section
      id="sponsors"
      className="relative py-20 sm:py-28 bg-[#0B0C10] border-t-2 border-[#8A2BE2]/40 overflow-hidden"
    >
      {/* Background Arcade Grid Lines & Radial Glow */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #00F0FF 1px, transparent 1px), linear-gradient(to bottom, #00F0FF 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FFD700]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-pixel text-xs text-[#00F0FF] tracking-widest uppercase bg-black px-4 py-1.5 border border-[#00F0FF] inline-block shadow-[3px_3px_0px_#FF007F]">
            // 05. POWERED BY INDUSTRY LEADERS
          </span>
          <h2 className="font-pixel text-2xl sm:text-3xl lg:text-4xl text-white mt-4 uppercase tracking-tight">
            SPONSORS & <span className="text-[#FF007F]">ECOSYSTEM PARTNERS</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-gray-400 max-w-xl mx-auto mt-3">
            Backed by visionary tech giants and financial institutions powering VCET Hackathon 2026.
          </p>
        </div>

        {/* ======================================================== */}
        {/* 👑 TIER 01: TITLE SPONSOR (Dominant Hero Card) */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <div className="relative bg-[#0E1017] border-2 border-[#FFD700] p-6 sm:p-10 shadow-[6px_6px_0px_#FFD700] hover:shadow-[10px_10px_0px_#FFD700,0_0_40px_rgba(255,215,0,0.3)] transition-all duration-300 group hover:-translate-x-1 hover:-translate-y-1">
            {/* Gold Pixel Corner Brackets */}
            <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#FFD700]" />
            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-[#FFD700]" />
            <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-[#FFD700]" />
            <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#FFD700]" />

            {/* Top Tier Badge Banner */}
            <div className="flex items-center justify-between flex-wrap gap-2 mb-6 border-b border-[#FFD700]/30 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFD700] animate-ping" />
                <span className="font-pixel text-[10px] sm:text-xs text-[#FFD700] tracking-widest uppercase">
                  👑 RANK 01 // OFFICIAL TITLE SPONSOR
                </span>
              </div>
              <span className="font-mono text-[10px] sm:text-xs text-gray-400 bg-black/60 px-3 py-1 border border-gray-800">
                MAX POWER ALLY
              </span>
            </div>

            {/* Logo and Content Display */}
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
              {/* Grand Logo Box */}
              <div className="h-32 sm:h-44 w-full sm:w-1/2 flex items-center justify-center p-4 bg-[#08090E] border border-[#FFD700]/30 group-hover:border-[#FFD700] transition-colors rounded-none">
                <img
                  src="/sponsors/g-systems.png"
                  alt="G-Systems"
                  className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Title Sponsor Details */}
              <div className="flex flex-col text-center sm:text-left w-full sm:w-1/2">
                <span className="font-pixel text-lg sm:text-2xl text-white tracking-wider mb-1 group-hover:text-[#FFD700] transition-colors">
                  G-SYSTEMS
                </span>
                <span className="font-mono text-sm sm:text-base font-bold text-[#FFD700] tracking-widest uppercase mb-3">
                  TITLE SPONSOR
                </span>
                <p className="font-mono text-xs text-gray-400 leading-relaxed">
                  Leading next-generation technology solutions and driving innovation as the premier title partner of VCET Hackathon 2026.
                </p>
                <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-center sm:justify-start gap-3">
                  <span className="font-pixel text-[9px] text-[#FFD700] bg-[#FFD700]/10 px-2 py-0.5 border border-[#FFD700]/40">
                    FEATURED PARTNER
                  </span>
                  <span className="font-mono text-[10px] text-gray-500">
                    LEVEL 01 ACCESS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* ⚡ & 🛡️ TIER 02 & TIER 03 (Two-Column Arcade Grid) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {/* TIER 02: CO-SPONSOR (Jeebr) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative bg-[#0E1017] border-2 border-[#00F0FF] p-6 sm:p-8 shadow-[5px_5px_0px_#00F0FF] hover:shadow-[8px_8px_0px_#00F0FF,0_0_30px_rgba(0,240,255,0.35)] transition-all duration-300 group hover:-translate-x-1 hover:-translate-y-1"
          >
            {/* Cyan Pixel Corner Brackets */}
            <div className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#00F0FF]" />
            <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#00F0FF]" />
            <div className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#00F0FF]" />
            <div className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#00F0FF]" />

            <div className="flex items-center justify-between mb-4 border-b border-[#00F0FF]/30 pb-3">
              <span className="font-pixel text-[9px] sm:text-[10px] text-[#00F0FF] tracking-wider uppercase">
                ⚡ RANK 02 // POWERED BY
              </span>
              <span className="font-mono text-[9px] text-gray-500">
                TIER 02
              </span>
            </div>

            <div className="h-24 sm:h-28 w-full flex items-center justify-center p-3 bg-[#08090E] border border-[#00F0FF]/25 mb-4">
              <img
                src="/sponsors/jeebr.png"
                alt="Jeebr"
                className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="text-left">
              <h3 className="font-pixel text-base sm:text-lg text-white group-hover:text-[#00F0FF] transition-colors">
                Jeebr
              </h3>
              <p className="font-mono text-xs text-[#00F0FF] font-bold tracking-wider mt-0.5">
                POWERED BY
              </p>
            </div>
          </motion.div>

          {/* TIER 03: BANKING PARTNER (Union Bank of India) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative bg-[#0E1017] border-2 border-[#8A2BE2] p-6 sm:p-8 shadow-[5px_5px_0px_#8A2BE2] hover:shadow-[8px_8px_0px_#8A2BE2,0_0_30px_rgba(138,43,226,0.35)] transition-all duration-300 group hover:-translate-x-1 hover:-translate-y-1"
          >
            {/* Purple Pixel Corner Brackets */}
            <div className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#8A2BE2]" />
            <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#8A2BE2]" />
            <div className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#8A2BE2]" />
            <div className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#8A2BE2]" />

            <div className="flex items-center justify-between mb-4 border-b border-[#8A2BE2]/30 pb-3">
              <span className="font-pixel text-[9px] sm:text-[10px] text-[#8A2BE2] tracking-wider uppercase">
                🛡️ RANK 03 // BANKING PARTNER
              </span>
              <span className="font-mono text-[9px] text-gray-500">
                TIER 03
              </span>
            </div>

            <div className="h-24 sm:h-28 w-full flex items-center justify-center p-3 bg-[#08090E] border border-[#8A2BE2]/25 mb-4">
              <img
                src="/sponsors/union-bank.png"
                alt="Union Bank of India"
                className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="text-left">
              <h3 className="font-pixel text-base sm:text-lg text-white group-hover:text-[#8A2BE2] transition-colors">
                Union Bank of India
              </h3>
              <p className="font-mono text-xs text-[#8A2BE2] font-bold tracking-wider mt-0.5">
                OFFICIAL BANKING PARTNER
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
