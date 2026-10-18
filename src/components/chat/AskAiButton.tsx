"use client";

import { Sparkles } from "lucide-react";
import AnimatedPill from "../ui/animated-pill";
import { useChat } from "./ChatProvider";

export default function AskAiButton() {
  const { openChat, isOpen } = useChat();

  return (
    <AnimatedPill
      label="Ask AI"
      icon={Sparkles}
      onClick={openChat}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      aria-controls={isOpen ? "ai-chat-panel" : undefined}
    />
  );
}