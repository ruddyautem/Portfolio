"use client";

import React, { useState } from "react";

import TypeIt from "typeit-react";

const Typewriter = () => {
  const [Done, setDone] = useState(false);

  return (
    <>
      <TypeIt
        className='px-8 py-4 text-4xl tracking-widest xl:p-12 font-oswald sm:text-4xl md:text-5xl lg:text-8xl 2xl:text-9xl'
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
            .pause(500)
          return instance;
        }}
      />
      <hr className='w-4/6 m-4 mx-auto border-t-4 border-accent' />
      {Done ? (
        <TypeIt
          className='px-8 py-4 text-2xl text-center xl:p-12 xl:text-4xl'
          options={{
            lifeLike: true,
            html: true,
            cursor: false,
            speed: 10,
          }}
          lifeLike
          getBeforeInit={(instance) => {
            instance
              .type("HTML |")
              .type(" CSS |")
              .type(" JAVASCRIPT |")
              .type(" TYPESCRIPT |")
              .type(" REACT |")
              .type(" NEXTJS |")
              .type(" REDUX |")
              .type(" TAILWINDCSS |")
              .type(" STYLED-COMPONENTS |")
              .type(" FIREBASE |")
              .type(" MONGODB |")
              .type(" MYSQL |")
              .type(" PRISMA");
            return instance;
          }}
        />
      ) : null}
    </>
  );
};

export default Typewriter;
