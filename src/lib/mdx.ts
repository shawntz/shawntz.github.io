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

export type {
  PostFrontmatter,
  ProjectFrontmatter,
  PaperFrontmatter,
  ContentItem,
};

const contentDirectory = path.join(process.cwd(), "src/content");

async function getContentFiles(type: "blog" | "projects" | "research") {
  const dir = path.join(contentDirectory, type);
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));
}

export async function getContentBySlug<T>(
  type: "blog" | "projects" | "research",
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
  type: "blog" | "projects" | "research"
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

export async function getPapers() {
  return getAllContent<PaperFrontmatter>("research");
}

export async function getPaper(slug: string) {
  return getContentBySlug<PaperFrontmatter>("research", slug);
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
      url: `/research/${paper.slug}`,
    });
  }

  return results;
}
