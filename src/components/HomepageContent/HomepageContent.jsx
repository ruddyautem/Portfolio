'use client';
import { useState, useEffect, useRef, useCallback, memo, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '@/app/projects/projects';
import TopPageDecoration from '../TopPageDecoration/TopPageDecoration';
import { LogoCarousel } from '../ui/logo-carousel';

// ============================================================================
// CONSTANTS
// ============================================================================

const TAG_COLORS = {
  react: 'bg-blue-500',
  tailwindcss: 'bg-cyan-500',
  nextjs: 'bg-black',
  express: 'bg-green-600',
  redux: 'bg-purple-600',
  firebase: 'bg-orange-500',
  'styled-components': 'bg-pink-500',
  'material-ui': 'bg-blue-600',
  mysql: 'bg-orange-600',
  axios: 'bg-blue-400',
  clerk: 'bg-indigo-600',
  sanity: 'bg-red-500',
  typescript: 'bg-blue-700',
  zustand: 'bg-amber-600',
};

const CAROUSEL_CONFIG = {
  autoScrollInterval: 4000,
  swipeThreshold: 50,
  transitionDuration: 500,
};

const NAV_BUTTONS = [
  { href: '/projects', label: 'Voir mes projets', shortLabel: 'Projets', variant: 'primary' },
  { href: '/about', label: 'Profil', variant: 'secondary' },
  { href: '/contact', label: 'Contact', variant: 'secondary' },
];

// Responsive class patterns for reuse
const RESPONSIVE_CLASSES = {
  itemAnimate: 'item-animate',
  spacing: {
    gap: '3xl:gap-16 gap-8 lg:gap-2 lg:lg:gap-3 xl:gap-8 2xl:gap-12',
    padding: {
      small: '3xl:p-8 p-3 sm:p-4 lg:p-3 lg:lg:p-4 xl:p-5 2xl:p-6',
      medium: '3xl:p-12 p-4 sm:p-6 md:p-8 lg:px-6 lg:py-3 lg:lg:px-8 lg:lg:py-4 xl:p-6 2xl:p-8',
    },
    margin: {
      top: '3xl:mt-16 3xl:pt-12 pt-3 lg:mt-2 lg:pt-2 lg:lg:mt-3 lg:lg:pt-3 2xl:mt-6 2xl:pt-8',
    },
  },
  text: {
    heading: '3xl:text-6xl text-2xl sm:text-3xl lg:text-lg lg:lg:text-xl xl:text-2xl 2xl:text-4xl',
    subheading: '3xl:text-3xl text-base sm:text-lg lg:text-sm xl:text-lg 2xl:text-2xl',
    body: '3xl:text-2xl text-xs sm:text-sm lg:text-xs lg:lg:text-sm xl:text-base 2xl:text-lg',
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const trimText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text || '';
  return text.substring(0, maxLength).trim() + '...';
};

const getTagColor = (tag) => TAG_COLORS[tag] || 'bg-gray-500';

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

/**
 * Enhanced carousel hook with optimized performance
 */
const useCarousel = (itemCount) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);
  const touchStartX = useRef(null);
  const timeoutRef = useRef(null);
  const isPausedRef = useRef(isPaused);
  const isTransitioningRef = useRef(isTransitioning);

  // Keep refs in sync
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    isTransitioningRef.current = isTransitioning;
  }, [isTransitioning]);

  const goToPrevious = useCallback(() => {
    if (isTransitioningRef.current) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev - 1 + itemCount) % itemCount);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => setIsTransitioning(false),
      CAROUSEL_CONFIG.transitionDuration,
    );
  }, [itemCount]);

  const goToNext = useCallback(() => {
    if (isTransitioningRef.current) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev + 1) % itemCount);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => setIsTransitioning(false),
      CAROUSEL_CONFIG.transitionDuration,
    );
  }, [itemCount]);

  const goToSlide = useCallback(
    (index) => {
      if (isTransitioningRef.current || index === activeIndex) return;
      setIsTransitioning(true);
      setActiveIndex(index);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(
        () => setIsTransitioning(false),
        CAROUSEL_CONFIG.transitionDuration,
      );
    },
    [activeIndex],
  );

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      if (!touchStartX.current) return;
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > CAROUSEL_CONFIG.swipeThreshold) {
        diff > 0 ? goToNext() : goToPrevious();
      }
      touchStartX.current = null;
    },
    [goToNext, goToPrevious],
  );

  const pauseAutoScroll = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeAutoScroll = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Auto-scroll effect - using ref for goToNext to avoid recreating interval
  useEffect(() => {
    const autoAdvance = () => {
      if (!isPausedRef.current && !isTransitioningRef.current) {
        setIsTransitioning(true);
        setActiveIndex((prev) => (prev + 1) % itemCount);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(
          () => setIsTransitioning(false),
          CAROUSEL_CONFIG.transitionDuration,
        );
      }
    };

    const interval = setInterval(autoAdvance, CAROUSEL_CONFIG.autoScrollInterval);
    intervalRef.current = interval;

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [itemCount]); // Only recreate when itemCount changes

  return {
    activeIndex,
    goToPrevious,
    goToNext,
    goToSlide,
    handleTouchStart,
    handleTouchEnd,
    pauseAutoScroll,
    resumeAutoScroll,
  };
};

// ============================================================================
// MEMOIZED UTILITY COMPONENTS
// ============================================================================

const ProjectTag = memo(({ tag }) => (
  <span
    className="3xl:gap-1.5 3xl:px-3 3xl:py-1.5 3xl:text-sm inline-flex items-center gap-1
      rounded-full px-2 py-0.5 text-[9px] font-medium text-white sm:gap-1.5 sm:text-[10px] md:px-2.5
      md:py-1 md:text-[11px] lg:gap-0.5 lg:px-1 lg:py-0.5 lg:text-[8px] xl:gap-1.5 xl:px-1.5
      xl:text-[10px] 2xl:gap-2 2xl:px-2.5 2xl:py-1 2xl:text-xs"
  >
    <span
      className={`3xl:h-2.5 3xl:w-2.5 h-1.5 w-1.5 rounded-full md:h-2 md:w-2 lg:h-1 lg:w-1 xl:h-1.5
        xl:w-1.5 2xl:h-2 2xl:w-2 ${getTagColor(tag)}`}
    />
    {tag}
  </span>
));
ProjectTag.displayName = 'ProjectTag';

const ActionButton = memo(({ onClick, variant = 'secondary', children }) => {
  const baseClasses =
    'flex h-7 flex-1 cursor-pointer items-center justify-center rounded text-[10px] font-medium transition hover:scale-105 sm:h-8 sm:text-[11px] md:h-9 md:text-xs lg:h-6 lg:text-[9px] xl:h-8 xl:text-xs 2xl:h-10 2xl:text-sm 3xl:h-12 3xl:text-lg';
  const variantClasses = {
    primary: 'bg-accent text-slate-900',
    secondary: 'bg-slate-700 text-white hover:bg-slate-600',
  };

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </button>
  );
});
ActionButton.displayName = 'ActionButton';

const CarouselIndicators = memo(({ activeIndex, total, onIndicatorClick }) => {
  const indicators = useMemo(() => Array.from({ length: total }, (_, i) => i), [total]);

  return (
    <div className="3xl:space-x-4 my-2 flex justify-center space-x-3 lg:my-0 2xl:space-x-3.5">
      {indicators.map((index) => (
        <button
          key={index}
          onClick={() => onIndicatorClick(index)}
          className={`3xl:h-5 3xl:w-5 h-2.5 w-2.5 cursor-pointer rounded-full transition-colors
          duration-300 lg:h-3 lg:w-3 xl:h-3.5 xl:w-3.5 2xl:h-4 2xl:w-4
          ${activeIndex === index ? 'bg-accent' : 'bg-slate-700'}`}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={activeIndex === index ? 'true' : 'false'}
        />
      ))}
    </div>
  );
});
CarouselIndicators.displayName = 'CarouselIndicators';

// ============================================================================
// PROJECT COMPONENTS
// ============================================================================

const ProjectOverlay = memo(({ project, onExternalLink }) => {
  const displayedTags = useMemo(() => project.tags?.slice(0, 4) || [], [project.tags]);
  const remainingCount = useMemo(
    () => (project.tags?.length > 4 ? project.tags.length - 4 : 0),
    [project.tags],
  );
  const demoUrl = useMemo(() => project.demo?.slice('https://'.length) || 'PROJET', [project.demo]);

  return (
    <div
      className="3xl:inset-2 absolute inset-2 flex transform flex-col justify-end overflow-hidden
        rounded-lg sm:inset-2.5 md:inset-3 lg:inset-2 xl:inset-3 2xl:inset-2.5"
    >
      <div
        className="translate-y-full rounded-lg bg-slate-900/95 antialiased backdrop-blur-md
          transition-transform duration-300 group-hover:translate-y-0"
      >
        <div className="3xl:p-6 p-2.5 antialiased sm:p-3 md:p-4 lg:p-2 xl:p-3 2xl:p-4">
          <span
            className="text-accent 3xl:text-base 3xl:font-bold mb-1 block text-[10px] font-semibold
              tracking-wider antialiased sm:text-[11px] md:mb-1.5 md:text-xs lg:mb-0.5 lg:text-[9px]
              xl:mb-1 xl:text-xs 2xl:text-sm"
          >
            {demoUrl}
          </span>
          <h4
            className="3xl:text-xl 3xl:font-extrabold mb-1.5 text-sm font-bold text-white
              antialiased sm:text-base md:mb-2 md:text-lg lg:mb-0.5 lg:text-[11px] xl:mb-1.5
              xl:text-sm 2xl:mb-2 2xl:text-lg"
          >
            {project.title}
          </h4>
          <p
            className="3xl:mb-3 3xl:text-base 3xl:leading-relaxed mb-2 line-clamp-2 text-[10px]
              leading-snug text-slate-200 antialiased sm:text-[11px] md:mb-2.5 md:line-clamp-3
              md:text-xs md:leading-relaxed lg:mb-1 lg:text-[9px] lg:leading-tight xl:mb-2
              xl:line-clamp-3 xl:text-xs 2xl:mb-2.5 2xl:text-sm 2xl:leading-relaxed"
          >
            {trimText(project.desc)}
          </p>
          <div
            className="3xl:mb-3 mb-2 flex flex-wrap gap-1 sm:gap-1.5 md:mb-2.5 md:gap-1.5 lg:mb-1
              lg:gap-0.5 xl:mb-2 xl:gap-1 2xl:mb-2.5 2xl:gap-1.5"
          >
            {displayedTags.map((tag) => (
              <ProjectTag key={tag} tag={tag} />
            ))}
            {remainingCount > 0 && (
              <span
                className="3xl:text-base 3xl:font-medium text-[10px] text-white antialiased
                  sm:text-[11px] md:text-xs lg:text-[8px] xl:text-xs 2xl:text-sm"
              >
                +{remainingCount}
              </span>
            )}
          </div>
          <div className="3xl:gap-3 flex gap-2 md:gap-2.5 lg:gap-1 xl:gap-2 2xl:gap-2.5">
            <ActionButton onClick={(e) => onExternalLink(e, project.source)} variant="secondary">
              Code
            </ActionButton>
            <ActionButton onClick={(e) => onExternalLink(e, project.demo)} variant="primary">
              Demo
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
});
ProjectOverlay.displayName = 'ProjectOverlay';

const ProjectCard = memo(({ project, onExternalLink, isFeatured, isActive }) => (
  <div className="h-full w-full shrink-0" style={{ backfaceVisibility: 'hidden' }}>
    <Link href="/projects" className="block h-full">
      <div
        className={`${RESPONSIVE_CLASSES.itemAnimate} group hover:shadow-glow flex h-full flex-col
          rounded-xl border border-slate-700 bg-slate-800/30 backdrop-blur transition-shadow
          duration-300 ${RESPONSIVE_CLASSES.spacing.padding.small} lg:rounded-lg`}
      >
        <div className="flex flex-1 flex-col">
          <div className="relative mb-2 flex-1 overflow-hidden rounded-lg">
            <Image
              src={project.img}
              alt={project.title}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-lg object-cover transition-all duration-300 group-hover:scale-105"
            />
            {isFeatured && (
              <span
                className={`bg-accent absolute top-2 right-2 z-10 rounded-full px-2 py-1 text-xs
                text-slate-900 transition-opacity duration-300 hover:scale-105 antialiased
                ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} 3xl:px-3
                3xl:py-1.5 3xl:font-bold 2xl:px-2.5 2xl:py-1 2xl:text-sm`}
              >
                En Vedette
              </span>
            )}
            <ProjectOverlay project={project} onExternalLink={onExternalLink} />
          </div>
          <h3
            className="3xl:text-2xl 3xl:font-extrabold pt-3 text-center text-sm font-bold
              antialiased sm:text-base lg:pt-2 lg:text-sm lg:lg:text-base xl:text-lg 2xl:text-xl"
          >
            {project.title}
          </h3>
        </div>
      </div>
    </Link>
  </div>
));
ProjectCard.displayName = 'ProjectCard';

const CarouselControls = memo(({ onPrevious, onNext }) => (
  <>
    <button
      onClick={onPrevious}
      className="3xl:p-3 absolute top-1/2 left-1 z-30 -translate-y-1/2 cursor-pointer rounded-full
        bg-slate-700/50 p-2 transition hover:bg-slate-600 active:scale-95 2xl:left-6 2xl:p-2.5"
      aria-label="Previous project"
    >
      <ChevronLeft className="3xl:h-8 3xl:w-8 h-6 w-6 text-white 2xl:h-7 2xl:w-7" />
    </button>
    <button
      onClick={onNext}
      className="3xl:p-3 absolute top-1/2 right-1 z-30 -translate-y-1/2 cursor-pointer rounded-full
        bg-slate-700/50 p-2 transition hover:bg-slate-600 active:scale-95 2xl:right-6 2xl:p-2.5"
      aria-label="Next project"
    >
      <ChevronRight className="3xl:h-8 3xl:w-8 h-6 w-6 text-white 2xl:h-7 2xl:w-7" />
    </button>
  </>
));
CarouselControls.displayName = 'CarouselControls';

// ============================================================================
// LAYOUT COMPONENTS
// ============================================================================

const HeaderSection = memo(() => (
  <div className="pt-3 text-center lg:pt-0">
    <div className="3xl:mb-10 mb-2 lg:mb-2 lg:lg:mb-3 xl:mb-4 2xl:mb-6">
      <div
        className={`text-accent ${RESPONSIVE_CLASSES.itemAnimate} 3xl:px-6 3xl:py-3 3xl:text-xl mb-2
          inline-block rounded-full bg-slate-700/50 px-2 py-1 font-mono text-[10px] lg:mb-1 lg:px-3
          lg:text-xs lg:lg:text-sm 2xl:px-4 2xl:py-2 2xl:text-base`}
      >
        AUTEM.DEV
      </div>
      <h1
        className={`${RESPONSIVE_CLASSES.itemAnimate} 3xl:mb-3 mb-2 font-bold lg:mb-1 2xl:mb-2
          ${RESPONSIVE_CLASSES.text.heading}`}
      >
        Ruddy <span className="text-accent">Autem</span>
      </h1>
      <p
        className={`${RESPONSIVE_CLASSES.itemAnimate} 3xl:mb-4 3xl:text-4xl mb-3 text-slate-300
          lg:mb-2 2xl:mb-3 ${RESPONSIVE_CLASSES.text.subheading}`}
      >
        Développeur Web Full Stack
      </p>
    </div>
    <p
      className={`${RESPONSIVE_CLASSES.itemAnimate} 3xl:mb-6 3xl:max-w-3xl 3xl:leading-relaxed
        mx-auto mb-4 max-w-md text-slate-300 lg:mb-3 lg:max-w-xs lg:lg:max-w-sm xl:max-w-md 2xl:mb-5
        2xl:max-w-2xl 2xl:leading-relaxed ${RESPONSIVE_CLASSES.text.body}`}
    >
      Je conçois et développe des applications web modernes, en alliant performance, simplicité et
      expérience utilisateur
    </p>
  </div>
));
HeaderSection.displayName = 'HeaderSection';

const CvButton = memo(() => (
  <div
    className={`${RESPONSIVE_CLASSES.itemAnimate} my-4 flex justify-center transition-all lg:mt-5
      2xl:mt-7`}
  >
    <a
      href="/CV.pdf"
      download="Ruddy_Autem_CV.pdf"
      rel="noopener noreferrer"
      className="group 3xl:px-7 3xl:py-3.5 3xl:text-lg relative inline-flex items-center
        justify-center overflow-hidden rounded-full bg-accent px-5 py-2.5 text-sm font-medium
        text-slate-900 transition-all duration-300 hover:scale-105 lg:text-center lg:text-xs
        xl:text-base"
    >
      <span
        className="bg-accent absolute inset-0 h-full w-full translate-y-full transition-transform
          duration-300 group-hover:translate-y-0"
      />
      <span
        className="relative flex items-center gap-2 transition-colors duration-300
          group-hover:text-slate-900"
      >
        Télécharger mon CV
        <svg
          className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-90"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </a>
  </div>
));
CvButton.displayName = 'CvButton';

const NavigationButtons = memo(() => (
  <div
    className="3xl:gap-8 mb-3 flex flex-col gap-2 lg:mb-0 lg:flex-row lg:flex-wrap lg:justify-center
      lg:gap-3 2xl:gap-5"
  >
    <Link
      href={NAV_BUTTONS[0].href}
      className={`bg-accent ${RESPONSIVE_CLASSES.itemAnimate} 3xl:px-10 3xl:py-5 3xl:text-2xl w-full
        rounded-lg px-4 py-2.5 text-center text-sm font-medium text-slate-900 transition
        hover:scale-[1.02] lg:w-auto lg:px-3 lg:py-2 lg:text-xs lg:hover:scale-[1.03] lg:lg:px-4
        lg:lg:text-sm xl:px-5 xl:py-2.5 xl:text-base 2xl:px-7 2xl:py-3.5 2xl:text-xl`}
    >
      <span className="lg:hidden">{NAV_BUTTONS[0].label}</span>
      <span className="hidden lg:inline">{NAV_BUTTONS[0].shortLabel}</span>
    </Link>
    <div className="3xl:gap-4 grid grid-cols-2 gap-2 lg:contents 2xl:gap-5">
      {NAV_BUTTONS.slice(1).map((button) => (
        <Link
          key={button.href}
          href={button.href}
          className={`${RESPONSIVE_CLASSES.itemAnimate} 3xl:px-10 3xl:py-5 3xl:text-2xl rounded-lg
          border border-slate-700 px-3 py-2.5 text-center text-sm transition hover:bg-slate-700/50
          lg:px-3 lg:py-2 lg:text-xs lg:lg:px-4 lg:lg:text-sm xl:px-5 xl:py-2.5 xl:text-base
          2xl:px-7 2xl:py-3.5 2xl:text-xl`}
        >
          {button.label}
        </Link>
      ))}
    </div>
  </div>
));
NavigationButtons.displayName = 'NavigationButtons';

const TechSection = memo(() => (
  <div
    className={`${RESPONSIVE_CLASSES.itemAnimate} border-t border-slate-700/50
      ${RESPONSIVE_CLASSES.spacing.margin.top}`}
  >
    <h3
      className="3xl:mb-4 3xl:text-xl mb-2 text-center font-mono text-[10px] text-slate-500
        lg:text-xs lg:lg:text-sm 2xl:mb-3 2xl:text-base"
    >
      TECHNOLOGIES
    </h3>
    <LogoCarousel />
  </div>
));
TechSection.displayName = 'TechSection';

// ============================================================================
// PROJECT CAROUSEL
// ============================================================================

const ProjectCarousel = memo(({ projects, onExternalLink }) => {
  const carousel = useCarousel(projects.length);

  // Memoize the transform style
  const transformStyle = useMemo(
    () => ({
      transform: `translate3d(-${carousel.activeIndex * 100}%, 0, 0)`,
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d',
    }),
    [carousel.activeIndex],
  );

  return (
    <div className="flex flex-col items-center lg:items-end 2xl:items-center">
      <h2
        className={`${RESPONSIVE_CLASSES.itemAnimate} 3xl:mb-6 mb-3 text-center font-bold lg:mb-2
          lg:ml-auto lg:w-3/4 xl:mb-3 2xl:mb-4 2xl:ml-0 2xl:w-4/5
          ${RESPONSIVE_CLASSES.text.subheading}`}
      >
        Projets récents
      </h2>
      <div
        className={`${RESPONSIVE_CLASSES.itemAnimate} relative mx-auto mb-3 aspect-square w-full
          max-w-xs overflow-hidden rounded-xl sm:max-w-sm md:max-w-md lg:mx-0 lg:w-3/4 lg:max-w-none
          lg:rounded-lg 2xl:w-4/5`}
        onMouseEnter={carousel.pauseAutoScroll}
        onMouseLeave={carousel.resumeAutoScroll}
        onTouchStart={carousel.handleTouchStart}
        onTouchEnd={carousel.handleTouchEnd}
        role="region"
        aria-label="Project carousel"
        style={{ perspective: '1000px' }}
      >
        <div
          className="flex h-full transition-transform duration-500 ease-in-out
            will-change-transform"
          style={transformStyle}
        >
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              onExternalLink={onExternalLink}
              isFeatured={idx === 0}
              isActive={carousel.activeIndex === idx}
            />
          ))}
          <div className="hidden h-full w-full shrink-0 lg:block">
            <ProjectCard
              project={projects[0]}
              onExternalLink={onExternalLink}
              isFeatured={true}
              isActive={carousel.activeIndex === 0}
            />
          </div>
        </div>
        <CarouselControls onPrevious={carousel.goToPrevious} onNext={carousel.goToNext} />
      </div>
      <div
        className={`${RESPONSIVE_CLASSES.itemAnimate} 3xl:mt-6 mb-3 lg:w-3/4 2xl:mt-4 2xl:w-4/5`}
      >
        <CarouselIndicators
          activeIndex={carousel.activeIndex}
          total={projects.length}
          onIndicatorClick={carousel.goToSlide}
        />
      </div>
    </div>
  );
});
ProjectCarousel.displayName = 'ProjectCarousel';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const HomepageContent = () => {
  const recentProjects = useMemo(() => projects.slice(1, 4), []);

  const handleExternalLink = useCallback((e, url) => {
    e.stopPropagation();
    e.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <div
      className="3xl:p-16 flex w-full flex-col items-center justify-start overflow-hidden
        overflow-y-auto p-4 sm:p-6 lg:h-full lg:min-h-0 lg:justify-center lg:overflow-hidden lg:p-6
        2xl:p-10 min-h-screen h-auto"
    >
      <div
        className={`${RESPONSIVE_CLASSES.itemAnimate} relative z-10 w-full max-w-2xl lg:max-w-3xl
          xl:max-w-5xl 2xl:max-w-6xl 3xl:max-w-[1800px]`}
      >
        <div
          className="flex flex-col overflow-visible rounded-2xl border border-slate-700/50
            bg-slate-800/20 backdrop-blur-xl sm:rounded-3xl lg:h-full lg:max-h-[85vh]
            lg:overflow-y-hidden 2xl:max-h-[90vh] 3xl:max-h-[90vh] h-auto max-h-none"
        >
          <TopPageDecoration filename="accueil.jsx" />

          <div
            className={`flex flex-col justify-start overflow-visible lg:flex-1 lg:justify-between
              lg:overflow-y-hidden ${RESPONSIVE_CLASSES.spacing.padding.medium}`}
          >
            {/* Main Content Grid */}
            <div
              className={`flex flex-col lg:grid lg:grid-cols-2 lg:items-center
                ${RESPONSIVE_CLASSES.spacing.gap}`}
            >
              {/* Header Section */}
              <div className="flex items-center justify-center px-2 sm:px-4 lg:px-0">
                <div className="w-full max-w-xl 2xl:max-w-2xl">
                  <HeaderSection />
                  <div className="hidden lg:block">
                    <NavigationButtons />
                  </div>
                  <CvButton />
                </div>
              </div>

              {/* Projects Section */}
              <div className="flex items-center justify-center px-2 sm:px-4 lg:px-0">
                <div className="w-full max-w-2xl">
                  <ProjectCarousel projects={recentProjects} onExternalLink={handleExternalLink} />
                </div>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden">
              <NavigationButtons />
            </div>

            {/* Tech Section */}
            <TechSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageContent;
