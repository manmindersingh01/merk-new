"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";

export function PricingHeroSection() {
	return (
		<section className="relative overflow-hidden px-4 pt-28 pb-20 sm:px-6 md:px-10 md:pt-36 lg:px-16 mt-14">
			{/* Background glow */}
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute left-1/2 top-1/3 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
			</div>

			<div className="relative mx-auto max-w-6xl">
				{/* Eyebrow */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-sm"
				>
					<span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
						Transparent Pricing
					</span>
					Good, Better, Best Model
				</motion.div>

				{/* Headline */}
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
				>
					Budget Clarity.
					<br />
					<span className="text-primary">Scalability Assurance.</span>
				</motion.h1>

				{/* Description */}
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
				>
					Our pricing is built on the Good, Better, Best (GBB) model — a proven
					tiered structure for SaaS organizations. Choose the plan that fits
					your current needs, and scale seamlessly as your research volume
					grows.
				</motion.p>

				{/* Philosophy statement */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-4"
				>
					<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
						<svg
							className="size-5 text-primary"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
							/>
						</svg>
					</div>
					<p className="text-sm font-medium text-foreground">
						<span className="font-semibold text-primary">
							You should not be penalized for growth.
						</span>{" "}
						Cost aligns directly with the value you receive.
					</p>
				</motion.div>

				{/* Trust badges */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
					className="mt-10 flex flex-wrap items-center gap-4"
				>
					<Badge variant="outline" className="px-3 py-1.5 text-xs">
						SOC 2 Certified
					</Badge>
					<Badge variant="outline" className="px-3 py-1.5 text-xs">
						GDPR Compliant
					</Badge>
					<Badge variant="outline" className="px-3 py-1.5 text-xs">
						No Hidden Fees
					</Badge>
				</motion.div>
			</div>
		</section>
	);
}
