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
import TopPageDecoration from '../TopPageDecoration/TopPageDecoration';
import { Palette, Globe, Check, Sparkles } from 'lucide-react';
import { cn, saveScrollPosition } from '@/lib/utils';
import Image from 'next/image';

export default function SettingsContent() {
  const t = useTranslations('settingsPage');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const { theme, toggle: setTheme, backgroundGlow, toggleBackgroundGlow } = useContext(ThemeContext);

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
          {/* Top VS Code Window Tab decoration */}
          <TopPageDecoration filename={t('filename')} />

          {/* Unified Section Header */}
          <div className="border-b border-slate-700/30 px-4 py-4 text-center sm:py-6 2xl:py-6 3xl:py-9 portrait:py-6 sm:portrait:py-10">
            <h1 className="item-animate mb-1.5 sm:mb-2.5 text-2xl font-bold text-white sm:text-3xl md:text-4xl 2xl:text-4xl 3xl:text-5xl portrait:text-2xl sm:portrait:text-4xl">
              {t('title')} <span className="text-accent">{t('titleAccent')}</span>
            </h1>
            <p className="item-animate mx-auto max-w-2xl text-xs text-slate-300 sm:text-base 2xl:text-base 3xl:text-lg portrait:text-sm sm:portrait:text-base">
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
                        'relative flex h-full min-h-26 sm:min-h-32 md:min-h-34 2xl:min-h-38 3xl:min-h-45 portrait:min-h-37.5 sm:portrait:min-h-41.25 cursor-pointer flex-col justify-between items-center sm:items-start rounded-xl sm:rounded-2xl border-2 p-3.5 sm:p-4.5 2xl:p-5 3xl:p-7 text-center sm:text-left transition-all duration-200 hover:scale-[1.02]',
                        isActive
                          ? 'border-accent bg-slate-900/90 shadow-sm'
                          : 'border-slate-700/60 bg-slate-900/40 hover:border-slate-600',
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

              {/* VS Code Interactive Card Button for Background Glow Toggle */}
              <div className="mt-3.5 sm:mt-5 2xl:mt-5 3xl:mt-7 flex justify-center">
                <button
                  type="button"
                  onClick={() => toggleBackgroundGlow()}
                  title={t('blobsDesc')}
                  aria-pressed={backgroundGlow}
                  className={cn(
                    'group relative inline-flex w-full max-w-md sm:max-w-lg 2xl:max-w-xl cursor-pointer items-center justify-between gap-3 sm:gap-6 rounded-xl sm:rounded-2xl border-2 px-3.5 py-2.5 sm:px-5 sm:py-3.5 2xl:px-5 2xl:py-3.5 3xl:px-6 3xl:py-4 backdrop-blur-sm transition-all duration-200 hover:scale-[1.01] focus:outline-none min-h-12 sm:min-h-15 2xl:min-h-16 3xl:min-h-18',
                    backgroundGlow
                      ? 'border-accent bg-slate-900/90 shadow-sm'
                      : 'border-slate-700/60 bg-slate-900/40 hover:border-slate-600',
                  )}
                >
                  <div className="flex items-center justify-center sm:justify-start gap-2.5 sm:gap-4 text-center sm:text-left min-w-0 flex-1">
                    {/* Desktop Icon Container */}
                    <div
                      className={cn(
                        'hidden sm:flex h-8.5 w-8.5 sm:h-9.5 sm:w-9.5 2xl:h-10 2xl:w-10 3xl:h-11 3xl:w-11 shrink-0 items-center justify-center rounded-xl transition-colors',
                        backgroundGlow ? 'bg-accent/15 text-accent' : 'bg-slate-800 text-slate-400',
                      )}
                    >
                      <Sparkles
                        className={cn(
                          'h-4 w-4 sm:h-4.5 sm:w-4.5 2xl:h-5 2xl:w-5 3xl:h-5.5 3xl:w-5.5 transition-transform duration-200 group-hover:scale-110',
                          backgroundGlow ? 'text-accent' : 'text-slate-400',
                        )}
                      />
                    </div>
                    {/* Mobile Inline Icon */}
                    <Sparkles
                      className={cn(
                        'sm:hidden h-4.5 w-4.5 shrink-0 transition-transform duration-200',
                        backgroundGlow ? 'text-accent' : 'text-slate-400',
                      )}
                    />
                    <div className="min-w-0">
                      <span
                        className={cn(
                          'block text-sm sm:text-base 2xl:text-sm 3xl:text-base font-bold transition-colors tracking-wide text-center sm:text-left',
                          backgroundGlow ? 'text-white' : 'text-slate-300',
                        )}
                      >
                        {t('effectsTitle')}
                      </span>
                      <p className="hidden sm:block mt-0.5 text-xs text-slate-400 line-clamp-1">
                        {t('blobsDesc')}
                      </p>
                    </div>
                  </div>

                  <span
                    className={cn(
                      'inline-flex shrink-0 items-center gap-1 sm:gap-1.5 rounded-lg sm:rounded-xl px-2.5 py-1 sm:px-3 sm:py-1 2xl:px-3 2xl:py-1 3xl:px-3.5 3xl:py-1.5 text-xs sm:text-xs 3xl:text-sm font-bold font-mono transition-all',
                      backgroundGlow
                        ? 'bg-accent/20 text-accent ring-1 ring-accent/40'
                        : 'bg-slate-800 text-slate-400 ring-1 ring-slate-700/60',
                    )}
                  >
                    <span
                      className={cn(
                        'h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full',
                        backgroundGlow ? 'bg-accent animate-pulse' : 'bg-slate-500',
                      )}
                    />
                    {backgroundGlow ? 'ON' : 'OFF'}
                  </span>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-700/40" />

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
                        'relative flex min-h-13 sm:min-h-16 2xl:min-h-18 3xl:min-h-23 cursor-pointer items-center justify-center sm:justify-between rounded-xl sm:rounded-2xl border-2 px-4 py-3 sm:px-5 sm:py-3.5 2xl:px-6 2xl:py-4 3xl:px-6 3xl:py-6 transition-all duration-200 hover:scale-[1.01]',
                        isActive
                          ? 'border-accent bg-slate-900/90 shadow-sm'
                          : 'border-slate-700/60 bg-slate-900/40 hover:border-slate-600',
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
