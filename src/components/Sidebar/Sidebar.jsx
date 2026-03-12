'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import Tooltip from '../Tooltip/Tooltip';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

// ============================================================================
// CONSTANTS
// ============================================================================

const TOP_LINKS = [
  { name: 'Accueil', link: '/', icon: '/files.svg' },
  { name: 'Profil', link: '/about', icon: '/code.svg' },
  { name: 'Projets', link: '/projects', icon: '/source-control.svg' },
  { name: 'Contact', link: '/contact', icon: '/email.svg' },
  { name: 'CV', link: '/cv', icon: '/cv-sidebar.svg' },
];

const BOTTOM_LINKS = [
  { name: 'Comptes', icon: '/account.svg' },
  { name: 'Settings', icon: '/settings-gear.svg' },
];

// ============================================================================
// NAV ITEM COMPONENT
// ============================================================================

const NavItem = ({ item, isActive, onRef, priority }) => {
  const content = (
    <div className="group flex h-11 w-full items-center justify-center">
      <Image
        src={item.icon}
        width={24}
        height={24}
        alt={item.name}
        className="transition-transform duration-200 group-hover:scale-110"
        priority={priority}
      />
    </div>
  );

  return (
    <div
      ref={onRef}
      className={cn(
        'relative flex items-center justify-center transition-opacity duration-200',
        isActive ? 'opacity-100' : 'opacity-30 hover:opacity-100',
      )}
    >
      <Tooltip tooltipText={item.name}>
        {item.link ? (
          <Link href={item.link} className="w-full">
            {content}
          </Link>
        ) : (
          <button className="w-full cursor-pointer" aria-label={item.name}>
            {content}
          </button>
        )}
      </Tooltip>
    </div>
  );
};

// ============================================================================
// MAIN SIDEBAR
// ============================================================================

const Sidebar = () => {
  const currentRoute = usePathname();
  const itemsRef = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0, opacity: 0 });

  useEffect(() => {
    const updateIndicator = () => {
      const activeIndex = TOP_LINKS.findIndex((link) => link.link === currentRoute);
      const activeElement = itemsRef.current[activeIndex];

      if (activeElement) {
        setIndicatorStyle({
          top: activeElement.offsetTop,
          height: activeElement.offsetHeight,
          opacity: 1,
        });
      }
    };

    const timeoutId = setTimeout(updateIndicator, 10);
    window.addEventListener('resize', updateIndicator);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [currentRoute]);

  return (
    <aside
      className="bg-sidebar-bg hidden h-full w-12 flex-col justify-between lg:flex"
      aria-label="Sidebar navigation"
    >
      {/* SECTION HAUTE */}
      <nav className="relative flex flex-col" aria-label="Primary navigation">
        {TOP_LINKS.map((link, index) => (
          <NavItem
            key={link.name}
            item={link}
            isActive={currentRoute === link.link}
            priority={index < 3}
            onRef={(el) => {
              itemsRef.current[index] = el;
            }}
          />
        ))}

        {/* L'INDICATEUR ACTIF */}
        <div
          className="bg-accent absolute left-0 w-0.5 transition-all duration-300 ease-out"
          style={{
            top: `${indicatorStyle.top}px`,
            height: `${indicatorStyle.height}px`,
            opacity: indicatorStyle.opacity,
          }}
        />
      </nav>

      {/* SECTION BASSE */}
      <nav className="flex flex-col" aria-label="Secondary navigation">
        {BOTTOM_LINKS.map((link) => (
          <NavItem key={link.name} item={link} isActive={false} priority={false} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
