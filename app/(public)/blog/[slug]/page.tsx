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

export default async function PostPage({ params }: PostPageProps) {
	const { slug } = await params;

	const { data: post, error } = await supabase
		.from("posts")
		.select("*")
		.eq("slug", slug)
		.eq("published", true)
		.single();

	if (error || !post) notFound();

	// Related posts (same category, excluding current)
	const { data: related } = await supabase
		.from("posts")
		.select("*")
		.eq("published", true)
		.eq("category", post.category ?? "")
		.neq("id", post.id)
		.limit(3);

	const typedPost = post as Post;
	const relatedPosts: Post[] = related ?? [];

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
		<div className="min-h-screen bg-background">
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
						<span className="mb-3 block rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white w-fit backdrop-blur-sm">
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
							<p className="text-xs text-muted-foreground">{typedPost.author_role}</p>
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
					{typedPost.content && (
						<MarkdownContent content={typedPost.content} />
					)}

					{/* Tags */}
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

			{/* Related posts */}
			{relatedPosts.length > 0 && (
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
			)}
		</div>
	);
}
