"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

// =============================================================================
// UPDATE YOUR METRICS HERE
// =============================================================================
const metrics = {
  citations: 340,
  hIndex: 11,
  i10Index: 12,
  lastUpdated: "January 2026",
};

const researchInterests = [
  "Episodic Memory",
  "Attention",
  "Cognitive Aging",
  "Neuroimaging",
  "Human Performance",
];

const scholarUrl = "https://scholar.google.com/citations?user=xII63_wAAAAJ&hl=en&oi=ao";
// =============================================================================

export function ScholarMetrics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 space-y-6"
    >
      {/* Research Interests */}
      <div className="flex flex-col items-center">
        <p className="text-sm font-medium text-foreground-tertiary mb-4">Research Interests</p>
        <div className="flex flex-wrap justify-center gap-2">
          {researchInterests.map((interest, index) => (
            <motion.span
              key={interest}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20 hover:bg-accent/20 transition-colors"
            >
              {interest}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Citation Metrics */}
      <div className="rounded-2xl border border-border-light bg-surface p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-foreground">Citation Metrics</h2>
          <a
            href={scholarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-hover transition-colors"
          >
            View Google Scholar
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:gap-8">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-foreground">
              {metrics.citations.toLocaleString()}
            </div>
            <div className="mt-1 text-sm text-foreground-secondary">Citations</div>
          </div>
          <div className="text-center border-x border-border-light">
            <div className="text-3xl sm:text-4xl font-bold text-foreground">
              {metrics.hIndex}
            </div>
            <div className="mt-1 text-sm text-foreground-secondary">h-index</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-foreground">
              {metrics.i10Index}
            </div>
            <div className="mt-1 text-sm text-foreground-secondary">i10-index</div>
          </div>
        </div>

        <p className="mt-6 text-xs text-foreground-tertiary text-center">
          Last updated: {metrics.lastUpdated}
        </p>
      </div>
    </motion.div>
  );
}
