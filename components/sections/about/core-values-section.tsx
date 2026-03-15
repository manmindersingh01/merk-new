"use client";

import { motion } from "motion/react";
import { Lightbulb, ShieldCheck, TrendingUp } from "lucide-react";

const values = [
	{
		icon: Lightbulb,
		title: "Innovation without compromise",
		description:
			"We push boundaries in research technology while maintaining the highest standards of methodological rigor. Innovation doesn't mean shortcuts — it means finding better ways to deliver evidence-based intelligence.",
	},
	{
		icon: ShieldCheck,
		title: "Integrity in data quality",
		description:
			"Every data point is validated, every methodology is transparent, and every insight is earned through evidence. We don't cut corners when accuracy matters — and accuracy always matters.",
	},
	{
		icon: TrendingUp,
		title: "Commitment to helping people realize their full potential",
		description:
			"We empower teams and businesses to make strategic decisions with confidence. Our mission isn't just to deliver reports — it's to enable growth, validate vision, and support the success of those who trust us.",
	},
];

export function CoreValuesSection() {
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
						Core Values
					</p>
					<h2 className="mt-2 max-w-2xl text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
						The principles that guide everything we do.
					</h2>
					<p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
						These aren&apos;t aspirational statements — they&apos;re the standards we hold
						ourselves to on every engagement, every analysis, every insight.
					</p>
				</motion.div>

				{/* Grid */}
				<div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
					{values.map((value, i) => {
						const Icon = value.icon;
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
									{value.title}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
									{value.description}
								</p>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
