"use client";

import { useSyncExternalStore } from "react";
import { Github, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import PremiumTypewriter from "./PremiumTypewriter";
import AskAiButton from "./chat/AskAiButton";
import AnimatedPill from "./ui/animated-pill";

const specialties = [
  "Full-Stack Development",
  "AI-Driven Systems",
  "Modern Web Applications",
];

function subscribeToHydration() {
  return () => {};
}

export default function Hero() {
  const motionPreference = useReducedMotion();
  const hasHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const shouldReduceMotion = hasHydrated && motionPreference === true;

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-black px-6 pb-28 pt-36 text-white sm:px-10 sm:pb-32 sm:pt-44"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#030712_0%,#000_30%,#000_85%,#020617_100%)]" />

        {hasHydrated && motionPreference === false && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            disablePictureInPicture
            tabIndex={-1}
            className="absolute inset-x-0 bottom-0 h-[72%] w-full object-cover object-center opacity-70 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_80%,transparent)] sm:h-[85%]"
          >
            <source src="/hero/jelly-background.mp4" type="video/mp4" />
          </video>
        )}

        <div className="absolute left-1/2 top-1/3 h-64 w-[85%] max-w-3xl -translate-x-1/2 -rotate-30 rounded-full bg-blue-500/20 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.25),rgba(0,0,0,0.55)_45%,transparent_85%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <motion.h1
          id="hero-heading"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.1 }}
          className="mb-5 bg-gradient-to-b from-red-200 via-blue-200 to-white bg-clip-text pb-2 text-5xl leading-[1.06] font-normal tracking-tighter text-balance text-transparent sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Atakan Arda Celik
        </motion.h1>

        <motion.h2
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.15 }}
          className="text-2xl font-normal tracking-tight text-slate-200 sm:text-3xl md:text-4xl"
        >
          Software Engineer
        </motion.h2>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.2 }}
          className="mt-8 mb-6 flex flex-col items-center text-lg leading-relaxed text-slate-400 sm:text-xl md:text-2xl"
        >
          <span>Engineering solutions in</span>
          <span className="mt-1 min-h-[1.5em] font-medium text-blue-100">
            {shouldReduceMotion ? (
              specialties[0]
            ) : (
              <PremiumTypewriter
                words={specialties}
                delay={1500}
                typeSpeed={0.07}
                deleteSpeed={0.04}
                cursorChar="_"
              />
            )}
          </span>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: 0.4 }}
          className="mb-9 flex items-center justify-center gap-2 text-slate-400"
        >
          <MapPin size={16} aria-hidden="true" className="text-blue-200/80" />
          <span className="text-sm tracking-wide">Passau, Germany</span>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <AskAiButton />
          <AnimatedPill
            label="GitHub"
            icon={Github}
            href="https://github.com/Atakan97/Portfolio"
            aria-label="View the portfolio repository on GitHub (opens in a new tab)"
          />
        </motion.div>
      </div>
    </section>
  );
}
