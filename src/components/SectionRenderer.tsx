"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSection, type SectionId } from "@/hooks/useActiveSection";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Research from "@/components/Research";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// ---------------------------------------------------------------------------
// Animation variants for page transitions
// ---------------------------------------------------------------------------

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

// ---------------------------------------------------------------------------
// Map section IDs to their components
// ---------------------------------------------------------------------------

const sectionComponents: Record<SectionId, React.ComponentType> = {
  hero: Hero,
  about: About,
  skills: Skills,
  experience: Experience,
  research: Research,
  projects: Projects,
  contact: Contact,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SectionRenderer() {
  const { activeSection } = useSection();

  const ActiveComponent = sectionComponents[activeSection];

  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <ActiveComponent />
          {/* Show footer on every section except hero */}
          {activeSection !== "hero" && <Footer />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
