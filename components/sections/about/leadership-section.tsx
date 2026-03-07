"use client";

import { motion } from "motion/react";
import { BrainCircuit, Users, Microscope, ShieldCheck } from "lucide-react";

const expertise = [
	{
		icon: Users,
		title: "Senior Research Consultants",
		description:
			"Decades of qualitative and quantitative methodology experience. Our consultants bring the rigor of top-tier agencies to every research brief.",
	},
	{
		icon: BrainCircuit,
		title: "AI & ML Researchers",
		description:
			"Cutting-edge machine learning and NLP innovation. Our research team continuously improves the platform's predictive capabilities and bias detection systems.",
	},
	{
		icon: Microscope,
		title: "Industry Specialists",
		description:
			"Domain experts across retail, healthcare, technology, and finance. They translate raw data into strategic insights that align with sector-specific challenges.",
	},
	{
		icon: ShieldCheck,
		title: "Quality Assurance Team",
		description:
			"Ensuring enterprise-grade data validation and bias detection. Every dataset, every model output, every insight is vetted before it reaches you.",
	},
];

export function LeadershipSection() {
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
						Leadership & Team Experts
					</p>
					<h2 className="mt-2 max-w-2xl text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
						A carefully selected network of senior consultants and AI
						researchers.
					</h2>
					<p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
						While the platform leverages automation, its foundations are built
						on decades of human expertise in both qualitative and quantitative
						research methodologies. The narrative reinforces that technology
						enhances insight — but expert judgment guides it.
					</p>
				</motion.div>

				{/* 2x2 Grid */}
				<div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
					{expertise.map((expert, i) => {
						const Icon = expert.icon;
						return (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: i * 0.1 }}
								className="rounded-2xl border border-border/40 bg-card p-6 sm:rounded-3xl sm:p-8"
							>
								<div className="mb-4 inline-flex items-center justify-center rounded-xl bg-primary/10 p-3">
									<Icon className="size-6 text-primary" />
								</div>
								<h3 className="text-base font-bold text-foreground sm:text-lg">
									{expert.title}
								</h3>
								<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
									{expert.description}
								</p>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
