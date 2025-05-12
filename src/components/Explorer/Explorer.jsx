"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeContext } from "@/context/ThemeContext";
import { usePathname } from "next/navigation";

const Explorer = () => {
  const currentRoute = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const { theme } = useContext(ThemeContext);

  const navLinks = [
    { name: "accueil.jsx", link: "/", icon: "jsx.svg" },
    { name: "profil.html", link: "/about", icon: "html5.svg" },
    { name: "projets.js", link: "/projects", icon: "js.svg" },
    { name: "contact.css", link: "/contact", icon: "css.svg" },
    { name: "cv.json", link: "/cv", icon: "cv.svg" },
  ];

  return (
    <div className='bg-explorerBg text-light w-48 hidden flex-col xl:flex'>
      <div className='flex justify-between items-center'>
        <p className='flex items-center h-5 ml-4 text-[12px] opacity-60 uppercase my-1'>
          Explorer
        </p>
        <div className='p-0.5 mr-2 rounded hover:bg-white hover:bg-opacity-5 cursor-pointer'>
          <Image src='ellipsis.svg' width={16} height={16} alt='' />
        </div>
      </div>
      <div className='text-darker'>
        <div
          className='h-6 text-[11px] flex items-center font-bold cursor-pointer uppercase bg-tabsBg'
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            className={`transform transition-transform duration-200 ${
              isOpen ? "rotate-90" : ""
            }`}
            src='chevron-right.svg'
            width={16}
            height={16}
            alt=''
          />
          <p>Ruddy Autem Portfolio</p>
        </div>

        <div
          className={`overflow-y-auto flex flex-col ${
            isOpen ? "max-h-48" : ""
          } max-h-0 transition-all duration-200 ease-in-out no-scrollbar`}
        >
          {navLinks.map(({ name, link, icon }) => (
            <Link
              href={link}
              key={name}
              className={`${
                currentRoute === link ? "bg-activeExplorerTab" : ""
              } flex items-center pl-3 text-sm text-explorerColor cursor-pointer hover:bg-white hover:bg-opacity-5 gap-1`}
            >
              <Image src={icon} width={16} height={16} alt='' />
              <p className={currentRoute === link ? "text-activeTabText" : ""}>
                {name}
              </p>
            </Link>
          ))}
        </div>
      </div>
      <div
        className={`${theme === "dracula" ? "bg-activeExplorerTab" : ""} ${
          theme === "oneDarkPro" ? "bg-sidebarBg" : ""
        } flex flex-col mt-auto opacity-100 text-darker`}
      >
        {["Outline", "Timeline"].map((title, index) => (
          <div
            key={index}
            className={`${
              theme === "dracula" && index === 0 ? "border-y border-black" : ""
            } ${
              theme === "dracula" && index === 1 ? "border-b border-black" : ""
            } flex items-center h-6 text-[9px] font-bold uppercase cursor-pointer`}
          >
            <Image src='chevron-right.svg' width={16} height={16} alt='' />
            <p>{title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explorer;
