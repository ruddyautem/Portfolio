'use client';

import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { FileQuestion, ArrowLeft, Home } from 'lucide-react';
import TopPageDecoration from '@/components/TopPageDecoration/TopPageDecoration';
import { PAGE_OUTER_CLASSES, PAGE_INNER_CLASSES, PAGE_CARD_CLASSES } from '@/lib/constants';

export default function NotFound() {
  const locale = useLocale();
  const isFr = locale === 'fr';

  return (
    <div className={PAGE_OUTER_CLASSES}>
      <div className={PAGE_INNER_CLASSES}>
        <div className={PAGE_CARD_CLASSES}>
          <TopPageDecoration filename="404_NotFound.ts" />

          <div className="flex flex-1 flex-col items-center justify-center p-6 text-center sm:p-12">
            {/* Editor error card */}
            <div className="w-full max-w-lg rounded-xl border border-slate-700/60 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-md">
              <div className="mb-4 flex items-center justify-between border-b border-slate-700/50 pb-3">
                <div className="flex items-center gap-2 text-rose-400">
                  <FileQuestion className="h-5 w-5" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                    Error 404 • ENOENT
                  </span>
                </div>
                <span className="font-mono text-[11px] text-slate-500">
                  {isFr ? 'Fichier introuvable' : 'File Not Found'}
                </span>
              </div>

              {/* Code snippet mimicking VS Code */}
              <div className="rounded-lg bg-slate-950/80 p-4 text-left font-mono text-xs leading-relaxed text-slate-300">
                <p className="text-slate-500">
                  <span className="mr-3 text-slate-600 select-none">1</span>
                  // 404: {isFr ? 'La page demandée n\'existe pas.' : 'The requested route does not exist.'}
                </p>
                <p>
                  <span className="mr-3 text-slate-600 select-none">2</span>
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-blue-300">status</span> ={' '}
                  <span className="text-amber-400">404</span>;
                </p>
                <p>
                  <span className="mr-3 text-slate-600 select-none">3</span>
                  <span className="text-purple-400">throw</span>{' '}
                  <span className="text-purple-400">new</span>{' '}
                  <span className="text-amber-300">NotFoundError</span>(
                  <span className="text-emerald-400">&apos;Page not found&apos;</span>);
                </p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/"
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-slate-950 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Home className="h-4 w-4" />
                  {isFr ? "Retour à l'accueil" : 'Back to Home'}
                </Link>
                <Link
                  href="/projects"
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {isFr ? 'Voir les projets' : 'View Projects'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
