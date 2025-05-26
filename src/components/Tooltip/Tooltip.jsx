import React, { createRef } from "react";

function Tooltip({ children, tooltipText }) {
  const tipRef = createRef();

  function handleMouseEnter() {
    tipRef.current.style.opacity = "1";
    tipRef.current.style.visibility = "visible";
    tipRef.current.style.marginLeft = "15px";
  }

  function handleMouseLeave() {
    tipRef.current.style.opacity = "0";
    tipRef.current.style.visibility = "hidden";
    tipRef.current.style.marginLeft = "10px";
  }

  return (
    <div
      className="relative z-50 flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="whitespace-no-wrap absolute flex items-center rounded bg-[#242936] px-4 py-1 text-xs text-white text-opacity-60 shadow-md ring-1 ring-black ring-opacity-20 transition-all duration-150"
        style={{ left: "100%", opacity: 0 }}
        ref={tipRef}
      >
        {tooltipText}
      </div>

      {children}
    </div>
  );
}

export default Tooltip;
