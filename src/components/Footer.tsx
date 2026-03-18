"use client";

import { Mail, Linkedin, Github, Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex flex-col items-center gap-6">
          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:celikatakanarda@gmail.com"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/atakan-arda-celik-8b6b36192/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://github.com/Atakan97"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
          </div>

          {/* Copyright */}
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            © {year} Atakan Arda Celik. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
