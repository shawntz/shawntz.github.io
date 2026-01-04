import { getBlogPosts, getProjects, getPapers } from "@/lib/mdx";
import { HomeContent } from "@/components/home/HomeContent";

export default async function HomePage() {
  const [posts, projects, papers] = await Promise.all([
    getBlogPosts(),
    getProjects(),
    getPapers(),
  ]);

  // Get the 3 most recent of each
  const recentPosts = posts.slice(0, 3);
  const recentProjects = projects.slice(0, 3);
  const recentPapers = papers.slice(0, 3);

  return (
    <HomeContent
      recentPosts={recentPosts}
      recentProjects={recentProjects}
      recentPapers={recentPapers}
    />
  );
}
