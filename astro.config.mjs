import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

export default defineConfig({
  site: "https://shawnschwartz.com",
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    icon({
      include: {
        mdi: ["*"],
        "simple-icons": ["*"],
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
});
