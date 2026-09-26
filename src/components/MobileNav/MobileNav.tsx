'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { NAV_ITEMS, SIDEBAR_NAV_ICONS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function MobileNav() {
  const currentRoute = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);
  const t = useTranslations('sidebar');

  const [prevRoute, setPrevRoute] = useState(currentRoute);

  // Reset optimistic state when route changes
  if (prevRoute !== currentRoute) {
    setPrevRoute(currentRoute);
    setPendingRoute(null);
  }

  // Instant response to swipe gestures (0ms latency without waiting for router.replace)
  useEffect(() => {
    const handleSwipeNav = (event: Event) => {
      const customEvent = event as CustomEvent<{ link: string }>;
      if (customEvent.detail?.link) {
        setPendingRoute(customEvent.detail.link);
      }
    };

    window.addEventListener('swipe-nav-change', handleSwipeNav);
    return () => window.removeEventListener('swipe-nav-change', handleSwipeNav);
  }, []);

  const effectiveRoute = pendingRoute ?? currentRoute;

  // Prefetch routes for instant responsiveness
  useEffect(() => {
    NAV_ITEMS.forEach((item) => {
      router.prefetch(item.link);
    });
  }, [router]);

  const checkIsActive = useCallback(
    (link: string) => {
      // Handle home route
      if (link === '/') {
        return (
          effectiveRoute === '/' ||
          effectiveRoute === `/${locale}` ||
          effectiveRoute === ''
        );
      }
      // Handle subroutes (/about, /projects, etc. with or without locale prefix)
      return (
        effectiveRoute === link ||
        effectiveRoute === `/${locale}${link}` ||
        effectiveRoute.endsWith(link)
      );
    },
    [effectiveRoute, locale],
  );

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-50 flex min-h-16 items-center gap-0.5 border-t border-white/10 bg-menu/95 px-2 pb-[max(0.375rem,env(safe-area-inset-bottom))] pt-1.5 shadow-[0_-8px_20px_rgba(0,0,0,0.12)] backdrop-blur-xl lg:hidden sm:px-5"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = checkIsActive(item.link);
        const icon = SIDEBAR_NAV_ICONS[item.id];
        const label = t(item.id);

        return (
          <Link
            key={item.id}
            href={item.link}
            prefetch={true}
            onClick={() => setPendingRoute(item.link)}
            className={cn(
              'group relative flex min-h-13 min-w-0 flex-1 flex-col items-center justify-center rounded-md py-1.5 transition-all duration-200 active:scale-95',
              isActive
                ? 'text-white'
                : 'text-slate-400 hover:bg-white/[0.035] hover:text-slate-200',
            )}
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
          >
            {isActive && (
              <motion.span
                layoutId="mobile-nav-active-tile"
                className="pointer-events-none absolute inset-0 z-0 rounded-md bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]"
                transition={{ type: 'spring', stiffness: 500, damping: 36, mass: 0.6 }}
                aria-hidden="true"
              >
                <span className="absolute inset-x-3 top-0 h-0.5 rounded-full bg-accent shadow-[0_1px_7px_color-mix(in_srgb,var(--color-accent)_55%,transparent)]" />
              </motion.span>
            )}
            <div
              className={cn(
                'relative z-10 flex h-7 w-7 items-center justify-center transition-all duration-200 sm:h-8 sm:w-8',
                isActive ? 'scale-110 opacity-100' : 'opacity-60 group-hover:opacity-100',
              )}
            >
              <Image
                src={icon}
                width={26}
                height={26}
                alt=""
                className="h-4.5 w-4.5 shrink-0 sm:h-5 sm:w-5"
              />
            </div>

            <span
              className={cn(
                'relative z-10 mt-1 text-[10px] font-medium leading-none tracking-tight transition-colors sm:text-xs',
                isActive ? 'font-semibold text-accent' : 'text-slate-400',
              )}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
