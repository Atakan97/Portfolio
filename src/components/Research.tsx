"use client";

import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";

interface Paper {
  title: string;
  summary: string;
  tags: string[];
  pdfFile: string;
}

const papers: Paper[] = [
  {
    title: "Data collection and processing on sustainable and healthy food",
    summary: "Analyzes the statistical relationship between six motivation categories and BMI using Pearson and Spearman correlation tests, finding no significant link and suggesting that external factors may be more influential.",
    tags: ["Data Analysis", "Health Data Analytics", "Data Visualization"],
    pdfFile: "/pdf/sustainable-food.pdf",
  },
  {
    title: "Resilient Communication Systems for the Critical Infrastructures of the Future",
    summary: "Investigates how standardized benchmark datasets can support ICT network design and evaluation, comparing wired and cellular architectures using Python and NetworkX across structural resilience metrics.",
    tags: ["ICT Modelling", "Network Resilience", "Mobile Edge Computing"],
    pdfFile: "/pdf/resilient-communication.pdf",
  },
  {
    title: "Hardware Security Solutions for the Internet of Things",
    summary: "Explores the integration of post-quantum cryptographic algorithms into electric vehicle charging infrastructure, proposing a hybrid TLS 1.3 architecture with crypto-agility to secure charging sessions against future quantum threats.",
    tags: ["Post-Quantum Cryptography", "Hardware Security", "Vehicle-to-Grid"],
    pdfFile: "/pdf/hardware-security.pdf",
  },
];

export default function Research() {
  return (
    <section id="research" className="min-h-screen py-24 flex items-center">
      <div className="mx-auto max-w-6xl px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="mb-16 text-center">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">
              Research
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground">
              Seminar Papers
            </h3>
            <p className="mt-4 text-muted-foreground max-w-2xl text-lg mx-auto leading-relaxed">
              Academic research and seminar papers I worked during my master's degree.
            </p>
          </div>

          {/* Paper cards grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {papers.map((paper, i) => (
              <motion.div
                key={paper.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col rounded-2xl border border-white/5 bg-card/40 backdrop-blur-xl overflow-hidden p-6 relative group"
              >
                {/* Background glow effect for premium feel */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

                {/* Icon & Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-accent/10 shrink-0">
                    <FileText className="text-accent" size={24} />
                  </div>
                  <h4 className="flex-1 text-lg font-bold text-foreground leading-tight">
                    {paper.title}
                  </h4>
                </div>

                {/* Summary */}
                <p className="text-sm text-muted-foreground mb-6 flex-grow">
                  {paper.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <div className="mt-auto border-t border-border/30 pt-5">
                  <a
                    href={paper.pdfFile}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-accent text-accent-foreground font-semibold transition-all duration-300 shadow-sm opacity-90 hover:opacity-100"
                  >
                    <Download size={18} />
                    Download PDF
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
