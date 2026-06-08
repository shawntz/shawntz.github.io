"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

interface ProjectEntry {
  name: string;
  logo: string;
  url?: string;
  github?: string;
  platform: string;
  description: string;
  stack: string[];
}

interface ProjectCategory {
  label: string;
  eyebrow: string;
  projects: ProjectEntry[];
}

const categories: ProjectCategory[] = [
  {
    label: "Apps",
    eyebrow: "Consumer & Productivity",
    projects: [
      {
        name: "Houston",
        logo: "/images/projects/houston.webp",
        url: "https://houstonmac.app",
        platform: "macOS",
        description:
          "Expose 120+ hidden macOS settings and save them as reusable one-click setup profiles. Configure a new Mac exactly the way you want it without digging through System Settings.",
        stack: ["SwiftUI", "macOS"],
      },
      {
        name: "Carbon",
        logo: "/images/projects/carbon.webp",
        url: "https://carbonapp.co",
        platform: "iOS · Web",
        description:
          "Minimalist task manager built around three cards — Today, Next, and Someday — paired with five status signals to keep your focus sharp. Available across iPhone, iPad, Mac, Web, and Android.",
        stack: ["SwiftUI", "iOS", "Web", "Android"],
      },
      {
        name: "clementime",
        logo: "/images/projects/clementime.png",
        url: "https://clementime.app",
        platform: "macOS",
        description:
          "Reimagines oral exam scheduling, turning a traditionally complex administrative task into a simple, streamlined workflow for educators and institutions.",
        stack: ["SwiftUI", "macOS"],
      },
    ],
  },
  {
    label: "Developer Tools",
    eyebrow: "Tooling & Infrastructure",
    projects: [
      {
        name: "cassh",
        logo: "/images/projects/cassh.png",
        url: "https://cassh.shawnschwartz.com",
        platform: "macOS · CLI",
        description:
          "SSH key and certificate manager for GitHub. Automates key rotation and certificate generation for both individual developers and enterprise teams, removing the friction from secure access management.",
        stack: ["Go", "CLI"],
      },
      {
        name: "TinyVault",
        logo: "/images/projects/tinyvault.png",
        url: "https://github.com/shawntz/tinyvault",
        github: "https://github.com/shawntz/tinyvault",
        platform: "Self-hosted",
        description:
          "DIY Google Workspace client-side encryption you can self-host for roughly $0.10 per month. Keeps your files encrypted before they ever reach Google's servers.",
        stack: ["Python", "Docker"],
      },
    ],
  },
  {
    label: "Research Software",
    eyebrow: "Open-Source Scientific Tools",
    projects: [
      {
        name: "eyeris",
        logo: "/images/projects/eyeris.png",
        url: "https://eyeris.shawnschwartz.com",
        platform: "R · CRAN",
        description:
          "Flexible, extensible, and reproducible pupillometry preprocessing framework for eye-tracking research. Provides modular pipeline steps, BIDS-like file structures, and interactive quality control reports.",
        stack: ["R", "CRAN", "Neuroscience"],
      },
      {
        name: "charisma",
        logo: "/images/projects/charisma.png",
        url: "https://charisma.shawnschwartz.com",
        platform: "R · CRAN",
        description:
          "Automatically classifies colors in biological images into 10 discrete categories using a standardized Color Look-Up Table, enabling reproducible color characterization for evolutionary and comparative studies.",
        stack: ["R", "CRAN", "Biology"],
      },
      {
        name: "fMRIPrep Workbench",
        logo: "/images/projects/fmriprep-workbench.png",
        url: "https://fmri.shawnschwartz.com",
        platform: "CLI · Docker",
        description:
          "Generalizable workflow for fMRI preprocessing that handles the full pipeline — from scanner acquisition downloads and DICOM conversion through fMRIPrep execution, quality control, and statistical analysis.",
        stack: ["Python", "Docker", "Neuroimaging"],
      },
    ],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const rowItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] as const } },
};

function ProjectRow({ project }: { project: ProjectEntry }) {
  return (
    <motion.div variants={rowItem} className="group">
      <div className="flex items-start gap-5 px-6 py-5 hover:bg-background/60 transition-colors duration-150 sm:gap-6 sm:px-7 sm:py-6">
        {/* Icon */}
        <div className="relative h-[60px] w-[60px] flex-shrink-0 overflow-hidden rounded-[22%] shadow-sm ring-1 ring-black/[0.05] dark:ring-white/[0.07] sm:h-[72px] sm:w-[72px]">
          <Image
            src={project.logo}
            alt={project.name}
            fill
            className="object-contain"
          />
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="mb-1.5 flex items-start justify-between gap-3">
            <h3 className="font-semibold text-foreground leading-snug group-hover:text-accent transition-colors duration-150">
              {project.name}
            </h3>
            <span className="mt-0.5 flex-shrink-0 rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-medium leading-none text-accent">
              {project.platform}
            </span>
          </div>

          <p className="mb-3 text-sm leading-relaxed text-foreground-secondary">
            {project.description}
          </p>

          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              {project.stack.map((tag, i) => (
                <span key={tag} className="flex items-center gap-2.5 text-xs text-foreground-tertiary">
                  {tag}
                  {i < project.stack.length - 1 && (
                    <span className="h-0.5 w-0.5 rounded-full bg-foreground-tertiary/40" />
                  )}
                </span>
              ))}
            </div>

            <div className="flex flex-shrink-0 items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-foreground-secondary hover:text-accent transition-colors duration-150"
                >
                  <Github className="h-3.5 w-3.5" />
                  GitHub
                </a>
              )}
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-medium text-accent hover:text-accent-hover transition-colors duration-150"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Visit
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsContent() {
  return (
    <div className="space-y-16">
      {/* Categories */}
      {categories.map((category) => (
        <section key={category.label} aria-labelledby={`category-${category.label}`}>
          <div className="mb-5">
            <p className="mb-0.5 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground-tertiary">
              {category.eyebrow}
            </p>
            <h2
              id={`category-${category.label}`}
              className="text-xl font-semibold text-foreground"
            >
              {category.label}
            </h2>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="overflow-hidden rounded-2xl border border-border-light divide-y divide-border-light"
          >
            {category.projects.map((project) => (
              <ProjectRow key={project.name} project={project} />
            ))}
          </motion.div>
        </section>
      ))}
    </div>
  );
}
