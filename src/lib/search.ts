import type { SearchResult } from "./types";

export type { SearchResult };

export function searchContent(
  query: string,
  items: SearchResult[]
): SearchResult[] {
  if (!query.trim()) return [];

  const searchTerms = query.toLowerCase().split(/\s+/);

  return items
    .map((item) => {
      const titleLower = item.title.toLowerCase();
      const descLower = item.description.toLowerCase();
      let score = 0;

      for (const term of searchTerms) {
        if (titleLower.includes(term)) {
          score += titleLower === term ? 10 : 5;
        }
        if (descLower.includes(term)) {
          score += 2;
        }
      }

      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item)
    .slice(0, 10);
}
