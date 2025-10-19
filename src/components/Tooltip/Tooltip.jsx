'use client';
import { memo } from 'react';

const Tooltip = memo(({ children, tooltipText }) => (
  <div className="group relative z-50 flex items-center">
    {/* Tooltip with arrow */}
    <div
      className="pointer-events-none invisible absolute left-full ml-3 flex items-center opacity-0
        transition-all duration-200 ease-out group-hover:visible group-hover:ml-4
        group-hover:opacity-100"
    >
      {/* Arrow */}
      <div
        className="h-0 w-0 border-y-4 border-r-4 border-y-transparent border-r-slate-700/95"
        style={{ filter: 'drop-shadow(-1px 0 0 rgba(0, 0, 0, 0.1))' }}
      />
      {/* Tooltip content */}
      <div
        className="whitespace-nowrap rounded-md bg-slate-700/95 px-3 py-1.5 text-xs font-medium
          text-slate-200 shadow-lg ring-1 ring-white/10 backdrop-blur-sm"
      >
        {tooltipText}
      </div>
    </div>
    {children}
  </div>
));

Tooltip.displayName = 'Tooltip';

export default Tooltip;
