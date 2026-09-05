'use client';

import { useContext, useTransition } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { ThemeContext } from '@/context/ThemeContext';
import {
  THEME_OPTIONS,
  THEME_DOT_COLORS,
  LANGUAGES,
  PAGE_CARD_CLASSES,
  THEME_LABELS,
} from '@/lib/constants';
import TopPageDecoration from '../TopPageDecoration/TopPageDecoration';
import { Palette, Globe, Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const THEME_PREVIEWS: Record<string, { desc: string }> = {
  ayu: {
    desc: 'Nuances sombres et dorées chaleureuses (défaut)',
  },
  oneDarkPro: {
    desc: 'Nuances anthracite et vert pastel sobre',
  },
  dracula: {
    desc: 'Nuances sombres aux touches violettes et roses',
  },
  poimandres: {
    desc: 'Nuances bleu nuit et turquoise épuré',
  },
};

export default function SettingsContent() {
  const t = useTranslations('settingsPage');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const { theme, toggle: setTheme, backgroundGlow, toggleBackgroundGlow } = useContext(ThemeContext);

  const handleLanguageChange = (nextLocale: string) => {
    if (locale === nextLocale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale as any });
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center my-auto px-4 py-2 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-8 lg:py-12 portrait:py-8 sm:portrait:py-12">
      <div className="item-animate relative z-10 flex w-full max-w-5xl xl:max-w-6xl flex-col shadow-2xl">
        <div className={PAGE_CARD_CLASSES}>
          {/* Top VS Code Window Tab decoration */}
          <TopPageDecoration filename={t('filename')} />

          {/* Unified Section Header */}
          <div className="border-b border-slate-700/30 px-6 py-4 text-center sm:py-7 md:py-8 lg:py-9 portrait:py-8 sm:portrait:py-10">
            <h1 className="item-animate mb-2 sm:mb-3 text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl portrait:text-3xl sm:portrait:text-4xl">
              {t('title')} <span className="text-accent">{t('titleAccent')}</span>
            </h1>
            <p className="item-animate mx-auto max-w-2xl text-xs text-slate-300 sm:text-base md:text-lg portrait:text-sm sm:portrait:text-base">
              {t('subtitle')}
            </p>
          </div>

          {/* Main Content Body - Single Unified Container */}
          <div className="p-5 sm:p-8 md:p-10 lg:p-12 xl:p-14 portrait:p-8 sm:portrait:p-10 space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 portrait:space-y-8 sm:portrait:space-y-10">
            {/* Themes Section */}
            <div className="item-animate-1">
              <div className="mb-2.5 sm:mb-3.5 flex items-center gap-2.5 sm:gap-3">
                <Palette className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-accent" />
                <h2 className="text-sm font-bold tracking-wider text-white sm:text-lg">
                  {t('appearanceTitle')}
                </h2>
              </div>
              <p className="mb-4 sm:mb-6 text-xs text-slate-400 sm:text-sm portrait:mb-6">{t('appearanceDesc')}</p>

              <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 landscape:lg:grid-cols-4 auto-rows-fr">
                {THEME_OPTIONS.map((themeOption) => {
                  const isActive = theme === themeOption;
                  const preview = THEME_PREVIEWS[themeOption];

                  return (
                    <button
                      key={themeOption}
                      type="button"
                      onClick={() => setTheme(themeOption)}
                      className={cn(
                        'relative flex h-full min-h-29 sm:min-h-38.75 md:min-h-42.5 lg:min-h-45 portrait:min-h-37.5 sm:portrait:min-h-41.25 cursor-pointer flex-col justify-between rounded-xl sm:rounded-2xl border-2 p-4.5 sm:p-6 md:p-7 text-left transition-all duration-200 hover:scale-[1.02]',
                        isActive
                          ? 'border-accent bg-slate-900/90 shadow-sm'
                          : 'border-slate-700/60 bg-slate-900/40 hover:border-slate-600',
                      )}
                    >
                      {isActive && (
                        <Check className="absolute top-4 right-4 sm:top-5 sm:right-5 h-4.5 w-4.5 sm:h-5 sm:w-5 text-accent" />
                      )}
                      <div className="flex items-center gap-2.5 sm:gap-3 pr-7 sm:pr-8">
                        <span
                          className={cn(
                            'h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full ring-1 ring-white/40 shrink-0',
                            THEME_DOT_COLORS[themeOption],
                          )}
                        />
                        <span className="text-sm font-bold text-white sm:text-lg">
                          {THEME_LABELS[themeOption] || themeOption}
                        </span>
                      </div>
                      <p className="mt-3 sm:mt-4 text-xs text-slate-300/80 leading-relaxed sm:text-sm sm:leading-relaxed">
                        {preview.desc}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* VS Code Interactive Card Button for Background Glow Toggle */}
              <div className="mt-5 sm:mt-7 flex justify-center">
                <button
                  type="button"
                  onClick={() => toggleBackgroundGlow()}
                  title={t('blobsDesc')}
                  aria-pressed={backgroundGlow}
                  className={cn(
                    'group relative inline-flex w-full max-w-md sm:max-w-lg cursor-pointer items-center justify-between gap-3 sm:gap-6 rounded-xl sm:rounded-2xl border-2 px-4 py-3 sm:px-6 sm:py-4 backdrop-blur-sm transition-all duration-200 hover:scale-[1.01] focus:outline-none min-h-14 sm:min-h-18',
                    backgroundGlow
                      ? 'border-accent bg-slate-900/90 shadow-sm'
                      : 'border-slate-700/60 bg-slate-900/40 hover:border-slate-600',
                  )}
                >
                  <div className="flex items-center gap-2.5 sm:gap-4 text-left min-w-0">
                    {/* Desktop Icon Container */}
                    <div
                      className={cn(
                        'hidden sm:flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl transition-colors',
                        backgroundGlow ? 'bg-accent/15 text-accent' : 'bg-slate-800 text-slate-400',
                      )}
                    >
                      <Sparkles
                        className={cn(
                          'h-5 w-5 sm:h-5.5 sm:w-5.5 transition-transform duration-200 group-hover:scale-110',
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
                          'block text-sm sm:text-base font-bold transition-colors tracking-wide',
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
                      'inline-flex shrink-0 items-center gap-1 sm:gap-1.5 rounded-lg sm:rounded-xl px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-xs sm:text-sm font-bold font-mono transition-all',
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
              <div className="mb-2.5 sm:mb-3.5 flex items-center gap-2.5 sm:gap-3">
                <Globe className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-blue-400" />
                <h2 className="text-sm font-bold tracking-wider text-white sm:text-lg">
                  {t('languageTitle')}
                </h2>
              </div>
              <p className="mb-4 sm:mb-6 text-xs text-slate-400 sm:text-sm portrait:mb-6">{t('languageDesc')}</p>

              <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2">
                {LANGUAGES.map((lang) => {
                  const isActive = locale === lang.code;

                  return (
                    <button
                      key={lang.code}
                      type="button"
                      disabled={isPending}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={cn(
                        'flex min-h-15.5 sm:min-h-21.25 md:min-h-23 cursor-pointer items-center justify-between rounded-xl sm:rounded-2xl border-2 px-5 py-4 sm:px-6 sm:py-5 md:py-6 transition-all duration-200 hover:scale-[1.01]',
                        isActive
                          ? 'border-accent bg-slate-900/90 shadow-sm'
                          : 'border-slate-700/60 bg-slate-900/40 hover:border-slate-600',
                      )}
                    >
                      <div className="flex items-center gap-3.5 sm:gap-4">
                        <Image
                          src={lang.flag}
                          alt=""
                          width={24}
                          height={16}
                          className="rounded-xs object-contain sm:w-7 sm:h-4.75"
                        />
                        <span className="text-sm font-bold text-white sm:text-lg">{lang.title}</span>
                      </div>
                      {isActive && <Check className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-accent" />}
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
