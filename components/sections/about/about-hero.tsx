"use client";

import { motion } from "motion/react";
import { Users, Globe, Award } from "lucide-react";

const trustStats = [
	{ icon: Users, value: "Senior Team", label: "Expert consultants" },
	{ icon: Globe, value: "50+ Countries", label: "Global reach" },
	{ icon: Award, value: "Agency-Level", label: "Research rigor" },
];

export function AboutHero() {
	return (
		<section className="relative min-h-screen overflow-hidden px-4 pt-24 pb-12 sm:px-6 sm:pt-28 md:px-10 md:pt-32 lg:px-16">
			{/* Background gradient blobs */}
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute left-1/4 top-1/3 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/6 blur-3xl" />
				<div className="absolute right-1/4 bottom-1/4 h-100 w-100 rounded-full bg-primary/4 blur-3xl" />
			</div>

			<div className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
				{/* ── Left column: text content ── */}
				<div className="flex flex-col justify-center">
					{/* Badge */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-[10px] text-muted-foreground backdrop-blur-sm sm:px-4 sm:py-1.5 sm:text-xs"
					>
						<span className="rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-semibold text-primary-foreground sm:px-2 sm:text-[10px]">
							About
						</span>
						MerkMetryx
					</motion.div>

					{/* Headline */}
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="text-4xl font-extrabold leading-[1.08] tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl"
					>
						Driving the businesses{" "}
						<span className="text-primary">
							that shape
							<br /> the future.
						</span>
					</motion.h1>

					{/* Subheadline */}
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base"
					>
						MerkMetryx is built on a foundation of human expertise and
						evidence-based methodology. We combine senior research consultants
						with AI-powered technology to deliver the strategic intelligence
						that validates your next move.
					</motion.p>

					{/* Trust stats */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="mt-10 flex flex-wrap gap-5"
					>
						{trustStats.map((stat, i) => {
							const Icon = stat.icon;
							return (
								<div key={i} className="flex items-center gap-2">
									<div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
										<Icon className="size-3.5 text-primary" />
									</div>
									<div>
										<p className="text-sm font-bold text-foreground">
											{stat.value}
										</p>
										<p className="text-[10px] text-muted-foreground sm:text-xs">
											{stat.label}
										</p>
									</div>
								</div>
							);
						})}
					</motion.div>
				</div>

				{/* ── Right column: visual ── */}
				<motion.div
					initial={{ opacity: 0, x: 40 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.7, delay: 0.4 }}
					className="relative flex items-center"
				>
					{/* Glow behind visual */}
					<div className="pointer-events-none absolute inset-0 rounded-3xl bg-primary/8 blur-2xl" />

					<div className="relative w-full overflow-hidden rounded-2xl border border-border/40 bg-card p-12 shadow-2xl shadow-primary/10 sm:rounded-3xl sm:p-16">
						{/* Team visualization placeholder */}
						<div className="flex flex-col items-center justify-center text-center">
							<div className="mb-6 inline-flex size-20 items-center justify-center rounded-2xl bg-primary/10">
								<Users className="size-10 text-primary" />
							</div>
							<h3 className="text-xl font-extrabold text-foreground sm:text-2xl">
								Expert-Backed Research
							</h3>
							<p className="mt-2 text-sm text-muted-foreground">
								Senior consultants and AI researchers bringing agency-level
								rigor to every engagement
							</p>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
