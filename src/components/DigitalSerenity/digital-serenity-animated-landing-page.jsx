"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const AnimatedLink = ({ href, children, delay = 0 }) => (
  <Link
    href={href}
    data-delay={delay}
    className="group word-animate border-accent relative flex w-[140px] items-center justify-center border px-2 py-3 text-sm transition-all duration-300 hover:scale-105 sm:w-[180px] sm:px-3 sm:py-4 sm:text-base md:w-[200px] md:px-4 md:py-5 md:text-lg lg:py-6 lg:text-xl xl:w-[240px] xl:text-2xl"
  >
    <span className="relative z-10 w-full truncate text-center group-hover:text-white">
      {children}
    </span>
    <div className="group-hover:border-accent absolute inset-0 h-full w-full border-2 border-transparent transition-all duration-300 ease-out" />
    <div className="bg-accent absolute top-0 left-0 h-1 w-0 transition-all duration-300 ease-out group-hover:w-full" />
    <div className="bg-accent absolute top-0 right-0 h-0 w-1 transition-all duration-300 ease-out group-hover:h-full" />
    <div className="bg-accent absolute right-0 bottom-0 h-1 w-0 transition-all duration-300 ease-out group-hover:w-full" />
    <div className="bg-accent absolute bottom-0 left-0 h-0 w-1 transition-all duration-300 ease-out group-hover:h-full" />
  </Link>
);

const ConstellationBackground = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationFrameId = useRef(null);

  const draw = useCallback((ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas fully
    // No fillStyle here to let the underlying CSS background gradient shine through

    particles.current.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`; // White particles
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw connections with white/gray color
      particles.current.forEach(otherP => {
        if (p === otherP) return;
        const dist = Math.hypot(p.x - otherP.x, p.y - otherP.y);
        if (dist < 150) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 - dist / 300})`; // Subtle white lines
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(otherP.x, otherP.y);
          ctx.stroke();
        }
      });
    });

    animationFrameId.current = requestAnimationFrame(() => draw(ctx, canvas));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.current = Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
      }));
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    animationFrameId.current = requestAnimationFrame(() => draw(ctx, canvas));

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-40" // Reduced opacity for subtlety
      style={{ zIndex: 1 }}
    />
  );
};


const DigitalSerenity = () => {
  const [mouseGradientStyle, setMouseGradientStyle] = useState({
    left: "0px",
    top: "0px",
    opacity: 0,
  });
  const [ripples, setRipples] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const wordsRef = useRef([]);
  const floatingElementsRef = useRef([]);

  useEffect(() => {
    const animateWords = () => {
      const wordElements = document.querySelectorAll(".word-animate");
      wordElements.forEach((word) => {
        const delay = parseInt(word.getAttribute("data-delay")) || 0;
        setTimeout(() => {
          if (word) word.style.animation = "word-appear 0.5s ease-out forwards";
        }, delay);
      });
    };
    const timeoutId = setTimeout(animateWords, 50);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouseGradientStyle({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        opacity: 1,
      });
    };
    const handleMouseLeave = () => {
      setMouseGradientStyle((prev) => ({ ...prev, opacity: 0 }));
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(
        () => setRipples((prev) => prev.filter((r) => r.id !== newRipple.id)),
        1000,
      );
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const wordElements = document.querySelectorAll(".word-animate");
    const handleMouseEnter = (e) => {
      if (e.target)
        e.target.style.textShadow = "0 0 20px rgba(203, 213, 225, 0.5)";
    };
    const handleMouseLeave = (e) => {
      if (e.target) e.target.style.textShadow = "none";
    };
    wordElements.forEach((word) => {
      word.addEventListener("mouseenter", handleMouseEnter);
      word.addEventListener("mouseleave", handleMouseLeave);
    });
    return () => {
      wordElements.forEach((word) => {
        if (word) {
          word.removeEventListener("mouseenter", handleMouseEnter);
          word.removeEventListener("mouseleave", handleMouseLeave);
        }
      });
    };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".floating-element-animate");
    floatingElementsRef.current = Array.from(elements);
    const handleScroll = () => {
      if (!scrolled) {
        setScrolled(true);
        floatingElementsRef.current.forEach((el, index) => {
          setTimeout(
            () => {
              if (el) {
                el.style.animationPlayState = "running";
                el.style.opacity = "";
              }
            },
            parseFloat(el.style.animationDelay || "0") * 1000 + index * 50,
          );
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const pageStyles = `
    #mouse-gradient-react {
      position: fixed;
      pointer-events: none;
      border-radius: 9999px;
      background-image: radial-gradient(circle, rgba(156, 163, 175, 0.05), rgba(107, 114, 128, 0.05), transparent 70%);
      transform: translate(-50%, -50%);
      will-change: left, top, opacity;
      transition: left 70ms linear, top 70ms linear, opacity 300ms ease-out;
    }
    @keyframes word-appear { 0% { opacity: 0; transform: translateY(20px) scale(0.9); filter: blur(5px); } 100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); } }
    @keyframes grid-draw { 0% { stroke-dashoffset: 1000; opacity: 0; } 50% { opacity: 0.3; } 100% { stroke-dashoffset: 0; opacity: 0.15; } }
    @keyframes pulse-glow { 0%, 100% { opacity: 0.1; transform: scale(1); } 50% { opacity: 0.3; transform: scale(1.1); } }
    .word-animate { display: inline-block; opacity: 0; margin: 0 0.1em; transition: color 0.3s ease, transform 0.3s ease, text-shadow 0.3s ease; }
    .grid-line { stroke: #94a3b8; stroke-width: 0.5; opacity: 0; stroke-dasharray: 5 5; stroke-dashoffset: 1000; animation: grid-draw 1.5s ease-out forwards; }
    .corner-element-animate { position: absolute; width: 40px; height: 40px; border: 1px solid rgba(203, 213, 225, 0.2); opacity: 0; animation: word-appear 0.8s ease-out forwards; }
    .text-decoration-animate { position: relative; }
    .text-decoration-animate::after { content: ''; position: absolute; bottom: -12px; left: 0; width: 0; height: 1px; background: linear-gradient(90deg, transparent, #cbd5e1, transparent); animation: underline-grow 1.5s ease-out forwards; animation-delay: 0.8s; }
    @keyframes underline-grow { to { width: 100%; } }
    .floating-element-animate { position: absolute; width: 2px; height: 2px; background: #cbd5e1; border-radius: 50%; opacity: 0; animation: float 4s ease-in-out infinite; animation-play-state: paused; }
    @keyframes float { 0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; } 25% { transform: translateY(-10px) translateX(5px); opacity: 0.6; } 50% { transform: translateY(-5px) translateX(-3px); opacity: 0.4; } 75% { transform: translateY(-15px) translateX(7px); opacity: 0.8; } }
    .ripple-effect { position: fixed; width: 4px; height: 4px; background: rgba(203, 213, 225, 0.6); border-radius: 50%; transform: translate(-50%, -50%); pointer-events: none; animation: pulse-glow 1s ease-out forwards; z-index: 9999; }
    .tech-span { margin: 0 0.25em; display: inline-block; }
    .tech-container { line-height: 1.8; }
  `;

  return (
    <>
      <style>{pageStyles}</style>
      <div className="font-primary relative h-full w-full overflow-hidden  text-slate-100"> {/* Added explicit background colors */}
        {/* Constellation Background */}
        <ConstellationBackground />

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{ zIndex: 2 }}
        >
          <defs>
            <pattern
              id="gridReactDarkResponsive"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="rgba(100, 116, 139, 0.1)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#gridReactDarkResponsive)"
          />
          <line
            x1="0"
            y1="20%"
            x2="100%"
            y2="20%"
            className="grid-line"
            style={{ animationDelay: "0.1s" }}
          />
          <line
            x1="0"
            y1="80%"
            x2="100%"
            y2="80%"
            className="grid-line"
            style={{ animationDelay: "0.2s" }}
          />
          <line
            x1="20%"
            y1="0"
            x2="20%"
            y2="100%"
            className="grid-line"
            style={{ animationDelay: "0.3s" }}
          />
          <line
            x1="80%"
            y1="0"
            x2="80%"
            y2="100%"
            className="grid-line"
            style={{ animationDelay: "0.4s" }}
          />
          <line
            x1="50%"
            y1="0"
            x2="50%"
            y2="100%"
            className="grid-line"
            style={{ animationDelay: "0.5s", opacity: "0.05" }}
          />
          <line
            x1="0"
            y1="50%"
            x2="100%"
            y2="50%"
            className="grid-line"
            style={{ animationDelay: "0.6s", opacity: "0.05" }}
          />
        </svg>

        <div
          className="floating-element-animate"
          style={{ top: "25%", left: "15%", animationDelay: "0.1s", zIndex: 3 }}
        ></div>
        <div
          className="floating-element-animate"
          style={{ top: "60%", left: "85%", animationDelay: "0.2s", zIndex: 3 }}
        ></div>
        <div
          className="floating-element-animate"
          style={{ top: "40%", left: "10%", animationDelay: "0.3s", zIndex: 3 }}
        ></div>
        <div
          className="floating-element-animate"
          style={{ top: "75%", left: "90%", animationDelay: "0.4s", zIndex: 3 }}
        ></div>

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-8 sm:px-8 md:px-16">
          {/* Top Section */}
          <div className="mb-8 text-center">
            <h2 className="font-mono text-xs font-light tracking-[0.2em] text-slate-300 uppercase opacity-80 sm:text-sm">
              <span className="word-animate" data-delay="0">
                Autem
              </span>
              <span className="word-animate" data-delay="20">
                .
              </span>
              <span className="word-animate" data-delay="40">
                dev
              </span>
            </h2>
            <div className="mx-auto mt-4 h-px w-12 bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-30 sm:w-16"></div>
          </div>

          {/* Main Content */}
          <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 text-center">
            <h1 className="text-decoration-animate text-accent leading-tight font-extralight tracking-tight">
              {/* Ruddy Autem */}
              <div className="mb-4 text-4xl sm:text-6xl md:mb-6 md:text-7xl xl:text-9xl">
                <span className="word-animate" data-delay="100">
                  Ruddy
                </span>
                <span className="word-animate" data-delay="150">
                  Autem
                </span>
              </div>
              {/* Développeur Web Full Stack */}
              <div className="text-2xl leading-relaxed font-thin tracking-wide text-slate-300 md:text-4xl xl:text-5xl">
                <span className="word-animate" data-delay="200">
                  Développeur
                </span>
                <span className="word-animate" data-delay="250">
                  Web
                </span>
                <span className="word-animate" data-delay="300">
                  Full
                </span>
                <span className="word-animate" data-delay="350">
                  Stack
                </span>
              </div>
            </h1>

            {/* Navigation Links with reduced widths */}
            <div className="mt-12 flex flex-col items-center gap-4 sm:mt-16 sm:flex-row sm:justify-center md:gap-6">
              <AnimatedLink href="/projects" delay={450}>
                Projets
              </AnimatedLink>
              <AnimatedLink href="/about" delay={500}>
                Profil
              </AnimatedLink>
              <AnimatedLink href="/contact" delay={550}>
                Contact
              </AnimatedLink>
              <AnimatedLink href="/cv" delay={600}>
                CV
              </AnimatedLink>
            </div>
          </div>

          {/* Bottom Tech Stack Section */}
          <div className="mt-8 mb-12 w-full max-w-7xl px-4 text-center">
            <div className="mx-auto mb-4 h-px w-12 bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-30 sm:w-16"></div>
            <div className="tech-container font-mono text-xs font-light tracking-[0.2em] text-slate-300 uppercase opacity-80 sm:text-base">
              <span className="word-animate tech-span" data-delay="900">
                HTML
              </span>
              <span className="word-animate tech-span" data-delay="920">
                CSS
              </span>
              <span className="word-animate tech-span" data-delay="940">
                JAVASCRIPT
              </span>
              <span className="word-animate tech-span" data-delay="960">
                TYPESCRIPT
              </span>
              <span className="word-animate tech-span" data-delay="980">
                REACT
              </span>
              <span className="word-animate tech-span" data-delay="1000">
                NEXTJS
              </span>
              <span className="word-animate tech-span" data-delay="1020">
                TAILWINDCSS
              </span>
              <span className="word-animate tech-span" data-delay="1040">
                STYLED-COMPONENTS
              </span>
              <span className="word-animate tech-span" data-delay="1060">
                CLERK
              </span>
              <span className="word-animate tech-span" data-delay="1080">
                FIREBASE
              </span>
              <span className="word-animate tech-span" data-delay="1100">
                MONGODB
              </span>
              <span className="word-animate tech-span" data-delay="1120">
                REDUX
              </span>
              <span className="word-animate tech-span" data-delay="1140">
                MYSQL
              </span>
              <span className="word-animate tech-span" data-delay="1160">
                SANITY
              </span>
              <span className="word-animate tech-span" data-delay="1180">
                PRISMA
              </span>
            </div>
            <div
              className="mt-6 flex justify-center space-x-4 opacity-0"
              style={{
                animation: "word-appear 0.6s ease-out forwards",
                animationDelay: "1.1s",
              }}
            >
              <div className="h-1 w-1 rounded-full bg-slate-300 opacity-40"></div>
              <div className="h-1 w-1 rounded-full bg-slate-300 opacity-60"></div>
              <div className="h-1 w-1 rounded-full bg-slate-300 opacity-40"></div>
            </div>
          </div>
        </div>

        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="ripple-effect"
            style={{ left: `${ripple.x}px`, top: `${ripple.y}px`, zIndex: 9999 }} 
          ></div>
        ))}
      </div>
    </>
  );
};

export default DigitalSerenity;
