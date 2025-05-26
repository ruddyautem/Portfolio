"use client";
import Image from "next/image";
import React, { useContext, memo } from "react";
import { Minimize, Restore, Close } from "../Icons/Icons";
import { ThemeContext } from "@/context/ThemeContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const MenuItem = memo(({ item }) => (
  <li className="cursor-pointer rounded-md px-2 py-0.5 hover:bg-white hover:bg-opacity-10">
    {item}
  </li>
));

MenuItem.displayName = "MenuItem"; // Add displayName for debugging

const IconButton = memo(({ icon: Icon, onClick, className }) => (
  <div className={`cursor-pointer px-3 py-2 ${className}`} onClick={onClick}>
    <Icon />
  </div>
));

IconButton.displayName = "IconButton"; // Add displayName for debugging

const Menu = () => {
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

  const { toggle, theme } = useContext(ThemeContext);

  return (
    <div className="relative z-50 flex h-8 items-center bg-menu">
      <div className="hidden h-8 text-xs font-semibold text-light text-opacity-80 lg:flex lg:flex-1">
        <ul className="flex items-center">
          <Image
            className="mx-2"
            src="vsclogo.svg"
            width={15}
            height={15}
            alt="VSC Logo"
            priority
          />
          {menuItems.map((item, index) => (
            <MenuItem key={index} item={item} />
          ))}
        </ul>
      </div>

      <div className="flex flex-1 items-center justify-center xl:ml-44">
        <div className="hidden h-6 w-7 cursor-pointer items-center justify-center rounded-md bg-opacity-5 hover:bg-white hover:bg-opacity-10 lg:flex">
          <Image
            src="/arrow-left.svg"
            width={15}
            height={15}
            alt="Back"
            priority
          />
        </div>
        <div className="hidden lg:flex">
          <Image
            className="mx-2 mr-3 opacity-30"
            src="/arrow-right.svg"
            width={15}
            height={15}
            alt="Forward"
            priority
          />
        </div>
        <div className="flex h-6 w-4/6 cursor-pointer items-center justify-center rounded border border-white border-opacity-10 bg-white bg-opacity-5 text-xs font-semibold text-white text-opacity-80 hover:bg-opacity-10">
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

      <div className="flex-0 ml-auto flex items-center text-white lg:flex-1">
        <div className="absolute right-0 top-0 ml-auto flex">
          <ThemeToggle />
          <div className="align-items hidden items-center lg:flex">
            <IconButton
              icon={Minimize}
              className="hover:bg-white hover:bg-opacity-10"
            />
            <IconButton
              icon={Restore}
              className="hover:bg-white hover:bg-opacity-10"
            />
            <IconButton icon={Close} className="hover:bg-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Menu);
