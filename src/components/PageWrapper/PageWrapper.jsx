"use client";
import React, { useEffect, useRef } from "react";

const pageWrapperStyles = `
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

export const PageWrapper = ({ children, className, skipChildWrapping = false }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Inject styles
    if (!document.getElementById("page-wrapper-styles")) {
      const styleElement = document.createElement("style");
      styleElement.id = "page-wrapper-styles";
      styleElement.textContent = pageWrapperStyles;
      document.head.appendChild(styleElement);
    }

    // Animate items sequentially
    const animateItems = () => {
      if (containerRef.current) {
        const items = containerRef.current.querySelectorAll(".item-animate");
        items.forEach((item, index) => {
          setTimeout(() => {
            if (item) {
              item.classList.add("animate");
            }
          }, index * 50);
        });
      }
    };

    const timeoutId = setTimeout(animateItems, 50);
    return () => clearTimeout(timeoutId);
  }, []);

  const wrapChildren = (children) => {
    if (skipChildWrapping) {
      return children;
    }
    
    return React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        return (
          <div key={`page-item-${index}`} className="item-animate w-full">
            {child}
          </div>
        );
      }
      return child;
    });
  };

  return (
    <div ref={containerRef} className={className}>
      {wrapChildren(children)}
    </div>
  );
};