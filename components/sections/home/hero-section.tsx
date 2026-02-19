"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Clock, Users } from "lucide-react";
import { motion } from "motion/react";

const trustStats = [
	{ icon: Users, value: "250M+", label: "Consumer panel" },
	{ icon: Clock, value: "48 hrs", label: "Avg. turnaround" },
	{ icon: ShieldCheck, value: "SOC 2", label: "Certified" },
];

export function HeroSection() {
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
							New
						</span>
						AI-Powered Market Research Platform
					</motion.div>

					{/* Headline */}
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="text-4xl font-extrabold leading-[1.08] tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl"
					>
						Validate Before
						<br /> You Invest.{" "}
						<span className="text-primary">
							Launch
							<br /> With Confidence.
						</span>
					</motion.h1>

					{/* Subheadline */}
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base"
					>
						MerkMetryx delivers AI-powered market research that transforms raw
						consumer data into strategic decisions — assessing demand,
						feasibility, and viability before capital is committed.
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

					{/* Trust stats */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.45 }}
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

				{/* ── Right column: video ── */}
				<motion.div
					initial={{ opacity: 0, x: 40 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.7, delay: 0.4 }}
					className="relative flex items-center"
				>
					{/* Glow behind video */}
					<div className="pointer-events-none absolute inset-0 rounded-3xl bg-primary/8 blur-2xl" />

					<div className="relative w-full overflow-hidden rounded-2xl border border-border/40 shadow-2xl shadow-primary/10 sm:rounded-3xl">
						<video
							autoPlay
							loop
							muted
							playsInline
							className="h-auto w-full object-cover"
						>
							<source src="/hero.mp4" type="video/mp4" />
						</video>

						{/* Floating badge overlay */}
						<div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-border/30 bg-background/80 px-4 py-2.5 backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-5">
							<div>
								<p className="text-xs font-semibold text-foreground">
									Real-time Intelligence
								</p>
								<p className="text-[10px] text-muted-foreground">
									Live dashboard · 500+ data sources
								</p>
							</div>
							<span className="flex items-center gap-1.5 text-[10px] font-semibold text-primary">
								<span className="inline-block size-1.5 rounded-full bg-green-500 animate-pulse" />
								Live
							</span>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
