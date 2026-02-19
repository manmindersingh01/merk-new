"use client";

import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";
import { Check, Zap, HeadphonesIcon, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const tiers = [
	{
		icon: Zap,
		name: "DIY Platform",
		tagline: "Launch research in minutes",
		description:
			"Full self-service access to our AI survey builder, global panel, and real-time results dashboard. Design, launch, and analyse research at your own pace with zero dependency on an account team.",
		forWho: "Consultants, small teams, and fast-moving startups",
		highlights: [
			"AI Survey Builder with bias-elimination checks",
			"Access to 250M+ verified respondents",
			"Real-time results with live cost calculator",
			"Unlimited team members",
			"NPS, single-select, and rating scales",
		],
		accent: false,
	},
	{
		icon: HeadphonesIcon,
		name: "Assisted Research",
		tagline: "Expert guidance at every step",
		description:
			"All the power of the DIY platform, augmented by our research team for questionnaire design, sample management, and interpretation support. You stay in control; we remove the guesswork.",
		forWho: "Growing organisations moving from data collection to strategy",
		highlights: [
			"Everything in DIY Platform",
			"Questionnaire design review & bias audit",
			"Sample strategy & representativeness checks",
			"Advanced methods: Conjoint, MaxDiff, A/B",
			"Custom PPT export and white-label branding",
		],
		accent: true,
	},
	{
		icon: Building2,
		name: "Full Service",
		tagline: "End-to-end research management",
		description:
			"A fully managed research programme where our analysts own the entire workflow — from brief to final presentation. Designed for enterprise teams with high-stakes, time-sensitive intelligence needs.",
		forWho: "Enterprises, agencies, and high-volume research programmes",
		highlights: [
			"Everything in Assisted Research",
			"Dedicated senior research analyst",
			"Qualitative recruitment & IHUT management",
			"Presentation-ready executive reports",
			"SSO, custom integrations, and SLA guarantees",
		],
		accent: false,
	},
];

export function PlatformTiersSection() {
	return (
		<section className="px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16">
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
						Engagement Model
					</p>
					<h2 className="mt-2 max-w-2xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
						Research at every level of involvement.
					</h2>
					<p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
						Whether you want full control or want us to own the entire process,
						MerkMetryx meets you where you are.
					</p>
				</motion.div>

				{/* Tier cards */}
				<div className="grid gap-6 lg:grid-cols-3">
					{tiers.map((tier, i) => {
						const Icon = tier.icon;
						return (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 28 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: i * 0.1 }}
								className={cn(
									"relative flex flex-col rounded-2xl border p-7 sm:rounded-3xl sm:p-9",
									tier.accent
										? "border-primary/30 bg-primary/5 shadow-lg shadow-primary/8"
										: "border-border/40 bg-card"
								)}
							>
								{tier.accent && (
									<span className="absolute -top-3.5 left-8 rounded-full bg-primary px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
										Most Popular
									</span>
								)}

								{/* Icon + name */}
								<div className="mb-5 flex items-center gap-3">
									<div
										className={cn(
											"flex size-10 items-center justify-center rounded-xl",
											tier.accent ? "bg-primary/15" : "bg-primary/10"
										)}
									>
										<Icon className="size-5 text-primary" />
									</div>
									<div>
										<h3 className="text-base font-extrabold text-foreground sm:text-lg">
											{tier.name}
										</h3>
										<p className="text-xs text-muted-foreground">{tier.tagline}</p>
									</div>
								</div>

								{/* Description */}
								<p className="mb-5 text-sm leading-relaxed text-muted-foreground">
									{tier.description}
								</p>

								{/* For who */}
								<div className="mb-5 rounded-xl bg-primary/8 px-4 py-2.5">
									<p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
										Best for
									</p>
									<p className="mt-0.5 text-xs text-foreground">{tier.forWho}</p>
								</div>

								{/* Highlights */}
								<ul className="flex flex-col gap-2.5">
									{tier.highlights.map((item, j) => (
										<li key={j} className="flex items-start gap-2.5">
											<Check className="mt-0.5 size-4 shrink-0 text-primary" />
											<span className="text-sm text-foreground">{item}</span>
										</li>
									))}
								</ul>
							</motion.div>
						);
					})}
				</div>

				<Separator className="mt-20" />
			</div>
		</section>
	);
}
