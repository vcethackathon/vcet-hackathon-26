'use client';
import Image from 'next/image';

type CharacterConfig = {
  src: string;
  alt: string;
  className: string;
};

const CHARACTER_BY_STAGE: Record<string, CharacterConfig> = {
  'LEVEL 01': { src: '/timeline/mario.png', alt: 'Mario at the starting level', className: 'object-contain object-bottom' },
  'LEVEL 02': { src: '/timeline/goomba.png', alt: 'Goomba at the briefing level', className: 'object-contain object-bottom' },
  'LEVEL 03': { src: '/timeline/mario-party.webp', alt: 'Mario Party artwork at the action level', className: 'object-contain object-bottom' },
  'LEVEL 04': { src: '/timeline/toad-new.png', alt: 'Toad at the checkpoint level', className: 'object-contain object-bottom' },
  'LEVEL 05': { src: '/timeline/bowser.png', alt: 'Bowser at the critical deadline level', className: 'object-contain object-bottom' },
  'LEVEL 06': { src: '/timeline/daisy.png', alt: 'Princess Daisy at the boss level', className: 'object-contain object-bottom' },
  'LEVEL 07': { src: '/timeline/peach.png', alt: 'Princess Peach at the final victory level', className: 'object-contain object-bottom' },
};

interface TimelineCharacterProps {
  stage: string;
  className?: string;
}

export default function TimelineCharacter({ stage, className = '' }: TimelineCharacterProps) {
  const character = CHARACTER_BY_STAGE[stage];
  
  if (!character) return null;

  return (
    <div className={`select-none ${className}`}>
      <div className={`relative h-24 w-24 sm:h-28 sm:w-28 flex items-center justify-center`}>
        <Image
          src={character.src}
          alt={character.alt}
          className={`h-full w-full ${character.className}`}
          draggable={false}
          width={112}
          height={112}
        />
      </div>
    </div>
  );
}
