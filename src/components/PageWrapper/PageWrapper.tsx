"use client";
import React, { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

// Background blobs component - centralized
const BackgroundBlobs = () => (
  <div className="bg-blobs pointer-events-none fixed inset-0 animate-ambient-glow transition-opacity duration-300">
    <div className="3xl:h-192 3xl:w-3xl absolute top-[15%] left-[15%] h-48 w-48 rounded-full bg-blue-500/10 blur-3xl sm:h-64 sm:w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 xl:h-128 xl:w-lg 2xl:h-160 2xl:w-160"></div>
    <div className="3xl:h-144 3xl:w-xl absolute right-[20%] bottom-[20%] h-40 w-40 rounded-full bg-purple-500/10 blur-3xl sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-80 lg:w-80 xl:h-96 xl:w-96 2xl:h-120 2xl:w-120"></div>
    <div className="3xl:h-128 3xl:w-lg absolute top-[25%] right-[15%] h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 xl:h-80 xl:w-80 2xl:h-104 2xl:w-104"></div>
  </div>
);

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  skipChildWrapping?: boolean;
  showBackground?: boolean;
}

export const PageWrapper = ({ 
  children, 
  className, 
  skipChildWrapping = false,
  showBackground = true
}: PageWrapperProps) => {
  const { backgroundGlow } = useContext(ThemeContext);
  const shouldShowGlow = showBackground && backgroundGlow;

  if (skipChildWrapping) {
    return (
      <div className={className}>
        {shouldShowGlow && <BackgroundBlobs />}
        {children}
      </div>
    );
  }

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
    <div className={className}>
      {shouldShowGlow && <BackgroundBlobs />}
      {wrappedChildren}
    </div>
  );
};