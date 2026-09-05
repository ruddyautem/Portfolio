// src/components/Tabsbar/Tabsbar.jsx
'use client';
import { useRef, useEffect, useState, useContext, useCallback } from 'react';
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
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const tabsRef = useRef([]);
  const containerRef = useRef(null);
  const { theme } = useContext(ThemeContext);

  const activeStyles = {
    bg: theme === 'dracula' || theme === 'oneDarkPro' ? 'bg-active-tab-bg' : '',
    pos: ['ayu', 'oneDarkPro', 'poimandres'].includes(theme) ? 'bottom-0' : 'top-0',
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
    setPendingRoute(null);
  }, [currentRoute]);

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

  useEffect(() => {
    const updateUnderlineStyle = () => {
      const activeIndex = currentTabs.findIndex((item) => checkIsActive(item.link));
      const activeTab = tabsRef.current[activeIndex];

      if (activeTab) {
        setUnderlineStyle({
          left: activeTab.offsetLeft,
          width: activeTab.offsetWidth,
          opacity: 1,
        });
        if (containerRef.current && containerRef.current.scrollWidth > containerRef.current.clientWidth) {
          activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        }
      }
    };

    updateUnderlineStyle();

    const resizeObserver = new ResizeObserver(updateUnderlineStyle);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', updateUnderlineStyle);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateUnderlineStyle);
    };
  }, [checkIsActive, theme, currentTabs]);

  return (
    <div className="bg-menu text-darker h-7 w-full relative">
      <div
        ref={containerRef}
        className="relative flex flex-row items-center justify-center lg:justify-start overflow-x-auto no-scrollbar h-full scroll-smooth"
      >
        {currentTabs.map(({ id, link }, index) => {
          const name = t(id);
          const icon = TABS_NAV_ICONS[id];
          const isActive = checkIsActive(link);
          const baseName = name.replace(/\..+$/, '');
          const compactName = id === 'settings' ? (locale === 'fr' ? 'param.' : 'settings') : baseName;

          return (
            <Link
              href={link}
              key={id}
              prefetch={true}
              onClick={() => setPendingRoute(link)}
              ref={(el) => {
                tabsRef.current[index] = el;
              }}
              className={cn(
                'relative flex shrink-0 sm:flex-none cursor-pointer items-center justify-center px-2 sm:px-3 h-full transition-colors',
                isActive ? cn(activeStyles.bg, 'text-white') : 'text-darker hover:text-white',
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

        <div
          className={cn(
            'absolute bg-accent h-px transition-all duration-300 ease-out',
            activeStyles.pos,
          )}
          style={{
            left: `${underlineStyle.left}px`,
            width: `${underlineStyle.width}px`,
            opacity: underlineStyle.opacity,
          }}
        />
      </div>
    </div>
  );
};

export default Tabsbar;