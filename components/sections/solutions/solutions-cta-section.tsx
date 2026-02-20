"use client";

import { motion } from "motion/react";
import { ArrowRight, CalendarDays } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SolutionsCtaSection() {
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

					<div className="relative text-center">
						{/* Copy */}
						<div className="mx-auto max-w-2xl">
							<p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/70 sm:text-sm">
								Ready to Get Started?
							</p>
							<h2 className="mt-2 text-2xl font-extrabold leading-snug tracking-tight text-primary-foreground sm:text-3xl md:text-4xl">
								See How MerkMetryx Solves Your Specific Challenges
							</h2>
							<p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-primary-foreground/75 sm:text-base">
								Schedule a personalized demo to explore solutions tailored for
								your industry and role. Discover how our platform can deliver the
								insights you need to make strategic decisions with confidence.
							</p>
						</div>

						{/* CTA Button */}
						<div className="mt-8 flex justify-center">
							<Link href="/contact">
								<Button
									size="lg"
									variant="secondary"
									className="rounded-xl px-8 font-medium"
								>
									<CalendarDays className="mr-1 size-4" />
									Book a Personalized Demo
									<ArrowRight className="ml-1 size-4" />
								</Button>
							</Link>
						</div>

						{/* Trust signal */}
						<p className="mt-6 text-xs text-primary-foreground/50">
							No-obligation consultation • Results within 48 hours
						</p>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
