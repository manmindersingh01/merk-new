import { Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { MarkdownContent } from "@/components/blog/markdown-content";
import { BlogCard } from "@/components/blog/blog-card";
import { Post } from "@/types/blog";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";

const categoryGradients: Record<string, string> = {
	"Industry Insights": "from-blue-600 to-blue-400",
	Methodology: "from-violet-600 to-purple-400",
	Technology: "from-emerald-600 to-teal-400",
	Strategy: "from-amber-600 to-yellow-400",
	Research: "from-rose-600 to-pink-400",
};

interface PostPageProps {
	params: Promise<{ slug: string }>;
}

async function RelatedPosts({
	postId,
	category,
}: {
	postId: string;
	category: string | null;
}) {
	if (!category) return null;

	const { data: related } = await supabase
		.from("posts")
		.select("*")
		.eq("published", true)
		.eq("category", category)
		.neq("id", postId)
		.limit(3);

	const relatedPosts: Post[] = related ?? [];
	if (!relatedPosts.length) return null;

	return (
		<section className="border-t border-border/40 bg-card/40 px-4 py-16 sm:px-6 md:px-10">
			<div className="mx-auto max-w-6xl">
				<h2 className="mb-8 text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
					Related Insights
				</h2>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{relatedPosts.map((p) => (
						<BlogCard key={p.id} post={p} />
					))}
				</div>
			</div>
		</section>
	);
}

function RelatedSkeleton() {
	return (
		<section className="border-t border-border/40 bg-card/40 px-4 py-16 sm:px-6 md:px-10">
			<div className="mx-auto max-w-6xl">
				<div className="mb-8 h-7 w-44 animate-pulse rounded-md bg-muted/50" />
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 3 }).map((_, i) => (
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
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

async function PostContent({ slug }: { slug: string }) {
	const { data: post, error } = await supabase
		.from("posts")
		.select("*")
		.eq("slug", slug)
		.eq("published", true)
		.single();

	if (error || !post) notFound();

	const typedPost = post as Post;
	const gradient =
		categoryGradients[typedPost.category ?? ""] ?? "from-primary to-primary/60";

	const date = typedPost.published_at
		? new Date(typedPost.published_at).toLocaleDateString("en-GB", {
				day: "numeric",
				month: "long",
				year: "numeric",
			})
		: null;

	return (
		<>
			{/* Cover header */}
			<div
				className={cn(
					"relative flex min-h-72 items-end bg-gradient-to-br pt-28 sm:min-h-96",
					gradient
				)}
			>
				{typedPost.cover_image_url && (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={typedPost.cover_image_url}
						alt={typedPost.title}
						className="absolute inset-0 h-full w-full object-cover"
					/>
				)}
				<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
				<div className="relative mx-auto w-full max-w-3xl px-4 pb-10 sm:px-6 md:px-10">
					<Link
						href="/blog"
						className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
					>
						<ArrowLeft className="size-4" />
						Back to Insights
					</Link>
					{typedPost.category && (
						<span className="mb-3 block w-fit rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
							{typedPost.category}
						</span>
					)}
					<h1 className="text-3xl font-extrabold leading-snug tracking-tight text-white sm:text-4xl md:text-5xl">
						{typedPost.title}
					</h1>
				</div>
			</div>

			{/* Meta bar */}
			<div className="border-b border-border/40 bg-card px-4 py-4 sm:px-6 md:px-10">
				<div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4">
					<div className="flex items-center gap-3">
						<div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
							{typedPost.author[0]}
						</div>
						<div>
							<p className="text-sm font-semibold text-foreground">
								{typedPost.author}
							</p>
							<p className="text-xs text-muted-foreground">
								{typedPost.author_role}
							</p>
						</div>
					</div>
					<div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
						{date && (
							<span className="flex items-center gap-1.5">
								<Calendar className="size-3.5" />
								{date}
							</span>
						)}
						<span className="flex items-center gap-1.5">
							<Clock className="size-3.5" />
							{typedPost.read_time} min read
						</span>
					</div>
				</div>
			</div>

			{/* Article body */}
			<article className="px-4 py-12 sm:px-6 sm:py-16 md:px-10">
				<div className="mx-auto max-w-3xl">
					{typedPost.excerpt && (
						<p className="mb-8 text-lg font-medium leading-relaxed text-muted-foreground sm:text-xl">
							{typedPost.excerpt}
						</p>
					)}
					{typedPost.content && <MarkdownContent content={typedPost.content} />}
					{typedPost.tags && typedPost.tags.length > 0 && (
						<div className="mt-12 flex flex-wrap items-center gap-2 border-t border-border/40 pt-8">
							<Tag className="size-4 text-muted-foreground" />
							{typedPost.tags.map((tag) => (
								<span
									key={tag}
									className="rounded-full bg-primary/8 px-3 py-1 text-xs font-medium text-primary"
								>
									{tag}
								</span>
							))}
						</div>
					)}
				</div>
			</article>

			{/* Related posts — streams in after main content */}
			<Suspense fallback={<RelatedSkeleton />}>
				<RelatedPosts postId={typedPost.id} category={typedPost.category} />
			</Suspense>
		</>
	);
}

function PostSkeleton() {
	return (
		<>
			{/* Hero skeleton */}
			<div className="relative flex min-h-72 items-end pt-28 sm:min-h-96">
				<div className="absolute inset-0 animate-pulse bg-muted/40" />
				<div className="relative mx-auto w-full max-w-3xl px-4 pb-10 sm:px-6 md:px-10">
					<div className="mb-6 h-4 w-32 animate-pulse rounded-md bg-muted/60" />
					<div className="mb-3 h-4 w-24 animate-pulse rounded-full bg-muted/60" />
					<div className="h-9 w-3/4 animate-pulse rounded-md bg-muted/60" />
					<div className="mt-2 h-9 w-1/2 animate-pulse rounded-md bg-muted/60" />
				</div>
			</div>

			{/* Meta bar skeleton */}
			<div className="border-b border-border/40 bg-card px-4 py-4 sm:px-6 md:px-10">
				<div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4">
					<div className="flex items-center gap-3">
						<div className="size-9 animate-pulse rounded-full bg-muted/50" />
						<div className="flex flex-col gap-1.5">
							<div className="h-3.5 w-28 animate-pulse rounded-md bg-muted/50" />
							<div className="h-3 w-20 animate-pulse rounded-md bg-muted/50" />
						</div>
					</div>
					<div className="flex gap-4">
						<div className="h-3 w-24 animate-pulse rounded-md bg-muted/50" />
						<div className="h-3 w-16 animate-pulse rounded-md bg-muted/50" />
					</div>
				</div>
			</div>

			{/* Article skeleton */}
			<article className="px-4 py-12 sm:px-6 sm:py-16 md:px-10">
				<div className="mx-auto max-w-3xl space-y-3">
					<div className="h-5 w-full animate-pulse rounded-md bg-muted/50" />
					<div className="h-5 w-5/6 animate-pulse rounded-md bg-muted/50" />
					<div className="h-5 w-4/5 animate-pulse rounded-md bg-muted/50" />
					<div className="mt-6 h-5 w-full animate-pulse rounded-md bg-muted/50" />
					<div className="h-5 w-3/4 animate-pulse rounded-md bg-muted/50" />
					<div className="h-5 w-full animate-pulse rounded-md bg-muted/50" />
					<div className="h-5 w-2/3 animate-pulse rounded-md bg-muted/50" />
					<div className="mt-6 h-5 w-full animate-pulse rounded-md bg-muted/50" />
					<div className="h-5 w-4/5 animate-pulse rounded-md bg-muted/50" />
				</div>
			</article>
		</>
	);
}

export default async function PostPage({ params }: PostPageProps) {
	const { slug } = await params;

	return (
		<div className="min-h-screen bg-background">
			<Suspense fallback={<PostSkeleton />}>
				<PostContent slug={slug} />
			</Suspense>
		</div>
	);
}
