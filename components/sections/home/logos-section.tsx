"use client";

import { motion } from "motion/react";

const clients = [
	"Accenture",
	"Deloitte",
	"McKinsey & Co.",
	"BCG",
	"Bain & Co.",
	"Kantar",
	"Nielsen",
	"Ipsos",
];

export function LogosSection() {
	return (
		<section className="border-y border-border/40 bg-card/40 px-4 py-8 sm:px-6 sm:py-10 md:px-10 lg:px-16">
			<div className="mx-auto max-w-7xl">
				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:mb-8"
				>
					Trusted by researchers, strategists &amp; enterprise teams
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12"
				>
					{clients.map((name, i) => (
						<span
							key={i}
							className="text-sm font-semibold text-muted-foreground/60 transition-colors hover:text-muted-foreground sm:text-base"
						>
							{name}
						</span>
					))}
				</motion.div>
			</div>
		</section>
	);
}
