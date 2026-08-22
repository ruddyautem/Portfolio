'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  memo,
  useCallback,
  useContext,
  useTransition,
} from 'react';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { ThemeContext } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { useOverlay } from '@/components/Menu/Menu';
import { LANGUAGES, THEME_DOT_COLORS, THEME_OPTIONS } from '@/lib/constants';
import { CheckIcon, ChevronUp } from '@/lib/icons';

const FooterItem = ({ icon, label, alt = '' }) => (
  <>
    <Image className="h-3 opacity-60" src={icon} width={15} height={15} alt={alt} />
    {label && <p className="ml-1">{label}</p>}
  </>
);

const FooterSettingsSwitcher = memo(({ className }) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('menu');
  const { theme, toggle } = useContext(ThemeContext);
  const [isPending, startTransition] = useTransition();

  const { isOpen, toggle: toggleMenu, close, anchorRef } = useOverlay();

  const currentLanguage = LANGUAGES.find((lang) => lang.code === locale) ?? LANGUAGES[0];

  const switchLanguage = useCallback(
    (nextLocale) => {
      if (locale !== nextLocale) {
        startTransition(() => {
          router.replace(pathname, { locale: nextLocale });
        });
      }
    },
    [locale, pathname, router],
  );

  const handleThemeSelect = useCallback(
    (option) => {
      toggle(option);
      close();
    },
    [toggle, close],
  );

  return (
    <div ref={anchorRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={toggleMenu}
        disabled={isPending}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Preferences"
        className={cn(
          'flex h-5 cursor-pointer items-center gap-1 rounded-xs px-1.5 text-[10px] font-medium',
          'tracking-wide text-white/80 transition-colors hover:bg-white/10',
          isOpen && 'bg-white/10',
          isPending && 'opacity-50',
        )}
      >
        <Image
          src={currentLanguage.flag}
          alt=""
          width={13}
          height={10}
          className="rounded-sm object-contain"
        />
        <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full ring-1 ring-white/30', THEME_DOT_COLORS[theme])} />
        <ChevronUp className={cn('transition-transform duration-150', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div
          role="menu"
          className={cn(
            'bg-menu absolute bottom-full right-0 z-50 mb-1 w-44 max-w-[calc(100vw-1rem)]',
            'overflow-hidden rounded-md border border-white/10 shadow-lg',
            'animate-in fade-in slide-in-from-bottom-1 duration-150',
          )}
        >
          <div className="border-b border-white/10 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-wide text-white/40">
            {t('language') ?? 'Language'}
          </div>
          {LANGUAGES.map((lang) => {
            const isActive = locale === lang.code;
            return (
              <button
                key={lang.code}
                role="menuitem"
                type="button"
                onClick={() => switchLanguage(lang.code)}
                disabled={isPending}
                className={cn(
                  'flex w-full cursor-pointer items-center gap-2 px-2.5 py-2 text-left text-[10px] font-medium',
                  'transition-colors hover:bg-white/10',
                  isActive ? 'text-white' : 'text-white/60',
                )}
              >
                <Image src={lang.flag} alt="" width={13} height={10} className="rounded-sm object-contain" />
                <span>{lang.title}</span>
                {isActive && <CheckIcon className="ml-auto text-white" />}
              </button>
            );
          })}

          <div className="border-b border-t border-white/10 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-wide text-white/40">
            Theme
          </div>
          {THEME_OPTIONS.map((option) => {
            const isActive = theme === option;
            return (
              <button
                key={option}
                role="menuitem"
                type="button"
                onClick={() => handleThemeSelect(option)}
                className={cn(
                  'flex w-full cursor-pointer items-center gap-2 px-2.5 py-2 text-left text-[10px] font-medium capitalize',
                  'transition-colors hover:bg-white/10',
                  isActive ? 'text-white' : 'text-white/60',
                )}
              >
                <span className={cn('h-2 w-2 rounded-full', THEME_DOT_COLORS[option])} />
                <span>{option}</span>
                {isActive && <CheckIcon className="ml-auto text-white" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});
FooterSettingsSwitcher.displayName = 'FooterSettingsSwitcher';

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
      <Link href="https://github.com/ruddyautem" className={cn(containerClasses, 'ml-1 hidden sm:flex')}>
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

      <div className="ml-auto flex items-center gap-1 px-1">
        <FooterSettingsSwitcher className="flex lg:hidden" />

        {rightSideItems.map((item, index) => (
          <div key={index} className={cn(containerClasses, 'hidden sm:flex')}>
            <FooterItem {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;