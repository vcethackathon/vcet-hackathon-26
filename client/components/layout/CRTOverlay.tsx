'use client';

export default function CRTOverlay() {
  return (
    <div 
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden" 
      aria-hidden="true"
    >
      <div className="crt-scanlines opacity-40" />
      {/* Subtle vignette border */}
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
    </div>
  );
}
