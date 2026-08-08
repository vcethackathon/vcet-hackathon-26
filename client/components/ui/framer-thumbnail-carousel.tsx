'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  animate,
} from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const items = [
  { id: 1, url: '/gallery/IMG_0503.jpg', title: 'Gallery Image 1' },
  { id: 2, url: '/gallery/IMG_0533.jpg', title: 'Gallery Image 2' },
  { id: 3, url: '/gallery/IMG_0539.jpg', title: 'Gallery Image 3' },
  { id: 4, url: '/gallery/IMG_0558.jpg', title: 'Gallery Image 4' },
  { id: 5, url: '/gallery/IMG_0580.jpg', title: 'Gallery Image 5' },
  { id: 6, url: '/gallery/IMG_0585.jpg', title: 'Gallery Image 6' },
  { id: 7, url: '/gallery/IMG_0610.jpg', title: 'Gallery Image 7' },
  { id: 8, url: '/gallery/IMG_0615.jpg', title: 'Gallery Image 8' },
  { id: 9, url: '/gallery/IMG_6762.JPG.jpeg', title: 'Gallery Image 9' },
  { id: 10, url: '/gallery/IMG_6767.JPG.jpeg', title: 'Gallery Image 10' },
  { id: 11, url: '/gallery/IMG_9722.JPG.jpeg', title: 'Gallery Image 11' },
  { id: 12, url: '/gallery/_MG_1611.JPG.jpeg', title: 'Gallery Image 12' },
];

const FULL_WIDTH_PX = 120;
const COLLAPSED_WIDTH_PX = 35;
const GAP_PX = 2;
const MARGIN_PX = 2;

export function FramerThumbnailCarousel() {
  const [index, setIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);

  useEffect(() => {
    if (!isDragging && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 1;
      const targetX = -index * containerWidth;

      animate(x, targetX, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      });
    }
  }, [index, x, isDragging]);

  useEffect(() => {
    if (isDragging || isHovered) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isDragging, isHovered]);

  return (
    <div className='max-w-3xl mx-auto lg:p-10 p-2'>
      <div className='flex flex-col gap-3'>
        {/* Main Carousel */}
        <div
          className='relative overflow-hidden rounded-lg'
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className='flex'
            drag='x'
            dragElastic={0.2}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(e, info) => {
              setIsDragging(false);
              const containerWidth = containerRef.current?.offsetWidth || 1;
              const offset = info.offset.x;
              const velocity = info.velocity.x;

              let newIndex = index;

              // If fast swipe, use velocity
              if (Math.abs(velocity) > 500) {
                newIndex = velocity > 0 ? index - 1 : index + 1;
              }
              // Otherwise use offset threshold (30% of container width)
              else if (Math.abs(offset) > containerWidth * 0.3) {
                newIndex = offset > 0 ? index - 1 : index + 1;
              }

              // Clamp index
              newIndex = Math.max(0, Math.min(items.length - 1, newIndex));
              setIndex(newIndex);
            }}
            style={{ x }}
          >
            {items.map((item) => (
              <div key={item.id} className='relative shrink-0 w-full h-[400px]'>
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className='object-cover rounded-lg select-none pointer-events-none bg-zinc-800'
                  draggable={false}
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>

          {/* Navigation Buttons */}
          <motion.button
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            className={`absolute left-4 text-black top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform z-10
              ${
                index === 0
                  ? 'opacity-40 cursor-not-allowed'
                  : 'bg-white hover:scale-110 hover:opacity-100 opacity-70'
              }`}
          >
            <ChevronLeft className='w-6 h-6' />
          </motion.button>

          {/* Next Button */}
          <motion.button
            disabled={index === items.length - 1}
            onClick={() => setIndex((i) => Math.min(items.length - 1, i + 1))}
            className={`absolute text-black right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform z-10
              ${
                index === items.length - 1
                  ? 'opacity-40 cursor-not-allowed'
                  : 'bg-white hover:scale-110 hover:opacity-100 opacity-70'
              }`}
          >
            <ChevronRight className='w-6 h-6' />
          </motion.button>
        </div>

        <Thumbnails index={index} setIndex={setIndex} />
      </div>
    </div>
  );
}

function Thumbnails({
  index,
  setIndex,
}: {
  index: number;
  setIndex: (index: number) => void;
}) {
  const thumbnailsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (thumbnailsRef.current) {
      let scrollPosition = 0;
      for (let i = 0; i < index; i++) {
        scrollPosition += COLLAPSED_WIDTH_PX + GAP_PX;
      }

      scrollPosition += MARGIN_PX;

      const containerWidth = thumbnailsRef.current.offsetWidth;
      const centerOffset = containerWidth / 2 - FULL_WIDTH_PX / 2;
      scrollPosition -= centerOffset;

      thumbnailsRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [index]);

  return (
    <div
      ref={thumbnailsRef}
      className='overflow-x-auto scrollbar-hide'
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div className='flex gap-1 h-20 pb-2' style={{ width: 'fit-content' }}>
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            onClick={() => setIndex(i)}
            initial={false}
            animate={i === index ? 'active' : 'inactive'}
            variants={{
              active: {
                width: FULL_WIDTH_PX,
                marginLeft: MARGIN_PX,
                marginRight: MARGIN_PX,
              },
              inactive: {
                width: COLLAPSED_WIDTH_PX,
                marginLeft: 0,
                marginRight: 0,
              },
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className='relative shrink-0 h-full overflow-hidden'
          >
            <Image
              src={item.url}
              alt={item.title}
              fill
              sizes="120px"
              className='object-cover pointer-events-none select-none bg-zinc-800'
              loading="lazy"
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
