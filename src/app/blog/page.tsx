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
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-semibold tracking-tight md:text-[64px]">Blog</h1>
        <p className="mt-6 text-lg text-foreground-secondary max-w-3xl mx-auto leading-relaxed text-balance">
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
