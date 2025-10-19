'use client';
import { useContext, useRef, useState, useEffect } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

// Static data outside component - no recreations
const THEME_OPTIONS = ['ayu', 'oneDarkPro', 'dracula', 'poimandres'];

const THEME_STYLES = {
  ayu: 'hover:bg-[#ffcc66]',
  oneDarkPro: 'hover:bg-[#98c379]',
  dracula: 'hover:bg-[#ff79c6]',
  poimandres: 'hover:bg-[#5de4c7]',
};

const ThemeToggle = () => {
  const { toggle, theme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (toggleRef.current && !toggleRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]); // Only add listener when open

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleThemeSelect = (option) => {
    toggle(option);
    setIsOpen(false);
  };

  return (
    <div
      ref={toggleRef}
      className="text-darker relative z-50 mt-1 text-[10px] sm:mt-0.5 sm:text-sm lg:mt-0"
    >
      <div className="flex items-center">
        <span className="text-light hidden lg:flex">Theme :</span>
        <span className="text-light mx-2 hidden lg:flex" />
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="true"
          className="bg-accent mx-2 my-0.5 cursor-pointer rounded-sm px-2 py-0.5 capitalize
            text-black md:px-4 lg:mx-0 lg:py-1"
        >
          <span className="md:hidden">Theme</span>
          <span className="hidden md:inline">{theme}</span>
        </button>
      </div>

      {/* Dropdown Menu */}
      <div
        role="menu"
        className={cn(
          'absolute right-0 mt-2 rounded bg-white shadow-xl transition-all duration-200',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        {THEME_OPTIONS.map((option) => (
          <button
            key={option}
            role="menuitem"
            onClick={() => handleThemeSelect(option)}
            className={cn(
              'w-full cursor-pointer px-4 py-1.5 text-left transition-colors hover:text-white',
              THEME_STYLES[option],
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeToggle;
