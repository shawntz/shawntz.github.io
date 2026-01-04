export interface SearchResult {
  type: "blog" | "project" | "paper";
  slug: string;
  title: string;
  description: string;
  url: string;
}

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  published: boolean;
  tags?: string[];
  image?: string;
  crosspost?: {
    devto?: string;
    medium?: string;
    linkedin?: string;
    substack?: string;
  };
}

export interface ProjectFrontmatter {
  title: string;
  description: string;
  date: string;
  published: boolean;
  tags?: string[];
  image?: string;
  logo?: string;
  github?: string;
  demo?: string;
  featured?: boolean;
}

export interface PaperFrontmatter {
  title: string;
  description: string;
  date: string;
  published: boolean;
  authors: string[];
  journal?: string;
  conference?: string;
  doi?: string;
  pdf?: string;
  github?: string;
  osf?: string;
  abstract?: string;
  figure?: string;
  figureCaption?: string;
}

export interface ContentItem<T> {
  slug: string;
  frontmatter: T;
  content: string;
  readingTime: string;
}
