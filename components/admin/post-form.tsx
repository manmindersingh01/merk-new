"use client";

import { useState, useTransition, useRef } from "react";
import { createPost, updatePost } from "@/app/admin/actions";
import { Post } from "@/types/blog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, EyeOff, Loader2, Upload, X } from "lucide-react";
import Link from "next/link";
import { MarkdownContent } from "@/components/blog/markdown-content";
import { supabase } from "@/lib/supabase";

const CATEGORIES = [
	"Industry Insights",
	"Methodology",
	"Technology",
	"Strategy",
	"Research",
];

const BUCKET = "blog-images";

interface PostFormProps {
	post?: Post;
}

export function PostForm({ post }: PostFormProps) {
	const isEdit = Boolean(post);
	const [isPending, startTransition] = useTransition();
	const [preview, setPreview] = useState(false);
	const [content, setContent] = useState(post?.content ?? "");
	const [published, setPublished] = useState(post?.published ?? false);
	const [error, setError] = useState<string | null>(null);

	// Cover image state — tracks the final URL (uploaded or manual)
	const [coverImageUrl, setCoverImageUrl] = useState(
		post?.cover_image_url ?? ""
	);
	const [urlInput, setUrlInput] = useState(post?.cover_image_url ?? "");
	const [uploadingImage, setUploadingImage] = useState(false);
	const [uploadError, setUploadError] = useState<string | null>(null);
	const [dragging, setDragging] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	async function handleImageUpload(file: File) {
		if (!file.type.startsWith("image/")) {
			setUploadError("Please select a valid image file (PNG, JPG, WebP, GIF).");
			return;
		}
		if (file.size > 5 * 1024 * 1024) {
			setUploadError("Image must be smaller than 5 MB.");
			return;
		}

		setUploadingImage(true);
		setUploadError(null);

		const ext = file.name.split(".").pop() ?? "jpg";
		const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

		const { error: storageError } = await supabase.storage
			.from(BUCKET)
			.upload(fileName, file, { upsert: false });

		if (storageError) {
			setUploadError(storageError.message);
			setUploadingImage(false);
			return;
		}

		const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
		setCoverImageUrl(data.publicUrl);
		setUrlInput(data.publicUrl);
		setUploadingImage(false);
	}

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (file) handleImageUpload(file);
	}

	function handleDrop(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault();
		setDragging(false);
		const file = e.dataTransfer.files?.[0];
		if (file) handleImageUpload(file);
	}

	function handleUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
		setUrlInput(e.target.value);
		setCoverImageUrl(e.target.value);
	}

	function handleRemoveImage() {
		setCoverImageUrl("");
		setUrlInput("");
		if (fileInputRef.current) fileInputRef.current.value = "";
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);
		const formData = new FormData(e.currentTarget);
		formData.set("content", content);
		formData.set("published", published ? "true" : "false");
		formData.set("cover_image_url", coverImageUrl);

		startTransition(async () => {
			try {
				if (isEdit && post) {
					await updatePost(post.id, formData);
				} else {
					await createPost(formData);
				}
			} catch (err) {
				setError(err instanceof Error ? err.message : "Something went wrong.");
			}
		});
	}

	return (
		<div>
			{/* Header */}
			<div className="mb-8 flex items-center gap-4">
				<Link
					href="/admin"
					className="text-muted-foreground hover:text-foreground"
				>
					<ArrowLeft className="size-5" />
				</Link>
				<div>
					<h1 className="text-2xl font-extrabold tracking-tight text-foreground">
						{isEdit ? "Edit Post" : "New Post"}
					</h1>
					<p className="mt-0.5 text-sm text-muted-foreground">
						{isEdit ? `Editing "${post?.title}"` : "Create a new blog post"}
					</p>
				</div>
			</div>

			{error && (
				<div className="mb-6 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
					{error}
				</div>
			)}

			<form onSubmit={handleSubmit}>
				<div className="grid gap-6 lg:grid-cols-3">
					{/* Main fields */}
					<div className="flex flex-col gap-6 lg:col-span-2">
						{/* Title */}
						<div className="rounded-2xl border border-border/40 bg-card p-5">
							<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								Title *
							</label>
							<input
								name="title"
								required
								defaultValue={post?.title ?? ""}
								placeholder="Your post title..."
								className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-base font-semibold text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
							/>
						</div>

						{/* Excerpt */}
						<div className="rounded-2xl border border-border/40 bg-card p-5">
							<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								Excerpt
							</label>
							<textarea
								name="excerpt"
								rows={2}
								defaultValue={post?.excerpt ?? ""}
								placeholder="A short summary shown on the blog listing..."
								className="w-full resize-none rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
							/>
						</div>

						{/* Content */}
						<div className="rounded-2xl border border-border/40 bg-card p-5">
							<div className="mb-3 flex items-center justify-between">
								<label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
									Content (Markdown)
								</label>
								<button
									type="button"
									onClick={() => setPreview(!preview)}
									className="inline-flex items-center gap-1.5 rounded-lg border border-border/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
								>
									{preview ? (
										<>
											<EyeOff className="size-3.5" /> Edit
										</>
									) : (
										<>
											<Eye className="size-3.5" /> Preview
										</>
									)}
								</button>
							</div>

							{preview ? (
								<div className="min-h-64 rounded-xl border border-border/40 bg-background p-5">
									{content ? (
										<MarkdownContent content={content} />
									) : (
										<p className="text-sm text-muted-foreground">
											Nothing to preview yet.
										</p>
									)}
								</div>
							) : (
								<textarea
									value={content}
									onChange={(e) => setContent(e.target.value)}
									rows={20}
									placeholder={`# Your heading\n\nWrite your post in Markdown...\n\n## Section heading\n\nParagraph text here.`}
									className="w-full resize-y rounded-xl border border-border/40 bg-background px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
								/>
							)}
							<p className="mt-2 text-[11px] text-muted-foreground">
								Supports Markdown — **bold**, *italic*, ## headings, - lists,
								&gt; blockquotes, `code`
							</p>
						</div>
					</div>

					{/* Sidebar fields */}
					<div className="flex flex-col gap-5">
						{/* Publish controls */}
						<div className="rounded-2xl border border-border/40 bg-card p-5">
							<label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								Status
							</label>
							<button
								type="button"
								onClick={() => setPublished(!published)}
								className={`mb-4 flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
									published
										? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600"
										: "border-amber-500/30 bg-amber-500/10 text-amber-600"
								}`}
							>
								<span className="flex items-center gap-2">
									<span
										className={`size-2 rounded-full ${published ? "bg-emerald-500" : "bg-amber-500"}`}
									/>
									{published ? "Published" : "Draft"}
								</span>
								{published ? (
									<EyeOff className="size-4" />
								) : (
									<Eye className="size-4" />
								)}
							</button>
							<Button
								type="submit"
								size="lg"
								disabled={isPending || uploadingImage}
								className="w-full rounded-xl font-medium"
							>
								{isPending ? (
									<>
										<Loader2 className="mr-2 size-4 animate-spin" />
										Saving…
									</>
								) : isEdit ? (
									"Save Changes"
								) : (
									"Create Post"
								)}
							</Button>
						</div>

						{/* Author */}
						<div className="rounded-2xl border border-border/40 bg-card p-5">
							<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								Author
							</label>
							<input
								name="author"
								defaultValue={post?.author ?? "MerkMetryx Team"}
								className="mb-3 w-full rounded-xl border border-border/40 bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
							/>
							<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								Author Role
							</label>
							<input
								name="author_role"
								defaultValue={post?.author_role ?? ""}
								placeholder="e.g. Senior Research Analyst"
								className="w-full rounded-xl border border-border/40 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
							/>
						</div>

						{/* Category */}
						<div className="rounded-2xl border border-border/40 bg-card p-5">
							<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								Category
							</label>
							<select
								name="category"
								defaultValue={post?.category ?? ""}
								className="w-full rounded-xl border border-border/40 bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
							>
								<option value="">Select category…</option>
								{CATEGORIES.map((c) => (
									<option key={c} value={c}>
										{c}
									</option>
								))}
							</select>
						</div>

						{/* Tags */}
						<div className="rounded-2xl border border-border/40 bg-card p-5">
							<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								Tags
							</label>
							<input
								name="tags"
								defaultValue={post?.tags?.join(", ") ?? ""}
								placeholder="AI, market research, pricing"
								className="w-full rounded-xl border border-border/40 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
							/>
							<p className="mt-1.5 text-[11px] text-muted-foreground">
								Comma-separated
							</p>
						</div>

						{/* Cover image upload */}
						<div className="rounded-2xl border border-border/40 bg-card p-5">
							<label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								Cover Image
							</label>

							{uploadError && (
								<p className="mb-3 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
									{uploadError}
								</p>
							)}

							{/* Preview */}
							{coverImageUrl ? (
								<div className="relative mb-3 overflow-hidden rounded-xl border border-border/40">
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={coverImageUrl}
										alt="Cover preview"
										className="h-36 w-full object-cover"
									/>
									<button
										type="button"
										onClick={handleRemoveImage}
										title="Remove image"
										className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white transition-colors hover:bg-black/80"
									>
										<X className="size-3.5" />
									</button>
								</div>
							) : (
								/* Drop zone */
								<div
									onDragOver={(e) => {
										e.preventDefault();
										setDragging(true);
									}}
									onDragLeave={() => setDragging(false)}
									onDrop={handleDrop}
									onClick={() => fileInputRef.current?.click()}
									className={`mb-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors ${
										dragging
											? "border-primary/60 bg-primary/5"
											: "border-border/40 hover:border-primary/40 hover:bg-muted/20"
									}`}
								>
									{uploadingImage ? (
										<Loader2 className="size-6 animate-spin text-muted-foreground" />
									) : (
										<Upload className="size-6 text-muted-foreground" />
									)}
									<p className="text-xs font-medium text-foreground">
										{uploadingImage ? "Uploading…" : "Click or drag & drop"}
									</p>
									<p className="text-[11px] text-muted-foreground">
										PNG, JPG, WebP · max 5 MB
									</p>
								</div>
							)}

							{/* Replace button (shown when an image is already set) */}
							{coverImageUrl && (
								<button
									type="button"
									onClick={() => fileInputRef.current?.click()}
									disabled={uploadingImage}
									className="mb-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-border/40 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
								>
									{uploadingImage ? (
										<Loader2 className="size-3.5 animate-spin" />
									) : (
										<Upload className="size-3.5" />
									)}
									{uploadingImage ? "Uploading…" : "Replace image"}
								</button>
							)}

							{/* Hidden file input */}
							<input
								ref={fileInputRef}
								type="file"
								accept="image/*"
								className="hidden"
								onChange={handleFileChange}
							/>

							{/* Manual URL fallback */}
							<p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
								or paste a URL
							</p>
							<input
								type="url"
								value={urlInput}
								onChange={handleUrlChange}
								placeholder="https://..."
								className="w-full rounded-xl border border-border/40 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
							/>
							<p className="mt-1.5 text-[11px] text-muted-foreground">
								Leave blank to use a category gradient
							</p>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
