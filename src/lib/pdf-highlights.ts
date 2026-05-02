import type { ContentItem, PaperFrontmatter, PostFrontmatter } from "@/lib/types";

export interface PdfHighlightItem {
  /** Article URL — research or blog */
  href: string;
  title: string;
  description: string;
  date: string;
  /** First-page preview via PDF.js when highlightImage is unset */
  pdfUrl?: string;
  /** Raster/cover asset under `/public`; preferred over pdfUrl thumbnail */
  highlightImage?: string;
  /** e.g. author list or "Blog" */
  subtitle?: string;
}

function compareByDateDescending(a: PdfHighlightItem, b: PdfHighlightItem) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

/**
 * Home-page highlights when `highlightImage` and/or `pdf` is set in frontmatter.
 */
export function getPdfHighlightItems(
  papers: ContentItem<PaperFrontmatter>[],
  posts: ContentItem<PostFrontmatter>[]
): PdfHighlightItem[] {
  const items: PdfHighlightItem[] = [];

  for (const paper of papers) {
    const pdf = paper.frontmatter.pdf?.trim();
    const highlightImage = paper.frontmatter.highlightImage?.trim();
    if (!pdf && !highlightImage) continue;
    items.push({
      href: `/research/${paper.slug}`,
      title: paper.frontmatter.title,
      description: paper.frontmatter.description,
      date: paper.frontmatter.date,
      ...(pdf ? { pdfUrl: pdf } : {}),
      ...(highlightImage ? { highlightImage } : {}),
      subtitle: paper.frontmatter.authors.join(", "),
    });
  }

  for (const post of posts) {
    const pdf = post.frontmatter.pdf?.trim();
    const highlightImage = post.frontmatter.highlightImage?.trim();
    if (!pdf && !highlightImage) continue;
    items.push({
      href: `/blog/${post.slug}`,
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      date: post.frontmatter.date,
      ...(pdf ? { pdfUrl: pdf } : {}),
      ...(highlightImage ? { highlightImage } : {}),
      subtitle: "Blog",
    });
  }

  items.sort(compareByDateDescending);
  return items;
}
