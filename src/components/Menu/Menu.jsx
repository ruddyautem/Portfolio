"use client";
import Image from "next/image";
import React, { useContext, memo } from "react";
import { Minimize, Restore, Close } from "../Icons/Icons";
import { ThemeContext } from "@/context/ThemeContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const MenuItem = memo(({ item }) => (
  <li className='cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-md px-2 py-0.5'>
    {item}
  </li>
));

MenuItem.displayName = "MenuItem"; // Add displayName for debugging

const IconButton = memo(({ icon: Icon, onClick, className }) => (
  <div className={`px-3 py-2 cursor-pointer ${className}`} onClick={onClick}>
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
    <div className='flex items-center h-8 z-50 bg-menu relative'>
      <div className='hidden text-xs font-semibold text-light lg:flex-1 lg:flex text-opacity-80 h-8'>
        <ul className='flex items-center'>
          <Image
            className='mx-2'
            src='vsclogo.svg'
            width={15}
            height={15}
            alt='VSC Logo'
            priority
          />
          {menuItems.map((item, index) => (
            <MenuItem key={index} item={item} />
          ))}
        </ul>
      </div>

      <div className='flex items-center justify-center flex-1 xl:ml-44'>
        <div className='items-center justify-center hidden h-6 rounded-md cursor-pointer lg:flex hover:bg-white hover:bg-opacity-10 bg-opacity-5 w-7'>
          <Image
            src='/arrow-left.svg'
            width={15}
            height={15}
            alt='Back'
            priority
          />
        </div>
        <div className='hidden lg:flex'>
          <Image
            className='mx-2 mr-3 opacity-30'
            src='/arrow-right.svg'
            width={15}
            height={15}
            alt='Forward'
            priority
          />
        </div>
        <div className='flex items-center justify-center w-4/6 h-6 text-xs font-semibold text-white bg-white border border-white rounded cursor-pointer border-opacity-10 bg-opacity-5 hover:bg-opacity-10 text-opacity-80'>
          <Image
            className='mr-1'
            src='/search.svg'
            width={15}
            height={15}
            alt='Search'
            priority
          />
          Ruddy Autem Portfolio
        </div>
      </div>

      <div className='flex items-center flex-0 lg:flex-1 ml-auto text-white'>
        <div className='flex ml-auto absolute top-0 right-0'>
          <ThemeToggle />
          <div className='items-center align-items hidden lg:flex'>
            <IconButton icon={Minimize} className='hover:bg-white hover:bg-opacity-10' />
            <IconButton icon={Restore} className='hover:bg-white hover:bg-opacity-10' />
            <IconButton icon={Close} className='hover:bg-red-500' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Menu);