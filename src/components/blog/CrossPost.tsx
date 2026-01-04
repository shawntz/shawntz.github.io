"use client";

import { ExternalLink } from "lucide-react";

interface CrossPostProps {
  crosspost?: {
    devto?: string;
    medium?: string;
    linkedin?: string;
    substack?: string;
  };
}

const platforms = [
  {
    key: "devto" as const,
    name: "Dev.to",
    icon: (
      <svg viewBox="0 0 448 512" className="w-5 h-5 fill-current">
        <path d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM404.1 32H43.9C19.7 32 .06 51.59 0 75.8v360.4C.06 460.41 19.7 480 43.9 480h360.2c24.21 0 43.84-19.59 43.9-43.8V75.8c-.06-24.21-19.7-43.8-43.9-43.8zM154.2 291.19c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28l.01 70.93zm100.68-88.66H201.6v38.42h32.57v29.57H201.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19l-.01 29.52zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58l-38.46 144.8z" />
      </svg>
    ),
  },
  {
    key: "medium" as const,
    name: "Medium",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
  },
  {
    key: "linkedin" as const,
    name: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    key: "substack" as const,
    name: "Substack",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
      </svg>
    ),
  },
];

export function CrossPost({ crosspost }: CrossPostProps) {
  if (!crosspost) return null;

  const availablePlatforms = platforms.filter(
    (platform) => crosspost[platform.key]
  );

  if (availablePlatforms.length === 0) return null;

  return (
    <div className="mt-12 p-6 rounded-2xl bg-surface border border-border-light">
      <div className="flex items-center gap-2 mb-4">
        <ExternalLink className="w-5 h-5 text-foreground-tertiary" />
        <h4 className="font-semibold text-foreground">Also published on</h4>
      </div>
      <div className="flex flex-wrap gap-3">
        {availablePlatforms.map((platform) => (
          <a
            key={platform.key}
            href={crosspost[platform.key]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border-light text-sm font-medium text-foreground-secondary hover:text-accent hover:border-accent/50 transition-colors"
          >
            {platform.icon}
            {platform.name}
          </a>
        ))}
      </div>
    </div>
  );
}
