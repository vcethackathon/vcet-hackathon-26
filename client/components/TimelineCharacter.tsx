'use client';

const SpaceInvader = ({ color = '#00F0FF', className = '' }: { color?: string, className?: string }) => (
  <svg viewBox="0 0 11 8" className={`w-full h-full drop-shadow-[0_0_12px_${color}] ${className}`} style={{ shapeRendering: 'crispEdges' }}>
    <g fill={color}>
      <rect x="2" y="0" width="1" height="1" />
      <rect x="8" y="0" width="1" height="1" />
      <rect x="3" y="1" width="1" height="1" />
      <rect x="7" y="1" width="1" height="1" />
      <rect x="2" y="2" width="7" height="1" />
      <rect x="1" y="3" width="2" height="1" />
      <rect x="4" y="3" width="3" height="1" />
      <rect x="8" y="3" width="2" height="1" />
      <rect x="0" y="4" width="11" height="1" />
      <rect x="0" y="5" width="1" height="1" />
      <rect x="2" y="5" width="7" height="1" />
      <rect x="10" y="5" width="1" height="1" />
      <rect x="0" y="6" width="1" height="1" />
      <rect x="2" y="6" width="1" height="1" />
      <rect x="8" y="6" width="1" height="1" />
      <rect x="10" y="6" width="1" height="1" />
      <rect x="3" y="7" width="2" height="1" />
      <rect x="6" y="7" width="2" height="1" />
    </g>
  </svg>
);

const PixelGhost = ({ color = '#FF007F', className = '' }: { color?: string, className?: string }) => (
  <svg viewBox="0 0 14 14" className={`w-full h-full drop-shadow-[0_0_12px_${color}] ${className}`} style={{ shapeRendering: 'crispEdges' }}>
    <g fill={color}>
      <rect x="5" y="0" width="4" height="1" />
      <rect x="3" y="1" width="8" height="1" />
      <rect x="2" y="2" width="10" height="1" />
      <rect x="1" y="3" width="12" height="4" />
      <rect x="0" y="7" width="14" height="5" />
      <rect x="0" y="12" width="2" height="2" />
      <rect x="3" y="12" width="2" height="2" />
      <rect x="6" y="12" width="2" height="2" />
      <rect x="9" y="12" width="2" height="2" />
      <rect x="12" y="12" width="2" height="2" />
    </g>
    <rect x="3" y="4" width="2" height="2" fill="#FFF" />
    <rect x="9" y="4" width="2" height="2" fill="#FFF" />
    <rect x="4" y="5" width="1" height="1" fill="#000" />
    <rect x="10" y="5" width="1" height="1" fill="#000" />
  </svg>
);

const PixelCoin = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 10 10" className={`w-full h-full drop-shadow-[0_0_15px_rgba(255,215,0,0.9)] ${className}`} style={{ shapeRendering: 'crispEdges' }}>
    <rect x="3" y="0" width="4" height="1" fill="#FFD700" />
    <rect x="2" y="1" width="6" height="1" fill="#FFD700" />
    <rect x="1" y="2" width="8" height="6" fill="#FFD700" />
    <rect x="2" y="8" width="6" height="1" fill="#FFD700" />
    <rect x="3" y="9" width="4" height="1" fill="#FFD700" />
    <rect x="4" y="2" width="2" height="6" fill="#FFF" opacity="0.6" />
  </svg>
);

const Pacman = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={`w-full h-full drop-shadow-[0_0_15px_rgba(255,215,0,0.8)] ${className}`} style={{ shapeRendering: 'crispEdges' }}>
    <g fill="#FFD700">
      <rect x="5" y="1" width="6" height="1" />
      <rect x="3" y="2" width="10" height="1" />
      <rect x="2" y="3" width="12" height="2" />
      <rect x="1" y="5" width="14" height="3" />
      <rect x="1" y="8" width="7" height="3" />
      <rect x="1" y="11" width="12" height="2" />
      <rect x="2" y="13" width="10" height="1" />
      <rect x="4" y="14" width="6" height="1" />
    </g>
    <rect x="9" y="3" width="2" height="2" fill="#000" />
  </svg>
);

interface TimelineCharacterProps {
  stage: string;
  className?: string;
}

export default function TimelineCharacter({ stage, className = '' }: TimelineCharacterProps) {
  let character = null;

  switch (stage) {
    case 'LEVEL 01':
      character = <Pacman className="animate-bounce" />;
      break;
    case 'LEVEL 02':
      character = <PixelGhost color="#FF007F" className="animate-pulse" />;
      break;
    case 'LEVEL 03':
      character = <SpaceInvader color="#00F0FF" className="animate-bounce" />;
      break;
    case 'LEVEL 04':
      character = <PixelGhost color="#FFD700" className="animate-pulse" />;
      break;
    case 'LEVEL 05':
      character = <SpaceInvader color="#8A2BE2" className="animate-bounce" />;
      break;
    case 'LEVEL 06':
      character = <PixelGhost color="#00FF00" className="animate-pulse" />;
      break;
    case 'LEVEL 07':
      character = <PixelCoin className="animate-bounce" />;
      break;
    default:
      return null;
  }

  return (
    <div className={`select-none ${className}`}>
      <div className={`relative h-20 w-20 sm:h-24 sm:w-24 flex items-center justify-center`}>
        {character}
      </div>
    </div>
  );
}
