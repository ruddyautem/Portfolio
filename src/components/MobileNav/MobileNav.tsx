'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { NAV_ITEMS, SIDEBAR_NAV_ICONS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function MobileNav() {
  const currentRoute = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const containerRef = useRef<HTMLElement | null>(null);
  const t = useTranslations('sidebar');

  // Optimistic routing transition
  useEffect(() => {
    setPendingRoute(null);
  }, [currentRoute]);

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

  const activeIndex = NAV_ITEMS.findIndex((item) => checkIsActive(item.link));

  useEffect(() => {
    const updateIndicator = () => {
      const idx = activeIndex !== -1 ? activeIndex : 0;
      const activeElement = itemsRef.current[idx];

      if (activeElement) {
        setIndicatorStyle({
          left: activeElement.offsetLeft,
          width: activeElement.offsetWidth,
          opacity: 1,
        });
      }
    };

    updateIndicator();

    const resizeObserver = new ResizeObserver(updateIndicator);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    window.addEventListener('resize', updateIndicator);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeIndex]);

  return (
    <nav
      ref={containerRef}
      aria-label="Mobile navigation"
      className="bg-menu/95 border-t border-white/10 xl:hidden z-50 fixed bottom-0 left-0 right-0 flex h-14 md:h-16 w-full shrink-0 items-center justify-around px-1 sm:px-6 md:px-12 lg:px-24 backdrop-blur-md pb-[env(safe-area-inset-bottom)]"
    >
      {/* Sliding active indicator */}
      <div
        className="pointer-events-none absolute top-0 flex items-center justify-center transition-all duration-300 ease-out"
        style={{
          transform: `translateX(${indicatorStyle.left}px)`,
          width: `${indicatorStyle.width || 60}px`,
          opacity: indicatorStyle.opacity,
          left: 0,
        }}
      >
        <span
          className="h-0.5 w-12 sm:w-16 md:w-20 lg:w-24 rounded-full transition-all duration-300"
          style={{
            backgroundColor: 'var(--color-accent, #ffcc66)',
            boxShadow: '0 0 8px var(--color-accent, #ffcc66)',
          }}
        />
      </div>

      {NAV_ITEMS.map((item, index) => {
        const isActive = checkIsActive(item.link);
        const icon = SIDEBAR_NAV_ICONS[item.id];
        const label = t(item.id);

        return (
          <Link
            key={item.id}
            href={item.link}
            prefetch={true}
            onClick={() => setPendingRoute(item.link)}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            className={cn(
              'group relative flex flex-1 flex-col items-center justify-center py-1 sm:py-1.5 transition-all duration-200 active:scale-95',
              isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200',
            )}
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
          >
            <div
              className={cn(
                'flex h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 items-center justify-center rounded-lg transition-transform duration-200',
                isActive ? 'scale-110 opacity-100' : 'opacity-65 group-hover:opacity-100',
              )}
            >
              <Image
                src={icon}
                width={26}
                height={26}
                alt=""
                className="h-5 w-5 sm:h-5.5 sm:w-5.5 md:h-6.5 md:w-6.5 shrink-0"
              />
            </div>

            <span
              className={cn(
                'mt-0.5 sm:mt-1 text-[10.5px] sm:text-xs md:text-[13px] font-medium leading-none tracking-tight transition-colors',
                isActive ? 'text-white font-semibold' : 'text-slate-400',
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
