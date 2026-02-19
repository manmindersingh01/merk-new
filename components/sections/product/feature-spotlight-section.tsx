"use client";

import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";
import {
	BrainCircuit,
	TrendingUp,
	MessageSquareText,
	ScanSearch,
	Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
	{
		icon: BrainCircuit,
		tag: "AI Survey Builder",
		title: "Build smarter surveys in minutes, not days.",
		description:
			"Our AI Survey Builder eliminates common design pitfalls automatically — flagging leading questions, detecting redundancy, and suggesting optimal response scales before you launch. Every survey is pre-screened for bias so your data is clean from the first response.",
		points: [
			"Automatic bias and leading-question detection",
			"Smart skip logic and conditional branching",
			"Multi-language support across 40+ languages",
			"Mobile-optimised for all device types",
		],
		visual: {
			label: "Survey Quality Score",
			value: "98 / 100",
			sublabel: "Bias-free · Validated · Ready to launch",
			bars: [
				{ label: "Clarity", pct: 98 },
				{ label: "Neutrality", pct: 95 },
				{ label: "Logic flow", pct: 100 },
			],
		},
		reverse: false,
	},
	{
		icon: MessageSquareText,
		tag: "NLP Sentiment Engine",
		title: "Decode the 'why' behind every open-ended answer.",
		description:
			"Quantitative scores tell you what happened. Our NLP Sentiment Engine tells you why. It processes millions of open-text responses in real time, surfacing emotional themes, dominant narratives, and emerging issues that no rating scale can capture.",
		points: [
			"Real-time emotion and theme classification",
			"Crisis signal detection and reputation alerts",
			"Competitive mention tracking and sentiment scoring",
			"Drill-down from theme clusters to raw verbatims",
		],
		visual: {
			label: "Sentiment Distribution",
			value: "72% Positive",
			sublabel: "Across 14,820 open-text responses",
			bars: [
				{ label: "Positive", pct: 72 },
				{ label: "Neutral", pct: 18 },
				{ label: "Negative", pct: 10 },
			],
		},
		reverse: true,
	},
	{
		icon: TrendingUp,
		tag: "Predictive Analytics",
		title: "See the market shift before your competitors act on it.",
		description:
			"Limited Memory AI continuously learns from historical patterns across your category to generate forward-looking forecasts — predicting consumer demand shifts, purchase intent trajectories, and category disruptions weeks before they surface in traditional research.",
		points: [
			"Demand forecasting up to 90 days ahead",
			"Price elasticity and revenue scenario modelling",
			"Category disruption and competitor threat alerts",
			"Trend confidence scoring with source attribution",
		],
		visual: {
			label: "Demand Forecast Accuracy",
			value: "94.2%",
			sublabel: "Validated against 12-month rolling actuals",
			bars: [
				{ label: "Q1 Forecast", pct: 91 },
				{ label: "Q2 Forecast", pct: 94 },
				{ label: "Q3 Forecast", pct: 97 },
			],
		},
		reverse: false,
	},
	{
		icon: ScanSearch,
		tag: "Natural Language Querying",
		title: "Ask your data anything. No analyst required.",
		description:
			"Type a plain-English question — 'Which age group is most likely to churn in Q3?' or 'What drove the dip in NPS last month?' — and the platform returns structured analysis, charts, and narrative summaries instantly. Intelligence without the ticket queue.",
		points: [
			"Plain-English query interface across all datasets",
			"Auto-generated charts and executive summaries",
			"Cross-wave comparison with statistical significance flags",
			"Export results directly to PowerPoint or PDF",
		],
		visual: {
			label: "Query Response Time",
			value: "< 3 seconds",
			sublabel: "Across datasets of 1M+ responses",
			bars: [
				{ label: "Data retrieval", pct: 100 },
				{ label: "Analysis depth", pct: 92 },
				{ label: "Narrative clarity", pct: 96 },
			],
		},
		reverse: true,
	},
];

interface VisualBlock {
	label: string;
	value: string;
	sublabel: string;
	bars: { label: string; pct: number }[];
}

function FeatureVisual({ visual }: { visual: VisualBlock }) {
	return (
		<div className="rounded-2xl border border-border/40 bg-card p-6 sm:rounded-3xl sm:p-8">
			<p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
				{visual.label}
			</p>
			<p className="text-3xl font-extrabold text-foreground sm:text-4xl">
				{visual.value}
			</p>
			<p className="mt-1 text-xs text-muted-foreground">{visual.sublabel}</p>

			<div className="mt-6 flex flex-col gap-4">
				{visual.bars.map((bar, i) => (
					<div key={i}>
						<div className="mb-1.5 flex items-center justify-between">
							<span className="text-xs font-medium text-foreground">
								{bar.label}
							</span>
							<span className="text-xs font-bold text-primary">{bar.pct}%</span>
						</div>
						<div className="h-2 w-full overflow-hidden rounded-full bg-primary/10">
							<motion.div
								initial={{ width: 0 }}
								whileInView={{ width: `${bar.pct}%` }}
								viewport={{ once: true }}
								transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
								className="h-full rounded-full bg-primary"
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export function FeatureSpotlightSection() {
	return (
		<section className="bg-card/40 px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16">
			<div className="mx-auto max-w-6xl">
				{/* Heading */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="mb-16 sm:mb-20"
				>
					<p className="text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">
						Platform Features
					</p>
					<h2 className="mt-2 max-w-2xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
						Every tool you need. One platform.
					</h2>
					<p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
						Each capability inside MerkMetryx is purpose-built for research
						quality — not bolted on as an afterthought.
					</p>
				</motion.div>

				{/* Alternating feature rows */}
				<div className="flex flex-col gap-20 sm:gap-28">
					{features.map((feature, i) => {
						const Icon = feature.icon;
						return (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 32 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6 }}
								className={cn(
									"grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
									feature.reverse && "lg:[&>*:first-child]:order-2"
								)}
							>
								{/* Text side */}
								<div>
									<div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5">
										<Icon className="size-4 text-primary" />
										<span className="text-xs font-semibold text-primary">
											{feature.tag}
										</span>
									</div>
									<h3 className="text-xl font-extrabold leading-snug text-foreground sm:text-2xl md:text-3xl">
										{feature.title}
									</h3>
									<p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
										{feature.description}
									</p>
									<ul className="mt-6 flex flex-col gap-3">
										{feature.points.map((point, j) => (
											<li key={j} className="flex items-start gap-2.5">
												<Check className="mt-0.5 size-4 shrink-0 text-primary" />
												<span className="text-sm text-foreground">{point}</span>
											</li>
										))}
									</ul>
								</div>

								{/* Visual side */}
								<FeatureVisual visual={feature.visual} />
							</motion.div>
						);
					})}
				</div>

				<Separator className="mt-20" />
			</div>
		</section>
	);
}
