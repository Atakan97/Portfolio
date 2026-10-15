"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { researchPapers } from "@/data/research";

export default function Research() {
  return (
    <section id="research" className="min-h-screen py-24 relative overflow-hidden flex items-center">
      <div className="mx-auto max-w-4xl px-6 w-full relative z-10">
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
              Academic research and seminar papers I worked on during my master&apos;s degree.
            </p>
          </div>

          {/* Paper list */}
          <div className="space-y-8 md:space-y-10">
            {researchPapers.map((paper, i) => (
              <motion.div
                key={paper.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 md:p-8 overflow-hidden relative"
              >

                {/* Title and Download Button Row */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5 relative z-10">
                  <h4 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight max-w-2xl">
                    {paper.title}
                  </h4>
                  
                  <a
                    href={paper.pdfFile}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-accent/10 text-accent font-semibold hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-sm"
                  >
                    <Download size={18} />
                    Download PDF
                  </a>
                </div>

                {/* Summary */}
                <p className="text-foreground/80 mb-6 font-medium text-sm md:text-base border-l-2 border-accent/40 pl-4 py-1 relative z-10">
                  {paper.summary}
                </p>

                {/* Tags */}
                <div className="pt-6 border-t border-border/50 relative z-10">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Topics
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {paper.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-xs font-medium bg-background text-foreground border border-border rounded-lg cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
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
