import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import readingTime from "reading-time";
import type { MDXComponents } from "mdx/types";
import type {
  PostFrontmatter,
  ProjectFrontmatter,
  PaperFrontmatter,
  ContentItem,
  SearchResult,
} from "./types";
import { getPaperPath } from "./utils";

export type {
  PostFrontmatter,
  ProjectFrontmatter,
  PaperFrontmatter,
  ContentItem,
};

const contentDirectory = path.join(process.cwd(), "src/content");

async function getContentFiles(type: "blog" | "projects") {
  const dir = path.join(contentDirectory, type);
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));
}

interface ResearchContentFile {
  slug: string;
  year?: string;
  filePath: string;
}

function getResearchContentFiles(): ResearchContentFile[] {
  const dir = path.join(contentDirectory, "research");
  if (!fs.existsSync(dir)) {
    return [];
  }

  const files: ResearchContentFile[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && /^\d{4}$/.test(entry.name)) {
      const year = entry.name;
      const yearDir = path.join(dir, year);

      for (const file of fs.readdirSync(yearDir)) {
        if (file.endsWith(".mdx")) {
          files.push({
            slug: file.replace(/\.mdx$/, ""),
            year,
            filePath: path.join(yearDir, file),
          });
        }
      }
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      files.push({
        slug: entry.name.replace(/\.mdx$/, ""),
        filePath: path.join(dir, entry.name),
      });
    }
  }

  return files;
}

export async function getContentBySlug<T>(
  type: "blog" | "projects",
  slug: string
): Promise<ContentItem<T> | null> {
  const filePath = path.join(contentDirectory, type, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    frontmatter: data as T,
    content,
    readingTime: readingTime(content).text,
  };
}

export async function getAllContent<T>(
  type: "blog" | "projects"
): Promise<ContentItem<T>[]> {
  const files = await getContentFiles(type);

  const content = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(".mdx", "");
      return getContentBySlug<T>(type, slug);
    })
  );

  return content
    .filter((item): item is ContentItem<T> => item !== null)
    .filter((item) => (item.frontmatter as { published?: boolean }).published !== false)
    .sort(
      (a, b) =>
        new Date((b.frontmatter as { date: string }).date).getTime() -
        new Date((a.frontmatter as { date: string }).date).getTime()
    );
}

export async function compileMDXContent(
  source: string,
  components?: MDXComponents
) {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: {
                dark: "github-dark",
                light: "github-light",
              },
              keepBackground: false,
              defaultLang: "plaintext",
            },
          ],
        ],
      },
    },
  });

  return content;
}

export async function getBlogPosts() {
  return getAllContent<PostFrontmatter>("blog");
}

export async function getBlogPost(slug: string) {
  return getContentBySlug<PostFrontmatter>("blog", slug);
}

export async function getProjects() {
  return getAllContent<ProjectFrontmatter>("projects");
}

export async function getProject(slug: string) {
  return getContentBySlug<ProjectFrontmatter>("projects", slug);
}

async function getResearchContentBySlug(
  year: string,
  slug: string
): Promise<ContentItem<PaperFrontmatter> | null> {
  const match = getResearchContentFiles().find((file) => file.slug === slug);
  if (!match) {
    return null;
  }

  const fileContent = fs.readFileSync(match.filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const frontmatter = data as PaperFrontmatter;
  const paperYear =
    match.year ??
    new Date(
      frontmatter.date.includes("T")
        ? frontmatter.date
        : `${frontmatter.date}T12:00:00`
    )
      .getFullYear()
      .toString();

  if (paperYear !== year) {
    return null;
  }

  return {
    slug,
    year: paperYear,
    frontmatter,
    content,
    readingTime: readingTime(content).text,
  };
}

export async function getPapers() {
  const files = getResearchContentFiles();

  const papers = await Promise.all(
    files.map((file) => {
      const year =
        file.year ??
        (() => {
          const fileContent = fs.readFileSync(file.filePath, "utf-8");
          const { data } = matter(fileContent);
          const date = (data as PaperFrontmatter).date;
          return new Date(date.includes("T") ? date : `${date}T12:00:00`)
            .getFullYear()
            .toString();
        })();
      return getResearchContentBySlug(year, file.slug);
    })
  );

  return papers
    .filter((item): item is ContentItem<PaperFrontmatter> => item !== null)
    .filter((item) => item.frontmatter.published !== false)
    .sort((a, b) => {
      const yearDiff = (b.year ?? "0").localeCompare(a.year ?? "0");
      if (yearDiff !== 0) {
        return yearDiff;
      }

      return (
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
      );
    });
}

export async function getPaper(year: string, slug: string) {
  return getResearchContentBySlug(year, slug);
}

export async function buildSearchIndex(): Promise<SearchResult[]> {
  const [posts, projects, papers] = await Promise.all([
    getBlogPosts(),
    getProjects(),
    getPapers(),
  ]);

  const results: SearchResult[] = [];

  for (const post of posts) {
    results.push({
      type: "blog",
      slug: post.slug,
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: `/blog/${post.slug}`,
    });
  }

  for (const project of projects) {
    results.push({
      type: "project",
      slug: project.slug,
      title: project.frontmatter.title,
      description: project.frontmatter.description,
      url: `/projects/${project.slug}`,
    });
  }

  for (const paper of papers) {
    results.push({
      type: "paper",
      slug: paper.slug,
      title: paper.frontmatter.title,
      description: paper.frontmatter.description,
      url: getPaperPath(paper),
    });
  }

  return results;
}
