"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode;
}

export function CodeBlock({ children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    const codeElement = document.querySelector("pre code");
    const text = codeElement?.textContent || "";

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-6">
      <pre
        className="overflow-x-auto rounded-lg bg-code-bg border border-code-border p-4 text-sm"
        {...props}
      >
        {children}
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute right-3 top-3 rounded-lg bg-surface/80 p-2 opacity-0 transition-opacity hover:bg-surface group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4 text-foreground-secondary" />
        )}
      </button>
    </div>
  );
}
