import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { Post } from "@/types/blog";
import { cn } from "@/lib/utils";

const categoryColors: Record<string, string> = {
	"Industry Insights": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
	Methodology: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
	Technology: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
	Strategy: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
	Research: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

const categoryGradients: Record<string, string> = {
	"Industry Insights": "from-blue-600 to-blue-400",
	Methodology: "from-violet-600 to-purple-400",
	Technology: "from-emerald-600 to-teal-400",
	Strategy: "from-amber-600 to-yellow-400",
	Research: "from-rose-600 to-pink-400",
};

interface BlogCardProps {
	post: Post;
	featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
	const catColor =
		categoryColors[post.category ?? ""] ?? "bg-primary/10 text-primary";
	const gradient =
		categoryGradients[post.category ?? ""] ?? "from-primary to-primary/60";

	const date = post.published_at
		? new Date(post.published_at).toLocaleDateString("en-GB", {
				day: "numeric",
				month: "long",
				year: "numeric",
			})
		: null;

	if (featured) {
		return (
			<Link href={`/blog/${post.slug}`} className="group block">
				<div className="grid overflow-hidden rounded-2xl border border-border/40 bg-card sm:rounded-3xl lg:grid-cols-2">
					{/* Cover */}
					<div
						className={cn(
							"relative flex min-h-56 items-end bg-gradient-to-br p-8 lg:min-h-80",
							gradient
						)}
					>
						{post.cover_image_url && (
							// eslint-disable-next-line @next/next/no-img-element
							<img
								src={post.cover_image_url}
								alt={post.title}
								className="absolute inset-0 h-full w-full object-cover"
							/>
						)}
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
						<span
							className={cn(
								"relative rounded-full px-3 py-1 text-[11px] font-semibold",
								"bg-white/15 text-white backdrop-blur-sm"
							)}
						>
							{post.category ?? "Insights"}
						</span>
					</div>

					{/* Content */}
					<div className="flex flex-col justify-between p-8">
						<div>
							<span
								className={cn(
									"mb-3 inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold",
									catColor
								)}
							>
								Featured
							</span>
							<h2 className="text-xl font-extrabold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">
								{post.title}
							</h2>
							<p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
								{post.excerpt}
							</p>
						</div>

						<div className="mt-6 flex items-center justify-between border-t border-border/40 pt-5">
							<div className="flex items-center gap-3">
								<div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
									{post.author[0]}
								</div>
								<div>
									<p className="text-xs font-semibold text-foreground">
										{post.author}
									</p>
									<p className="text-[10px] text-muted-foreground">
										{post.author_role}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3 text-xs text-muted-foreground">
								{date && (
									<span className="flex items-center gap-1">
										<Calendar className="size-3" />
										{date}
									</span>
								)}
								<span className="flex items-center gap-1">
									<Clock className="size-3" />
									{post.read_time} min
								</span>
							</div>
						</div>
					</div>
				</div>
			</Link>
		);
	}

	return (
		<Link href={`/blog/${post.slug}`} className="group flex flex-col">
			<div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-border/40 bg-card transition-shadow hover:shadow-md sm:rounded-3xl">
				{/* Cover */}
				<div
					className={cn(
						"relative flex h-44 items-end bg-gradient-to-br p-5",
						gradient
					)}
				>
					{post.cover_image_url && (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={post.cover_image_url}
							alt={post.title}
							className="absolute inset-0 h-full w-full object-cover"
						/>
					)}
					<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
					<span className="relative rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
						{post.category ?? "Insights"}
					</span>
				</div>

				{/* Content */}
				<div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
					<div>
						<h3 className="text-base font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-lg">
							{post.title}
						</h3>
						<p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
							{post.excerpt}
						</p>
					</div>

					<div className="mt-5 flex items-center justify-between border-t border-border/40 pt-4">
						<div className="flex items-center gap-2">
							<div className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
								{post.author[0]}
							</div>
							<span className="text-xs font-medium text-foreground">
								{post.author}
							</span>
						</div>
						<div className="flex items-center gap-2.5 text-[10px] text-muted-foreground">
							{date && (
								<span className="flex items-center gap-1">
									<Calendar className="size-3" />
									{date}
								</span>
							)}
							<span className="flex items-center gap-1">
								<Clock className="size-3" />
								{post.read_time}m
							</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
