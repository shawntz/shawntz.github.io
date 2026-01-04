import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Parse date safely to avoid timezone issues with date-only strings
export function parseDate(date: string | Date): Date {
  if (typeof date === "string" && !date.includes("T")) {
    return new Date(`${date}T12:00:00`);
  }
  return new Date(date);
}

export function formatDate(date: string | Date): string {
  return parseDate(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

// Names to bold in author lists
const HIGHLIGHTED_NAMES = ["Shawn Schwartz", "Shawn T. Schwartz", "S. Schwartz", "S. T. Schwartz"];

export function isHighlightedAuthor(author: string): boolean {
  return HIGHLIGHTED_NAMES.some(
    (name) => author.toLowerCase().includes(name.toLowerCase())
  );
}
