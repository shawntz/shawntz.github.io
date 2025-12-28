import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import compress from '@playform/compress';

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
    compress({
      CSS: true,
      HTML: true,
      JavaScript: true,
      Image: true,
      SVG: false,
    })
  ],
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
});
