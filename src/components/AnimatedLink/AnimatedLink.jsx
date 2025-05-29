"use client";

import Link from "next/link";

const AnimatedLink = ({ href, children }) => (
  <Link
    href={href}
    className="group border-accent text-light relative flex w-56 items-center justify-center border px-12 py-6 text-xl transition-all duration-300 hover:scale-105 sm:w-64 sm:text-3xl"
  >
    <span className="relative z-10 group-hover:text-white">{children}</span>
    <div className="group-hover:border-accent absolute inset-0 h-full w-full border-2 border-transparent transition-all duration-300 ease-out" />
    <div className="bg-accent absolute top-0 left-0 h-1 w-0 transition-all duration-300 ease-out group-hover:w-full" />
    <div className="bg-accent absolute top-0 right-0 h-0 w-1 transition-all duration-300 ease-out group-hover:h-full" />
    <div className="bg-accent absolute right-0 bottom-0 h-1 w-0 transition-all duration-300 ease-out group-hover:w-full" />
    <div className="bg-accent absolute bottom-0 left-0 h-0 w-1 transition-all duration-300 ease-out group-hover:h-full" />
  </Link>
);

export default AnimatedLink;
