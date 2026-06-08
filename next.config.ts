import type { NextConfig } from "next";
import { getPapers } from "./src/lib/mdx";
import { getPaperPath } from "./src/lib/utils";

const nextConfig: NextConfig = {
  async redirects() {
    const papers = await getPapers();

    return papers.map((paper) => ({
      source: `/research/${paper.slug}`,
      destination: getPaperPath(paper),
      permanent: true,
    }));
  },
};

export default nextConfig;
