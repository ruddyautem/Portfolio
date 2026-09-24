'use client';

import { useCallback, useEffect, useState, useTransition } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { NAV_ITEMS } from '@/lib/constants';

import HomepageContent from '@/components/HomepageContent/HomepageContent';
import AboutContent from '@/components/AboutContent/AboutContent';
import ProjectsContent from '@/components/ProjectsContent/ProjectsContent';
import ContactList from '@/components/ContactList/ContactList';
import CVContent from '@/components/CVContent/CVContent';
import SettingsContent from '@/components/Settings/SettingsContent';
import { restoreScrollPosition } from '@/lib/utils';

interface SwipeNavigatorProps {
  children: React.ReactNode;
  className?: string;
}

export default function SwipeNavigator({ children, className }: SwipeNavigatorProps) {
  const currentRoute = usePathname();
  const locale = useLocale();
  const t = useTranslations('menu');
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const checkIsActive = useCallback(
    (link: string) => {
      if (link === '/') {
        return currentRoute === '/' || currentRoute === `/${locale}` || currentRoute === '';
      }
      return (
        currentRoute === link ||
        currentRoute === `/${locale}${link}`
      );
    },
    [currentRoute, locale],
  );

  const activeIndex = NAV_ITEMS.findIndex((item) => checkIsActive(item.link));
  const [selectedIndex, setSelectedIndex] = useState(activeIndex === -1 ? 0 : activeIndex);
  const [showPeekAnimation, setShowPeekAnimation] = useState(false);
  const [showHandHint, setShowHandHint] = useState(false);

  // Initialize Embla carousel for contiguous 1:1 multi-page slider
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: activeIndex !== -1 ? activeIndex : 0,
    loop: false,
    duration: 45,
    skipSnaps: false,
    dragFree: false,
  });

  // Sync Carousel position when URL / Tab / MobileNav changes
  useEffect(() => {
    if (activeIndex === -1) return;

    // Keep rendered slides in sync with route-driven navigation too. Embla may
    // already be at the requested snap (and emit no `select` event), leaving
    // the destination slide unmounted after tapping a mobile nav button.
    setSelectedIndex(activeIndex);

    if (emblaApi && emblaApi.selectedScrollSnap() !== activeIndex) {
      emblaApi.scrollTo(activeIndex);
    }
  }, [activeIndex, emblaApi]);

  // Sync active item immediately on select (instant feedback on MobileNav / Tabsbar)
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const selectedIndex = emblaApi.selectedScrollSnap();
      setSelectedIndex(selectedIndex);
      const targetItem = NAV_ITEMS[selectedIndex];
      if (targetItem) {
        // Dispatch instant event for MobileNav and Tabsbar with 0ms latency
        window.dispatchEvent(
          new CustomEvent('swipe-nav-change', {
            detail: { index: selectedIndex, link: targetItem.link },
          }),
        );
      }
    };

    const onSettle = () => {
      const selectedIndex = emblaApi.selectedScrollSnap();
      const targetItem = NAV_ITEMS[selectedIndex];
      if (targetItem && !checkIsActive(targetItem.link)) {
        startTransition(() => {
          router.replace(targetItem.link, { scroll: false });
        });
      }
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('settle', onSettle);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('settle', onSettle);
    };
  }, [emblaApi, checkIsActive, router]);

  // Dismiss hand hint immediately if user touches or interacts with the carousel
  useEffect(() => {
    if (!emblaApi) return;
    const dismiss = () => {
      setShowHandHint(false);
      setShowPeekAnimation(false);
    };
    emblaApi.on('pointerDown', dismiss);
    emblaApi.on('scroll', dismiss);
    return () => {
      emblaApi.off('pointerDown', dismiss);
      emblaApi.off('scroll', dismiss);
    };
  }, [emblaApi]);

  // Option 3: Natural peek nudge animation on initial mobile landing
  useEffect(() => {
    if (window.innerWidth >= 1024) return;
    const STORAGE_KEY = 'portfolio_peek_seen_v11';
    const hasSeen = localStorage.getItem(STORAGE_KEY);
    if (!hasSeen) {
      // Trigger gentle edge hint after 800ms
      const peekTimer = setTimeout(() => {
        setShowPeekAnimation(true);
        setShowHandHint(true);
        try {
          localStorage.setItem(STORAGE_KEY, 'true');
          } catch {
            // Ignore unavailable local storage.
          }
      }, 800);

      // Smooth unmount after 1600ms
      const cleanupTimer = setTimeout(() => {
        setShowPeekAnimation(false);
        setShowHandHint(false);
      }, 2450);

      return () => {
        clearTimeout(peekTimer);
        clearTimeout(cleanupTimer);
      };
    }
  }, []);

  // Restore scroll position after a language switch
  useEffect(() => {
    restoreScrollPosition();
  }, [locale]);

  // Desktop (>= 1024px) keeps the native standard page rendering
  if (!isMobileOrTablet) {
    return (
      <div id="main-scroll-container" className={className}>
        {children}
      </div>
    );
  }

  // Nested, unknown, and error routes use their actual route content on mobile.
  if (activeIndex === -1) {
    return (
      <div id="main-scroll-container" className={className}>
        {children}
      </div>
    );
  }

  // Mobile / Tablet (< 1024px): Multi-page continuous horizontal slider (Discord/Twitter style)
  const slideClasses =
    'flex-[0_0_100%] min-w-0 font-inconsolata text-light h-[calc(100dvh-88px)] sm:h-[calc(100dvh-116px)] md:h-[calc(100dvh-124px)] overflow-y-auto overflow-x-hidden';
  const slides = [
    <HomepageContent key="home" />,
    <AboutContent key="about" />,
    <ProjectsContent key="projects" />,
    <ContactList key="contact" />,
    <CVContent key="cv" />,
    <SettingsContent key="settings" />,
  ];

  return (
    <div
      className="relative flex-1 w-full overflow-hidden flex flex-col min-w-0 h-[calc(100dvh-88px)] sm:h-[calc(100dvh-116px)] md:h-[calc(100dvh-124px)]"
      ref={emblaRef}
    >
      {/* Subtle right-edge indicator (docked flush against edge, smooth fade, no bounce) */}
      {showHandHint && (
        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 z-40 flex items-center">
          <div className="animate-edge-hint flex items-center gap-2 rounded-l-xl border-y border-l border-slate-700/80 bg-slate-900/90 py-2.5 pl-3 pr-2 shadow-2xl backdrop-blur-md">
            <span className="text-[11px] font-mono font-medium tracking-wider text-slate-300">
              {t('swipeHint')}
            </span>
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-accent/20 text-accent">
              <svg
                className="h-3 w-3 stroke-[2.5]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </div>
          </div>
        </div>
      )}

      <div className={`flex h-full w-full touch-pan-y ${showPeekAnimation ? 'animate-swipe-peek' : ''}`}>
        {slides.map((slide, index) => {
          const isActive = index === selectedIndex;
          const shouldMount = Math.abs(index - selectedIndex) <= 1;

          return (
            <div key={index} className={slideClasses} aria-hidden={!isActive} inert={!isActive}>
              {shouldMount ? slide : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
