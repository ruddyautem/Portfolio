"use client";
import React, { useContext, useRef, useState, useCallback } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const ThemeToggle = () => {
  const { toggle, theme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef(null);

  // Memoize theme data to prevent recreation
  const themeData = {
    options: ["ayu", "oneDarkPro", "dracula", "poimandres"],
    hoverColors: {
      ayu: "#ffcc66",
      oneDarkPro: "#98c379",
      dracula: "#ff79c6",
      poimandres: "#5de4c7",
    },
  };

  // Stable click handler
  const handleClickOutside = useCallback((e) => {
    if (toggleRef.current && !toggleRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  }, []);

  // Single effect for event listeners
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div
      ref={toggleRef}
      className="text-darker relative z-50 mt-1 text-[10px] sm:mt-0.5 sm:text-sm lg:mt-0"
    >
      <div className="flex items-center">
        <span className="text-light hidden lg:flex">Theme :</span>
        <span className="text-light mx-2 lg:flex"></span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-accent mx-2 my-0.5 cursor-pointer rounded-sm px-2 py-0.5 text-white capitalize md:px-4 lg:mx-0 lg:py-1"
        >
          <span className="md:hidden">Theme</span>
          <span className="hidden md:inline">{theme}</span>
        </button>
      </div>

      <div
        className={`absolute right-0 mt-2 rounded bg-white shadow-xl transition-all duration-200 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {themeData.options.map((option) => (
          <div
            key={option}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                themeData.hoverColors[option])
            }
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
            className="cursor-pointer px-4 py-1.5 hover:text-white"
            onClick={() => {
              toggle(option);
              setIsOpen(false);
            }}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeToggle;
