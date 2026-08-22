// src/components/Tabsbar/Tabsbar.jsx
'use client';
import { useRef, useEffect, useState, useContext, useCallback } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ThemeContext } from '@/context/ThemeContext';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { NAV_ITEMS, TABS_NAV_ICONS } from '@/lib/constants';

const Tabsbar = () => {
  const t = useTranslations('tabsbar');
  const locale = useLocale();
  const currentRoute = usePathname();
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const tabsRef = useRef([]);
  const containerRef = useRef(null);
  const { theme } = useContext(ThemeContext);

  const activeStyles = {
    bg: theme === 'dracula' || theme === 'oneDarkPro' ? 'bg-active-tab-bg' : '',
    pos: ['ayu', 'oneDarkPro', 'poimandres'].includes(theme) ? 'bottom-0' : 'top-0',
  };

  // Wrapped in useCallback so it can safely sit in the effect's
  // dependency array below without retriggering on every render.
  const checkIsActive = useCallback(
    (link) => {
      if (link === '/') {
        return currentRoute === '/' || currentRoute === `/${locale}`;
      }
      return currentRoute === link || currentRoute.endsWith(link);
    },
    [currentRoute, locale],
  );

  useEffect(() => {
    const updateUnderlineStyle = () => {
      const activeIndex = NAV_ITEMS.findIndex((item) => checkIsActive(item.link));
      const activeTab = tabsRef.current[activeIndex];

      if (activeTab) {
        setUnderlineStyle({
          left: activeTab.offsetLeft,
          width: activeTab.offsetWidth,
          opacity: 1,
        });
      }
    };

    const timeoutId = setTimeout(updateUnderlineStyle, 10);

    // ResizeObserver catches every width change of the tabs container
    // (breakpoint switches, font loading, etc.), not just window resizes.
    const resizeObserver = new ResizeObserver(updateUnderlineStyle);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', updateUnderlineStyle);

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateUnderlineStyle);
    };
  }, [checkIsActive, theme]); // checkIsActive included: fixes the original exhaustive-deps gap

  return (
    <div className="bg-menu text-darker h-7 w-full relative">
      <div
        ref={containerRef}
        className="relative flex flex-row items-center justify-center lg:justify-start 
          overflow-x-hidden h-full"
      >
        {NAV_ITEMS.map(({ id, link }, index) => {
          const name = t(id);
          const icon = TABS_NAV_ICONS[id];
          const isActive = checkIsActive(link);
          const baseName = name.replace(/\..+$/, '');

          return (
            <Link
              href={link}
              key={id}
              ref={(el) => {
                tabsRef.current[index] = el;
              }}
              className={cn(
                `relative flex min-w-0 flex-1 cursor-pointer items-center justify-center px-1
                sm:flex-none sm:px-3 h-full transition-colors`,
                isActive ? activeStyles.bg : '',
              )}
            >
              <div className="my-1.5 flex w-full min-w-0 items-center justify-center gap-1 px-1 text-[10px] sm:my-1 sm:gap-1.5 sm:px-2 sm:text-sm">
                <Image src={icon} width={16} height={16} alt="" className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                <span className="truncate sm:hidden">{baseName}</span>
                <span className="hidden truncate sm:inline">{name}</span>
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