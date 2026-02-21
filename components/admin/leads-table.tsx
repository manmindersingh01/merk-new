"use client";

import { useState, useTransition } from "react";
import { deleteLead } from "@/app/admin/leads/actions";
import { Trash2, Mail, Phone, Building2, ChevronDown, ChevronUp } from "lucide-react";

interface Lead {
	id: string;
	name: string;
	company: string | null;
	email: string;
	phone: string | null;
	service: string | null;
	message: string | null;
	created_at: string;
}

interface LeadsTableProps {
	leads: Lead[];
}

export function LeadsTable({ leads: initialLeads }: LeadsTableProps) {
	const [leads, setLeads] = useState(initialLeads);
	const [isPending, startTransition] = useTransition();
	const [deletingId, setDeletingId] = useState<string | null>(null);
	const [expandedId, setExpandedId] = useState<string | null>(null);

	function handleDelete(id: string) {
		if (!confirm("Delete this lead? This cannot be undone.")) return;
		setDeletingId(id);
		startTransition(async () => {
			await deleteLead(id);
			setLeads((prev) => prev.filter((l) => l.id !== id));
			setDeletingId(null);
		});
	}

	if (leads.length === 0) {
		return (
			<div className="rounded-2xl border border-border/40 bg-card px-8 py-16 text-center">
				<p className="text-sm text-muted-foreground">No leads yet.</p>
				<p className="mt-1 text-xs text-muted-foreground/60">
					Submissions from the contact form will appear here.
				</p>
			</div>
		);
	}

	return (
		<div className="overflow-hidden rounded-2xl border border-border/40 bg-card">
			<table className="w-full text-sm">
				<thead>
					<tr className="border-b border-border/40 bg-muted/30">
						<th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
							Contact
						</th>
						<th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:table-cell">
							Service
						</th>
						<th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">
							Message
						</th>
						<th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:table-cell">
							Date
						</th>
						<th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-border/40">
					{leads.map((lead) => {
						const date = new Date(lead.created_at).toLocaleDateString("en-GB", {
							day: "numeric",
							month: "short",
							year: "numeric",
						});
						const isExpanded = expandedId === lead.id;

						return (
							<>
								<tr
									key={lead.id}
									className={`transition-colors hover:bg-muted/20 ${deletingId === lead.id ? "opacity-50" : ""}`}
								>
									{/* Contact */}
									<td className="px-5 py-4">
										<p className="font-semibold text-foreground">{lead.name}</p>
										{lead.company && (
											<p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
												<Building2 className="size-3" />
												{lead.company}
											</p>
										)}
										<a
											href={`mailto:${lead.email}`}
											className="mt-0.5 flex items-center gap-1 text-xs text-primary hover:underline"
										>
											<Mail className="size-3" />
											{lead.email}
										</a>
										{lead.phone && (
											<p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
												<Phone className="size-3" />
												{lead.phone}
											</p>
										)}
									</td>

									{/* Service */}
									<td className="hidden px-5 py-4 sm:table-cell">
										{lead.service ? (
											<span className="rounded-full bg-primary/8 px-2.5 py-1 text-xs font-medium text-primary">
												{lead.service}
											</span>
										) : (
											<span className="text-xs text-muted-foreground">—</span>
										)}
									</td>

									{/* Message preview */}
									<td className="hidden px-5 py-4 md:table-cell">
										{lead.message ? (
											<p className="max-w-xs truncate text-xs text-muted-foreground">
												{lead.message}
											</p>
										) : (
											<span className="text-xs text-muted-foreground">—</span>
										)}
									</td>

									{/* Date */}
									<td className="hidden px-5 py-4 text-xs text-muted-foreground lg:table-cell">
										{date}
									</td>

									{/* Actions */}
									<td className="px-5 py-4">
										<div className="flex items-center justify-end gap-1">
											{lead.message && (
												<button
													onClick={() =>
														setExpandedId(isExpanded ? null : lead.id)
													}
													title="View full message"
													className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
												>
													{isExpanded ? (
														<ChevronUp className="size-4" />
													) : (
														<ChevronDown className="size-4" />
													)}
												</button>
											)}
											<button
												onClick={() => handleDelete(lead.id)}
												disabled={isPending}
												className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
											>
												<Trash2 className="size-4" />
											</button>
										</div>
									</td>
								</tr>

								{/* Expanded message row */}
								{isExpanded && lead.message && (
									<tr
										key={`${lead.id}-expanded`}
										className="bg-muted/10"
									>
										<td
											colSpan={5}
											className="px-5 pb-4 pt-0 text-sm text-foreground"
										>
											<div className="rounded-xl border border-border/40 bg-background p-4">
												<p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
													Full message
												</p>
												<p className="whitespace-pre-wrap text-sm text-foreground">
													{lead.message}
												</p>
											</div>
										</td>
									</tr>
								)}
							</>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
