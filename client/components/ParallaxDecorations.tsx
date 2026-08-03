'use client';

/**
 * ParallaxDecorations – Layered Arcade Environment.
 * Layers background (skyline, stars), midground (clouds, tokens, drones),
 * and foreground accents. Responsive & auto-reduces on tablet/mobile.
 */

export default function ParallaxDecorations({
  density = 'full',
  scrollProgress = 0,
}: {
  density?: 'full' | 'reduced' | 'minimal';
  scrollProgress?: number;
}) {
  if (density === 'minimal') {
    // Mobile layout: ultra minimal to prevent text/content overlap
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30" aria-hidden="true">
        <div className="absolute top-10 left-4 w-12 h-4 bg-cyan-500/10 rounded-sm" />
        <div className="absolute top-1/2 right-4 w-10 h-4 bg-pink-500/10 rounded-sm" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
      {/* ── BACKGROUND LAYER: Distant Cyber City Skyline ── */}
      <div className="absolute bottom-0 left-0 right-0 h-48 opacity-[0.06] flex items-end justify-between px-6" style={{ transform: `translate3d(0,${scrollProgress * -28}px,0)`, willChange: 'transform' }}>
        <div className="w-16 h-40 bg-[#00F0FF] rounded-t-sm" />
        <div className="w-24 h-32 bg-[#8A2BE2] rounded-t-sm" />
        <div className="w-20 h-44 bg-[#FF007F] rounded-t-sm" />
        <div className="w-28 h-28 bg-[#00F0FF] rounded-t-sm" />
        <div className="w-16 h-36 bg-[#FFD700] rounded-t-sm" />
      </div>

      {/* ── MIDGROUND LAYER: Flying Cyber Drones & Tokens ── */}
      <div className="absolute top-24 left-[5%] animate-drone-hover hidden lg:block" style={{ transform: `translate3d(0,${scrollProgress * 52}px,0)`, willChange: 'transform' }}>
        <div className="relative w-8 h-5 bg-[#12131C] border border-[#00F0FF] rounded-sm p-0.5 flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.4)]">
          <div className="w-2 h-2 bg-[#FF007F] rounded-full animate-ping" />
          {/* Rotor wings */}
          <div className="absolute -top-1 -left-2 w-4 h-[2px] bg-[#00F0FF]" />
          <div className="absolute -top-1 -right-2 w-4 h-[2px] bg-[#00F0FF]" />
        </div>
      </div>

      <div className="absolute top-1/3 right-[4%] animate-drone-hover hidden lg:block" style={{ transform: `translate3d(0,${scrollProgress * -38}px,0)`, animationDelay: '1.5s', willChange: 'transform' }}>
        <div className="relative w-7 h-4 bg-[#12131C] border border-[#FF007F] rounded-sm flex items-center justify-center shadow-[0_0_10px_rgba(255,0,127,0.4)]">
          <div className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full" />
        </div>
      </div>

      {/* Floating Arcade Token Coins */}
      <div className="absolute top-48 left-[12%] animate-coin-spin hidden sm:block">
        <div className="w-4 h-4 rounded-sm rotate-45 border border-[#FFD700] bg-[#FFD700]/30 shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
      </div>

      <div className="absolute top-3/4 right-[10%] animate-coin-spin hidden sm:block" style={{ animationDelay: '0.8s' }}>
        <div className="w-4 h-4 rounded-sm rotate-45 border border-[#00F0FF] bg-[#00F0FF]/30 shadow-[0_0_8px_rgba(0,240,255,0.5)]" />
      </div>

      {/* ── NEON SIGN ACCENTS ── */}
      {density === 'full' && (
        <div className="absolute top-12 right-[8%] opacity-20 font-pixel text-[8px] text-[#FF007F] border border-[#FF007F] px-2 py-1 tracking-widest hidden xl:block">
          ARCADE MATRIX v2.6
        </div>
      )}
    </div>
  );
}
