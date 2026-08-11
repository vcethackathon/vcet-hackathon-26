'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
  onExitStart?: () => void;
}

export default function Preloader({ onComplete, onExitStart }: PreloaderProps) {
  const [phase, setPhase] = useState<'playing' | 'exiting'>('playing');
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnd = useCallback(() => {
    setPhase('exiting');
    onExitStart?.();
    setTimeout(() => {
      onComplete();
    }, 800);
  }, [onComplete, onExitStart]);

  useEffect(() => {
    if (!videoRef.current) return;

    const playVideo = async () => {
      try {
        // Attempt unmuted autoplay by default
        videoRef.current!.muted = false;
        await videoRef.current!.play();
        setIsMuted(false);
      } catch (err) {
        // Fallback to muted playback if browser autoplay policy blocks sound
        if (videoRef.current) {
          videoRef.current.muted = true;
          await videoRef.current.play().catch(() => { });
        }
        setIsMuted(true);
      }
    };

    playVideo();
  }, []);

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
          {/* Video — unmuted by default */}
          <video
            ref={videoRef}
            playsInline
            disablePictureInPicture
            preload="auto"
            autoPlay
            muted={isMuted}
            onEnded={handleEnd}
            className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-300 ${phase === 'playing' ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src="/preloader_v2.mp4" type="video/mp4" />
          </video>

          {/* Mute / Unmute Toggle Button */}
          {phase === 'playing' && (
            <button
              onClick={() => {
                if (videoRef.current) {
                  const nextMuted = !videoRef.current.muted;
                  videoRef.current.muted = nextMuted;
                  setIsMuted(nextMuted);
                }
              }}
              className="absolute top-5 right-5 z-20 font-pixel text-[10px] sm:text-xs text-white/80 hover:text-[#00F0FF] uppercase tracking-widest border border-white/20 hover:border-[#00F0FF]/80 px-4 py-2.5 transition-all duration-200 bg-black/60 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center gap-2"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              <span>{isMuted ? '🔇' : '🔊'}</span>
              <span>{isMuted ? 'UNMUTE' : 'MUTE'}</span>
            </button>
          )}


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
                  className="font-pixel text-[10px] sm:text-xs text-white/50 hover:text-white uppercase tracking-widest border border-white/20 hover:border-[#00F0FF]/60 px-5 py-2.5 transition-all duration-200 bg-black/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
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
