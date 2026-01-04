import { Metadata } from "next";
import { getPapers } from "@/lib/mdx";
import { PaperList } from "@/components/research/PaperList";
import { ScholarMetrics } from "@/components/research/ScholarMetrics";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Academic publications and research papers I've authored or co-authored.",
};

export default async function ResearchPage() {
  const papers = await getPapers();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-semibold tracking-tight md:text-[64px]">Research</h1>
        <p className="mt-6 text-lg text-foreground-secondary max-w-3xl mx-auto leading-relaxed text-balance">
          Academic publications and research papers I&apos;ve authored or co-authored.
        </p>
      </header>

      <ScholarMetrics />

      {papers.length === 0 ? (
        <div className="rounded-2xl border border-border-light bg-surface p-12 text-center">
          <p className="text-foreground-secondary">No publications yet. Check back soon!</p>
        </div>
      ) : (
        <PaperList papers={papers} />
      )}
    </div>
  );
}
