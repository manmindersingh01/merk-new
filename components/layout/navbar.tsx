"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Menu, X, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
	{ label: "Product", href: "/product" },
	{ label: "Solutions", href: "/solutions" },
	{ label: "Pricing", href: "/pricing" },
	{ label: "Case Studies", href: "/case-studies" },
	{ label: "Blog", href: "/blog" },
	{ label: "About", href: "/about" },
	{ label: "Contact", href: "/contact" }
];

export function Navbar() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const pathname = usePathname();
	const router = useRouter();
	const isHomePage = pathname === "/";

	return (
		<header className="fixed top-0 right-0 left-0 z-50 w-full">
			<div className="mx-auto max-w-7xl px-4 pt-4">
				<div className="flex items-center gap-2">
					{/* Desktop back button - outside the navbar bubble */}
					{!isHomePage && (
						<button
							onClick={() => router.back()}
							aria-label="Go back to previous page"
							title="Go back"
							className="hidden sm:inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border/40 bg-popover text-foreground transition-colors hover:bg-accent backdrop-blur-xl"
						>
							<ArrowLeft className="size-5" />
						</button>
					)}

					<nav className="flex h-17 flex-1 items-center justify-between rounded-full border border-border/40 bg-popover px-2 py-2 pl-4 backdrop-blur-xl">
					{/* Logo — renders SVG at 200px wide and clips to show the
					    wordmark+icon region (SVG content sits at y≈172–216 in
					    a 375×375 canvas; at scale 200/375≈0.533 that maps to
					    rendered y≈80–115 px, so we offset by -80px). */}
					<Link href="/" className="shrink-0">
						<div
							className="overflow-hidden"
							style={{ width: "195px", height: "36px" }}
						>
							<img
								src="/logo.svg"
								alt="MerkMetryx"
								style={{ marginTop: "-80px" }}
							/>
						</div>
					</Link>

					{/* Desktop nav links — centered */}
					<div className="hidden flex-1 items-center justify-center gap-1 lg:flex">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className={cn(
									"rounded-full px-4 py-2 text-base transition-colors",
									pathname === link.href
										? "text-foreground"
										: "text-muted-foreground hover:text-foreground"
								)}
							>
								{link.label}
							</Link>
						))}
					</div>

					{/* Desktop right side */}
					<div className="hidden shrink-0 items-center gap-2 lg:flex">
						<AnimatedThemeToggler className="inline-flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent hover:cursor-pointer" />
						<Link
							href="/contact"
							className="inline-flex items-center rounded-full bg-foreground px-5 py-2.5 text-base font-medium text-background transition-opacity hover:opacity-90"
						>
							Book a call
						</Link>
					</div>

					{/* Mobile right side */}
					<div className="flex items-center gap-2 lg:hidden">
						<AnimatedThemeToggler className="inline-flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent p-2" />
						<button
							onClick={() => setMobileOpen(!mobileOpen)}
							className="inline-flex items-center justify-center rounded-full p-2 text-foreground"
						>
							{mobileOpen ? (
								<X className="size-5" />
							) : (
								<Menu className="size-5" />
							)}
						</button>
					</div>
				</nav>
				</div>

				{/* Mobile menu */}
				{mobileOpen && (
					<div className="mt-2 rounded-2xl border border-border/40 bg-background/95 p-4 backdrop-blur-xl lg:hidden">
						<div className="flex flex-col gap-1">
							{navLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									onClick={() => setMobileOpen(false)}
									className={cn(
										"rounded-lg px-4 py-3 text-base transition-colors",
										pathname === link.href
											? "text-foreground"
											: "text-muted-foreground hover:text-foreground"
									)}
								>
									{link.label}
								</Link>
							))}
							<div className="mt-3 border-t border-border/40 pt-3">
								<Link
									href="/contact"
									onClick={() => setMobileOpen(false)}
									className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
								>
									Book a call
								</Link>
							</div>
						</div>
					</div>
				)}
			</div>
		</header>
	);
}
