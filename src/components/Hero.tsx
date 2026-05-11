"use client";

import { Mail, MapPin, Linkedin, Github, Terminal, Database, Code2 } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import PremiumTypewriter from "./PremiumTypewriter";
import Image from "next/image";
import { SocialIcons } from "./ui/social-icons";
import { FeatureCard } from "./ui/card-4";
import { useSection } from "@/hooks/useActiveSection";

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
          className="text-xl md:text-3xl text-muted-foreground font-medium mb-8 h-10 translate-x-2 md:translate-x-8 font-serif"
        >
          Engineering solutions in{" "}
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

      </div>
    </section>
  );
}

// --- ANIMATED FEATURE CARDS COMPONENTS ---

const EducationCard = () => {
  const { navigateTo } = useSection();
  return (
    <FeatureCard
      title="Education"
      description="M.Sc. in Computer Science from the University of Passau and B.Sc. in Computer Engineering from Dokuz Eylul University."
      imageUrl="https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800&auto=format&fit=crop"
      stats={[{ label: "Degree", value: "M.Sc." }, { label: "Major", value: "Computer Science" }]}
      actionLabel="More About Me"
      onActionClick={() => navigateTo('about')}
    />
  );
};

const ProblemSolvingCard = () => {
  const { navigateTo } = useSection();
  return (
    <FeatureCard
      title="Problem-Solving"
      description="I am approaching challenges comprehensively in order to build scalable, and user-focused solutions."
      imageUrl="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop"
      stats={[{ label: "Mindset", value: "Analytical" }, { label: "Target", value: "Scalable" }]}
      actionLabel="View Projects"
      onActionClick={() => navigateTo('projects')}
    />
  );
};

const EngineeringCard = () => {
  const { navigateTo } = useSection();
  return (
    <FeatureCard
      title="Engineering"
      description="I am passionate about producing readable, maintainable code and creating efficient systems."
      imageUrl="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop"
      stats={[{ label: "Code", value: "Clean" }, { label: "Systems", value: "Efficient" }]}
      actionLabel="View Experience"
      onActionClick={() => navigateTo('experience')}
    />
  );
};
