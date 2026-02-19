"use client";

import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const methods = [
	{
		category: "Quantitative Core",
		color: "bg-primary/10 text-primary border-primary/20",
		items: [
			{
				name: "NPS & CSAT",
				description:
					"Measure customer loyalty and satisfaction with industry-standard Net Promoter Score and Customer Satisfaction surveys. Track scores over time with automatic wave comparison.",
			},
			{
				name: "A/B Concept Testing",
				description:
					"Present two or more concepts side-by-side to determine which resonates most strongly. Essential for product, campaign, and messaging decisions before full investment.",
			},
			{
				name: "Rating & Ranking Scales",
				description:
					"Likert, semantic differential, and forced-ranking scales for nuanced attitudinal measurement across product attributes, brand perceptions, and purchase drivers.",
			},
		],
	},
	{
		category: "Advanced Methodologies",
		color: "bg-primary/10 text-primary border-primary/20",
		items: [
			{
				name: "Conjoint Analysis",
				description:
					"Understand how consumers trade off different product features and price points. Identify the exact feature-price combinations that maximise purchase intent.",
			},
			{
				name: "MaxDiff Scaling",
				description:
					"Force respondents to reveal their true preference hierarchy across attributes, benefits, or messages — eliminating the acquiescence bias that inflates standard ratings.",
			},
			{
				name: "Van Westendorp Price Sensitivity",
				description:
					"Determine the acceptable price range for any product or service. Identify the price point that is 'not too cheap' and 'not too expensive' for your exact audience.",
			},
		],
	},
	{
		category: "Qualitative & Behavioural",
		color: "bg-primary/10 text-primary border-primary/20",
		items: [
			{
				name: "In-Home Usage Tests (IHUT)",
				description:
					"Recruit qualified participants to trial products in their natural environment and capture rich behavioural feedback over days or weeks — not just immediate reactions.",
			},
			{
				name: "Ethnographic & Diary Studies",
				description:
					"Longitudinal research that captures real behaviour in real contexts, revealing the habits and triggers that consumers themselves struggle to articulate in surveys.",
			},
			{
				name: "Open-Text & NLP Analysis",
				description:
					"Gather verbatim responses at scale and let our NLP engine process thousands of open-ended answers into structured themes, sentiments, and actionable signals.",
			},
		],
	},
];

export function ResearchMethodsSection() {
	return (
		<section className="px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16">
			<div className="mx-auto max-w-6xl">
				{/* Heading */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="mb-14"
				>
					<p className="text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">
						Research Toolkit
					</p>
					<h2 className="mt-2 max-w-2xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
						Every method, one platform.
					</h2>
					<p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
						From quick NPS pulses to multi-wave Conjoint studies, MerkMetryx
						supports the full spectrum of quantitative and qualitative
						methodologies — with built-in statistical validation throughout.
					</p>
				</motion.div>

				{/* Category blocks */}
				<div className="flex flex-col gap-10">
					{methods.map((group, gi) => (
						<motion.div
							key={gi}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: gi * 0.1 }}
						>
							{/* Category label */}
							<div className="mb-5 flex items-center gap-3">
								<span
									className={cn(
										"rounded-full border px-3 py-1 text-xs font-semibold",
										group.color
									)}
								>
									{group.category}
								</span>
								<div className="flex-1 border-t border-border/40" />
							</div>

							{/* Method cards */}
							<div className="grid gap-4 sm:grid-cols-3">
								{group.items.map((method, mi) => (
									<div
										key={mi}
										className="rounded-2xl border border-border/40 bg-card p-5 transition-shadow hover:shadow-sm sm:rounded-3xl sm:p-6"
									>
										<h4 className="mb-2 text-sm font-bold text-foreground sm:text-base">
											{method.name}
										</h4>
										<p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
											{method.description}
										</p>
									</div>
								))}
							</div>
						</motion.div>
					))}
				</div>

				<Separator className="mt-20" />
			</div>
		</section>
	);
}
