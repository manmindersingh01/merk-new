"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Post } from "@/types/blog";
import { deletePost, togglePublish } from "@/app/admin/actions";
import {
	Edit2,
	Trash2,
	Eye,
	EyeOff,
	ExternalLink,
	Share2,
	X,
} from "lucide-react";

interface PostsTableProps {
	posts: Post[];
}

/* ─── Share helpers ──────────────────────────────────────────── */

function getPostUrl(slug: string) {
	if (typeof window !== "undefined") {
		return `${window.location.origin}/blog/${slug}`;
	}
	return `/blog/${slug}`;
}

interface ShareTarget {
	name: string;
	color: string;
	icon: React.ReactNode;
	url: (postUrl: string, title: string) => string;
}

const SHARE_TARGETS: ShareTarget[] = [
	{
		name: "LinkedIn",
		color: "#0A66C2",
		icon: (
			<svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
				<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
			</svg>
		),
		url: (postUrl) =>
			`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`,
	},
	{
		name: "X (Twitter)",
		color: "#000000",
		icon: (
			<svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
				<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
			</svg>
		),
		url: (postUrl, title) =>
			`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(title)}`,
	},
	{
		name: "Facebook",
		color: "#1877F2",
		icon: (
			<svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
				<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
			</svg>
		),
		url: (postUrl) =>
			`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
	},
	{
		name: "WhatsApp",
		color: "#25D366",
		icon: (
			<svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
				<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
			</svg>
		),
		url: (postUrl, title) =>
			`https://wa.me/?text=${encodeURIComponent(`${title} ${postUrl}`)}`,
	},
];

/* ─── Share popover ─────────────────────────────────────────── */

function SharePopover({ post, onClose }: { post: Post; onClose: () => void }) {
	const postUrl = getPostUrl(post.slug);
	const [copied, setCopied] = useState(false);

	function handleCopy() {
		navigator.clipboard.writeText(postUrl);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}

	return (
		<div className="absolute right-0 top-full z-50 mt-1 w-56 rounded-xl border border-border/60 bg-card p-3 shadow-lg">
			<div className="mb-2 flex items-center justify-between">
				<p className="text-xs font-semibold text-foreground">Share this post</p>
				<button
					onClick={onClose}
					className="rounded-md p-0.5 text-muted-foreground hover:text-foreground"
				>
					<X className="size-3.5" />
				</button>
			</div>
			<div className="flex flex-col gap-1">
				{SHARE_TARGETS.map((target) => (
					<a
						key={target.name}
						href={target.url(postUrl, post.title)}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
					>
						<span style={{ color: target.color }}>{target.icon}</span>
						{target.name}
					</a>
				))}
			</div>
			<button
				onClick={handleCopy}
				className="mt-1.5 w-full rounded-lg border border-border/40 px-2.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
			>
				{copied ? "Copied!" : "Copy link"}
			</button>
		</div>
	);
}

/* ─── Date formatter ────────────────────────────────────────── */

function fmtDate(dateStr: string | null) {
	if (!dateStr) return "—";
	return new Date(dateStr).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
}

function fmtDateTime(dateStr: string | null) {
	if (!dateStr) return "—";
	const d = new Date(dateStr);
	return (
		d.toLocaleDateString("en-GB", {
			day: "numeric",
			month: "short",
			year: "numeric",
		}) +
		", " +
		d.toLocaleTimeString("en-GB", {
			hour: "2-digit",
			minute: "2-digit",
		})
	);
}

/* ─── Main component ────────────────────────────────────────── */

export function PostsTable({ posts: initialPosts }: PostsTableProps) {
	const [posts, setPosts] = useState(initialPosts);
	const [isPending, startTransition] = useTransition();
	const [deletingId, setDeletingId] = useState<string | null>(null);
	const [sharePostId, setSharePostId] = useState<string | null>(null);

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
			<div className="overflow-x-auto">
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
								Published
							</th>
							<th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:table-cell">
								Edited
							</th>
							<th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-border/40">
						{posts.map((post) => (
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

								{/* Published date */}
								<td className="hidden px-5 py-4 md:table-cell">
									<div className="text-xs text-muted-foreground">
										{post.published_at ? (
											<span title={fmtDateTime(post.published_at)}>
												{fmtDate(post.published_at)}
											</span>
										) : (
											<span className="text-muted-foreground/50">—</span>
										)}
									</div>
								</td>

								{/* Edited date */}
								<td className="hidden px-5 py-4 lg:table-cell">
									<div className="text-xs text-muted-foreground">
										<span title={fmtDateTime(post.updated_at)}>
											{fmtDate(post.updated_at)}
										</span>
									</div>
								</td>

								{/* Actions */}
								<td className="px-5 py-4">
									<div className="relative flex items-center justify-end gap-1.5">
										{/* Share */}
										<button
											onClick={() =>
												setSharePostId(sharePostId === post.id ? null : post.id)
											}
											title="Share"
											className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
										>
											<Share2 className="size-4" />
										</button>

										{sharePostId === post.id && (
											<SharePopover
												post={post}
												onClose={() => setSharePostId(null)}
											/>
										)}

										{/* Toggle publish */}
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

										{/* Edit */}
										<Link
											href={`/admin/posts/${post.id}/edit`}
											className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
										>
											<Edit2 className="size-4" />
										</Link>

										{/* Delete */}
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
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
