"use client";

import { motion } from "motion/react";
import { Package, ShoppingCart, Monitor, Plane, Check } from "lucide-react";

const industries = [
	{
		icon: Package,
		tag: "CPG",
		name: "Consumer Packaged Goods",
		description:
			"Spot trends early and validate product concepts before launch. MerkMetryx enables precision decision-making across packaging, pricing, and competitive shelf positioning.",
		capabilities: [
			"Concept & packaging validation",
			"Pricing sensitivity modeling",
			"Health & wellness trend detection",
			"Competitive positioning insights",
		],
		stat: "500+",
		statLabel: "Brands validated",
	},
	{
		icon: ShoppingCart,
		tag: "Retail",
		name: "Retail & E-commerce",
		description:
			"Optimize fragmented customer journeys and eliminate friction across digital and physical touchpoints.",
		capabilities: [
			"Path-to-purchase mapping",
			"Touchpoint performance analysis",
			"Cart abandonment reduction",
			"Omnichannel optimization",
		],
		stat: "32%",
		statLabel: "Avg. conversion uplift",
	},
	{
		icon: Monitor,
		tag: "Technology",
		name: "Technology & SaaS",
		description:
			"Prioritize features with statistical confidence and validate demand before allocating development resources.",
		capabilities: [
			"MaxDiff feature prioritization",
			"Concept testing",
			"Onboarding optimization",
			"Product-market fit validation",
		],
		stat: "89%",
		statLabel: "Validated feature success",
	},
	{
		icon: Plane,
		tag: "Hospitality",
		name: "Hospitality & Travel",
		description:
			"Predict guest response to service innovation and strengthen loyalty through real-time feedback intelligence.",
		capabilities: [
			"Experience journey mapping",
			"Service innovation testing",
			"Real-time sentiment analysis",
			"Loyalty performance tracking",
		],
		stat: "4.8/5",
		statLabel: "Satisfaction improvement",
	},
];

export function IndustrySolutionsSection() {
	return (
		<section className="bg-background px-6 py-28 lg:px-16">
			<div className="mx-auto max-w-7xl">
				{/* Heading */}
				<div className="max-w-3xl">
					<p className="text-sm font-semibold uppercase tracking-widest text-primary">
						Solutions by Industry
					</p>
					<h2 className="mt-4 text-5xl font-extrabold tracking-tight text-foreground">
						Industry-Specific Research Systems
					</h2>
					<p className="mt-6 text-lg text-muted-foreground">
						Structured frameworks tailored for measurable commercial impact
						across complex markets.
					</p>
				</div>

				{/* Cards Grid */}
				<div className="mt-20 grid gap-8 md:grid-cols-2">
					{industries.map((industry, i) => {
						const Icon = industry.icon;

						return (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 40 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6 }}
								className="
                  group relative
                  border border-border
                  bg-muted/40
                  p-10
                  shadow-sm
                  transition-all
                  hover:shadow-md
                "
							>
								{/* Header */}
								<div className="flex items-start justify-between">
									<div className="flex items-center gap-3">
										<Icon className="size-5 text-primary" />
										<span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
											{industry.tag}
										</span>
									</div>

									<div className="text-right">
										<p className="text-3xl font-bold text-foreground">
											{industry.stat}
										</p>
										<p className="text-xs text-muted-foreground">
											{industry.statLabel}
										</p>
									</div>
								</div>

								{/* Title */}
								<h3 className="mt-8 text-2xl font-bold text-foreground">
									{industry.name}
								</h3>

								{/* Description */}
								<p className="mt-4 text-base leading-relaxed text-muted-foreground">
									{industry.description}
								</p>

								{/* Capabilities */}
								<ul className="mt-8 space-y-3">
									{industry.capabilities.map((item, j) => (
										<li key={j} className="flex items-start gap-3">
											<Check className="mt-1 size-4 text-primary" />
											<span className="text-sm text-foreground">{item}</span>
										</li>
									))}
								</ul>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
