// src/components/Tabsbar/Tabsbar.jsx
'use client';
import { useEffect, useState, useContext, useCallback } from 'react';
import Image from 'next/image';
import { Link, useRouter } from '@/i18n/routing';
import { ThemeContext } from '@/context/ThemeContext';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { NAV_ITEMS, TABS_NAV_ICONS } from '@/lib/constants';

const Tabsbar = () => {
  const t = useTranslations('tabsbar');
  const locale = useLocale();
  const currentRoute = usePathname();
  const router = useRouter();
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);
  const { theme } = useContext(ThemeContext);

  const activeStyles = {
    bg: theme === 'dracula' || theme === 'oneDarkPro' ? 'bg-active-tab-bg' : '',
  };

  const currentTabs = NAV_ITEMS;

  // Prefetch all tab routes into in-memory router cache on mount
  useEffect(() => {
    currentTabs.forEach(({ link }) => {
      router.prefetch(link);
    });
  }, [currentTabs, router]);

  // Reset optimistic selection when the route transition finishes
  useEffect(() => {
    const timer = window.setTimeout(() => setPendingRoute(null), 0);
    return () => window.clearTimeout(timer);
  }, [currentRoute]);

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

  const checkIsActive = useCallback(
    (link: string) => {
      if (link === '/') {
        return effectiveRoute === '/' || effectiveRoute === `/${locale}`;
      }
      return effectiveRoute === link || effectiveRoute.endsWith(link);
    },
    [effectiveRoute, locale],
  );

  return (
    <nav aria-label="Open tabs" className="text-darker hidden lg:block h-7 w-full relative">
      <div
        role="tablist"
        className="relative flex flex-row items-center justify-center lg:justify-start overflow-x-auto no-scrollbar h-full scroll-smooth"
      >
        {currentTabs.map(({ id, link }) => {
          const name = t(id);
          const icon = TABS_NAV_ICONS[id];
          const isActive = checkIsActive(link);
          const baseName = name.replace(/\..+$/, '');
          const compactName = id === 'settings' ? (locale === 'fr' ? 'param.' : 'settings') : baseName;

          return (
            <Link
              href={link}
              key={id}
              role="tab"
              aria-selected={isActive}
              aria-label={name}
              prefetch={true}
              onClick={() => setPendingRoute(link)}
              className={cn(
                'relative flex h-full shrink-0 cursor-pointer items-center justify-center rounded-[2px] px-2 transition-colors sm:flex-none sm:px-3',
                isActive ? cn(activeStyles.bg, 'text-accent') : 'text-darker hover:bg-white/[0.06] hover:text-white',
              )}
            >
              <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:my-1 sm:text-sm">
                <Image src={icon} width={16} height={16} alt="" className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                <span className="sm:hidden whitespace-nowrap">{compactName}</span>
                <span className="hidden sm:inline whitespace-nowrap">{name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Tabsbar;
