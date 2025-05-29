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
    <div className="bg-explorer-bg text-light hidden w-48 flex-col xl:flex">
      <div className="flex items-center justify-between">
        <p className="my-1 ml-4 flex h-5 items-center text-[12px] uppercase opacity-60">
          Explorer
        </p>
        <div className="mr-2 cursor-pointer rounded-sm p-0.5 hover:bg-white/5">
          <Image src="ellipsis.svg" width={16} height={16} alt="" />
        </div>
      </div>
      <div className="text-darker">
        <div
          className="flex h-6 cursor-pointer items-center text-[11px] font-bold uppercase"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            className={`transform transition-transform duration-200 ${
              isOpen ? "rotate-90" : ""
            }`}
            src="chevron-right.svg"
            width={16}
            height={16}
            alt=""
          />
          <p>Ruddy Autem Portfolio</p>
        </div>

        <div
          className={`flex flex-col overflow-y-auto ${
            isOpen ? "max-h-48" : ""
          } no-scrollbar max-h-0 transition-all duration-200 ease-in-out`}
        >
          {navLinks.map(({ name, link, icon }) => (
            <Link
              href={link}
              key={name}
              className={`${
                currentRoute === link ? "bg-active-explorer-tab" : ""
              } text-explorerColor flex cursor-pointer items-center gap-1 pl-3 text-sm hover:bg-white/5`}
            >
              <div className="flex items-center">
                <Image src={icon} width={16} height={16} alt="" className="flex-shrink-0" />
                <p
                  className={`ml-2 flex items-center ${
                    currentRoute === link ? "text-active-tab-text" : ""
                  }`}
                >
                  {name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div
        className={`${theme === "dracula" ? "bg-active-explorer-tab" : ""} ${
          theme === "oneDarkPro" ? "bg-sidebar-bg" : ""
        } text-darker mt-auto flex flex-col opacity-100`}
      >
        {["Outline", "Timeline"].map((title, index) => (
          <div
            key={index}
            className={`${
              theme === "dracula" && index === 0 ? "border-y border-black" : ""
            } ${
              theme === "dracula" && index === 1 ? "border-b border-black" : ""
            } flex h-6 cursor-pointer items-center text-[9px] font-bold uppercase`}
          >
            <Image src="chevron-right.svg" width={16} height={16} alt="" className="flex-shrink-0" />
            <p className="ml-2 flex items-center">{title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explorer;
