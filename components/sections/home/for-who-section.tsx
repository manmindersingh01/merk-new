"use client";

import { motion } from "motion/react";
import { Megaphone, Smile, LineChart, ArrowRight } from "lucide-react";
import Link from "next/link";

const personas = [
	{
		icon: Megaphone,
		role: "Marketing Directors & CMOs",
		challenge:
			"Campaigns built on gut instinct burn budget and miss the mark. You need research that validates ideas before dollars are committed.",
		outcomes: [
			"Measure brand health and ad effectiveness in real-time",
			"Uncover what actually resonates with your target audience",
			"Track competitor moves and identify share-of-voice gaps",
			"Turn re-engaged leads into active buyers with data-backed messaging",
		],
	},
	{
		icon: Smile,
		role: "Customer Experience Managers",
		challenge:
			"A staggering 77% of consumers stay loyal to brands for 10+ years — but only when friction is removed. You need to know exactly where it hides.",
		outcomes: [
			"Map the full customer journey from awareness to advocacy",
			"Surface the emotional pain points driving churn",
			"Benchmark your CX scores against industry leaders",
			"Prioritise product and service improvements by business impact",
		],
	},
	{
		icon: LineChart,
		role: "Strategy Leads & Corporate Analysts",
		challenge:
			"Strategic plans built on incomplete market intelligence create costly blind spots. You need forward-looking data, not lagging indicators.",
		outcomes: [
			"Forecast market shifts before competitors act on them",
			"Assess entry feasibility and demand for new markets",
			"Model pricing elasticity and revenue scenarios",
			"Query complex datasets in plain English — no data team required",
		],
	},
];

export function ForWhoSection() {
	return (
		<section className="px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16">
			<div className="mx-auto max-w-7xl">
				{/* Heading */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="mb-12 sm:mb-16"
				>
					<p className="text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">
						Who We Serve
					</p>
					<h2 className="mt-2 max-w-2xl text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
						Built for the people who carry the decision.
					</h2>
					<p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
						MerkMetryx is designed around the real workflows of the teams that
						need market intelligence most.
					</p>
				</motion.div>

				{/* Persona cards */}
				<div className="grid gap-6 lg:grid-cols-3">
					{personas.map((persona, i) => {
						const Icon = persona.icon;
						return (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: i * 0.12 }}
								className="flex flex-col rounded-2xl border border-border/40 bg-card p-6 sm:rounded-3xl sm:p-8"
							>
								{/* Icon + role */}
								<div className="mb-5 flex items-center gap-3">
									<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
										<Icon className="size-5 text-primary" />
									</div>
									<h3 className="text-sm font-bold text-foreground sm:text-base">
										{persona.role}
									</h3>
								</div>

								{/* Challenge */}
								<p className="mb-5 text-sm leading-relaxed text-muted-foreground">
									{persona.challenge}
								</p>

								{/* Divider */}
								<div className="mb-5 border-t border-border/40" />

								{/* Outcomes */}
								<ul className="flex flex-col gap-2.5">
									{persona.outcomes.map((outcome, j) => (
										<li key={j} className="flex items-start gap-2.5">
											<span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/15">
												<span className="size-1.5 rounded-full bg-primary" />
											</span>
											<span className="text-xs leading-relaxed text-foreground sm:text-sm">
												{outcome}
											</span>
										</li>
									))}
								</ul>

								{/* Link */}
								<Link
									href="/solutions"
									className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-opacity hover:opacity-75 sm:text-sm"
								>
									See solutions <ArrowRight className="size-3.5" />
								</Link>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
