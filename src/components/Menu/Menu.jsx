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

// ----------------------------------------------------------------------------------
// Constants
// ----------------------------------------------------------------------------------
const ICON_SIZE = 15;

const LOGO_CONFIG = {
  src: '/vsclogo.svg',
  alt: 'VSC Logo',
};

const LANGUAGES = [
  { code: 'en', label: 'EN', title: 'English', flag: '/en.svg' },
  { code: 'fr', label: 'FR', title: 'Français', flag: '/fr.svg' },
];

const THEME_OPTIONS = ['ayu', 'oneDarkPro', 'dracula', 'poimandres'];

const THEME_DOT_COLORS = {
  ayu: 'bg-[#ffcc66]',
  oneDarkPro: 'bg-[#98c379]',
  dracula: 'bg-[#ff79c6]',
  poimandres: 'bg-[#5de4c7]',
};

const SEARCH_BAR_WIDTH = 'clamp(220px, 85vw, 640px)';

const OVERFLOW_SAFETY_BUFFER = 6;

// ----------------------------------------------------------------------------------
// Inline icons
// ----------------------------------------------------------------------------------
const ChevronDown = ({ className }) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M2 3.5L5 6.5L8 3.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M2.5 6.2L4.8 8.5L9.5 3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ----------------------------------------------------------------------------------
// Small pieces
// ----------------------------------------------------------------------------------
const MenuItem = memo(({ item }) => (
  <li
    className="shrink-0 cursor-pointer whitespace-nowrap rounded-md px-2 py-0.5 transition-colors
      hover:bg-white/10"
  >
    {item}
  </li>
));
MenuItem.displayName = 'MenuItem';

const IconButton = memo(({ icon: Icon, onClick, variant = 'default' }) => (
  <button
    onClick={onClick}
    className={cn(
      'cursor-pointer px-3 py-2 transition-colors',
      variant === 'danger' ? 'hover:bg-red-500' : 'hover:bg-white/10',
    )}
    aria-label={Icon.name || 'Menu action'}
  >
    <Icon />
  </button>
));
IconButton.displayName = 'IconButton';

const NavIcon = memo(({ src, alt, className = '' }) => (
  <Image src={src} width={ICON_SIZE} height={ICON_SIZE} alt={alt} className={className} />
));
NavIcon.displayName = 'NavIcon';

const NavButton = memo(({ icon, alt, disabled = false }) => (
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
));
NavButton.displayName = 'NavButton';

// Shared "more" (…) button markup, used both for real rendering and for measuring.
const MoreButton = forwardRef(({ onClick, isOpen, ...props }, ref) => (
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
  const anchorRef = useRef(null);
  const overlayRef = useRef(null);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event) => {
      const target = event.target;
      const insideAnchor = anchorRef.current?.contains(target);
      const insideOverlay = overlayRef.current?.contains(target);
      if (!insideAnchor && !insideOverlay) close();
    };
    const handleEscape = (event) => {
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

const AnchoredPortal = ({ anchorRef, overlayRef, isOpen, align = 'left', className, children }) => {
  const [coords, setCoords] = useState(null);

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
const useOverflowMenu = (items) => {
  const containerRef = useRef(null);
  const measureRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(items.length);

  const recalc = useCallback(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const containerWidth = container.offsetWidth - OVERFLOW_SAFETY_BUFFER;
    const children = Array.from(measure.children);
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
const LanguageMenu = memo(({ className }) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('menu');
  const [isPending, startTransition] = useTransition();
  const { isOpen, toggle, close, anchorRef, overlayRef } = useOverlay();

  const currentLanguage = LANGUAGES.find((lang) => lang.code === locale) ?? LANGUAGES[0];

  const switchLanguage = useCallback(
    (nextLocale) => {
      close();
      if (locale === nextLocale) return;
      startTransition(() => {
        router.replace(pathname, { locale: nextLocale });
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
          'flex h-6 cursor-pointer items-center gap-1 rounded-xs px-1.5',
          'text-white/80 transition-colors hover:bg-white/10',
          isOpen && 'bg-white/10',
          isPending && 'opacity-50',
        )}
      >
        <Image
          src={currentLanguage.flag}
          alt=""
          width={16}
          height={12}
          className="rounded-sm object-contain"
        />
        <ChevronDown className={cn('transition-transform duration-150', isOpen && 'rotate-180')} />
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
const ThemeMenu = memo(({ className }) => {
  const { theme, toggle: setTheme } = useContext(ThemeContext);
  const { isOpen, toggle, close, anchorRef, overlayRef } = useOverlay();

  const handleThemeSelect = useCallback(
    (option) => {
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
          'flex h-6 cursor-pointer items-center gap-1 rounded-xs px-1.5',
          'text-white/80 transition-colors hover:bg-white/10',
          isOpen && 'bg-white/10',
        )}
      >
        <span
          className={cn(
            'h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-white/30',
            THEME_DOT_COLORS[theme],
          )}
        />
        <ChevronDown className={cn('transition-transform duration-150', isOpen && 'rotate-180')} />
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
                    font-medium capitalize`,
                    'transition-colors hover:bg-white/10',
                    isActive ? 'text-white' : 'text-white/60',
                  )}
                >
                  <span className={cn('h-2.5 w-2.5 rounded-full', THEME_DOT_COLORS[option])} />
                  <span>{option}</span>
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

  return (
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

        <button
          style={{ width: SEARCH_BAR_WIDTH }}
          className={cn(
            `hover:border-accent flex h-7 shrink-0 cursor-pointer items-center justify-center
            overflow-hidden`,
            `rounded border border-gray-100/5 bg-gray-300/5 text-xs font-semibold text-light
            transition-colors`,
          )}
          aria-label="Search portfolio"
        >
          <NavIcon src="/search.svg" alt="Search" className="mr-1 shrink-0" />
          <span className="truncate">{t('search')}</span>
        </button>
      </div>

      <div
        className="col-start-3 flex min-w-0 items-center justify-end gap-0.5 overflow-hidden pr-1"
      >
        <LanguageMenu className="hidden lg:flex" />
        <ThemeMenu className="hidden lg:flex" />

        <div className="ml-1 hidden items-center border-l border-white/10 pl-1 lg:flex">
          <IconButton icon={Minimize} variant="default" />
          <IconButton icon={Restore} variant="default" />
          <IconButton icon={Close} variant="danger" />
        </div>
      </div>
    </div>
  );
};

export default memo(Menu);
