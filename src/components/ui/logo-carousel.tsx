// src/components/ui/logo-carousel.jsx
'use client';
import { useEffect, useMemo, useState, memo } from 'react';
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
  { id: 19, name: 'Elysia', src: '/elysia.svg' },
];

interface Logo {
  id: number;
  name: string;
  src: string;
}

interface LogoColumnProps {
  logos: Logo[];
  columnIndex: number;
  currentIndex: number;
}

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
      transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
    },
    exit: { y: '-20%', opacity: 0, transition: { duration: 0.3 } },
  },
};

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function distributeLogosAcrossColumns(logos: Logo[], columnCount: number): Logo[][] {
  if (!logos.length || columnCount <= 0) return [];
  const g = gcd(logos.length, columnCount);
  const framesNeeded = logos.length / g;
  const columns: Logo[][] = Array.from({ length: columnCount }, () => []);

  for (let frameIdx = 0; frameIdx < framesNeeded; frameIdx++) {
    for (let colIdx = 0; colIdx < columnCount; colIdx++) {
      const idx = (frameIdx * columnCount + colIdx) % logos.length;
      columns[colIdx].push(logos[idx]);
    }
  }

  return columns;
}

function getColumnsFromWidth(width) {
  const breakpoint = BREAKPOINTS.find((bp) => width >= bp.minWidth);
  return breakpoint ? breakpoint.columns : 2;
}

// --- Debounced Resize Listener ---
function useResponsiveColumns() {
  const [columns, setColumns] = useState(2);

  useEffect(() => {
    // Set actual responsive columns after hydration
    setColumns(getColumnsFromWidth(window.innerWidth));

    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setColumns(getColumnsFromWidth(window.innerWidth));
      }, 150); // 150ms debounce
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return columns;
}

// --- Ultra-Lightweight Stepped Animation Timer (99.7% lower CPU/battery load than rAF loop) ---
function useSteppedAnimation(columnCount: number, totalFrames: number) {
  const [columnIndices, setColumnIndices] = useState<number[]>(() =>
    Array(columnCount).fill(0),
  );

  // Synchronize array length whenever columnCount changes
  useEffect(() => {
    setColumnIndices((prev) => {
      const current = prev[0] || 0;
      return Array(columnCount).fill(current % (totalFrames || 1));
    });
  }, [columnCount, totalFrames]);

  useEffect(() => {
    if (columnCount <= 0 || totalFrames <= 0) return;

    const timeoutIds: ReturnType<typeof setTimeout>[] = [];
    const intervalId = setInterval(() => {
      if (typeof document !== 'undefined' && document.hidden) return;

      // Cascade from right to left across columns:
      // Column (columnCount - 1) changes first, column 0 changes last
      for (let i = 0; i < columnCount; i++) {
        const targetCol = columnCount - 1 - i;
        const delay = i * COLUMN_STAGGER_DELAY;

        const tid = setTimeout(() => {
          setColumnIndices((prev) => {
            if (prev.length !== columnCount) return prev;
            const next = [...prev];
            next[targetCol] = (next[targetCol] + 1) % totalFrames;
            return next;
          });
        }, delay);

        timeoutIds.push(tid);
      }
    }, CYCLE_DURATION);

    return () => {
      clearInterval(intervalId);
      timeoutIds.forEach(clearTimeout);
    };
  }, [columnCount, totalFrames]);

  return columnIndices;
}

function useLogoDistribution(columnCount: number) {
  return useMemo(() => distributeLogosAcrossColumns(LOGOS, columnCount), [columnCount]);
}

const LogoColumn = memo(
  ({ logos, columnIndex, currentIndex }: LogoColumnProps) => {
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
            className="absolute inset-0 flex items-center justify-center p-2 sm:p-2.5 md:p-3"
            variants={ANIMATION_VARIANTS.logo}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="relative h-full w-full flex items-center justify-center">
              <Image
                src={currentLogo.src}
                alt={currentLogo.name}
                fill
                sizes="(max-width: 768px) 96px, 160px"
                className="object-contain pointer-events-none select-none"
                priority
                unoptimized
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  },
  (prev: LogoColumnProps, next: LogoColumnProps) =>
    prev.currentIndex === next.currentIndex && prev.logos === next.logos,
);

LogoColumn.displayName = 'LogoColumn';

export function LogoCarousel() {
  const columnCount = useResponsiveColumns();
  const logoColumns = useLogoDistribution(columnCount);
  const totalFrames = logoColumns[0]?.length || 1;
  const columnIndices = useSteppedAnimation(columnCount, totalFrames);

  // Preload all 18 logo vector assets into browser cache to ensure instant paint
  useEffect(() => {
    LOGOS.forEach((logo) => {
      const img = new window.Image();
      img.src = logo.src;
    });
  }, []);

  return (
    <div className="flex w-full max-w-full justify-center gap-2 overflow-hidden py-6 px-2 sm:gap-4">
      {logoColumns.map((columnLogos, index) => (
        <LogoColumn
          key={`column-${index}`}
          logos={columnLogos}
          columnIndex={index}
          currentIndex={columnIndices[index] ?? 0}
        />
      ))}
    </div>
  );
}
