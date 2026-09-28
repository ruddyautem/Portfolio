'use client';

import React, { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';
export type TooltipAlign = 'start' | 'center' | 'end';

export interface BeUITooltipProps {
  content?: ReactNode;
  /** Alias for content to ensure full backward compatibility */
  tooltipText?: string;
  children: ReactNode;
  side?: TooltipSide;
  align?: TooltipAlign;
  /** Show subtle directional indicator arrow */
  arrow?: boolean;
  className?: string;
  wrapperClassName?: string;
  disabled?: boolean;
}

const SIDE_CLASSES: Record<TooltipSide, Record<TooltipAlign, string>> = {
  top: {
    center: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    start: 'bottom-full left-0 mb-2',
    end: 'bottom-full right-0 mb-2',
  },
  bottom: {
    center: 'top-full left-1/2 -translate-x-1/2 mt-2',
    start: 'top-full left-0 mt-2',
    end: 'top-full right-0 mt-2',
  },
  left: {
    center: 'right-full top-1/2 -translate-y-1/2 mr-2.5',
    start: 'right-full top-0 mr-2.5',
    end: 'right-full bottom-0 mr-2.5',
  },
  right: {
    center: 'left-full top-1/2 -translate-y-1/2 ml-2.5',
    start: 'left-full top-0 ml-2.5',
    end: 'left-full bottom-0 ml-2.5',
  },
};

export function BeUITooltip({
  content,
  tooltipText,
  children,
  side = 'top',
  align = 'center',
  arrow = true,
  className,
  wrapperClassName,
  disabled = false,
}: BeUITooltipProps) {
  const tooltipContent = content ?? tooltipText;

  if (!tooltipContent || disabled) {
    return <>{children}</>;
  }

  const placementClass = SIDE_CLASSES[side][align];

  return (
    <div
      className={cn(
        'group group/tooltip relative inline-flex items-center justify-center',
        wrapperClassName,
      )}
    >
      {children}

      <div
        className={cn(
          'pointer-events-none absolute z-[9999] whitespace-nowrap',
          placementClass,
        )}
      >
        <div
          role="tooltip"
          className="invisible opacity-0 -translate-x-2.5 scale-[0.96] transition-all duration-200 ease-out group-hover/tooltip:visible group-hover/tooltip:opacity-100 group-hover/tooltip:translate-x-0 group-hover/tooltip:scale-100 group-focus-within/tooltip:visible group-focus-within/tooltip:opacity-100 group-focus-within/tooltip:translate-x-0 group-focus-within/tooltip:scale-100"
        >
          <div
            className={cn(
              'relative flex items-center rounded-lg border border-white/10',
              'bg-[#1f2430]/95 px-2.5 py-1 text-[11px] font-medium text-slate-200',
              'shadow-xl shadow-black/40 ring-1 ring-white/5 backdrop-blur-md',
              className,
            )}
          >
            {arrow && (
              <span
                aria-hidden="true"
                className={cn(
                  'absolute h-1.5 w-1.5 rotate-45 border border-white/10 bg-[#1f2430]',
                  side === 'top' && '-bottom-[4px] border-t-0 border-l-0',
                  side === 'bottom' && '-top-[4px] border-b-0 border-r-0',
                  side === 'left' && '-right-[4px] border-b-0 border-l-0',
                  side === 'right' && '-left-[4px] border-t-0 border-r-0',
                  // Alignment offsets
                  (side === 'top' || side === 'bottom') &&
                    align === 'center' &&
                    'left-1/2 -translate-x-1/2',
                  (side === 'top' || side === 'bottom') && align === 'start' && 'left-3',
                  (side === 'top' || side === 'bottom') && align === 'end' && 'right-3',
                  (side === 'left' || side === 'right') &&
                    align === 'center' &&
                    'top-1/2 -translate-y-1/2',
                  (side === 'left' || side === 'right') && align === 'start' && 'top-2.5',
                  (side === 'left' || side === 'right') && align === 'end' && 'bottom-2.5',
                )}
              />
            )}
            {tooltipContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export const Tooltip = BeUITooltip;
export default BeUITooltip;
