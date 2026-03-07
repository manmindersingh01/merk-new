"use client";

import { useState, useTransition } from "react";
import { Trash2, Download, Mail, Phone } from "lucide-react";
import { deleteApplicant } from "@/app/admin/applicants/actions";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Applicant {
	id: string;
	full_name: string;
	email: string;
	phone: string | null;
	applied_for: string | null;
	resume_path: string;
	created_at: string;
}

interface Props {
	applicants: Applicant[];
}

export function ApplicantsTable({ applicants: initial }: Props) {
	const [applicants, setApplicants] = useState(initial);
	const [isPending, startTransition] = useTransition();
	const [deletingId, setDeletingId] = useState<string | null>(null);

	function handleDelete(id: string) {
		if (!confirm("Delete this applicant?")) return;

		setDeletingId(id);

		startTransition(async () => {
			await deleteApplicant(id);
			setApplicants((prev) => prev.filter((a) => a.id !== id));
			setDeletingId(null);
		});
	}

	async function handleDownload(path: string) {
		try {
			const { data, error } = await supabase.storage
				.from("resumes")
				.download(path);

			if (error) {
				console.error(error);
				toast.error("Failed to download resume");
				return;
			}

			// Create a blob URL and download
			const url = URL.createObjectURL(data);
			const a = document.createElement("a");
			a.href = url;
			a.download = path;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		} catch (error) {
			console.error(error);
			toast.error("Failed to download resume");
		}
	}

	if (applicants.length === 0) {
		return (
			<div className="rounded-2xl border border-border/40 bg-card px-8 py-16 text-center">
				<p className="text-sm text-muted-foreground">No applicants yet.</p>
				<p className="mt-1 text-xs text-muted-foreground/60">
					Applications from the careers page will appear here.
				</p>
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
								Applicant
							</th>

							<th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								Contact
							</th>

							<th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								Applied For
							</th>

							<th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								Date
							</th>

							<th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								Actions
							</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-border/40">
						{applicants.map((a) => {
							const date = new Date(a.created_at).toLocaleDateString("en-GB", {
								day: "numeric",
								month: "short",
								year: "numeric",
							});

							return (
								<tr
									key={a.id}
									className={`hover:bg-muted/20 transition-colors ${
										deletingId === a.id ? "opacity-50" : ""
									}`}
								>
									{/* Name */}
									<td className="px-5 py-4 font-semibold text-foreground">
										{a.full_name}
									</td>

									{/* Contact */}
									<td className="px-5 py-4 text-xs">
										<a
											href={`mailto:${a.email}`}
											className="flex items-center gap-1 text-primary hover:underline"
										>
											<Mail className="size-3" />
											{a.email}
										</a>

										{a.phone && (
											<p className="flex items-center gap-1 text-muted-foreground">
												<Phone className="size-3" />
												{a.phone}
											</p>
										)}
									</td>

									{/* Applied For */}
									<td className="px-5 py-4 text-xs text-muted-foreground">
										{a.applied_for?.trim() || "Not specified"}
									</td>

									{/* Date */}
									<td className="px-5 py-4 text-xs text-muted-foreground">
										{date}
									</td>

									{/* Actions */}
									<td className="px-5 py-4">
										<div className="flex justify-end gap-2">
											<button
												onClick={() => handleDownload(a.resume_path)}
												className="rounded-lg p-1.5 hover:bg-muted"
											>
												<Download className="size-4" />
											</button>

											<button
												onClick={() => handleDelete(a.id)}
												disabled={isPending}
												className="rounded-lg p-1.5 hover:bg-destructive/10 hover:text-destructive"
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
		</div>
	);
}
