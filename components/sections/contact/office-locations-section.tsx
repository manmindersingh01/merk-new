"use client";

import { motion } from "motion/react";
import { Globe, MapPin } from "lucide-react";

const locations = [
	{
		icon: Globe,
		title: "Remote-First Operations",
		description:
			"We operate as a distributed team across multiple time zones, ensuring we can serve clients globally with responsive support and local market expertise.",
	},
	{
		icon: MapPin,
		title: "Global Reach",
		description:
			"Serving clients across 50+ countries with research capabilities in North America, Europe, Asia-Pacific, and emerging markets worldwide.",
	},
];

export function OfficeLocationsSection() {
	return (
		<section className="px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16">
			<div className="mx-auto max-w-7xl">
				{/* Heading */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="mb-12 sm:mb-16"
				>
					<p className="text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">
						Our Presence
					</p>
					<h2 className="mt-2 max-w-2xl text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
						Distributed team, global impact.
					</h2>
				</motion.div>

				{/* 2-column Grid */}
				<div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
					{locations.map((location, i) => {
						const Icon = location.icon;
						return (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: i * 0.1 }}
								className="rounded-2xl border border-border/40 bg-card p-6 sm:rounded-3xl sm:p-8"
							>
								<div className="mb-4 inline-flex items-center justify-center rounded-xl bg-primary/10 p-3">
									<Icon className="size-6 text-primary" />
								</div>
								<h3 className="text-base font-bold text-foreground sm:text-lg">
									{location.title}
								</h3>
								<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
									{location.description}
								</p>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
