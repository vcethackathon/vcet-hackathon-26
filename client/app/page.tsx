"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { playRegistrationSound, playHoverSound } from "@/utils/sound";
import { preloadAll3DAssets } from "@/utils/modelPreloader";

import Preloader from "@/components/Preloader";
import CRTOverlay from "@/components/CRTOverlay";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import StatsStrip from "@/components/StatsStrip";
import TracksSection from "@/components/TracksSection";
import TimelineSection from "@/components/TimelineSection";
import PrizesSection from "@/components/PrizesSection";
import SponsorsMarquee from "@/components/SponsorsMarquee";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import { FramerThumbnailCarousel } from "@/components/ui/framer-thumbnail-carousel";

// Fixed 3D background space canvas — lazy-loaded, no SSR
const ArcadeSpaceCanvas = dynamic(
  () => import("@/components/ArcadeSpaceCanvas"),
  { ssr: false }
);

export default function Page() {
  const [preloaderPhase, setPreloaderPhase] = useState<'active' | 'exiting' | 'done'>('active');
  const [coinState, setCoinState] = useState<"idle" | "ready">("idle");

  useEffect(() => {
    // Start preloading 3D assets immediately on website opening
    preloadAll3DAssets();
  }, []);

  useEffect(() => {
    if (preloaderPhase !== 'done') return;

    let lastHovered: Element | null = null;

    const isRegistrationElement = (el: Element | null): boolean => {
      if (!el) return false;
      const target = el.closest("a, button");
      if (!target) return false;

      const href = target.getAttribute("href") || "";
      const text = target.textContent?.toUpperCase() || "";
      return (
        href.includes("unstop") ||
        href === "#register" ||
        target.id === "register" ||
        text.includes("REGISTER") ||
        text.includes("INSERT COIN") ||
        target.classList.contains("btn-arcade-magenta") ||
        target.classList.contains("btn-arcade-gold") ||
        target.classList.contains("prize-cta")
      );
    };

    const handleGlobalClick = (e: MouseEvent) => {
      if (isRegistrationElement(e.target as Element)) {
        playRegistrationSound();
      }
    };

    const handleGlobalMouseOver = (e: MouseEvent) => {
      const target = (e.target as Element)?.closest("a, button");
      if (target && target !== lastHovered && isRegistrationElement(target)) {
        lastHovered = target;
        playHoverSound();
      }
    };

    const handleGlobalMouseOut = (e: MouseEvent) => {
      const target = (e.target as Element)?.closest("a, button");
      if (target === lastHovered) {
        lastHovered = null;
      }
    };

    window.addEventListener("click", handleGlobalClick, { capture: true });
    window.addEventListener("mouseover", handleGlobalMouseOver, { capture: true });
    window.addEventListener("mouseout", handleGlobalMouseOut, { capture: true });

    return () => {
      window.removeEventListener("click", handleGlobalClick, { capture: true });
      window.removeEventListener("mouseover", handleGlobalMouseOver, { capture: true });
      window.removeEventListener("mouseout", handleGlobalMouseOut, { capture: true });
    };
  }, [preloaderPhase]);

  const handleInsertCoin = () => {
    setCoinState("ready");
    playRegistrationSound();
  };

  return (
    <>
      {/* Preloader — sits above everything, fades out over 800ms when video ends */}
      {preloaderPhase !== 'done' && (
        <Preloader 
          onExitStart={() => setPreloaderPhase('exiting')}
          onComplete={() => setPreloaderPhase('done')} 
        />
      )}

      {/* Main site — mounted always so 3D models and canvases load/render in the background during preloader */}
      <main 
        className={`relative min-h-screen bg-[#0B0C10] text-[#F3F4F6] selection:bg-[#FF007F] selection:text-white ${
          preloaderPhase !== 'done' ? 'h-screen overflow-hidden pointer-events-none select-none' : 'overflow-hidden'
        }`}
      >
        {/* 3D background space canvas — mounted only after preloader */}
        <ArcadeSpaceCanvas />

        {/* Retro CRT Scanlines & Vignette Overlay */}
        <CRTOverlay />

        {/* Sticky Navigation Bar */}
        <Navbar />

        {/* 1. 3D Arcade Cabinet Hero Section */}
        <HeroSection coinState={coinState} onInsertCoin={handleInsertCoin} />

        {/* 2. 3D Pac-Man About Section */}
        <AboutSection />

        {/* 3. Scoreboard Stats Strip */}
        <StatsStrip />

        {/* 4. Tracks Section */}
        <TracksSection />

        {/* 5. Timeline / Level Progression */}
        <TimelineSection />

        {/* 6. Prizes Section */}
        <PrizesSection />

        {/* 7. Sponsors Marquee */}
        <SponsorsMarquee />

        {/* 7.5 Gallery Carousel */}
        <section id="gallery" className="relative py-24 bg-[#0B0C10] border-t-2 border-[#00F0FF]/30 overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-10">
              <h2 className="font-pixel text-4xl sm:text-5xl uppercase tracking-tight mb-4">
                <span className="text-[#00F0FF] block">EVENT</span>
                <span className="text-[#FF007F] animate-glitch block drop-shadow-[0_4px_12px_rgba(255,0,127,0.6)]">
                  GALLERY
                </span>
              </h2>
            </div>
          </div>
          <div className="relative z-10">
            <FramerThumbnailCarousel />
          </div>
        </section>

        {/* 8. FAQ Section */}
        <FaqSection />

        {/* 9. Footer */}
        <Footer />
      </main>
    </>
  );
}
