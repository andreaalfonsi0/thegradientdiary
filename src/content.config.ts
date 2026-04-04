import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/pages/posts' }),
  schema: z.object({
    pubDate: z.coerce.date(),
    title: z.string(),
    tags: z.array(z.string()).optional(),
    image: z.object({
      src: z.string(),
      alt: z.string()
    }).optional(),
  }),
});

// Expose your defined collection to Astro
// with the `collections` export
export const collections = { blog };