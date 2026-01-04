import { Metadata } from "next";
import { getProjects } from "@/lib/mdx";
import { ProjectList } from "@/components/projects/ProjectList";
import { AppWall } from "@/components/projects/AppWall";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Open source tools and applications I've built and contributed to.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-semibold tracking-tight md:text-[64px]">Projects</h1>
        <p className="mt-6 text-lg text-foreground-secondary max-w-3xl mx-auto leading-relaxed text-balance">
          Open source tools and applications I&apos;ve built and contributed to.
        </p>
      </header>

      <AppWall />

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-border-light bg-surface p-12 text-center">
          <p className="text-foreground-secondary">No projects yet. Check back soon!</p>
        </div>
      ) : (
        <ProjectList projects={projects} />
      )}
    </div>
  );
}
