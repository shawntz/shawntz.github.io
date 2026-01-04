"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FileText, ExternalLink, Calendar, Github, Database } from "lucide-react";
import { formatDate, isHighlightedAuthor } from "@/lib/utils";

interface PaperCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  authors: string[];
  journal?: string;
  conference?: string;
  doi?: string;
  pdf?: string;
  github?: string;
  osf?: string;
  figure?: string;
  figureCaption?: string;
}

export function PaperCard({
  slug,
  title,
  description,
  date,
  authors,
  journal,
  conference,
  doi,
  pdf,
  github,
  osf,
  figure,
  figureCaption,
}: PaperCardProps) {
  const venue = journal || conference;

  return (
    <motion.article
      layoutId={`paper-${slug}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <div className="group overflow-hidden rounded-2xl border border-border-light bg-surface transition-all hover:border-accent/50 hover:shadow-lg p-6">
        <div className="flex items-start gap-4">
          {figure ? (
            <motion.div
              layoutId={`paper-figure-${slug}`}
              className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg border border-border-light bg-white dark:bg-gray-900"
            >
              <Image
                src={figure}
                alt={figureCaption || `Key figure from ${title}`}
                fill
                className="object-contain p-2"
              />
            </motion.div>
          ) : (
            <div className="rounded-lg bg-accent/10 p-3 flex-shrink-0">
              <FileText className="h-6 w-6 text-accent" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <Link href={`/research/${slug}`}>
              <motion.h2
                layoutId={`paper-title-${slug}`}
                className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2"
              >
                {title}
              </motion.h2>
            </Link>

            <p className="mt-1 text-sm text-foreground-secondary line-clamp-1">
              {authors.map((author, index) => (
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
              <p className="mt-1 text-sm italic text-foreground-tertiary">
                {venue}
              </p>
            )}

            <p className="mt-2 text-foreground-secondary line-clamp-2">
              {description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-foreground-tertiary">
                <Calendar className="h-4 w-4" />
                {formatDate(date)}
              </span>

              <div className="flex items-center gap-3 ml-auto">
                {pdf && (
                  <a
                    href={pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-accent hover:text-accent-hover transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    PDF
                  </a>
                )}
                {doi && (
                  <a
                    href={`https://doi.org/${doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-accent hover:text-accent-hover transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    DOI
                  </a>
                )}
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-accent hover:text-accent-hover transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    Code
                  </a>
                )}
                {osf && (
                  <a
                    href={osf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-accent hover:text-accent-hover transition-colors"
                  >
                    <Database className="h-4 w-4" />
                    Data
                  </a>
                )}
                <Link
                  href={`/research/${slug}`}
                  className="font-medium text-accent hover:text-accent-hover transition-colors"
                >
                  Details →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
