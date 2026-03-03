'use client';
import React, { useRef, useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeContext } from '@/context/ThemeContext';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { name: 'accueil.jsx', link: '/', icon: 'jsx.svg' },
  { name: 'profil.html', link: '/about', icon: 'html5.svg' },
  { name: 'projets.js', link: '/projects', icon: 'js.svg' },
  { name: 'contact.css', link: '/contact', icon: 'css.svg' },
  { name: 'cv.json', link: '/cv', icon: 'cv.svg' },
];

const Tabsbar = () => {
  const currentRoute = usePathname();
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const tabsRef = useRef([]);
  const { theme } = useContext(ThemeContext);

  const activeStyles = {
    bg: theme === 'dracula' || theme === 'oneDarkPro' ? 'bg-active-tab-bg' : '',
    pos: ['ayu', 'oneDarkPro', 'poimandres'].includes(theme) ? 'bottom-0' : 'top-0',
  };

  useEffect(() => {
    const updateUnderlineStyle = () => {
      const activeIndex = NAV_LINKS.findIndex((link) => link.link === currentRoute);
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

    window.addEventListener('resize', updateUnderlineStyle);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateUnderlineStyle);
    };
  }, [currentRoute, theme]);

  return (
    <div className="bg-menu text-darker h-7 w-full relative">
      {/* RESTAURATION DU CENTRAGE : justify-center par défaut, puis lg:justify-start */}
      <div
        className="relative flex flex-row items-center justify-center lg:justify-start 
          overflow-x-auto h-full scrollbar-hide"
      >
        {NAV_LINKS.map(({ name, link, icon }, index) => {
          const isActive = currentRoute === link;
          const baseName = name.replace(/\..+$/, '');

          return (
            <Link
              href={link}
              key={name}
              ref={(el) => {
                tabsRef.current[index] = el;
              }}
              className={cn(
                `relative flex cursor-pointer items-center justify-center px-0.5 sm:px-3 h-full
                shrink-0 transition-colors`,
                isActive ? activeStyles.bg : '',
              )}
            >
              <div className="my-1.5 flex w-full items-center gap-1 px-2 text-xs sm:my-1 sm:text-sm">
                <Image src={icon} width={16} height={16} alt="" className="shrink-0" />
                <span className="sm:hidden">{baseName}</span>
                <span className="hidden sm:inline">{name}</span>
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