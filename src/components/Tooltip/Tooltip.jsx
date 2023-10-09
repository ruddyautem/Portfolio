import React, { createRef } from 'react';

function Tooltip({ children, tooltipText }) {
  const tipRef = createRef();

  function handleMouseEnter() {
    tipRef.current.style.opacity = '1';
    tipRef.current.style.visibility = 'visible';
    tipRef.current.style.marginLeft = '15px';
  }

  function handleMouseLeave() {
    tipRef.current.style.opacity = '0';
    tipRef.current.style.visibility = 'hidden';
    tipRef.current.style.marginLeft = '10px';
  }

  return (
    <div
      className='relative flex items-center z-50'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className='absolute flex items-center px-4 py-1 text-xs text-white whitespace-no-wrap transition-all duration-150 rounded shadow-md ring-1 ring-black ring-opacity-20 text-opacity-60 bg-[#242936]'
        style={{ left: '100%', opacity: 0 }}
        ref={tipRef}
      >
        {tooltipText}
      </div>

      {children}
    </div>
  );
}

export default Tooltip;
