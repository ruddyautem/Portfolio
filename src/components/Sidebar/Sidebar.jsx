'use client';
import Image from 'next/image';

// 🔥 localized Link & Pathname
import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

import { useRef, useEffect, useState } from 'react';
import Tooltip from '../Tooltip/Tooltip';
import { cn } from '@/lib/utils';

// ============================================================================
// CONSTANTS (Using translation IDs instead of hardcoded strings!)
// ============================================================================

const TOP_CONFIG = [
  { id: 'home', link: '/', icon: '/files.svg' },
  { id: 'about', link: '/about', icon: '/code.svg' },
  { id: 'projects', link: '/projects', icon: '/source-control.svg' },
  { id: 'contact', link: '/contact', icon: '/email.svg' },
  { id: 'cv', link: '/cv', icon: '/cv-sidebar.svg' },
];

const BOTTOM_CONFIG = [
  { id: 'accounts', icon: '/account.svg' },
  { id: 'settings', icon: '/settings-gear.svg' },
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
  const t = useTranslations('sidebar');

  const itemsRef = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0, opacity: 0 });

  useEffect(() => {
    const updateIndicator = () => {
      // Find the index using the CONFIG directly to avoid any React re-render loops
      const activeIndex = TOP_CONFIG.findIndex((item) => item.link === currentRoute);
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
        {TOP_CONFIG.map((item, index) => (
          <NavItem
            key={item.id}
            item={{ ...item, name: t(item.id) }} // 🔥 Inject the translated name here!
            isActive={currentRoute === item.link}
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
        {BOTTOM_CONFIG.map((item) => (
          <NavItem
            key={item.id}
            item={{ ...item, name: t(item.id) }} // 🔥 Inject the translated name here!
            isActive={false}
            priority={false}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
