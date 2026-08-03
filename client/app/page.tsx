"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { playRegistrationSound, playHoverSound } from "@/utils/sound";

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

// Fixed 3D background space canvas — lazy-loaded, no SSR
// Only loaded AFTER preloader completes to prevent lag during video playback
const ArcadeSpaceCanvas = dynamic(
  () => import("@/components/ArcadeSpaceCanvas"),
  { ssr: false }
);

export default function Page() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [coinState, setCoinState] = useState<"idle" | "ready">("idle");

  useEffect(() => {
    if (!preloaderDone) return;

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
  }, [preloaderDone]);

  const handleInsertCoin = () => {
    setCoinState("ready");
    playRegistrationSound();
  };

  return (
    <>
      {/* Preloader — sits above everything, defers main content until complete */}
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* Main site — only rendered after preloader is done to prevent lag */}
      {preloaderDone && (
        <main className="relative min-h-screen bg-[#0B0C10] text-[#F3F4F6] overflow-hidden selection:bg-[#FF007F] selection:text-white">
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

          {/* 8. FAQ Section */}
          <FaqSection />

          {/* 9. Footer */}
          <Footer />
        </main>
      )}
    </>
  );
}
