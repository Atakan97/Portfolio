"use client";

import dynamic from "next/dynamic";
import { MessageCircle, X } from "lucide-react";
import { useChat } from "./ChatProvider";

const ChatPanel = dynamic(() => import("./ChatPanel"), { ssr: false });

export default function ChatWidget() {
  const { isOpen, openChat, closeChat } = useChat();

  return (
    <>
      {isOpen && <ChatPanel />}
      <button
        id="chat-launcher"
        type="button"
        onClick={isOpen ? closeChat : openChat}
        aria-label={isOpen ? "Close AI chat" : "Ask AI about Atakan"}
        aria-expanded={isOpen}
        aria-controls={isOpen ? "ai-chat-panel" : undefined}
        className={`chat-launcher fixed right-6 z-[70] flex h-14 items-center gap-2 rounded-full border border-white/15 bg-accent px-5 text-accent-foreground shadow-xl shadow-black/40 transition-colors hover:bg-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${isOpen ? "hidden sm:flex" : "flex"}`}
      >
        {isOpen ? (
          <X size={20} aria-hidden="true" />
        ) : (
          <MessageCircle size={20} aria-hidden="true" />
        )}
        <span className="text-sm font-semibold">Ask AI</span>
      </button>
    </>
  );
}
