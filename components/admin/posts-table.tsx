"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Post } from "@/types/blog";
import { deletePost, togglePublish } from "@/app/admin/actions";
import { Edit2, Trash2, Eye, EyeOff, ExternalLink } from "lucide-react";

interface PostsTableProps {
	posts: Post[];
}

export function PostsTable({ posts: initialPosts }: PostsTableProps) {
	const [posts, setPosts] = useState(initialPosts);
	const [isPending, startTransition] = useTransition();
	const [deletingId, setDeletingId] = useState<string | null>(null);

	function handleToggle(post: Post) {
		startTransition(async () => {
			await togglePublish(post.id, post.published);
			setPosts((prev) =>
				prev.map((p) =>
					p.id === post.id ? { ...p, published: !p.published } : p
				)
			);
		});
	}

	function handleDelete(id: string) {
		if (!confirm("Delete this post? This cannot be undone.")) return;
		setDeletingId(id);
		startTransition(async () => {
			await deletePost(id);
			setPosts((prev) => prev.filter((p) => p.id !== id));
			setDeletingId(null);
		});
	}

	if (posts.length === 0) {
		return (
			<div className="rounded-2xl border border-border/40 bg-card px-8 py-16 text-center">
				<p className="text-muted-foreground">No posts yet.</p>
				<Link
					href="/admin/posts/new"
					className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
				>
					Create your first post →
				</Link>
			</div>
		);
	}

	return (
		<div className="overflow-hidden rounded-2xl border border-border/40 bg-card">
			<table className="w-full text-sm">
				<thead>
					<tr className="border-b border-border/40 bg-muted/30">
						<th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
							Title
						</th>
						<th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:table-cell">
							Category
						</th>
						<th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
							Status
						</th>
						<th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">
							Date
						</th>
						<th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-border/40">
					{posts.map((post) => {
						const date = post.published_at
							? new Date(post.published_at).toLocaleDateString("en-GB", {
									day: "numeric",
									month: "short",
									year: "numeric",
								})
							: new Date(post.created_at).toLocaleDateString("en-GB", {
									day: "numeric",
									month: "short",
									year: "numeric",
								});

						return (
							<tr
								key={post.id}
								className={`transition-colors hover:bg-muted/20 ${deletingId === post.id ? "opacity-50" : ""}`}
							>
								{/* Title */}
								<td className="px-5 py-4">
									<div className="flex items-center gap-2">
										<p className="font-semibold text-foreground line-clamp-1">
											{post.title}
										</p>
										{post.published && (
											<Link
												href={`/blog/${post.slug}`}
												target="_blank"
												className="text-muted-foreground hover:text-primary"
											>
												<ExternalLink className="size-3.5" />
											</Link>
										)}
									</div>
									<p className="mt-0.5 text-xs text-muted-foreground">
										{post.author} · {post.read_time} min read
									</p>
								</td>

								{/* Category */}
								<td className="hidden px-5 py-4 sm:table-cell">
									<span className="rounded-full bg-primary/8 px-2.5 py-1 text-xs font-medium text-primary">
										{post.category ?? "—"}
									</span>
								</td>

								{/* Status */}
								<td className="px-5 py-4">
									<span
										className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
											post.published
												? "bg-emerald-500/10 text-emerald-600"
												: "bg-amber-500/10 text-amber-600"
										}`}
									>
										<span
											className={`size-1.5 rounded-full ${post.published ? "bg-emerald-500" : "bg-amber-500"}`}
										/>
										{post.published ? "Published" : "Draft"}
									</span>
								</td>

								{/* Date */}
								<td className="hidden px-5 py-4 text-xs text-muted-foreground md:table-cell">
									{date}
								</td>

								{/* Actions */}
								<td className="px-5 py-4">
									<div className="flex items-center justify-end gap-2">
										<button
											onClick={() => handleToggle(post)}
											disabled={isPending}
											title={post.published ? "Unpublish" : "Publish"}
											className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
										>
											{post.published ? (
												<EyeOff className="size-4" />
											) : (
												<Eye className="size-4" />
											)}
										</button>
										<Link
											href={`/admin/posts/${post.id}/edit`}
											className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
										>
											<Edit2 className="size-4" />
										</Link>
										<button
											onClick={() => handleDelete(post.id)}
											disabled={isPending}
											className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
										>
											<Trash2 className="size-4" />
										</button>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
