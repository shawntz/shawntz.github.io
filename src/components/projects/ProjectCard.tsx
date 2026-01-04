"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  tags?: string[];
  image?: string;
  logo?: string;
  github?: string;
  demo?: string;
  featured?: boolean;
}

export function ProjectCard({
  slug,
  title,
  description,
  tags,
  image,
  logo,
  github,
  demo,
  featured = false,
}: ProjectCardProps) {
  return (
    <motion.article
      layoutId={`project-${slug}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={featured ? "col-span-full md:col-span-2" : ""}
    >
      <div className="group overflow-hidden rounded-2xl border border-border-light bg-surface transition-all hover:border-accent/50 hover:shadow-lg h-full flex flex-col">
        <motion.div
          layoutId={`project-image-${slug}`}
          className="relative aspect-video overflow-hidden"
        >
          {logo ? (
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-surface to-accent/5 flex items-center justify-center">
              <div className="relative w-24 h-24 md:w-32 md:h-32 transition-transform duration-500 group-hover:scale-110">
                <Image
                  src={logo}
                  alt={title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ) : image ? (
            <>
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/10 to-transparent flex items-center justify-center">
              <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center">
                <span className="text-3xl font-bold text-accent/60">{title.charAt(0)}</span>
              </div>
            </div>
          )}
        </motion.div>

        <div className="flex flex-col flex-1 p-6">
          {tags && tags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <Link href={`/projects/${slug}`}>
            <motion.h2
              layoutId={`project-title-${slug}`}
              className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors"
            >
              {title}
            </motion.h2>
          </Link>

          <p className="mt-2 text-foreground-secondary line-clamp-2 flex-1">
            {description}
          </p>

          <div className="mt-4 flex items-center gap-3">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-foreground-secondary hover:text-accent transition-colors"
              >
                <Github className="h-4 w-4" />
                Code
              </a>
            )}
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-foreground-secondary hover:text-accent transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Demo
              </a>
            )}
            <Link
              href={`/projects/${slug}`}
              className="ml-auto text-sm font-medium text-accent hover:text-accent-hover transition-colors"
            >
              Learn more →
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
