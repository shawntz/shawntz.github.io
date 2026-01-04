"use client";

import { useState } from "react";
import { RippleButton } from "./Ripple";
import { Check, Loader2 } from "lucide-react";

// Configure your Substack URL here
const SUBSTACK_URL = "https://shawntz.substack.com";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setStatus("loading");

    try {
      // Option 1: Redirect to Substack with email pre-filled
      // This opens Substack's subscribe page with the email ready
      const substackSubscribeUrl = `${SUBSTACK_URL}/subscribe?email=${encodeURIComponent(email)}`;
      window.open(substackSubscribeUrl, "_blank");

      setStatus("success");
      setMessage("Redirecting to complete subscription...");
      setEmail("");

      // Reset after a few seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 3000);
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === "loading"}
          className="flex-1 rounded-lg border border-border-light bg-surface px-4 py-3 text-foreground placeholder:text-foreground-tertiary focus:border-accent focus:outline-none focus:ring-0 disabled:opacity-50"
        />
        <RippleButton
          type="submit"
          disabled={status === "loading"}
          className="rounded-lg bg-accent px-6 py-3 font-medium text-white hover:bg-accent-hover transition-colors active:scale-[0.98] disabled:opacity-50 flex items-center gap-2"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="sr-only">Loading</span>
            </>
          ) : status === "success" ? (
            <>
              <Check className="h-4 w-4" />
              <span className="sr-only">Success</span>
            </>
          ) : (
            "Subscribe"
          )}
        </RippleButton>
      </form>
      {message && (
        <p className={`mt-3 text-sm text-center ${status === "error" ? "text-red-500" : "text-green-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
