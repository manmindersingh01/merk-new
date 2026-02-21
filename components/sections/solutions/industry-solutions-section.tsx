"use client";

import { motion } from "motion/react";
import { Package, ShoppingCart, Monitor, Plane, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const industries = [
	{
		icon: Package,
		tag: "CPG",
		name: "Consumer Packaged Goods",
		description:
			"Success in the CPG market depends on spotting trends early and building wellness ecosystems. MerkMetryx helps brands test product concepts, packaging designs, and pricing sensitivity before products hit the shelves.",
		capabilities: [
			"Product concept validation and packaging design testing",
			"Pricing sensitivity analysis across retail channels",
			"Trend detection in health and wellness categories",
			"Competitive shelf positioning insights",
		],
		visual: {
			label: "CPG Market Coverage",
			stat: "500+",
			sublabel: "Consumer brands validated",
		},
		reverse: false,
	},
	{
		icon: ShoppingCart,
		tag: "Retail",
		name: "Retail and E-commerce",
		description:
			'In an environment where the "first click to post-purchase" journey is fragmented, the platform utilizes path-to-purchase tools to optimize touchpoints and identify churn risks.',
		capabilities: [
			"Path-to-purchase journey optimization",
			"Touchpoint effectiveness measurement",
			"Cart abandonment and churn risk analysis",
			"Omnichannel experience mapping",
		],
		visual: {
			label: "Conversion Uplift",
			stat: "32%",
			sublabel: "Average improvement post-optimization",
		},
		reverse: true,
	},
	{
		icon: Monitor,
		tag: "Technology",
		name: "Technology & SaaS",
		description:
			"For software companies, the platform facilitates feature prioritization (MaxDiff) and concept testing for new technology adoption, ensuring that development resources are focused on high-demand features.",
		capabilities: [
			"Feature prioritization with MaxDiff analysis",
			"New technology adoption concept testing",
			"User onboarding experience optimization",
			"Product-market fit validation",
		],
		visual: {
			label: "Feature Success Rate",
			stat: "89%",
			sublabel: "Features validated before development",
		},
		reverse: false,
	},
	{
		icon: Plane,
		tag: "Hospitality",
		name: "Hospitality and Travel",
		description:
			"Assess guest experiences and predict reactions to new service features through real-time feedback loops, ensuring every touchpoint enhances satisfaction and loyalty.",
		capabilities: [
			"Guest experience journey mapping",
			"Service feature reaction prediction",
			"Real-time feedback loop implementation",
			"Satisfaction and loyalty tracking",
		],
		visual: {
			label: "Guest Satisfaction",
			stat: "4.8/5",
			sublabel: "Average rating improvement",
		},
		reverse: true,
	},
];

interface VisualBlock {
	label: string;
	stat: string;
	sublabel: string;
}

function IndustryVisual({ visual }: { visual: VisualBlock }) {
	return (
		<div className="rounded-2xl border border-border/40 bg-card p-6 sm:rounded-3xl sm:p-8">
			<p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
				{visual.label}
			</p>
			<p className="text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">
				{visual.stat}
			</p>
			<p className="mt-1 text-xs text-muted-foreground sm:text-sm">
				{visual.sublabel}
			</p>
		</div>
	);
}

export function IndustrySolutionsSection() {
	return (
		<section className="bg-card/40 px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16">
			<div className="mx-auto max-w-6xl">
				{/* Heading */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="mb-16 sm:mb-20"
				>
					<p className="text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">
						Solutions by Industry
					</p>
					<h2 className="mt-2 max-w-2xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
						Specialized Research Frameworks for Your Market
					</h2>
					<p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
						Each industry faces unique pre-launch triggers and market challenges.
						MerkMetryx provides tailored research frameworks for your specific
						scenarios.
					</p>
				</motion.div>

				{/* Alternating feature rows */}
				<div className="flex flex-col gap-20 sm:gap-28">
					{industries.map((industry, i) => {
						const Icon = industry.icon;
						return (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 32 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6 }}
								className={cn(
									"grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
									industry.reverse && "lg:[&>*:first-child]:order-2"
								)}
							>
								{/* Text side */}
								<div>
									<div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5">
										<Icon className="size-4 text-primary" />
										<span className="text-xs font-semibold text-primary">
											{industry.tag}
										</span>
									</div>
									<h3 className="text-xl font-extrabold leading-snug text-foreground sm:text-2xl md:text-3xl">
										{industry.name}
									</h3>
									<p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
										{industry.description}
									</p>
									<ul className="mt-6 flex flex-col gap-3">
										{industry.capabilities.map((capability, j) => (
											<li key={j} className="flex items-start gap-2.5">
												<Check className="mt-0.5 size-4 shrink-0 text-primary" />
												<span className="text-sm text-foreground">
													{capability}
												</span>
											</li>
										))}
									</ul>
								</div>

								{/* Visual side */}
								<IndustryVisual visual={industry.visual} />
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
