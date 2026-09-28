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
      currentRoute === '/' ||
      currentRoute === `/${locale}` ||
      currentRoute === `/${locale}/`;
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
      className="hidden lg:flex w-full shrink-0 items-center px-6 pt-4 pb-2.5 font-inconsolata text-[15px] text-[#cbd5e1] select-none overflow-x-auto no-scrollbar"
    >
      <div className="flex items-center gap-2.5 whitespace-nowrap">
        {!isSettings && (
          <>
            <Link
              href="/"
              className="text-[#cbd5e1] hover:text-white transition-colors duration-100 flex items-center"
            >
              src
            </Link>

            <ChevronRight className="size-4 text-[#6e7681] shrink-0" />

            <Link
              href="/"
              className="text-[#cbd5e1] hover:text-white transition-colors duration-100 flex items-center"
            >
              app
            </Link>

            <ChevronRight className="size-4 text-[#6e7681] shrink-0" />
          </>
        )}

        {/* File Name with its File Icon */}
        <Link
          href={activeLink}
          className="flex items-center gap-2 text-[#e2e8f0] hover:text-white transition-colors duration-100 font-medium"
        >
          {fileIcon && (
            <Image
              src={fileIcon}
              width={18}
              height={18}
              alt=""
              className="size-[18px] shrink-0"
            />
          )}
          <span>{fileName}</span>
        </Link>
      </div>
    </nav>
  );
}
