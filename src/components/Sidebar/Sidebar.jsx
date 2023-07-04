'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import Tooltip from '../Tooltip/Tooltip';

const Sidebar = () => {
  const currentRoute = usePathname();

  const navLinks = [
    { name: 'Accueil', link: '/', icon: '/files.svg' },
    { name: 'Profil', link: '/about', icon: '/code.svg' },
    { name: 'Contact', link: '/contact', icon: '/email.svg' },
    { name: 'Projets', link: '/projects', icon: '/source-control.svg' },
    { name: 'Github', link: '/github', icon: '/github.svg' },
    { name: 'Comptes', icon: '/account.svg' },
    { name: 'Settings', icon: '/settings-gear.svg' },
  ];

  const topLinks = navLinks.slice(0, 5);
  const bottomLinks = navLinks.slice(5);

  return (
    <div className='hidden w-12 sm:flex flex-col justify-between '>
      <div>
        {topLinks.map(({ name, link, icon }) => {
          const isActive = currentRoute === link;
          return (
            <div
              key={name}
              className={`${
                isActive ? 'opacity-100' : 'opacity-60'
              } flex items-center justify-center hover:opacity-100 relative`}
            >
              <Tooltip tooltipText={name}>
                <Link href={link}>
                  <div className='flex items-center justify-center w-full group h-11'>
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
                <div className='absolute bg-opacity-100 left-0 w-[2px] h-full bg-yellow-400'></div>
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
              className='flex items-center justify-center opacity-60 hover:opacity-100 cursor-pointer '
            >
              <Tooltip tooltipText={name}>
                <div className='relative flex justify-center w-full group h-11'>
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
