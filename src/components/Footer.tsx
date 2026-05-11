"use client";

import { motion } from "framer-motion";
import { SocialIcons } from "./ui/social-icons";

export default function Footer() {
  return (
    <footer className="w-full bg-transparent pb-16 pt-8 z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl px-6 flex flex-col items-center justify-center gap-6"
      >
        <div className="flex flex-col items-center gap-4 mt-4">
          <h3 className="text-xl font-medium tracking-tight text-white/80">Connect with me</h3>
          <SocialIcons />
        </div>
      </motion.div>
    </footer>
  );
}
