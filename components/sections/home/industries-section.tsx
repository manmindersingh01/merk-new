"use client";

import { motion } from "motion/react";
import { ShoppingCart, Stethoscope, Monitor, ArrowRight } from "lucide-react";
import Link from "next/link";

const industries = [
	{
		icon: ShoppingCart,
		name: "Retail & Consumer Goods",
		description:
			"From merchandising strategy to omnichannel CX, we help retailers unhook growth from physical footprint and understand the shifting loyalty landscape.",
		stats: [
			{ value: "25%", label: "Average loyalty uplift" },
			{ value: "3×", label: "Faster trend detection" },
		],
		useCases: [
			"Product assortment optimisation",
			"Price sensitivity & demand forecasting",
			"In-store vs. digital experience benchmarking",
			"Sustainability preference mapping",
		],
	},
	{
		icon: Stethoscope,
		name: "Healthcare & Pharmaceuticals",
		description:
			"In the most regulated industry in the world, we help organisations build consumer-first strategies, map the patient journey, and navigate fragmentation.",
		stats: [
			{ value: "HIPAA", label: "Compliant data handling" },
			{ value: "360°", label: "Patient journey view" },
		],
		useCases: [
			"Patient experience research",
			"Treatment adherence drivers",
			"Healthcare consumer centralisation",
			"Competitor product launch monitoring",
		],
	},
	{
		icon: Monitor,
		name: "Technology & SaaS",
		description:
			"In a landscape shaped by edge computing and AI disruption, we provide the competitive benchmarking and concept validation that keeps innovators ahead.",
		stats: [
			{ value: "Real-time", label: "Sentiment monitoring" },
			{ value: "50+", label: "Tech verticals covered" },
		],
		useCases: [
			"Product-market fit validation",
			"Feature prioritisation research",
			"Disruptor tracking & benchmarking",
			"Developer and enterprise buyer insights",
		],
	},
];

export function IndustriesSection() {
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
						Industry Expertise
					</p>
					<h2 className="mt-2 max-w-2xl text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
						Deep sector knowledge. Precise market intelligence.
					</h2>
					<p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
						We don&apos;t offer generic research. Our methodologies are calibrated
						to the specific dynamics, regulations, and buyer behaviours of your
						industry.
					</p>
				</motion.div>

				{/* Industry cards */}
				<div className="grid gap-6 lg:grid-cols-3">
					{industries.map((industry, i) => {
						const Icon = industry.icon;
						return (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: i * 0.12 }}
								className="flex flex-col rounded-2xl border border-border/40 bg-card p-6 sm:rounded-3xl sm:p-8"
							>
								{/* Icon */}
								<div className="mb-4 inline-flex items-center justify-center rounded-xl bg-primary/10 p-3 self-start">
									<Icon className="size-5 text-primary sm:size-6" />
								</div>

								{/* Name + description */}
								<h3 className="text-base font-bold text-foreground sm:text-lg">
									{industry.name}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
									{industry.description}
								</p>

								{/* Stats row */}
								<div className="mt-5 flex gap-4 rounded-xl bg-primary/5 px-4 py-3">
									{industry.stats.map((stat, j) => (
										<div key={j} className="flex-1">
											<p className="text-lg font-extrabold text-primary sm:text-xl">
												{stat.value}
											</p>
											<p className="text-xs text-muted-foreground">{stat.label}</p>
										</div>
									))}
								</div>

								{/* Use cases */}
								<ul className="mt-5 flex flex-col gap-2">
									{industry.useCases.map((uc, j) => (
										<li
											key={j}
											className="flex items-start gap-2.5 text-sm text-foreground"
										>
											<span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
											{uc}
										</li>
									))}
								</ul>

								<Link
									href="/solutions"
									className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-opacity hover:opacity-75 sm:text-sm"
								>
									Explore {industry.name.split("&")[0].trim()} solutions{" "}
									<ArrowRight className="size-3.5" />
								</Link>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
