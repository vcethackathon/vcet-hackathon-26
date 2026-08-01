'use client';

import { useState, useEffect } from 'react';
import { UNSTOP_URL, SITE_CONFIG } from '@/config/site';
import { ExternalLink, ChevronDown, Calendar, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { playRegistrationSound, playHoverSound } from '@/utils/sound';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const targetDate = new Date(SITE_CONFIG.eventStartISO).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background Video (full brightness & clarity) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 scale-105"
        poster="/next.svg"
      >
        <source src="/Web_hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Lightened Dark Overlay (20-30% opacity for clear video visibility) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-black/25 to-black/30 z-10" />
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Retro Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#8A2BE2]/50 border border-[#00F0FF]/60 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
        >
          <Sparkles className="w-4 h-4 text-[#FFD700] animate-pulse" />
          <span className="font-pixel text-[10px] sm:text-xs text-[#00F0FF] tracking-wider uppercase">
            STAGE 2026 // ANNUAL COLLEGE HACKATHON
          </span>
        </motion.div>

        {/* Main Pixel Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-pixel text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-tight uppercase mb-4 drop-shadow-[0_6px_10px_rgba(0,0,0,0.95)]"
        >
          <span className="text-[#FF007F] animate-glitch block mb-2 sm:inline sm:mb-0">ARCADE</span>
          <span className="text-gray-300 hidden sm:inline"> – </span>
          <span className="text-[#00F0FF] block sm:inline">PIXELS TO POSSIBILITIES</span>
        </motion.h1>

        {/* Event Subline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-gray-200 text-sm sm:text-base md:text-lg font-mono mb-10 bg-black/60 px-6 py-2 border border-gray-800 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 text-[#FFD700]">
            <Calendar className="w-4 h-4" />
            <span>{SITE_CONFIG.dates}</span>
          </div>
          <span className="text-gray-600 hidden sm:inline">•</span>
          <div className="flex items-center gap-2 text-[#00F0FF]">
            <MapPin className="w-4 h-4" />
            <span>{SITE_CONFIG.venue}</span>
          </div>
        </motion.div>

        {/* Retro Digital Scoreboard Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-2xl bg-black/85 border-2 border-[#8A2BE2] p-4 sm:p-6 mb-10 shadow-[0_0_30px_rgba(138,43,226,0.4)] relative"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0B0C10] px-4 border border-[#FF007F]">
            <span className="font-pixel text-[9px] sm:text-[11px] text-[#FF007F] tracking-widest">
              EVENT COUNTDOWN SCOREBOARD
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-2">
            {[
              { label: 'DAYS', val: timeLeft.days },
              { label: 'HOURS', val: timeLeft.hours },
              { label: 'MINUTES', val: timeLeft.minutes },
              { label: 'SECONDS', val: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center bg-[#12131C] border border-[#00F0FF]/30 p-2 sm:p-3 relative overflow-hidden group"
              >
                <div className="font-pixel text-xl sm:text-3xl md:text-4xl text-[#FFD700] tracking-widest font-bold">
                  {mounted ? String(item.val).padStart(2, '0') : '00'}
                </div>
                <div className="text-[9px] sm:text-[11px] font-mono text-gray-400 mt-1 tracking-wider">
                  {item.label}
                </div>
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#FF007F]/40 group-hover:bg-[#00F0FF]" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
        >
          <a
            href={UNSTOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playRegistrationSound}
            onMouseEnter={playHoverSound}
            className="btn-arcade-magenta px-8 py-4 text-xs sm:text-sm tracking-wider flex items-center gap-3 rounded-none text-white font-bold"
          >
            <span>REGISTER ON UNSTOP</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href="#about"
            className="btn-arcade-cyan px-8 py-4 text-xs sm:text-sm tracking-wider flex items-center gap-2 rounded-none font-bold"
          >
            <span>EXPLORE ARCADE</span>
          </a>
        </motion.div>

        {/* Blinking "PRESS START" Prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-14 sm:mt-16 flex flex-col items-center gap-2"
        >
          <a
            href="#about"
            className="font-pixel text-xs sm:text-sm text-[#FFD700] tracking-widest animate-blink hover:text-[#00F0FF] flex flex-col items-center gap-1 transition-colors"
          >
            <span>▼ PRESS START TO PLAY ▼</span>
            <ChevronDown className="w-5 h-5 animate-bounce text-[#FF007F]" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
