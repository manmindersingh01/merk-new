"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays } from "lucide-react";

const proofPoints = [
	"No-obligation 30-minute demo",
	"Live walkthrough of your industry use case",
	"Sample report from a comparable project",
	"Transparent pricing with no hidden fees",
];

export function ProductCtaSection() {
	return (
		<section className="px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16">
			<div className="mx-auto max-w-6xl">
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="relative overflow-hidden rounded-2xl bg-primary px-6 py-14 sm:rounded-3xl sm:px-12 sm:py-16 md:px-16 md:py-20"
				>
					{/* Orbs */}
					<div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-white/5 blur-3xl" />
					<div className="pointer-events-none absolute -bottom-20 -left-20 size-72 rounded-full bg-white/5 blur-3xl" />

					<div className="relative grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
						{/* Left */}
						<div>
							<p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60 sm:text-sm">
								See it in action
							</p>
							<h2 className="mt-2 text-2xl font-extrabold leading-snug tracking-tight text-primary-foreground sm:text-3xl md:text-4xl">
								Watch the platform work
								<br />
								on your real use case.
							</h2>
							<p className="mt-4 text-sm leading-relaxed text-primary-foreground/75 sm:text-base">
								Book a personalised demo and our research team will walk you
								through exactly how MerkMetryx addresses your specific industry,
								audience, and research objectives — with sample data from a real
								comparable project.
							</p>
							{/* Proof points */}
							<ul className="mt-6 flex flex-col gap-2.5">
								{proofPoints.map((pt, i) => (
									<li
										key={i}
										className="flex items-center gap-2 text-sm text-primary-foreground/80"
									>
										<span className="size-1.5 shrink-0 rounded-full bg-primary-foreground/60" />
										{pt}
									</li>
								))}
							</ul>
						</div>

						{/* Right */}
						<div className="flex flex-col gap-4">
							<Link href="/contact">
								<Button
									size="lg"
									variant="secondary"
									className="w-full rounded-xl font-semibold"
								>
									<CalendarDays className="mr-1 size-4" />
									Book a Demo
									<ArrowRight className="ml-1 size-4" />
								</Button>
							</Link>
							{/* <Link href="/resources">
								<Button
									size="lg"
									className="w-full rounded-xl border border-primary-foreground/20 bg-transparent font-medium text-primary-foreground hover:bg-primary-foreground/10"
								>
									<BookOpen className="mr-1 size-4" />
									Read the Product Guide
								</Button>
							</Link> */}
							<p className="text-center text-xs text-primary-foreground/45">
								No credit card required · Cancel anytime · GDPR compliant
							</p>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
