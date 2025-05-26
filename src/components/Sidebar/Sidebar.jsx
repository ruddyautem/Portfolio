"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tooltip from "../Tooltip/Tooltip";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const currentRoute = usePathname();

  const navLinks = [
    { name: "Accueil", link: "/", icon: "/files.svg" },
    { name: "Profil", link: "/about", icon: "/code.svg" },
    { name: "Projets", link: "/projects", icon: "/source-control.svg" },
    { name: "Contact", link: "/contact", icon: "/email.svg" },
    { name: "CV", link: "/cv", icon: "/cv-sidebar.svg" },

    // { name: 'Github', link: '/github', icon: '/github.svg' }, don't forget to modify the slice when you add it back ,
    { name: "Comptes", icon: "/account.svg" },
    { name: "Settings", icon: "/settings-gear.svg" },
  ];

  const topLinks = navLinks.slice(0, 5);
  const bottomLinks = navLinks.slice(5);

  return (
    <div className="hidden w-12 flex-col justify-between bg-sidebarBg lg:flex">
      <div>
        {topLinks.map(({ name, link, icon }) => {
          const isActive = currentRoute === link;
          return (
            <div
              key={name}
              className={`${
                isActive ? "opacity-100" : "opacity-30"
              } relative flex items-center justify-center hover:opacity-100`}
            >
              <Tooltip tooltipText={name}>
                <Link href={link}>
                  <div className="group flex h-11 w-full items-center justify-center">
                    <Image
                      className=""
                      src={icon}
                      width={24}
                      height={24}
                      alt=""
                    />
                  </div>
                </Link>
              </Tooltip>
              {isActive && (
                <div className="absolute left-0 h-full w-[2px] bg-accent bg-opacity-100"></div>
              )}
            </div>
          );
        })}
      </div>
      <div>
        {bottomLinks.map(({ icon, name }) => {
          return (
            <div
              key={name}
              className="flex cursor-pointer items-center justify-center opacity-30 hover:opacity-100"
            >
              <Tooltip tooltipText={name}>
                <div className="group relative flex h-11 w-full justify-center">
                  <Image
                    className=""
                    src={icon}
                    width={24}
                    height={24}
                    alt=""
                  />
                </div>
              </Tooltip>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
