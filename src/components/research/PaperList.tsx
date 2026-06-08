"use client";

import { useState, useMemo } from "react";
import { PaperCard } from "./PaperCard";
import { TagFilter } from "@/components/ui/TagFilter";
import { getPaperYear } from "@/lib/utils";
import type { PaperFrontmatter, ContentItem } from "@/lib/types";

interface PaperListProps {
  papers: ContentItem<PaperFrontmatter>[];
}

export function PaperList({ papers }: PaperListProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const years = Array.from(new Set(papers.map(getPaperYear)));
    return years.sort((a, b) => parseInt(b) - parseInt(a));
  }, [papers]);

  const filteredPapers = useMemo(() => {
    if (selectedTags.length === 0) return papers;
    return papers.filter((paper) => selectedTags.includes(getPaperYear(paper)));
  }, [papers, selectedTags]);

  const papersByYear = useMemo(() => {
    const grouped = new Map<string, ContentItem<PaperFrontmatter>[]>();

    filteredPapers.forEach((paper) => {
      const year = getPaperYear(paper);
      const yearPapers = grouped.get(year) ?? [];
      yearPapers.push(paper);
      grouped.set(year, yearPapers);
    });

    return Array.from(grouped.entries()).sort(
      ([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA)
    );
  }, [filteredPapers]);

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
        <div className="space-y-12">
          {papersByYear.map(([year, yearPapers]) => (
            <section key={year} aria-labelledby={`publications-${year}`}>
              <h2
                id={`publications-${year}`}
                className="mb-6 text-2xl font-semibold tracking-tight text-foreground"
              >
                {year}
              </h2>
              <div className="space-y-4">
                {yearPapers.map((paper) => (
                  <PaperCard
                    key={paper.slug}
                    paper={paper}
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
            </section>
          ))}
        </div>
      )}
    </>
  );
}
