"use client";

import { motion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
	{
		name: "Starter",
		tagline: "For consultants & small teams",
		price: "Pay-per-response",
		description:
			"Self-service access to our global panel and AI survey builder. Launch research in minutes with no commitment.",
		cta: "Start for free",
		href: "/contact?plan=Starter&source=home_pricing",
		featured: false,
		features: [
			"AI Survey Builder",
			"250M+ global consumer panel",
			"Real-time results dashboard",
			"Basic NPS & single-select methods",
			"Unlimited teammates",
			"Real-time cost calculator",
		],
	},
	{
		name: "Professional",
		tagline: "For growing organisations",
		price: "Monthly subscription",
		description:
			"Advanced methodologies, team collaboration, and custom branding — for teams moving from data collection to strategic insight.",
		cta: "Book a demo",
		href: "/contact?plan=Professional&source=home_pricing",
		featured: true,
		features: [
			"Everything in Starter",
			"MaxDiff & Conjoint Analysis",
			"A/B testing & price sensitivity",
			"Custom PPT export reports",
			"White-label survey branding",
			"Shared team folders & permissions",
		],
	},
	{
		name: "Enterprise",
		tagline: "For large corporations & agencies",
		price: "Annual commitment",
		description:
			"A hybrid of full DIY platform access and dedicated project support — for high-volume, mission-critical research programmes.",
		cta: "Talk to sales",
		href: "/contact?plan=Enterprise&source=home_pricing",
		featured: false,
		features: [
			"Everything in Professional",
			"Full AI suite + Expert Assist",
			"Qualitative & IHUT recruitment",
			"Dedicated account manager",
			"SSO & shared team workspaces",
			"Presentation-ready analysis delivery",
		],
	},
];

export function PricingSection() {
	return (
		<section className="px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16">
			<div className="mx-auto max-w-7xl">
				{/* Heading */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="mb-12 text-center sm:mb-16"
				>
					<p className="text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">
						Pricing
					</p>
					<h2 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
						Research at the scale you need.
					</h2>
					<p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
						Start self-service or go full-service. Every plan includes access to
						our AI-powered platform and 250M+ global panel.
					</p>
				</motion.div>

				{/* Pricing cards */}
				<div className="grid gap-6 lg:grid-cols-3">
					{plans.map((plan, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: i * 0.1 }}
							className={cn(
								"relative flex flex-col rounded-2xl border p-6 sm:rounded-3xl sm:p-8",
								plan.featured
									? "border-primary/40 bg-primary shadow-lg shadow-primary/10"
									: "border-border/40 bg-card"
							)}
						>
							{plan.featured && (
								<span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow">
									Most Popular
								</span>
							)}

							{/* Plan header */}
							<div className="mb-6">
								<p
									className={cn(
										"text-xs font-semibold uppercase tracking-widest",
										plan.featured ? "text-primary-foreground/70" : "text-primary"
									)}
								>
									{plan.tagline}
								</p>
								<h3
									className={cn(
										"mt-1 text-xl font-extrabold sm:text-2xl",
										plan.featured ? "text-primary-foreground" : "text-foreground"
									)}
								>
									{plan.name}
								</h3>
								<p
									className={cn(
										"mt-1 text-xs font-medium",
										plan.featured
											? "text-primary-foreground/70"
											: "text-muted-foreground"
									)}
								>
									{plan.price}
								</p>
								<p
									className={cn(
										"mt-3 text-sm leading-relaxed",
										plan.featured
											? "text-primary-foreground/80"
											: "text-muted-foreground"
									)}
								>
									{plan.description}
								</p>
							</div>

							{/* Features */}
							<ul className="mb-8 flex flex-col gap-3">
								{plan.features.map((feature, j) => (
									<li key={j} className="flex items-start gap-2.5">
										<Check
											className={cn(
												"mt-0.5 size-4 shrink-0",
												plan.featured ? "text-primary-foreground" : "text-primary"
											)}
										/>
										<span
											className={cn(
												"text-sm",
												plan.featured
													? "text-primary-foreground/90"
													: "text-foreground"
											)}
										>
											{feature}
										</span>
									</li>
								))}
							</ul>

							{/* CTA */}
							<div className="mt-auto">
								<Link href={plan.href} className="block">
									<Button
										size="lg"
										variant={plan.featured ? "secondary" : "default"}
										className={cn(
											"w-full rounded-xl font-medium",
											!plan.featured && ""
										)}
									>
										{plan.cta}
										<ArrowRight className="ml-1 size-4" />
									</Button>
								</Link>
							</div>
						</motion.div>
					))}
				</div>

				{/* Full service note */}
				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="mt-8 text-center text-sm text-muted-foreground"
				>
					Need end-to-end research support?{" "}
					<Link
						href="/contact"
						className="font-semibold text-primary hover:underline"
					>
						Explore our Full Service offering →
					</Link>
				</motion.p>
			</div>
		</section>
	);
}
