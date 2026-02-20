"use client";

import { motion } from "motion/react";
import { Clock, Shield, CheckCircle } from "lucide-react";

const trustSignals = [
	{ icon: Clock, label: "Response within 24 hours" },
	{ icon: CheckCircle, label: "No-obligation consultation" },
	{ icon: Shield, label: "GDPR & SOC 2 certified" },
];

export function ContactHero() {
	return (
		<section className="relative overflow-hidden px-4 pt-32 pb-16 sm:px-6 sm:pt-40 sm:pb-20 md:px-10 lg:px-16">
			{/* Background gradient blobs */}
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute left-1/2 top-1/4 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/6 blur-3xl" />
			</div>

			<div className="relative mx-auto max-w-4xl text-center">
				{/* Badge */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-[10px] text-muted-foreground backdrop-blur-sm sm:px-4 sm:py-1.5 sm:text-xs"
				>
					<span className="rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-semibold text-primary-foreground sm:px-2 sm:text-[10px]">
						Get In Touch
					</span>
					Contact Us
				</motion.div>

				{/* Headline */}
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="text-4xl font-extrabold leading-tight tracking-tighter text-foreground sm:text-5xl md:text-6xl"
				>
					Let's Start a{" "}
					<span className="text-primary">Conversation.</span>
				</motion.h1>

				{/* Subheadline */}
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
				>
					Whether you need to validate a product idea, track brand health, or
					enter a new market — our team is ready to help you make evidence-based
					decisions. Reach out and let's discuss how we can support your
					strategic goals.
				</motion.p>

				{/* Trust signals */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="mt-10 flex flex-wrap items-center justify-center gap-6"
				>
					{trustSignals.map((signal, i) => {
						const Icon = signal.icon;
						return (
							<div key={i} className="flex items-center gap-2">
								<div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
									<Icon className="size-4 text-primary" />
								</div>
								<p className="text-xs text-foreground sm:text-sm">
									{signal.label}
								</p>
							</div>
						);
					})}
				</motion.div>
			</div>
		</section>
	);
}
