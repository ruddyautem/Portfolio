"use client";
import Image from "next/image";
import { memo, useContext } from "react";
import { Minimize, Restore, Close } from "../Icons/Icons";
import { ThemeContext } from "@/context/ThemeContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const MenuItem = memo(({ item }) => (
  <li className="cursor-pointer rounded-md px-2 py-0.5 hover:bg-white/10">
    {item}
  </li>
));
MenuItem.displayName = "MenuItem";

const IconButton = memo(({ icon: Icon, onClick, className }) => (
  <div className={`cursor-pointer px-3 py-2 ${className}`} onClick={onClick}>
    <Icon />
  </div>
));
IconButton.displayName = "IconButton";

const menuItems = [
  "File",
  "Edit",
  "Selection",
  "View",
  "Go",
  "Run",
  "Terminal",
  "Help",
];

const Menu = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="bg-menu relative z-50 flex h-8 items-center">
      {/* Left Menu Section */}
      <div className="text-light hidden h-8 font-semibold lg:flex lg:flex-1">
        <ul className="flex items-center text-xs">
          <Image
            className="mx-2"
            src="vsclogo.svg"
            width={15}
            height={15}
            alt="VSC Logo"
            priority
          />
          {menuItems.map((item) => (
            <MenuItem key={item} item={item} />
          ))}
        </ul>
      </div>

      {/* Center Navigation */}
      <div className="flex flex-1 items-center justify-center xl:ml-44">
        <NavButton icon="/arrow-left.svg" alt="Back" />
        <Image
          className="mx-2 mr-3 opacity-30"
          src="/arrow-right.svg"
          width={15}
          height={15}
          alt="Forward"
          priority
        />
        <div className="flex h-6 w-4/6 cursor-pointer items-center justify-center rounded-sm border border-white/10 bg-white/5 text-xs font-semibold text-white/80 hover:bg-white/10">
          <Image
            className="mr-1"
            src="/search.svg"
            width={15}
            height={15}
            alt="Search"
            priority
          />
          Ruddy Autem Portfolio
        </div>
      </div>

      {/* Right Controls */}
      <div className="ml-auto flex flex-0 items-center text-white lg:flex-1">
        <div className="absolute top-0 right-0 ml-auto flex">
          <ThemeToggle />
          <div className="align-items hidden items-center lg:flex">
            <IconButton icon={Minimize} className="hover:bg-white/10" />
            <IconButton icon={Restore} className="hover:bg-white/10" />
            <IconButton icon={Close} className="hover:bg-red-500/100" />
          </div>
        </div>
      </div>
    </div>
  );
};

const NavButton = ({ icon, alt }) => (
  <div className="hidden h-6 w-7 cursor-pointer items-center justify-center rounded-md hover:bg-white/5 lg:flex">
    <Image src={icon} width={15} height={15} alt={alt} priority />
  </div>
);

export default memo(Menu);
