'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Code2, Globe } from 'lucide-react';
import { GithubIcon } from '@/components/Icons/Icons';
import { Project } from '@/app/[locale]/projects/projects';
import { TAG_COLORS_CARD } from '@/lib/constants';

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
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-700/50
        bg-slate-800/30 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5
        hover:border-slate-600/70 hover:bg-slate-700/25 hover:shadow-lg"
    >
      {/* Top Header / Mini File tab */}
      <div
        className="flex h-9 items-center justify-between border-b border-slate-700/50 bg-slate-800/50
          px-3.5 text-xs font-mono text-slate-300"
      >
        <div className="flex items-center gap-1.5">
          <Code2 className="h-3.5 w-3.5 text-accent" />
          <span className="truncate">{project.title.toLowerCase()}.tsx</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-accent/80 hover:text-accent">
          <Globe className="h-3 w-3" />
          <span className="truncate max-w-[120px]">{project.displayUrl}</span>
        </div>
      </div>

      {/* Image Preview */}
      <Link
        href={project.demo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ouvrir la démo de ${project.title}`}
        className="relative block aspect-[16/10] w-full overflow-hidden bg-slate-800/40"
      >
        <Image
          src={project.img}
          alt={`Aperçu de ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 ease-out will-change-transform group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-slate-900/10 opacity-0 transition-opacity duration-300
            group-hover:opacity-100"
        />
      </Link>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-4 sm:p-5 text-center sm:text-left">
        <div className="mb-1.5 flex items-center justify-center sm:justify-between gap-2">
          <h3 className="text-sm sm:text-base font-bold text-white transition-colors group-hover:text-accent">
            <Link
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:underline"
            >
              {project.title}
              <ExternalLink className="h-3.5 w-3.5 opacity-70 sm:opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </h3>
        </div>

        <p className="mb-3.5 min-h-[2.25rem] text-xs leading-relaxed text-slate-300 line-clamp-3">
          {project.shortDesc || project.desc}
        </p>

        {/* Tags */}
        <div className="mt-auto mb-3.5 flex flex-wrap justify-center sm:justify-start gap-1 sm:gap-1.5">
          {project.tags.map((tag) => {
            const tagColor = TAG_COLORS_CARD[tag as keyof typeof TAG_COLORS_CARD] || 'border-white/10 text-slate-300 bg-white/5';
            return (
              <span
                key={tag}
                className={`rounded-md border px-2 py-0.5 text-[10px] sm:text-[11px] font-mono font-medium ${tagColor}`}
              >
                #{tag}
              </span>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2.5 border-t border-slate-700/40 text-[11px] sm:text-xs">
          <Link
            href={project.source}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 sm:h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border
              border-white/10 bg-white/5 font-medium text-slate-300 transition-colors
              hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            <span>{codeSourceText}</span>
          </Link>
          <Link
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 sm:h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent/80
              font-semibold text-slate-950 transition-colors hover:bg-accent"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>{liveDemoText}</span>
          </Link>
        </div>
      </div>
    </article>
  );
};
