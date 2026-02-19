"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function HeroSection() {
	return (
		<section className="relative overflow-hidden px-4 pt-24 pb-12 sm:px-6 sm:pt-28 sm:pb-16 md:px-10 md:pt-36 lg:px-16">
			{/* Subtle background gradient */}
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute left-1/2 top-1/3 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
			</div>

			{/* Hero text content */}
			<div className="relative mx-auto max-w-7xl text-left">
				{/* Badge */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-1 text-[10px] text-muted-foreground backdrop-blur-sm sm:mb-8 sm:px-4 sm:py-1.5 sm:text-xs"
				>
					<span className="rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-semibold text-primary-foreground sm:px-2 sm:text-[10px]">
						New
					</span>
					Market Research & Validation Firm
				</motion.div>

				{/* Headline */}
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="text-3xl font-extrabold leading-[1.1] tracking-tighter text-foreground sm:text-5xl md:text-7xl md:leading-28 lg:text-8xl xl:text-9xl"
				>
					Validate Before
					<br className="sm:hidden" /> You Invest.{" "}
					<span className="text-primary">
						Launch
						<br className="hidden sm:block" /> With Confidence.
					</span>
				</motion.h1>

				{/* Subheadline — visible on mobile for context */}
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:max-w-lg sm:text-base"
				>
					Assess demand, feasibility, and market viability — before capital is
					committed.
				</motion.p>

				{/* CTAs */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
					className="mt-6 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4"
				>
					<Link href="/contact">
						<Button
							size="lg"
							className="w-full rounded-xl px-8 text-sm font-medium sm:w-auto"
						>
							Request a Consultation
							<ArrowRight className="ml-1 size-4" />
						</Button>
					</Link>
					<Link href="/product">
						<Button
							variant="outline"
							size="lg"
							className="w-full rounded-xl px-8 text-sm font-medium sm:w-auto"
						>
							See How It Works
						</Button>
					</Link>
				</motion.div>
			</div>

			{/* Hero video */}
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, delay: 0.5 }}
				className="relative mx-auto mt-10 max-w-7xl sm:mt-20"
			>
				<div className="overflow-hidden rounded-2xl border border-border/40 sm:rounded-3xl">
					<video
						autoPlay
						loop
						muted
						playsInline
						className="h-auto w-full object-cover"
					>
						<source src="/hero.mp4" type="video/mp4" />
					</video>
				</div>
			</motion.div>
		</section>
	);
}
