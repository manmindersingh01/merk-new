"use client";

import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";
import {
	Database,
	Cpu,
	BrainCircuit,
	BarChart3,
	ArrowRight,
} from "lucide-react";
import Image from "next/image";

const steps = [
	{
		icon: Database,
		number: "01",
		title: "Ingest",
		fullTitle: "Data Collection & Integration",
		description:
			"MerkMetryx simultaneously pulls from 500+ sources — social media streams, transactional records, consumer panels, web scraping, and proprietary third-party databases — building a unified intelligence layer in real time.",
		metrics: [
			{ label: "Data sources", value: "500+" },
			{ label: "Update frequency", value: "Live" },
		],
	},
	{
		icon: Cpu,
		number: "02",
		title: "Clean",
		fullTitle: "Automated Processing & Validation",
		description:
			"Every dataset is passed through automated quality pipelines that deduplicate records, normalise formats, detect bot and fraudulent responses, and apply predictive algorithms to fill structural gaps — before any analysis runs.",
		metrics: [
			{ label: "Data accuracy", value: "97%" },
			{ label: "Bot rejection rate", value: "99.8%" },
		],
	},
	{
		icon: BrainCircuit,
		number: "03",
		title: "Analyse",
		fullTitle: "NLP & Machine Learning Extraction",
		description:
			"Cleaned data flows into our AI layer where Natural Language Processing extracts themes and sentiment from open-text, while ML models identify statistically significant patterns, segment consumers, and flag predictive signals.",
		metrics: [
			{ label: "Languages supported", value: "40+" },
			{ label: "Model accuracy", value: "94%" },
		],
	},
	{
		icon: BarChart3,
		number: "04",
		title: "Deliver",
		fullTitle: "Visualisation & Actionable Reporting",
		description:
			"Findings surface as interactive dashboards, automated anomaly alerts, and presentation-ready reports. Executives get a one-page narrative; analysts get drill-down capability to every raw data point. All delivered in 48 hours.",
		metrics: [
			{ label: "Delivery time", value: "48 hrs" },
			{ label: "Export formats", value: "PPT · PDF · CSV" },
		],
	},
];

export function DataPipelineSection() {
	return (
		<section className="bg-card/40 px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16">
			<div className="mx-auto max-w-6xl">
				{/* Heading */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="mb-14"
				>
					<p className="text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">
						Under the Hood
					</p>
					<h2 className="mt-2 max-w-2xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
						How raw data becomes boardroom intelligence.
					</h2>
					<p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
						Every insight delivered by MerkMetryx passes through four rigorously
						validated stages — ensuring you never make decisions on dirty or
						incomplete data.
					</p>
				</motion.div>

				{/* Pipeline steps */}
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{steps.map((step, i) => {
						const Icon = step.icon;
						return (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: i * 0.1 }}
								className="relative flex flex-col rounded-2xl border border-border/40 bg-card p-6 sm:rounded-3xl sm:p-7"
							>
								{/* Step number watermark */}
								<span className="pointer-events-none absolute right-4 top-3 select-none text-7xl font-black text-border/50 sm:right-5 sm:top-4">
									{step.number}
								</span>

								{/* Icon */}
								<div className="relative mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-primary/10">
									<Icon className="size-5 text-primary" />
								</div>

								{/* Title */}
								<p className="relative text-xs font-semibold uppercase tracking-widest text-primary">
									{step.title}
								</p>
								<h3 className="relative mt-1 text-base font-bold text-foreground">
									{step.fullTitle}
								</h3>

								{/* Description */}
								<p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
									{step.description}
								</p>

								{/* Metrics */}
								<div className="relative mt-5 grid grid-cols-2 gap-2 border-t border-border/40 pt-4">
									{step.metrics.map((m, j) => (
										<div key={j}>
											<p className="text-sm font-extrabold text-primary">
												{m.value}
											</p>
											<p className="text-[10px] text-muted-foreground">
												{m.label}
											</p>
										</div>
									))}
								</div>
							</motion.div>
						);
					})}
				</div>

				{/* Flow connector line (desktop only) */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.5 }}
					className="mt-8 hidden items-center justify-center gap-2 lg:flex"
				>
					{steps.map((step, i) => (
						<div key={i} className="flex items-center gap-2">
							<span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
								{step.title}
							</span>
							{i < steps.length - 1 && (
								<ArrowRight className="size-4 text-muted-foreground/40" />
							)}
						</div>
					))}
				</motion.div>

				{/* Technical Architecture Overview */}
				<motion.div
					initial={{ opacity: 0, y: 32 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.6 }}
					className="mt-16 sm:mt-20"
				>
					<div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
						{/* Text Column */}
						<div>
							<p className="text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">
								Enterprise Infrastructure
							</p>
							<h3 className="mt-2 text-xl font-extrabold leading-snug text-foreground sm:text-2xl md:text-3xl">
								Built for scale. Engineered for accuracy. Optimized for speed.
							</h3>
							<p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
								Our proprietary data pipeline processes 500+ simultaneous
								sources, automatically cleanses and validates every record, and
								applies advanced NLP and ML models — all before delivering
								presentation-ready insights within 48 hours.
							</p>
							<p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
								<strong className="text-foreground">97% data accuracy.</strong>{" "}
								<strong className="text-foreground">
									99.8% bot rejection.
								</strong>{" "}
								<strong className="text-foreground">94% ML precision.</strong>{" "}
								These aren&apos;t promises — they&apos;re performance benchmarks validated
								across 500+ enterprise engagements.
							</p>
						</div>

						{/* Image Column */}
						<div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl">
							<Image
								src="/data-pipeline-section.png"
								alt="MerkMetryx data pipeline architecture showing complete workflow from ingestion to delivery"
								width={1920}
								height={1080}
								className="w-full h-auto"
								priority={false}
							/>
						</div>
					</div>
				</motion.div>

				<Separator className="mt-16" />
			</div>
		</section>
	);
}
