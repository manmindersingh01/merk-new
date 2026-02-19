"use client";

import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";

export function SolutionsHero() {
	return (
		<section className="relative overflow-hidden px-4 pt-28 pb-20 sm:px-6 md:px-10 md:pt-36 lg:px-16 mt-14">
			{/* Background radial glow */}
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute left-1/2 top-1/3 h-137.5 w-137.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
			</div>

			<div className="relative mx-auto max-w-6xl">
				{/* Headline */}
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-8xl leading-1.1"
				>
					Solutions Built Around{" "}
					<span className="text-primary">Your Business Reality</span>
				</motion.h1>

				{/* Supporting paragraph */}
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
				>
					Explore research frameworks tailored to your industry, business stage,
					and strategic objectives — from concept validation to market
					expansion.
				</motion.p>

				{/* Navigation chips */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="mt-10 flex flex-wrap gap-4"
				>
					<div className="rounded-full bg-primary/10 px-6 py-3 text-sm font-medium text-primary">
						By Industry
					</div>
					<div className="rounded-full bg-primary/10 px-6 py-3 text-sm font-medium text-primary">
						By Business Stage
					</div>
					<div className="rounded-full bg-primary/10 px-6 py-3 text-sm font-medium text-primary">
						By Strategic Use Case
					</div>
				</motion.div>
				<Separator className="mt-14" />
			</div>
		</section>
	);
}
