"use client";

import { Mail, MapPin, Linkedin, Github, Download, Terminal, Database, Code2 } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import PremiumTypewriter from "./PremiumTypewriter";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] pt-32 pb-20 flex flex-col justify-center overflow-hidden bg-background"
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 transform-gpu will-change-transform">
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
        className="absolute hidden md:flex top-45 right-[18%] flex-col items-center gap-2 p-3 rounded-2xl bg-card/30 backdrop-blur-md border border-border/50 shadow-2xl"
      >
        <Terminal className="text-foreground" size={28} />
      </motion.div>


      <div className="relative z-10 mx-auto max-w-5xl px-6 flex flex-col items-center text-center">

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
          className="text-xl md:text-3xl text-muted-foreground font-medium mb-8 h-10 translate-x-2 md:translate-x-8"
        >
          Engineering solutions in{" "}
          <span className="text-accent font-semibold">
            <PremiumTypewriter
              words={['Full-Stack Development', 'API-Driven Systems', 'Modern Web Applications']}
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

        {/* Modern Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <EducationCard />
          <ProblemSolvingCard />
          <EngineeringCard />
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

// --- ANIMATED FEATURE CARDS COMPONENTS ---

const TiltFeatureCard = ({ 
  title, 
  description, 
  imageSrc, 
  glowColor, 
  hoverBorder 
}: { 
  title: string, 
  description: string, 
  imageSrc: string, 
  glowColor: string, 
  hoverBorder: string 
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const mouseXPercentage = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const mouseYPercentage = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseXPercentage} ${mouseYPercentage}, ${glowColor}, transparent 40%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`group relative flex flex-col justify-between h-72 rounded-2xl border border-border/50 bg-card/20 backdrop-blur-md p-6 overflow-visible shadow-lg transition-colors duration-300 hover:${hoverBorder}`}
    >
      {/* 3D Content Background Container */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl pointer-events-none" style={{ transform: "translateZ(-30px)" }}>
        
        {/* Mouse Parallax Background Tracking */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{
             x: useTransform(mouseXSpring, [-0.5, 0.5], ["-4%", "4%"]),
             y: useTransform(mouseYSpring, [-0.5, 0.5], ["-4%", "4%"]),
          }}
        >
          {/* Drifting Camera Loop (Cinematic Flow) */}
          <motion.div 
             className="absolute inset-[-15%] w-[130%] h-[130%] origin-center"
             animate={{ scale: [1, 1.15, 1], x: ["0%", "-6%", "0%"], y: ["0%", "-4%", "0%"] }}
             transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          >
             <Image src={imageSrc} alt={title} fill className="object-cover opacity-60" sizes="(max-width: 768px) 100vw, 33vw" priority />
          </motion.div>
        </motion.div>
        
        {/* Gradient Mask to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/60 to-background/20 z-10" />
        
        {/* Interactive Spotlight Glare (Holographic effect) */}
        <motion.div 
          className="absolute inset-0 z-20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background }}
        />
      </div>
      
      {/* Text Container: Floating in Z space */}
      <div className="relative z-10 flex flex-col h-full pointer-events-auto" style={{ transform: "translateZ(50px)" }}>
         <div className="mb-auto">
           <h4 className="text-2xl font-bold tracking-tight text-foreground transition-colors drop-shadow-lg">{title}</h4>
         </div>
         <div>
           <p className="text-sm text-gray-300 font-medium leading-relaxed drop-shadow-xl">
             {description}
           </p>
         </div>
      </div>
    </motion.div>
  );
};

const EducationCard = () => (
  <TiltFeatureCard 
    title="Education"
    description="M.Sc. in Computer Science from the University of Passau and B.Sc. in Computer Engineering from Dokuz Eylul University."
    imageSrc="/images/hero_education_bg.png"
    glowColor="rgba(59,130,246,0.5)"
    hoverBorder="border-blue-500/40"
  />
);

const ProblemSolvingCard = () => (
  <TiltFeatureCard 
    title="Problem-Solving"
    description="I am approaching challenges comprehensively in order to build scalable, and user-focused solutions."
    imageSrc="/images/hero_fullstack_bg.png"
    glowColor="rgba(16,185,129,0.5)"
    hoverBorder="border-emerald-500/40"
  />
);

const EngineeringCard = () => (
  <TiltFeatureCard 
    title="Engineering"
    description="I am passionate about producing readable, maintainable code and creating efficient systems."
    imageSrc="/images/hero_engineering_bg.png"
    glowColor="rgba(245,158,11,0.5)"
    hoverBorder="border-amber-500/40"
  />
);
