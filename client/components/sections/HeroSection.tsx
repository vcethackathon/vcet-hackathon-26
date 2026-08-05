"use client";

import dynamic from "next/dynamic";
import Countdown from "@/components/ui/Countdown";
import { UNSTOP_URL } from "@/config/site";
import { ExternalLink } from "lucide-react";
import { playRegistrationSound, playHoverSound } from "@/utils/sound";

const ArcadeStage = dynamic(() => import("@/components/ArcadeStage"), {
  ssr: false,
});

interface HeroSectionProps {
  coinState: "idle" | "ready";
  onInsertCoin: () => void;
  show3D?: boolean;
}

export default function HeroSection({ coinState, onInsertCoin, show3D = true }: HeroSectionProps) {
  return (
    <section id="hero" className="hero-section">
      {/* Full-bleed Sketchfab 3D Arcade Cabinet — positioned on the right */}
      <div className="hero-canvas-wrap">
        {show3D && <ArcadeStage />}
      </div>

      {/* Dark gradient overlay — solid black/dark on left for text, fades to transparent on right */}
      <div className="hero-overlay" />

      {/* Decorative grid pattern */}
      <div className="hero-grid-bg" />

      {/* Floating Hero Content Column */}
      <div className="hero-content">
        <div className="hero-eyebrow mb-3">
          <span className="font-pixel text-[10px] sm:text-xs text-[#00F0FF] tracking-wider uppercase">
            VCET ARCADE EDITION 2026
          </span>
        </div>

        <h1 className="hero-h1 font-pixel uppercase tracking-tight mb-4">
          <span className="text-[#00F0FF] block">HACK</span>
          <span className="text-[#00F0FF] block">THE</span>
          <span className="text-[#FF007F] animate-glitch block drop-shadow-[0_4px_12px_rgba(255,0,127,0.6)]">
            ARCADE
          </span>
        </h1>

        <p className="hero-sub font-sans-custom">
          A 30-hour premium hackathon experience at Vidyavardhini's College of
          Engineering &amp; Technology — packed with neon energy, bold ideas,
          and real prizes.
        </p>

        <div className="hero-actions mb-4">
          <a
            id="register"
            href={UNSTOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              playRegistrationSound();
              onInsertCoin();
            }}
            onMouseEnter={playHoverSound}
            className="btn-arcade-magenta px-6 py-3.5 text-xs tracking-wider flex items-center gap-2 rounded-none font-bold"
          >
            <span>▶ REGISTER ON UNSTOP</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <a href="#about" className="btn-arcade-cyan px-6 py-3.5 text-xs tracking-wider flex items-center gap-2 rounded-none font-bold">
            LEARN MORE
          </a>
        </div>

        <Countdown />
      </div>
    </section>
  );
}
