"use client";
import React from "react";

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
}: PageWrapperProps) => {
  if (skipChildWrapping) {
    return <div className={className}>{children}</div>;
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
      {wrappedChildren}
    </div>
  );
};
