'use client';

import { motion } from 'framer-motion';

/**
 * PlayerMascot – Original retro 16-bit cyber-adventurer mascot.
 * Features:
 *  - Red/Orange Tech Cap / Helmet with Cyan Glow Visor
 *  - Blue Arcade Jumpsuit / Overalls with Gold Belt Buckle
 *  - Neon Boots & Gloves
 *  - Crisp Pixel Grid rendering (100% original SVG, zero Mario/Nintendo IP)
 *  - Animated Idle breathing / Jump states
 */

interface PlayerMascotProps {
  isJumping?: boolean;
  isMoving?: boolean;
  className?: string;
  size?: number;
}

export default function PlayerMascot({
  isJumping = false,
  isMoving = false,
  className = '',
  size = 40,
}: PlayerMascotProps) {
  return (
    <motion.div
      className={`relative inline-block select-none pointer-events-none ${className}`}
      style={{ width: size, height: size * 1.15 }}
      animate={
        isJumping
          ? { y: [-2, -22, 0], scale: [1, 1.15, 1], rotate: [0, -6, 0] }
          : isMoving
          ? { y: [-2, 2, -2] }
          : { y: [0, -3, 0] }
      }
      transition={
        isJumping
          ? { duration: 0.5, ease: 'easeOut' }
          : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
      }
      aria-label="Arcade Player Mascot"
      role="img"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 16 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ shapeRendering: 'crispEdges', imageRendering: 'pixelated' }}
      >
        {/* Shadow base */}
        <ellipse cx="8" cy="17.2" rx="5" ry="0.8" fill="rgba(0,0,0,0.5)" />

        {/* ── RED/ORANGE HELMET / CAP ── */}
        <rect x="4" y="1" width="8" height="1" fill="#FF2A00" />
        <rect x="3" y="2" width="10" height="2" fill="#FF3D00" />
        {/* Helmet Cap Visor / Brim */}
        <rect x="2" y="3.5" width="12" height="1" fill="#D32F2F" />

        {/* ── CYAN TECH VISOR / EYES ── */}
        <rect x="4" y="4" width="8" height="2" fill="#00F0FF" />
        <rect x="5" y="4.5" width="2" height="1" fill="#FFFFFF" />
        <rect x="9" y="4.5" width="2" height="1" fill="#FFFFFF" />

        {/* ── SKIN & ORIGINAL MUSTACHE / CHIN ── */}
        <rect x="4" y="6" width="8" height="2" fill="#FFCC80" />
        {/* Pixel mustache / goatee accent */}
        <rect x="5" y="7" width="6" height="1" fill="#424242" />

        {/* ── BLUE TECH JUMPSUIT / OVERALLS ── */}
        <rect x="3" y="8" width="10" height="4" fill="#1E88E5" />
        {/* Inner Shirt / Collar */}
        <rect x="6" y="8" width="4" height="2" fill="#FF3D00" />
        {/* Yellow Suspenders / Straps Buttons */}
        <rect x="4.5" y="9" width="1" height="1" fill="#FFD700" />
        <rect x="10.5" y="9" width="1" height="1" fill="#FFD700" />

        {/* ── GOLD BELT ── */}
        <rect x="3" y="12" width="10" height="1" fill="#212121" />
        <rect x="7" y="12" width="2" height="1" fill="#FFD700" />

        {/* ── GLOVES & ARMS ── */}
        <rect x="2" y="9" width="1.5" height="3" fill="#FF3D00" />
        <rect x="12.5" y="9" width="1.5" height="3" fill="#FF3D00" />
        {/* White / Cyan Tech Gloves */}
        <rect x="1.5" y="11.5" width="2" height="2" fill="#E0F7FA" />
        <rect x="12.5" y="11.5" width="2" height="2" fill="#E0F7FA" />

        {/* ── LEGS & NEON BOOTS ── */}
        <rect x="4" y="13" width="3" height="2" fill="#1565C0" />
        <rect x="9" y="13" width="3" height="2" fill="#1565C0" />
        {/* Boots */}
        <rect x="3" y="15" width="4" height="2" fill="#00E676" />
        <rect x="9" y="15" width="4" height="2" fill="#00E676" />
        <rect x="3" y="16.5" width="4.5" height="0.5" fill="#1B5E20" />
        <rect x="8.5" y="16.5" width="4.5" height="0.5" fill="#1B5E20" />
      </svg>
    </motion.div>
  );
}
