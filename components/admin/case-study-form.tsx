"use client";

import { useState, useTransition, useRef } from "react";
import {
	createCaseStudy,
	updateCaseStudy,
} from "@/app/admin/case-studies/actions";
import { CaseStudy } from "@/types/case-study";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, EyeOff, Loader2, Upload, X } from "lucide-react";
import Link from "next/link";
import { MarkdownContent } from "@/components/blog/markdown-content";
import { supabase } from "@/lib/supabase";

const INDUSTRIES = [
	"Technology",
	"Healthcare",
	"Financial Services",
	"Retail & E-commerce",
	"Consumer Goods",
	"Manufacturing",
	"Media & Entertainment",
	"Education",
	"Real Estate",
	"Energy",
];

const BUCKET = "case-study-images";

interface CaseStudyFormProps {
	caseStudy?: CaseStudy;
}

export function CaseStudyForm({ caseStudy }: CaseStudyFormProps) {
	const isEdit = Boolean(caseStudy);
	const [isPending, startTransition] = useTransition();
	const [preview, setPreview] = useState(false);
	const [content, setContent] = useState(caseStudy?.content ?? "");
	const [published, setPublished] = useState(caseStudy?.published ?? false);
	const [error, setError] = useState<string | null>(null);

	// Cover image state
	const [coverImageUrl, setCoverImageUrl] = useState(
		caseStudy?.cover_image_url ?? ""
	);
	const [urlInput, setUrlInput] = useState(caseStudy?.cover_image_url ?? "");
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
				if (isEdit && caseStudy) {
					await updateCaseStudy(caseStudy.id, formData);
				} else {
					await createCaseStudy(formData);
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
					href="/admin/case-studies"
					className="text-muted-foreground hover:text-foreground"
				>
					<ArrowLeft className="size-5" />
				</Link>
				<div>
					<h1 className="text-2xl font-extrabold tracking-tight text-foreground">
						{isEdit ? "Edit Case Study" : "New Case Study"}
					</h1>
					<p className="mt-0.5 text-sm text-muted-foreground">
						{isEdit
							? `Editing "${caseStudy?.title}"`
							: "Create a new case study"}
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
								defaultValue={caseStudy?.title ?? ""}
								placeholder="How we helped Acme Corp grow 3x..."
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
								defaultValue={caseStudy?.excerpt ?? ""}
								placeholder="A short summary of the challenge, approach, and outcome..."
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
									placeholder={`## The Challenge\n\nDescribe the problem the client faced...\n\n## Our Approach\n\nExplain the methodology used...\n\n## Results\n\nShare the measurable outcomes...`}
									className="w-full resize-y rounded-xl border border-border/40 bg-background px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
								/>
							)}
							<p className="mt-2 text-[11px] text-muted-foreground">
								Supports Markdown — **bold**, *italic*, ## headings, - lists,
								&gt; blockquotes, `code`
							</p>
						</div>
					</div>

					{/* Sidebar */}
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
									"Create Case Study"
								)}
							</Button>
						</div>

						{/* Client & Industry */}
						<div className="rounded-2xl border border-border/40 bg-card p-5">
							<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								Client
							</label>
							<input
								name="client"
								defaultValue={caseStudy?.client ?? ""}
								placeholder="Acme Corporation"
								className="mb-4 w-full rounded-xl border border-border/40 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
							/>

							<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								Industry
							</label>
							<select
								name="industry"
								defaultValue={caseStudy?.industry ?? ""}
								className="w-full rounded-xl border border-border/40 bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
							>
								<option value="">Select industry…</option>
								{INDUSTRIES.map((i) => (
									<option key={i} value={i}>
										{i}
									</option>
								))}
							</select>
						</div>

						{/* Results */}
						<div className="rounded-2xl border border-border/40 bg-card p-5">
							<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								Key Result
							</label>
							<input
								name="results"
								defaultValue={caseStudy?.results ?? ""}
								placeholder="e.g. 3× revenue growth in 6 months"
								className="w-full rounded-xl border border-border/40 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
							/>
							<p className="mt-1.5 text-[11px] text-muted-foreground">
								A short headline metric shown on the card
							</p>
						</div>

						{/* Cover image */}
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

							<input
								ref={fileInputRef}
								type="file"
								accept="image/*"
								className="hidden"
								onChange={handleFileChange}
							/>

							<p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
								or paste a URL
							</p>
							<input
								type="url"
								value={urlInput}
								onChange={(e) => {
									setUrlInput(e.target.value);
									setCoverImageUrl(e.target.value);
								}}
								placeholder="https://..."
								className="w-full rounded-xl border border-border/40 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
							/>
							<p className="mt-1.5 text-[11px] text-muted-foreground">
								Leave blank to use an industry gradient
							</p>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
