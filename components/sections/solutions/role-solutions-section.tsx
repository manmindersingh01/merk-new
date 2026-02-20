"use client";

import { motion } from "motion/react";
import { Megaphone, Smile, LineChart, PackageOpen } from "lucide-react";

const roles = [
	{
		role: "Marketing Teams",
		icon: Megaphone,
		objective: "Boosting campaign impact and refining messaging.",
		utility: "Ad testing, brand health tracking, and sentiment analysis.",
	},
	{
		role: "Customer Experience (CX)",
		icon: Smile,
		objective: "Understanding user behavior and closing the experience gap.",
		utility: "Customer journey mapping, CSAT scores, and VoC programs.",
	},
	{
		role: "Strategy & Leadership",
		icon: LineChart,
		objective: "Market expansion and risk forecasting.",
		utility:
			"Market sizing (TAM), political risk analysis, and workforce analytics.",
	},
	{
		role: "Product & UX",
		icon: PackageOpen,
		objective: "Improving user experience and ensuring product-market fit.",
		utility:
			"Usability testing, concept validation, and feature adoption tracking.",
	},
];

export function RoleSolutionsSection() {
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
						Solutions by Role
					</p>
					<h2 className="mt-2 max-w-2xl text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
						Actionable Insights for Every Function
					</h2>
					<p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
						MerkMetryx addresses the specific KPIs and pain points of different
						organizational functions, ensuring research data is actionable across
						the enterprise.
					</p>
				</motion.div>

				{/* Desktop Table View - Hidden on mobile */}
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="hidden overflow-hidden rounded-2xl border border-border/40 bg-card lg:block"
				>
					{/* Table Header */}
					<div className="grid grid-cols-[220px_1fr_1fr] border-b border-border/40 bg-muted/30 px-6 py-4">
						<div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
							Role
						</div>
						<div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
							Core Objective
						</div>
						<div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
							Key Tool Utility
						</div>
					</div>

					{/* Table Rows */}
					{roles.map((role, i) => {
						const Icon = role.icon;
						return (
							<div
								key={i}
								className="grid grid-cols-[220px_1fr_1fr] border-b border-border/20 px-6 py-5 last:border-b-0"
							>
								<div className="flex items-center gap-3">
									<div className="inline-flex items-center justify-center rounded-lg bg-primary/10 p-2">
										<Icon className="size-4 text-primary" />
									</div>
									<span className="text-sm font-semibold text-foreground">
										{role.role}
									</span>
								</div>
								<div className="flex items-center text-sm text-muted-foreground">
									{role.objective}
								</div>
								<div className="flex items-center text-sm text-muted-foreground">
									{role.utility}
								</div>
							</div>
						);
					})}
				</motion.div>

				{/* Mobile Card View - Hidden on desktop */}
				<div className="grid gap-4 sm:gap-6 lg:hidden">
					{roles.map((role, i) => {
						const Icon = role.icon;
						return (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: i * 0.08 }}
								className="rounded-2xl border border-border/40 bg-card p-6 sm:rounded-3xl sm:p-7"
							>
								<div className="mb-4 flex items-center gap-3">
									<div className="inline-flex items-center justify-center rounded-xl bg-primary/10 p-3">
										<Icon className="size-5 text-primary sm:size-6" />
									</div>
									<h3 className="text-base font-bold text-foreground sm:text-lg">
										{role.role}
									</h3>
								</div>
								<div className="space-y-3">
									<div>
										<p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
											Core Objective
										</p>
										<p className="mt-1 text-sm leading-relaxed text-foreground">
											{role.objective}
										</p>
									</div>
									<div>
										<p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
											Key Tool Utility
										</p>
										<p className="mt-1 text-sm leading-relaxed text-foreground">
											{role.utility}
										</p>
									</div>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
