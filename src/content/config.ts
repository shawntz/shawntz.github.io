import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const pubs = defineCollection({
	schema: z.object({
		authors: z.string(),
		pubDate: z.coerce.date(),
		title: z.string(),
		journal: z.string(),
		pages: z.string().optional(),
		doi: z.string().optional(),
		doiOn: z.string().optional(),
		pdf: z.string().optional(),
		pdfOn: z.string().optional(),
		pubmed: z.string().optional(),
		pubmedOn: z.string().optional(),
		osf: z.string().optional(),
		osfOn: z.string().optional(),
		github: z.string().optional(),
		githubOn: z.string().optional(),
		website: z.string().optional(),
		websiteOn: z.string().optional(),
		footnote: z.string().optional(),
	}),
});

export const collections = { blog, pubs };
