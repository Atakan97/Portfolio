"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSection, type SectionId } from "@/hooks/useActiveSection";
import { Button } from "@/components/ui/button";

const navLinks: { label: string; id: SectionId }[] = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Research", id: "research" },
  { label: "Contact", id: "contact" },
];

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

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
    <>
      {/* ---------------------------------------------------------------------------
          CENTERED USER BUTTON (Desktop Only)
          --------------------------------------------------------------------------- */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] hidden xl:block"
      >
        <Button
          variant="outline"
          className="rounded-full py-0 ps-0 bg-card/40 backdrop-blur-md border-white/10 hover:bg-white/5 transition-all duration-300 cursor-pointer shadow-xl shadow-black/20"
          onClick={() => handleNav("hero")}
        >
          <div className="me-2 flex aspect-square h-full p-1">
            <img
              className="h-7 w-7 rounded-full object-cover border border-white/20"
              src="/profile-photo.jpg"
              alt="Atakan Arda Celik"
            />
          </div>
          <span className="text-xs font-semibold tracking-tight pr-4 text-foreground/90">Atakan Arda Celik</span>
        </Button>
      </motion.div>

      {/* ---------------------------------------------------------------------------
          DESKTOP VERTICAL NAVBAR (Hidden on mobile)
          --------------------------------------------------------------------------- */}
      <motion.nav
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-0"
      >
        <div className="flex flex-col">
          {navLinks.map((link, index) => {
            const isActive = activeSection === link.id;
            const numId = String(index + 1).padStart(2, "0");

            return (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={cn(
                  "group relative flex items-center gap-4 py-4 text-left transition-all duration-500",
                  isActive
                    ? "text-foreground drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                    : "text-muted-foreground/75 hover:text-foreground"
                )}
              >
                {/* Vertical line indicator matching the prompt style */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/10 group-first:rounded-t-full group-last:rounded-b-full overflow-hidden">
                  {isActive && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute top-0 left-0 w-full h-full bg-accent origin-top shadow-[0_0_12px_rgba(var(--accent),0.5)]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>

                {/* Number */}
                <span className={cn(
                  "text-[10px] font-medium ml-4 tabular-nums font-mono tracking-widest transition-all duration-300",
                  isActive ? "text-accent opacity-100" : "text-muted-foreground/60 opacity-70 group-hover:opacity-100"
                )}>
                  /{numId}
                </span>

                {/* Label container */}
                <div className="flex flex-col flex-1">
                  <span
                    className={cn(
                      "text-sm font-medium tracking-wider uppercase transition-all duration-500 whitespace-nowrap",
                      isActive ? "text-accent translate-x-1" : "translate-x-0"
                    )}
                  >
                    {link.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </motion.nav>

      {/* ---------------------------------------------------------------------------
          MOBILE NAVBAR (Hidden on desktop xl)
          --------------------------------------------------------------------------- */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 xl:hidden transition-all duration-300 ${scrolled || activeSection !== "hero"
          ? "bg-card/80 backdrop-blur-xl shadow-lg border-b border-border"
          : "bg-transparent"
          }`}
      >
        <div className="mx-auto flex items-center justify-between px-6 py-4">
          <button
            onClick={() => handleNav("hero")}
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground hover:text-accent transition-colors cursor-pointer"
          >
            <span>AAC</span>
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl bg-muted text-foreground hover:bg-accent/10 transition-all cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-card/95 backdrop-blur-xl border-t border-border overflow-hidden"
            >
              <div className="flex flex-col px-6 py-4 gap-4">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNav(link.id)}
                      className={`text-sm font-medium transition-colors py-2 text-left cursor-pointer ${isActive
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
    </>
  );
}
