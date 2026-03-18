"use client";

import { Mail, MapPin, Linkedin, Github, Download, Terminal, Database, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* 1. ENGINEERING GRID BACKGROUND */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* 2. GLOWING ORBS FOR PREMIUM DEPTH */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-accent-secondary/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      {/* 3. FLOATING TECH ELEMENTS (Glassmorphic) */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute hidden md:flex top-32 left-[15%] flex-col items-center gap-2 p-3 rounded-2xl bg-card/30 backdrop-blur-md border border-border/50 shadow-2xl"
      >
        <Database className="text-accent" size={28} />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 25, 0], rotate: [0, -5, 0] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute hidden md:flex bottom-40 right-[15%] flex-col items-center gap-2 p-3 rounded-2xl bg-card/30 backdrop-blur-md border border-border/50 shadow-2xl"
      >
        <Code2 className="text-accent-secondary" size={28} />
      </motion.div>

      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }} 
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute hidden md:flex top-40 right-[20%] flex-col items-center gap-2 p-3 rounded-2xl bg-card/30 backdrop-blur-md border border-border/50 shadow-2xl"
      >
        <Terminal className="text-foreground" size={28} />
      </motion.div>


      <div className="relative z-10 mx-auto max-w-5xl px-6 flex flex-col items-center text-center">
        
        {/* Status badge - Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10 inline-flex items-center gap-3 rounded-full border border-border/50 bg-card/40 backdrop-blur-md px-5 py-2.5 text-sm font-medium text-foreground shadow-lg"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          Available for new opportunities
        </motion.div>

        {/* Name with Terminal Prompt */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-foreground mb-6 flex items-center justify-center gap-2 md:gap-4"
        >
          <span className="text-accent text-4xl sm:text-5xl md:text-7xl font-mono opacity-80">{">"}</span>
          Atakan Arda Celik
        </motion.h1>

        {/* Dynamic Typewriter Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-3xl text-muted-foreground font-medium mb-8 h-10"
        >
          Engineering solutions in{' '}
          <span className="text-accent font-semibold">
            <Typewriter
              words={['Full-Stack Development', 'API-Driven Systems', 'Modern Web Applications']}
              loop={true}
              cursor
              cursorStyle='_'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
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

        {/* Interactive Action Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {/* Primary CTA */}
          <a
            href="/AtakanArda_Celik_CV.pdf"
            download
            className="group relative inline-flex items-center justify-center gap-3 rounded-2xl bg-accent px-8 py-4 text-base font-bold text-accent-foreground shadow-[0_0_40px_-10px_rgba(14,165,233,0.5)] hover:shadow-[0_0_60px_-15px_rgba(14,165,233,0.7)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* Button Shine Effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
            
            <Download size={20} className="group-hover:scale-110 transition-transform" />
            Download my CV
          </a>

          {/* Minimalist Social Links (Glassmorphism) */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Atakan97"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-card/30 backdrop-blur-md border border-border/50 text-foreground hover:bg-accent/10 hover:border-accent/50 hover:text-accent transition-all duration-300 hover:-translate-y-1"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/atakan-arda-celik-8b6b36192/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-card/30 backdrop-blur-md border border-border/50 text-foreground hover:bg-accent/10 hover:border-accent/50 hover:text-accent transition-all duration-300 hover:-translate-y-1"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
            <a
              href="mailto:celikatakanarda@gmail.com"
              className="p-4 rounded-2xl bg-card/30 backdrop-blur-md border border-border/50 text-foreground hover:bg-accent/10 hover:border-accent/50 hover:text-accent transition-all duration-300 hover:-translate-y-1"
              aria-label="Email"
            >
              <Mail size={22} />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
