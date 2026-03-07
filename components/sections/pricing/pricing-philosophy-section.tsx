"use client";

import { motion } from "motion/react";
import { TrendingUp, DollarSign, Zap, Shield } from "lucide-react";
import Image from "next/image";

const principles = [
	{
		icon: TrendingUp,
		title: "Usage-Based Value",
		description:
			"Cost scales directly with research volume—no surprise charges",
	},
	{
		icon: DollarSign,
		title: "Transparent Pricing",
		description: "Clear, upfront costs with visibility into every survey",
	},
	{
		icon: Zap,
		title: "No Lock-In",
		description:
			"Monthly plans for flexibility. Upgrade, downgrade, or pause anytime",
	},
	{
		icon: Shield,
		title: "Volume Discounts",
		description:
			"The more you research, the more you save—rewarding strategic insight",
	},
];

export function PricingPhilosophySection() {
	return (
		<section className="px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16">
			<div className="mx-auto max-w-7xl">
				{/* Heading */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="mb-12 text-center sm:mb-16"
				>
					<p className="text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">
						Our Philosophy
					</p>
					<h2 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
						Built for growth, not penalties.
					</h2>
					<p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
						Our pricing aligns with your success. Scale without worry—we grow
						with you, not at your expense.
					</p>
				</motion.div>

				{/* Principles grid */}
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{principles.map((principle, i) => {
						const Icon = principle.icon;
						return (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: i * 0.1 }}
								className="rounded-2xl border border-border/40 bg-card p-6"
							>
								<div className="mb-4 inline-flex items-center justify-center rounded-xl bg-primary/10 p-3">
									<Icon className="size-5 text-primary sm:size-6" />
								</div>
								<h3 className="text-base font-bold text-foreground sm:text-lg">
									{principle.title}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
									{principle.description}
								</p>
							</motion.div>
						);
					})}
				</div>

				{/* Philosophy in Action */}
				<motion.div
					initial={{ opacity: 0, y: 32 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.5 }}
					className="mt-20 sm:mt-28"
				>
					<div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
						{/* Text Column */}
						<div>
							<p className="text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">
								Fair & Transparent
							</p>
							<h3 className="mt-2 text-xl font-extrabold leading-snug text-foreground sm:text-2xl md:text-3xl">
								Pay for insights, not bureaucracy. Scale without penalties.
							</h3>
							<p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
								Traditional research firms lock you into annual contracts,
								charge per-seat, and surprise you with scope creep fees.
								MerkMetryx operates differently. You pay only for the research
								volume you consume — no hidden fees, no surprise charges, no
								vendor lock-in.
							</p>
							<p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
								Start small with 1,000 responses per month. Scale to enterprise
								volumes as your needs grow. Upgrade, downgrade, or pause
								anytime. Our pricing grows with your success — never against it.
							</p>
						</div>

						{/* Image Column */}
						<div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl">
							<Image
								src="/pricing-philosophy.png"
								alt="MerkMetryx pricing philosophy showing transparent, usage-based value model"
								width={1920}
								height={1080}
								className="w-full h-auto"
								priority={false}
							/>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
