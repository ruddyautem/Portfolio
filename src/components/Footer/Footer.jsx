'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { memo, useTransition } from 'react';

// 🔥 Import next-intl routing & hooks
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const FooterItem = ({ icon, label, alt = '' }) => (
  <>
    <Image className="h-3 opacity-60" src={icon} width={15} height={15} alt={alt} />
    {label && <p className="ml-1">{label}</p>}
  </>
);

// 1. Define the config outside the component
const LANGUAGES = [
  { code: 'en', label: '🇬🇧 EN', title: 'Switch to English' },
  { code: 'fr', label: 'FR 🇫🇷', title: 'Passer en Français' },
];

// 🔥 FOOTER LANGUAGE SWITCHER (Matches Menu exactly, but uses h-5 for Footer height)
const FooterLanguageSwitcher = memo(({ className }) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLanguage = (nextLocale) => {
    if (locale === nextLocale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className={cn("items-center font-medium tracking-wide", className)}>
      {LANGUAGES.map((lang, index) => [
        // The button itself
        <button
          key={lang.code}
          disabled={isPending}
          onClick={() => switchLanguage(lang.code)}
          className={cn(
            // 🔥 Increased padding (px-2.5) and text size (text-xs) for mobile layout
            'flex h-5 cursor-pointer items-center rounded-xs px-2.5 text-xs transition-all hover:bg-white/10',
            locale === lang.code ? 'opacity-100 text-white' : 'opacity-40 hover:opacity-80'
          )}
          title={lang.title}
        >
          {lang.label}
        </button>,
        
        // The separator
        index < LANGUAGES.length - 1 && (
          <span key={`separator-${lang.code}`} className="mx-1 text-xs opacity-30">
            |
          </span>
        ),
      ])}
    </div>
  );
});
FooterLanguageSwitcher.displayName = 'FooterLanguageSwitcher';

const Footer = () => {
  const statusItems = [
    { icon: '/error.svg', label: '0' },
    { icon: '/warning.svg', label: '0' },
    { icon: '/info.svg', label: '0' },
  ];

  const rightSideItems = [
    { icon: '/prettier.svg', label: 'Prettier' },
    { icon: '/bell.svg', label: null },
  ];

  const containerClasses = 'flex h-5 cursor-pointer items-center rounded-xs px-1 hover:bg-white/10';
  const footerClasses =
    'bg-menu text-opacity-50 z-50 flex h-5 w-full items-center gap-1 text-[10px] relative';

  return (
    <div className={footerClasses}>
      {/* 🔥 "main" branch hidden on mobile (<sm) */}
      <Link href="https://github.com/ruddyautem" className={cn(containerClasses, "ml-1 hidden sm:flex")}>
        <FooterItem icon="/source-control.svg" label="main" alt="Source control" />
      </Link>

      <div className="hidden gap-2 sm:flex">
        <div className={containerClasses}>
          {statusItems.map((item, index) => (
            <FooterItem key={index} {...item} />
          ))}
        </div>
      </div>

      <span className="absolute left-1/2 -ml-1.25 -translate-x-1/2 lg:ml-5 xl:ml-28.75">
        © {new Date().getFullYear()} Ruddy Autem
      </span>

      <div className="ml-auto flex gap-1 px-1">
        
        {/* 🔥 VISIBLE ON MOBILE (<lg), HIDDEN ON DESKTOP */}
        <FooterLanguageSwitcher className="flex lg:hidden" />

        {/* 🔥 PRETTIER & BELL hidden on mobile (<sm) */}
        {rightSideItems.map((item, index) => (
          <div key={index} className={cn(containerClasses, "hidden sm:flex")}>
            <FooterItem {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;