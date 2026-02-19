"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const pillars = [
	{ value: "500+", label: "Data sources" },
	{ value: "250M+", label: "Consumer panel" },
	{ value: "48 hrs", label: "Avg. delivery" },
	{ value: "97%", label: "Accuracy rate" },
];

export function ProductHero() {
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
						Platform
					</span>
					AI-Powered Market Research Infrastructure
				</motion.div>

				{/* Headline */}
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
				>
					The Intelligence
					<br />
					Platform Built for{" "}
					<span className="text-primary">Strategic Decisions.</span>
				</motion.h1>

				{/* Sub */}
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
				>
					MerkMetryx combines a 250M+ consumer panel, enterprise-grade AI, and
					end-to-end research support into one platform — from self-serve surveys
					to full-service market intelligence programmes.
				</motion.p>

				{/* CTAs */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4"
				>
					<Link href="/contact">
						<Button
							size="lg"
							className="w-full rounded-xl px-8 text-sm font-medium sm:w-auto"
						>
							Request a Demo
							<ArrowRight className="ml-1 size-4" />
						</Button>
					</Link>
					<Link href="/contact">
						<Button
							variant="outline"
							size="lg"
							className="w-full rounded-xl px-8 text-sm font-medium sm:w-auto"
						>
							<Play className="mr-1 size-4" />
							Watch Platform Tour
						</Button>
					</Link>
				</motion.div>

				{/* Pillar stats */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.45 }}
					className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4"
				>
					{pillars.map((p, i) => (
						<div
							key={i}
							className="rounded-2xl border border-border/40 bg-card px-5 py-4 text-center"
						>
							<p className="text-2xl font-extrabold text-primary sm:text-3xl">
								{p.value}
							</p>
							<p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
								{p.label}
							</p>
						</div>
					))}
				</motion.div>

				<Separator className="mt-16" />
			</div>
		</section>
	);
}
