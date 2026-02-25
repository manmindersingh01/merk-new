"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { submitContact } from "@/app/(public)/contact/actions";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, Tag } from "lucide-react";

const SERVICES = [
	"Brand Health Tracking",
	"Concept & Product Testing",
	"Competitive Intelligence",
	"Sentiment Analysis",
	"Demand Validation",
	"Consumer Segmentation",
	"Custom Research",
];

const SOURCE_LABELS: Record<string, string> = {
	home_pricing: "Home Page",
	pricing_page: "Pricing Page",
};

export function ContactForm() {
	const searchParams = useSearchParams();
	const plan = searchParams.get("plan");
	const source = searchParams.get("source");

	const [isPending, startTransition] = useTransition();
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState<string | null>(null);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);
		const formData = new FormData(e.currentTarget);
		startTransition(async () => {
			const result = await submitContact(formData);
			if (result.success) {
				setSubmitted(true);
			} else {
				setError(result.error);
			}
		});
	}

	if (submitted) {
		return (
			<div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-8 py-14 text-center">
				<CheckCircle2 className="size-12 text-emerald-500" />
				<h3 className="text-xl font-bold text-foreground">
					Message received!
				</h3>
				<p className="max-w-xs text-sm text-muted-foreground">
					Thanks for reaching out. A member of our team will be in touch
					within one business day.
				</p>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-5">
			{error && (
				<div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
					{error}
				</div>
			)}

			{/* Plan banner — shown when arriving from pricing */}
			{plan && (
				<div className="flex items-center gap-2.5 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
					<Tag className="size-4 shrink-0 text-primary" />
					<div className="text-sm">
						<span className="font-semibold text-foreground">
							{plan} Plan
						</span>
						{source && SOURCE_LABELS[source] && (
							<span className="ml-1.5 text-muted-foreground">
								via {SOURCE_LABELS[source]}
							</span>
						)}
					</div>
				</div>
			)}

			{/* Hidden fields for plan tracking */}
			{plan && <input type="hidden" name="plan" value={plan} />}
			{source && <input type="hidden" name="source" value={source} />}

			{/* Name + Company row */}
			<div className="grid gap-4 sm:grid-cols-2">
				<div>
					<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
						Full Name *
					</label>
					<input
						name="name"
						required
						placeholder="Jane Smith"
						className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
					/>
				</div>
				<div>
					<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
						Company
					</label>
					<input
						name="company"
						placeholder="Acme Corp"
						className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
					/>
				</div>
			</div>

			{/* Email + Phone row */}
			<div className="grid gap-4 sm:grid-cols-2">
				<div>
					<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
						Work Email *
					</label>
					<input
						name="email"
						type="email"
						required
						placeholder="jane@company.com"
						className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
					/>
				</div>
				<div>
					<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
						Phone
					</label>
					<input
						name="phone"
						type="tel"
						placeholder="+1 (555) 000-0000"
						className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
					/>
				</div>
			</div>

			{/* Service interest */}
			<div>
				<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
					I&apos;m interested in
				</label>
				<select
					name="service"
					className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
				>
					<option value="">Select a service…</option>
					{SERVICES.map((s) => (
						<option key={s} value={s}>
							{s}
						</option>
					))}
				</select>
			</div>

			{/* Location */}
			<div>
				<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
					Location
				</label>
				<input
					name="location"
					placeholder="City, Country (optional)"
					className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
				/>
			</div>

			{/* Message */}
			<div>
				<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
					Message
				</label>
				<textarea
					name="message"
					rows={4}
					placeholder="Tell us about your research goals or the challenge you're trying to solve…"
					className="w-full resize-none rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
				/>
			</div>

			<Button
				type="submit"
				size="lg"
				disabled={isPending}
				className="w-full rounded-xl font-semibold"
			>
				{isPending ? (
					<>
						<Loader2 className="mr-2 size-4 animate-spin" />
						Sending…
					</>
				) : (
					"Send Message"
				)}
			</Button>

			<p className="text-center text-[11px] text-muted-foreground">
				No spam. We respond within one business day.
			</p>
		</form>
	);
}
