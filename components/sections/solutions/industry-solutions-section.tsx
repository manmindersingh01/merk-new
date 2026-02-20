"use client";

import { motion } from "motion/react";
import { Package, ShoppingCart, Monitor, Plane } from "lucide-react";

const industries = [
	{
		icon: Package,
		name: "Consumer Packaged Goods (CPG)",
		description:
			"Success in the CPG market depends on spotting trends early and building wellness ecosystems. MerkMetryx helps brands test product concepts, packaging designs, and pricing sensitivity before products hit the shelves.",
	},
	{
		icon: ShoppingCart,
		name: "Retail and E-commerce",
		description: `In an environment where the "first click to post-purchase" journey is fragmented, the platform utilizes path-to-purchase tools to optimize touchpoints and identify churn risks.`,
	},
	{
		icon: Monitor,
		name: "Technology & SaaS",
		description:
			"For software companies, the platform facilitates feature prioritization (MaxDiff) and concept testing for new technology adoption, ensuring that development resources are focused on high-demand features.",
	},
	{
		icon: Plane,
		name: "Hospitality and Travel",
		description:
			"Assess guest experiences and predict reactions to new service features through real-time feedback loops.",
	},
];

export function IndustrySolutionsSection() {
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
						Solutions by Industry
					</p>
					<h2 className="mt-2 max-w-2xl text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
						Specialized Research Frameworks for Your Market
					</h2>
					<p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
						Each industry faces unique pre-launch triggers and market challenges.
						MerkMetryx provides tailored research frameworks for your specific
						scenarios.
					</p>
				</motion.div>

				{/* Grid */}
				<div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
					{industries.map((industry, i) => {
						const Icon = industry.icon;
						return (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: i * 0.08 }}
								className="rounded-2xl border border-border/40 bg-card p-6 transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8"
							>
								<div className="mb-4 inline-flex items-center justify-center rounded-xl bg-primary/10 p-3">
									<Icon className="size-5 text-primary sm:size-6" />
								</div>
								<h3 className="text-base font-bold text-foreground sm:text-lg">
									{industry.name}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
									{industry.description}
								</p>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
