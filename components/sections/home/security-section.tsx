"use client";

import { motion } from "motion/react";
import { ShieldCheck, Lock, Eye, KeyRound } from "lucide-react";

const badges = [
	{ label: "GDPR Compliant", sublabel: "EU Data Protection" },
	{ label: "SOC 2 Type II", sublabel: "Certified Security Controls" },
	{ label: "CCPA Ready", sublabel: "California Privacy Rights" },
	{ label: "HIPAA Aligned", sublabel: "Healthcare Data Standards" },
];

const safeguards = [
	{
		icon: Lock,
		title: "End-to-End Encryption",
		description:
			"All data in transit and at rest is encrypted using AES-256, ensuring client data and participant information is protected at every stage of the research pipeline.",
	},
	{
		icon: KeyRound,
		title: "Multi-Factor Authentication & RBAC",
		description:
			"Access controls are enforced through MFA and role-based permissions, meaning each team member can only access the data their role requires.",
	},
	{
		icon: Eye,
		title: "Forensic Watermarking",
		description:
			"For confidential materials — prototypes, pilots, or unreleased concepts — dynamic and invisible forensic watermarking ensures full traceability against unauthorised sharing.",
	},
	{
		icon: ShieldCheck,
		title: "Third-Party Security Audits",
		description:
			"Our SOC 2 Type II certification is independently verified on an annual basis, providing clients with documented proof that our security controls operate effectively over time.",
	},
];

export function SecuritySection() {
	return (
		<section className="px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16">
			<div className="mx-auto max-w-7xl">
				{/* Heading */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="mb-10 sm:mb-14"
				>
					<p className="text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">
						Security & Compliance
					</p>
					<h2 className="mt-2 max-w-2xl text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
						Your data handled with enterprise-grade trust.
					</h2>
					<p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
						MerkMetryx operates a Security-First philosophy. Every client
						engagement is governed by the strictest data protection standards in
						the industry.
					</p>
				</motion.div>

				{/* Compliance badges */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="mb-10 flex flex-wrap gap-3 sm:mb-12 sm:gap-4"
				>
					{badges.map((badge, i) => (
						<div
							key={i}
							className="flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/5 px-4 py-2"
						>
							<ShieldCheck className="size-4 text-primary" />
							<div>
								<p className="text-xs font-bold text-foreground">{badge.label}</p>
								<p className="text-[10px] text-muted-foreground">{badge.sublabel}</p>
							</div>
						</div>
					))}
				</motion.div>

				{/* Safeguards grid */}
				<div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
					{safeguards.map((item, i) => {
						const Icon = item.icon;
						return (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: i * 0.1 }}
								className="flex gap-4 rounded-2xl border border-border/40 bg-card p-5 sm:rounded-3xl sm:p-6"
							>
								<div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
									<Icon className="size-4 text-primary sm:size-5" />
								</div>
								<div>
									<h3 className="text-sm font-bold text-foreground sm:text-base">
										{item.title}
									</h3>
									<p className="mt-1 text-sm leading-relaxed text-muted-foreground">
										{item.description}
									</p>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
