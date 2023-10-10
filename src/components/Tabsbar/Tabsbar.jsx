'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

const Tabsbar = () => {
  const currentRoute = usePathname();

  const navLinks = [
    { name: 'accueil.jsx', link: '/', icon: 'jsx.svg' },
    { name: 'profil.html', link: '/about', icon: 'html5.svg' },
    { name: 'projets.js', link: '/projects', icon: 'js.svg' },
    { name: 'contact.css', link: '/contact', icon: 'css.svg' },

    // { name: 'github.md', link: '/github', icon: 'githubIcon.svg' },
  ];

  const { theme } = useContext(ThemeContext);

  return (
    <div className='h-7 bg-menu text-darker '>
      <div className='flex flex-row justify-center items-center sm:justify-start '>
        {navLinks.map(({ name, link, icon }) => {
          const isActive = currentRoute === link;
          return (
            <Link
              href={link}
              key={name}
              className={`${
                isActive && (theme === 'dracula' || theme === 'oneDarkPro') ? 'bg-activeTabBg' : ''
              } flex items-center justify-center cursor-pointer relative sm:px-3 px-[2px]`}
            >
              <div className='flex w-full my-1.5 sm:my-1 text-xs sm:text-sm px-2'>
                <Image
                  className='pr-1 '
                  src={icon}
                  width={16}
                  height={16}
                  alt=''
                />
                <p className={isActive && 'text-activeTabText'}>{name}</p>
              </div>
              {isActive && (
                <div
                  className={`absolute ${
                    (theme === 'ayu') || (theme === 'oneDarkPro') ? 'bottom-0' : 'top-0'
                  } bg-accent w-full h-[1px]`}
                ></div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Tabsbar;
