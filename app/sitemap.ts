import type { MetadataRoute } from "next";

import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = "https://merkmetryx.com";

	// Fetch blog posts
	const { data: posts } = await supabase
		.from("posts")
		.select("slug, updated_at, published_at")
		.eq("published", true);

	// Fetch case studies
	const { data: caseStudies } = await supabase
		.from("case_studies")
		.select("slug, updated_at, published_at")
		.eq("published", true);

	const staticPages = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 1,
		},
		{
			url: `${baseUrl}/about`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/product`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.9,
		},
		{
			url: `${baseUrl}/solutions`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.9,
		},
		{
			url: `${baseUrl}/pricing`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/contact`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.7,
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.7,
		},
		{
			url: `${baseUrl}/case-studies`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.7,
		},
		{
			url: `${baseUrl}/careers`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.5,
		},
	];

	// Add blog post URLs
	const blogUrls =
		posts?.map((post) => ({
			url: `${baseUrl}/blog/${post.slug}`,
			lastModified: new Date(
				post.updated_at || post.published_at || new Date()
			),
			changeFrequency: "monthly" as const,
			priority: 0.6,
		})) || [];

	// Add case study URLs
	const caseStudyUrls =
		caseStudies?.map((cs) => ({
			url: `${baseUrl}/case-studies/${cs.slug}`,
			lastModified: new Date(cs.updated_at || cs.published_at || new Date()),
			changeFrequency: "monthly" as const,
			priority: 0.6,
		})) || [];

	return [...staticPages, ...blogUrls, ...caseStudyUrls];
}
