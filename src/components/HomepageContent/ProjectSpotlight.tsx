'use client';

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect,
  useId,
  useMemo,
  memo,
  type CSSProperties,
} from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  Lock,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { GithubIcon } from '@/components/Icons/Icons';
import { Link } from '@/i18n/routing';
import { Project } from '@/app/[locale]/projects/projects';
import { TAG_COLORS_CARD } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface ProjectSpotlightProps {
  projects: Project[];
  t: (key: string, values?: Record<string, string | number>) => string;
}

const AUTO_ROTATE_INTERVAL_MS = 6000;
const MANUAL_PAUSE_DURATION_MS = 10000;

interface MorphingBadgeProps {
  badge: string;
}

const MorphingBadge = memo(({ badge }: MorphingBadgeProps) => {
  const parts = useMemo(() => {
    const split = badge.split('•').map((s) => s.trim());
    return split.length > 1 ? split : [badge];
  }, [badge]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (parts.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % parts.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [parts]);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        if (parts.length > 1) {
          setIndex((prev) => (prev + 1) % parts.length);
        }
      }}
      className="shrink-0 inline-flex items-center gap-1.5 rounded-md border border-accent/30
        bg-accent/10 px-2 py-0.5 font-mono text-[9px] sm:text-[10px] font-medium text-accent
        transition-all duration-300 ease-out select-none cursor-pointer hover:bg-accent/15
        active:scale-95 shadow-xs"
      title={badge}
    >
      <Sparkles
        key={`sparkle-${index}`}
        className="h-2.5 w-2.5 shrink-0 text-accent animate-sparkle-twinkle"
      />
      {/* On mobile (< sm): dynamic morphing carousel without any truncation */}
      <span className="sm:hidden inline-flex items-center gap-1.5">
        <span key={`text-${index}`} className="inline-block animate-badge-morph whitespace-nowrap">
          {parts[index]}
        </span>
        {parts.length > 1 && (
          <span className="inline-flex items-center gap-1 ml-0.5 opacity-80">
            {parts.map((_, i) => (
              <span
                key={i}
                className={cn(
                  'h-1 rounded-full transition-all duration-300 ease-out',
                  i === index ? 'w-2.5 bg-accent' : 'w-1 bg-accent/30',
                )}
              />
            ))}
          </span>
        )}
      </span>
      {/* On larger screens (sm+): full badge displayed continuously */}
      <span className="hidden sm:inline whitespace-nowrap">{badge}</span>
    </button>
  );
});
MorphingBadge.displayName = 'MorphingBadge';

const clamp = (value: number, low: number, high: number) => Math.max(low, Math.min(high, value));

// Original carousel values for large displays (1920*1080 and above):
// project 1 developed, project 2 a bit developed (0.61), project 3 barely developed (0.30), rest equal slats (60px)
const SHARES_ORIGINAL = [0, 0.65, 0.35];
const STRETCHED_ORIGINAL = [0.08, 0.76, 0.44];
const SQUEEZED_ORIGINAL = [-0.06, 0.62, 0.3];
const HERO_FACTOR_ORIGINAL = 0.86;

type StripCard = { key: number; slide: number };

const getTagStyle = (tag: string) =>
  (TAG_COLORS_CARD as Record<string, string>)[tag] ??
  'bg-slate-700/30 border-slate-600/40 text-slate-300';

export default function ProjectSpotlight({ projects, t }: ProjectSpotlightProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timerKey, setTimerKey] = useState(0);

  const lastClickTimeRef = useRef(0);
  const manualPauseUntilRef = useRef(0);

  /* --- Squeeze Strip Architecture (from carousel-squeeze) --- */
  const count = projects.length;
  const wrap = useCallback((i: number) => ((i % count) + count) % count, [count]);

  const slats = clamp(count - 3, 1, 3);
  const visible = 3 + slats;
  const ms = 850;

  const ids = useId();
  const seed = useRef(visible);
  const strip = useRef<HTMLDivElement>(null);

  const [cards, setCards] = useState<StripCard[]>(() =>
    Array.from({ length: visible }, (_, p) => ({ key: p, slide: wrap(p) })),
  );
  const [column, setColumn] = useState(0);
  const columnRef = useRef(0);
  const forward = useRef(true);
  const [slid, setSlid] = useState(0);
  const [still, setStill] = useState(false);

  const [hover, setHover] = useState(-1);

  const openSlide = cards[-column]?.slide ?? currentIndex;
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const settle = useCallback(() => {
    setCards((stripCards) =>
      forward.current ? stripCards.slice(-visible) : stripCards.slice(0, visible),
    );
    columnRef.current = 0;
    setColumn(0);
    setSlid(0);
    setStill(true);
  }, [visible]);

  useLayoutEffect(() => {
    if (!still) return;
    const id = requestAnimationFrame(() => setStill(false));
    return () => cancelAnimationFrame(id);
  }, [still]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    skipSnaps: false,
    duration: 20,
    watchDrag: false,
  });

  const resetTimer = useCallback(() => {
    elapsedRef.current = 0;
    setProgress(0);
    setTimerKey((k) => k + 1);
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const sel = emblaApi.selectedScrollSnap();
    setCurrentIndex(sel);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const step = useCallback(
    (by: number) => {
      if (count < 2 || by === 0) return;

      timers.current.forEach(clearTimeout);
      timers.current = [];
      forward.current = by > 0;

      if (by > 0) {
        setCards((stripCards) => [
          ...stripCards,
          ...Array.from({ length: by }, (_, k) => ({
            key: seed.current++,
            slide: wrap(stripCards[stripCards.length - 1].slide + 1 + k),
          })),
        ]);
        columnRef.current -= by;
        setColumn(columnRef.current);
        setSlid((s) => s - by);
      } else {
        setCards((stripCards) => [
          ...Array.from({ length: -by }, (_, k) => ({
            key: seed.current++,
            slide: wrap(stripCards[0].slide - (-by - k)),
          })),
          ...stripCards,
        ]);
        setSlid((s) => s + by);
        setStill(true);
        timers.current.push(window.setTimeout(() => setSlid(0), 0));
      }

      timers.current.push(window.setTimeout(settle, ms + 20));
    },
    [count, ms, settle, wrap],
  );

  const go = useCallback(
    (to: number) => {
      const here = openSlide;
      if (to === here) return;
      const fwd = wrap(to - here);
      step(fwd <= count / 2 ? fwd : fwd - count);
    },
    [count, openSlide, step, wrap],
  );

  // Sync currentIndex whenever openSlide changes
  useEffect(() => {
    setCurrentIndex(openSlide);
    emblaApi?.scrollTo(openSlide);
  }, [openSlide, emblaApi]);

  // Pause when window/tab loses focus, and reInit on focus/visibility change
  useEffect(() => {
    if (!emblaApi) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
        emblaApi.reInit();
        resetTimer();
      }
    };

    const handleWindowFocus = () => {
      emblaApi.reInit();
      resetTimer();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [emblaApi, resetTimer]);

  const handlePrev = useCallback(() => {
    const now = Date.now();
    if (now - lastClickTimeRef.current < 150) return;
    lastClickTimeRef.current = now;
    manualPauseUntilRef.current = 0;
    step(-1);
    resetTimer();
  }, [step, resetTimer]);

  const handleNext = useCallback(() => {
    const now = Date.now();
    if (now - lastClickTimeRef.current < 150) return;
    lastClickTimeRef.current = now;
    manualPauseUntilRef.current = 0;
    step(1);
    resetTimer();
  }, [step, resetTimer]);

  const selectProject = useCallback(
    (index: number) => {
      const now = Date.now();
      if (now - lastClickTimeRef.current < 150) return;
      lastClickTimeRef.current = now;
      manualPauseUntilRef.current = now + MANUAL_PAUSE_DURATION_MS;
      go(index);
      resetTimer();
    },
    [go, resetTimer],
  );

  // Elapsed-time tracking timer: pauses seamlessly on hover and resumes where it left off
  const elapsedRef = useRef(0);
  const lastTickRef = useRef(0);

  useEffect(() => {
    if (isPaused || count <= 1) return;

    lastTickRef.current = Date.now();

    const timer = setInterval(() => {
      const now = Date.now();
      const delta = now - lastTickRef.current;
      lastTickRef.current = now;

      if (now < manualPauseUntilRef.current) {
        elapsedRef.current = 0;
        setProgress(0);
        return;
      }

      elapsedRef.current += delta;
      const pct = Math.min((elapsedRef.current / AUTO_ROTATE_INTERVAL_MS) * 100, 100);
      setProgress(pct);

      if (elapsedRef.current >= AUTO_ROTATE_INTERVAL_MS) {
        elapsedRef.current = 0;
        setProgress(0);
        step(1);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [count, isPaused, step, timerKey]);

  const activeProject = projects[currentIndex] ?? projects[0];

  if (!activeProject) return null;

  return (
    <div className="flex w-full flex-col gap-1.5 lg:gap-1 xl:gap-1.5 2xl:gap-2">
      {/* Subtle compact header above the spotlight container */}
      <div
        className="flex items-center justify-between px-1 text-[11px] sm:text-xs lg:text-sm
          xl:text-base"
      >
        <div
          className="flex items-center gap-1.5 font-mono text-[11px] sm:text-xs lg:text-sm
            xl:text-base font-semibold tracking-wider text-slate-300 uppercase"
        >
          <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 text-accent" />
          <span>{t('spotlightTitle')}</span>
        </div>
        <Link
          href="/projects"
          className="group flex items-center gap-1 font-mono text-[11px] sm:text-xs lg:text-sm
            xl:text-base text-slate-400 transition-colors hover:text-accent"
        >
          <span>{t('ctaProjects')}</span>
          <ArrowUpRight
            className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 transition-transform
              group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>

      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative flex w-full flex-col overflow-hidden rounded-2xl border
          border-slate-700/60 bg-slate-800/35 shadow-2xl backdrop-blur-xl transition-colors
          duration-300 hover:border-slate-600/80"
      >
        {/* Browser address bar: Centered with subtle background and padlock */}
        <div
          className="relative z-20 flex items-center justify-center border-b border-slate-700/40
            bg-slate-900/40 px-3.5 py-1.5 font-mono text-[11px]"
        >
          <div
            className="flex max-w-[85%] sm:max-w-md items-center gap-1.5 truncate rounded-md border
              border-slate-700/50 bg-slate-900/70 px-2.5 py-0.5 text-slate-300 shadow-inner"
          >
            <Lock className="h-2.5 w-2.5 shrink-0 text-emerald-400 sm:h-3 sm:w-3" />
            <span className="truncate text-slate-200">{activeProject.displayUrl}</span>
          </div>
        </div>

        {/* Slide Track: Squeeze Carousel on desktop (lg+), touch slider on mobile (<lg) */}
        <div className="relative w-full overflow-hidden">
          {/* Desktop Squeeze Carousel (lg+) using exact carousel-squeeze sliding strip engine */}
          {(() => {
            const slat = 44;
            const slatHover = 96;
            const slatGap = 8;
            const gap = 8;

            const SHARES = SHARES_ORIGINAL;
            const STRETCHED = STRETCHED_ORIGINAL;
            const SQUEEZED = SQUEEZED_ORIGINAL;

            const shares = hover >= 0 && hover <= 2 ? null : SHARES;
            const shareOf = (col: number) => {
              if (shares) return SHARES[col];
              return hover === col ? STRETCHED[col] : SQUEEZED[col];
            };

            const hoveredSlatCol = hover > 2 ? hover : null;
            const slatGrow = hoveredSlatCol !== null ? slatHover - slat : 0;

            const widthOf = (col: number) => {
              if (col < 0 || col > 2) {
                return hoveredSlatCol === col ? `${slatHover}px` : `${slat}px`;
              }
              if (col === 0) return `calc(var(--sq-hero) + var(--sq-room) * ${shareOf(0)})`;
              return `calc(var(--sq-room) * ${shareOf(col)})`;
            };

            const vars = {
              '--sq-h': 'clamp(520px, 58vh, 700px)',
              '--sq-gap': `${gap}px`,
              '--sq-slat-gap': `${slatGap}px`,
              '--sq-slat': `${slat}px`,
              '--sq-slat-hover': `${slatHover}px`,
              '--sq-slat-grow': `${slatGrow}px`,
              '--sq-radius': '14px',
              '--sq-ms': `${ms}ms`,
              '--sq-ease': 'cubic-bezier(0.16, 1, 0.3, 1)',
              '--sq-hero': `min(calc(var(--sq-h) * 16 / 9 * ${HERO_FACTOR_ORIGINAL}), calc(100cqi * 0.65))`,
              '--sq-room': `calc(100cqi - var(--sq-hero) - ${slats} * var(--sq-slat-gap) - 2 * var(--sq-gap) - ${slats} * ${slat}px - ${slatGrow}px)`,
            } as CSSProperties;

            const move = `translateX(calc(${slid} * (${slat}px + var(--sq-gap))))`;

            return (
              <div
                className="hidden xl:flex w-full flex-col p-2 sm:p-3 lg:p-4 bg-slate-900/20"
                style={{
                  containerType: 'inline-size',
                  ...vars,
                }}
                onMouseLeave={() => setHover(-1)}
              >
                <div
                  className="w-full overflow-hidden"
                  style={{ height: 'var(--sq-h)' }}
                  onMouseLeave={() => setHover(-1)}
                >
                  <div
                    ref={strip}
                    role="tablist"
                    aria-label={t('spotlightTitle')}
                    className="flex h-full w-max"
                    onMouseLeave={() => setHover(-1)}
                    style={{
                      transform: move,
                      transition: still ? 'none' : `transform var(--sq-ms) var(--sq-ease)`,
                    }}
                  >
                    {cards.map((card, place) => {
                      const col = place + column;
                      const project = projects[card.slide];
                      const front = col === 0;

                      return (
                        <button
                          key={card.key}
                          type="button"
                          role="tab"
                          id={`${ids}-tab-${card.key}`}
                          aria-selected={front}
                          aria-label={project.title}
                          tabIndex={front ? 0 : -1}
                          onMouseEnter={() => setHover(col)}
                          onMouseMove={() => setHover(col)}
                          onMouseLeave={() => setHover(-1)}
                          onClick={() => col > 0 && step(col)}
                          className={cn(
                            'group/squeeze relative isolate h-full shrink-0 cursor-pointer overflow-hidden border p-0 transition-colors duration-200 outline-none',
                            front
                              ? 'border-slate-600/80 bg-slate-800/35 shadow-2xl'
                              : 'border-slate-700/40 bg-slate-800/10 hover:border-slate-500/60 hover:bg-slate-800/30 opacity-75 hover:opacity-100',
                          )}
                          style={{
                            width: widthOf(col),
                            marginLeft: place === 0 ? 0 : 'var(--sq-gap)',
                            borderRadius: 'min(var(--sq-radius), 12px)',
                            transitionProperty: 'width, margin-left',
                            transitionDuration: still ? '0s' : 'var(--sq-ms)',
                            transitionTimingFunction: 'var(--sq-ease)',
                          }}
                        >
                          {/* Picture rendered with constant hero scale */}
                          <div
                            className="absolute inset-y-0 left-1/2 h-full -translate-x-1/2 overflow-hidden bg-slate-950/40"
                            style={{
                              width: 'var(--sq-hero)',
                              minWidth: '100%',
                            }}
                          >
                            <Image
                              src={project.img || '/placeholder.jpg'}
                              alt={project.title}
                              fill
                              sizes="(max-width: 1280px) 80vw, 75vw"
                              priority={card.slide === 0}
                              className={cn(
                                'object-cover object-top transition-transform duration-300 ease-out',
                                front
                                  ? 'group-hover/squeeze:scale-101'
                                  : 'filter brightness-75 group-hover/squeeze:brightness-95',
                              )}
                            />

                            {/* Non-active overlay label - vector SVG text: 100% crisp, zero raster blur, bigger on larger displays */}
                            {!front && (
                              <div className="absolute inset-0 flex items-center justify-center py-5 px-0 bg-slate-950/60 hover:bg-slate-950/35 transition-colors select-none">
                                <div className="flex-1 h-full w-full flex items-center justify-center">
                                  <svg
                                    className="h-[85%] max-h-85 w-full overflow-visible"
                                    viewBox="0 0 60 340"
                                    preserveAspectRatio="xMidYMid meet"
                                  >
                                    <text
                                      x="30"
                                      y="170"
                                      fill="currentColor"
                                      textAnchor="middle"
                                      dominantBaseline="central"
                                      transform="rotate(-90 30 170)"
                                      className="fill-slate-100 font-mono font-bold text-[14px] 2xl:text-[15px] tracking-[0.2em] uppercase"
                                      style={{
                                        textRendering: 'geometricPrecision',
                                      }}
                                    >
                                      {project.title}
                                    </text>
                                  </svg>
                                </div>
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active project details UNDER the project panels with cross-fade matching original */}
                <div className="mt-4 grid w-full">
                  {projects.map((project, i) => {
                    const shown = i === openSlide;
                    return (
                      <div
                        key={project.id}
                        aria-hidden={!shown}
                        className="col-start-1 row-start-1 w-full"
                        style={{
                          opacity: shown ? 1 : 0,
                          visibility: shown ? 'visible' : 'hidden',
                          pointerEvents: shown ? 'auto' : 'none',
                          transition: `opacity var(--sq-ms) var(--sq-ease), visibility var(--sq-ms)`,
                        }}
                      >
                        {/* Balanced 2-Block Split Layout: Left (6 cols) Info, Right (6 cols) Architecture & Highlights */}
                        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch min-h-52.5">
                          {/* Left Block (6 cols): Identity, Pitch, Tech Stack & Action Links */}
                          <div className="flex flex-col justify-between gap-3 xl:col-span-6 rounded-xl border border-slate-700/60 p-4 sm:p-4.5">
                            <div className="flex flex-col gap-2">
                              {/* Header row with Title, Badge, and Quick Link */}
                              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                                <div className="flex flex-wrap items-center gap-2 min-w-0">
                                  <Link
                                    href="/projects"
                                    className="shrink-0 text-lg xl:text-xl font-bold text-white transition-colors hover:text-accent tracking-tight"
                                  >
                                    {project.title}
                                  </Link>
                                  {project.badge && <MorphingBadge badge={project.badge} />}
                                </div>

                                <Link
                                  href={project.demo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex max-w-full items-center font-mono text-xs xl:text-sm font-semibold text-accent transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                                >
                                  <span className="break-all">{project.displayUrl}</span>
                                </Link>
                              </div>

                              {/* Clean, Readable Description */}
                              <p className="text-xs xl:text-sm leading-relaxed text-slate-200 line-clamp-3 min-h-10">
                                {project.desc}
                              </p>
                            </div>

                            {/* Footer of Left Block: Tags & Buttons */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2.5 border-t border-slate-700/40">
                              {/* Tech Stack Pills */}
                              <div className="flex flex-wrap items-center gap-1.5">
                                {project.tags.slice(0, 5).map((tag) => (
                                  <span
                                    key={tag}
                                    className={`inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-mono font-medium transition-colors hover:border-white/20 hover:bg-white/10 ${
                                      TAG_COLORS_CARD[tag]?.split(' ')[2] || 'text-slate-300'
                                    }`}
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>

                              {/* Action Buttons */}
                              <div className="flex items-center gap-2 shrink-0">
                                {project.source && (
                                  <a
                                    href={project.source}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-800/80 px-3 py-1.5 text-xs font-mono font-medium text-slate-200 transition-all duration-150 hover:border-white/25 hover:bg-slate-700 hover:text-white active:scale-95"
                                  >
                                    <GithubIcon className="h-3.5 w-3.5" />
                                    <span>{t('carousel.codeSource')}</span>
                                  </a>
                                )}

                                {project.demo && (
                                  <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-mono font-bold text-slate-950 shadow-sm transition-all duration-150 hover:bg-accent/90 active:scale-95"
                                  >
                                    <Globe className="h-3.5 w-3.5" />
                                    <span>{t('carousel.liveDemo')}</span>
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Right Block (6 cols): Architecture & Highlights Right-sized Card Block */}
                          <div className="flex flex-col justify-between xl:col-span-6 rounded-xl border border-slate-700/60 p-4 sm:p-4.5">
                            {project.highlights && project.highlights.length > 0 ? (
                              <>
                                <div className="mb-2 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                                  <div className="flex items-center gap-2 text-lg xl:text-xl font-bold tracking-tight text-accent">
                                    <Layers className="h-5 w-5 shrink-0 text-accent" />
                                    <h3>{t('carousel.architectureTitle')}</h3>
                                  </div>
                                  <span className="font-mono text-[11px] text-slate-400">
                                    {project.category.toUpperCase()}
                                  </span>
                                </div>

                                <ul className="flex flex-col justify-between flex-1 gap-1.5">
                                  {project.highlights.map((highlight, hIdx) => (
                                    <li
                                      key={hIdx}
                                      className="flex items-center gap-2.5 rounded-lg border border-slate-700/30 px-3 py-1.5 text-slate-200 min-h-10"
                                    >
                                      <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                                      <span
                                        title={highlight}
                                        className="min-w-0 truncate text-xs xl:text-sm leading-relaxed"
                                      >
                                        {highlight}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </>
                            ) : (
                              <div className="flex h-full items-center justify-center text-xs text-slate-400">
                                {project.title}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Kept mounted for the existing Embla synchronization hooks. */}
          <div ref={emblaRef} className="xl:hidden w-full overflow-hidden">
            <div className="flex touch-pan-y">
              {projects.map((project, idx) => {
                return (
                  <div key={project.id} className="min-w-0 flex-[0_0_100%]">
                    <div className="group/card relative flex h-full flex-col overflow-hidden">
                      {/* Responsive Container: Vertical stack on mobile/sm/md, side-by-side 2 columns on lg (1024px) */}
                      <div
                        className="flex flex-col lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-4
                          p-3 sm:p-4"
                      >
                        {/* Project Visual Preview (scale-up ONLY on active slide hover) */}
                        <div
                          className="relative aspect-video sm:aspect-video lg:aspect-auto lg:h-full
                            lg:min-h-70 w-full overflow-hidden rounded-lg sm:rounded-xl
                            bg-slate-950/60 max-h-65 sm:max-h-80 lg:max-h-none lg:col-span-6 border
                            border-slate-700/40"
                        >
                          <Link href="/projects" className="relative block h-full w-full">
                            <Image
                              src={project.img || '/placeholder.jpg'}
                              alt={project.title}
                              fill
                              sizes="(max-width: 1024px) 95vw, 50vw"
                              priority={idx === 0}
                              className="object-cover object-top transition-transform duration-500
                                ease-out group-hover/card:scale-103"
                            />
                            <div
                              className="absolute inset-0 bg-linear-to-t from-slate-950/70
                                via-transparent to-transparent opacity-0
                                group-hover/card:opacity-100 transition-opacity duration-300"
                            />
                          </Link>
                        </div>

                        {/* Project Info & Highlights Block */}
                        <div
                          className="flex h-[356px] flex-col justify-between gap-2 pt-2.5 text-center
                            sm:h-87.5 sm:gap-2.5 sm:pt-3 sm:text-left lg:pt-0 lg:col-span-6 xl:h-auto"
                        >
                          <div className="flex flex-col gap-1.5 sm:gap-2">
                            <div className="flex h-7 sm:h-auto flex-wrap items-center justify-center sm:justify-between gap-2 min-w-0">
                              <Link
                                href="/projects"
                                className="shrink-0 text-base sm:text-lg font-bold text-white
                                  transition-colors group-hover/card:text-accent tracking-tight text-center sm:text-left"
                              >
                                {project.title}
                              </Link>

                              {project.badge && <MorphingBadge badge={project.badge} />}
                            </div>

                            <p
                              className="h-9 sm:h-auto min-h-9 sm:min-h-10 text-center text-xs sm:text-sm leading-relaxed
                                text-slate-300 line-clamp-2 sm:line-clamp-3 xl:text-left"
                            >
                              {project.shortDesc || project.desc}
                            </p>

                            {/* Key Architecture Highlights Box */}
                            {project.highlights && project.highlights.length > 0 && (
                              <div
                                className="flex h-[168px] sm:h-[152px] w-full flex-col justify-between rounded-lg border border-slate-700/50 p-2.5 text-center xl:text-left"
                              >
                                <div
                                  className="flex items-center justify-between gap-1.5 border-b border-slate-700/40 pb-1.5 text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider text-accent xl:mb-1.5 xl:border-slate-700/30 xl:pb-1"
                                >
                                  <div className="flex items-center gap-1.5">
                                    <Layers className="h-3 w-3 text-accent" />
                                    <span>{t('carousel.architectureTitle')}</span>
                                  </div>
                                  <span className="text-[10px] font-mono text-slate-400">
                                    {project.category.toUpperCase()}
                                  </span>
                                </div>
                                <ul className="flex flex-1 flex-col justify-between gap-1.5 pt-1.5">
                                  {project.highlights.map((highlight, hIdx) => (
                                    <li
                                      key={hIdx}
                                      className="flex flex-1 items-center justify-center gap-1.5 text-center text-xs leading-snug text-slate-200 sm:justify-start sm:text-left"
                                    >
                                      <CheckCircle2
                                        className="h-3.5 w-3.5 shrink-0 text-accent"
                                      />
                                      <span className="line-clamp-2 text-center sm:text-left">{highlight}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          <div className="mt-auto flex flex-col gap-2 pt-1 border-t border-slate-700/40">
                            {/* Tech Stack Badges */}
                            <div
                              className="flex h-11 sm:h-auto flex-wrap items-center justify-center content-center gap-1.5
                                xl:justify-start"
                            >
                              {project.tags.slice(0, 5).map((tag) => (
                                <span
                                  key={tag}
                                  className={`inline-flex items-center rounded-md border px-2 py-0.5
                                  text-[10px] sm:text-[11px] font-mono font-medium ${getTagStyle(
                                  tag, )}`}
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>

                            {/* Action Buttons: Locked to identical height across all projects */}
                            <div className="flex h-9 sm:h-auto gap-2">
                              {project.source && (
                                <a
                                  href={project.source}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex h-full flex-1 items-center justify-center gap-1.5
                                    rounded-lg border border-slate-700 bg-slate-800/60 py-1.5
                                    sm:py-2 text-xs font-semibold text-slate-300 transition-all
                                    duration-200 hover:border-slate-500 hover:bg-slate-700/50
                                    hover:text-white active:scale-95"
                                >
                                  <GithubIcon className="h-3.5 w-3.5" />
                                  <span>{t('carousel.codeSource')}</span>
                                </a>
                              )}

                              {project.demo && (
                                <a
                                  href={project.demo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex h-full flex-1 items-center justify-center gap-1.5
                                    rounded-lg bg-accent py-1.5 sm:py-2 text-xs font-bold
                                    text-slate-950 shadow-md transition-all duration-200
                                    hover:bg-accent/90 hover:shadow-accent/20 active:scale-95"
                                >
                                  <Globe className="h-3.5 w-3.5" />
                                  <span>{t('carousel.liveDemo')}</span>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Pagination Bar: only on small mobiles (<sm) */}
        <div
          className="relative z-30 flex xl:hidden items-center justify-center border-t
            border-slate-700/60 bg-slate-800/70 px-3 py-2"
        >
          {/* Animated Progress Bar across top of bottom bar */}
          <div className="absolute top-0 left-0 h-0.5 w-full bg-slate-700/40">
            <div
              className="h-full bg-accent transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div
            className="flex items-center justify-center gap-1.5 rounded-xl border
              border-slate-600/40 bg-slate-800/45 px-1.5 py-1.5 shadow-inner backdrop-blur-sm"
          >
            <button
              type="button"
              aria-label={t('carousel.previous')}
              onClick={handlePrev}
              className="flex h-8 w-8 touch-manipulation items-center justify-center rounded-lg
                text-slate-400 active:scale-95 cursor-pointer outline-none focus:outline-none
                focus-visible:outline-none select-none [-webkit-tap-highlight-color:transparent]"
            >
              <ChevronLeft className="h-3.5 w-3.5 stroke-[2.5]" />
            </button>

            <div className="flex items-center gap-0.5">
              {projects.map((project, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={project.id}
                    type="button"
                    aria-label={t('carousel.goTo', { title: project.title })}
                    onClick={() => selectProject(idx)}
                    className={`flex h-8 w-8 touch-manipulation items-center justify-center
                    rounded-lg font-mono font-bold text-sm transition-colors duration-150
                    cursor-pointer ${
                      isActive
                        ? 'bg-slate-700/35 text-accent font-extrabold'
                        : 'text-slate-400 hover:bg-slate-700/70 hover:text-white'
                    }`}
                  >
                    <span>{idx + 1}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              aria-label={t('carousel.next')}
              onClick={handleNext}
              className="flex h-8 w-8 touch-manipulation items-center justify-center rounded-lg
                text-slate-400 active:scale-95 cursor-pointer outline-none focus:outline-none
                focus-visible:outline-none select-none [-webkit-tap-highlight-color:transparent]"
            >
              <ChevronRight className="h-3.5 w-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
