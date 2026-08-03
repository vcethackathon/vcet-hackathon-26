"use client";

import dynamic from "next/dynamic";

const HorrorPacmanModel = dynamic(
  () => import("@/components/HorrorPacmanModel"),
  { ssr: false }
);

export default function AboutSection() {
  return (
    <section id="about" className="section relative py-20 bg-[#0B0C10] border-t-2 border-[#8A2BE2]/40 overflow-hidden">
      {/* Background Retro Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #00F0FF 1px, transparent 1px), linear-gradient(to bottom, #FF007F 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="about-grid">
          {/* 3D Model Visual (Left Side) */}
          <div className="about-visual border border-[#00F0FF]/20 bg-[#0D0E16]/80 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.15)]">
            <div className="about-visual-inner">
              <HorrorPacmanModel />
              <div className="about-model-caption font-pixel text-xs text-[#00F0FF] tracking-widest uppercase">
                30H HACK
              </div>
            </div>
          </div>

          {/* Text Copy Column (Right Side) */}
          <div className="flex flex-col justify-center">
            {/* Section Header Tag from temp */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-[#FF007F]" />
              <span className="font-pixel text-xs text-[#00F0FF] tracking-widest uppercase">
                // 01. ABOUT THE THEME
              </span>
            </div>

            {/* Oversized House of Yellow-Style Bold Headline from temp */}
            <h2 className="font-pixel text-xl sm:text-3xl md:text-4xl text-white leading-tight mb-6">
              WELCOME TO <span className="text-[#FF007F]">ARCADE</span>.<br />

              WHERE < span className="text-[#00F0FF]" > PIXELS</span > TURN INTO < span className="text-[#FFD700]" > REAL IMPACT</span >.
            </h2 >

            {/* Gradient Line Divider */}
            < div className="h-1 w-32 bg-gradient-to-r from-[#FF007F] via-[#00F0FF] to-[#8A2BE2] mb-6" />

            {/* Narrative Copy Paragraphs from temp */}
            < div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed font-sans-custom" >
              <p className="border-l-4 border-[#FF007F] pl-4 bg-[#12131C]/60 py-2">
                <strong className="text-white">VCET Hackathon 2026 &quot;Arcade&quot;</strong> is not just another 30-hour coding marathon. It is an immersive battleground where developers, designers, and visionaries transform individual pixels of logic into high-impact digital solutions.
              </p>

              <p>
                Stepping into the Arcade means embracing high-stakes problem solving, fast-paced prototyping, and collaborative engineering. From machine intelligence and decentralized web frameworks to next-gen developer tools, every level challenges you to push beyond comfortable boundaries.
              </p>

              <p className="text-gray-400">
                Fuel your passion, collaborate with top talent across India, and present your creation before industry leaders to claim your share of the <strong className="text-[#FFD700]"><span className="rupee">₹</span>85,000 jackpot</strong>. Insert your coin, assemble your squad, and press start!
              </p>
            </div >
          </div >
        </div >
      </div >
    </section >
  );
}
