'use client';

import { useState, useEffect, useRef, useCallback, memo, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Download,
  Code2,
  Globe,
  Layers,
  Sparkles,
  MapPin,
  FolderOpen,
  User,
  Mail,
} from 'lucide-react';
import { projects } from '@/app/projects/projects';
import { LogoCarousel } from '../ui/logo-carousel';

// ============================================================================
// CONSTANTS & HELPERS
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

const NAV_LINKS = [
  { href: '/projects', label: 'Projets', icon: FolderOpen },
  { href: '/about', label: 'Profil', icon: User },
  { href: '/contact', label: 'Contact', icon: Mail },
];

const SKILL_PILLS = [
  { icon: Code2, label: 'Full Stack' },
  { icon: Globe, label: 'Web & Mobile' },
  { icon: Layers, label: 'UI / UX' },
  { icon: Sparkles, label: 'React · Next.js · Vue.js' },
];

const getTagColor = (tag) => TAG_COLORS[tag] || 'bg-gray-500';
const trimText = (text, max = 100) =>
  !text || text.length <= max ? text || '' : text.substring(0, max).trim() + '...';

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

const useCarousel = (itemCount) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isPausedRef = useRef(false);
  const isTransitioning = useRef(false);
  const timeoutRef = useRef(null);

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

  const touchStartX = useRef(null);
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const handleTouchEnd = useCallback(
    (e) => {
      if (!touchStartX.current) return;
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > CAROUSEL_CONFIG.swipeThreshold) diff > 0 ? goToNext() : goToPrevious();
      touchStartX.current = null;
    },
    [goToNext, goToPrevious],
  );

  useEffect(() => {
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
    goToPrevious,
    goToNext,
    goToSlide,
    handleTouchStart,
    handleTouchEnd,
    pause: () => { isPausedRef.current = true; },
    resume: () => { isPausedRef.current = false; },
  };
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const TopPageDecoration = ({ filename }) => (
  <div
    className="flex h-12 w-full shrink-0 items-center bg-linear-to-r from-slate-800/50
      to-slate-900/15 px-4 sm:px-6"
  >
    <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
      <span className="h-3 w-3 shrink-0 rounded-full bg-red-500/80" />
      <span className="h-3 w-3 shrink-0 rounded-full bg-yellow-500/80" />
      <span className="h-3 w-3 shrink-0 rounded-full bg-green-500/80" />
      <span className="ml-4 truncate tracking-wide text-slate-500">
        {'// '}
        {filename}
      </span>
    </div>
  </div>
);

const ProjectTag = ({ tag }) => (
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
);

const OverlayActionBtn = ({ onClick, label, isAccent }) => (
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
);

const ProjectOverlay = ({ project, onExternalLink }) => {
  const displayedTags = project.tags?.slice(0, 4) || [];
  const remainingCount = Math.max(0, (project.tags?.length ?? 0) - 4);
  const demoUrl = project.demo?.slice('https://'.length) || 'PROJET';

  return (
    <div
      className="absolute inset-2 flex flex-col justify-end overflow-hidden rounded-lg sm:inset-2.5
        md:inset-3 lg:inset-2 xl:inset-3 2xl:inset-2.5 3xl:inset-2"
    >
      <div
        className="w-full translate-y-full rounded-lg bg-slate-900/95 opacity-0 backdrop-blur-md
          transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100"
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
            <OverlayActionBtn
              onClick={(e) => onExternalLink(e, project.source)}
              label="Code"
              isAccent={false}
            />
            <OverlayActionBtn
              onClick={(e) => onExternalLink(e, project.demo)}
              label="Demo"
              isAccent={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = memo(({ project, onExternalLink, isFeatured, isActive }) => (
  <div className="h-full w-full shrink-0">
    <Link href="/projects" className="block h-full w-full">
      <div
        className="group flex h-full w-full flex-col overflow-hidden rounded-xl bg-slate-800/30 p-3
          backdrop-blur transition-all duration-300 sm:p-4 lg:rounded-lg lg:p-3"
      >
        <div className="flex w-full min-w-0 flex-1 flex-col">
          <div className="relative mb-2 w-full flex-1 overflow-hidden rounded-lg">
            <Image
              src={project.img || '/placeholder.jpg'}
              alt={project.title}
              fill
              loading="lazy"
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
                En Vedette
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

const CarouselThumbnailStrip = ({ projects: carouselProjects, activeIndex, onSelect }) => (
  <div className="flex w-full gap-2 lg:w-3/4 lg:gap-1.5 xl:gap-2 2xl:w-4/5 2xl:gap-2.5 3xl:gap-3">
    {carouselProjects.map((project, i) => {
      const isActive = activeIndex === i;
      return (
        <button
          key={project.id}
          onClick={() => onSelect(i)}
          className={`group relative flex-1 overflow-hidden rounded-lg transition-all duration-300
          ${
            isActive
              ? 'ring-2 ring-accent shadow-lg shadow-accent/20'
              : 'opacity-50 ring-1 ring-slate-700 hover:opacity-80'
          }`}
          aria-label={`Voir ${project.title}`}
        >
          <div className="relative w-full overflow-hidden aspect-video">
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
    })}
  </div>
);

const ProjectCarousel = ({ carouselProjects, onExternalLink }) => {
  const c = useCarousel(carouselProjects.length);

  const trackStyle = {
    transform: `translate3d(-${c.activeIndex * 100}%, 0, 0)`,
    backfaceVisibility: 'hidden',
    transformStyle: 'preserve-3d',
  };

  return (
    // ✅ item-animate sur le bloc carousel entier
    <div className="item-animate flex w-full min-w-0 flex-col items-center lg:items-end 2xl:items-center">
      <div
        className="mb-3 flex w-full justify-center sm:mb-4 lg:w-3/4 xl:mb-3 2xl:mb-4 2xl:w-4/5
          3xl:mb-6"
      >
        <h2
          className="text-center text-base font-bold text-white sm:text-lg lg:text-sm xl:text-base
            2xl:text-xl 3xl:text-2xl"
        >
          Projets récents
        </h2>
      </div>

      <div
        className="mx-auto mb-4 w-full max-w-xs shrink-0 rounded-xl border border-slate-700
          transition-colors duration-300 hover:border-slate-600 sm:max-w-sm md:max-w-md lg:mx-0
          lg:w-3/4 lg:max-w-none lg:rounded-lg 2xl:mb-6 2xl:w-4/5 3xl:mb-8"
      >
        <div
          className="relative w-full overflow-hidden rounded-xl aspect-square lg:rounded-lg"
          onMouseEnter={c.pause}
          onMouseLeave={c.resume}
          onTouchStart={c.handleTouchStart}
          onTouchEnd={c.handleTouchEnd}
        >
          <div
            className="flex h-full w-full transition-transform duration-500 ease-in-out
              will-change-transform"
            style={trackStyle}
          >
            {carouselProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                onExternalLink={onExternalLink}
                isFeatured={idx === 0}
                isActive={c.activeIndex === idx}
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
        />
      </div>
    </div>
  );
};

const NavCard = ({ href, label, icon: Icon }) => (
  <Link
    href={href}
    className="group relative flex flex-1 flex-col items-center justify-center overflow-hidden
      rounded-lg bg-slate-800/30 opacity-50 ring-1 ring-slate-700 transition-all duration-300
      aspect-4/3 hover:opacity-100 hover:shadow-lg hover:shadow-accent/20 hover:ring-2
      hover:ring-accent active:scale-95"
  >
    <Icon
      className="mb-1.5 h-7 w-7 text-slate-400 transition-all duration-500 group-hover:scale-110
        group-hover:text-accent sm:h-8 sm:w-8 lg:h-7 lg:w-7 xl:mb-2 xl:h-9 xl:w-9 2xl:mb-2.5
        2xl:h-11 2xl:w-11 3xl:h-14 3xl:w-14"
    />
    <span
      className="w-full truncate px-1 text-center text-[10px] font-medium leading-tight
        text-slate-400 transition-colors duration-300 group-hover:text-white sm:text-xs
        lg:text-[10px] xl:text-xs 2xl:text-sm 3xl:text-base"
    >
      {label}
    </span>
  </Link>
);

const CvButton = () => (
  <div className="item-animate mt-4 flex w-full items-center justify-center gap-3 lg:mt-4 2xl:mt-6">
    <span className="h-px flex-1 bg-linear-to-r from-transparent to-slate-600/60" />
    <a
      href="/CV.pdf"
      download="Ruddy_Autem_CV.pdf"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-2 text-xs text-accent transition-colors
        duration-300 xl:text-sm 2xl:text-base 3xl:text-lg"
    >
      <span
        className="absolute -bottom-0.5 left-1/2 h-px w-0 bg-accent transition-all duration-300
          group-hover:w-1/2"
      />
      <span
        className="absolute -bottom-0.5 right-1/2 h-px w-0 bg-accent transition-all duration-300
          group-hover:w-1/2"
      />
      <Download
        className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 xl:h-4 xl:w-4 2xl:h-5
          2xl:w-5"
      />
      <span className="tracking-wide">Télécharger CV</span>
    </a>
    <span className="h-px flex-1 bg-linear-to-l from-transparent to-slate-600/60" />
  </div>
);

const HeroSection = () => (
  <div className="w-full pt-3 text-center lg:pt-0">
    {/* Badge + Nom + Titre : 3 éléments qui s'enchaînent */}
    <div className="mb-2 flex w-full flex-col items-center lg:mb-2 xl:mb-4 2xl:mb-6">
      <div
        className="item-animate mb-2 inline-block max-w-full truncate rounded-full
          bg-slate-700/50 px-2 py-1 font-mono text-[10px] text-accent lg:px-3 lg:text-xs
          xl:text-sm 2xl:px-4 2xl:py-2 2xl:text-base 3xl:px-6 3xl:py-3 3xl:text-xl"
      >
        AUTEM.DEV
      </div>
      <h1
        className="item-animate mb-2 w-full truncate text-2xl font-bold tracking-tight
          lg:mb-1 2xl:mb-2 sm:text-3xl lg:text-lg xl:text-2xl 2xl:text-4xl 3xl:text-6xl"
      >
        Ruddy <span className="text-accent">Autem</span>
      </h1>
      <p
        className="item-animate mb-3 w-full truncate text-base text-slate-300 lg:mb-2 2xl:mb-3
          sm:text-lg lg:text-sm xl:text-lg 2xl:text-2xl 3xl:text-4xl"
      >
        Développeur Web Full Stack
      </p>
    </div>

    <p
      className="item-animate mx-auto mb-4 w-full max-w-md wrap-break-word text-xs text-slate-300
        lg:mb-3 lg:max-w-xs xl:max-w-md 2xl:mb-5 2xl:max-w-2xl 2xl:leading-relaxed sm:text-sm
        lg:text-xs xl:text-base 2xl:text-lg 3xl:max-w-3xl 3xl:text-2xl"
    >
      Je conçois et développe des applications web modernes, en alliant performance, simplicité et
      expérience utilisateur
    </p>

    <div
      className="item-animate mb-4 flex flex-wrap justify-center gap-2 lg:mb-3 lg:gap-1.5
        xl:gap-2 2xl:mb-5 2xl:gap-2.5"
    >
      {SKILL_PILLS.map(({ icon: Icon, label }) => (
        <span
          key={label}
          className="group flex cursor-default items-center gap-1.5 rounded-lg border
            border-slate-600/70 bg-slate-800/20 px-3 py-1.5 text-xs font-medium text-slate-300
            transition-all duration-300 hover:border-slate-500 hover:bg-slate-700/40
            hover:text-white lg:px-2 lg:py-1 lg:text-[9px] xl:px-3 xl:py-1.5 xl:text-[11px]
            2xl:px-3.5 2xl:py-1.5 2xl:text-xs 3xl:px-5 3xl:py-2 3xl:text-sm"
        >
          <Icon
            className="h-3.5 w-3.5 shrink-0 text-accent transition-transform duration-300
              group-hover:scale-110 lg:h-3 lg:w-3 xl:h-3.5 xl:w-3.5 2xl:h-4 2xl:w-4 3xl:h-5 3xl:w-5"
          />
          {label}
        </span>
      ))}
    </div>

    <div className="item-animate mb-4 flex justify-center lg:mb-3 2xl:mb-5">
      <span
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 lg:text-[10px]
          xl:text-xs 2xl:text-sm 3xl:text-base"
      >
        <MapPin
          className="h-3.5 w-3.5 shrink-0 text-slate-400 lg:h-3 lg:w-3 xl:h-3.5 xl:w-3.5
            2xl:h-4 2xl:w-4"
        />
        France · Remote
      </span>
    </div>

    <div className="item-animate grid w-full grid-cols-3 gap-2 xl:gap-2.5 2xl:gap-3 3xl:gap-4">
      {NAV_LINKS.map((link) => (
        <NavCard key={link.href} {...link} />
      ))}
    </div>

    <CvButton />
  </div>
);

const TechSection = () => (
  // ✅ item-animate sur la section technologies
  <div
    className="item-animate mt-3 flex w-full max-w-full flex-col items-center overflow-hidden
      border-t border-slate-700/50 pt-2 lg:mt-2 lg:pt-1.5 xl:mt-3 xl:pt-2 2xl:mt-4 2xl:pt-2.5"
  >
    <h3
      className="mb-1 w-full truncate text-center font-mono text-[10px] tracking-widest
        text-slate-500 lg:text-[9px] xl:text-[10px] 2xl:mb-2 2xl:text-xs 3xl:mb-3 3xl:text-sm"
    >
      TECHNOLOGIES
    </h3>
    <div
      className="relative w-full max-w-full overflow-hidden [&_div]:py-1 lg:[&_div]:py-0.5
        xl:[&_div]:py-1 2xl:[&_div]:py-1.5"
    >
      <LogoCarousel />
    </div>
  </div>
);

// ============================================================================
// MAIN LAYOUT
// ============================================================================

const HomepageContent = () => {
  const carouselProjects = useMemo(() => projects.slice(1, 4), []);

  const handleExternalLink = useCallback((e, url) => {
    e.stopPropagation();
    e.preventDefault();
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <div
      className="box-border flex h-auto min-h-screen w-full flex-col items-center justify-start
        overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:h-full lg:min-h-0 lg:justify-center
        lg:overflow-hidden lg:p-6 2xl:p-10 3xl:p-16"
    >
      <div
        className="relative z-10 w-full max-w-2xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-6xl
          3xl:max-w-450"
      >
        {/* ✅ item-animate sur le panneau principal — premier élément animé */}
        <div
          className="item-animate flex h-auto w-full max-w-full flex-col overflow-hidden
            shadow-2xl rounded-2xl border border-slate-700/50 bg-slate-800/20 backdrop-blur-xl
            sm:rounded-3xl lg:h-full lg:max-h-[85vh] lg:overflow-y-hidden 2xl:max-h-[90vh]
            3xl:max-h-[90vh]"
        >
          <TopPageDecoration filename="accueil.jsx" />

          <div
            className="flex w-full flex-col justify-start p-4 sm:p-6 md:p-8 lg:flex-1
              lg:justify-between lg:overflow-y-hidden lg:px-6 lg:py-3 xl:p-6 2xl:p-8 2xl:pb-6
              3xl:p-12 3xl:pb-10"
          >
            <div
              className="flex w-full min-w-0 flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-center
                lg:gap-2 xl:gap-8 2xl:gap-12 3xl:gap-16"
            >
              <div className="flex w-full min-w-0 items-center justify-center px-2 sm:px-4 lg:px-0">
                <div className="w-full min-w-0 max-w-xl 2xl:max-w-2xl">
                  <HeroSection />
                </div>
              </div>

              <div className="flex w-full min-w-0 items-center justify-center px-2 sm:px-4 lg:px-0">
                <div className="w-full min-w-0 max-w-2xl">
                  <ProjectCarousel
                    carouselProjects={carouselProjects}
                    onExternalLink={handleExternalLink}
                  />
                </div>
              </div>
            </div>

            <TechSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageContent;