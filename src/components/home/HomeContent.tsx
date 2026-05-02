"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Code, BookOpen, Calendar, Clock } from "lucide-react";
import { RippleLink } from "@/components/ui/Ripple";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { AppWall } from "@/components/projects/AppWall";
import { formatDate } from "@/lib/utils";
import type { PdfHighlightItem } from "@/lib/pdf-highlights";
import { PdfFirstPageImage } from "@/components/home/PdfFirstPageImage";
import type { PostFrontmatter, ProjectFrontmatter, PaperFrontmatter, ContentItem } from "@/lib/types";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function HighlightPreview({
  title,
  highlightImage,
  pdfUrl,
  layout = "featured",
}: {
  title: string;
  highlightImage?: string;
  pdfUrl?: string;
  layout?: "featured" | "compact";
}) {
  const isCompact = layout === "compact";

  if (highlightImage) {
    return (
      <Image
        src={highlightImage}
        alt={title}
        width={612}
        height={792}
        className={
          isCompact
            ? "block max-h-full w-auto max-w-full object-contain object-top mx-auto"
            : "block h-auto w-full max-h-[min(620px,72vh)] object-contain object-top"
        }
        sizes={
          isCompact
            ? "(max-width: 640px) 45vw, 220px"
            : "(max-width: 1024px) 94vw, 42vw"
        }
      />
    );
  }
  if (pdfUrl) {
    return (
      <PdfFirstPageImage
        pdfUrl={pdfUrl}
        alt={`First page: ${title}`}
        compact={isCompact}
        className={
          isCompact
            ? "block max-h-full w-auto max-w-full object-contain object-top mx-auto"
            : "block h-auto w-full max-h-[min(620px,72vh)] object-contain object-top"
        }
      />
    );
  }
  return (
    <div
      className={`flex w-full flex-1 shrink-0 items-center justify-center bg-surface px-6 text-center text-sm text-foreground-tertiary ${
        isCompact ? "h-44" : "min-h-[280px]"
      }`}
    >
      No preview
    </div>
  );
}

interface HomeContentProps {
  recentPosts: ContentItem<PostFrontmatter>[];
  recentProjects: ContentItem<ProjectFrontmatter>[];
  recentPapers: ContentItem<PaperFrontmatter>[];
  pdfHighlights: PdfHighlightItem[];
}

export function HomeContent({
  recentPosts,
  recentProjects,
  recentPapers,
  pdfHighlights,
}: HomeContentProps) {
  const featuredPdf = pdfHighlights[0];
  const morePdfHighlights = pdfHighlights.slice(1);
  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-20 md:pt-28 pb-12 md:pb-16"
      >
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-12">
          <div className="flex-1">
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Hi, I&apos;m{" "}
              <span className="text-accent">Shawn Schwartz, PhD</span>
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-foreground-secondary leading-relaxed">
              Senior data scientist & engineer at{" "}
              <span className="whitespace-nowrap">
                <span
                  className="mr-1 inline-block h-[1.05em] w-[1.05em] align-text-bottom"
                  aria-hidden
                >
                  <Image
                    src="/images/slack/logo.png"
                    alt=""
                    width={48}
                    height={48}
                    sizes="1.25rem"
                    className="block h-full w-full object-contain"
                  />
                </span>
                <strong className="text-foreground">Slack</strong>
              </span>
              . Psychology PhD from Stanford. I build open-source research tools, productivity software, and write about data, cognitive neuroscience, and building things.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <RippleLink
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-white hover:bg-accent-hover transition-colors active:scale-[0.98]"
              >
                Read my blog
                <ArrowRight className="h-4 w-4" />
              </RippleLink>
              <RippleLink
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium text-foreground hover:bg-surface transition-colors active:scale-[0.98]"
              >
                View projects
              </RippleLink>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 mx-auto">
              <Image
                src="/images/shawn/shawn_sf_ggb_square_web.png"
                alt="Shawn Schwartz"
                fill
                className="object-cover rounded-2xl shadow-xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Sections */}
      {/* <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 pb-16 md:grid-cols-3"
      >
        <motion.div variants={item} className="h-full">
          <Link
            href="/blog"
            className="group flex flex-col h-full rounded-2xl border border-border-light bg-surface p-8 transition-all hover:border-accent/50 hover:shadow-lg"
          >
            <div className="mb-4 inline-flex rounded-xl bg-accent/10 p-3 self-start">
              <FileText className="h-6 w-6 text-accent" />
            </div>
            <h2 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
              Blog
            </h2>
            <p className="mt-2 text-foreground-secondary flex-1">
              Thoughts on programming, technology, and lessons learned along the
              way.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
              Read posts
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </motion.div>

        <motion.div variants={item} className="h-full">
          <Link
            href="/projects"
            className="group flex flex-col h-full rounded-2xl border border-border-light bg-surface p-8 transition-all hover:border-accent/50 hover:shadow-lg"
          >
            <div className="mb-4 inline-flex rounded-xl bg-accent/10 p-3 self-start">
              <Code className="h-6 w-6 text-accent" />
            </div>
            <h2 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
              Projects
            </h2>
            <p className="mt-2 text-foreground-secondary flex-1">
              Open source tools and applications I&apos;ve built and
              contributed to.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
              View projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </motion.div>

        <motion.div variants={item} className="h-full">
          <Link
            href="/research"
            className="group flex flex-col h-full rounded-2xl border border-border-light bg-surface p-8 transition-all hover:border-accent/50 hover:shadow-lg"
          >
            <div className="mb-4 inline-flex rounded-xl bg-accent/10 p-3 self-start">
              <BookOpen className="h-6 w-6 text-accent" />
            </div>
            <h2 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
              Research
            </h2>
            <p className="mt-2 text-foreground-secondary flex-1">
              Academic publications and research papers I&apos;ve authored or
              co-authored.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
              View papers
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </motion.div>
      </motion.section> */}

      {/* Apps & Packages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="pt-6 md:pt-8"
      >
        <AppWall />
      </motion.div>


      {/* Highlights — highlightImage asset or rendered PDF first page */}
      {featuredPdf && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="pb-16 border-t border-border-light pt-16"
          aria-labelledby="home-highlights-heading"
        >
          <h2 id="home-highlights-heading" className="text-2xl font-semibold mb-8">
            Published Research Highlights
          </h2>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 lg:items-start">
            <Link
              href={featuredPdf.href}
              className="group order-2 lg:order-1 block"
              aria-label={`${featuredPdf.title} — view article`}
            >
              <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-border-light bg-white shadow-lg transition-all group-hover:border-accent/40 group-hover:shadow-xl dark:bg-neutral-950 lg:mx-0 lg:max-w-none">
                <HighlightPreview
                  layout="featured"
                  title={featuredPdf.title}
                  highlightImage={featuredPdf.highlightImage}
                  pdfUrl={featuredPdf.pdfUrl}
                />
              </div>
            </Link>
            <div className="order-1 lg:order-2">
              <p className="text-sm font-medium text-accent">Current article</p>
              <Link href={featuredPdf.href} className="mt-2 block group/title">
                <h3 className="text-2xl font-bold tracking-tight text-foreground transition-colors group-hover/title:text-accent md:text-3xl">
                  {featuredPdf.title}
                </h3>
              </Link>
              {featuredPdf.subtitle && (
                <p className="mt-3 text-sm text-foreground-secondary line-clamp-2">
                  {featuredPdf.subtitle}
                </p>
              )}
              <p className="mt-4 text-foreground-secondary leading-relaxed">
                {featuredPdf.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-foreground-tertiary">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(featuredPdf.date)}
                </span>
              </div>
              <Link
                href={featuredPdf.href}
                className="group/read mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
              >
                Read article
                <ArrowRight className="h-4 w-4 transition-transform group-hover/read:translate-x-1" />
              </Link>
            </div>
          </div>

          {morePdfHighlights.length > 0 && (
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {morePdfHighlights.map((item) => (
                <motion.article
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="group h-full"
                >
                  <Link href={item.href} className="block h-full">
                    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border-light bg-surface transition-all hover:border-accent/50 hover:shadow-lg">
                      <div className="flex h-52 w-full shrink-0 items-start justify-center overflow-hidden border-b border-border-light bg-white dark:bg-neutral-950">
                        <HighlightPreview
                          layout="compact"
                          title={item.title}
                          highlightImage={item.highlightImage}
                          pdfUrl={item.pdfUrl}
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <h3 className="font-semibold text-foreground transition-colors group-hover:text-accent line-clamp-2">
                          {item.title}
                        </h3>
                        {item.subtitle && (
                          <p className="mt-1 text-xs text-foreground-secondary line-clamp-1">
                            {item.subtitle}
                          </p>
                        )}
                        <div className="mt-auto flex items-center gap-1 text-xs font-medium text-accent pt-3">
                          View
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </motion.section>
      )}

      {/* Recent Blog Posts */}
      {recentPosts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="py-16 border-t border-border-light"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">Recent Blog Posts</h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-accent hover:text-accent-hover transition-colors inline-flex items-center gap-1"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group h-full"
              >
                <Link href={`/blog/${post.slug}`} className="h-full block">
                  <div className="overflow-hidden rounded-2xl border border-border-light bg-surface transition-all hover:border-accent/50 hover:shadow-lg h-full flex flex-col">
                    <div className="relative aspect-video overflow-hidden flex-shrink-0">
                      {post.frontmatter.image ? (
                        <Image
                          src={post.frontmatter.image}
                          alt={post.frontmatter.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/10 to-transparent flex items-center justify-center">
                          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                            <FileText className="h-6 w-6 text-accent/60" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2 min-h-[3rem]">
                        {post.frontmatter.title}
                      </h3>
                      <p className="mt-2 text-sm text-foreground-secondary line-clamp-2 flex-1">
                        {post.frontmatter.description}
                      </p>
                      <div className="mt-3 flex items-center gap-3 text-xs text-foreground-tertiary">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(post.frontmatter.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {post.readingTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.section>
      )}

      {/* Recent Projects */}
      {recentProjects.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="py-16 border-t border-border-light"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">Recent Projects</h2>
            <Link
              href="/projects"
              className="text-sm font-medium text-accent hover:text-accent-hover transition-colors inline-flex items-center gap-1"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentProjects.map((project, index) => (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group h-full"
              >
                <Link href={`/projects/${project.slug}`} className="h-full block">
                  <div className="overflow-hidden rounded-2xl border border-border-light bg-surface transition-all hover:border-accent/50 hover:shadow-lg h-full flex flex-col">
                    <div className="relative aspect-video overflow-hidden flex-shrink-0">
                      {project.frontmatter.image ? (
                        <Image
                          src={project.frontmatter.image}
                          alt={project.frontmatter.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/10 to-transparent flex items-center justify-center">
                          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                            <Code className="h-6 w-6 text-accent/60" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-1">
                        {project.frontmatter.title}
                      </h3>
                      <p className="mt-2 text-sm text-foreground-secondary line-clamp-2 flex-1">
                        {project.frontmatter.description}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-1.5 min-h-[1.75rem]">
                        {project.frontmatter.tags && project.frontmatter.tags.length > 0 && (
                          <>
                            {project.frontmatter.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent leading-none"
                              >
                                {tag}
                              </span>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.section>
      )}

      {/* Newsletter Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="border-t border-border-light py-16"
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Stay updated</h2>
          <p className="mt-2 text-foreground-secondary">
            Subscribe to get notified about new posts and projects.
          </p>
          <NewsletterForm />
        </div>
      </motion.section>
    </div>
  );
}
