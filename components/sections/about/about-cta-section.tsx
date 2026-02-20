"use client";

import { motion } from "motion/react";
import { ArrowRight, CalendarDays } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AboutCtaSection() {
	return (
		<section className="px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16">
			<div className="mx-auto max-w-7xl">
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="relative overflow-hidden rounded-2xl bg-primary px-6 py-12 sm:rounded-3xl sm:px-12 sm:py-16 md:px-16 md:py-20"
				>
					{/* Background orbs */}
					<div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-white/5 blur-3xl" />
					<div className="pointer-events-none absolute -bottom-16 -left-16 size-64 rounded-full bg-white/5 blur-3xl" />

					<div className="relative grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
						{/* Left — copy */}
						<div>
							<p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/70 sm:text-sm">
								Ready to work with us
							</p>
							<h2 className="mt-2 text-2xl font-extrabold leading-snug tracking-tight text-primary-foreground sm:text-3xl md:text-4xl">
								Join the companies making strategic decisions backed by
								evidence.
							</h2>
							<p className="mt-4 text-sm leading-relaxed text-primary-foreground/75 sm:text-base">
								Whether you're validating a new product, entering a market, or
								tracking brand health — MerkMetryx delivers the intelligence you
								need before you commit resources.
							</p>

							{/* Trust signals */}
							<div className="mt-6 flex flex-wrap gap-4 text-xs text-primary-foreground/70 sm:text-sm">
								<span>✓ No-obligation consultation</span>
								<span>✓ 48-hour turnaround</span>
								<span>✓ Evidence-based insights</span>
							</div>
						</div>

						{/* Right — actions */}
						<div className="flex flex-col gap-4">
							<Link href="/contact">
								<Button
									size="lg"
									variant="secondary"
									className="w-full rounded-xl font-medium"
								>
									<CalendarDays className="mr-1 size-4" />
									Request Consultation
									<ArrowRight className="ml-1 size-4" />
								</Button>
							</Link>
							<Link href="/solutions">
								<Button
									size="lg"
									className="w-full rounded-xl border border-primary-foreground/20 bg-transparent font-medium text-primary-foreground hover:bg-primary-foreground/10"
								>
									See Our Work
								</Button>
							</Link>
							<p className="text-center text-xs text-primary-foreground/50">
								Trusted by 500+ strategy teams in 50+ countries.
							</p>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
