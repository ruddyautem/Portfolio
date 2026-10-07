'use client';

import { useEffect, useState, useTransition } from 'react';
import { usePathname } from '@/i18n/routing';

const LINE_HEIGHT = 24; // 24px per line (h-6 leading-6)

interface LineNumbersGutterProps {
  contentRef?: React.RefObject<HTMLDivElement | null>;
}

export default function LineNumbersGutter({ contentRef }: LineNumbersGutterProps) {
  const [lineCount, setLineCount] = useState(25);
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  useEffect(() => {
    const updateCount = () => {
      const el = contentRef?.current;
      if (!el) return;

      const containerRect = el.getBoundingClientRect();
      const topPadding = window.innerWidth >= 1536 ? 64 : 56;

      // Specifically check for the technology carousel (homepage)
      const techSection = el.querySelector<HTMLElement>('[data-tech-carousel]');

      let availableHeight: number;
      if (techSection) {
        const techRect = techSection.getBoundingClientRect();
        // Distance from the top of the container to the bottom of the technology carousel
        const bottomOffset = techRect.bottom - containerRect.top;
        availableHeight = bottomOffset - topPadding;
      } else {
        // For other pages, anchor to the bottom of the content card
        const cardInner = el.querySelector<HTMLElement>('.relative.z-10');
        if (cardInner) {
          const cardRect = cardInner.getBoundingClientRect();
          const bottomOffset = cardRect.bottom - containerRect.top;
          availableHeight = bottomOffset - topPadding;
        } else {
          const height = el.offsetHeight || el.clientHeight || el.scrollHeight;
          if (!height || height <= 0) return;
          availableHeight = height - topPadding;
        }
      }

      if (availableHeight <= 0) return;

      // Calculate lines so numbers stop cleanly at the bottom of the carousel / content
      const calculated = Math.max(1, Math.round(availableHeight / LINE_HEIGHT));

      startTransition(() => {
        setLineCount(calculated);
      });
    };

    updateCount();
    const timer1 = setTimeout(updateCount, 60);
    const timer2 = setTimeout(updateCount, 150);
    const timer3 = setTimeout(updateCount, 350);

    const el = contentRef?.current;
    let observer: ResizeObserver | null = null;
    if (el && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => {
        updateCount();
      });
      observer.observe(el);
    }

    window.addEventListener('resize', updateCount);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      observer?.disconnect();
      window.removeEventListener('resize', updateCount);
    };
  }, [pathname, contentRef]);

  return (
    <div
      aria-hidden="true"
      className="hidden h-full w-full flex-col pt-12 select-none lg:flex lg:pt-14 2xl:pt-16"
    >
      <aside className="flex w-full flex-col items-center border-r border-white/8">
        {Array.from({ length: lineCount }, (_, i) => {
          const lineNum = i + 1;
          return (
            <span
              key={lineNum}
              className="flex h-6 w-full cursor-default items-center justify-center text-center font-inconsolata text-[14.5px] font-normal tracking-wide text-[#787f8d] transition-colors duration-100 select-none hover:text-accent"
            >
              {lineNum}
            </span>
          );
        })}
      </aside>
    </div>
  );
}
