"use client";

import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import { comparisonFeatures } from "@/lib/pricing-data";
import { cn } from "@/lib/utils";

export function PricingComparisonTableSection() {
	return (
		<section className="bg-card/40 px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16">
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
						Detailed Comparison
					</p>
					<h2 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
						Compare every feature across all plans.
					</h2>
					<p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
						Make an informed decision with our transparent feature breakdown.
					</p>
				</motion.div>

				{/* Table container with horizontal scroll */}
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="overflow-x-auto rounded-2xl border border-border/40 bg-card shadow-sm"
				>
					<table className="w-full border-collapse">
						<thead>
							<tr className="border-b border-border/40 bg-primary/5">
								<th className="sticky left-0 z-10 bg-primary/5 px-4 py-4 text-left text-xs font-bold uppercase tracking-wide text-foreground sm:px-6 sm:text-sm">
									Feature / Plan
								</th>
								<th className="min-w-[140px] px-4 py-4 text-center text-xs font-bold uppercase tracking-wide text-foreground sm:min-w-[160px] sm:px-6 sm:text-sm">
									Basic
								</th>
								<th className="min-w-[140px] bg-primary/8 px-4 py-4 text-center text-xs font-bold uppercase tracking-wide text-foreground sm:min-w-[160px] sm:px-6 sm:text-sm">
									<div className="flex flex-col items-center gap-1">
										<span>Growth</span>
										<span className="rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-foreground">
											Popular
										</span>
									</div>
								</th>
								<th className="min-w-[140px] px-4 py-4 text-center text-xs font-bold uppercase tracking-wide text-foreground sm:min-w-[160px] sm:px-6 sm:text-sm">
									Professional
								</th>
								<th className="min-w-[140px] px-4 py-4 text-center text-xs font-bold uppercase tracking-wide text-foreground sm:min-w-[160px] sm:px-6 sm:text-sm">
									Enterprise
								</th>
							</tr>
						</thead>
						<tbody>
							{comparisonFeatures.map((feature, i) => (
								<tr
									key={i}
									className="border-b border-border/20 transition-colors hover:bg-muted/20"
								>
									<td className="sticky left-0 z-10 bg-card px-4 py-3.5 text-left text-xs font-medium text-foreground sm:px-6 sm:text-sm">
										{feature.feature}
									</td>
									<td className="px-4 py-3.5 text-center sm:px-6">
										{renderCell(feature.basic)}
									</td>
									<td className="bg-primary/5 px-4 py-3.5 text-center sm:px-6">
										{renderCell(feature.growth)}
									</td>
									<td className="px-4 py-3.5 text-center sm:px-6">
										{renderCell(feature.professional)}
									</td>
									<td className="px-4 py-3.5 text-center sm:px-6">
										{renderCell(feature.enterprise)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</motion.div>

				{/* Mobile scroll hint */}
				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mt-4 text-center text-xs text-muted-foreground sm:hidden"
				>
					← Scroll horizontally to see all plans →
				</motion.p>
			</div>
		</section>
	);
}

// Helper function to render cell content based on value type
function renderCell(value: string | boolean) {
	if (typeof value === "boolean") {
		return value ? (
			<Check className="mx-auto size-5 text-primary" />
		) : (
			<p className="text-primary font-extrabold" >—</p>
		);
	}

	// Handle "Yes" and "No" strings
	if (value.toLowerCase() === "yes") {
		return <Check className="mx-auto size-5 text-primary" />;
	}
	if (value.toLowerCase() === "no") {
		return <X className="mx-auto size-5 text-muted-foreground/40" />;
	}

	// Render text content
	return (
		<span className="text-xs text-foreground sm:text-sm">{value}</span>
	);
}
