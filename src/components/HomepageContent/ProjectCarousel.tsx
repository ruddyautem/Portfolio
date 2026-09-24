// src/components/HomepageContent/ProjectCarousel.jsx
'use client';

import { memo, useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { TAG_COLORS_CAROUSEL } from '@/lib/constants';
import type { Project } from '@/app/[locale]/projects/projects';
import type { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';

const AUTO_SCROLL_MS = 5000;

const CAROUSEL_OPTIONS: EmblaOptionsType = {
  loop: true,
  align: 'center',
  slidesToScroll: 1,
  skipSnaps: false,
  watchDrag: (_emblaApi: EmblaCarouselType, _event: MouseEvent | TouchEvent) => {
    // Only allow mouse drag on desktop (pointerType !== 'touch' or window.innerWidth >= 1280)
    // Disables finger swiping on mobile/tablet so it doesn't conflict with side page navigation
    if (typeof window !== 'undefined' && window.innerWidth < 1280) {
      return false;
    }
    return true;
  },
};

const getTagColor = (tag: string) => (TAG_COLORS_CAROUSEL as Record<string, string>)[tag] ?? 'bg-gray-500';

interface ProjectTagProps {
  tag: string;
}

const ProjectTag = memo(({ tag }: ProjectTagProps) => (
  <span
    className="inline-flex h-5 items-center gap-1 rounded-md bg-slate-800 px-1.5 text-xs font-medium
      leading-none text-slate-400 2xl:h-6 2xl:px-2.5 2xl:text-xs 3xl:h-7 3xl:px-2.5 3xl:text-sm"
  >
    <span className={`block h-1.5 w-1.5 shrink-0 rounded-full ${getTagColor(tag)}`} />
    <span className="block leading-none">{tag}</span>
  </span>
));
ProjectTag.displayName = 'ProjectTag';

interface ProjectCardProps {
  project: Project;
  onExternalLink: (event: React.MouseEvent, url?: string) => void;
  t: (key: string) => string;
  isFirst?: boolean;
}

const ProjectCard = memo(({ project, onExternalLink, t, isFirst }: ProjectCardProps) => {
  const tags = project.tags ?? [];

  return (
    <div className="flex h-full flex-col">
      <div className="w-full shrink-0 overflow-hidden rounded-t-xl">
        <Link href="/projects" className="relative block aspect-video w-full">
          <Image
            src={project.img || '/placeholder.jpg'}
            alt={project.title}
            fill
            priority={isFirst}
            sizes="(max-width: 768px) 80vw, 40vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      </div>

      <div
        className="flex min-h-0 flex-1 flex-col gap-2 p-2.5 text-center sm:gap-2.5 sm:p-3 2xl:gap-3.5 2xl:p-5 3xl:gap-4 3xl:p-6"
      >
        <Link
          href="/projects"
          className="truncate text-sm font-bold text-white transition-colors hover:text-accent
            sm:text-base 2xl:text-lg 3xl:text-xl"
        >
          {project.title}
        </Link>

        <p
          className="line-clamp-2 text-xs leading-relaxed text-slate-300 sm:text-xs 2xl:text-sm
            3xl:text-base"
        >
          {project.shortDesc || project.desc}
        </p>

        <div className="flex flex-wrap justify-center gap-1.5 2xl:gap-2 3xl:gap-2">
          {tags.map((tag: string) => (
            <ProjectTag key={tag} tag={tag} />
          ))}
        </div>

        <div className="mt-auto flex gap-2 pt-1 2xl:gap-2.5 2xl:pt-2 3xl:gap-3 3xl:pt-2">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onExternalLink(event, project.source);
            }}
            className="flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-md
              border border-slate-700 py-1.5 text-xs font-medium text-slate-300 transition-colors
              hover:border-slate-500 hover:text-white sm:text-[11px] 2xl:py-2.5 2xl:text-xs
              3xl:py-3 3xl:text-sm"
          >
            {t('carousel.codeSource')}
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onExternalLink(event, project.demo);
            }}
            className="flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-md
              bg-accent py-1.5 text-xs font-medium text-slate-900 transition-opacity
              hover:opacity-90 sm:text-[11px] 2xl:py-2.5 2xl:text-xs 3xl:py-3 3xl:text-sm"
          >
            {t('carousel.liveDemo')}
            <Globe className="h-3 w-3 2xl:h-4 2xl:w-4 3xl:h-4 3xl:w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});
ProjectCard.displayName = 'ProjectCard';

interface CarouselProgressProps {
  api: EmblaCarouselType | null;
  current: number;
  projects: Project[];
  isPaused: boolean;
}

const CarouselProgress = memo(({ api, current, projects, isPaused }: CarouselProgressProps) => {
  const t = useTranslations('homepage.carousel');
  const count = projects.length;
  const [progress, setProgress] = useState(0);
  const elapsedRef = useRef(0);
  const lastFrameRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const waitingForSelectionRef = useRef(false);

  const resetTimer = useCallback(() => {
    elapsedRef.current = 0;
    lastFrameRef.current = null;
    waitingForSelectionRef.current = false;
    setProgress(0);
  }, []);

  useEffect(() => {
    // Fix: Execute asynchronously to avoid the synchronous setState linter error
    const timer = setTimeout(() => {
      resetTimer();
    }, 0);
    
    return () => clearTimeout(timer);
  }, [api, current, resetTimer]);

  useEffect(() => {
    if (!api) return undefined;
    api.on('pointerDown', resetTimer);
    return () => {
      api.off('pointerDown', resetTimer);
    };
  }, [api, resetTimer]);

  useEffect(() => {
    if (!api || count <= 1 || isPaused) {
      lastFrameRef.current = null;
      return undefined;
    }

    const updateProgress = (timestamp) => {
      if (document.hidden) {
        lastFrameRef.current = null;
        animationFrameRef.current = window.requestAnimationFrame(updateProgress);
        return;
      }

      if (waitingForSelectionRef.current) {
        lastFrameRef.current = timestamp;
        animationFrameRef.current = window.requestAnimationFrame(updateProgress);
        return;
      }

      if (lastFrameRef.current === null) {
        lastFrameRef.current = timestamp;
      } else {
        const frameTime = Math.min(timestamp - lastFrameRef.current, 100);
        lastFrameRef.current = timestamp;
        elapsedRef.current += frameTime;

        const nextProgress = Math.min(elapsedRef.current / AUTO_SCROLL_MS, 1);
        setProgress(nextProgress);

        if (nextProgress >= 1) {
          waitingForSelectionRef.current = true;
          api.scrollNext();
        }
      }

      animationFrameRef.current = window.requestAnimationFrame(updateProgress);
    };

    animationFrameRef.current = window.requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = null;
      lastFrameRef.current = null;
    };
  }, [api, count, isPaused]);

  return (
    <div
      className="mt-3.5 flex items-center justify-center gap-2"
      aria-label={t('progress')}
    >
      {projects.map((project, index) => {
        const isActive = index === current;
        const formattedNum = String(index + 1).padStart(2, '0');

        return (
          <button
            key={project.id}
            type="button"
            onClick={() => {
              resetTimer();
              api?.scrollTo(index);
            }}
            aria-label={t("goTo", { title: project.title })}
            className={cn(
              `relative flex h-6 items-center justify-center rounded-full font-mono text-[11px]
              font-medium transition-all duration-300 cursor-pointer overflow-hidden border`,
              isActive
                ? 'w-10 border-accent/60 bg-slate-800 text-accent font-bold'
                : `w-7 border-slate-700/60 bg-slate-800/40 text-slate-500 hover:bg-slate-800
                hover:text-slate-300`,
            )}
          >
            {isActive && (
              <span
                className="absolute inset-0 bg-accent/15 origin-left"
                style={{ transform: `scaleX(${progress})` }}
              />
            )}
            <span className="relative z-10">{formattedNum}</span>
          </button>
        );
      })}
    </div>
  );
});
CarouselProgress.displayName = 'CarouselProgress';

const ProjectCarousel = ({ carouselProjects, onExternalLink }: { carouselProjects: Project[]; onExternalLink: ProjectCardProps['onExternalLink'] }) => {
  const t = useTranslations('homepage');
  const count = carouselProjects?.length ?? 0;

  const [api, setApi] = useState<EmblaCarouselType | null>(null);
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);

  const isPaused = isHovered || hasFocus;

  useEffect(() => {
    if (!api) return undefined;

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', updateCurrent);
    api.on('reInit', updateCurrent);

    return () => {
      api.off('select', updateCurrent);
      api.off('reInit', updateCurrent);
    };
  }, [api]);

  if (count === 0) return null;

  return (
    <div
      className="item-animate flex w-full min-w-0 flex-col"
      role="region"
      aria-roledescription="carousel"
      aria-label={t('recentProjects')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setHasFocus(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setHasFocus(false);
        }
      }}
    >
      <div className="mb-2.5 flex items-baseline justify-center gap-1.5 2xl:mb-4 3xl:mb-6">
        <h2 className="text-sm font-bold text-white sm:text-base 2xl:text-lg 3xl:text-xl">
          {t('recentProjects')}
        </h2>
        <span className="text-[10px] text-slate-600 sm:text-[11px] 2xl:text-xs 3xl:text-sm">
          {current + 1}/{count}
        </span>
      </div>

      <Carousel className="relative w-full" opts={CAROUSEL_OPTIONS} setApi={setApi}>
        <div className="mask-x-from-90%">
          <CarouselContent className="-ml-4 sm:-ml-5">
            {carouselProjects.map((project, index) => {
              const isActive = index === current;

              return (
                <CarouselItem
                  key={project.id}
                  aria-label={t("carousel.position", { current: index + 1, total: count })}
                  className={cn(
                    'basis-[85%] pl-4 sm:basis-[72%] sm:pl-5 md:basis-[68%] 2xl:basis-[75%] 3xl:basis-[78%]',
                    'transition-opacity duration-300 ease-out',
                    isActive ? 'opacity-100' : 'pointer-events-none opacity-30',
                  )}
                >
                  <div
                    className="group relative isolate h-full overflow-hidden rounded-xl border
                      border-slate-700/50 bg-slate-800/20 transition-colors duration-300
                      hover:border-slate-600"
                  >
                    <ProjectCard project={project} onExternalLink={onExternalLink} t={t} isFirst={index === 0} />
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </div>

        {count > 1 && (
          <>
            <CarouselPrevious
              suppressHydrationWarning
              className="left-1 h-7 w-7 cursor-pointer border-none bg-slate-950/60 text-slate-300
                backdrop-blur-sm hover:bg-slate-900/90 hover:text-accent sm:left-2 sm:h-8 sm:w-8
                2xl:h-9.5 2xl:w-9.5 3xl:h-11 3xl:w-11 disabled:pointer-events-none disabled:opacity-0"
            />

            <CarouselNext
              suppressHydrationWarning
              className="right-1 h-7 w-7 cursor-pointer border-none bg-slate-950/60 text-slate-300
                backdrop-blur-sm hover:bg-slate-900/90 hover:text-accent sm:right-2 sm:h-8 sm:w-8
                2xl:h-9.5 2xl:w-9.5 3xl:h-11 3xl:w-11 disabled:pointer-events-none disabled:opacity-0"
            />
          </>
        )}
      </Carousel>

      {count > 1 && (
        <CarouselProgress
          api={api}
          current={current}
          projects={carouselProjects}
          isPaused={isPaused}
        />
      )}
    </div>
  );
};

export default ProjectCarousel;
