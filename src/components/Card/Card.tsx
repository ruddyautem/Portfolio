'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { TAG_COLORS_CARD } from '@/lib/constants';

const Card = ({ project, compact = false }: { project: any; compact?: boolean }) => {
  const t = useTranslations('card');

  if (compact) {
    return (
      <div
        className="item-animate group relative h-full w-full transform transition-all duration-300
          hover:-translate-y-1.5"
      >
        <div
          className="relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-700/50
            bg-slate-800/20 backdrop-blur-md transition-all duration-300 hover:border-slate-600/70
            hover:bg-slate-700/20 hover:shadow-lg"
        >
          <div className="h-1 bg-linear-to-r from-slate-600/40 via-accent/30 to-purple-500/30" />

          <Link href={project.demo} target="_blank" rel="noopener noreferrer">
            <div className="relative aspect-[16/10] w-full cursor-pointer overflow-hidden">
              <Image
                src={project.img}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-500 ease-out will-change-transform group-hover:scale-105"
              />
            </div>
          </Link>

          <div className="flex h-full flex-col p-5 sm:p-6 text-center md:text-left">
            <div className="mb-2 flex items-center justify-between gap-2">
              <h3 className="text-base font-bold text-white sm:text-lg">
                {project.title}
              </h3>
              <Link
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                title={project.demo?.replace('https://', '')}
                className="text-[11px] font-mono text-accent truncate max-w-[130px] hover:underline"
              >
                {project.demo?.replace('https://', '')}
              </Link>
            </div>

            <p className="mb-4 min-h-[2.5rem] text-xs leading-relaxed text-slate-300 sm:min-h-[2.75rem] sm:text-sm">
              {project.desc}
            </p>

            <div className="z-10 mb-4 flex min-h-[50px] flex-wrap items-start content-start justify-center gap-1.5 select-none md:justify-start">
              {project.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className={`border border-white/10 px-2 py-0.5 text-[11px] font-medium rounded-md
                    bg-white/5 ${TAG_COLORS_CARD[tag]?.split(' ')[2] || 'text-slate-300'}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="z-10 mt-auto flex justify-center gap-2 text-xs sm:text-sm">
              <Link
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 flex-1 items-center justify-center rounded-lg bg-white/5 border
                  border-white/10 font-medium text-slate-300 transition-all hover:bg-white/10
                  hover:text-white"
              >
                {t('source')}
              </Link>
              <Link
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 flex-1 items-center justify-center rounded-lg bg-accent/80
                  font-medium text-slate-900 transition-all hover:bg-accent"
              >
                {t('demo')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="item-animate group relative h-full w-full transform transition-all duration-500
        hover:-translate-y-2 hover:scale-[1.01]"
    >
    <div
      className="hover:shadow-glow relative flex h-full flex-col overflow-hidden rounded-2xl border
        border-slate-700/50 bg-slate-800/30 transition-all duration-500
        group-hover:border-slate-600/60 group-hover:bg-slate-700/20 sm:rounded-3xl"
    >
      {/* Decorative header bar */}
      <div className="from-accent/30 h-1.5 bg-linear-to-r via-blue-500/30 to-purple-500/30"></div>

      <Link href={project.demo} target="_blank" rel="noopener noreferrer">
        {/* Image Container */}
        <div className="relative aspect-video w-full cursor-pointer overflow-hidden">
          <Image
            src={project.img}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.02]"
          />
        </div>
      </Link>

      {/* Content Section */}
      <div className="flex h-full flex-col p-6 text-center sm:p-8 md:text-left">
        {/* Project URL */}
        <Link href={project.demo} className="cursor-pointer">
          <span className="text-accent mb-3 text-xs font-semibold tracking-widest uppercase">
            {project.demo?.slice('https://'.length) || 'PROJET'}
          </span>
        </Link>

        {/* Title */}
        <h2 className="mb-4 text-xl font-bold text-white transition-colors duration-300 sm:text-2xl">
          {project.title}
        </h2>

        {/* Description */}
        <p className="mb-6 grow leading-relaxed text-slate-300">{project.desc}</p>

        {/* Tags */}
        <div
          className="z-10 mb-6 flex min-h-15 flex-wrap items-start justify-center gap-2
            select-none md:justify-start"
        >
          {project.tags?.map((tag: string) => (
            <span
              key={tag}
              className={`border border-white/10 px-3 py-1.5 text-xs font-medium rounded-lg
              transition-all duration-300 ${TAG_COLORS_CARD[tag]?.split(' ')[2] || 'text-slate-300'}
              bg-white/5`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="z-10 mt-auto flex justify-center gap-3 text-sm sm:flex-row">
          <Link
            href={project.source}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-36 items-center justify-center rounded-xl bg-white/5 border
              border-white/10 font-medium text-white transition-all duration-300 hover:bg-white/10
              hover:border-white/20 hover:scale-105 md:flex-1"
          >
            {t('source')}
          </Link>
          <Link
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent/90 flex h-10 w-36 items-center justify-center rounded-xl
              font-medium text-slate-900 transition-all duration-300 hover:bg-accent hover:shadow-lg
              hover:scale-105 md:flex-1"
          >
            {t('demo')}
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Card;
