"use client";

import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";
import {
	Globe,
	ShoppingCart,
	MessageCircle,
	BarChart2,
	FileText,
	Database,
	Smartphone,
	Mail,
} from "lucide-react";

const sourceCategories = [
	{
		title: "Social & Digital",
		icon: Globe,
		sources: [
			"Twitter / X",
			"LinkedIn",
			"Reddit",
			"TikTok",
			"YouTube comments",
			"Instagram",
			"Facebook Groups",
			"News & media APIs",
		],
	},
	{
		title: "Commerce & Transactional",
		icon: ShoppingCart,
		sources: [
			"Amazon reviews",
			"Shopify / eCommerce",
			"POS data feeds",
			"CRM exports",
			"Return and complaint data",
			"Loyalty programme data",
			"Receipt scanning",
			"G2 & Capterra reviews",
		],
	},
	{
		title: "Survey & Panel",
		icon: MessageCircle,
		sources: [
			"MerkMetryx panel (250M+)",
			"Custom panel recruitment",
			"Email survey campaigns",
			"In-app intercept surveys",
			"SMS surveys",
			"QR code surveys",
			"Kiosk & POS feedback",
			"Employee surveys",
		],
	},
	{
		title: "Research & Analytics",
		icon: BarChart2,
		sources: [
			"Google Analytics",
			"Adobe Analytics",
			"Mixpanel / Amplitude",
			"Salesforce CRM",
			"HubSpot",
			"Qualtrics imports",
			"SPSS data imports",
			"Custom API connections",
		],
	},
];

const exportFormats = [
	{ icon: FileText, label: "PowerPoint", sublabel: "Executive-ready decks" },
	{ icon: Database, label: "CSV / Excel", sublabel: "Raw data export" },
	{ icon: Smartphone, label: "Live Dashboard", sublabel: "Shareable URL" },
	{
		icon: Mail,
		label: "Automated Reports",
		sublabel: "Scheduled email delivery",
	},
];

export function IntegrationsSection() {
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
						Data Sources & Integrations
					</p>
					<h2 className="mt-2 max-w-2xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
						500+ sources. One unified intelligence layer.
					</h2>
					<p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
						MerkMetryx connects to every signal source that matters — social,
						commerce, panel, and analytics — so your research reflects the full
						market, not just a slice of it.
					</p>
				</motion.div>

				{/* Source grid */}
				<div className="mb-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
					{sourceCategories.map((cat, i) => {
						const Icon = cat.icon;
						return (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: i * 0.08 }}
								className="rounded-2xl border border-border/40 bg-card p-5 sm:rounded-3xl sm:p-6"
							>
								<div className="mb-4 flex items-center gap-2.5">
									<div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
										<Icon className="size-4 text-primary" />
									</div>
									<h3 className="text-sm font-bold text-foreground">
										{cat.title}
									</h3>
								</div>
								<ul className="flex flex-col gap-1.5">
									{cat.sources.map((src, j) => (
										<li
											key={j}
											className="flex items-center gap-2 text-xs text-muted-foreground"
										>
											<span className="size-1 shrink-0 rounded-full bg-primary/50" />
											{src}
										</li>
									))}
								</ul>
							</motion.div>
						);
					})}
				</div>

				{/* Export formats */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
						Deliver findings in any format
					</p>
					<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
						{exportFormats.map((fmt, i) => {
							const Icon = fmt.icon;
							return (
								<div
									key={i}
									className="flex items-center gap-3 rounded-2xl border border-border/40 bg-card px-4 py-3"
								>
									<Icon className="size-5 shrink-0 text-primary" />
									<div>
										<p className="text-sm font-semibold text-foreground">
											{fmt.label}
										</p>
										<p className="text-[10px] text-muted-foreground">
											{fmt.sublabel}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</motion.div>

				<Separator className="mt-16" />
			</div>
		</section>
	);
}
