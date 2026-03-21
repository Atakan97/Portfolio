"use client";

import { motion } from "framer-motion";
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

        </motion.div>
      </div>
    </section>
  );
}
