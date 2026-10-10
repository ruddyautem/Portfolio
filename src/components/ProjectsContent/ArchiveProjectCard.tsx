'use client';

import Link from 'next/link';
import { ExternalLink, Code2, Globe } from 'lucide-react';
import { GithubIcon } from '@/components/Icons/Icons';
import { Project } from '@/app/[locale]/projects/projects';
import { TAG_COLORS_CARD } from '@/lib/constants';
import { LoadingImage } from '@/components/Loading/LoadingImage';

interface ArchiveProjectCardProps {
  project: Project;
  codeSourceText: string;
  liveDemoText: string;
}

export const ArchiveProjectCard = ({
  project,
  codeSourceText,
  liveDemoText,
}: ArchiveProjectCardProps) => {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[10px] border border-white/8 bg-(--theme-bg) transition-all duration-300 hover:-translate-y-1.5 hover:border-white/14">
      {/* Top Header / Mini File tab */}
      <div className="flex h-9 items-center justify-between border-b border-white/8 bg-(--theme-bg) px-3.5 font-mono text-xs text-slate-300">
        <div className="flex items-center gap-1.5">
          <Code2 className="h-3.5 w-3.5 text-accent" />
          <span className="truncate">{project.title.toLowerCase()}.tsx</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-accent/80 hover:text-accent">
          <Globe className="h-3 w-3" />
          <span className="max-w-30 truncate">{project.displayUrl}</span>
        </div>
      </div>

      {/* Image Preview */}
      <Link
        href={project.demo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ouvrir la démo de ${project.title}`}
        className="relative block aspect-16/10 w-full overflow-hidden bg-slate-800/40"
      >
        <LoadingImage
          src={project.img}
          alt={`Aperçu de ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 ease-out will-change-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-slate-900/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Link>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-4 text-center sm:p-5 sm:text-left">
        <div className="mb-1.5 flex items-center justify-center gap-2 sm:justify-between">
          <h3 className="text-sm font-bold text-white transition-colors group-hover:text-accent sm:text-base">
            <Link
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:underline"
            >
              {project.title}
              <ExternalLink className="h-3.5 w-3.5 opacity-70 transition-opacity group-hover:opacity-100 sm:opacity-0" />
            </Link>
          </h3>
        </div>

        <p className="mb-3.5 line-clamp-3 min-h-9 text-xs leading-relaxed text-slate-300">
          {project.shortDesc || project.desc}
        </p>

        {/* Tags */}
        <div className="mt-auto mb-3.5 flex flex-wrap justify-center gap-1 sm:justify-start sm:gap-1.5">
          {project.tags.map((tag) => {
            const tagColor =
              TAG_COLORS_CARD[tag as keyof typeof TAG_COLORS_CARD] ||
              'border-white/10 text-slate-300 bg-white/5';
            return (
              <span
                key={tag}
                className={`rounded-md border px-2 py-0.5 font-mono text-[10px] font-medium sm:text-[11px] ${tagColor}`}
              >
                #{tag}
              </span>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 border-t border-slate-700/40 pt-2.5 text-[11px] sm:text-xs">
          <Link
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 min-w-0 flex-1 basis-0 items-center justify-center gap-1.5 rounded-xl bg-accent px-3 text-xs font-semibold text-slate-950 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>{liveDemoText}</span>
          </Link>
          <Link
            href={project.source}
            target="_blank"
            rel="noopener noreferrer"
            className="project-source-link inline-flex h-9 min-w-0 flex-1 basis-0 items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/60 px-3 text-xs font-medium text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-500 hover:bg-slate-700/60 hover:text-white"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            <span>{codeSourceText}</span>
          </Link>
        </div>
      </div>
    </article>
  );
};
