import React, { useContext, useEffect, useRef, useState } from "react";

import { ThemeContext } from "@/context/ThemeContext";

const ThemeToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentScreenSize, setCurrentScreenSize] = useState(window.innerWidth);
  const toggleContainerRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { toggle, theme } = useContext(ThemeContext);
  const themeOptions = ["ayu", "oneDarkPro", "dracula", "poimandres"];
  const hoverColors = {
    ayu: "#ffcc66",
    oneDarkPro: "#98c379",
    dracula: "#ff79c6",
    poimandres: "#5DE4c7",
  };

  const handleThemeChange = (option) => {
    toggle(option);
    toggleMenu();
  };

  useEffect(() => {
    const handleResize = () => {
      setCurrentScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        toggleContainerRef.current &&
        !toggleContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleContainerRef]);

  return (
    <div
      ref={toggleContainerRef}
      className="relative z-50 mt-1 text-[10px] text-darker sm:mt-0.5 sm:text-sm lg:mt-0"
    >
      <div className="flex items-center">
        <span className="hidden text-light md:hidden lg:flex">Theme :</span>
        <span className="mx-2 text-light md:flex lg:flex"></span>
        <button
          onClick={toggleMenu}
          className="mx-2 my-0.5 rounded bg-accent px-2 py-0.5 capitalize text-white md:mx-0 md:px-4 lg:py-1"
        >
          {currentScreenSize >= 768 ? theme : "Theme"}
        </button>
      </div>
      <div
        className={`absolute right-0 mt-2 overflow-hidden rounded border-none bg-white text-center capitalize shadow-xl transition-all duration-200 ease-in-out ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {themeOptions.map((option) => (
          <div
            key={option}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = hoverColors[option])
            }
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
            className="cursor-pointer rounded px-4 py-1.5 hover:text-white"
            onClick={() => handleThemeChange(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeToggle;
