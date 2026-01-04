"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// =============================================================================
// ADD YOUR APPS HERE
// =============================================================================
const apps = [
  {
    name: "clementime",
    logo: "/images/projects/clementime.png",
    url: "https://clementime.app",
    platform: "macOS (SwiftUI)",
  },
  {
    name: "cassh",
    logo: "/images/projects/cassh.png",
    url: "https://shawnschwartz.com/cassh",
    platform: "macOS (Go)",
  },
  {
    name: "eyeris",
    logo: "/images/projects/eyeris.png",
    url: "https://shawnschwartz.com/eyeris",
    platform: "CRAN Package (R)",
  },
  {
    name: "charisma",
    logo: "/images/projects/charisma.png",
    url: "https://shawnschwartz.com/charisma",
    platform: "CRAN Package (R)",
  },
  {
    name: "fMRIPrep Workbench",
    logo: "/images/projects/fmriprep-workbench.png",
    url: "https://shawnschwartz.com/fmriprep-workbench",
    platform: "CLI Tool (Py/Docker)",
  },
  {
    name: "TinyVault",
    logo: "/images/projects/tinyvault.png",
    url: "https://github.com/shawntz/tinyvault",
    platform: "Self-Hosted (Py/Docker)",
  },
  // Add more apps here...
];
// =============================================================================

interface App {
  name: string;
  logo: string;
  url?: string;
  platform?: string;
}

function AppIcon({ app, index }: { app: App; index: number }) {
  const content = (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.1, y: -4 }}
      className="group flex flex-col items-center gap-2"
    >
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-[22%] overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow bg-surface">
        <Image
          src={app.logo}
          alt={app.name}
          fill
          className="object-contain p-1"
        />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xs text-foreground-secondary text-center line-clamp-1 max-w-[80px]">
          {app.name}
        </span>
        {app.platform && (
          <span className="text-[10px] text-foreground-tertiary">
            {app.platform}
          </span>
        )}
      </div>
    </motion.div>
  );

  if (app.url) {
    return (
      <a
        href={app.url}
        target="_blank"
        rel="noopener noreferrer"
        className="outline-none focus:ring-2 focus:ring-accent rounded-2xl"
      >
        {content}
      </a>
    );
  }

  return content;
}

export function AppWall() {
  if (apps.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <div className="rounded-2xl border border-border-light bg-gradient-to-br from-surface via-surface to-accent/5 p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-foreground mb-6 text-center">Apps & Packages I've Built</h2>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {apps.map((app, index) => (
            <AppIcon key={app.name} app={app} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
