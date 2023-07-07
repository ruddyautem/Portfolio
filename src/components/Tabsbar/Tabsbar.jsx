'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const Tabsbar = () => {
  const currentRoute = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const navLinks = [
    { name: 'accueil.jsx', link: '/', icon: 'jsx.svg' },
    { name: 'profil.html', link: '/about', icon: 'html5.svg' },
    { name: 'contact.css', link: '/contact', icon: 'css.svg' },
    { name: 'projets.js', link: '/projects', icon: 'js.svg' },
    { name: 'github.md', link: '/github', icon: 'githubIcon.svg' },
  ];

  return (
    <div className='max-h-7'>
      <div
        className='flex flex-row justify-center sm:justify-start '
      >
        {navLinks.map(({ name, link, icon }) => {
          const isActive = currentRoute === link;
          return (
            <Link
              href={link}
              key={name}
              className='flex items-center justify-center cursor-pointer relative sm:px-3 px-[2px]'
            >
              <div className='flex w-full my-1 text-xs  sm:text-sm'>
                <Image className='pr-1 ' src={icon} width={16} height={16} alt='' />
                <p className={isActive ? 'opacity-100' : 'opacity-60'}>
                  {name}
                </p>
              </div>
                {isActive && (
                  <div className='absolute bottom-0 bg-yellow-400 w-full h-[1px]'></div>
                )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Tabsbar;
