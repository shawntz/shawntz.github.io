import { Metadata } from "next";
import { ProjectsContent } from "@/components/projects/ProjectsContent";

export const metadata: Metadata = {
  title: "Software",
  description:
    "Apps, developer tools, and research software I've designed and built.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-12">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground-tertiary">
          Projects
        </p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Software
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-foreground-secondary leading-relaxed">
          Apps, developer tools, and research software I&apos;ve designed and built — from consumer productivity apps to open-source scientific pipelines.
        </p>
      </header>

      <ProjectsContent />
    </div>
  );
}
