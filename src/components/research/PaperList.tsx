"use client";

import { useState, useMemo } from "react";
import { PaperCard } from "./PaperCard";
import { TagFilter } from "@/components/ui/TagFilter";
import { parseDate } from "@/lib/utils";
import type { PaperFrontmatter, ContentItem } from "@/lib/types";

interface PaperListProps {
  papers: ContentItem<PaperFrontmatter>[];
}

export function PaperList({ papers }: PaperListProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract unique years and publication types from all papers
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    papers.forEach((paper) => {
      // Add year
      const year = parseDate(paper.frontmatter.date).getFullYear().toString();
      tagSet.add(year);
      // Add publication type
      if (paper.frontmatter.journal) tagSet.add("Journal");
      if (paper.frontmatter.conference) tagSet.add("Conference");
    });
    // Sort with types first, then years descending
    const tags = Array.from(tagSet);
    const types = tags.filter((t) => t === "Journal" || t === "Conference").sort();
    const years = tags.filter((t) => t !== "Journal" && t !== "Conference").sort((a, b) => parseInt(b) - parseInt(a));
    return [...types, ...years];
  }, [papers]);

  // Filter papers based on selected tags
  const filteredPapers = useMemo(() => {
    if (selectedTags.length === 0) return papers;
    return papers.filter((paper) => {
      const year = parseDate(paper.frontmatter.date).getFullYear().toString();
      const isJournal = paper.frontmatter.journal ? "Journal" : null;
      const isConference = paper.frontmatter.conference ? "Conference" : null;

      return selectedTags.some((tag) =>
        tag === year || tag === isJournal || tag === isConference
      );
    });
  }, [papers, selectedTags]);

  const handleTagSelect = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearAll = () => {
    setSelectedTags([]);
  };

  return (
    <>
      <TagFilter
        tags={allTags}
        selectedTags={selectedTags}
        onTagSelect={handleTagSelect}
        onClearAll={handleClearAll}
      />

      {filteredPapers.length === 0 ? (
        <div className="rounded-2xl border border-border-light bg-surface p-12 text-center">
          <p className="text-foreground-secondary">No publications match the selected filters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPapers.map((paper) => (
            <PaperCard
              key={paper.slug}
              slug={paper.slug}
              title={paper.frontmatter.title}
              description={paper.frontmatter.description}
              date={paper.frontmatter.date}
              authors={paper.frontmatter.authors}
              journal={paper.frontmatter.journal}
              conference={paper.frontmatter.conference}
              doi={paper.frontmatter.doi}
              pdf={paper.frontmatter.pdf}
              github={paper.frontmatter.github}
              osf={paper.frontmatter.osf}
              figure={paper.frontmatter.figure}
              figureCaption={paper.frontmatter.figureCaption}
            />
          ))}
        </div>
      )}
    </>
  );
}
