"use client";

import { motion } from "motion/react";
import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ContactCtaSection() {
	return (
		<section className="px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16">
			<div className="mx-auto max-w-7xl">
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="relative overflow-hidden rounded-2xl bg-primary px-6 py-12 text-center sm:rounded-3xl sm:px-12 sm:py-16 md:px-16 md:py-20"
				>
					{/* Background orbs */}
					<div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-white/5 blur-3xl" />
					<div className="pointer-events-none absolute -bottom-16 -left-16 size-64 rounded-full bg-white/5 blur-3xl" />

					<div className="relative mx-auto max-w-2xl">
						<p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/70 sm:text-sm">
							Prefer to Talk First?
						</p>
						<h2 className="mt-2 text-2xl font-extrabold leading-snug tracking-tight text-primary-foreground sm:text-3xl md:text-4xl">
							Schedule a no-obligation consultation call with our research
							strategists.
						</h2>
						<p className="mt-4 text-sm leading-relaxed text-primary-foreground/75 sm:text-base">
							We'll discuss your research needs, explore the platform's
							capabilities, and provide recommendations tailored to your
							industry and goals.
						</p>

						<div className="mt-8 flex justify-center">
							<Link href="#form">
								<Button
									size="lg"
									variant="secondary"
									className="rounded-xl px-8 font-medium"
								>
									<CalendarDays className="mr-2 size-4" />
									Book a Call Now
								</Button>
							</Link>
						</div>

						<p className="mt-6 text-xs text-primary-foreground/50">
							Average response time: 4 hours
						</p>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
