"use client";

import { motion } from "motion/react";
import { TrendingUp, Search, Users, TestTube, DollarSign } from "lucide-react";

const useCases = [
	{
		icon: TrendingUp,
		title: "Market Sizing (TAM/SAM/SOM)",
		description:
			"Quantify the target market and identify niche gaps that competitors may have overlooked.",
	},
	{
		icon: Search,
		title: "Competitor Analysis",
		description:
			"Utilize mystery shopping, online traffic tools (e.g., SEMrush, SimilarWeb), and SWOT analysis to assess the strengths and weaknesses of industry rivals.",
	},
	{
		icon: Users,
		title: "Consumer Insights",
		description:
			`Leverage buyer personas—such as "Ellen the Engineer"—to understand the specific pain points and emotional drivers of target segments.`,
	},
	{
		icon: TestTube,
		title: "Concept Testing",
		description:
			"Evaluate the appeal of a new product idea, logo, or name before public rollout to ensure uniqueness and market appeal.",
	},
	{
		icon: DollarSign,
		title: "Pricing Sensitivity",
		description:
			"Determine the optimal price point that balances revenue with market adoption through willingness-to-pay studies.",
	},
];

export function UseCasesSection() {
	return (
		<section className="bg-card/40 px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16">
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
						Practical Use Cases
					</p>
					<h2 className="mt-2 max-w-2xl text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
						Validating Every Decision with Evidence
					</h2>
					<p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
						MerkMetryx facilitates specific types of research projects to ensure
						every strategic decision is backed by data and validated insights.
					</p>
				</motion.div>

				{/* Grid */}
				<div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
					{useCases.map((useCase, i) => {
						const Icon = useCase.icon;
						return (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: i * 0.08 }}
								className="rounded-2xl border border-border/40 bg-card p-6 transition-shadow hover:shadow-md sm:rounded-3xl sm:p-7"
							>
								<div className="mb-4 inline-flex items-center justify-center rounded-xl bg-primary/10 p-3">
									<Icon className="size-5 text-primary sm:size-6" />
								</div>
								<h3 className="text-sm font-bold text-foreground sm:text-base">
									{useCase.title}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
									{useCase.description}
								</p>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
