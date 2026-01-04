"use client";

import { useState, useMemo } from "react";
import { PostCard } from "./PostCard";
import { TagFilter } from "@/components/ui/TagFilter";
import type { PostFrontmatter, ContentItem } from "@/lib/types";

interface BlogListProps {
  posts: ContentItem<PostFrontmatter>[];
}

export function BlogList({ posts }: BlogListProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract unique tags from all posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => {
      post.frontmatter.tags?.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [posts]);

  // Filter posts based on selected tags
  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) return posts;
    return posts.filter((post) =>
      selectedTags.some((tag) => post.frontmatter.tags?.includes(tag))
    );
  }, [posts, selectedTags]);

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

      {filteredPosts.length === 0 ? (
        <div className="rounded-2xl border border-border-light bg-surface p-12 text-center">
          <p className="text-foreground-secondary">No posts match the selected filters.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredPosts.map((post, index) => (
            <PostCard
              key={post.slug}
              slug={post.slug}
              title={post.frontmatter.title}
              description={post.frontmatter.description}
              date={post.frontmatter.date}
              readingTime={post.readingTime}
              tags={post.frontmatter.tags}
              image={post.frontmatter.image}
              featured={index === 0 && selectedTags.length === 0}
            />
          ))}
        </div>
      )}
    </>
  );
}
