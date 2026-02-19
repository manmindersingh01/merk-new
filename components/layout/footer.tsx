import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
	Company: [
		{ label: "About", href: "/about" },
		{ label: "Resources", href: "/resources" },
		{ label: "Contact", href: "/contact" },
	],
	Services: [
		{ label: "Product", href: "/product" },
		{ label: "Solutions", href: "/solutions" },
		{ label: "Pricing", href: "/pricing" },
	],
	Industries: [
		{ label: "Consumer Goods & FMCG" },
		{ label: "Technology & SaaS" },
		{ label: "Healthcare & Wellness" },
		{ label: "Manufacturing & Industrial" },
	],
};

export function Footer() {
	return (
		<footer className="px-3 pb-3 sm:px-6 sm:pb-4 md:px-10 lg:px-16">
			{/* CTA bubble */}
			<div className="mx-auto max-w-7xl rounded-2xl border border-border/40 bg-card px-5 py-8 text-center sm:rounded-3xl sm:p-12 md:rounded-[2rem]">
				<h2 className="text-lg font-extrabold leading-snug tracking-tight text-foreground sm:text-2xl md:text-3xl lg:text-4xl">
					Make your next launch{" "}
					<span className="text-primary">data-backed</span>,
					<br className="hidden sm:block" /> investor-ready, and
					market-approved.
				</h2>
				<div className="mt-6 sm:mt-8">
					<Link href="/contact">
						<Button
							size="lg"
							className="w-full rounded-full px-8 text-sm font-medium sm:w-auto"
						>
							Schedule Strategy Discussion
							<ArrowRight className="ml-1 size-4" />
						</Button>
					</Link>
				</div>
			</div>

			{/* Main footer bubble */}
			<div className="mx-auto mt-3 max-w-7xl rounded-2xl border border-border/40 bg-card px-5 py-8 sm:mt-4 sm:rounded-3xl sm:p-10 md:rounded-[2rem]">
				{/* Brand */}
				<div className="mb-8 sm:mb-10">
					<Link
						href="/"
						className="text-lg font-bold tracking-tight text-foreground"
					>
						MERKMETRYX
					</Link>
					<p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground sm:mt-3">
						Full-spectrum market research and product validation firm helping
						businesses assess demand, feasibility, and market viability.
					</p>
				</div>

				{/* Link columns — 3 cols side by side on all sizes */}
				<div className="grid grid-cols-3 gap-6 sm:gap-10">
					{Object.entries(footerLinks).map(([title, links]) => (
						<div key={title}>
							<h3 className="text-xs font-semibold text-foreground sm:text-sm">
								{title}
							</h3>
							<ul className="mt-2 flex flex-col gap-1.5 sm:mt-3 sm:gap-2">
								{links.map((link) => (
									<li key={link.label}>
										{"href" in link && link.href ? (
											<Link
												href={link.href}
												className="text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
											>
												{link.label}
											</Link>
										) : (
											<span className="text-xs text-muted-foreground sm:text-sm">
												{link.label}
											</span>
										)}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Bottom bar */}
				<div className="mt-8 flex flex-col items-center gap-3 border-t border-border/40 pt-5 text-center sm:mt-10 sm:flex-row sm:justify-between sm:pt-6 sm:text-left">
					<p className="text-xs text-muted-foreground">
						&copy; {new Date().getFullYear()} MerkMetryx. All rights reserved.
					</p>
					<div className="flex gap-6">
						<span className="text-xs text-muted-foreground">
							Privacy Policy
						</span>
						<span className="text-xs text-muted-foreground">
							Terms of Service
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
