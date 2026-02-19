"use client";

import { motion } from "motion/react";
import {
	HeartPulse,
	Lightbulb,
	Telescope,
	MessageSquareText,
	TrendingUp,
	Users,
} from "lucide-react";

const services = [
	{
		icon: HeartPulse,
		title: "Brand Health Tracking",
		description:
			"Monitor brand awareness, perception, and loyalty in real-time across your target demographics. Detect reputation shifts before they escalate.",
	},
	{
		icon: Lightbulb,
		title: "Concept & Product Testing",
		description:
			"Evaluate new products, ads, or positioning ideas with your exact target audience before committing capital — eliminating the guesswork from innovation.",
	},
	{
		icon: Telescope,
		title: "Competitive Intelligence",
		description:
			"Track competitor positioning, pricing strategy, and consumer sentiment across market segments to identify white-space opportunities and emerging threats.",
	},
	{
		icon: MessageSquareText,
		title: "Sentiment & NLP Analysis",
		description:
			"Go beyond survey scores. Our NLP engine decodes open-text responses and social signals to reveal the emotional drivers behind consumer decisions.",
	},
	{
		icon: TrendingUp,
		title: "Demand & Feasibility Validation",
		description:
			"Quantify real market demand, assess price sensitivity, and validate product-market fit with statistically robust methodologies before launch.",
	},
	{
		icon: Users,
		title: "Consumer Segmentation",
		description:
			"Identify high-value customer segments by behaviour, values, and purchase motivations — enabling hyper-targeted strategies that improve ROI.",
	},
];

export function ServicesSection() {
	return (
		<section className="bg-card/40 px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16">
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
						Core Capabilities
					</p>
					<h2 className="mt-2 max-w-2xl text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
						Everything you need to research with confidence.
					</h2>
					<p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
						A full-spectrum research toolkit — from brand tracking to
						go-to-market validation — built for the speed modern business demands.
					</p>
				</motion.div>

				{/* Grid */}
				<div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
					{services.map((service, i) => {
						const Icon = service.icon;
						return (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: i * 0.08 }}
								className="rounded-2xl border border-border/40 bg-card p-6 transition-shadow hover:shadow-md sm:rounded-3xl sm:p-7"
							>
								<div className="mb-4 inline-flex items-center justify-center rounded-xl bg-primary/10 p-3">
									<Icon className="size-5 text-primary sm:size-6" />
								</div>
								<h3 className="text-sm font-bold text-foreground sm:text-base">
									{service.title}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
									{service.description}
								</p>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
