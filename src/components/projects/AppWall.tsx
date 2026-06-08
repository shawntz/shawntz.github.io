"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface App {
  name: string;
  logo: string;
  url?: string;
  platform?: string;
  description: string;
}

const apps: App[] = [
  {
    name: "Houston",
    logo: "/images/projects/houston.webp",
    url: "https://houstonmac.app",
    platform: "macOS",
    description: "Expose 120+ hidden macOS settings and save them as reusable one-click setup profiles.",
  },
  {
    name: "Carbon",
    logo: "/images/projects/carbon.webp",
    url: "https://carbonapp.co",
    platform: "iOS · Web",
    description: "Minimalist task manager built around three cards — Today, Next, and Someday.",
  },
  {
    name: "clementime",
    logo: "/images/projects/clementime.png",
    url: "https://clementime.app",
    platform: "macOS",
    description: "Reimagines oral exam scheduling, turning a complex admin task into a simple workflow.",
  },
  {
    name: "cassh",
    logo: "/images/projects/cassh.png",
    url: "https://shawnschwartz.com/cassh",
    platform: "macOS",
    description: "Automates SSH key rotation and certificate management for GitHub.",
  },
  {
    name: "eyeris",
    logo: "/images/projects/eyeris.png",
    url: "https://shawnschwartz.com/eyeris",
    platform: "R package",
    description: "Flexible, reproducible pupillometry preprocessing framework for eye-tracking research.",
  },
  {
    name: "charisma",
    logo: "/images/projects/charisma.png",
    url: "https://shawnschwartz.com/charisma",
    platform: "R package",
    description: "Classifies colors in biological images for reproducible evolutionary and comparative studies.",
  },
  {
    name: "fMRIPrep Workbench",
    logo: "/images/projects/fmriprep-workbench.png",
    url: "https://shawnschwartz.com/fmriprep-workbench",
    platform: "CLI",
    description: "End-to-end fMRI preprocessing pipeline from scanner acquisition to fMRIPrep execution.",
  },
  {
    name: "TinyVault",
    logo: "/images/projects/tinyvault.png",
    url: "https://github.com/shawntz/tinyvault",
    platform: "Self-hosted",
    description: "DIY client-side encryption for Google Workspace, self-hosted for ~$0.10/month.",
  },
];

function AppCard({ app, index }: { app: App; index: number }) {
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      className="group h-full hover:-translate-y-1 transition-transform duration-200 ease-out"
    >
      <div className="h-full flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl border border-border-light bg-surface group-hover:border-accent/30 group-hover:shadow-lg transition-[border-color,box-shadow] duration-200">
        {/* Icon */}
        <div className="relative w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] rounded-[22%] overflow-hidden mb-4 shadow-md shadow-black/10 ring-1 ring-black/[0.05] dark:shadow-black/40 dark:ring-white/[0.07] flex-shrink-0">
          <Image
            src={app.logo}
            alt={app.name}
            fill
            className="object-contain"
          />
        </div>

        {/* Name */}
        <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors duration-150 leading-snug mb-2">
          {app.name}
        </p>

        {/* Platform tag */}
        {app.platform && (
          <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-medium text-accent leading-none mb-3">
            {app.platform}
          </span>
        )}

        {/* Description */}
        <p className="text-xs text-foreground-secondary leading-relaxed">
          {app.description}
        </p>
      </div>
    </motion.div>
  );

  if (app.url) {
    return (
      <a
        href={app.url}
        target="_blank"
        rel="noopener noreferrer"
        className="h-full block outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl"
        aria-label={`${app.name} — ${app.description}`}
      >
        {card}
      </a>
    );
  }

  return card;
}

export function AppWall() {
  if (apps.length === 0) return null;

  return (
    <section aria-labelledby="app-wall-heading" className="py-16 border-t border-border-light">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-foreground-tertiary mb-1">
            What I&apos;ve Built
          </p>
          <h2 id="app-wall-heading" className="text-2xl font-semibold">
            Apps &amp; Packages
          </h2>
        </div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
          aria-label="View all software"
        >
          View all
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {apps.map((app, index) => (
          <AppCard key={app.name} app={app} index={index} />
        ))}
      </div>
    </section>
  );
}
