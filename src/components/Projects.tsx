"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

interface Project {
  title: string;
  tech: string[];
  description: string[];
  image?: string;
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    title: "PlaqueAnalyzer Studio",
    tech: ["Java", "Spring Boot", "JavaScript", "PostgreSQL", "Docker"],
    description: [
      "Built an interactive web application to teach database normalization with “plaque” redundancy visualization and guided decomposition up to BCNF.",
      "Implemented real-time progress updates with Server-Sent Events (SSE) and an adaptive computation strategy using Monte Carlo approximation.",
    ],
    image: "/projects/plaque-analyzer.png",
    link: "https://plaqueanalyzerstudio-production.up.railway.app/",
  },
  {
    title: "The Art of War",
    tech: ["C#", "Unity"],
    description: [
      "Developed a real-time strategy simulation game, implementing unit combat mechanics and AI behaviors.",
      "Applied A* pathfinding, unit formation, and real-time, state-based decision-making algorithms to control and navigate armies effectively.",
    ],
    github: "https://github.com/Atakan97/TheArtofWar",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="mb-16 text-center">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">
              Projects
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground">
              Featured Work
            </h3>
            <p className="mt-4 text-muted-foreground max-w-2xl text-lg mx-auto leading-relaxed">
              These projects highlight my approach to solving problems through structured design, considered solutions, and practical engineering decisions.
            </p>
          </div>

          {/* Project cards */}
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500"
              >
                {/* Project Image or Title */}
                {project.image ? (
                  <div className="relative h-64 w-full overflow-hidden border-b border-border/50">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-90" />

                    {/* Floating Title/Icon */}
                    <div className="absolute bottom-5 left-6">
                      <h4 className="text-2xl font-bold text-white drop-shadow-md group-hover:text-accent transition-colors duration-300">
                        {project.title}
                      </h4>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 pb-0">
                    <h4 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h4>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-badge-border bg-badge-bg px-2.5 py-1 text-xs font-semibold text-badge-text shadow-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {project.description.map((d, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0 shadow-[0_0_8px_rgba(var(--accent),0.8)]" />
                        {d}
                      </li>
                    ))}
                  </ul>

                  {/* Links */}
                  {(project.link || project.github) && (
                    <div className="mt-auto pt-5 border-t border-border/40 flex gap-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-accent/20 text-accent font-medium hover:bg-accent/10 transition-all duration-300 shadow-sm"
                        >
                          <Github size={18} />
                          GitHub Repo
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-accent/10 text-accent font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-sm"
                        >
                          <ExternalLink size={18} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
