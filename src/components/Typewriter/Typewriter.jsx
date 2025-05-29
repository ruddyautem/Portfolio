"use client";

import React, { useState } from "react";

import TypeIt from "typeit-react";

const Typewriter = () => {
  const [Done, setDone] = useState(false);

  return (
    <>
      <TypeIt
        className="px-8 py-4 font-oswald text-3xl tracking-widest sm:text-4xl md:text-5xl lg:text-7xl 2xl:p-12 2xl:text-9xl "
        options={{
          lifeLike: true,
          html: true,
          speed: 50,
          afterComplete: (instance) => {
            setDone(true);
          },
        }}
        getBeforeInit={(instance) => {
          instance
            .type("Ruddy Autem")
            .pause(500)
            .break()
            .pause(500)
            .type("Développeur Web")
            .pause(500);
          return instance;
        }}
      />
      <hr className="border-t m-4 mx-auto w-4/6 border-accent md:border-t-2 xl:border-t-4" />
      {Done ? (
        <TypeIt
          className="px-8 py-4 text-center text-lg sm:text-2xl xl:text-2xl 2xl:p-12"
          options={{
            lifeLike: true,
            html: true,
            cursor: false,
            speed: 5,
          }}
          getBeforeInit={(instance) => {
            instance.type(
              "HTML | CSS | JAVASCRIPT | TYPESCRIPT | REACT | NEXTJS | TAILWINDCSS | STYLED-COMPONENTS | CLERK | FIREBASE | MONGODB | REDUX | MYSQL | PRISMA",
            );
            return instance;
          }}
        />
      ) : null}
    </>
  );
};

export default Typewriter;
