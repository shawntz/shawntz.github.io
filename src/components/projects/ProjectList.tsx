"use client";

import { useState, useMemo } from "react";
import { ProjectCard } from "./ProjectCard";
import { TagFilter } from "@/components/ui/TagFilter";
import type { ProjectFrontmatter, ContentItem } from "@/lib/types";

interface ProjectListProps {
  projects: ContentItem<ProjectFrontmatter>[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract unique tags from all projects
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach((project) => {
      project.frontmatter.tags?.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [projects]);

  // Filter projects based on selected tags
  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return projects;
    return projects.filter((project) =>
      selectedTags.some((tag) => project.frontmatter.tags?.includes(tag))
    );
  }, [projects, selectedTags]);

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

      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-border-light bg-surface p-12 text-center">
          <p className="text-foreground-secondary">No projects match the selected filters.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.frontmatter.title}
              description={project.frontmatter.description}
              tags={project.frontmatter.tags}
              image={project.frontmatter.image}
              logo={project.frontmatter.logo}
              github={project.frontmatter.github}
              demo={project.frontmatter.demo}
              featured={project.frontmatter.featured || (index === 0 && selectedTags.length === 0)}
            />
          ))}
        </div>
      )}
    </>
  );
}
