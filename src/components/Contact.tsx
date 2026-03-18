"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { MAX_LENGTHS } from "@/lib/contact-validation";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type FormStatus = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Honeypot — must always remain empty. Hidden from real users. */
  honeypot: string;
}

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
  honeypot: "",
};

// ---------------------------------------------------------------------------
// Shared input class
// ---------------------------------------------------------------------------

const inputClass =
  "w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground " +
  "placeholder:text-muted-foreground/60 focus:border-accent focus:ring-2 " +
  "focus:ring-accent/20 focus:outline-none transition-all duration-300 " +
  "disabled:opacity-50 disabled:cursor-not-allowed";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      setFormData(INITIAL_FORM);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  const isLoading = status === "loading";
  const msgLength = formData.message.length;
  const msgNearLimit = msgLength > MAX_LENGTHS.message * 0.85;

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <section id="contact" className="min-h-screen py-24 bg-section-alt">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
                Contact
              </h2>
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground">
              Get In Touch
            </h3>
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-accent" />
          </div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-sm"
          >
            {/* ── Success state ── */}
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-10 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="text-green-600" size={32} />
                </div>
                <h4 className="text-xl font-bold text-foreground">
                  Message Sent!
                </h4>
                <p className="text-muted-foreground max-w-sm">
                  Thank you for reaching out. I&apos;ll get back to you as soon
                  as possible.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-2 text-sm font-medium text-accent hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              /* ── Form ── */
              <>
                <p className="text-muted-foreground mb-8">
                  Have a question or want to work together? Please drop me a message
                  and I&apos;ll get back to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>

                  {/* ── Honeypot (hidden from humans, bots fill it) ── */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      width: 0,
                      height: 0,
                      overflow: "hidden",
                      opacity: 0,
                      pointerEvents: "none",
                    }}
                  >
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      name="honeypot"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      maxLength={MAX_LENGTHS.name}
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={inputClass}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      maxLength={MAX_LENGTHS.email}
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={inputClass}
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="Subject of your message"
                      maxLength={MAX_LENGTHS.subject}
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={inputClass}
                    />
                  </div>

                  {/* Message + character counter */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="contact-message"
                        className="text-sm font-semibold text-foreground"
                      >
                        Message
                      </label>
                      <span
                        className={`text-xs tabular-nums transition-colors ${
                          msgNearLimit
                            ? "text-amber-500 font-semibold"
                            : "text-muted-foreground"
                        }`}
                      >
                        {msgLength} / {MAX_LENGTHS.message}
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Your message..."
                      maxLength={MAX_LENGTHS.message}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`${inputClass} resize-y`}
                    />
                  </div>

                  {/* Error banner */}
                  {status === "error" && errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
                    >
                      <AlertCircle
                        className="mt-0.5 shrink-0 text-red-500"
                        size={16}
                      />
                      <p className="text-sm text-red-700">{errorMessage}</p>
                    </motion.div>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={!isLoading ? { scale: 1.02 } : {}}
                    whileTap={!isLoading ? { scale: 0.98 } : {}}
                    className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:brightness-100"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
