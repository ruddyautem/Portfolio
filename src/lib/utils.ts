import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SCROLL_STORAGE_KEY = 'portfolio_scroll_restore';

export function saveScrollPosition(): void {
  if (typeof window === 'undefined') return;
  const desktopEl = document.getElementById('main-scroll-container');
  if (desktopEl && desktopEl.scrollTop > 0) {
    sessionStorage.setItem(SCROLL_STORAGE_KEY, desktopEl.scrollTop.toString());
    return;
  }
  const scrollable = Array.from(document.querySelectorAll<HTMLElement>('.overflow-y-auto')).find(
    (el) => el.scrollTop > 0,
  );
  if (scrollable && scrollable.scrollTop > 0) {
    sessionStorage.setItem(SCROLL_STORAGE_KEY, scrollable.scrollTop.toString());
  }
}

export function restoreScrollPosition(): void {
  if (typeof window === 'undefined') return;
  const saved = sessionStorage.getItem(SCROLL_STORAGE_KEY);
  if (!saved) return;
  sessionStorage.removeItem(SCROLL_STORAGE_KEY);
  const scrollPos = parseInt(saved, 10);
  if (isNaN(scrollPos) || scrollPos <= 0) return;

  const restore = () => {
    const desktopEl = document.getElementById('main-scroll-container');
    if (desktopEl) {
      desktopEl.scrollTop = scrollPos;
      return;
    }
    const scrollable = Array.from(document.querySelectorAll<HTMLElement>('.overflow-y-auto')).find(
      (el) => el.scrollHeight > el.clientHeight,
    );
    if (scrollable) {
      scrollable.scrollTop = scrollPos;
    }
  };

  requestAnimationFrame(restore);
  setTimeout(restore, 30);
  setTimeout(restore, 100);
}
