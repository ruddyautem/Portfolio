'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

// Hook to get responsive columns
function useResponsiveColumns() {
  const [columns, setColumns] = useState(2);
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width >= 2000) {
        setColumns(6);
      } else if (width >= 1280) {
        setColumns(4);
      } else if (width >= 768) {
        setColumns(3);
      } else if (width >= 600) {
        setColumns(4);
      } else if (width >= 400) {
        setColumns(3);
      } else {
        setColumns(2);
      }
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);
  return columns;
}

// Main component
export function LogoCarousel() {
  const columns = useResponsiveColumns();
  const [logoColumns, setLogoColumns] = useState([]);
  const [time, setTime] = useState(0);
  const CYCLE_DURATION = 2000;

  const logos = useMemo(
    () => [
      { id: 1, name: 'react', src: '/react-wordmark.svg' },
      { id: 2, name: 'Next', src: '/nextjs-wordmark.svg' },
      { id: 3, name: 'Typescript', src: '/typescript-wordmark.svg' },
      { id: 4, name: 'Vite', src: '/vite-wordmark.svg' },
      { id: 5, name: 'Styled', src: '/styled.svg' },
      { id: 6, name: 'Shadcn', src: '/shadcn-wordmark.svg' },
      { id: 7, name: 'Git', src: '/git-wordmark.svg' },
      { id: 8, name: 'mongoDB', src: '/mongodb-wordmark.svg' },
      { id: 9, name: 'github', src: '/github-wordmark2.svg' },
      { id: 10, name: 'Zustand', src: '/zustand.svg' },
      { id: 11, name: 'Clerk', src: '/clerk-wordmark.svg' },
      { id: 12, name: 'express', src: '/express-wordmark.svg' },
      { id: 13, name: 'AI', src: '/openai-wordmark2.svg' },
      { id: 14, name: 'Sanity', src: '/sanity-wordmark.svg' },
      { id: 15, name: 'Ssh', src: '/ssh-wordmark.svg' },
      { id: 16, name: 'Prisma', src: '/prisma-wordmark.svg' },
    ],
    [],
  );

  // Distribute logos across columns ensuring no duplicates in same frame
  const distributeLogos = useCallback(
    (logos) => {
      // Shuffle logos
      const shuffled = [...logos].sort(() => Math.random() - 0.5);

      // Calculate how many frames (rows) we need
      const framesNeeded = Math.ceil(logos.length / columns);

      // Create frames where each frame has unique logos
      const frames = [];
      let logoIndex = 0;

      for (let frameIdx = 0; frameIdx < framesNeeded; frameIdx++) {
        const frame = [];
        const usedInFrame = new Set();

        for (let colIdx = 0; colIdx < columns; colIdx++) {
          // Get next logo, cycling through if needed
          let logo = shuffled[logoIndex % shuffled.length];
          let attempts = 0;

          // Ensure no duplicate in this frame
          while (usedInFrame.has(logo.id) && attempts < shuffled.length) {
            logoIndex++;
            logo = shuffled[logoIndex % shuffled.length];
            attempts++;
          }

          frame.push(logo);
          usedInFrame.add(logo.id);
          logoIndex++;
        }

        frames.push(frame);
      }

      // Convert frames to columns format
      const result = Array.from({ length: columns }, () => []);
      frames.forEach((frame) => {
        frame.forEach((logo, colIdx) => {
          result[colIdx].push(logo);
        });
      });

      return result;
    },
    [columns],
  );

  // Initialize logo columns
  useEffect(() => {
    setLogoColumns(distributeLogos(logos));
  }, [logos, distributeLogos]);

  // Update time for animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center gap-4 py-8">
      {logoColumns.map((columnLogos, index) => (
        <LogoColumn key={index} logos={columnLogos} columnIndex={index} currentTime={time} />
      ))}
    </div>
  );
}

// Column component
function LogoColumn({ logos, columnIndex, currentTime }) {
  const CYCLE_DURATION = 3000;
  const columnDelay = columnIndex * 200;
  const adjustedTime = (currentTime + columnDelay) % (CYCLE_DURATION * logos.length);
  const currentIndex = Math.floor(adjustedTime / CYCLE_DURATION);
  const currentLogo = logos[currentIndex];

  return (
    <motion.div
      className="relative h-14 w-24 overflow-hidden md:h-24 md:w-48"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: columnIndex * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentLogo.id}-${currentIndex}`}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: '10%', opacity: 0 }}
          animate={{
            y: '0%',
            opacity: 1,
            transition: {
              type: 'spring',
              stiffness: 300,
              damping: 20,
            },
          }}
          exit={{
            y: '-20%',
            opacity: 0,
            transition: { duration: 0.3 },
          }}
        >
          <Image
            src={currentLogo.src}
            alt={currentLogo.name}
            width={120}
            height={40}
            className="h-auto max-h-[80%] w-auto max-w-[80%] object-contain"
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
