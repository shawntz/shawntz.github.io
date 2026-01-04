"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Download, FileText, FlaskConical } from "lucide-react";
import { RippleLink } from "@/components/ui/Ripple";

interface Experience {
  company: string;
  title: string;
  period: string;
  description: string;
}

interface ResumeContentProps {
  experiences: Experience[];
  cvPdfPath: string;
}

export function ResumeContent({ experiences, cvPdfPath }: ResumeContentProps) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h1 className="text-4xl font-semibold tracking-tight md:text-[64px]">
          Resume
        </h1>
        <p className="mt-6 text-lg text-foreground-secondary max-w-3xl mx-auto leading-relaxed text-balance">
          My professional experience and background in research, data science, and software engineering.
        </p>
      </motion.header>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-12 flex flex-wrap justify-center gap-4"
      >
        <RippleLink
          href="/research"
          className="inline-flex items-center gap-2 rounded-full border-2 border-foreground px-6 py-3 font-semibold text-foreground hover:bg-foreground hover:text-background transition-colors"
        >
          <FlaskConical className="h-4 w-4" />
          View Research
        </RippleLink>
        <a
          href={cvPdfPath}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border-2 border-foreground px-6 py-3 font-semibold text-foreground hover:bg-foreground hover:text-background transition-colors active:scale-[0.98]"
        >
          <Download className="h-4 w-4" />
          Download CV
        </a>
      </motion.div>

      {/* Experience List */}
      <div className="space-y-0">
        {experiences.map((exp, index) => (
          <motion.article
            key={`${exp.company}-${exp.title}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="py-10 border-t border-border-light first:border-t-0"
          >
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                {exp.company}
              </h2>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground-secondary">
                  {exp.title}
                </h3>
                <span className="text-sm text-foreground-tertiary font-medium">
                  [{exp.period}]
                </span>
              </div>

              <p className="text-foreground-secondary leading-relaxed max-w-2xl">
                {exp.description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>

    </div>
  );
}
