"use client";

import React from "react";

const Tooltip = ({ children, tooltipText }) => (
  <div className="group relative z-50 flex items-center">
    <div className="invisible absolute left-full ml-2.5 flex items-center rounded-sm bg-[#242936] px-4 py-1 text-xs whitespace-nowrap text-white/60 opacity-0 shadow-md ring-1 ring-black/20 transition-all duration-150 group-hover:visible group-hover:ml-4 group-hover:opacity-100">
      {tooltipText}
    </div>
    {children}
  </div>
);

export default Tooltip;
