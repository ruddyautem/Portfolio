'use client';

import { useMemo, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const HINGE_CONFIG = {
  top: { origin: '50% 0%', rotateX: -92, rotateY: 0 },
  bottom: { origin: '50% 100%', rotateX: 92, rotateY: 0 },
  left: { origin: '0% 50%', rotateX: 0, rotateY: 92 },
  right: { origin: '100% 50%', rotateX: 0, rotateY: -92 },
};

const HINGE_SHADING = {
  top: 'after:bg-linear-to-b after:from-black/60 after:via-black/20 after:to-white/25',
  bottom: 'after:bg-linear-to-t after:from-black/60 after:via-black/20 after:to-white/25',
  left: 'after:bg-linear-to-r after:from-black/60 after:via-black/20 after:to-white/25',
  right: 'after:bg-linear-to-l after:from-black/60 after:via-black/20 after:to-white/25',
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const renderWhitespace = (value, key) =>
  value.split(/(\n)/).map((part, index) => {
    if (part === '\n') return <br key={`${key}-br-${index}`} />;
    if (!part) return null;
    return (
      <span className="inline" key={`${key}-space-${index}`}>
        {part.replace(/ /g, '\u00A0')}
      </span>
    );
  });

const FoldPiece = ({
  content,
  delay,
  hinge,
  hingeConfig,
  safeCrease,
  duration,
  ease,
  reducedMotion,
  loop,
  play,
  hideBeforePlay,
  perspective,
  split,
}) => {
  const folded = {
    opacity: 0,
    rotateX: reducedMotion ? 0 : hingeConfig.rotateX,
    rotateY: reducedMotion ? 0 : hingeConfig.rotateY,
    '--fold-crease': reducedMotion ? 0 : safeCrease,
  };
  const unfolded = { opacity: 1, rotateX: 0, rotateY: 0, '--fold-crease': 0 };

  return (
    <span
      className={`inline-block align-baseline [perspective:var(--fold-perspective)] [transform-style:preserve-3d] ${split === 'line' ? 'block' : ''}`}
      style={{ '--fold-perspective': `${perspective}px` }}
    >
      <motion.span
        className={`relative inline-block will-change-transform [backface-visibility:hidden] [transform-style:preserve-3d] after:pointer-events-none after:absolute after:-inset-x-[0.02em] after:-inset-y-[0.08em] after:rounded-[0.08em] after:opacity-(--fold-crease) after:[mix-blend-mode:multiply] ${HINGE_SHADING[hinge] || HINGE_SHADING.top}`}
        initial={play || hideBeforePlay ? folded : unfolded}
        animate={play ? unfolded : hideBeforePlay ? folded : unfolded}
        transition={{
          duration: reducedMotion ? Math.min(duration, 0.22) : duration,
          delay: reducedMotion ? Math.min(delay, 0.02) : delay,
          ease: reducedMotion ? 'easeOut' : ease,
          ...(loop ? { repeat: Infinity, repeatDelay: 0.75 } : {}),
        }}
        style={{ transformOrigin: hingeConfig.origin, '--fold-crease': 0 }}
      >
        {content || '\u00A0'}
      </motion.span>
    </span>
  );
};

const FoldText = ({
  text = 'Design unfolds',
  splitBy = 'char',
  hinge = 'top',
  duration = 0.65,
  stagger = 0.045,
  ease = 'easeOut',
  perspective = 700,
  creaseShading = 0.55,
  trigger = 'mount',
  fontSize = 80,
  fontWeight = 800,
  color = '#f7f2e8',
  whiteSpace = 'pre-wrap',
  className = '',
  style = {},
}) => {
  const rootRef = useRef(null);
  const isInView = useInView(rootRef, { once: true, margin: '0px 0px -18% 0px' });
  const reducedMotion = useReducedMotion();
  const [hoverCycle, setHoverCycle] = useState(0);
  const hingeConfig = HINGE_CONFIG[hinge] || HINGE_CONFIG.top;
  const safeCrease = clamp(creaseShading, 0, 1);
  const safePerspective = Math.max(120, perspective);

  const shouldAnimate =
    trigger === 'scroll' ? isInView : trigger === 'hover' ? hoverCycle > 0 : true;
  const animationCycle = trigger === 'hover' ? hoverCycle : shouldAnimate ? 1 : 0;

  const segments = useMemo(() => {
    let segmentIndex = 0;
    const renderSegment = (content, key, split = splitBy) => {
      const index = segmentIndex++;
      return (
        <FoldPiece
          content={content}
          delay={index * stagger}
          duration={duration}
          ease={ease}
          hinge={hinge}
          hingeConfig={hingeConfig}
          key={`${key}-${animationCycle}`}
          loop={trigger === 'loop'}
          play={shouldAnimate}
          hideBeforePlay={trigger === 'scroll'}
          perspective={safePerspective}
          reducedMotion={Boolean(reducedMotion)}
          safeCrease={safeCrease}
          split={split}
        />
      );
    };

    if (splitBy === 'line') {
      return text.split('\n').map((line, index) => (
        <span className="block" key={`line-${index}`}>
          {renderSegment(line || '\u00A0', `segment-line-${index}`, 'line')}
        </span>
      ));
    }

    if (splitBy === 'word') {
      return text.split(/(\s+)/).flatMap((part, index) => {
        if (!part) return [];
        if (/^\s+$/.test(part)) return renderWhitespace(part, `ws-${index}`);
        return renderSegment(part, `segment-word-${index}`);
      });
    }

    return Array.from(text).map((char, index) => {
      if (char === '\n') return <br key={`br-${index}`} />;
      return renderSegment(char === ' ' ? '\u00A0' : char, `segment-char-${index}`);
    });
  }, [
    animationCycle,
    duration,
    ease,
    hinge,
    hingeConfig,
    reducedMotion,
    safeCrease,
    safePerspective,
    shouldAnimate,
    stagger,
    splitBy,
    text,
    trigger,
  ]);

  return (
    <span
      ref={rootRef}
      className={`inline-block select-text ${whiteSpace === 'nowrap' ? 'whitespace-nowrap' : 'whitespace-pre-wrap'} leading-[0.95] tracking-[-0.04em] ${className}`.trim()}
      onMouseEnter={trigger === 'hover' ? () => setHoverCycle((cycle) => cycle + 1) : undefined}
      style={{
        '--fold-text-font-size': typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
        '--fold-text-font-weight': fontWeight,
        '--fold-text-color': color,
        color: 'var(--fold-text-color)',
        fontSize: 'var(--fold-text-font-size)',
        fontWeight: 'var(--fold-text-font-weight)',
        ...style,
      }}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{segments}</span>
    </span>
  );
};

export default FoldText;
