"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
	{ label: "Product", href: "/product" },
	{ label: "Solutions", href: "/solutions" },
	{ label: "Pricing", href: "/pricing" },
	{ label: "Resources", href: "/resources" },
	{ label: "About", href: "/about" },
];

export function Navbar() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const pathname = usePathname();

	return (
		<header className="fixed top-0  right-0 left-0 z-50 w-full">
			<div className="mx-auto max-w-5xl   px-4 pt-4">
				<nav className="flex h-14 items-center justify-between rounded-full border border-border/40 bg-popover px-2 py-2 pl-6 backdrop-blur-xl">
					{/* Logo */}
					<Link
						href="/"
						className="shrink-0"
					>
						<img
						src="/logo.svg"
						alt="MerkMetryx"
						className="h-8 w-auto object-contain"
					/>
					</Link>

					{/* Desktop nav links — centered */}
					<div className="hidden flex-1 items-center justify-center gap-1 md:flex">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className={cn(
									"rounded-full px-4 py-1.5 text-sm transition-colors",
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
					<div className="hidden shrink-0 items-center gap-2 md:flex">
						<AnimatedThemeToggler className="inline-flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent hover:cursor-pointer" />
						<Link
							href="/contact"
							className="inline-flex items-center rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
						>
							Book a call
						</Link>
					</div>

					{/* Mobile right side */}
					<div className="flex items-center gap-2 md:hidden">
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

				{/* Mobile menu */}
				{mobileOpen && (
					<div className="mt-2 rounded-2xl border border-border/40 bg-background/95 p-4 backdrop-blur-xl md:hidden">
						<div className="flex flex-col gap-1">
							{navLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									onClick={() => setMobileOpen(false)}
									className={cn(
										"rounded-lg px-4 py-2.5 text-sm transition-colors",
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
