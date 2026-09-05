'use client';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import {
  forwardRef,
  memo,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Minimize, Restore, Close } from '../Icons/Icons';
import { ThemeContext } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { LANGUAGES, THEME_OPTIONS, THEME_DOT_COLORS, THEME_LABELS } from '@/lib/constants';
import { ChevronDown, CheckIcon } from '@/lib/icons';
import dynamic from 'next/dynamic';

const CommandPalette = dynamic(() => import('@/components/CommandPalette/CommandPalette'), {
  ssr: false,
});

// ----------------------------------------------------------------------------------
// Constants
// ----------------------------------------------------------------------------------
const ICON_SIZE = 15;

const LOGO_CONFIG = {
  src: '/vsclogo.svg',
  alt: 'VSC Logo',
};

const SEARCH_BAR_WIDTH = 'clamp(220px, 85vw, 640px)';

const OVERFLOW_SAFETY_BUFFER = 6;

// ----------------------------------------------------------------------------------
// Small pieces
// ----------------------------------------------------------------------------------
const MenuItem = memo(({ item }: { item: string }) => (
  <li
    className="shrink-0 cursor-pointer whitespace-nowrap rounded-md px-2 py-0.5 transition-colors
      hover:bg-white/10"
  >
    {item}
  </li>
));
MenuItem.displayName = 'MenuItem';

const IconButton = memo(({ icon: Icon, onClick, variant = 'default', tabIndex, ...rest }: any) => (
  <button
    onClick={onClick}
    tabIndex={tabIndex}
    className={cn(
      'cursor-pointer px-3 py-2 transition-colors',
      variant === 'danger' ? 'hover:bg-red-500' : 'hover:bg-white/10',
    )}
    aria-label={Icon.name || 'Menu action'}
    {...rest}
  >
    <Icon />
  </button>
));
IconButton.displayName = 'IconButton';

const NavIcon = memo(
  ({ src, alt, className = '' }: { src: string; alt: string; className?: string }) => (
    <Image src={src} width={ICON_SIZE} height={ICON_SIZE} alt={alt} className={className} />
  ),
);
NavIcon.displayName = 'NavIcon';

const NavButton = memo(
  ({ icon, alt, disabled = false }: { icon: string; alt: string; disabled?: boolean }) => (
    <button
      disabled={disabled}
      className={cn(
        'hidden h-6 w-7 items-center justify-center rounded-md transition-colors lg:flex',
        disabled ? 'cursor-not-allowed opacity-30' : 'cursor-pointer hover:bg-white/5',
      )}
      aria-label={alt}
    >
      <NavIcon src={icon} alt={alt} />
    </button>
  ),
);
NavButton.displayName = 'NavButton';

const MoreButton = forwardRef<HTMLButtonElement, any>(({ onClick, isOpen, ...props }, ref) => (
  <button
    ref={ref}
    onClick={onClick}
    type="button"
    className={cn(
      'flex shrink-0 cursor-pointer items-center rounded-md px-2 py-0.5 text-xs tracking-widest',
      'transition-colors hover:bg-white/10',
      isOpen && 'bg-white/10',
    )}
    aria-hidden={!onClick}
    {...props}
  >
    •••
  </button>
));
MoreButton.displayName = 'MoreButton';

const useOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef<any>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      const insideAnchor = anchorRef.current?.contains(target);
      const insideOverlay = overlayRef.current?.contains(target);
      if (!insideAnchor && !insideOverlay) close();
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, close]);

  return { isOpen, setIsOpen, close, toggle, anchorRef, overlayRef };
};

interface AnchoredPortalProps {
  anchorRef: React.RefObject<any>;
  overlayRef: React.RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  align?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

const AnchoredPortal = ({
  anchorRef,
  overlayRef,
  isOpen,
  align = 'left',
  className,
  children,
}: AnchoredPortalProps) => {
  const [coords, setCoords] = useState<{ top: number; left?: number; right?: number } | null>(null);

  const updatePosition = useCallback(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    setCoords(
      align === 'right'
        ? { top: rect.bottom + 4, right: window.innerWidth - rect.right }
        : { top: rect.bottom + 4, left: rect.left },
    );
  }, [anchorRef, align]);

  useLayoutEffect(() => {
    if (isOpen) updatePosition();
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen, updatePosition]);

  if (!isOpen || !coords || typeof document === 'undefined') return null;

  return createPortal(
    <div
      ref={overlayRef}
      style={{ position: 'fixed', top: coords.top, left: coords.left, right: coords.right }}
      className={cn('z-9999 animate-in fade-in slide-in-from-top-1 duration-150', className)}
    >
      {children}
    </div>,
    document.body,
  );
};
const useOverflowMenu = (items: string[]) => {
  const containerRef = useRef<HTMLUListElement>(null);
  const measureRef = useRef<HTMLUListElement>(null);
  const [visibleCount, setVisibleCount] = useState(items.length);

  const recalc = useCallback(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const containerWidth = container.offsetWidth - OVERFLOW_SAFETY_BUFFER;
    const children = Array.from(measure.children) as HTMLElement[];
    if (children.length < 2) return;

    const logoWidth = children[0].offsetWidth;
    const moreWidth = children[children.length - 1].offsetWidth;
    const itemWidths = children.slice(1, children.length - 1).map((c) => c.offsetWidth);

    const totalWidth = logoWidth + itemWidths.reduce((sum, w) => sum + w, 0);

    if (totalWidth <= containerWidth) {
      setVisibleCount(itemWidths.length);
      return;
    }

    let total = logoWidth;
    let count = 0;
    for (let i = 0; i < itemWidths.length; i++) {
      total += itemWidths[i];
      if (total + moreWidth > containerWidth) break;
      count = i + 1;
    }
    setVisibleCount(count);
  }, []);

  useLayoutEffect(() => {
    // Same DOM-measurement-before-paint pattern as AnchoredPortal above.
    recalc();
  }, [recalc, items]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(() => recalc());
    observer.observe(container);
    return () => observer.disconnect();
  }, [recalc]);

  return { containerRef, measureRef, visibleCount };
};

// ----------------------------------------------------------------------------------
// Left menu bar
// ----------------------------------------------------------------------------------
const MenuNav = memo(() => {
  const t = useTranslations('menu');

  const MENU_ITEMS = useMemo(
    () => [
      t('file'),
      t('edit'),
      t('selection'),
      t('view'),
      t('go'),
      t('run'),
      t('terminal'),
      t('help'),
    ],
    [t],
  );

  const { containerRef, measureRef, visibleCount } = useOverflowMenu(MENU_ITEMS);
  const {
    isOpen: isMoreOpen,
    toggle: toggleMore,
    close: closeMore,
    anchorRef,
    overlayRef,
  } = useOverlay();

  const visibleItems = MENU_ITEMS.slice(0, visibleCount);
  const hiddenItems = MENU_ITEMS.slice(visibleCount);

  useEffect(() => {
    if (hiddenItems.length === 0) closeMore();
  }, [hiddenItems.length, closeMore]);

  return (
    <nav
      className="text-light col-start-1 hidden h-8 min-w-0 overflow-hidden text-xs font-semibold
        text-opacity-80 lg:flex"
    >
      <ul ref={containerRef} className="flex min-w-0 w-full items-center overflow-hidden">
        <li className="mx-2 shrink-0">
          <NavIcon src={LOGO_CONFIG.src} alt={LOGO_CONFIG.alt} />
        </li>

        {visibleItems.map((item) => (
          <MenuItem key={item} item={item} />
        ))}

        {hiddenItems.length > 0 && (
          <li ref={anchorRef} className="shrink-0">
            <MoreButton onClick={toggleMore} isOpen={isMoreOpen} />
          </li>
        )}
      </ul>

      <AnchoredPortal
        anchorRef={anchorRef}
        overlayRef={overlayRef}
        isOpen={isMoreOpen}
        align="left"
      >
        <ul
          role="menu"
          className="bg-menu w-40 overflow-hidden rounded-md border border-white/10 py-1 shadow-lg"
        >
          {hiddenItems.map((item) => (
            <li key={item} role="none">
              <button
                role="menuitem"
                type="button"
                onClick={closeMore}
                className="w-full cursor-pointer px-3 py-1.5 text-left text-xs transition-colors
                  hover:bg-white/10"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </AnchoredPortal>

      <ul
        ref={measureRef}
        aria-hidden="true"
        className="pointer-events-none flex items-center"
        style={{
          position: 'absolute',
          top: 0,
          left: -9999,
          visibility: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <li className="mx-2 shrink-0">
          <NavIcon src={LOGO_CONFIG.src} alt="" />
        </li>
        {MENU_ITEMS.map((item) => (
          <MenuItem key={item} item={item} />
        ))}
        <li className="shrink-0">
          <MoreButton />
        </li>
      </ul>
    </nav>
  );
});
MenuNav.displayName = 'MenuNav';

// ----------------------------------------------------------------------------------
// Language switcher
// ----------------------------------------------------------------------------------
const LanguageMenu = memo(({ className }: { className?: string }) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('menu');
  const [isPending, startTransition] = useTransition();
  const { isOpen, toggle, close, anchorRef, overlayRef } = useOverlay();

  const currentLanguage = LANGUAGES.find((lang) => lang.code === locale) ?? LANGUAGES[0];

  const switchLanguage = useCallback(
    (nextLocale: string) => {
      close();
      if (locale === nextLocale) return;
      startTransition(() => {
        router.replace(pathname, { locale: nextLocale as any });
      });
    },
    [locale, pathname, router, close],
  );

  return (
    <div ref={anchorRef} className={cn('relative shrink-0', className)}>
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={t('language') ?? 'Language'}
        title={t('language') ?? 'Language'}
        disabled={isPending}
        className={cn(
          `flex h-5 cursor-pointer items-center gap-0.5 rounded px-1 text-white/70
          transition-colors`,
          'hover:bg-white/10 hover:text-white sm:h-5.5 sm:gap-1 sm:px-1.5',
          isOpen && 'bg-white/10 text-white',
          isPending && 'opacity-50',
        )}
      >
        <Image
          src={currentLanguage.flag}
          alt=""
          width={16}
          height={12}
          className="h-2.5 w-3.5 rounded-xs object-contain sm:h-3 sm:w-4"
        />
        <ChevronDown
          className={cn(
            'h-2 w-2 sm:h-2.5 sm:w-2.5 transition-transform duration-150',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      <AnchoredPortal anchorRef={anchorRef} overlayRef={overlayRef} isOpen={isOpen} align="right">
        <ul
          role="menu"
          aria-label="Select language"
          className="bg-menu w-40 overflow-hidden rounded-md border border-white/10 py-1 shadow-lg"
        >
          {LANGUAGES.map((lang) => {
            const isActive = locale === lang.code;
            return (
              <li key={lang.code} role="none">
                <button
                  role="menuitem"
                  type="button"
                  onClick={() => switchLanguage(lang.code)}
                  disabled={isPending}
                  className={cn(
                    `flex w-full cursor-pointer items-center gap-2 px-3 py-1.5 text-left text-[11px]
                    font-medium`,
                    'transition-colors hover:bg-white/10',
                    isActive ? 'text-white' : 'text-white/60',
                  )}
                >
                  <Image
                    src={lang.flag}
                    alt=""
                    width={15}
                    height={11}
                    className="rounded-sm object-contain"
                  />
                  <span>{lang.title}</span>
                  {isActive && <CheckIcon className="ml-auto text-white" />}
                </button>
              </li>
            );
          })}
        </ul>
      </AnchoredPortal>
    </div>
  );
});
LanguageMenu.displayName = 'LanguageMenu';

// ----------------------------------------------------------------------------------
// Theme switcher
// ----------------------------------------------------------------------------------
const ThemeMenu = memo(({ className }: { className?: string }) => {
  const { theme, toggle: setTheme } = useContext(ThemeContext);
  const { isOpen, toggle, close, anchorRef, overlayRef } = useOverlay();

  const handleThemeSelect = useCallback(
    (option: any) => {
      setTheme(option);
      close();
    },
    [setTheme, close],
  );

  return (
    <div ref={anchorRef} className={cn('relative shrink-0', className)}>
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Theme"
        title="Theme"
        className={cn(
          `flex h-5 cursor-pointer items-center gap-0.5 rounded px-1 text-white/70
          transition-colors`,
          'hover:bg-white/10 hover:text-white sm:h-5.5 sm:gap-1 sm:px-1.5',
          isOpen && 'bg-white/10 text-white',
        )}
      >
        <span
          className={cn(
            'h-2 w-2 shrink-0 rounded-full ring-1 ring-white/30 sm:h-2.5 sm:w-2.5',
            THEME_DOT_COLORS[theme],
          )}
        />
        <ChevronDown
          className={cn(
            'h-2 w-2 sm:h-2.5 sm:w-2.5 transition-transform duration-150',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      <AnchoredPortal anchorRef={anchorRef} overlayRef={overlayRef} isOpen={isOpen} align="right">
        <ul
          role="menu"
          aria-label="Select theme"
          className="bg-menu w-40 overflow-hidden rounded-md border border-white/10 py-1 shadow-lg"
        >
          {THEME_OPTIONS.map((option) => {
            const isActive = theme === option;
            return (
              <li key={option} role="none">
                <button
                  role="menuitem"
                  type="button"
                  onClick={() => handleThemeSelect(option)}
                  className={cn(
                    `flex w-full cursor-pointer items-center gap-2 px-3 py-1.5 text-left text-[11px]
                    font-medium`,
                    'transition-colors hover:bg-white/10',
                    isActive ? 'text-white' : 'text-white/60',
                  )}
                >
                  <span className={cn('h-2.5 w-2.5 rounded-full', THEME_DOT_COLORS[option])} />
                  <span>{THEME_LABELS[option] ?? option}</span>
                  {isActive && <CheckIcon className="ml-auto text-white" />}
                </button>
              </li>
            );
          })}
        </ul>
      </AnchoredPortal>
    </div>
  );
});
ThemeMenu.displayName = 'ThemeMenu';

// ----------------------------------------------------------------------------------
// Main title bar
// ----------------------------------------------------------------------------------
const Menu = () => {
  const t = useTranslations('menu');
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  return (
    <>
      <CommandPalette open={isCommandOpen} setOpen={setIsCommandOpen} />
      <div
        className={cn(
          'bg-menu relative z-50 grid h-8 items-center',
          'grid-cols-[minmax(0,1fr)_auto_minmax(max-content,1fr)]',
        )}
      >
        <MenuNav />

        <div className="col-start-2 flex items-center justify-center gap-1.5 px-2 xl:ml-44">
          <NavButton icon="/arrow-left.svg" alt="Navigate back" />
          <div className="hidden lg:flex">
            <NavIcon src="/arrow-right.svg" alt="Navigate forward" className="mr-1 opacity-30" />
          </div>

          <div
            style={{ width: SEARCH_BAR_WIDTH }}
            className={cn(
              'hover:border-accent group relative flex h-7 shrink-0 items-center overflow-hidden',
              `rounded border border-gray-100/10 bg-gray-300/5 text-xs font-semibold text-light
              transition-colors`,
            )}
          >
            {/* Clickable search area with perfectly centered label */}
            <button
              type="button"
              onClick={() => setIsCommandOpen(true)}
              className="flex h-full w-full cursor-pointer items-center justify-center gap-1.5
                px-16"
              aria-label="Search portfolio (Ctrl+K)"
            >
              <NavIcon src="/search.svg" alt="Search" className="shrink-0 opacity-70" />
              <span className="truncate text-xs font-normal text-white/80">{t('search')}</span>
              <kbd
                className="ml-1 hidden rounded bg-white/10 px-1.5 py-0.5 font-mono text-[9px]
                  text-slate-400 sm:inline-block"
              >
                ⌘K
              </kbd>
            </button>

            {/* Embedded Language and Theme buttons pinned to the far right with slight vertical separators */}
            <div
              className="absolute right-1 top-1/2 flex -translate-y-1/2 items-center gap-0.5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-3 w-px bg-white/10" aria-hidden="true" />
              <ThemeMenu />
              <div className="h-3 w-px bg-white/10" aria-hidden="true" />
              <LanguageMenu />
            </div>
          </div>
        </div>

        <div
          className="col-start-3 flex min-w-0 items-center justify-end gap-0.5 overflow-hidden pr-1"
        >
          <div className="hidden items-center border-white/10 lg:flex" aria-hidden="true">
            <IconButton icon={Minimize} variant="default" tabIndex={-1} aria-hidden="true" />
            <IconButton icon={Restore} variant="default" tabIndex={-1} aria-hidden="true" />
            <IconButton icon={Close} variant="danger" tabIndex={-1} aria-hidden="true" />
          </div>
        </div>
      </div>
    </>
  );
};

export { useOverlay, AnchoredPortal };
export default memo(Menu);
