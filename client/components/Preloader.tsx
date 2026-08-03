'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<'splash' | 'playing' | 'exiting'>('splash');
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStart = useCallback(() => {
    setPhase('playing');
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {
        // If sound fails, still proceed
      });
    }
  }, []);

  const handleEnd = useCallback(() => {
    setPhase('exiting');
    setTimeout(() => {
      onComplete();
    }, 800);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exiting' && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] bg-black overflow-hidden"
        >
          {/* Video — preloaded but paused until user clicks */}
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            onEnded={handleEnd}
            className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-300 ${phase === 'playing' ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src="/preloader_v2.mp4" type="video/mp4" />
          </video>

          {/* Splash Screen (shown until user presses start) */}
          <AnimatePresence>
            {phase === 'splash' && (
              <motion.div
                key="splash"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black"
              >
                {/* Retro scanlines */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)',
                  }}
                />

                {/* Arcade glow pulse */}
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-gradient-radial from-[#FF007F]/10 via-transparent to-transparent pointer-events-none"
                />

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex flex-col items-center gap-8 px-6 text-center"
                >
                  {/* Title */}
                  <div className="space-y-3">
                    <div className="font-pixel text-[10px] sm:text-xs text-[#00F0FF] tracking-widest uppercase opacity-80">
                      VCET HACKATHON 2026
                    </div>
                    <h1 className="font-pixel text-2xl sm:text-4xl text-white uppercase leading-tight drop-shadow-[0_0_20px_rgba(255,0,127,0.8)]">
                      <span className="text-[#FF007F]">ARCADE</span>
                    </h1>
                    <div className="font-pixel text-[9px] sm:text-[11px] text-[#FFD700] tracking-widest">
                      PIXELS TO POSSIBILITIES
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#FF007F] to-transparent" />

                  {/* PRESS START Button */}
                  <motion.button
                    onClick={handleStart}
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="font-pixel text-[11px] sm:text-sm text-[#FFD700] uppercase tracking-widest hover:text-white transition-colors cursor-pointer"
                  >
                    ▶ PRESS START
                  </motion.button>

                  <p className="font-mono text-[9px] text-gray-600 tracking-wider">
                    CLICK TO PLAY WITH SOUND
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skip button during video playback */}
          <AnimatePresence>
            {phase === 'playing' && (
              <motion.div
                key="skip"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1, duration: 0.4 }}
                className="absolute bottom-10 sm:bottom-14 left-1/2 -translate-x-1/2 z-20"
              >
                <button
                  onClick={handleEnd}
                  className="font-pixel text-[10px] sm:text-xs text-white/50 hover:text-white uppercase tracking-widest border border-white/20 hover:border-[#00F0FF]/60 px-5 py-2.5 transition-all duration-200 bg-black/50 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                >
                  SKIP INTRO ▶▶
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
