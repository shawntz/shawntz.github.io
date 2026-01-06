"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";

interface PostCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags?: string[];
  image?: string;
  featured?: boolean;
}

export function PostCard({
  slug,
  title,
  description,
  date,
  readingTime,
  tags,
  image,
  featured = false,
}: PostCardProps) {
  return (
    <motion.article
      layoutId={`post-${slug}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={`group h-full ${featured ? "col-span-full" : ""}`}
    >
      <Link href={`/blog/${slug}`} className="h-full block">
        <div
          className={`h-full overflow-hidden rounded-2xl border border-border-light bg-surface transition-all hover:border-accent/50 hover:shadow-lg ${
            featured ? "md:flex md:items-stretch" : "flex flex-col"
          }`}
        >
          <motion.div
            layoutId={`post-image-${slug}`}
            className={`relative overflow-hidden ${
              featured ? "md:w-1/2 md:min-h-[280px]" : "aspect-video"
            }`}
          >
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/10 to-transparent flex items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-accent/60">{title.charAt(0)}</span>
                </div>
              </div>
            )}
          </motion.div>

          <div className={`p-6 flex flex-col ${featured ? "md:w-1/2 md:justify-center" : "flex-1"}`}>
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

            <motion.h2
              layoutId={`post-title-${slug}`}
              className={`font-semibold text-foreground group-hover:text-accent transition-colors ${
                featured ? "text-2xl md:text-3xl" : "text-xl"
              }`}
            >
              {title}
            </motion.h2>

            <p className="mt-2 text-foreground-secondary line-clamp-2">
              {description}
            </p>

            <div className="mt-auto pt-4 flex items-center gap-4 text-sm text-foreground-tertiary">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {readingTime}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
