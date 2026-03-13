'use client';

import React, { useContext, useState } from 'react';
import Image from 'next/image';

// 🔥 FIX 1: MUST use localized routing imports to prevent redirects/broken active states!
import { Link, usePathname } from '@/i18n/routing'; 
import { ThemeContext } from '@/context/ThemeContext';
import { useTranslations } from 'next-intl';

const Explorer = () => {
  const currentRoute = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const { theme } = useContext(ThemeContext);

  // 🔥 Fetch translations
  const tTabs = useTranslations('tabsbar');
  const tExp = useTranslations('explorer');

  // 🔥 Defined INSIDE the component so they update instantly on language change
  const navLinks = [
    { name: tTabs('home'), link: '/', icon: '/jsx.svg' },
    { name: tTabs('about'), link: '/about', icon: '/html5.svg' },
    { name: tTabs('projects'), link: '/projects', icon: '/js.svg' },
    { name: tTabs('contact'), link: '/contact', icon: '/css.svg' },
    { name: tTabs('cv'), link: '/cv', icon: '/cv.svg' },
  ];

  return (
    <div className="bg-explorer-bg text-light hidden w-48 flex-col xl:flex">
      <div className="flex items-center justify-between">
        <p className="my-1 ml-4 flex h-5 items-center text-[12px] uppercase opacity-60">
          {tExp('title')}
        </p>
        <div className="mr-2 cursor-pointer rounded-sm p-0.5 hover:bg-white/5">
          <Image src="/ellipsis.svg" width={16} height={16} alt="" />
        </div>
      </div>
      <div className="text-darker">
        <div
          className="flex h-6 cursor-pointer items-center text-[11px] font-bold uppercase"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            className={`transform transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
            src="/chevron-right.svg"
            width={16}
            height={16}
            alt=""
          />
          <p>{tExp('portfolio')}</p>
        </div>

        <div
          className={`flex flex-col overflow-y-auto ${isOpen ? 'max-h-48' : ''} no-scrollbar max-h-0
            transition-all duration-200 ease-in-out`}
        >
          {navLinks.map(({ name, link, icon }) => (
            <Link
              href={link}
              key={link} // 🔥 Use stable link as key instead of name!
              className={`${currentRoute === link ? 'bg-active-explorer-tab' : ''}
              text-explorerColor flex cursor-pointer items-center gap-1 pl-3 text-sm
              hover:bg-white/5`}
            >
              <div className="flex items-center">
                <Image src={icon} width={16} height={16} alt="" className="shrink-0" />
                <p
                  className={`ml-2 flex items-center ${
                    currentRoute === link ? 'text-active-tab-text' : ''
                  }`}
                >
                  {name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div
        className={`${theme === 'dracula' ? 'bg-active-explorer-tab' : ''} ${
          theme === 'oneDarkPro' ? 'bg-sidebar-bg' : ''
        } text-darker mt-auto flex flex-col
          opacity-100`}
      >
        {/* 🔥 Dynamically load localized bottom titles */}
        {[tExp('outline'), tExp('timeline')].map((title, index) => (
          <div
            key={index}
            className={`${theme === 'dracula' && index === 0 ? 'border-y border-black' : ''} ${
              theme === 'dracula' && index === 1 ? 'border-b border-black' : ''
            } flex h-6
            cursor-pointer items-center text-[9px] font-bold uppercase`}
          >
            <Image
              src="/chevron-right.svg"
              width={16}
              height={16}
              alt=""
              className="shrink-0"
            />
            <p className="ml-2 flex items-center">{title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explorer;