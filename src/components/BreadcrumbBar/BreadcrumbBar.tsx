'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { NAV_ITEMS, TABS_NAV_ICONS } from '@/lib/constants';

export default function BreadcrumbBar() {
  const currentRoute = usePathname();
  const locale = useLocale();
  const tTabs = useTranslations('tabsbar');

  // Find active nav item based on route
  const activeItem = useMemo(() => {
    const isHome =
      currentRoute === '/' || currentRoute === `/${locale}` || currentRoute === `/${locale}/`;
    if (isHome) return NAV_ITEMS.find((item) => item.id === 'home');

    return (
      NAV_ITEMS.find((item) => {
        if (item.link === '/') return false;
        return (
          currentRoute === item.link ||
          currentRoute === `/${locale}${item.link}` ||
          currentRoute.startsWith(`/${locale}${item.link}/`)
        );
      }) || NAV_ITEMS[0]
    );
  }, [currentRoute, locale]);

  const activeId = activeItem?.id || 'home';
  const activeLink = activeItem?.link || '/';
  const isSettings = activeId === 'settings';
  const fileName = tTabs(activeId);
  const fileIcon = TABS_NAV_ICONS[activeId];

  return (
    <nav
      aria-label="Breadcrumb"
      className="no-scrollbar hidden w-full shrink-0 items-center overflow-x-auto px-6 pt-4 pb-2.5 font-inconsolata text-[15px] text-[#cbd5e1] select-none lg:flex"
    >
      <div className="flex items-center gap-2.5 whitespace-nowrap">
        {!isSettings && (
          <>
            <Link
              href="/"
              className="flex items-center text-[#cbd5e1] transition-colors duration-100 hover:text-white"
            >
              src
            </Link>

            <ChevronRight className="size-4 shrink-0 text-[#6e7681]" />

            <Link
              href="/"
              className="flex items-center text-[#cbd5e1] transition-colors duration-100 hover:text-white"
            >
              app
            </Link>

            <ChevronRight className="size-4 shrink-0 text-[#6e7681]" />
          </>
        )}

        {/* File Name with its File Icon */}
        <Link
          href={activeLink}
          className="flex items-center gap-2 font-medium text-[#e2e8f0] transition-colors duration-100 hover:text-white"
        >
          {fileIcon && (
            <Image src={fileIcon} width={18} height={18} alt="" className="size-4.5 shrink-0" />
          )}
          <span>{fileName}</span>
        </Link>
      </div>
    </nav>
  );
}
