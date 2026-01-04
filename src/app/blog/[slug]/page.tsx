import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getBlogPost, getBlogPosts, compileMDXContent } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { mdxComponents } from "@/components/blog/MDXComponents";
import { CitedContent } from "@/components/blog/Citations";
import { AuthorBio } from "@/components/blog/AuthorBio";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { Comments } from "@/components/blog/Comments";
import { CrossPost } from "@/components/blog/CrossPost";
import { ArticleJsonLd } from "@/components/JsonLd";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
      images: post.frontmatter.image ? [post.frontmatter.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: post.frontmatter.image ? [post.frontmatter.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const content = await compileMDXContent(post.content, mdxComponents);

  return (
    <>
      <ArticleJsonLd
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        datePublished={post.frontmatter.date}
        url={`https://shawnschwartz.com/blog/${slug}`}
        image={post.frontmatter.image}
      />
      <ReadingProgress />
      <article className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-foreground-secondary hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        {post.frontmatter.image && (
          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl mb-10">
            <Image
              src={post.frontmatter.image}
              alt={post.frontmatter.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <header className="mb-12">
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {post.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {post.frontmatter.title}
          </h1>

          <p className="mt-4 text-xl text-foreground-secondary">
            {post.frontmatter.description}
          </p>

          <div className="mt-6 flex items-center gap-4 text-sm text-foreground-tertiary">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(post.frontmatter.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readingTime}
            </span>
          </div>
        </header>

        <CitedContent>
          <div className="prose prose-lg max-w-none">
            {content}
          </div>
        </CitedContent>

        <CrossPost crosspost={post.frontmatter.crosspost} />

        <AuthorBio />

        <Comments />
      </article>
    </>
  );
}
