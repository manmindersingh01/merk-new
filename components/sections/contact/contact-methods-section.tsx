"use client";

import { motion } from "motion/react";
import { CalendarDays, Mail, Headset, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const methods = [
	{
		icon: CalendarDays,
		title: "Book a Demo",
		description:
			"Schedule a live walkthrough of the platform with our team. See real insights from your industry and ask questions in real-time.",
		cta: "View Calendar",
		href: "/contact#form",
	},
	{
		icon: Mail,
		title: "General Inquiries",
		description:
			"Questions about pricing, capabilities, or partnerships? Send us a message and we'll respond within 24 hours.",
		cta: "contact@merkmetryx.com",
		href: "mailto:contact@merkmetryx.com",
	},
	{
		icon: Headset,
		title: "Existing Clients",
		description:
			"Access technical support and account management. Our client success team is here to ensure you get maximum value from the platform.",
		cta: "Client Portal",
		href: "/contact#form",
	},
];

export function ContactMethodsSection() {
	return (
		<section className="px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16">
			<div className="mx-auto max-w-7xl">
				{/* Grid */}
				<div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
					{methods.map((method, i) => {
						const Icon = method.icon;
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
									{method.title}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
									{method.description}
								</p>
								<div className="mt-6">
									<Link href={method.href}>
										<Button
											variant="outline"
											size="sm"
											className="w-full rounded-xl text-xs sm:text-sm"
										>
											{method.cta}
											<ArrowRight className="ml-1 size-3" />
										</Button>
									</Link>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
