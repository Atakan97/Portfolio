"use client";

import { useId, useState, type MouseEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useChat } from "./ChatProvider";

export default function AskAiButton() {
  const { openChat, isOpen } = useChat();
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const noiseFilterId = useId();
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const maskX = useSpring(pointerX, { stiffness: 250, damping: 25 });
  const maskY = useSpring(pointerY, { stiffness: 250, damping: 25 });
  const buttonX = useTransform(maskX, (position) => (position - 50) * 0.15);
  const buttonY = useTransform(maskY, (position) => (position - 50) * 0.15);
  const maskRadius = useMotionValue(0);
  const clipPath = useMotionTemplate`circle(${maskRadius}px at ${maskX}% ${maskY}%)`;

  function handleMouseEnter() {
    setIsHovered(true);
    maskRadius.set(100);
  }

  function handleMouseMove(event: MouseEvent<HTMLButtonElement>) {
    if (shouldReduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 100);
    pointerY.set(((event.clientY - bounds.top) / bounds.height) * 100);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    maskRadius.set(0);
    pointerX.set(50);
    pointerY.set(50);
  }

  function renderLabel() {
    return (
      <motion.span
        animate={{
          letterSpacing: isHovered && !shouldReduceMotion ? "0.05em" : "0em",
          scale: isHovered && !shouldReduceMotion ? 1.02 : 1,
        }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        Ask AI
      </motion.span>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={openChat}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      className="relative isolate inline-flex h-12 items-center justify-center overflow-hidden rounded-full border border-neutral-700/70 bg-neutral-950 px-8 text-sm font-bold uppercase text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      style={{
        x: shouldReduceMotion ? 0 : buttonX,
        y: shouldReduceMotion ? 0 : buttonY,
      }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
    >
      <svg aria-hidden="true" focusable="false" className="absolute h-0 w-0">
        <defs>
          <filter id={noiseFilterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -2"
            />
            <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
            <feBlend in="SourceGraphic" in2="monoNoise" mode="screen" />
          </filter>
        </defs>
      </svg>
      <span className="pointer-events-none relative z-10">{renderLabel()}</span>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 flex select-none items-center justify-center bg-white px-8 text-neutral-950"
        style={{
          clipPath: shouldReduceMotion
            ? `circle(${isHovered ? 100 : 0}px at 50% 50%)`
            : clipPath,
          WebkitClipPath: shouldReduceMotion
            ? `circle(${isHovered ? 100 : 0}px at 50% 50%)`
            : clipPath,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
          style={{ filter: `url(#${noiseFilterId})` }}
        />
        {renderLabel()}
      </motion.div>
    </motion.button>
  );
}
