"use client";

import { motion } from "motion/react";
import { Database, Cpu, BrainCircuit, BarChart3 } from "lucide-react";

const steps = [
	{
		icon: Database,
		number: "01",
		title: "Data Collection & Integration",
		description:
			"We gather intelligence from hundreds of sources simultaneously — social media, transactional records, web panels, and proprietary databases — giving you a true 360-degree view of your market.",
	},
	{
		icon: Cpu,
		number: "02",
		title: "Automated Processing & Cleaning",
		description:
			"Our AI automatically removes duplicates, normalises formats, and fills missing entries using predictive algorithms, ensuring every dataset meets enterprise-grade quality standards before analysis begins.",
	},
	{
		icon: BrainCircuit,
		number: "03",
		title: "NLP & ML Insight Extraction",
		description:
			"Advanced Natural Language Processing uncovers the sentiment and themes hidden inside open-text responses, surfacing the 'why' behind consumer behaviour beyond what any survey score can reveal.",
	},
	{
		icon: BarChart3,
		number: "04",
		title: "Visualisation & Actionable Reporting",
		description:
			"Findings are delivered as human-friendly dashboards and presentation-ready reports that highlight anomalies, forecast risks, and recommend precise strategic next steps — ready for the boardroom.",
	},
];

export function HowItWorksSection() {
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
						Our Methodology
					</p>
					<h2 className="mt-2 max-w-2xl text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
						From raw data to strategic decisions — in four steps.
					</h2>
					<p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
						Every MerkMetryx engagement follows a rigorous, AI-powered research
						pipeline engineered for speed, accuracy, and actionability.
					</p>
				</motion.div>

				{/* Steps */}
				<div className="grid gap-4 sm:gap-6 md:grid-cols-2">
					{steps.map((step, i) => {
						const Icon = step.icon;
						return (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: i * 0.1 }}
								className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card p-6 sm:rounded-3xl sm:p-8"
							>
								{/* Step number watermark */}
								<span className="pointer-events-none absolute right-4 top-3 select-none text-6xl font-black text-border/60 sm:right-6 sm:top-4 sm:text-8xl">
									{step.number}
								</span>

								<div className="relative">
									<div className="mb-4 inline-flex items-center justify-center rounded-xl bg-primary/10 p-3">
										<Icon className="size-5 text-primary sm:size-6" />
									</div>
									<h3 className="text-base font-bold text-foreground sm:text-lg">
										{step.title}
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
										{step.description}
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
