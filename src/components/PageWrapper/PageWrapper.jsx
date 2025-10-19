"use client";
import React, { useEffect, useRef } from "react";

// Background blobs component - now centralized
const BackgroundBlobs = () => (
  <div className="pointer-events-none fixed inset-0 animate-pulse">
    <div className="3xl:h-[48rem] 3xl:w-[48rem] absolute top-[15%] left-[15%] h-48 w-48 rounded-full bg-blue-500/10 blur-3xl sm:h-64 sm:w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 xl:h-[32rem] xl:w-[32rem] 2xl:h-[40rem] 2xl:w-[40rem]"></div>
    <div className="3xl:h-[36rem] 3xl:w-[36rem] absolute right-[20%] bottom-[20%] h-40 w-40 rounded-full bg-purple-500/10 blur-3xl sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-80 lg:w-80 xl:h-96 xl:w-96 2xl:h-[30rem] 2xl:w-[30rem]"></div>
    <div className="3xl:h-[32rem] 3xl:w-[32rem] absolute top-[25%] right-[15%] h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 xl:h-80 xl:w-80 2xl:h-[26rem] 2xl:w-[26rem]"></div>
  </div>
);

// Animation styles - extracted for clarity
const ANIMATION_STYLES = `
  @keyframes item-appear {
    0% {
      opacity: 0;
      transform: translateY(10px) scale(0.95);
      filter: blur(3px);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }
  
  .item-animate {
    opacity: 0;
    transform: translateY(10px) scale(0.95);
    filter: blur(3px);
  }
  
  .item-animate.animate {
    animation: item-appear 0.3s ease-out forwards;
  }
`;

const STYLE_ID = "page-wrapper-styles";
const ANIMATION_DELAY = 50; // ms between each element animation
const INITIAL_DELAY = 50; // ms before starting animations

export const PageWrapper = ({ 
  children, 
  className, 
  skipChildWrapping = false,
  showBackground = true // New prop to control background visibility
}) => {
  const containerRef = useRef(null);

  // Inject animation styles into document head (only once)
  const injectStyles = () => {
    if (!document.getElementById(STYLE_ID)) {
      const styleElement = document.createElement("style");
      styleElement.id = STYLE_ID;
      styleElement.textContent = ANIMATION_STYLES;
      document.head.appendChild(styleElement);
    }
  };

  // Find and animate all elements with 'item-animate' class
  const animateElements = () => {
    const elementsToAnimate = containerRef.current?.querySelectorAll(".item-animate");
    
    elementsToAnimate?.forEach((element, index) => {
      const delay = index * ANIMATION_DELAY;
      setTimeout(() => {
        element?.classList.add("animate");
      }, delay);
    });
  };

  useEffect(() => {
    injectStyles();
    
    // Start animations after a brief delay
    const animationTimeout = setTimeout(animateElements, INITIAL_DELAY);
    
    return () => clearTimeout(animationTimeout);
  }, []);

  // If skipChildWrapping is true, render children directly
  if (skipChildWrapping) {
    return (
      <div ref={containerRef} className={className}>
        {showBackground && <BackgroundBlobs />}
        {children}
      </div>
    );
  }

  // Default behavior: wrap each child in an animated container
  const wrappedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return (
        <div key={index} className="item-animate w-full">
          {child}
        </div>
      );
    }
    return child;
  });

  return (
    <div ref={containerRef} className={className}>
      {showBackground && <BackgroundBlobs />}
      {wrappedChildren}
    </div>
  );
};