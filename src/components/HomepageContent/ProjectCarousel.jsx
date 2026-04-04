'use client';

import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

// ============================================================================
// CONSTANTS & HELPERS
// ============================================================================

const CAROUSEL_CONFIG = {
  autoScrollInterval: 4000,
  swipeThreshold: 50,
  transitionDuration: 500,
};

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

const getTagColor = (tag) => TAG_COLORS[tag] || 'bg-gray-500';

const trimText = (text, max = 100) =>
  !text || text.length <= max ? text || '' : text.substring(0, max).trim() + '...';

// ============================================================================
// CUSTOM HOOK
// ============================================================================

const useCarousel = (itemCount) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isPausedRef = useRef(false);
  const isTransitioning = useRef(false);
  const timeoutRef = useRef(null);
  const touchStartX = useRef(null);

  const transition = useCallback((nextIndex) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setActiveIndex(nextIndex);

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isTransitioning.current = false;
    }, CAROUSEL_CONFIG.transitionDuration);
  }, []);

  const goToPrevious = useCallback(
    () => transition((activeIndex - 1 + itemCount) % itemCount),
    [activeIndex, itemCount, transition],
  );

  const goToNext = useCallback(
    () => transition((activeIndex + 1) % itemCount),
    [activeIndex, itemCount, transition],
  );

  const goToSlide = useCallback(
    (i) => {
      if (i !== activeIndex) transition(i);
    },
    [activeIndex, transition],
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

  const pause = useCallback(() => {
    isPausedRef.current = true;
  }, []);

  const resume = useCallback(() => {
    isPausedRef.current = false;
  }, []);

  useEffect(() => {
    if (itemCount <= 1) return;
    const iv = setInterval(() => {
      if (!isPausedRef.current && !isTransitioning.current) {
        transition((activeIndex + 1) % itemCount);
      }
    }, CAROUSEL_CONFIG.autoScrollInterval);

    return () => clearInterval(iv);
  }, [activeIndex, itemCount, transition]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return {
    activeIndex,
    goToSlide,
    handleTouchStart,
    handleTouchEnd,
    pause,
    resume,
  };
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const ProjectTag = memo(({ tag }) => (
  <span
    className="inline-flex max-w-full shrink-0 items-center gap-1 rounded-full px-2 py-0.5
      text-[9px] font-medium text-white sm:gap-1.5 sm:text-[10px] md:px-2.5 md:py-1 md:text-[11px]
      lg:gap-0.5 lg:px-1 lg:py-0.5 lg:text-[8px] xl:gap-1.5 xl:px-1.5 xl:text-[10px] 2xl:gap-2
      2xl:px-2.5 2xl:py-1 2xl:text-xs 3xl:gap-1.5 3xl:px-3 3xl:py-1.5 3xl:text-sm"
  >
    <span
      className={`h-1.5 w-1.5 shrink-0 rounded-full md:h-2 md:w-2 lg:h-1 lg:w-1 xl:h-1.5 xl:w-1.5
        2xl:h-2 2xl:w-2 3xl:h-2.5 3xl:w-2.5 ${getTagColor(tag)}`}
    />
    <span className="truncate">{tag}</span>
  </span>
));
ProjectTag.displayName = 'ProjectTag';

const OverlayActionBtn = memo(({ onClick, label, isAccent }) => (
  <button
    onClick={onClick}
    className={`flex h-7 min-w-0 flex-1 cursor-pointer items-center justify-center rounded
      text-[10px] font-medium transition-all duration-200 hover:scale-[1.03] active:scale-95 sm:h-8
      sm:text-[11px] md:h-9 md:text-xs lg:h-6 lg:text-[9px] xl:h-8 xl:text-xs 2xl:h-10 2xl:text-sm
      3xl:h-12 3xl:text-lg ${
        isAccent
          ? 'bg-accent text-slate-900 hover:opacity-90'
          : 'bg-slate-700 text-white hover:bg-slate-600'
      }`}
  >
    <span className="truncate px-1">{label}</span>
  </button>
));
OverlayActionBtn.displayName = 'OverlayActionBtn';

const ProjectOverlay = memo(({ project, onExternalLink }) => {
  const displayedTags = project.tags?.slice(0, 4) || [];
  const remainingCount = Math.max(0, (project.tags?.length ?? 0) - 4);
  const demoUrl = project.demo?.slice('https://'.length) || 'PROJET';

  const handleSourceClick = useCallback(
    (e) => onExternalLink(e, project.source),
    [onExternalLink, project.source],
  );

  const handleDemoClick = useCallback(
    (e) => onExternalLink(e, project.demo),
    [onExternalLink, project.demo],
  );

  return (
    <div
      className="absolute inset-2 flex flex-col justify-end overflow-hidden rounded-lg sm:inset-2.5
        md:inset-3 lg:inset-2 xl:inset-3 2xl:inset-2.5 3xl:inset-2"
    >
      <div
        className="w-full translate-y-full rounded-lg bg-slate-900/95 opacity-0 transition-all
          duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100
          will-change-transform antialiased"
      >
        <div className="flex w-full flex-col p-2.5 sm:p-3 md:p-4 lg:p-2 xl:p-3 2xl:p-4 3xl:p-6">
          <span
            className="mb-1 block max-w-full truncate text-[10px] font-semibold tracking-wider
              text-accent sm:text-[11px] md:mb-1.5 md:text-xs lg:mb-0.5 lg:text-[9px] xl:mb-1
              xl:text-xs 2xl:text-sm 3xl:text-base 3xl:font-bold"
          >
            {demoUrl}
          </span>
          <h4
            className="mb-1.5 max-w-full truncate text-sm font-bold text-white sm:text-base md:mb-2
              md:text-lg lg:mb-0.5 lg:text-[11px] xl:mb-1.5 xl:text-sm 2xl:mb-2 2xl:text-lg
              3xl:text-xl 3xl:font-extrabold"
          >
            {project.title}
          </h4>
          <p
            className="mb-2 w-full wrap-break-word line-clamp-2 text-[10px] leading-snug
              text-slate-200 sm:text-[11px] md:mb-2.5 md:line-clamp-3 md:text-xs md:leading-relaxed
              lg:mb-1 lg:text-[9px] lg:leading-tight xl:mb-2 xl:line-clamp-3 xl:text-xs 2xl:mb-2.5
              2xl:text-sm 2xl:leading-relaxed 3xl:mb-3 3xl:text-base"
          >
            {trimText(project.desc)}
          </p>
          <div
            className="mb-2 flex w-full flex-wrap gap-1 sm:gap-1.5 md:mb-2.5 md:gap-1.5 lg:mb-1
              lg:gap-0.5 xl:mb-2 xl:gap-1 2xl:mb-2.5 2xl:gap-1.5 3xl:mb-3"
          >
            {displayedTags.map((tag) => (
              <ProjectTag key={tag} tag={tag} />
            ))}
            {remainingCount > 0 && (
              <span
                className="shrink-0 text-[10px] text-white sm:text-[11px] md:text-xs lg:text-[8px]
                  xl:text-xs 2xl:text-sm"
              >
                +{remainingCount}
              </span>
            )}
          </div>
          <div className="flex w-full gap-2 md:gap-2.5 lg:gap-1 xl:gap-2 2xl:gap-2.5 3xl:gap-3">
            <OverlayActionBtn onClick={handleSourceClick} label="Code" isAccent={false} />
            <OverlayActionBtn onClick={handleDemoClick} label="Demo" isAccent={true} />
          </div>
        </div>
      </div>
    </div>
  );
});
ProjectOverlay.displayName = 'ProjectOverlay';

const ProjectCard = memo(({ project, onExternalLink, isFeatured, isActive, featuredLabel }) => (
  <div className="h-full w-full shrink-0">
    <Link href="/projects" className="block h-full w-full">
      <div
        className="group flex h-full w-full flex-col overflow-hidden rounded-xl bg-slate-800/30 p-3
          transition-all duration-300 sm:p-4 lg:rounded-lg lg:p-3"
      >
        <div className="flex w-full min-w-0 flex-1 flex-col">
          <div className="relative mb-2 w-full flex-1 overflow-hidden rounded-lg">
            <Image
              src={project.img || '/placeholder.jpg'}
              alt={project.title}
              fill
              loading={isFeatured ? 'eager' : 'lazy'}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-lg object-cover transition-transform duration-300
                group-hover:scale-105"
            />
            {isFeatured && (
              <span
                className={`absolute right-2 top-2 z-10 rounded-full bg-accent px-2 py-1 text-xs
                text-slate-900 transition-opacity duration-300 2xl:px-2.5 2xl:py-1 2xl:text-sm
                3xl:px-3 3xl:py-1.5 3xl:font-bold
                ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
              >
                {featuredLabel}
              </span>
            )}
            <ProjectOverlay project={project} onExternalLink={onExternalLink} />
          </div>
          <h3
            className="w-full truncate pt-3 text-center text-sm font-bold sm:text-base lg:pt-2
              lg:text-sm xl:text-base 2xl:text-xl 3xl:text-2xl 3xl:font-extrabold"
          >
            {project.title}
          </h3>
        </div>
      </div>
    </Link>
  </div>
));
ProjectCard.displayName = 'ProjectCard';

const ThumbnailButton = memo(({ project, isActive, onSelect, index, seeLabel }) => {
  const handleClick = useCallback(() => onSelect(index), [onSelect, index]);

  return (
    <button
      onClick={handleClick}
      className={`group relative flex-1 overflow-hidden rounded-lg transition-all duration-300 ${
        isActive
          ? 'ring-2 ring-accent shadow-lg shadow-accent/20'
          : 'opacity-50 ring-1 ring-slate-700 hover:opacity-80'
        }`}
      aria-label={`${seeLabel} ${project.title}`}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={project.img || '/placeholder.jpg'}
          alt={project.title}
          fill
          sizes="20vw"
          className={`object-cover transition-transform duration-500
            ${isActive ? 'scale-105' : 'group-hover:scale-105'}`}
        />
        {!isActive && (
          <div
            className="absolute inset-0 bg-slate-900/40 transition-opacity duration-300
              group-hover:bg-slate-900/20"
          />
        )}
      </div>
      <div
        className={`truncate px-1.5 py-1 text-center text-[8px] font-medium leading-tight
          transition-colors duration-300 lg:text-[7px] xl:text-[8px] 2xl:text-[10px] 3xl:text-xs
          ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}
      >
        {project.title}
      </div>
    </button>
  );
});
ThumbnailButton.displayName = 'ThumbnailButton';

const CarouselThumbnailStrip = memo(({ projects, activeIndex, onSelect, seeLabel }) => (
  <div className="flex w-full gap-2 lg:w-3/4 lg:gap-1.5 xl:gap-2 2xl:w-4/5 2xl:gap-2.5 3xl:gap-3">
    {projects.map((project, i) => (
      <ThumbnailButton
        key={project.id}
        project={project}
        isActive={activeIndex === i}
        onSelect={onSelect}
        index={i}
        seeLabel={seeLabel}
      />
    ))}
  </div>
));
CarouselThumbnailStrip.displayName = 'CarouselThumbnailStrip';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const ProjectCarousel = ({ carouselProjects, onExternalLink }) => {
  const t = useTranslations('homepage');
  const itemCount = carouselProjects?.length || 0;
  const c = useCarousel(itemCount);

  if (itemCount === 0) return null;

  const trackStyle = {
    transform: `translate3d(-${c.activeIndex * 100}%, 0, 0)`,
  };

  return (
    <div
      className="item-animate flex w-full min-w-0 flex-col items-center lg:items-end
        2xl:items-center"
    >
      <div
        className="mb-3 flex w-full justify-center sm:mb-4 lg:w-3/4 xl:mb-3 2xl:mb-4 2xl:w-4/5
          3xl:mb-6"
      >
        <h2
          className="text-center text-base font-bold text-white sm:text-lg lg:text-sm xl:text-base
            2xl:text-xl 3xl:text-2xl"
        >
          {t('recentProjects')}
        </h2>
      </div>

      <div
        className="mx-auto mb-4 w-full max-w-xs shrink-0 rounded-xl border border-slate-700
          transition-colors duration-300 hover:border-slate-600 sm:max-w-sm md:max-w-md lg:mx-0
          lg:w-3/4 lg:max-w-none lg:rounded-lg 2xl:mb-6 2xl:w-4/5 3xl:mb-8"
      >
        <div
          className="relative aspect-square w-full overflow-hidden rounded-xl lg:rounded-lg"
          onMouseEnter={c.pause}
          onMouseLeave={c.resume}
          onTouchStart={c.handleTouchStart}
          onTouchEnd={c.handleTouchEnd}
        >
          <div
            className="flex h-full w-full transition-transform duration-500 ease-in-out"
            style={trackStyle}
          >
            {carouselProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                onExternalLink={onExternalLink}
                isFeatured={idx === 0}
                isActive={c.activeIndex === idx}
                featuredLabel={t('featured')}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mb-2 flex w-full justify-center lg:justify-end 2xl:justify-center">
        <CarouselThumbnailStrip
          projects={carouselProjects}
          activeIndex={c.activeIndex}
          onSelect={c.goToSlide}
          seeLabel={t('carousel.see')}
        />
      </div>
    </div>
  );
};

export default ProjectCarousel;
