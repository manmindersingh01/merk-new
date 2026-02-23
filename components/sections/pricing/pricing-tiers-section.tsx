"use client";

import { motion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { pricingTiers } from "@/lib/pricing-data";

export function PricingTiersSection() {
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
						Choose Your Plan
					</p>
					<h2 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
						Research at the scale you need.
					</h2>
					<p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
						From solo founders to scaling enterprises. Every plan includes access
						to our AI-powered platform and global consumer panel.
					</p>
				</motion.div>

				{/* Pricing cards */}
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					{pricingTiers.map((tier, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: i * 0.1 }}
							className={cn(
								"relative flex flex-col rounded-2xl border p-6 sm:rounded-3xl sm:p-8",
								tier.featured
									? "border-primary/40 bg-primary shadow-lg shadow-primary/10"
									: "border-border/40 bg-card"
							)}
						>
							{tier.featured && (
								<span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow">
									Most Popular
								</span>
							)}

							{/* Plan header */}
							<div className="mb-6">
								<p
									className={cn(
										"text-xs font-semibold uppercase tracking-widest",
										tier.featured ? "text-primary-foreground/70" : "text-primary"
									)}
								>
									{tier.tagline}
								</p>
								<h3
									className={cn(
										"mt-1 text-xl font-extrabold sm:text-2xl",
										tier.featured ? "text-primary-foreground" : "text-foreground"
									)}
								>
									{tier.name}
								</h3>

								{/* Recommended for badge */}
								<div
									className={cn(
										"mt-3 inline-block rounded-lg px-3 py-1.5 text-xs font-medium",
										tier.featured
											? "bg-primary-foreground/20 text-primary-foreground"
											: "bg-primary/10 text-primary"
									)}
								>
									{tier.recommendedFor}
								</div>

								{/* Key metrics */}
								<div className="mt-4 space-y-2">
									<p
										className={cn(
											"text-xs",
											tier.featured
												? "text-primary-foreground/70"
												: "text-muted-foreground"
										)}
									>
										<span className="font-semibold">Responses:</span>{" "}
										{tier.responsesPerMonth}
									</p>
									<p
										className={cn(
											"text-xs",
											tier.featured
												? "text-primary-foreground/70"
												: "text-muted-foreground"
										)}
									>
										<span className="font-semibold">Users:</span> {tier.users}
									</p>
								</div>
							</div>

							{/* Features */}
							<ul className="mb-8 flex flex-col gap-3">
								{tier.highlights.map((highlight, j) => (
									<li key={j} className="flex items-start gap-2.5">
										<Check
											className={cn(
												"mt-0.5 size-4 shrink-0",
												tier.featured ? "text-primary-foreground" : "text-primary"
											)}
										/>
										<span
											className={cn(
												"text-sm",
												tier.featured
													? "text-primary-foreground/90"
													: "text-foreground"
											)}
										>
											{highlight}
										</span>
									</li>
								))}
							</ul>

							{/* CTA */}
							<div className="mt-auto">
								<Link href={tier.ctaHref} className="block">
									<Button
										size="lg"
										variant={tier.featured ? "secondary" : "default"}
										className={cn(
											"w-full rounded-xl font-medium",
											!tier.featured && ""
										)}
									>
										{tier.cta}
										<ArrowRight className="ml-1 size-4" />
									</Button>
								</Link>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
