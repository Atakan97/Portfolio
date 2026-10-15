"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { ArrowUpRight, RotateCcw, Send, Square, X } from "lucide-react";
import { useSection, type SectionId } from "@/hooks/useActiveSection";
import { MAX_QUESTION_LENGTH } from "@/lib/chat/protocol";
import { useChat } from "./ChatProvider";

const suggestedQuestions = [
  "What did Atakan do at Yokogawa?",
  "Tell me about his AI projects.",
  "What roles is he looking for?",
];

export default function ChatPanel() {
  const {
    turns,
    isSending,
    error,
    closeChat,
    clearChat,
    stopAnswer,
    sendQuestion,
    retryLastQuestion,
  } = useChat();
  const { navigateTo } = useSection();
  const [question, setQuestion] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const shouldScroll = useRef(true);

  useEffect(() => {
    const previousFocus = document.activeElement;
    inputRef.current?.focus();
    const viewport = window.visualViewport;
    const updateViewport = () => {
      if (viewport && panelRef.current) {
        panelRef.current.style.setProperty(
          "--chat-viewport-height",
          `${viewport.height}px`,
        );
        panelRef.current.style.setProperty(
          "--chat-keyboard-inset",
          `${Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop)}px`,
        );
      }
    };
    updateViewport();
    viewport?.addEventListener("resize", updateViewport);
    viewport?.addEventListener("scroll", updateViewport);

    return () => {
      viewport?.removeEventListener("resize", updateViewport);
      viewport?.removeEventListener("scroll", updateViewport);
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus();
      } else {
        document.getElementById("chat-launcher")?.focus();
      }
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") closeChat();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeChat]);

  useEffect(() => {
    const messages = messagesRef.current;
    if (!messages) return;
    if (turns.length === 0) {
      messages.scrollTop = 0;
    } else if (shouldScroll.current) {
      messages.scrollTop = messages.scrollHeight;
    }
  }, [turns, error]);

  function submitQuestion(event: FormEvent) {
    event.preventDefault();
    if (!question.trim() || isSending) return;
    shouldScroll.current = true;
    void sendQuestion(question);
    setQuestion("");
    inputRef.current?.focus();
  }

  function handleInputKey(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  function viewSection(section: SectionId) {
    closeChat();
    navigateTo(section);
  }

  return (
    <div
      ref={panelRef}
      id="ai-chat-panel"
      role="dialog"
      aria-labelledby="ai-chat-title"
      className="chat-panel fixed z-[80] flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl shadow-black/50"
    >
      <header className="flex shrink-0 items-center gap-3 border-b border-border bg-background/35 px-5 py-4">
        <h2
          id="ai-chat-title"
          className="flex-1 text-sm font-semibold text-foreground"
        >
          Atakan&apos;s AI Assistant
        </h2>
        <button
          type="button"
          onClick={() => {
            clearChat();
            setQuestion("");
            inputRef.current?.focus();
          }}
          aria-label="Clear conversation"
          title="Clear conversation"
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent"
        >
          <RotateCcw size={16} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={closeChat}
          aria-label="Close AI chat"
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </header>

      <div
        ref={messagesRef}
        onScroll={() => {
          const element = messagesRef.current;
          if (element)
            shouldScroll.current =
              element.scrollHeight - element.scrollTop - element.clientHeight <
              48;
        }}
        className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 py-6"
      >
        {turns.length === 0 && (
          <div className="flex min-h-full flex-col justify-center">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Get to know Atakan
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
              What would you
              <br />
              like to know?
            </h3>
            <div className="mt-6 space-y-2">
              {suggestedQuestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    shouldScroll.current = true;
                    void sendQuestion(suggestion);
                  }}
                  className="flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-background/30 px-3.5 py-3 text-left text-xs text-foreground/90 transition-colors hover:border-accent/35 hover:bg-muted focus-visible:outline-2 focus-visible:outline-accent"
                >
                  {suggestion}
                  <ArrowUpRight
                    size={14}
                    className="shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {turns.map((turn) => (
          <div key={turn.id} className="space-y-3">
            <div className="ml-8 rounded-2xl rounded-br-sm bg-accent px-4 py-3 text-sm leading-relaxed text-accent-foreground">
              <span className="sr-only">You: </span>
              <p className="whitespace-pre-wrap break-words">{turn.question}</p>
            </div>
            <div className="mr-3 rounded-2xl rounded-bl-sm border border-border bg-background/40 px-4 py-3 text-sm leading-relaxed text-foreground/90">
              <span className="sr-only">AI assistant: </span>
              {turn.answer && (
                <p className="whitespace-pre-wrap break-words">{turn.answer}</p>
              )}
              {turn.status === "sending" && !turn.answer && (
                <p role="status" className="text-muted-foreground">
                  Writing an answer
                  <span className="motion-safe:animate-pulse">...</span>
                </p>
              )}
              {turn.status === "stopped" && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Answer stopped.
                </p>
              )}
              {turn.status === "error" && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {turn.answer
                    ? "This answer is incomplete."
                    : "No answer received."}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="shrink-0 border-t border-border px-4 pb-4 pt-3">
        {error && (
          <div
            role="alert"
            className="mb-3 rounded-xl border border-amber-400/20 bg-amber-400/5 px-3 py-2.5 text-xs leading-relaxed text-amber-100"
          >
            <p>{error.message}</p>
            {error.retryAfter && (
              <p className="mt-1 text-amber-100/70">
                Try again after {Math.ceil(error.retryAfter / 60)} minute(s).
              </p>
            )}
            <div className="mt-2 flex gap-3">
              {error.code !== "NOT_READY" &&
                error.code !== "RATE_LIMITED" &&
                error.code !== "MODEL_LIMITED" && (
                  <button
                    type="button"
                    onClick={retryLastQuestion}
                    disabled={isSending}
                    className="font-semibold underline underline-offset-2 disabled:opacity-50"
                  >
                    Try again
                  </button>
                )}
              <button
                type="button"
                onClick={() => viewSection("contact")}
                className="font-semibold underline underline-offset-2"
              >
                Contact Atakan
              </button>
            </div>
          </div>
        )}
        <form onSubmit={submitQuestion} className="flex items-end gap-2">
          <label htmlFor="ai-chat-question" className="sr-only">
            Your question about Atakan
          </label>
          <textarea
            ref={inputRef}
            id="ai-chat-question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={handleInputKey}
            maxLength={MAX_QUESTION_LENGTH}
            rows={2}
            placeholder="Ask about Atakan..."
            className="min-h-11 flex-1 resize-none rounded-xl border border-border bg-background/60 px-3 py-2.5 text-base leading-snug text-foreground outline-none placeholder:text-muted-foreground/65 focus:border-accent/60 sm:text-sm"
          />
          {isSending ? (
            <button
              type="button"
              onClick={stopAnswer}
              aria-label="Stop answer"
              title="Stop answer"
              className="mb-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent hover:bg-accent/20 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <Square size={15} fill="currentColor" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!question.trim()}
              aria-label="Send question"
              className="mb-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors hover:bg-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send size={17} aria-hidden="true" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
