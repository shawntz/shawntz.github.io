import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPaper, getPapers, compileMDXContent } from "@/lib/mdx";
import { formatDate, parseDate, isHighlightedAuthor } from "@/lib/utils";
import { ArrowLeft, FileText, ExternalLink, Calendar, Github, Database } from "lucide-react";
import { CopyBibtexButton } from "@/components/research/CopyBibtexButton";
import { mdxComponents } from "@/components/blog/MDXComponents";
import { CitedContent } from "@/components/blog/Citations";
import { ScholarlyArticleJsonLd } from "@/components/JsonLd";

interface PaperPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const papers = await getPapers();
  return papers.map((paper) => ({ slug: paper.slug }));
}

export async function generateMetadata({
  params,
}: PaperPageProps): Promise<Metadata> {
  const { slug } = await params;
  const paper = await getPaper(slug);

  if (!paper) {
    return {};
  }

  return {
    title: paper.frontmatter.title,
    description: paper.frontmatter.description,
    openGraph: {
      title: paper.frontmatter.title,
      description: paper.frontmatter.description,
      type: "article",
    },
  };
}

function generateBibtex(paper: {
  frontmatter: {
    title: string;
    authors: string[];
    date: string;
    journal?: string;
    conference?: string;
    doi?: string;
  };
  slug: string;
}) {
  const year = parseDate(paper.frontmatter.date).getFullYear();
  const firstAuthor = paper.frontmatter.authors[0].split(" ").pop() || "author";
  const key = `${firstAuthor.toLowerCase()}${year}`;

  const venue = paper.frontmatter.journal || paper.frontmatter.conference || "";
  const entryType = paper.frontmatter.journal ? "article" : "inproceedings";

  return `@${entryType}{${key},
  title = {${paper.frontmatter.title}},
  author = {${paper.frontmatter.authors.join(" and ")}},
  year = {${year}},
  ${paper.frontmatter.journal ? `journal = {${venue}}` : `booktitle = {${venue}}`}${paper.frontmatter.doi ? `,
  doi = {${paper.frontmatter.doi}}` : ""}
}`;
}

export default async function PaperPage({ params }: PaperPageProps) {
  const { slug } = await params;
  const paper = await getPaper(slug);

  if (!paper) {
    notFound();
  }

  const content = await compileMDXContent(paper.content, mdxComponents);
  const bibtex = generateBibtex(paper);
  const venue = paper.frontmatter.journal || paper.frontmatter.conference;

  return (
    <>
      <ScholarlyArticleJsonLd
        title={paper.frontmatter.title}
        description={paper.frontmatter.description}
        datePublished={paper.frontmatter.date}
        authors={paper.frontmatter.authors}
        url={`https://shawnschwartz.com/research/${slug}`}
        doi={paper.frontmatter.doi}
        journal={paper.frontmatter.journal}
        conference={paper.frontmatter.conference}
      />
      <article className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/research"
          className="inline-flex items-center gap-2 text-sm text-foreground-secondary hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to research
        </Link>

      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {paper.frontmatter.title}
        </h1>

        <p className="mt-4 text-foreground-secondary">
          {paper.frontmatter.authors.map((author, index) => (
            <span key={author}>
              {index > 0 && ", "}
              {isHighlightedAuthor(author) ? (
                <strong className="font-semibold text-foreground">{author}</strong>
              ) : (
                author
              )}
            </span>
          ))}
        </p>

        {venue && (
          <p className="mt-2 italic text-foreground-tertiary">{venue}</p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
          <span className="flex items-center gap-1.5 text-foreground-tertiary">
            <Calendar className="h-4 w-4" />
            {formatDate(paper.frontmatter.date)}
          </span>

          {paper.frontmatter.doi && (
            <a
              href={`https://doi.org/${paper.frontmatter.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 font-medium text-white hover:bg-accent-hover transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              DOI
            </a>
          )}

          {paper.frontmatter.pdf && (
            <a
              href={paper.frontmatter.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 font-medium hover:bg-surface transition-colors"
            >
              <FileText className="h-4 w-4" />
              PDF
            </a>
          )}

          {paper.frontmatter.github && (
            <a
              href={paper.frontmatter.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 font-medium hover:bg-surface transition-colors"
            >
              <Github className="h-4 w-4" />
              Code
            </a>
          )}

          {paper.frontmatter.osf && (
            <a
              href={paper.frontmatter.osf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 font-medium hover:bg-surface transition-colors"
            >
              <Database className="h-4 w-4" />
              Data
            </a>
          )}
        </div>
      </header>

      {paper.frontmatter.abstract && (
        <section className="mb-12 rounded-2xl border border-border-light bg-surface p-6">
          <h2 className="mb-4 text-lg font-semibold">Abstract</h2>
          <p className="text-foreground-secondary leading-relaxed">
            {paper.frontmatter.abstract}
          </p>
        </section>
      )}

      <CitedContent>
        <div className="prose prose-lg max-w-none">
          {content}
        </div>
      </CitedContent>

      {paper.frontmatter.figure && (
        <figure className="mt-12">
          <div className="relative overflow-hidden rounded-2xl border border-border-light bg-white dark:bg-gray-900">
            <div className="relative aspect-[16/9]">
              <Image
                src={paper.frontmatter.figure}
                alt={paper.frontmatter.figureCaption || `Key figure from ${paper.frontmatter.title}`}
                fill
                className="object-contain p-6"
              />
            </div>
          </div>
          {paper.frontmatter.figureCaption && (
            <figcaption className="mt-3 text-justify text-sm text-foreground-secondary">
              {paper.frontmatter.figureCaption}
            </figcaption>
          )}
        </figure>
      )}

      <section className="mt-12 rounded-2xl border border-border-light bg-surface p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Cite this paper</h2>
          <CopyBibtexButton bibtex={bibtex} />
        </div>
        <pre className="overflow-x-auto rounded-lg bg-code-bg p-4 text-sm">
          <code>{bibtex}</code>
        </pre>
      </section>
      </article>
    </>
  );
}
