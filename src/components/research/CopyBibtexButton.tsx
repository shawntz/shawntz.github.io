"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyBibtexButtonProps {
  bibtex: string;
}

export function CopyBibtexButton({ bibtex }: CopyBibtexButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-hover transition-colors"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          Copy BibTeX
        </>
      )}
    </button>
  );
}
