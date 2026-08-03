'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<'playing' | 'exiting'>('playing');
  const videoRef = useRef<HTMLVideoElement>(null);

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
          {/* Video — auto-plays immediately upon load */}
          <video
            ref={videoRef}
            muted
            autoPlay
            playsInline
            preload="auto"
            onEnded={handleEnd}
            className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-300 ${phase === 'playing' ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src="/preloader_v2.mp4" type="video/mp4" />
          </video>

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
