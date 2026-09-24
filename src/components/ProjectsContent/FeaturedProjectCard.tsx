'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Globe, Lock, CheckCircle2, Sparkles } from 'lucide-react';
import { GithubIcon } from '@/components/Icons/Icons';
import { Project } from '@/app/[locale]/projects/projects';
import { TAG_COLORS_CARD } from '@/lib/constants';

interface FeaturedProjectCardProps {
  project: Project;
  index: number;
  codeSourceText: string;
  liveDemoText: string;
  architectureTitleText: string;
}

export const FeaturedProjectCard = ({
  project,
  index,
  codeSourceText,
  liveDemoText,
  architectureTitleText,
}: FeaturedProjectCardProps) => {
  const isReversed = index % 2 === 1;

  // Luminous ambient glows tailored to each project's brand identity
  const themes: Record<
    string,
    {
      glow: string;
      borderHover: string;
      badgeStyle: string;
      accentText: string;
    }
  > = {
    Temporis: {
      glow: 'from-emerald-500/15 via-teal-500/10 to-transparent',
      borderHover: 'hover:border-teal-400/50',
      badgeStyle: 'border-teal-400/30 bg-teal-400/10 text-teal-300',
      accentText: 'text-teal-400',
    },
    DressCode: {
      glow: 'from-purple-500/15 via-fuchsia-500/10 to-transparent',
      borderHover: 'hover:border-purple-400/50',
      badgeStyle: 'border-purple-400/30 bg-purple-400/10 text-purple-300',
      accentText: 'text-purple-400',
    },
    'Style-D': {
      glow: 'from-pink-500/15 via-rose-500/10 to-transparent',
      borderHover: 'hover:border-pink-400/50',
      badgeStyle: 'border-pink-400/30 bg-pink-400/10 text-pink-300',
      accentText: 'text-pink-400',
    },
    Stokki: {
      glow: 'from-sky-500/15 via-blue-500/10 to-transparent',
      borderHover: 'hover:border-sky-400/50',
      badgeStyle: 'border-sky-400/30 bg-sky-400/10 text-sky-300',
      accentText: 'text-sky-400',
    },
    Portfolio: {
      glow: 'from-accent/20 via-accent/10 to-transparent',
      borderHover: 'hover:border-accent/60',
      badgeStyle: 'border-accent/35 bg-accent/15 text-accent',
      accentText: 'text-accent',
    },
    'OhMyBlog!': {
      glow: 'from-violet-500/15 via-purple-500/10 to-transparent',
      borderHover: 'hover:border-violet-400/50',
      badgeStyle: 'border-violet-400/30 bg-violet-400/10 text-violet-300',
      accentText: 'text-violet-400',
    },
  };

  const currentTheme = themes[project.title] || {
    glow: 'from-accent/15 via-amber-500/10 to-transparent',
    borderHover: 'hover:border-accent/50',
    badgeStyle: 'border-accent/30 bg-accent/10 text-accent',
    accentText: 'text-accent',
  };

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/20
        backdrop-blur-xl transition-all duration-300 ${currentTheme.borderHover} hover:bg-slate-800/30
        hover:shadow-2xl sm:rounded-3xl`}
    >
      {/* Ambient background glow - soft and subtle */}
      <div
        className={`pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gradient-to-br
          ${currentTheme.glow} opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-70`}
        aria-hidden="true"
      />

      <div
        className={`relative grid grid-cols-1 items-center gap-5 p-4 sm:p-7 xl:grid-cols-12 xl:gap-8 xl:p-8
          ${isReversed ? 'xl:flex-row-reverse' : ''}`}
      >
        {/* Browser Mockup Visual Frame (7 cols on xl) */}
        <div
          className={`flex flex-col justify-center xl:col-span-7 ${
            isReversed ? 'xl:order-2' : 'xl:order-1'
          }`}
        >
          <div
            className="group/browser relative flex flex-col overflow-hidden rounded-xl border
              border-slate-700/60 bg-slate-800/40 shadow-xl transition-all duration-300
              hover:border-slate-500/70 hover:shadow-2xl"
          >
            {/* Browser Header Bar */}
            <div
              className="relative flex h-8 items-center justify-between border-b border-slate-700/60
                bg-slate-800/70 px-3 backdrop-blur-md sm:px-3.5"
            >
              {/* Traffic Light Dots (Left) */}
              <div className="flex items-center gap-1.5 z-10" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
              </div>

              {/* Centered Address / Window Title Bar (Middle) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-16">
                <Link
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={-1}
                  className="pointer-events-auto flex max-w-[200px] items-center gap-1.5 truncate rounded-md border
                    border-slate-700/50 bg-slate-900/60 px-2 py-0.5 text-[10px] font-mono
                    text-slate-300 transition-colors hover:border-slate-500 hover:text-white
                    sm:max-w-xs sm:text-[11px] sm:px-2.5"
                >
                  <Lock className="h-2.5 w-2.5 shrink-0 text-emerald-400 sm:h-3 sm:w-3" />
                  <span className="truncate">{project.displayUrl || project.demo.replace('https://', '')}</span>
                </Link>
              </div>

              {/* Right Placeholder Spacer to maintain symmetry */}
              <div className="w-12" aria-hidden="true" />
            </div>

            {/* Viewport Screenshot */}
            <Link
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ouvrir la démo de ${project.title}`}
              className="relative block aspect-[16/10] w-full overflow-hidden bg-slate-800/20"
            >
              <Image
                src={project.img}
                alt={`Interface de ${project.title}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                className="object-cover object-top transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.02]"
              />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent
                  opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 px-2.5 py-1 text-xs font-semibold text-white shadow-xl backdrop-blur-md sm:bottom-3 sm:right-3 sm:px-3 sm:py-1.5">
                  <span>{liveDemoText}</span>
                  <Globe className="h-3.5 w-3.5 text-accent" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Technical Specs & Details Column (5 cols on xl) */}
        <div
          className={`flex flex-col justify-center items-center text-center gap-3 xl:items-start xl:text-left xl:col-span-5 ${
            isReversed ? 'xl:order-1' : 'xl:order-2'
          }`}
        >
          {/* Category / Badge */}
          {project.badge && (
            <div className="flex w-full justify-center xl:justify-start">
              <span
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5
                  text-[10px] sm:text-xs font-mono font-medium tracking-wide ${currentTheme.badgeStyle}`}
              >
                <Sparkles className="h-3 w-3" />
                {project.badge}
              </span>
            </div>
          )}

          {/* Project Title */}
          <div className="w-full">
            <h2 className="text-center text-xl sm:text-2xl xl:text-left xl:text-3xl font-bold tracking-tight text-white transition-colors group-hover:text-accent">
              <Link
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 hover:underline xl:justify-start"
              >
                {project.title}
                
              </Link>
            </h2>
          </div>

          {/* Description */}
          <p className="w-full max-w-xl self-center text-center text-xs sm:text-sm leading-relaxed text-slate-300 xl:self-start xl:text-left xl:text-base">
            {project.desc}
          </p>

          {/* Key Architecture Highlights Box */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="w-full rounded-xl border border-slate-700/50 bg-slate-800/35 p-3 text-center shadow-sm sm:p-3.5 xl:text-left">
              <div className="mb-2.5 flex items-center justify-center gap-1.5 border-b border-slate-700/40 pb-2 text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-accent xl:mb-2 xl:justify-start xl:border-0 xl:pb-0">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {architectureTitleText}
              </div>
              <ul className="space-y-1.5 sm:space-y-2">
                {project.highlights.map((highlight, hIdx) => (
                  <li
                    key={hIdx}
                    className="flex items-start justify-center gap-2 text-center text-xs sm:text-sm text-slate-200 leading-relaxed xl:justify-start xl:text-left"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Tags */}
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 xl:justify-start">
            {project.tags.map((tag) => {
              const tagColor = TAG_COLORS_CARD[tag as keyof typeof TAG_COLORS_CARD] || 'border-white/10 text-slate-300 bg-white/5';
              return (
                <span
                  key={tag}
                  className={`rounded-md border px-2 py-0.5 text-[10px] sm:text-xs font-medium font-mono transition-colors ${tagColor}`}
                >
                  #{tag}
                </span>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="mx-auto flex w-full max-w-md items-center justify-center gap-2.5 pt-1 sm:gap-3 xl:mx-0 xl:max-w-md xl:justify-start">
            <Link
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 sm:h-10 min-w-0 flex-1 basis-0 items-center justify-center gap-1.5 rounded-xl
                bg-accent px-3 text-xs sm:text-sm font-semibold text-slate-950 shadow-md transition-all duration-300
                hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 xl:min-w-40 xl:flex-none xl:basis-auto"
            >
              <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="truncate">{liveDemoText}</span>
            </Link>

            <Link
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 sm:h-10 min-w-0 flex-1 basis-0 items-center justify-center gap-1.5 rounded-xl border
                border-slate-700 bg-slate-800/60 px-3.5 sm:px-5 text-xs sm:text-sm font-medium text-slate-200 transition-all
                duration-300 hover:border-slate-500 hover:bg-slate-700/60 hover:text-white hover:-translate-y-0.5 xl:min-w-40 xl:flex-none xl:basis-auto"
            >
              <GithubIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="truncate">{codeSourceText}</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
