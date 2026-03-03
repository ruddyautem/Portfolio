'use client';
import Image from 'next/image';
import { memo } from 'react';
import { Minimize, Restore, Close } from '../Icons/Icons';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { cn } from '@/lib/utils';

// Static data outside component
const MENU_ITEMS = ['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help'];
const ICON_SIZE = 15;
const LOGO_CONFIG = {
  src: '/vsclogo.svg',
  alt: 'VSC Logo',
};

const MenuItem = memo(({ item }) => (
  <li className="cursor-pointer rounded-md px-2 py-0.5 transition-colors hover:bg-white/10">
    {item}
  </li>
));
MenuItem.displayName = 'MenuItem';

const IconButton = memo(({ icon: Icon, onClick, variant = 'default' }) => (
  <button
    onClick={onClick}
    className={cn(
      'cursor-pointer px-3 py-2 transition-colors', 
      variant === 'danger' ? 'hover:bg-red-500' : 'hover:bg-white/10'
    )}
    aria-label={Icon.name || 'Menu action'}
  >
    <Icon />
  </button>
));
IconButton.displayName = 'IconButton';

const NavIcon = memo(({ src, alt, className = '' }) => (
  <Image src={src} width={ICON_SIZE} height={ICON_SIZE} alt={alt} className={className} priority />
));
NavIcon.displayName = 'NavIcon';

const NavButton = memo(({ icon, alt, disabled = false }) => (
  <button
    disabled={disabled}
    className={cn(
      'hidden h-6 w-7 items-center justify-center rounded-md lg:flex transition-colors',
      disabled ? 'cursor-not-allowed opacity-30' : 'cursor-pointer hover:bg-white/5',
    )}
    aria-label={alt}
  >
    <NavIcon src={icon} alt={alt} />
  </button>
));
NavButton.displayName = 'NavButton';

const Menu = () => {
  // OPTIMISATION CONSERVÉE : Pas de ThemeContext ici (évite les re-rendus globaux du menu)

  return (
    <div className="bg-menu relative z-50 flex h-8 items-center">
      
      {/* Left Section: Logo + Menu Items */}
      <nav className="text-light hidden h-8 flex-1 text-xs font-semibold text-opacity-80 lg:flex">
        <ul className="flex items-center">
          <li className="mx-2 shrink-0">
            <NavIcon src={LOGO_CONFIG.src} alt={LOGO_CONFIG.alt} />
          </li>
          {MENU_ITEMS.map((item) => (
            <MenuItem key={item} item={item} />
          ))}
        </ul>
      </nav>

      {/* Center Section: Navigation + Search */}
      {/* RESTAURATION : flex-1 et xl:ml-44 pour le centrage original */}
      <div className="flex flex-1 items-center justify-center xl:ml-44">
        <NavButton icon="/arrow-left.svg" alt="Navigate back" />
        <div className="hidden lg:flex">
          <NavIcon src="/arrow-right.svg" alt="Navigate forward" className="mx-2 mr-3 opacity-30" />
        </div>

        {/* RESTAURATION : Classes exactes d'origine (w-4/6) + simple ajout d'une transition */}
        <button
          className={cn(
            'hover:border-accent flex h-7 w-4/6 cursor-pointer items-center justify-center',
            'rounded border border-gray-100/5 bg-gray-300/5 text-xs font-semibold text-light transition-colors',
          )}
          aria-label="Search portfolio"
        >
          <NavIcon src="/search.svg" alt="Search" className="mr-1 shrink-0" />
          <span className="truncate">Ruddy Autem Portfolio</span>
        </button>
      </div>

      {/* Right Section: Flex spacer with absolutely positioned content */}
      {/* RESTAURATION : Le wrapper absolute original qui permettait de "sortir" les boutons du flux flexbox pour ne pas décaler le milieu */}
      <div className="ml-auto flex flex-0 items-center text-white lg:flex-1">
        <div className="absolute right-0 top-0 ml-auto flex">
          <ThemeToggle />
          <div className="hidden items-center lg:flex">
            <IconButton icon={Minimize} variant="default" />
            <IconButton icon={Restore} variant="default" />
            <IconButton icon={Close} variant="danger" />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default memo(Menu);