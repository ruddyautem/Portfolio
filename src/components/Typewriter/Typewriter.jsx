"use client";

import React, { useState } from "react";

import TypeIt from "typeit-react";

const Typewriter = () => {
  const [Done, setDone] = useState(false);

  return (
    <>
      <TypeIt
        className='font-oswald px-8 py-4 text-3xl tracking-widest 2xl:text-9xl lg:text-7xl md:text-5xl sm:text-4xl 2xl:p-12'
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
      <hr className='border-accent mx-auto w-4/6 m-4 border-t-1 md:border-t-2 xl:border-t-4' />
      {Done ? (
        <TypeIt
          className='px-8 py-4 text-lg text-center sm:text-2xl 2xl:p-12 xl:text-2xl'
          options={{
            lifeLike: true,
            html: true,
            cursor: false,
            speed: 5,
          }}
          lifeLike
          getBeforeInit={(instance) => {
            instance
            .type("HTML | CSS | JAVASCRIPT | TYPESCRIPT | REACT | NEXTJS | REDUX | TAILWINDCSS | STYLED-COMPONENTS | FIREBASE | MONGODB | MYSQL | PRISMA")
            return instance;
          }}
        />
      ) : null}
    </>
  );
};

export default Typewriter;
