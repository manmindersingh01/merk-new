"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { valueProps } from "@/lib/pricing-data";

export function PricingValuePropsSection() {
	return (
		<section className="px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16">
			<div className="mx-auto max-w-4xl">
				{/* Heading */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="mb-12 text-center sm:mb-16"
				>
					<p className="text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">
						Why Us
					</p>
					<h2 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
						Why Organizations Choose MerkMetryx
					</h2>
				</motion.div>

				{/* Value props grid */}
				<div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
					{valueProps.map((prop, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: i * 0.1 }}
							className="flex items-start gap-3 rounded-xl border border-border/40 bg-card p-5 transition-shadow hover:shadow-md sm:p-6"
						>
							<div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
								<Check className="size-3.5 text-primary" />
							</div>
							<p className="text-sm leading-relaxed text-foreground sm:text-base">
								{prop}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
