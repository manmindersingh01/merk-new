"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CareersSection() {
	return (
		<section className="bg-card/40 px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16">
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

					<div className="relative mx-auto max-w-3xl text-center">
						<p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/70 sm:text-sm">
							Careers & Culture
						</p>
						<h2 className="mt-2 text-2xl font-extrabold leading-snug tracking-tight text-primary-foreground sm:text-3xl md:text-4xl">
							We seek individuals who do not simply follow trends, but define
							them.
						</h2>
						<p className="mt-4 text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
							The careers philosophy reflects the platform&apos;s automation-driven
							mission: minimizing repetitive human labor so teams can focus more
							on meaningful work, creativity, and real-world impact.
						</p>
						<p className="mt-3 text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
							If you&apos;re drawn to strategic problem-solving, evidence-based
							decision-making, and building tools that empower others — you
							belong here.
						</p>

						<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
							<Link href="/contact">
								<Button
									size="lg"
									variant="secondary"
									className="w-full rounded-xl font-medium sm:w-auto"
								>
									View Open Positions
									<ArrowRight className="ml-1 size-4" />
								</Button>
							</Link>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
