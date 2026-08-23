// src/components/ui/logo-carousel.jsx
'use client';
import { useEffect, useMemo, useState, memo, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

const CYCLE_DURATION = 3000;
const COLUMN_STAGGER_DELAY = 200;

const BREAKPOINTS = [
  { minWidth: 2000, columns: 6 },
  { minWidth: 1280, columns: 4 },
  { minWidth: 768, columns: 3 },
  { minWidth: 600, columns: 4 },
  { minWidth: 400, columns: 3 },
  { minWidth: 0, columns: 2 },
];

const LOGOS = [
  { id: 1, name: 'React', src: '/react-wordmark.svg' },
  { id: 2, name: 'Next.js', src: '/nextjs-wordmark.svg' },
  { id: 3, name: 'Dokploy', src: '/dokploy.svg' },
  { id: 4, name: 'TypeScript', src: '/typescript-wordmark.svg' },
  { id: 5, name: 'Tailwind CSS', src: '/tailwind-wordmark.svg' },
  { id: 6, name: 'Vite', src: '/vite-wordmark.svg' },
  { id: 7, name: 'Styled Components', src: '/styled-wordmark.svg' },
  { id: 8, name: 'Shadcn', src: '/shadcn-wordmark.svg' },
  { id: 9, name: 'Git', src: '/git-wordmark.svg' },
  { id: 10, name: 'Codex', src: '/codex-text.svg' },
  { id: 11, name: 'MongoDB', src: '/mongodb-wordmark.svg' },
  { id: 12, name: 'GitHub', src: '/github-wordmark2.svg' },
  { id: 13, name: 'Zustand', src: '/zustand.svg' },
  { id: 14, name: 'Clerk', src: '/clerk-wordmark.svg' },
  { id: 15, name: 'Express', src: '/express-wordmark.svg' },
  { id: 16, name: 'Sanity', src: '/sanity-wordmark.svg' },
  { id: 17, name: 'SSH', src: '/ssh-wordmark.svg' },
  { id: 18, name: 'Prisma', src: '/prisma-wordmark.svg' },
  { id: 19, name: 'Vue.js', src: '/vuejs.svg' },
];

const ANIMATION_VARIANTS = {
  container: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  logo: {
    initial: { y: '10%', opacity: 0 },
    animate: {
      y: '0%',
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
    exit: { y: '-20%', opacity: 0, transition: { duration: 0.3 } },
  },
};

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getColumnsFromWidth(width) {
  const breakpoint = BREAKPOINTS.find((bp) => width >= bp.minWidth);
  return breakpoint ? breakpoint.columns : 2;
}

function distributeLogosAcrossColumns(logos, columnCount) {
  const shuffled = shuffleArray([...logos]);
  const framesNeeded = Math.ceil(logos.length / columnCount);
  const columns = Array.from({ length: columnCount }, () => []);
  let logoIndex = 0;

  for (let frameIdx = 0; frameIdx < framesNeeded; frameIdx++) {
    const usedInFrame = new Set();
    for (let colIdx = 0; colIdx < columnCount; colIdx++) {
      let attempts = 0;
      let logo = shuffled[logoIndex % shuffled.length];
      while (usedInFrame.has(logo.id) && attempts < shuffled.length) {
        logoIndex++;
        logo = shuffled[logoIndex % shuffled.length];
        attempts++;
      }
      columns[colIdx].push(logo);
      usedInFrame.add(logo.id);
      logoIndex++;
    }
  }

  return columns;
}

// --- QUALITY: L1 Debounced Resize Listener ---
function useResponsiveColumns() {
  const [columns, setColumns] = useState(() =>
    typeof window === 'undefined' ? 2 : getColumnsFromWidth(window.innerWidth),
  );

  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setColumns(getColumnsFromWidth(window.innerWidth));
      }, 150); // 150ms debounce
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return columns;
}

// --- QUALITY: L1 requestAnimationFrame Loop ---
function useAnimationTimer() {
  const maxTime = CYCLE_DURATION * LOGOS.length;
  const [time, setTime] = useState(0);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const handleVisibility = () => {
      isPausedRef.current = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  useEffect(() => {
    let frameId;
    let lastTimestamp = performance.now();

    const tick = (timestamp) => {
      if (!isPausedRef.current) {
        const delta = timestamp - lastTimestamp;
        setTime((prev) => (prev + delta) % maxTime);
      }
      lastTimestamp = timestamp;
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [maxTime]);

  return time;
}

function useLogoDistribution(columnCount) {
  return useMemo(() => distributeLogosAcrossColumns(LOGOS, columnCount), [columnCount]);
}

const LogoColumn = memo(
  ({ logos, columnIndex, currentIndex }) => {
    const currentLogo = logos[currentIndex % logos.length];
    if (!currentLogo) return null;

    return (
      <motion.div
        className="relative h-14 w-20 shrink min-w-0 overflow-hidden sm:w-24 md:h-20 md:w-40"
        variants={ANIMATION_VARIANTS.container}
        initial="initial"
        animate="animate"
        transition={{ delay: columnIndex * 0.1, duration: 0.5, ease: 'easeOut' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentLogo.id}-${currentIndex}`}
            className="absolute inset-0 flex items-center justify-center"
            variants={ANIMATION_VARIANTS.logo}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Image
              src={currentLogo.src}
              alt={currentLogo.name}
              width={120}
              height={40}
              className="h-auto max-h-[75%] w-auto max-w-[75%] md:max-w-[65%] md:max-h-[65%]
                2xl:max-h-[75%] 2xl:max-w-[75%] object-contain"
              loading="lazy"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  },
  (prev, next) => prev.currentIndex === next.currentIndex && prev.logos === next.logos,
);

LogoColumn.displayName = 'LogoColumn';

export function LogoCarousel() {
  const columnCount = useResponsiveColumns();
  const logoColumns = useLogoDistribution(columnCount);
  const time = useAnimationTimer();

  const columnIndices = useMemo(
    () =>
      logoColumns.map((logos, columnIndex) => {
        const columnDelay = columnIndex * COLUMN_STAGGER_DELAY;
        const adjustedTime = (time + columnDelay) % (CYCLE_DURATION * logos.length);
        return Math.floor(adjustedTime / CYCLE_DURATION);
      }),
    [logoColumns, time],
  );

  return (
    <div className="flex w-full max-w-full justify-center gap-2 overflow-hidden py-6 px-2 sm:gap-4">
      {logoColumns.map((columnLogos, index) => (
        <LogoColumn
          key={`column-${index}`}
          logos={columnLogos}
          columnIndex={index}
          currentIndex={columnIndices[index]}
        />
      ))}
    </div>
  );
}
