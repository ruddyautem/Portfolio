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
      className='relative z-50 text-darker text-[10px] mt-1 sm:text-sm sm:mt-0.5 lg:mt-0'
    >
      <div className='flex items-center'>
        <span className='text-light hidden lg:flex md:hidden'>Theme :</span>
        <span className='text-light mx-2 lg:flex md:flex'></span>
        <button
          onClick={toggleMenu}
          className='bg-accent text-white px-2 md:px-4 py-0.5 lg:py-1 my-0.5 mx-2 md:mx-0 rounded capitalize'
        >
          {currentScreenSize >= 768 ? theme : "Theme"}
        </button>
      </div>
      <div
        className={`absolute text-center right-0 mt-2 bg-white border-none rounded shadow-xl capitalize transition-all ease-in-out duration-200 overflow-hidden ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {themeOptions.map((option) => (
          <div
            key={option}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = hoverColors[option])
            }
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
            className='cursor-pointer hover:text-white px-4 py-1.5 rounded'
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
