"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  onClearAll: () => void;
}

export function TagFilter({ tags, selectedTags, onTagSelect, onClearAll }: TagFilterProps) {
  if (tags.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-wrap items-center justify-center gap-2 mb-10"
    >
      <button
        onClick={onClearAll}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-all",
          selectedTags.length === 0
            ? "bg-foreground text-background"
            : "bg-surface border border-border-light text-foreground-secondary hover:border-foreground/30"
        )}
      >
        All
      </button>
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onTagSelect(tag)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              isSelected
                ? "bg-accent text-white"
                : "bg-surface border border-border-light text-foreground-secondary hover:border-accent/50 hover:text-foreground"
            )}
          >
            {tag}
          </button>
        );
      })}
    </motion.div>
  );
}
