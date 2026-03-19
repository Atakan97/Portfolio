"use client";

import { createContext, useContext, useState, useCallback } from "react";

// ---------------------------------------------------------------------------
// Section type & context
// ---------------------------------------------------------------------------

export type SectionId = "hero" | "about" | "skills" | "experience" | "research" | "projects" | "contact";

interface SectionContextValue {
  /** Currently visible section */
  activeSection: SectionId;
  /** Navigate to a specific section */
  navigateTo: (section: SectionId) => void;
}

const SectionContext = createContext<SectionContextValue | null>(null);

// ---------------------------------------------------------------------------
// Hook to consume the context
// ---------------------------------------------------------------------------

export function useSection(): SectionContextValue {
  const ctx = useContext(SectionContext);
  if (!ctx) {
    throw new Error("useSection must be used within a SectionProvider");
  }
  return ctx;
}

// ---------------------------------------------------------------------------
// Export context for the provider component
// ---------------------------------------------------------------------------

export { SectionContext };
