"use client";

import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeContext } from "@/context/ThemeContext";
import { usePathname } from "next/navigation";

const Tabsbar = () => {
  const currentRoute = usePathname();

  const navLinks = [
    { name: "accueil.jsx", link: "/", icon: "jsx.svg" },
    { name: "profil.html", link: "/about", icon: "html5.svg" },
    { name: "projets.js", link: "/projects", icon: "js.svg" },
    { name: "contact.css", link: "/contact", icon: "css.svg" },
    { name: "cv.json", link: "/cv", icon: "cv.svg" },
  ];

  const { theme } = useContext(ThemeContext);

  const activeBackgroundStyle =
    theme === "dracula" || theme === "oneDarkPro" ? "bg-activeTabBg" : "";
  const activePositionStyle =
    theme === "ayu" || theme === "oneDarkPro" || theme === "poimandres"
      ? "bottom-0"
      : "top-0";

  return (
    <div className="h-7 bg-menu text-darker">
      <div className="flex flex-row items-center justify-center lg:justify-start">
        {navLinks.map(({ name, link, icon }) => {
          const isActive = currentRoute === link;
          const baseName = name.replace(/\..+$/, ""); // Remove extension

          return (
            <Link
              href={link}
              key={name}
              className={`relative flex cursor-pointer items-center justify-center px-[2px] sm:px-3 ${
                isActive ? activeBackgroundStyle : ""
              }`}
            >
              <div className="my-1.5 flex w-full gap-1 px-2 text-xs sm:my-1 sm:text-sm">
                <Image className=" " src={icon} width={16} height={16} alt="" />
                {/* Show full name on larger screens, trimmed version on small screens */}
                <p className="sm:hidden">{baseName}</p>
                <p className="hidden sm:inline">{name}</p>
              </div>
              {isActive && (
                <div
                  className={`absolute ${activePositionStyle} h-[1px] w-full bg-accent`}
                ></div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Tabsbar;
