"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, FileText, Code, BookOpen } from "lucide-react";
import { searchContent } from "@/lib/search";
import type { SearchResult } from "@/lib/types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchIndex: SearchResult[];
}

const typeIcons = {
  blog: FileText,
  project: Code,
  paper: BookOpen,
};

const typeLabels = {
  blog: "Blog",
  project: "Project",
  paper: "Paper",
};

export function SearchModal({ isOpen, onClose, searchIndex }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (query) {
      const searchResults = searchContent(query, searchIndex);
      setResults(searchResults);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [query, searchIndex]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((i) => Math.max(i - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (results[selectedIndex]) {
            router.push(results[selectedIndex].url);
            onClose();
            setQuery("");
          }
          break;
        case "Escape":
          onClose();
          setQuery("");
          break;
      }
    },
    [isOpen, results, selectedIndex, router, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-[15%] z-50 w-full max-w-xl -translate-x-1/2 px-4"
          >
            <div className="overflow-hidden rounded-2xl border border-border-light bg-surface shadow-2xl">
              <div className="flex items-center gap-3 border-b border-border-light px-4 py-3">
                <Search className="h-5 w-5 text-foreground-tertiary" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search posts, projects, and papers..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-foreground-tertiary focus:outline-none focus:ring-0 border-none"
                  autoFocus
                />
                <button
                  onClick={() => {
                    onClose();
                    setQuery("");
                  }}
                  className="rounded-lg p-1 hover:bg-border-light transition-colors"
                >
                  <X className="h-5 w-5 text-foreground-tertiary" />
                </button>
              </div>

              {results.length > 0 && (
                <div className="max-h-96 overflow-y-auto p-2">
                  {results.map((result, index) => {
                    const Icon = typeIcons[result.type];
                    return (
                      <button
                        key={`${result.type}-${result.slug}`}
                        onClick={() => {
                          router.push(result.url);
                          onClose();
                          setQuery("");
                        }}
                        className={`flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors ${
                          index === selectedIndex
                            ? "bg-accent/10"
                            : "hover:bg-border-light"
                        }`}
                      >
                        <div className="rounded-lg bg-accent/10 p-2">
                          <Icon className="h-4 w-4 text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground truncate">
                              {result.title}
                            </span>
                            <span className="text-xs text-foreground-tertiary">
                              {typeLabels[result.type]}
                            </span>
                          </div>
                          <p className="mt-0.5 text-sm text-foreground-secondary line-clamp-1">
                            {result.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {query && results.length === 0 && (
                <div className="p-8 text-center text-foreground-secondary">
                  No results found for &quot;{query}&quot;
                </div>
              )}

              {!query && (
                <div className="p-4 text-center text-sm text-foreground-tertiary">
                  <p>Start typing to search...</p>
                  <p className="mt-2">
                    <kbd className="rounded bg-border-light px-2 py-1 text-xs">↑↓</kbd>{" "}
                    to navigate,{" "}
                    <kbd className="rounded bg-border-light px-2 py-1 text-xs">Enter</kbd>{" "}
                    to select,{" "}
                    <kbd className="rounded bg-border-light px-2 py-1 text-xs">Esc</kbd>{" "}
                    to close
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
