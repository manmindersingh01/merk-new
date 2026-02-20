"use client";

import { motion } from "motion/react";
import { Users, Handshake, Newspaper } from "lucide-react";

const channels = [
	{
		icon: Users,
		title: "For Existing Clients",
		description:
			"Access your account dashboard, submit support tickets, or speak with your dedicated account manager. We're here to ensure you get maximum value from the platform.",
	},
	{
		icon: Handshake,
		title: "For Partners",
		description:
			"Interested in integration partnerships, reseller opportunities, or research collaborations? Let's explore how we can work together to serve more clients.",
	},
	{
		icon: Newspaper,
		title: "For Media & Press",
		description:
			"Press inquiries, speaking requests, and media kits available upon request. We're happy to provide commentary on market research trends and methodology.",
	},
];

export function SupportChannelsSection() {
	return (
		<section className="bg-card/40 px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16">
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
						Support & General Inquiries
					</p>
					<h2 className="mt-2 max-w-2xl text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
						Clear pathways for every type of inquiry.
					</h2>
				</motion.div>

				{/* Grid */}
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
					{channels.map((channel, i) => {
						const Icon = channel.icon;
						return (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: i * 0.08 }}
								className="rounded-2xl border border-border/40 bg-card p-6 sm:rounded-3xl sm:p-7"
							>
								<div className="mb-4 inline-flex items-center justify-center rounded-xl bg-primary/10 p-3">
									<Icon className="size-5 text-primary sm:size-6" />
								</div>
								<h3 className="text-sm font-bold text-foreground sm:text-base">
									{channel.title}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
									{channel.description}
								</p>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
