'use client';
import Image from 'next/image';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

import { useRef, useEffect, useState } from 'react';
import Tooltip from '../Tooltip/Tooltip';
import { cn } from '@/lib/utils';
import { NAV_ITEMS, SIDEBAR_NAV_ICONS, BOTTOM_SIDEBAR_ITEMS } from '@/lib/constants';

interface NavItemProps {
  item: {
    id: string;
    icon: string;
    name: string;
    link?: string;
  };
  isActive?: boolean;
  onRef?: (el: HTMLDivElement | null) => void;
  onSelect?: (link: string) => void;
  priority?: boolean;
}

const NavItem = ({ item, isActive, onRef, onSelect, priority }: NavItemProps) => {
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
          <Link
            href={item.link}
            prefetch={true}
            onClick={() => onSelect?.(item.link!)}
            className="w-full"
          >
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
  const router = useRouter();
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);
  const t = useTranslations('sidebar');

  const itemsRef = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0, opacity: 0 });

  // Prefetch all sidebar routes on mount
  useEffect(() => {
    NAV_ITEMS.forEach((item) => {
      router.prefetch(item.link);
    });
  }, [router]);

  // Reset optimistic state once the real route transition completes
  useEffect(() => {
    setPendingRoute(null);
  }, [currentRoute]);

  const effectiveRoute = pendingRoute ?? currentRoute;

  useEffect(() => {
    const updateIndicator = () => {
      const activeIndex = NAV_ITEMS.findIndex((item) => item.link === effectiveRoute);
      const activeElement = itemsRef.current[activeIndex];

      if (activeElement) {
        setIndicatorStyle({
          top: activeElement.offsetTop,
          height: activeElement.offsetHeight,
          opacity: 1,
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);

    return () => {
      window.removeEventListener('resize', updateIndicator);
    };
  }, [effectiveRoute]);

  return (
    <aside
      className="bg-sidebar-bg hidden h-full w-12 flex-col justify-between lg:flex"
      aria-label="Sidebar navigation"
    >
      {/* SECTION HAUTE */}
      <nav className="relative flex flex-col" aria-label="Primary navigation">
        {NAV_ITEMS.map((item, index) => (
          <NavItem
            key={item.id}
            item={{ ...item, icon: SIDEBAR_NAV_ICONS[item.id], name: t(item.id) }} // 🔥 Inject the translated name + this view's icon
            isActive={effectiveRoute === item.link}
            onSelect={(link) => setPendingRoute(link)}
            priority={index < 3}
            onRef={(el) => {
              itemsRef.current[index] = el;
            }}
          />
        ))}

        {/* INDICATEUR ACTIF */}
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
        {BOTTOM_SIDEBAR_ITEMS.map((item) => (
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