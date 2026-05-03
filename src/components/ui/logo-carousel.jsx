'use client';
import { useEffect, useMemo, useState, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

// ============================================================================
// CONSTANTS
// ============================================================================

const CYCLE_DURATION = 3000;
const TIME_INTERVAL = 100;
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
  { id: 5, name: 'Vite', src: '/vite-wordmark.svg' },
  { id: 6, name: 'Styled Components', src: '/styled.svg' },
  { id: 7, name: 'Shadcn', src: '/shadcn-wordmark.svg' },
  { id: 8, name: 'Git', src: '/git-wordmark.svg' },
  { id: 9, name: 'MongoDB', src: '/mongodb-wordmark.svg' },
  { id: 10, name: 'GitHub', src: '/github-wordmark2.svg' },
  { id: 11, name: 'Zustand', src: '/zustand.svg' },
  { id: 12, name: 'Clerk', src: '/clerk-wordmark.svg' },
  { id: 13, name: 'Express', src: '/express-wordmark.svg' },
  { id: 14, name: 'OpenAI', src: '/openai-wordmark2.svg' },
  { id: 15, name: 'Sanity', src: '/sanity-wordmark.svg' },
  { id: 16, name: 'SSH', src: '/ssh-wordmark.svg' },
  { id: 17, name: 'Prisma', src: '/prisma-wordmark.svg' },
  { id: 18, name: 'Vue.js', src: '/vuejs.svg' },
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
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      y: '-20%',
      opacity: 0,
      transition: { duration: 0.3 },
    },
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Fisher-Yates shuffle algorithm for proper randomization
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get number of columns based on window width
 */
function getColumnsFromWidth(width) {
  const breakpoint = BREAKPOINTS.find((bp) => width >= bp.minWidth);
  return breakpoint ? breakpoint.columns : 2;
}

/**
 * Distribute logos across columns ensuring no duplicates in the same row
 */
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

      // Find a logo not yet used in this frame
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

// ============================================================================
// HOOKS
// ============================================================================

/**
 * Hook to manage responsive column count with SSR safety
 */
function useResponsiveColumns() {
  const [columns, setColumns] = useState(() => {
    // SSR-safe initialization
    if (typeof window === 'undefined') return 2;
    return getColumnsFromWidth(window.innerWidth);
  });

  useEffect(() => {
    const handleResize = () => {
      setColumns(getColumnsFromWidth(window.innerWidth));
    };

    // Set initial value on mount
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return columns;
}

/**
 * Hook to manage time-based animation with optimized updates
 */
function useAnimationTimer(interval = TIME_INTERVAL) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev + interval);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return time;
}

/**
 * Hook to manage logo distribution with memoization
 */
function useLogoDistribution(logos, columnCount) {
  return useMemo(() => {
    return distributeLogosAcrossColumns(logos, columnCount);
  }, [logos, columnCount]);
}

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Individual logo column with optimized rendering
 */
const LogoColumn = memo(({ logos, columnIndex, currentTime }) => {
  // Calculate current logo index based on time and column delay
  const currentIndex = useMemo(() => {
    const columnDelay = columnIndex * COLUMN_STAGGER_DELAY;
    const adjustedTime = (currentTime + columnDelay) % (CYCLE_DURATION * logos.length);
    return Math.floor(adjustedTime / CYCLE_DURATION);
  }, [columnIndex, currentTime, logos.length]);

  const currentLogo = logos[currentIndex];

  if (!currentLogo) return null;

  return (
    <motion.div
      // Adjusted width sizing limits to safely prevent overflow on very small 320-400px viewports
      className="relative h-14 w-20 shrink min-w-0 overflow-hidden sm:w-24 md:h-24 md:w-48"
      variants={ANIMATION_VARIANTS.container}
      initial="initial"
      animate="animate"
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
            className="h-auto max-h-[80%] w-auto max-w-[80%] object-contain"
            loading="lazy"
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
});

LogoColumn.displayName = 'LogoColumn';

/**
 * Main carousel component
 */
export function LogoCarousel() {
  const columns = useResponsiveColumns();
  const time = useAnimationTimer();
  const logoColumns = useLogoDistribution(LOGOS, columns);

  return (
    // Hard bounded the X container to ensure logos never stretch their grid
    <div className="flex w-full max-w-full justify-center gap-2 overflow-hidden py-8 px-2 sm:gap-4">
      {logoColumns.map((columnLogos, index) => (
        <LogoColumn
          key={`column-${index}`}
          logos={columnLogos}
          columnIndex={index}
          currentTime={time}
        />
      ))}
    </div>
  );
}
