import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  translationKey: z.string(),
  draft: z.boolean().default(false),
});

export const collections = {
  blogEs: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/blogEs" }),
    schema: blogSchema,
  }),
  blogEn: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/blogEn" }),
    schema: blogSchema,
  }),
};
