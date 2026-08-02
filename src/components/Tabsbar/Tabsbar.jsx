'use client';
import React, { useRef, useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ThemeContext } from '@/context/ThemeContext';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl'; 
import { cn } from '@/lib/utils';

const Tabsbar = () => {
  const t = useTranslations('tabsbar');
  const locale = useLocale(); 
  const currentRoute = usePathname();
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const tabsRef = useRef([]);
  const containerRef = useRef(null);
  const { theme } = useContext(ThemeContext);

  const NAV_LINKS = [
    { name: t('home'), link: '/', icon: '/jsx.svg' },
    { name: t('about'), link: '/about', icon: '/html5.svg' },
    { name: t('projects'), link: '/projects', icon: '/js.svg' },
    { name: t('contact'), link: '/contact', icon: '/css.svg' },
    { name: t('cv'), link: '/cv', icon: '/cv.svg' },
  ];

  const activeStyles = {
    bg: theme === 'dracula' || theme === 'oneDarkPro' ? 'bg-active-tab-bg' : '',
    pos: ['ayu', 'oneDarkPro', 'poimandres'].includes(theme) ? 'bottom-0' : 'top-0',
  };


  const checkIsActive = (link) => {
    if (link === '/') {

      return currentRoute === '/' || currentRoute === `/${locale}`;
    }
    return currentRoute === link || currentRoute.endsWith(link);
  };

  useEffect(() => {
    const updateUnderlineStyle = () => {
      const activeIndex = NAV_LINKS.findIndex((item) => checkIsActive(item.link));
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
  }, [currentRoute, theme, locale]);

  return (
    <div className="bg-menu text-darker h-7 w-full relative">
      <div
        ref={containerRef}
        className="relative flex flex-row items-center justify-center lg:justify-start 
          overflow-x-hidden h-full"
      >
        {NAV_LINKS.map(({ name, link, icon }, index) => {
          const isActive = checkIsActive(link);
          const baseName = name.replace(/\..+$/, '');

          return (
            <Link
              href={link}
              key={name}
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