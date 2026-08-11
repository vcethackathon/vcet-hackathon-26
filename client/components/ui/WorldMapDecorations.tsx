'use client';

/**
 * WorldMapDecorations – Original pixel-art CSS/SVG decorations.
 * All decorative, aria-hidden. No copyrighted game assets.
 *
 * Renders clouds, coins, pipes/portals, brick platforms, hills,
 * flags, gears, and generic creatures as CSS shapes.
 */

/* ── Individual decoration sub-components ── */

/** Pixel cloud — 3-box rounded rectangle cluster */
export function PixelCloud({
  className = '',
  size = 'md',
  style,
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}) {
  const dims = { sm: { w: 40, h: 20 }, md: { w: 64, h: 28 }, lg: { w: 90, h: 36 } }[size];
  return (
    <div
      className={`absolute ${className}`}
      style={style}
      aria-hidden="true"
    >
      <div
        className="relative wm-cloud-drift"
        style={{ width: dims.w, height: dims.h }}
      >
        {/* Main body */}
        <div
          className="absolute bottom-0 rounded-sm"
          style={{
            width: dims.w,
            height: dims.h * 0.6,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        />
        {/* Top bump left */}
        <div
          className="absolute rounded-sm"
          style={{
            width: dims.w * 0.4,
            height: dims.h * 0.55,
            bottom: dims.h * 0.45,
            left: dims.w * 0.1,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        />
        {/* Top bump right */}
        <div
          className="absolute rounded-sm"
          style={{
            width: dims.w * 0.35,
            height: dims.h * 0.45,
            bottom: dims.h * 0.4,
            right: dims.w * 0.15,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        />
      </div>
    </div>
  );
}

/** Pixel coin — gold octagon with shimmer */
export function PixelCoin({
  className = '',
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`absolute wm-coin-shimmer ${className}`}
      style={style}
      aria-hidden="true"
    >
      <div
        className="w-4 h-4 sm:w-5 sm:h-5 rotate-45 border-2"
        style={{
          backgroundColor: '#FFD700',
          borderColor: '#B8860B',
          boxShadow: '0 0 6px rgba(255,215,0,0.5)',
        }}
      >
        <div
          className="absolute inset-[2px] opacity-40"
          style={{
            background: 'linear-gradient(135deg, #FFF 0%, transparent 50%)',
          }}
        />
      </div>
    </div>
  );
}

/** Pipe/portal — generic green arcade portal, NOT Mario pipe */
export function PixelPortal({
  className = '',
  size = 'md',
  style,
}: {
  className?: string;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}) {
  const h = size === 'sm' ? 28 : 40;
  const w = size === 'sm' ? 20 : 28;
  return (
    <div
      className={`absolute ${className}`}
      style={style}
      aria-hidden="true"
    >
      <div className="relative wm-portal-glow" style={{ width: w, height: h }}>
        {/* Portal body */}
        <div
          className="absolute inset-0 rounded-t-sm"
          style={{
            background: 'linear-gradient(180deg, var(--wm-pipe-green), var(--wm-pipe-dark))',
            border: '2px solid #004D2A',
          }}
        />
        {/* Portal lip */}
        <div
          className="absolute top-0 -left-1 -right-1 h-[6px] rounded-t-sm"
          style={{
            background: 'var(--wm-pipe-green)',
            border: '2px solid #004D2A',
            borderBottom: 'none',
          }}
        />
        {/* Inner glow */}
        <div
          className="absolute top-[8px] left-[4px] right-[4px] bottom-[4px] rounded-sm"
          style={{
            background: 'rgba(0,240,255,0.15)',
          }}
        />
      </div>
    </div>
  );
}

/** Brick platform — repeating brown/orange pattern */
export function PixelBricks({
  className = '',
  width = 60,
  style,
}: {
  className?: string;
  width?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`absolute ${className}`}
      style={style}
      aria-hidden="true"
    >
      <div
        style={{
          width,
          height: 16,
          background: `
            repeating-linear-gradient(
              90deg,
              var(--wm-brick-orange) 0px,
              var(--wm-brick-orange) 10px,
              var(--wm-brick-dark) 10px,
              var(--wm-brick-dark) 12px
            )
          `,
          border: '2px solid #5C2F0E',
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
}

/** Hill silhouette — CSS triangle in dark purple/green */
export function PixelHill({
  className = '',
  size = 'md',
  color = 'purple',
  style,
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'purple' | 'green';
  style?: React.CSSProperties;
}) {
  const dims = { sm: 30, md: 50, lg: 80 }[size];
  const bg = color === 'purple' ? 'rgba(138,43,226,0.12)' : 'rgba(46,204,64,0.08)';
  const border = color === 'purple' ? 'rgba(138,43,226,0.2)' : 'rgba(46,204,64,0.15)';
  return (
    <div
      className={`absolute ${className}`}
      style={style}
      aria-hidden="true"
    >
      <div
        style={{
          width: dims * 1.6,
          height: dims,
          background: bg,
          borderTop: `2px solid ${border}`,
          borderRadius: `${dims}px ${dims}px 0 0`,
        }}
      />
    </div>
  );
}

/** Small flag pennant */
export function PixelFlag({
  className = '',
  color = '#FF007F',
  style,
}: {
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`absolute ${className}`}
      style={style}
      aria-hidden="true"
    >
      <div className="relative wm-flag-wave" style={{ width: 16, height: 24 }}>
        {/* Pole */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[2px]"
          style={{ background: '#888' }}
        />
        {/* Flag */}
        <div
          className="absolute left-[2px] top-0"
          style={{
            width: 12,
            height: 10,
            background: color,
            clipPath: 'polygon(0 0, 100% 30%, 100% 70%, 0 100%)',
          }}
        />
      </div>
    </div>
  );
}

/** Gear — rotating SVG cog silhouette */
export function PixelGear({
  className = '',
  size = 20,
  style,
}: {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`absolute wm-gear-spin ${className}`}
      style={style}
      aria-hidden="true"
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" opacity="0.15">
        <path
          d="M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
          fill="rgba(138,43,226,0.6)"
          stroke="rgba(138,43,226,0.3)"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
}

/** Generic creature silhouette — pixel blob enemy */
export function PixelCreature({
  className = '',
  variant = 1,
  style,
}: {
  className?: string;
  variant?: 1 | 2 | 3;
  style?: React.CSSProperties;
}) {
  const colors = {
    1: 'rgba(255,0,127,0.2)',
    2: 'rgba(138,43,226,0.2)',
    3: 'rgba(255,140,0,0.2)',
  };
  const shapes = {
    // Blob with eyes
    1: (
      <div className="relative wm-creature-hop" style={{ width: 18, height: 16 }}>
        <div
          className="absolute inset-0 rounded-t-md"
          style={{ background: colors[1], border: `1px solid rgba(255,0,127,0.3)` }}
        />
        <div className="absolute top-[4px] left-[4px] w-[3px] h-[3px] bg-white rounded-full" />
        <div className="absolute top-[4px] right-[4px] w-[3px] h-[3px] bg-white rounded-full" />
      </div>
    ),
    // Spiky top
    2: (
      <div className="relative wm-creature-hop" style={{ width: 16, height: 18 }}>
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: 12,
            background: colors[2],
            border: `1px solid rgba(138,43,226,0.3)`,
            borderRadius: '2px 2px 0 0',
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2"
          style={{
            width: 0,
            height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderBottom: `8px solid rgba(138,43,226,0.25)`,
          }}
        />
        <div className="absolute bottom-[4px] left-[3px] w-[2px] h-[2px] bg-white" />
        <div className="absolute bottom-[4px] right-[3px] w-[2px] h-[2px] bg-white" />
      </div>
    ),
    // Round bouncer
    3: (
      <div className="relative wm-creature-hop" style={{ width: 14, height: 14 }}>
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: colors[3], border: `1px solid rgba(255,140,0,0.3)` }}
        />
        <div className="absolute top-[3px] left-[3px] w-[2px] h-[2px] bg-white rounded-full" />
        <div className="absolute top-[3px] right-[3px] w-[2px] h-[2px] bg-white rounded-full" />
      </div>
    ),
  };

  return (
    <div
      className={`absolute ${className}`}
      style={style}
      aria-hidden="true"
    >
      {shapes[variant]}
    </div>
  );
}

/** Star / sparkle dot */
export function PixelStar({
  className = '',
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`absolute wm-star-twinkle ${className}`}
      style={style}
      aria-hidden="true"
    >
      <div
        className="w-1 h-1 rounded-full"
        style={{
          background: '#FFF',
          boxShadow: '0 0 3px rgba(255,255,255,0.8)',
        }}
      />
    </div>
  );
}

/* ── Composite decoration layer for a route segment ── */

interface SegmentDecorationsProps {
  segmentIndex: number;
  side: 'left' | 'right';
  density?: 'full' | 'reduced' | 'minimal';
}

export default function SegmentDecorations({
  segmentIndex,
  side,
  density = 'full',
}: SegmentDecorationsProps) {
  // Deterministic decoration placement based on segment index
  const seed = segmentIndex * 7;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Clouds — always shown */}
      <PixelCloud
        size={segmentIndex % 2 === 0 ? 'md' : 'sm'}
        className={side === 'left' ? 'right-4' : 'left-4'}
        style={{ top: 10 + (seed % 20) }}
      />

      {density !== 'minimal' && (
        <PixelCloud
          size="sm"
          className={`wm-cloud-drift-reverse ${side === 'left' ? 'left-8' : 'right-8'}`}
          style={{ top: 50 + (seed % 30) }}
        />
      )}

      {/* Coins — shown on full and reduced */}
      {density !== 'minimal' && (
        <>
          <PixelCoin
            className={side === 'left' ? 'right-2' : 'left-2'}
            style={{ top: 30 + (seed % 25) }}
          />
          {density === 'full' && (
            <PixelCoin
              className={side === 'left' ? 'right-10' : 'left-10'}
              style={{ top: 55 + (seed % 20) }}
            />
          )}
        </>
      )}

      {/* Full density only decorations */}
      {density === 'full' && (
        <>
          {/* Pipes — every other segment */}
          {segmentIndex % 2 === 0 && (
            <PixelPortal
              size={segmentIndex % 3 === 0 ? 'md' : 'sm'}
              className={side === 'left' ? 'left-2' : 'right-2'}
              style={{ bottom: 0 }}
            />
          )}

          {/* Bricks — opposite segments from pipes */}
          {segmentIndex % 2 === 1 && (
            <PixelBricks
              width={50 + (seed % 30)}
              className={side === 'left' ? 'left-0' : 'right-0'}
              style={{ bottom: 8 }}
            />
          )}

          {/* Hills — background silhouettes */}
          <PixelHill
            size={segmentIndex % 3 === 0 ? 'lg' : 'md'}
            color={segmentIndex % 2 === 0 ? 'purple' : 'green'}
            className={side === 'left' ? 'left-0' : 'right-0'}
            style={{ bottom: -5 }}
          />

          {/* Creatures — sparse */}
          {segmentIndex % 3 === 0 && (
            <PixelCreature
              variant={((segmentIndex % 3) + 1) as 1 | 2 | 3}
              className={side === 'left' ? 'right-16' : 'left-16'}
              style={{ bottom: 4 }}
            />
          )}

          {/* Gears */}
          {segmentIndex % 4 === 0 && (
            <PixelGear
              size={22}
              className={side === 'left' ? 'left-4' : 'right-4'}
              style={{ top: 70 + (seed % 15) }}
            />
          )}

          {/* Stars scattered */}
          <PixelStar style={{ top: 5, [side === 'left' ? 'left' : 'right']: 30 + (seed % 40) }} />
          <PixelStar style={{ top: 40 + (seed % 30), [side === 'left' ? 'right' : 'left']: 20 + (seed % 25) }} />
          <PixelStar style={{ top: 75 + (seed % 15), [side === 'left' ? 'left' : 'right']: 50 + (seed % 30) }} />
        </>
      )}

      {/* Flags — at route markers only, always shown */}
      {(segmentIndex === 0 || segmentIndex % 4 === 0) && (
        <PixelFlag
          color={segmentIndex === 0 ? '#2ECC40' : '#FF007F'}
          className={side === 'left' ? 'right-0' : 'left-0'}
          style={{ top: 0 }}
        />
      )}
    </div>
  );
}
