"use client";

import { useState, useTransition } from "react";
import { deleteLead } from "@/app/admin/leads/actions";
import {
	Trash2,
	Mail,
	Phone,
	Building2,
	ChevronDown,
	ChevronUp,
	MapPin,
	Tag,
} from "lucide-react";

const SOURCE_LABELS: Record<string, string> = {
	home_pricing: "Home Page",
	pricing_page: "Pricing Page",
};

interface Lead {
	id: string;
	name: string;
	company: string | null;
	email: string;
	phone: string | null;
	service: string | null;
	message: string | null;
	location: string | null;
	location_source: "user" | "ip" | null;
	ip_location: string | null;
	plan: string | null;
	source: string | null;
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
			<div className="overflow-x-auto">
				<table className="w-full text-sm">
					<thead>
						<tr className="border-b border-border/40 bg-muted/30">
							<th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								Contact
							</th>
							<th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:table-cell">
								Plan
							</th>
							<th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">
								Service
							</th>
							<th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:table-cell">
								Message
							</th>
							<th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground xl:table-cell">
								Date
							</th>
							<th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-border/40">
						{leads.map((lead) => {
							const date = new Date(
								lead.created_at,
							).toLocaleDateString("en-GB", {
								day: "numeric",
								month: "short",
								year: "numeric",
							});
							const isExpanded = expandedId === lead.id;
							const hasExpandable =
								lead.message ||
								(lead.location_source === "user" &&
									lead.ip_location);

							return (
								<>
									<tr
										key={lead.id}
										className={`transition-colors hover:bg-muted/20 ${deletingId === lead.id ? "opacity-50" : ""}`}
									>
										{/* Contact */}
										<td className="px-5 py-4">
											<p className="font-semibold text-foreground">
												{lead.name}
											</p>
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
											{lead.location && (
												<p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
													<MapPin className="size-3 shrink-0" />
													{lead.location}
													<span
														className={`ml-1 shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
															lead.location_source ===
															"user"
																? "bg-blue-500/10 text-blue-600"
																: "bg-amber-500/10 text-amber-600"
														}`}
													>
														{lead.location_source ===
														"user"
															? "self-reported"
															: "auto-detected"}
													</span>
												</p>
											)}
										</td>

										{/* Plan */}
										<td className="hidden px-5 py-4 sm:table-cell">
											{lead.plan ? (
												<div>
													<span className="inline-flex items-center gap-1 rounded-full bg-violet-500/10 px-2.5 py-1 text-xs font-semibold text-violet-600">
														<Tag className="size-3" />
														{lead.plan}
													</span>
													{lead.source &&
														SOURCE_LABELS[
															lead.source
														] && (
															<p className="mt-1 text-[10px] text-muted-foreground">
																via{" "}
																{
																	SOURCE_LABELS[
																		lead
																			.source
																	]
																}
															</p>
														)}
												</div>
											) : (
												<span className="text-xs text-muted-foreground">
													Direct
												</span>
											)}
										</td>

										{/* Service */}
										<td className="hidden px-5 py-4 md:table-cell">
											{lead.service ? (
												<span className="rounded-full bg-primary/8 px-2.5 py-1 text-xs font-medium text-primary">
													{lead.service}
												</span>
											) : (
												<span className="text-xs text-muted-foreground">
													—
												</span>
											)}
										</td>

										{/* Message preview */}
										<td className="hidden px-5 py-4 lg:table-cell">
											{lead.message ? (
												<p className="max-w-xs truncate text-xs text-muted-foreground">
													{lead.message}
												</p>
											) : (
												<span className="text-xs text-muted-foreground">
													—
												</span>
											)}
										</td>

										{/* Date */}
										<td className="hidden px-5 py-4 text-xs text-muted-foreground xl:table-cell">
											{date}
										</td>

										{/* Actions */}
										<td className="px-5 py-4">
											<div className="flex items-center justify-end gap-1">
												{hasExpandable && (
													<button
														onClick={() =>
															setExpandedId(
																isExpanded
																	? null
																	: lead.id,
															)
														}
														title="View details"
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
													onClick={() =>
														handleDelete(lead.id)
													}
													disabled={isPending}
													className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
												>
													<Trash2 className="size-4" />
												</button>
											</div>
										</td>
									</tr>

									{/* Expanded detail row */}
									{isExpanded && (
										<tr
											key={`${lead.id}-expanded`}
											className="bg-muted/10"
										>
											<td
												colSpan={6}
												className="px-5 pb-4 pt-0"
											>
												<div className="flex flex-col gap-3">
													{lead.message && (
														<div className="rounded-xl border border-border/40 bg-background p-4">
															<p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
																Full message
															</p>
															<p className="whitespace-pre-wrap text-sm text-foreground">
																{lead.message}
															</p>
														</div>
													)}

													{/* IP verification — only shown when user self-reported a location */}
													{lead.location_source ===
														"user" &&
														lead.ip_location && (
															<div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
																<p className="mb-1 text-xs font-semibold uppercase tracking-wider text-amber-600">
																	IP-detected
																	location
																	(verification)
																</p>
																<div className="flex items-center gap-2 text-sm text-foreground">
																	<MapPin className="size-3.5 text-amber-600" />
																	{
																		lead.ip_location
																	}
																	{lead.ip_location ===
																	lead.location ? (
																		<span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
																			matches
																		</span>
																	) : (
																		<span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-medium text-red-600">
																			mismatch
																		</span>
																	)}
																</div>
															</div>
														)}
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
		</div>
	);
}
