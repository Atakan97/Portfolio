"use client";

import { useState, useCallback, type ReactNode } from "react";
import { SectionContext, type SectionId } from "@/hooks/useActiveSection";

interface SectionProviderProps {
  children: ReactNode;
}

export default function SectionProvider({ children }: SectionProviderProps) {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");

  const navigateTo = useCallback((section: SectionId) => {
    setActiveSection(section);
    // Scroll to top when navigating to a new section
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <SectionContext.Provider value={{ activeSection, navigateTo }}>
      {children}
    </SectionContext.Provider>
  );
}
