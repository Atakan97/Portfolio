"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ExternalLink, ChevronRight } from "lucide-react";

interface ExperienceItem {
  title: string;
  company: string;
  companyUrl?: string;
  logoUrl?: string;
  logoBg?: string;
  period: string;
  location: string;
  description: string;
  bullets: string[];
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: "Software Developer",
    company: "EPAM Systems",
    companyUrl: "https://www.epam.com",
    logoUrl: "/logos/epam.svg",
    period: "Nov 2021 – Apr 2022",
    location: "Izmir, Turkey",
    description: "Contributed to customizable order management solutions for enterprise clients.",
    bullets: [
      "Developed a customizable order management solution in Java, implementing GraphQL APIs and backend components aligned with customer-specific requirements.",
      "Designed and executed comprehensive API test scenarios using Postman, and implemented unit tests to improve reliability and maintainability.",
      "Collaborated in an international Agile team, clarified requirements through documentation analysis, and supported sprint delivery by managing Jira tickets.",
    ],
    skills: ["Java", "GraphQL", "Spring Boot", "Postman", "Agile/Scrum", "Jira"],
  },
  {
    title: "Software Development Intern",
    company: "C System Software and Information Tech.",
    companyUrl: "https://csistem.com.tr",
    logoUrl: "/logos/csistem.svg",
    period: "Apr 2021 - Jun 2021",
    location: "Izmir, Turkey",
    description: "Built a full-stack customer feedback web application from scratch.",
    bullets: [
      "Built a full-stack customer feedback web application for evaluating proprietary software products.",
      "Implemented backend CRUD workflows and server-side validation using C# and ASP.NET MVC, and integrated the data layer with Entity Framework and Microsoft SQL Server.",
      "Developed the frontend with HTML, CSS, and JavaScript, creating an interactive user interface.",
    ],
    skills: ["C#", "ASP.NET MVC", "Entity Framework", "SQL Server", "JavaScript", "HTML/CSS"],
  },
  {
    title: "IT Intern",
    company: "Yokogawa",
    companyUrl: "https://www.yokogawa.com",
    logoUrl: "/logos/yokogawa.svg",
    logoBg: "#014F99",
    period: "Aug 2019 – Sep 2019",
    location: "Izmir, Turkey",
    description: "Supported and optimized enterprise ICT infrastructure operations.",
    bullets: [
      "Supported day-to-day operations and maintenance of ICT infrastructure, including network upkeep, software rollout, and testing activities.",
      "Assisted with Server Manager administration on Windows to ensure reliable domain integration of company PCs, and provided remote technical support for users.",
      "Configured Microsoft Hyper-V virtual machines to test technical specifications on Linux (Ubuntu).",
    ],
    skills: ["Windows Server", "Hyper-V", "Ubuntu", "Networking", "IT Support"],
  },
];

// Simplified Logo Component without fallback
const ExperienceLogo = ({ item, size = "large" }: { item: ExperienceItem, size?: "small" | "large" }) => {
  const containerClasses = size === "large"
    ? "w-16 h-16 rounded-2xl hidden md:flex"
    : "w-10 h-10 rounded-lg md:hidden shrink-0";

  return (
    <div
      className={`${containerClasses} items-center justify-center shadow-sm group-hover:shadow-accent/20 transition-all duration-300 relative overflow-hidden flex`}
      style={{ backgroundColor: item.logoBg ?? "#ffffff" }}
    >
      {item.logoUrl && (
        <img
          src={item.logoUrl}
          alt={`${item.company} logo`}
          className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
        />
      )}
    </div>
  );
};

export default function Experience() {
  return (
    <section id="experience" className="min-h-screen py-24 bg-section-alt relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] sm:right-[-5%] w-[300px] h-[300px] rounded-full bg-accent/5 blur-[100px]" />
        <div className="absolute bottom-[-10%] sm:left-[-10%] w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-4xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="mb-20 flex flex-col items-center text-center">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-accent mb-3 flex items-center justify-center gap-2">
              Career Path
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Professional Experience
            </h3>
            <p className="mt-4 text-muted-foreground max-w-2xl text-lg">
              My journey as a software developer, detailing the roles and technologies that have shaped my expertise.
            </p>
          </div>

          {/* Experience List */}
          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Vertical Timeline Line */}
                {index !== experiences.length - 1 && (
                  <div className="absolute left-[2rem] top-20 bottom-[-4rem] w-px bg-border/80 group-hover:bg-accent/40 transition-colors duration-500 hidden md:block" />
                )}

                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                  {/* Left Column: Logo (Desktop) */}
                  <div className="flex-shrink-0 relative z-10">
                    <ExperienceLogo item={exp} size="large" />
                  </div>

                  {/* Right Column: Experience Content */}
                  <div className="flex-1 rounded-2xl border border-border bg-card p-6 md:p-8 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 overflow-hidden relative">
                    {/* Hover internal gradient */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Header */}
                    <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 mb-5">
                      <div>
                        {/* Mobile Logo + Company row */}
                        <div className="flex items-center gap-3 mb-2 md:mb-1">
                          <ExperienceLogo item={exp} size="small" />
                          <div className="flex items-center gap-2">
                            {exp.companyUrl ? (
                              <a
                                href={exp.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg md:text-xl font-semibold text-accent hover:underline flex items-center gap-1.5 transition-all"
                              >
                                {exp.company}
                                <ExternalLink size={14} />
                              </a>
                            ) : (
                              <span className="text-lg md:text-xl font-semibold text-accent">
                                {exp.company}
                              </span>
                            )}
                          </div>
                        </div>

                        <h4 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight group-hover:text-accent transition-colors duration-300">
                          {exp.title}
                        </h4>
                      </div>

                      {/* Date and Location Badge */}
                      <div className="flex flex-col sm:flex-row xl:flex-col gap-2 sm:gap-4 xl:gap-2 text-sm text-muted-foreground xl:text-right shrink-0">
                        <span className="inline-flex items-center xl:justify-end gap-1.5">
                          <Calendar size={14} className="text-accent" />
                          <span className="font-medium bg-secondary text-secondary-foreground px-2.5 py-0.5 rounded-full text-xs">
                            {exp.period}
                          </span>
                        </span>
                        <span className="inline-flex items-center xl:justify-end gap-1.5">
                          <MapPin size={14} className="text-accent" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <p className="text-foreground/80 mb-6 font-medium text-sm md:text-base border-l-2 border-accent/40 pl-4 py-1">
                      {exp.description}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {exp.bullets.map((b, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-sm md:text-base text-muted-foreground leading-relaxed group/item"
                        >
                          <ChevronRight size={16} className="mt-0.5 text-accent shrink-0 group-hover/item:translate-x-1 transition-transform" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Skills/Tech Stack */}
                    <div className="pt-6 border-t border-border/50">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Technologies & Skills
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, k) => (
                          <span
                            key={k}
                            className="px-3 py-1.5 text-xs font-medium bg-background text-foreground border border-border rounded-lg hover:border-accent hover:text-accent transition-colors duration-200 cursor-default"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
