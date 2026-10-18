"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

interface PremiumTypewriterProps {
  words: string[];
  delay?: number;
  typeSpeed?: number;
  deleteSpeed?: number;
  cursorChar?: string;
}

export default function PremiumTypewriter({
  words,
  delay = 1500,
  typeSpeed = 0.07,
  deleteSpeed = 0.04,
  cursorChar = "_",
}: PremiumTypewriterProps) {
  const [index, setIndex] = useState(0);
  
  // count represents the number of characters currently visible
  const count = useMotionValue(0);
  
  // rounded makes sure we always slice at an integer
  const rounded = useTransform(count, (latest) => Math.round(latest));
  
  // displayText extracts the substring to show
  const displayText = useTransform(rounded, (latest) => words[index].slice(0, latest));

  useEffect(() => {
    const currentWordLength = words[index].length;
    let pauseTimeout: ReturnType<typeof setTimeout> | undefined;
    let deleteControls: ReturnType<typeof animate> | undefined;
    
    // Animate typing forward
    const controls = animate(count, currentWordLength, {
      type: "tween",
      duration: currentWordLength * typeSpeed,
      ease: "linear",
      onComplete: () => {
        // Wait after typing is complete, then delete
        pauseTimeout = setTimeout(() => {
          deleteControls = animate(count, 0, {
            type: "tween",
            duration: currentWordLength * deleteSpeed,
            ease: "linear",
            onComplete: () => {
              // Change to the next word immediately after deleting
              setIndex((prev) => (prev + 1) % words.length);
            },
          });
        }, delay);
      },
    });

    // Cleanup animation on unmount
    return () => {
      clearTimeout(pauseTimeout);
      controls.stop();
      deleteControls?.stop();
    };
  }, [index, words, count, typeSpeed, deleteSpeed, delay]);

  return (
    <span className="inline-grid text-center">
      {/* Reserve the widest phrase, including the cursor, at every breakpoint. */}
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          aria-hidden="true"
          className="pointer-events-none invisible col-start-1 row-start-1 whitespace-nowrap"
        >
          {word}
          <span className="ml-[2px] font-bold">{cursorChar}</span>
        </span>
      ))}

      <span className="col-start-1 row-start-1 flex items-center justify-center whitespace-nowrap">
        <motion.span>{displayText}</motion.span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ 
            repeat: Infinity, 
            duration: 0.8, 
            ease: "linear",
            times: [0, 0.5, 1]
          }}
          className="inline-block font-bold text-accent ml-[2px]"
        >
          {cursorChar}
        </motion.span>
      </span>
    </span>
  );
}
