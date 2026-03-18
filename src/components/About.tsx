"use client";

import { motion } from "framer-motion";
import { GraduationCap, Code, BrainCircuit } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="min-h-screen py-24 bg-section-alt">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="mb-12">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-accent mb-8 text-center">
              About Me
            </h2>

            {/* Profile photo – LinkedIn-style circular */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex justify-center mb-10"
            >
              <div className="relative group">
                {/* Glow ring */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-accent to-accent-secondary opacity-30 blur-md group-hover:opacity-50 transition-opacity duration-500" />
                {/* Photo container */}
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-card shadow-xl shadow-accent/10 ring-2 ring-border">
                  <Image
                    src="/profile-photo.jpg"
                    alt="Atakan Arda Celik"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 160px, 192px"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            <div className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto space-y-6 text-left">
              <p>
                I&apos;m Atakan Arda Celik, a software engineer holding an M.Sc. in Computer Science from the University of Passau, Germany and a B.Sc. in Computer Engineering from Dokuz Eylul University, Turkey.
              </p>
              <p>
                My professional background is focused on full-stack development, with experience designing and delivering production-ready applications using Spring Boot, ASP.NET Core, and modern JavaScript frameworks. I work effectively in international, Agile-driven teams and bring a structured, detail-oriented mindset to every project I contribute to.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="grid gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="rounded-2xl border border-border bg-card p-6 text-center hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <GraduationCap size={24} />
              </div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Education</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                M.Sc. in Computer Science from the University of Passau and B.Sc. in Computer Engineering from Dokuz Eylul University.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="rounded-2xl border border-border bg-card p-6 text-center hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Code size={24} />
              </div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Full-Stack Development</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Foundation in Full-stack workflows, building applications with modern frameworks.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="rounded-2xl border border-border bg-card p-6 text-center hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <BrainCircuit size={24} />
              </div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Engineering Mindset</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
              I focus on writing clear, reliable code and solving problems in a practical way.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
