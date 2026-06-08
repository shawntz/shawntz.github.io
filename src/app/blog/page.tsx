import { Metadata } from "next";
import { getBlogPosts } from "@/lib/mdx";
import { BlogList } from "@/components/blog/BlogList";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on programming, technology, and lessons learned along the way.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-12">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground-tertiary">
          Writing
        </p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Blog</h1>
        <p className="mt-4 max-w-2xl text-lg text-foreground-secondary leading-relaxed">
          Thoughts on programming, technology, and lessons learned along the way.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-border-light bg-surface p-12 text-center">
          <p className="text-foreground-secondary">No posts yet. Check back soon!</p>
        </div>
      ) : (
        <BlogList posts={posts} />
      )}
    </div>
  );
}
