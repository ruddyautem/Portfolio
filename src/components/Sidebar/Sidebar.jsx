'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Tooltip from '../Tooltip/Tooltip';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const currentRoute = usePathname();

  const navLinks = [
    { name: 'Accueil', link: '/', icon: '/files.svg' },
    { name: 'Profil', link: '/about', icon: '/code.svg' },
    { name: 'Projets', link: '/projects', icon: '/source-control.svg' },
    { name: 'Contact', link: '/contact', icon: '/email.svg' },

    // { name: 'Github', link: '/github', icon: '/github.svg' }, don't forget to modify the slice when you add it back ,
    { name: 'Comptes', icon: '/account.svg' },
    { name: 'Settings', icon: '/settings-gear.svg' },
  ];

  const topLinks = navLinks.slice(0, 4);
  const bottomLinks = navLinks.slice(4);

  return (
    <div className='bg-sidebarBg w-12 hidden flex-col justify-between lg:flex'>
      <div>
        {topLinks.map(({ name, link, icon }) => {
          const isActive = currentRoute === link;
          return (
            <div
              key={name}
              className={`${
                isActive ? 'opacity-100' : 'opacity-30'
              } flex items-center justify-center hover:opacity-100 relative`}
            >
              <Tooltip tooltipText={name}>
                <Link href={link}>
                  <div className='w-full h-11 flex justify-center items-center group'>
                    <Image
                      className=''
                      src={icon}
                      width={24}
                      height={24}
                      alt=''
                    />
                  </div>
                </Link>
              </Tooltip>
              {isActive && (
                <div className='absolute bg-opacity-100 left-0 w-[2px] h-full bg-accent'></div>
              )}
            </div>
          );
        })}
      </div>
      <div>
        {bottomLinks.map(({ icon, name }) => {
          return (
            <div
              key={name}
              className='flex justify-center items-center opacity-30 cursor-pointer hover:opacity-100'
            >
              <Tooltip tooltipText={name}>
                <div className='w-full h-11 relative flex justify-center group'>
                  <Image
                    className=''
                    src={icon}
                    width={24}
                    height={24}
                    alt=''
                  />
                </div>
              </Tooltip>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
