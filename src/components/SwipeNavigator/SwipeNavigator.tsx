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
      setIsMobileOrTablet(window.innerWidth < 1280);
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
        currentRoute === `/${locale}${link}` ||
        currentRoute.endsWith(link)
      );
    },
    [currentRoute, locale],
  );

  const activeIndex = NAV_ITEMS.findIndex((item) => checkIsActive(item.link));

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
    if (!emblaApi || activeIndex === -1) return;
    if (emblaApi.selectedScrollSnap() !== activeIndex) {
      emblaApi.scrollTo(activeIndex);
    }
  }, [activeIndex, emblaApi]);

  // Sync active item immediately on select (instant feedback on MobileNav / Tabsbar)
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const selectedIndex = emblaApi.selectedScrollSnap();
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
  const [showPeekAnimation, setShowPeekAnimation] = useState(false);
  const [showHandHint, setShowHandHint] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 1280) return;
    const STORAGE_KEY = 'portfolio_peek_seen_v9';
    const hasSeen = localStorage.getItem(STORAGE_KEY);
    if (!hasSeen) {
      // Trigger peek animation after 1 second (1000ms)
      const peekTimer = setTimeout(() => {
        setShowPeekAnimation(true);
        setShowHandHint(true);
        try {
          localStorage.setItem(STORAGE_KEY, 'true');
        } catch {}
      }, 1000);

      // Animation slides away and unmounts cleanly (1000ms delay + 1900ms duration = 2900ms)
      const cleanupTimer = setTimeout(() => {
        setShowPeekAnimation(false);
        setShowHandHint(false);
      }, 3000);

      return () => {
        clearTimeout(peekTimer);
        clearTimeout(cleanupTimer);
      };
    }
  }, []);

  // Desktop (>= 1280px) keeps the native standard page rendering
  if (!isMobileOrTablet) {
    return <div className={className}>{children}</div>;
  }

  // Mobile / Tablet (< 1280px): Multi-page continuous horizontal slider (Discord/Twitter style)
  const slideClasses =
    'flex-[0_0_100%] min-w-0 font-inconsolata text-light h-[calc(100dvh-88px)] sm:h-[calc(100dvh-116px)] md:h-[calc(100dvh-124px)] overflow-y-auto overflow-x-hidden';

  return (
    <div
      className="relative flex-1 w-full overflow-hidden flex flex-col min-w-0 h-[calc(100dvh-88px)] sm:h-[calc(100dvh-116px)] md:h-[calc(100dvh-124px)]"
      ref={emblaRef}
    >
      {/* Discreet modern right edge tab indicator */}
      {showHandHint && (
        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 z-30 flex items-center">
          <div className="animate-edge-hint flex items-center gap-1.5 rounded-l-full border-y border-l border-accent/40 bg-slate-900/90 py-3 pl-2.5 pr-2 shadow-2xl backdrop-blur-md">
            <svg
              className="h-4 w-4 text-accent drop-shadow-[0_0_6px_rgba(255,204,102,0.8)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="text-[11px] font-semibold tracking-wider text-accent drop-shadow-sm pr-1">
              {t('swipeHint')}
            </span>
          </div>
        </div>
      )}

      <div className={`flex h-full w-full touch-pan-y ${showPeekAnimation ? 'animate-swipe-peek' : ''}`}>
        {/* Slide 0: Home */}
        <div className={slideClasses}>
          <HomepageContent />
        </div>

        {/* Slide 1: About */}
        <div className={slideClasses}>
          <AboutContent />
        </div>

        {/* Slide 2: Projects */}
        <div className={slideClasses}>
          <ProjectsContent />
        </div>

        {/* Slide 3: Contact */}
        <div className={slideClasses}>
          <ContactList />
        </div>

        {/* Slide 4: CV */}
        <div className={slideClasses}>
          <CVContent />
        </div>

        {/* Slide 5: Settings */}
        <div className={slideClasses}>
          <SettingsContent />
        </div>
      </div>
    </div>
  );
}