"use client";

import { motion } from "motion/react";
import {
	ScanSearch,
	TrendingUp,
	PieChart,
	Zap,
	Globe,
	MessagesSquare,
} from "lucide-react";

const features = [
	{
		icon: MessagesSquare,
		title: "Sentiment Analysis",
		description:
			"NLP-powered evaluation of emotions across millions of social posts and survey responses — enabling real-time reputation monitoring and instant crisis detection.",
		tag: "NLP Engine",
	},
	{
		icon: TrendingUp,
		title: "Predictive Analytics",
		description:
			"Machine learning algorithms that forecast market trends, consumer shifts, and demand curves based on historical patterns — so you act before the competition does.",
		tag: "ML Forecasting",
	},
	{
		icon: PieChart,
		title: "Automated Segmentation",
		description:
			"AI categorises consumers by behaviour, personality traits, and purchase values — generating hyper-targeted audience profiles without manual analysis.",
		tag: "Behavioural AI",
	},
	{
		icon: Zap,
		title: "Real-Time Anomaly Detection",
		description:
			"Continuous monitoring of data streams for sudden shifts in performance metrics, flagging campaign failures or market disruptions the moment they emerge.",
		tag: "Live Monitoring",
	},
	{
		icon: Globe,
		title: "Global Panel Access",
		description:
			"Reach 250M+ verified respondents across 50+ countries, with AI-powered quality controls that filter out bots and low-quality responses automatically.",
		tag: "250M+ Panel",
	},
	{
		icon: ScanSearch,
		title: "Natural Language Querying",
		description:
			"Ask complex research questions in plain English and get instant answers from your data — democratising insights without waiting on a technical data team.",
		tag: "AI Query Engine",
	},
];

export function AiFeaturesSection() {
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
						AI-Powered Platform
					</p>
					<h2 className="mt-2 max-w-2xl text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
						Intelligence that learns, adapts, and anticipates.
					</h2>
					<p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
						MerkMetryx is powered by Limited Memory AI — not just a tool that
						reacts to data, but a system that continuously learns from it to
						deliver sharper, faster, and more predictive insights over time.
					</p>
				</motion.div>

				{/* Feature grid */}
				<div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
					{features.map((feature, i) => {
						const Icon = feature.icon;
						return (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: i * 0.08 }}
								className="relative overflow-hidden rounded-2xl border border-border/40 bg-card p-6 sm:rounded-3xl sm:p-7"
							>
								{/* Top row */}
								<div className="mb-4 flex items-center justify-between">
									<div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
										<Icon className="size-5 text-primary" />
									</div>
									<span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">
										{feature.tag}
									</span>
								</div>

								<h3 className="text-sm font-bold text-foreground sm:text-base">
									{feature.title}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
									{feature.description}
								</p>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
