"use client";

import { Coffee } from "lucide-react";

export function BuyMeCoffee() {
  return (
    <a
      href="https://buymeacoffee.com/shawntz"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-white font-medium shadow-lg hover:bg-accent-hover transition-all hover:scale-105"
      title="If my work or code has been helpful to you, please consider supporting me!"
    >
      <Coffee className="w-5 h-5" />
      <span className="hidden sm:inline">Buy me a coffee</span>
    </a>
  );
}
