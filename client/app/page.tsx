"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

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
const ArcadeSpaceCanvas = dynamic(
  () => import("@/components/ArcadeSpaceCanvas"),
  { ssr: false }
);

function playCoinSound() {
  if (typeof window === "undefined") return;
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    ([
      [880, 0],
      [1200, 0.12],
      [660, 0.24],
    ] as [number, number][]).forEach(([freq, delay]) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = freq;
      g.gain.setValueAtTime(0.08, ctx.currentTime + delay);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.1);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.12);
    });
  } catch (_) {
    /* audio not supported */
  }
}

export default function Page() {
  const [coinState, setCoinState] = useState<"idle" | "ready">("idle");

  const handleInsertCoin = () => {
    setCoinState("ready");
    playCoinSound();
  };

  return (
    <main className="relative min-h-screen bg-[#0B0C10] text-[#F3F4F6] overflow-hidden selection:bg-[#FF007F] selection:text-white">
      {/* 3D background space canvas */}
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
  );
}
