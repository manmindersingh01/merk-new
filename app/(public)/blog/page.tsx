import type { Metadata } from "next";
import { Suspense } from "react";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
	title: "MerkMetryx Blog – Market Research Insights & Trends",
	description:
		"Read the latest articles on market research, consumer insights, AI in research, and data-driven decision making from the MerkMetryx team.",
	alternates: {
		canonical: "/blog",
	},
	openGraph: {
		url: "https://merkmetryx.com/blog",
	},
};
import { BlogCard } from "@/components/blog/blog-card";
import { Post } from "@/types/blog";
import { ArrowRight, Rss } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
	"All",
	"Industry Insights",
	"Methodology",
	"Technology",
	"Strategy",
	"Research",
];

interface BlogPageProps {
	searchParams: Promise<{ category?: string }>;
}

async function PostsList({ category }: { category: string }) {
	let query = supabase
		.from("posts")
		.select("*")
		.eq("published", true)
		.order("published_at", { ascending: false });

	if (category !== "All") {
		query = query.eq("category", category);
	}

	const { data: posts, error } = await query;

	if (error) {
		console.error("Error fetching posts:", error);
	}

	const allPosts: Post[] = posts ?? [];
	const featuredPost = allPosts[0] ?? null;
	const restPosts = allPosts.slice(1);

	if (allPosts.length === 0) {
		return (
			<div className="rounded-2xl border border-border/40 bg-card px-8 py-20 text-center">
				<p className="text-muted-foreground">
					No posts in this category yet. Check back soon.
				</p>
			</div>
		);
	}

	return (
		<>
			{featuredPost && (
				<div className="mb-10">
					<BlogCard post={featuredPost} featured />
				</div>
			)}
			{restPosts.length > 0 && (
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{restPosts.map((post) => (
						<BlogCard key={post.id} post={post} />
					))}
				</div>
			)}
		</>
	);
}

function PostsSkeleton() {
	return (
		<>
			{/* Featured post skeleton */}
			<div className="mb-10 overflow-hidden rounded-2xl border border-border/40 bg-card">
				<div className="grid md:grid-cols-2">
					<div className="h-64 animate-pulse rounded-none bg-muted/50 md:h-full" />
					<div className="flex flex-col justify-center gap-4 p-8">
						<div className="h-4 w-24 animate-pulse rounded-md bg-muted/50" />
						<div className="h-8 w-4/5 animate-pulse rounded-md bg-muted/50" />
						<div className="h-4 w-full animate-pulse rounded-md bg-muted/50" />
						<div className="h-4 w-3/4 animate-pulse rounded-md bg-muted/50" />
						<div className="mt-2 h-4 w-32 animate-pulse rounded-md bg-muted/50" />
					</div>
				</div>
			</div>

			{/* Grid skeleton */}
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{Array.from({ length: 6 }).map((_, i) => (
					<div
						key={i}
						className="overflow-hidden rounded-2xl border border-border/40 bg-card"
					>
						<div className="h-44 animate-pulse rounded-none bg-muted/50" />
						<div className="flex flex-col gap-3 p-5">
							<div className="h-3 w-20 animate-pulse rounded-md bg-muted/50" />
							<div className="h-5 w-4/5 animate-pulse rounded-md bg-muted/50" />
							<div className="h-3 w-full animate-pulse rounded-md bg-muted/50" />
							<div className="h-3 w-2/3 animate-pulse rounded-md bg-muted/50" />
							<div className="mt-1 h-3 w-24 animate-pulse rounded-md bg-muted/50" />
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
	const { category } = await searchParams;
	const activeCategory = category ?? "All";

	return (
		<div className="min-h-screen bg-background">
			{/* Hero — renders immediately, no data dependency */}
			<section className="px-4 pt-28 pb-16 sm:px-6 md:px-10 md:pt-36 lg:px-16">
				<div className="mx-auto max-w-6xl">
					<div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
						<div>
							<div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs text-muted-foreground">
								<Rss className="size-3 text-primary" />
								Research &amp; Insights
							</div>
							<h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
								MerkMetryx <span className="text-primary">Insights</span>
							</h1>
							<p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
								Perspectives on market research, AI-powered intelligence, and
								the strategies shaping modern business decisions.
							</p>
						</div>
						<Link href="/contact">
							<Button
								variant="outline"
								size="sm"
								className="shrink-0 rounded-full px-5"
							>
								Subscribe to updates
								<ArrowRight className="ml-1 size-3.5" />
							</Button>
						</Link>
					</div>

					{/* Category filter */}
					<div className="mt-10 flex flex-wrap gap-2">
						{CATEGORIES.map((cat) => (
							<Link
								key={cat}
								href={
									cat === "All"
										? "/blog"
										: `/blog?category=${encodeURIComponent(cat)}`
								}
								className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
									activeCategory === cat
										? "border-primary bg-primary text-primary-foreground"
										: "border-border/40 bg-card text-muted-foreground hover:text-foreground"
								}`}
							>
								{cat}
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Posts — streams in independently */}
			<section className="px-4 pb-24 sm:px-6 md:px-10 lg:px-16">
				<div className="mx-auto max-w-6xl">
					<Suspense fallback={<PostsSkeleton />}>
						<PostsList category={activeCategory} />
					</Suspense>
				</div>
			</section>
		</div>
	);
}
