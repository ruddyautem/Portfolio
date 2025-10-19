'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect, useState, useCallback, memo } from 'react';
import Tooltip from '../Tooltip/Tooltip';
import { usePathname } from 'next/navigation';

// ============================================================================
// CONSTANTS - Static data outside component
// ============================================================================

const NAV_LINKS = [
  { name: 'Accueil', link: '/', icon: '/files.svg' },
  { name: 'Profil', link: '/about', icon: '/code.svg' },
  { name: 'Projets', link: '/projects', icon: '/source-control.svg' },
  { name: 'Contact', link: '/contact', icon: '/email.svg' },
  { name: 'CV', link: '/cv', icon: '/cv-sidebar.svg' },
  { name: 'Comptes', icon: '/account.svg' },
  { name: 'Settings', icon: '/settings-gear.svg' },
];

const TOP_LINKS = NAV_LINKS.slice(0, 5);
const BOTTOM_LINKS = NAV_LINKS.slice(5);

const ICON_SIZE = 24;

const TRANSITION_CONFIG = {
  duration: 300,
  easing: 'ease-out',
};

// ============================================================================
// NAVIGATION LINK COMPONENT
// ============================================================================

const NavLink = memo(({ name, link, icon, isActive, index, onRef }) => {
  const content = (
    <div className="group flex h-11 w-full items-center justify-center">
      <Image
        src={icon}
        width={ICON_SIZE}
        height={ICON_SIZE}
        alt={name}
        className="transition-transform duration-200 group-hover:scale-110"
        priority={index < 3}
      />
    </div>
  );

  return (
    <div
      ref={onRef}
      className={`relative flex items-center justify-center transition-opacity duration-200 ${
        isActive ? 'opacity-100' : 'opacity-30 hover:opacity-100'
      }`}
    >
      <Tooltip tooltipText={name}>
        {link ? (
          <Link href={link} className="w-full">
            {content}
          </Link>
        ) : (
          <button className="w-full cursor-pointer" aria-label={name}>
            {content}
          </button>
        )}
      </Tooltip>
    </div>
  );
});

NavLink.displayName = 'NavLink';

// ============================================================================
// ACTIVE INDICATOR COMPONENT
// ============================================================================

const ActiveIndicator = memo(({ style }) => (
  <div
    className="bg-accent absolute left-0 w-0.5 transition-all"
    style={{
      top: `${style.top}px`,
      height: `${style.height}px`,
      transitionDuration: `${TRANSITION_CONFIG.duration}ms`,
      transitionTimingFunction: TRANSITION_CONFIG.easing,
    }}
  />
));

ActiveIndicator.displayName = 'ActiveIndicator';

// ============================================================================
// CUSTOM HOOK FOR INDICATOR POSITION
// ============================================================================

const useIndicatorPosition = (currentRoute, itemsRef, links) => {
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 });

  const updateIndicatorStyle = useCallback(() => {
    const activeIndex = links.findIndex((link) => link.link === currentRoute);

    if (activeIndex !== -1 && itemsRef.current[activeIndex]) {
      const activeElement = itemsRef.current[activeIndex];
      const { top, height } = activeElement.getBoundingClientRect();
      const containerTop = activeElement.parentElement.getBoundingClientRect().top;

      setIndicatorStyle({
        top: top - containerTop,
        height,
      });
    } else {
      setIndicatorStyle({ top: 0, height: 0 });
    }
  }, [currentRoute, links, itemsRef]);

  useEffect(() => {
    updateIndicatorStyle();
    window.addEventListener('resize', updateIndicatorStyle);
    return () => window.removeEventListener('resize', updateIndicatorStyle);
  }, [updateIndicatorStyle]);

  return indicatorStyle;
};

// ============================================================================
// SIDEBAR SECTIONS
// ============================================================================

const TopSection = memo(({ currentRoute, itemsRef }) => {
  const indicatorStyle = useIndicatorPosition(currentRoute, itemsRef, TOP_LINKS);

  return (
    <nav className="relative" aria-label="Primary navigation">
      {TOP_LINKS.map((link, index) => (
        <NavLink
          key={link.name}
          {...link}
          isActive={currentRoute === link.link}
          index={index}
          onRef={(el) => (itemsRef.current[index] = el)}
        />
      ))}
      <ActiveIndicator style={indicatorStyle} />
    </nav>
  );
});

TopSection.displayName = 'TopSection';

const BottomSection = memo(() => (
  <nav aria-label="Secondary navigation">
    {BOTTOM_LINKS.map((link, index) => (
      <NavLink key={link.name} {...link} isActive={false} index={index + TOP_LINKS.length} />
    ))}
  </nav>
));

BottomSection.displayName = 'BottomSection';

// ============================================================================
// MAIN SIDEBAR COMPONENT
// ============================================================================

const Sidebar = () => {
  const currentRoute = usePathname();
  const itemsRef = useRef([]);

  return (
    <aside
      className="bg-sidebar-bg hidden w-12 flex-col justify-between lg:flex"
      aria-label="Sidebar navigation"
    >
      <TopSection currentRoute={currentRoute} itemsRef={itemsRef} />
      <BottomSection />
    </aside>
  );
};

export default memo(Sidebar);
