"use client";

import dynamic from "next/dynamic";
import Countdown from "@/components/ui/Countdown";
import { HERO_STATS } from "@/data";

const ArcadeStage = dynamic(() => import("@/components/ArcadeStage"), {
  ssr: false,
});

interface HeroSectionProps {
  coinState: "idle" | "ready";
  onInsertCoin: () => void;
}

export default function HeroSection({ coinState, onInsertCoin }: HeroSectionProps) {
  return (
    <section id="hero" className="hero-section">
      {/* Full-bleed Sketchfab 3D model — sits behind everything */}
      <div className="hero-canvas-wrap">
        <ArcadeStage />
      </div>

      {/* Dark gradient overlay — solid on left for text, fades to transparent on right */}
      <div className="hero-overlay" />

      {/* Decorative grid on top of model, below text */}
      <div className="hero-grid-bg" />

      {/* Text content floating on the left */}
      <div className="hero-content">
        <div className="hero-eyebrow">VCET — Arcade Edition — 2026</div>

        <h1 className="hero-h1">
          HACK
          <br />
          THE
          <br />
          ARCADE
        </h1>

        <p className="hero-sub">
          A 30-hour premium hackathon experience at Vidyavardhini's College of
          Engineering &amp; Technology — packed with neon energy, bold ideas,
          and real prizes.
        </p>

        <div className="hero-actions">
          <button id="register" className="btn-primary" onClick={onInsertCoin}>
            {coinState === "ready" ? "▶ PLAYER 1 READY" : "▶ INSERT COIN — JOIN"}
          </button>
          <a href="#about" className="btn-secondary">
            LEARN MORE
          </a>
        </div>

        <Countdown />

        <div className="hero-stats-strip">
          {HERO_STATS.map((s) => (
            <div key={s.lbl} className="hero-stat-item">
              <div className="stat-val">{s.val}</div>
              <div className="stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
