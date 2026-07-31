'use client';

import { motion } from 'framer-motion';
import ArcadeStage from './ArcadeStage';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 bg-[#0B0C10] border-t-2 border-[#8A2BE2]/40 overflow-hidden">
      {/* Background Retro Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #00F0FF 1px, transparent 1px), linear-gradient(to bottom, #FF007F 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header Tag */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-3 h-3 bg-[#FF007F]" />
          <span className="font-pixel text-xs text-[#00F0FF] tracking-widest uppercase">
            // 01. ABOUT THE THEME
          </span>
        </div>

        {/* Oversized House of Yellow-Style Bold Quote / Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <h2 className="font-pixel text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-8">
            WELCOME TO <span className="text-[#FF007F]">ARCADE</span>.<br />
            WHERE <span className="text-[#00F0FF] underline decoration-[#FFD700] underline-offset-8">PIXELS</span> TURN INTO <span className="text-[#FFD700]">REAL IMPACT</span>.
          </h2>

          <div className="h-1 w-32 bg-gradient-to-r from-[#FF007F] via-[#00F0FF] to-[#8A2BE2]" />
        </motion.div>

        {/* Narrative & Feature Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Paragraph Copy (2-3 short paragraphs as requested) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed font-sans-custom"
          >
            <p className="border-l-4 border-[#FF007F] pl-4 bg-[#12131C]/60 py-2">
              <strong className="text-white">VCET Hackathon 2026 &quot;Arcade&quot;</strong> is not just another 30-hour coding marathon. It is an immersive battleground where developers, designers, and visionaries transform individual pixels of logic into high-impact digital solutions.
            </p>

            <p>
              Stepping into the Arcade means embracing high-stakes problem solving, fast-paced prototyping, and collaborative engineering. From machine intelligence and decentralized web frameworks to next-gen developer tools, every level challenges you to push beyond comfortable boundaries.
            </p>

            <p className="text-gray-400">
              Fuel your passion, collaborate with top talent across India, and present your creation before industry leaders to claim your share of the <strong className="text-[#FFD700]">₹85,000 jackpot</strong>. Insert your coin, assemble your squad, and press start!
            </p>
          </motion.div>

          {/* Sketchfab 3D Arcade Embed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5"
          >
            <ArcadeStage />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
