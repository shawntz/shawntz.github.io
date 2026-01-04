import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProject, getProjects, compileMDXContent } from "@/lib/mdx";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { mdxComponents } from "@/components/blog/MDXComponents";
import { CitedContent } from "@/components/blog/Citations";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
    openGraph: {
      title: project.frontmatter.title,
      description: project.frontmatter.description,
      type: "website",
      images: project.frontmatter.image ? [project.frontmatter.image] : [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const content = await compileMDXContent(project.content, mdxComponents);

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-foreground-secondary hover:text-accent transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </Link>

      {project.frontmatter.image && (
        <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl mb-10">
          <Image
            src={project.frontmatter.image}
            alt={project.frontmatter.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <header className="mb-12">
        {project.frontmatter.tags && project.frontmatter.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {project.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {project.frontmatter.title}
        </h1>

        <p className="mt-4 text-xl text-foreground-secondary">
          {project.frontmatter.description}
        </p>

        <div className="mt-6 flex items-center gap-4">
          {project.frontmatter.github && (
            <a
              href={project.frontmatter.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-surface transition-colors"
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </a>
          )}
          {project.frontmatter.demo && (
            <a
              href={project.frontmatter.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          )}
        </div>
      </header>

      <CitedContent>
        <div className="prose prose-lg max-w-none">
          {content}
        </div>
      </CitedContent>
    </article>
  );
}
