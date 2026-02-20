"use client";

import { motion } from "motion/react";
import { Cpu, Zap, BarChart3, Target } from "lucide-react";

const differentiators = [
	{
		icon: Cpu,
		number: "01",
		title: "Technology Enhances, Experts Guide",
		description:
			"Our automation handles the heavy lifting, but human expertise validates every strategic insight. You get platform speed with agency-level quality control.",
	},
	{
		icon: Zap,
		number: "02",
		title: "Agency-Level Rigor, Platform Speed",
		description:
			"The thoroughness of a consulting firm with the turnaround of modern software. No trade-offs between quality and velocity.",
	},
	{
		icon: BarChart3,
		number: "03",
		title: "Evidence-Based Authority",
		description:
			"Every recommendation is backed by statistically robust methodologies, not guesswork. We provide the evidence you need to defend strategic decisions.",
	},
	{
		icon: Target,
		number: "04",
		title: "Built for Decision-Makers",
		description:
			"Designed for the strategists, CMOs, and analysts who carry the weight of go/no-go decisions. We deliver clarity when stakes are high.",
	},
];

export function DifferentiationSection() {
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
						What Sets Us Apart
					</p>
					<h2 className="mt-2 max-w-2xl text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
						How MerkMetryx is different from traditional research firms.
					</h2>
				</motion.div>

				{/* 2x2 Grid */}
				<div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
					{differentiators.map((item, i) => {
						const Icon = item.icon;
						return (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: i * 0.1 }}
								className="relative rounded-2xl border border-border/40 bg-card p-6 sm:rounded-3xl sm:p-8"
							>
								{/* Watermark number */}
								<div className="absolute right-4 top-4 text-6xl font-extrabold text-primary/5 sm:right-6 sm:top-6 sm:text-7xl">
									{item.number}
								</div>

								<div className="relative">
									<div className="mb-4 inline-flex items-center justify-center rounded-xl bg-primary/10 p-3">
										<Icon className="size-6 text-primary" />
									</div>
									<h3 className="text-base font-bold text-foreground sm:text-lg">
										{item.title}
									</h3>
									<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
										{item.description}
									</p>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
