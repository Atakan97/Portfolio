"use client";

import { useState, useEffect } from "react";
import { Menu, X, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSection, type SectionId } from "@/hooks/useActiveSection";

// ---------------------------------------------------------------------------
// Navigation links
// ---------------------------------------------------------------------------

const navLinks: { label: string; id: SectionId }[] = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Research", id: "research" },
  { label: "Contact", id: "contact" },
];

// ---------------------------------------------------------------------------
// Navbar component
// ---------------------------------------------------------------------------

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { activeSection, navigateTo } = useSection();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (id: SectionId) => {
    navigateTo(id);
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || activeSection !== "hero"
          ? "bg-card/80 backdrop-blur-xl shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      {/* Centered container */}
      <div className="mx-auto max-w-6xl flex items-center justify-center px-6 py-4 relative">
        {/* Logo – left-anchored absolutely so it doesn't break centering */}
        <button
          onClick={() => handleNav("hero")}
          className="absolute left-6 flex items-center gap-2 text-lg font-bold tracking-tight text-foreground hover:text-accent transition-colors cursor-pointer"
        >
          <span>Atakan Arda Celik</span>
        </button>

        {/* Desktop links – centered */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`text-sm font-medium transition-colors relative group cursor-pointer ${
                  isActive
                    ? "text-accent"
                    : "text-muted-foreground hover:text-accent"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Mobile menu button – right-anchored absolutely */}
        <div className="absolute right-6 flex md:hidden items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl bg-muted text-foreground hover:bg-accent/10 transition-all cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card/95 backdrop-blur-xl border-t border-border overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNav(link.id)}
                    className={`text-sm font-medium transition-colors py-2 text-left cursor-pointer ${
                      isActive
                        ? "text-accent font-semibold"
                        : "text-muted-foreground hover:text-accent"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
