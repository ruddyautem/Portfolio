'use client';

import { useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import TopPageDecoration from '@/components/TopPageDecoration/TopPageDecoration';
import { PAGE_OUTER_CLASSES, PAGE_INNER_CLASSES, PAGE_CARD_CLASSES } from '@/lib/constants';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = useLocale();
  const isFr = locale === 'fr';

  useEffect(() => {
    // Log unexpected client exceptions to console
    console.error('App runtime error caught by boundary:', error);
  }, [error]);

  return (
    <div className={PAGE_OUTER_CLASSES}>
      <div className={PAGE_INNER_CLASSES}>
        <div className={PAGE_CARD_CLASSES}>
          <TopPageDecoration filename="ErrorBoundary.tsx" />

          <div className="flex flex-1 flex-col items-center justify-center p-6 text-center sm:p-12">
            <div
              className="w-full max-w-lg rounded-xl border border-rose-500/30 bg-slate-900/90 p-6
                shadow-2xl backdrop-blur-md"
            >
              <div
                className="mb-4 flex items-center justify-between border-b border-slate-700/50 pb-3"
              >
                <div className="flex items-center gap-2 text-rose-400">
                  <AlertTriangle className="h-5 w-5 animate-pulse" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                    Application Error
                  </span>
                </div>
                {error.digest && (
                  <span className="font-mono text-[10px] text-slate-500">ID: {error.digest}</span>
                )}
              </div>

              <p className="mb-4 text-sm text-slate-300">
                {isFr
                  ? "Une erreur inattendue est survenue lors de l'exécution."
                  : 'An unexpected error occurred during rendering.'}
              </p>

              <div
                className="mb-6 rounded-lg bg-slate-950/80 p-3 text-left font-mono text-[11px]
                  text-rose-300/80 overflow-x-auto"
              >
                <code>
                  {error.digest
                    ? `Error reference: ${error.digest}`
                    : isFr
                      ? 'Les détails techniques ont été masqués.'
                      : 'Technical details have been hidden.'}
                </code>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => reset()}
                  className="flex w-full sm:w-auto cursor-pointer items-center justify-center gap-2
                    rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-slate-950
                    transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <RefreshCw className="h-4 w-4" />
                  {isFr ? 'Réessayer' : 'Try Again'}
                </button>
                <Link
                  href="/"
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg
                    border border-slate-700 bg-slate-800/60 px-4 py-2 text-xs font-semibold
                    text-slate-200 transition-colors hover:border-slate-500 hover:text-white"
                >
                  <Home className="h-4 w-4" />
                  {isFr ? "Retour à l'accueil" : 'Return Home'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
