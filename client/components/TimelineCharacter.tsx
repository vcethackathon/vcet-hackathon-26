'use client';

import { useEffect, useState } from 'react';
type CharacterConfig = {
  src: string;
  alt: string;
  className: string;
  needsBlueKey?: boolean;
};

const CHARACTER_BY_STAGE: Record<string, CharacterConfig> = {
  'LEVEL 01': { src: '/timeline/mario.png', alt: 'Mario at the starting level', className: 'object-contain' },
  'LEVEL 02': { src: '/timeline/goomba.png', alt: 'Goomba at the briefing level', className: 'object-contain' },
  'LEVEL 03': { src: '/timeline/waluigi-new-cutout.png', alt: 'Waluigi at the action level', className: 'object-contain' },
  'LEVEL 04': { src: '/timeline/toad-new.png', alt: 'Toad at the checkpoint level', className: 'object-contain' },
  'LEVEL 06': { src: '/timeline/daisy.png', alt: 'Princess Daisy at the Day 2 starting level', className: 'object-contain object-bottom' },
  'LEVEL 07': { src: '/timeline/mario-party.webp', alt: 'Mario Party artwork at the code freeze level', className: 'object-contain object-bottom' },
  'LEVEL 08': { src: '/timeline/bowser.png', alt: 'Bowser at the boss level', className: 'object-contain object-bottom', needsBlueKey: true },
  'LEVEL 09': { src: '/timeline/peach.png', alt: 'Princess Peach at the final victory level', className: 'object-contain object-bottom' },
};

function BlueScreenCutout({ src, alt, className }: CharacterConfig) {
  const [processedSrc, setProcessedSrc] = useState<string>();

  useEffect(() => {
    let cancelled = false;
    const image = new Image();
    image.src = src;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) return;

      context.drawImage(image, 0, 0);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < pixels.data.length; i += 4) {
        const red = pixels.data[i];
        const green = pixels.data[i + 1];
        const blue = pixels.data[i + 2];
        // Removes only the saturated royal-blue screen surrounding the supplied Bowser PNG.
        if (blue > 160 && blue > red * 1.65 && blue > green * 1.65) pixels.data[i + 3] = 0;
      }
      context.putImageData(pixels, 0, 0);
      if (!cancelled) setProcessedSrc(canvas.toDataURL('image/png'));
    };
    return () => { cancelled = true; };
  }, [src]);

  return <img src={processedSrc ?? src} alt={alt} className={`h-full w-full ${className}`} draggable={false} />;
}

interface TimelineCharacterProps {
  stage: string;
  className?: string;
}

export default function TimelineCharacter({ stage, className = '' }: TimelineCharacterProps) {
  const character = CHARACTER_BY_STAGE[stage];
  if (!character) return null;

  return (
    <div className={`select-none ${className}`}>
      <div className={`relative h-28 w-28 sm:h-32 sm:w-32 ${stage === 'LEVEL 08' || stage === 'LEVEL 09' ? 'h-32 w-32 sm:h-36 sm:w-36' : ''}`}>
        {character.needsBlueKey ? (
          <BlueScreenCutout {...character} />
        ) : (
          <img
            src={character.src}
            alt={character.alt}
            className={`h-full w-full ${character.className}`}
            draggable={false}
          />
        )}
      </div>
    </div>
  );
}
