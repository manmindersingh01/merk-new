"use client";

import { motion } from "motion/react";

export function CareersHero() {
	return (
		<section className="relative overflow-hidden px-4 pt-28 pb-20 sm:px-6 md:px-10 md:pt-36 lg:px-16 mt-14">
			{/* Background glow */}
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute left-1/2 top-1/3 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
			</div>

			<div className="relative mx-auto max-w-6xl text-center">
				{/* Eyebrow */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mb-6 inline-flex items-center gap-2 rounded-full bg-card/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-sm"
				>
					<span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
						Careers
					</span>
					Build the Future of Market Intelligence
				</motion.div>

				{/* Headline */}
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
				>
					Work on Problems that{" "}
					<span className="text-primary">Shape Markets.</span>
				</motion.h1>

				{/* Sub text */}
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
				>
					At MerkMetryx, we transform complex data into insights that guide
					product innovation, market strategy, and business growth. Join a team
					of analysts, researchers, and builders shaping the future of market
					intelligence.
				</motion.p>

				{/* CTA buttons */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
				>
					<button className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
						View Open Positions
					</button>

					<button className="rounded-lg bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted">
						Learn About Our Team
					</button>
				</motion.div>
			</div>
		</section>
	);
}