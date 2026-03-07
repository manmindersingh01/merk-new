"use client";

import { motion } from "motion/react";

const stats = [
	{
		value: "250M+",
		label: "Global Consumer Panel",
		description: "Verified respondents across 50+ countries and territories",
	},
	{
		value: "500+",
		label: "Research Projects",
		description: "Delivered across enterprise clients in multiple sectors",
	},
	{
		value: "48 hrs",
		label: "Avg. Turnaround",
		description:
			"From brief to actionable insights — without compromising rigor",
	},
	{
		value: "97%",
		label: "Data Accuracy",
		description: "AI-validated with quality controls and bias detection",
	},
];

export function PlatformStatsSection() {
	return (
		<section className="bg-card/40 px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16">
			<div className="mx-auto max-w-7xl">
				<div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
					{stats.map((stat, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: i * 0.1 }}
							className="rounded-2xl border border-border/40 bg-card px-5 py-7 sm:rounded-3xl sm:px-6 sm:py-8"
						>
							<p className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl md:text-5xl">
								{stat.value}
							</p>
							<p className="mt-2 text-sm font-semibold text-foreground sm:text-base">
								{stat.label}
							</p>
							<p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
								{stat.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
