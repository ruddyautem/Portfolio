'use client';

import { useContext, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Folder as FolderClosedIcon, FolderOpen } from 'lucide-react';

import { Link, usePathname } from '@/i18n/routing';
import { ThemeContext } from '@/context/ThemeContext';
import { useTranslations } from 'next-intl';
import { NAV_ITEMS, TABS_NAV_ICONS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import {
  Files,
  FolderItem,
  FolderHeader,
  FolderTrigger,
  FolderHighlight,
  FolderIcon,
  FileLabel,
  FolderContent,
  FileHighlight,
  File,
  FileIcon,
} from '@/components/ui/primitives-animate-files';

const rowClass =
  'flex items-center gap-2 rounded-md px-2 py-1 text-[13px] text-light select-none transition-colors';

function FolderRow({
  label,
  defaultOpen = false,
  highlight = false,
  children,
}: {
  label: string;
  defaultOpen?: boolean;
  highlight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <FolderItem defaultOpen={defaultOpen} className="w-full">
      <FolderHeader>
        <FolderTrigger className="group w-full cursor-pointer text-start bg-transparent border-0 p-0 outline-none">
          <FolderHighlight className="w-full">
            <div
              className={cn(
                rowClass,
                'transition-colors group-hover:text-accent',
                highlight ? 'text-accent font-medium' : 'text-light/90',
              )}
            >
              <FolderIcon
                openIcon={<FolderOpen className="size-4 text-accent shrink-0" />}
                closeIcon={<FolderClosedIcon className="size-4 text-accent/80 shrink-0" />}
              />
              <FileLabel className="font-medium text-lighter transition-colors group-hover:text-accent">
                {label}
              </FileLabel>
            </div>
          </FolderHighlight>
        </FolderTrigger>
      </FolderHeader>
      <FolderContent className="ml-3.5 border-l border-white/10 pl-2 space-y-0.5">
        {children}
      </FolderContent>
    </FolderItem>
  );
}

function FileRow({
  icon,
  name,
  link,
  highlight = false,
  onSelect,
}: {
  icon: React.ReactNode;
  name: string;
  link: string;
  highlight?: boolean;
  onSelect?: () => void;
}) {
  return (
    <FileHighlight className="w-full">
      <File>
        <Link
          href={link}
          prefetch={true}
          onClick={onSelect}
          className="group block w-full no-underline"
          aria-current={highlight ? 'page' : undefined}
        >
          <div
            className={cn(
              rowClass,
              'cursor-pointer transition-colors group-hover:text-accent',
              highlight ? 'text-accent font-semibold' : 'text-light/90',
            )}
          >
            <FileIcon>{icon}</FileIcon>
            <FileLabel className="truncate transition-colors group-hover:text-accent">
              {name}
            </FileLabel>
          </div>
        </Link>
      </File>
    </FileHighlight>
  );
}

const MIN_WIDTH = 160;
const MAX_WIDTH = 520;
const COLLAPSE_THRESHOLD = 80;
const DEFAULT_WIDTH = 224;

const Explorer = () => {
  const currentRoute = usePathname();
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const { theme } = useContext(ThemeContext);

  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [lastOpenWidth, setLastOpenWidth] = useState(DEFAULT_WIDTH);
  const [isDragging, setIsDragging] = useState(false);

  const tTabs = useTranslations('tabsbar');
  const tExp = useTranslations('explorer');

  // Load persisted width and collapsed state from localStorage
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const savedCollapsed = localStorage.getItem('explorer-collapsed');
      const savedLast = localStorage.getItem('explorer-last-open-width');
      const savedWidth = localStorage.getItem('explorer-width');

      if (savedLast) {
        const parsedLast = parseInt(savedLast, 10);
        if (!isNaN(parsedLast) && parsedLast >= MIN_WIDTH && parsedLast <= MAX_WIDTH) {
          setLastOpenWidth(parsedLast);
        }
      }

      if (savedCollapsed === 'true') {
        setWidth(0);
      } else if (savedWidth) {
        const parsed = parseInt(savedWidth, 10);
        if (!isNaN(parsed) && parsed >= MIN_WIDTH && parsed <= MAX_WIDTH) {
          setWidth(parsed);
          setLastOpenWidth(parsed);
        }
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const [prevRoute, setPrevRoute] = useState(currentRoute);
  if (prevRoute !== currentRoute) {
    setPrevRoute(currentRoute);
    setPendingRoute(null);
  }

  const effectiveRoute = pendingRoute ?? currentRoute;

  // Handle pointer down for drag resizing and collapse / pull-to-open
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setIsDragging(true);
      const startX = e.clientX;
      const initialWidth = width;
      let currentNewWidth = initialWidth;
      let hasDragged = false;

      const onPointerMove = (moveEvent: PointerEvent) => {
        const delta = moveEvent.clientX - startX;
        if (Math.abs(delta) > 3) {
          hasDragged = true;
        }

        if (initialWidth === 0) {
          // Pulling right from collapsed state
          if (delta > 20) {
            currentNewWidth = Math.min(Math.max(delta, MIN_WIDTH), MAX_WIDTH);
          } else {
            currentNewWidth = 0;
          }
        } else {
          // Dragging from open state
          const targetWidth = initialWidth + delta;
          if (targetWidth < COLLAPSE_THRESHOLD) {
            currentNewWidth = 0;
          } else {
            currentNewWidth = Math.min(Math.max(targetWidth, MIN_WIDTH), MAX_WIDTH);
          }
        }
        setWidth(currentNewWidth);
      };

      const onPointerUp = () => {
        setIsDragging(false);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';

        if (!hasDragged) {
          // Clicked the handle while collapsed: restore to lastOpenWidth!
          if (initialWidth === 0) {
            const restoreWidth = lastOpenWidth >= MIN_WIDTH ? lastOpenWidth : DEFAULT_WIDTH;
            setWidth(restoreWidth);
            localStorage.setItem('explorer-width', String(restoreWidth));
            localStorage.setItem('explorer-collapsed', 'false');
          }
          return;
        }

        // Finished dragging
        if (currentNewWidth === 0) {
          localStorage.setItem('explorer-collapsed', 'true');
          localStorage.setItem('explorer-width', '0');
        } else {
          localStorage.setItem('explorer-collapsed', 'false');
          localStorage.setItem('explorer-width', String(currentNewWidth));
          localStorage.setItem('explorer-last-open-width', String(currentNewWidth));
          setLastOpenWidth(currentNewWidth);
        }
      };

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    },
    [width, lastOpenWidth],
  );

  const handleDoubleClick = useCallback(() => {
    if (width === 0) {
      const restoreWidth = lastOpenWidth >= MIN_WIDTH ? lastOpenWidth : DEFAULT_WIDTH;
      setWidth(restoreWidth);
      localStorage.setItem('explorer-width', String(restoreWidth));
      localStorage.setItem('explorer-collapsed', 'false');
    } else {
      setWidth(DEFAULT_WIDTH);
      setLastOpenWidth(DEFAULT_WIDTH);
      localStorage.setItem('explorer-width', String(DEFAULT_WIDTH));
      localStorage.setItem('explorer-collapsed', 'false');
    }
  }, [width, lastOpenWidth]);

  const appItems = NAV_ITEMS.filter((item) => item.id !== 'settings');
  const settingsItem = NAV_ITEMS.find((item) => item.id === 'settings');

  const isCollapsed = width === 0;

  return (
    <div
      className={cn(
        'bg-explorer-bg text-accent relative hidden flex-col select-none xl:flex',
        isCollapsed ? 'w-0' : 'rounded-r-[9px]',
        isDragging ? 'transition-none' : 'transition-[width] duration-150 ease-out',
      )}
      style={{
        width: `${width}px`,
      }}
    >
      {/* Explorer Content (hidden when collapsed to 0) */}
      <div
        className={cn(
          'flex h-full w-full flex-col overflow-hidden',
          isCollapsed ? 'hidden' : 'flex',
        )}
      >
        {/* Explorer Header */}
        <div className="relative flex items-center justify-between after:pointer-events-none after:absolute after:inset-x-2 after:bottom-0 after:h-px after:bg-white/8">
          <p className="my-1 ml-4 flex h-5 items-center text-xs font-bold uppercase tracking-wider text-light/70">
            {tExp('title')}
          </p>
          <div className="mr-2 cursor-pointer rounded-sm p-0.5 hover:bg-white/5">
            <Image src="/ellipsis.svg" width={16} height={16} alt="" />
          </div>
        </div>

        {/* Portfolio Section */}
        <div className="text-darker flex flex-col flex-1 overflow-hidden">
          <button
            type="button"
            className="relative flex h-6 w-full cursor-pointer items-center text-[11px] font-bold uppercase text-left bg-transparent text-inherit after:pointer-events-none after:absolute after:inset-x-2 after:bottom-0 after:h-px after:bg-white/8 outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="explorer-nav-list"
          >
            <Image
              className={`transform transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
              src="/chevron.svg"
              width={16}
              height={16}
              alt=""
            />
            <p className="tracking-wider">{tExp('portfolio')}</p>
          </button>

          <div
            id="explorer-nav-list"
            className={`flex flex-col overflow-y-auto no-scrollbar transition-all duration-200 ease-in-out ${
              isOpen ? 'opacity-100 max-h-full py-1' : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            <Files className="relative isolate w-full px-2 py-1">
              <FolderRow label="src" defaultOpen>
                <FolderRow label="app" defaultOpen>
                  {appItems.map(({ id, link }) => {
                    const name = tTabs(id);
                    const icon = TABS_NAV_ICONS[id];
                    const isActive = effectiveRoute === link;
                    return (
                      <FileRow
                        key={link}
                        link={link}
                        name={name}
                        highlight={isActive}
                        onSelect={() => setPendingRoute(link)}
                        icon={
                          <Image
                            src={icon}
                            width={16}
                            height={16}
                            alt=""
                            className="size-4 shrink-0"
                          />
                        }
                      />
                    );
                  })}
                </FolderRow>
              </FolderRow>
              {settingsItem && (
                <FileRow
                  key={settingsItem.link}
                  link={settingsItem.link}
                  name={tTabs(settingsItem.id)}
                  highlight={effectiveRoute === settingsItem.link}
                  onSelect={() => setPendingRoute(settingsItem.link)}
                  icon={
                    <Image
                      src={TABS_NAV_ICONS[settingsItem.id]}
                      width={16}
                      height={16}
                      alt=""
                      className="size-4 shrink-0"
                    />
                  }
                />
              )}
            </Files>
          </div>
        </div>

        {/* Footer / Sections (Outline, Timeline) */}
        <div
          className={`${theme === 'dracula' ? 'bg-active-explorer-tab' : ''} ${
            theme === 'oneDarkPro' ? 'bg-sidebar-bg' : ''
          } text-darker mt-auto flex flex-col opacity-100`}
        >
          {[tExp('outline'), tExp('timeline')].map((title) => (
            <div
              key={title}
              className="relative flex h-6 cursor-pointer items-center text-[9px] font-bold uppercase before:pointer-events-none before:absolute before:inset-x-2 before:top-0 before:h-px before:bg-white/[0.08]"
            >
              <Image src="/chevron.svg" width={16} height={16} alt="" className="shrink-0" />
              <p className="ml-2 flex items-center tracking-wider">{title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* VS Code Draggable Separator Handle (centered between the 2 containers) */}
      <div
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize Explorer"
        onPointerDown={handlePointerDown}
        onDoubleClick={handleDoubleClick}
        className={cn(
          'group/resizer absolute top-0 z-40 flex h-full w-5 cursor-col-resize select-none items-center justify-center',
          isDragging && 'cursor-col-resize',
        )}
        style={{
          left: 'calc(100% + 3px)',
          transform: 'translateX(-50%)',
        }}
      >
        {/* Separator highlight line */}
        <div
          className={cn(
            'h-full w-[2px] transition-colors duration-150',
            isDragging
              ? 'bg-accent shadow-[0_0_8px_var(--color-accent)]'
              : 'bg-transparent group-hover/resizer:bg-accent/60',
          )}
        />

        {/* 3 Little Dots Separator in the Middle */}
        <div
          className={cn(
            'pointer-events-none absolute top-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-[3px] py-1.5 px-0.5 rounded-full transition-all duration-150',
            isDragging
              ? 'opacity-100 bg-accent/20'
              : 'opacity-70 group-hover/resizer:opacity-100 group-hover/resizer:bg-accent/15',
          )}
        >
          <span
            className={cn(
              'h-[3px] w-[3px] rounded-full transition-colors duration-150',
              isDragging ? 'bg-accent' : 'bg-light/60 group-hover/resizer:bg-accent',
            )}
          />
          <span
            className={cn(
              'h-[3px] w-[3px] rounded-full transition-colors duration-150',
              isDragging ? 'bg-accent' : 'bg-light/60 group-hover/resizer:bg-accent',
            )}
          />
          <span
            className={cn(
              'h-[3px] w-[3px] rounded-full transition-colors duration-150',
              isDragging ? 'bg-accent' : 'bg-light/60 group-hover/resizer:bg-accent',
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Explorer;
