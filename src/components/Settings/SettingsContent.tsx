'use client';

import { useContext, useTransition } from 'react';
import { useTranslations, useLocale, hasLocale } from 'next-intl';
import { useRouter, usePathname, routing } from '@/i18n/routing';
import { ThemeContext } from '@/context/ThemeContext';
import {
  THEME_OPTIONS,
  THEME_DOT_COLORS,
  LANGUAGES,
  PAGE_OUTER_CLASSES,
  PAGE_INNER_CLASSES,
  PAGE_CARD_CLASSES,
  THEME_LABELS,
} from '@/lib/constants';
import { Palette, Globe, Check } from 'lucide-react';
import { cn, saveScrollPosition } from '@/lib/utils';
import Image from 'next/image';

export default function SettingsContent() {
  const t = useTranslations('settingsPage');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const { theme, toggle: setTheme } = useContext(ThemeContext);

  const handleLanguageChange = (nextLocale: string) => {
    if (!hasLocale(routing.locales, nextLocale) || locale === nextLocale) return;
    saveScrollPosition();
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale, scroll: false });
    });
  };

  return (
    <div className={PAGE_OUTER_CLASSES}>
      <div className={PAGE_INNER_CLASSES}>
        <div className={PAGE_CARD_CLASSES}>
          {/* Unified Section Header */}
          <div className="border-b border-white/[0.08] px-4 py-4 text-center sm:py-6 2xl:py-6 3xl:py-9 portrait:py-6 sm:portrait:py-10">
            <h1 className="item-animate mb-1.5 sm:mb-2.5 text-2xl font-bold text-white sm:text-3xl md:text-4xl 2xl:text-4xl 3xl:text-5xl portrait:text-2xl sm:portrait:text-4xl">
              {t('title')} <span className="text-accent">{t('titleAccent')}</span>
            </h1>
            <p className="item-animate mx-auto max-w-2xl text-sm text-slate-300 sm:text-lg md:text-xl 2xl:text-2xl portrait:text-sm sm:portrait:text-base">
              {t('subtitle')}
            </p>
          </div>

          {/* Main Content Body - Single Unified Container */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 md:p-8 lg:p-10 xl:p-10 2xl:p-10 3xl:p-16 portrait:p-4 sm:portrait:p-10 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-6 2xl:space-y-7 3xl:space-y-14 portrait:space-y-6 sm:portrait:space-y-10">
            {/* Themes Section */}
            <div className="item-animate-1">
              <div className="mb-2 sm:mb-2.5 2xl:mb-3 flex items-center justify-center sm:justify-start gap-2 sm:gap-2.5">
                <Palette className="h-4 w-4 sm:h-4.5 sm:w-4.5 2xl:h-5 2xl:w-5 3xl:h-5 3xl:w-5 text-accent" />
                <h2 className="text-sm font-bold tracking-wider text-white sm:text-base 2xl:text-lg 3xl:text-lg">
                  {t('appearanceTitle')}
                </h2>
              </div>
              <p className="mb-3 sm:mb-4 2xl:mb-4 text-center sm:text-left text-xs text-slate-400 sm:text-xs 2xl:text-sm 3xl:text-sm portrait:mb-6">{t('appearanceDesc')}</p>

              <div className="grid grid-cols-1 gap-3 sm:gap-4 2xl:gap-4.5 3xl:gap-5 sm:grid-cols-2 landscape:lg:grid-cols-4 auto-rows-fr">
                {THEME_OPTIONS.map((themeOption) => {
                  const isActive = theme === themeOption;


                  return (
                    <button
                      key={themeOption}
                      type="button"
                      onClick={() => setTheme(themeOption)}
                      className={cn(
                        'relative flex h-full min-h-26 sm:min-h-32 md:min-h-34 2xl:min-h-38 3xl:min-h-45 portrait:min-h-37.5 sm:portrait:min-h-41.25 cursor-pointer flex-col justify-between items-center sm:items-start rounded-[10px] border p-3.5 sm:p-4.5 2xl:p-5 3xl:p-7 text-center sm:text-left transition-all duration-200 hover:scale-[1.02]',
                        isActive
                          ? 'border-accent bg-[var(--theme-bg)]'
                          : 'border-white/[0.08] bg-[var(--theme-bg)] hover:border-white/[0.14]',
                      )}
                    >
                      {isActive && (
                        <Check className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 2xl:top-5 2xl:right-5 h-4.5 w-4.5 sm:h-5 sm:w-5 2xl:h-5.5 2xl:w-5.5 text-accent" />
                      )}
                      <div className="flex w-full flex-1 sm:flex-initial flex-row items-center justify-center sm:justify-start gap-2.5 sm:gap-3 2xl:gap-3.5 pr-0 sm:pr-8">
                        <span
                          className={cn(
                            'h-4 w-4 sm:h-3.5 sm:w-3.5 2xl:h-4 2xl:w-4 rounded-full ring-2 sm:ring-1 ring-white/40 shrink-0',
                            THEME_DOT_COLORS[themeOption],
                          )}
                        />
                        <span className="text-2xl sm:text-lg font-bold text-white 2xl:text-lg tracking-wide">
                          {THEME_LABELS[themeOption] || themeOption}
                        </span>
                      </div>
                      <p className="mt-2 sm:mt-4 2xl:mt-4 text-xs text-slate-300/80 leading-relaxed sm:text-sm sm:leading-relaxed 2xl:text-sm">
                        {t(`themeDescriptions.${themeOption}`)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/[0.08]" />

            {/* Language Section - Perfectly Aligned Side-by-Side Buttons */}
            <div className="item-animate-2">
              <div className="mb-2 sm:mb-2.5 2xl:mb-3 flex items-center justify-center sm:justify-start gap-2 sm:gap-2.5">
                <Globe className="h-4 w-4 sm:h-4.5 sm:w-4.5 2xl:h-5 2xl:w-5 3xl:h-5 3xl:w-5 text-blue-400" />
                <h2 className="text-sm font-bold tracking-wider text-white sm:text-base 2xl:text-lg 3xl:text-lg">
                  {t('languageTitle')}
                </h2>
              </div>
              <p className="mb-3 sm:mb-4 2xl:mb-4 text-center sm:text-left text-xs text-slate-400 sm:text-xs 2xl:text-sm 3xl:text-sm portrait:mb-6">{t('languageDesc')}</p>

              <div className="grid grid-cols-1 gap-3 sm:gap-4 2xl:gap-4.5 3xl:gap-5 sm:grid-cols-2">
                {LANGUAGES.map((lang) => {
                  const isActive = locale === lang.code;

                  return (
                    <button
                      key={lang.code}
                      type="button"
                      disabled={isPending}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={cn(
                        'relative flex min-h-13 sm:min-h-16 2xl:min-h-18 3xl:min-h-23 cursor-pointer items-center justify-center sm:justify-between rounded-[10px] border px-4 py-3 sm:px-5 sm:py-3.5 2xl:px-6 2xl:py-4 3xl:px-6 3xl:py-6 transition-all duration-200 hover:scale-[1.01]',
                        isActive
                          ? 'border-accent bg-[var(--theme-bg)]'
                          : 'border-white/[0.08] bg-[var(--theme-bg)] hover:border-white/[0.14]',
                      )}
                    >
                      <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-3.5 2xl:gap-4">
                        <Image
                          src={lang.flag}
                          alt=""
                          width={22}
                          height={15}
                          className="rounded-xs object-contain sm:w-6 sm:h-4 2xl:w-6.5 2xl:h-4.5 3xl:w-7 3xl:h-4.75"
                        />
                        <span className="text-sm font-bold text-white sm:text-base 2xl:text-lg 3xl:text-lg">{lang.title}</span>
                      </div>
                      {isActive && (
                        <Check className="absolute right-4 sm:static sm:right-auto h-4 w-4 sm:h-4.5 sm:w-4.5 2xl:h-5 2xl:w-5 3xl:h-5 3xl:w-5 text-accent" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
