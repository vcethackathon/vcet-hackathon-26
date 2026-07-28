"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import TracksSection from "@/components/sections/TracksSection";
import PrizesSection from "@/components/sections/PrizesSection";
import TimelineSection from "@/components/sections/TimelineSection";
import SponsorsSection from "@/components/sections/SponsorsSection";
import GuidelinesSection from "@/components/sections/GuidelinesSection";
import RegisterSection from "@/components/sections/RegisterSection";
import GallerySection from "@/components/sections/GallerySection";
import FaqSection from "@/components/sections/FaqSection";
import FooterSection from "@/components/sections/FooterSection";

// Fixed 3D background canvas — lazy-loaded, no SSR
const ArcadeSpaceCanvas = dynamic(
  () => import("@/components/ArcadeSpaceCanvas"),
  { ssr: false }
);

// ─── Coin-insert sound effect ──────────────────────────────────────────────
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

// ─── Page ──────────────────────────────────────────────────────────────────
export default function Page() {
  const [coinState, setCoinState] = useState<"idle" | "ready">("idle");

  const handleInsertCoin = () => {
    setCoinState("ready");
    playCoinSound();
  };

  return (
    <>
      {/* Fixed 3D space background that reacts to scroll */}
      <ArcadeSpaceCanvas />

      {/* Sticky navigation */}
      <Navbar />

      {/* Page sections */}
      <HeroSection coinState={coinState} onInsertCoin={handleInsertCoin} />
      <AboutSection />
      <TracksSection />
      <PrizesSection />
      <TimelineSection />
      <SponsorsSection />
      <GuidelinesSection />
      <RegisterSection />
      <GallerySection />
      <FaqSection />
      <FooterSection onInsertCoin={handleInsertCoin} />
    </>
  );
}
