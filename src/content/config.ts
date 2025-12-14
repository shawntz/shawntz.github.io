import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    author: z.string().default("Shawn Schwartz"),
    readTime: z.string().optional(),
    featured: z.boolean().default(false),
    keyTakeaways: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
