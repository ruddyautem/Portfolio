'use client';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

import { useEffect, useState, type CSSProperties } from 'react';
import Tooltip from '@/components/ui/beui-tooltip';
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
  onSelect?: (link: string) => void;
}

const NavItem = ({ item, isActive, onSelect }: NavItemProps) => {
  const iconStyle = {
    WebkitMaskImage: `url(${item.icon})`,
    maskImage: `url(${item.icon})`,
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
  } as CSSProperties;

  const content = (
    <div className="group flex h-11 w-full items-center justify-center">
      <span
        aria-hidden="true"
        style={iconStyle}
        className={cn(
          'relative h-6 w-6 transition-transform duration-200 group-hover:scale-110',
          isActive ? 'z-10 bg-accent' : 'bg-light',
        )}
      />
    </div>
  );

  return (
    <div
      className={cn(
        'relative flex items-center justify-center transition-opacity duration-200',
        isActive ? 'opacity-100' : 'opacity-30 hover:opacity-100',
      )}
    >
      <Tooltip content={item.name} side="right">
        {item.link ? (
          <Link
            href={item.link}
            prefetch={true}
            onClick={() => onSelect?.(item.link!)}
            className="w-full"
            aria-label={item.name}
            aria-current={isActive ? 'page' : undefined}
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

  // Prefetch all sidebar routes on mount
  useEffect(() => {
    NAV_ITEMS.forEach((item) => {
      router.prefetch(item.link);
    });
  }, [router]);

  // Reset optimistic state once the real route transition completes
  useEffect(() => {
    const timer = window.setTimeout(() => setPendingRoute(null), 0);
    return () => window.clearTimeout(timer);
  }, [currentRoute]);

  const effectiveRoute = pendingRoute ?? currentRoute;

  return (
    <aside
      className="hidden h-full w-12 flex-col justify-between rounded-[9px] border-r border-white/8 bg-sidebar-bg lg:flex xl:rounded-r-none"
      aria-label="Sidebar navigation"
    >
      {/* SECTION HAUTE */}
      <nav className="relative flex flex-col" aria-label="Primary navigation">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.id}
            item={{ ...item, icon: SIDEBAR_NAV_ICONS[item.id], name: t(item.id) }} // 🔥 Inject the translated name + this view's icon
            isActive={effectiveRoute === item.link}
            onSelect={(link) => setPendingRoute(link)}
          />
        ))}
      </nav>

      {/* SECTION BASSE */}
      <nav className="flex flex-col" aria-label="Secondary navigation">
        {BOTTOM_SIDEBAR_ITEMS.map((item) => (
          <NavItem
            key={item.id}
            item={{ ...item, name: t(item.id) }} // 🔥 Inject the translated name here!
            isActive={false}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
