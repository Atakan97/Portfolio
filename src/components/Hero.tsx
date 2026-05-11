"use client";

import { Mail, MapPin, Linkedin, Github, Terminal, Database, Code2 } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import PremiumTypewriter from "./PremiumTypewriter";
import Image from "next/image";
import { SocialIcons } from "./ui/social-icons";


export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] pt-32 pb-20 flex flex-col justify-center overflow-hidden"
    >


      <div className="relative z-10 mx-auto max-w-5xl px-6 flex flex-col items-center text-center">

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-foreground mb-3 flex items-center justify-center gap-2 md:gap-4 font-serif"
        >
          Atakan Arda Celik
        </motion.h1>

        {/* Professional Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground/80 tracking-wide mb-8 font-serif"
        >
          Software Engineer
        </motion.h2>

        {/* Dynamic Typewriter Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center md:block text-xl md:text-3xl text-muted-foreground font-medium mb-8 font-serif text-center"
        >
          <span>Engineering solutions in{" "}</span>
          <span className="text-accent font-semibold font-serif">
            <PremiumTypewriter
              words={['Full-Stack Development', 'AI-Driven Systems', 'Modern Web Applications']}
              delay={1500}
              typeSpeed={0.07}
              deleteSpeed={0.04}
              cursorChar='_'
            />
          </span>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex items-center justify-center gap-2 text-muted-foreground mb-12"
        >
          <MapPin size={18} className="text-accent-secondary" />
          <span className="text-base font-medium tracking-wide">Passau, Germany</span>
        </motion.div>

      </div>
    </section>
  );
}
