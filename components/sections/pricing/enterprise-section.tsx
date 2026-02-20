"use client";

import { motion } from "motion/react";
import { Plug, Shield, Users, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const features = [
	{
		icon: Plug,
		title: "Custom Integrations",
		description:
			"Connect MerkMatryx to proprietary databases or specialized industry tools",
	},
	{
		icon: Shield,
		title: "Security Governance",
		description:
			"SOC 2 and GDPR documentation, role-based access control for large teams",
	},
	{
		icon: Users,
		title: "Dedicated Insight Partners",
		description:
			"Senior analysts for complex study designs and interpretation support",
	},
	{
		icon: Building2,
		title: "Enterprise Support",
		description:
			"White-glove onboarding, custom training, and 24/7 priority support",
	},
];

export function EnterpriseSection() {
	return (
		<section className="bg-primary/5 px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16">
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
						Enterprise Solutions
					</p>
					<h2 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
						Built for large-scale organizations.
					</h2>
					<p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
						Full access, enterprise-grade compliance, and dedicated support for
						mission-critical research programmes.
					</p>
				</motion.div>

				{/* Feature grid */}
				<div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
					{features.map((feature, i) => {
						const Icon = feature.icon;
						return (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: i * 0.08 }}
								className="rounded-2xl border border-border/40 bg-card p-6"
							>
								<div className="mb-4 inline-flex items-center justify-center rounded-xl bg-primary/10 p-3">
									<Icon className="size-5 text-primary sm:size-6" />
								</div>
								<h3 className="text-base font-bold text-foreground sm:text-lg">
									{feature.title}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
									{feature.description}
								</p>
							</motion.div>
						);
					})}
				</div>

				{/* CTAs */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.4 }}
					className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4"
				>
					<Link href="/contact">
						<Button size="lg" className="w-full rounded-xl px-8 sm:w-auto">
							Contact Sales
							<ArrowRight className="ml-1 size-4" />
						</Button>
					</Link>
					<Link href="/contact">
						<Button
							size="lg"
							variant="outline"
							className="w-full rounded-xl px-8 sm:w-auto"
						>
							Download Enterprise Brochure
						</Button>
					</Link>
				</motion.div>
			</div>
		</section>
	);
}
