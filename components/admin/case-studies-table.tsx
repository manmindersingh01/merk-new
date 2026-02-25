"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { CaseStudy } from "@/types/case-study";
import {
	deleteCaseStudy,
	toggleCaseStudyPublish,
} from "@/app/admin/case-studies/actions";
import { Edit2, Trash2, Eye, EyeOff, ExternalLink, Briefcase } from "lucide-react";

interface CaseStudiesTableProps {
	caseStudies: CaseStudy[];
}

export function CaseStudiesTable({
	caseStudies: initial,
}: CaseStudiesTableProps) {
	const [items, setItems] = useState(initial);
	const [isPending, startTransition] = useTransition();
	const [deletingId, setDeletingId] = useState<string | null>(null);

	function handleToggle(cs: CaseStudy) {
		startTransition(async () => {
			await toggleCaseStudyPublish(cs.id, cs.published);
			setItems((prev) =>
				prev.map((p) =>
					p.id === cs.id ? { ...p, published: !p.published } : p,
				),
			);
		});
	}

	function handleDelete(id: string) {
		if (!confirm("Delete this case study? This cannot be undone.")) return;
		setDeletingId(id);
		startTransition(async () => {
			await deleteCaseStudy(id);
			setItems((prev) => prev.filter((p) => p.id !== id));
			setDeletingId(null);
		});
	}

	if (items.length === 0) {
		return (
			<div className="rounded-2xl border border-border/40 bg-card px-8 py-16 text-center">
				<p className="text-muted-foreground">No case studies yet.</p>
				<Link
					href="/admin/case-studies/new"
					className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
				>
					Create your first case study →
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
							Client / Industry
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
					{items.map((cs) => {
						const date = cs.published_at
							? new Date(cs.published_at).toLocaleDateString("en-GB", {
									day: "numeric",
									month: "short",
									year: "numeric",
								})
							: new Date(cs.created_at).toLocaleDateString("en-GB", {
									day: "numeric",
									month: "short",
									year: "numeric",
								});

						return (
							<tr
								key={cs.id}
								className={`transition-colors hover:bg-muted/20 ${deletingId === cs.id ? "opacity-50" : ""}`}
							>
								{/* Title */}
								<td className="px-5 py-4">
									<div className="flex items-center gap-2">
										<p className="line-clamp-1 font-semibold text-foreground">
											{cs.title}
										</p>
										{cs.published && (
											<Link
												href={`/case-studies/${cs.slug}`}
												target="_blank"
												className="text-muted-foreground hover:text-primary"
											>
												<ExternalLink className="size-3.5" />
											</Link>
										)}
									</div>
									{cs.excerpt && (
										<p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
											{cs.excerpt}
										</p>
									)}
								</td>

								{/* Client / Industry */}
								<td className="hidden px-5 py-4 sm:table-cell">
									<div className="flex flex-col gap-1">
										{cs.client && (
											<p className="flex items-center gap-1 text-xs font-medium text-foreground">
												<Briefcase className="size-3 text-muted-foreground" />
												{cs.client}
											</p>
										)}
										{cs.industry && (
											<span className="w-fit rounded-full bg-primary/8 px-2.5 py-0.5 text-xs font-medium text-primary">
												{cs.industry}
											</span>
										)}
									</div>
								</td>

								{/* Status */}
								<td className="px-5 py-4">
									<span
										className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
											cs.published
												? "bg-emerald-500/10 text-emerald-600"
												: "bg-amber-500/10 text-amber-600"
										}`}
									>
										<span
											className={`size-1.5 rounded-full ${cs.published ? "bg-emerald-500" : "bg-amber-500"}`}
										/>
										{cs.published ? "Published" : "Draft"}
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
											onClick={() => handleToggle(cs)}
											disabled={isPending}
											title={cs.published ? "Unpublish" : "Publish"}
											className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
										>
											{cs.published ? (
												<EyeOff className="size-4" />
											) : (
												<Eye className="size-4" />
											)}
										</button>
										<Link
											href={`/admin/case-studies/${cs.id}/edit`}
											className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
										>
											<Edit2 className="size-4" />
										</Link>
										<button
											onClick={() => handleDelete(cs.id)}
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
