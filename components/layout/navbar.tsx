"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Menu, X, ArrowLeft, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
	{ label: "Product", href: "/product" },
	{ label: "Solutions", href: "/solutions" },
	{ label: "Pricing", href: "/pricing" },
];

const resourceLinks = [
	{ label: "Blog", href: "/blog" },
	{ label: "Case Studies", href: "/case-studies" },
];

const companyLinks = [
	{ label: "About", href: "/about" },
	{ label: "Careers", href: "/careers" },
	{ label: "Contact", href: "/contact" },
];

const mobileNavLinks = [
	...navLinks,
	...resourceLinks,
	...companyLinks,
];

function DropdownMenu({
	label,
	links,
	pathname,
}: {
	label: string;
	links: { label: string; href: string }[];
	pathname: string;
}) {
	const [open, setOpen] = useState(false);

	return (
		<div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
			<button
				className={cn(
					"flex items-center gap-1 rounded-full px-4 py-2 text-base cursor-pointer transition-colors",
					"text-muted-foreground hover:text-foreground"
				)}
			>
				{label}
				<ChevronDown
					className={cn(
						"size-4 transition-transform duration-200",
						open ? "rotate-180" : "rotate-0"
					)}
				/>
			</button>

			{open && (
				<div className="absolute left-0 top-full pt-2 z-50">
					<ul className="w-48 rounded-xl border border-border/40 bg-popover p-2 shadow-md backdrop-blur-xl">
						{links.map((link) => (
							<li key={link.href}>
								<Link
									href={link.href}
									onClick={() => setOpen(false)}
									className={cn(
										"block rounded-md px-3 py-2 text-sm cursor-pointer transition-colors",
										pathname === link.href
											? "text-foreground"
											: "text-muted-foreground hover:text-foreground"
									)}
								>
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export function Navbar() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const pathname = usePathname();
	const router = useRouter();
	const isHomePage = pathname === "/";

	return (
		<header className="fixed top-0 right-0 left-0 z-50 w-full">
			<div className="mx-auto max-w-7xl px-4 pt-4">
				<div className="flex items-center gap-2">
					{/* Desktop back button */}
					{!isHomePage && (
						<button
							onClick={() => router.back()}
							aria-label="Go back to previous page"
							title="Go back"
							className="hidden sm:inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border/40 bg-popover text-foreground cursor-pointer transition-colors hover:text-foreground backdrop-blur-xl"
						>
							<ArrowLeft className="size-5" />
						</button>
					)}

					<nav className="flex h-17 flex-1 items-center justify-between rounded-full border border-border/40 bg-popover px-2 py-2 pl-4 backdrop-blur-xl">
						{/* Logo */}
						<Link href="/" className="shrink-0">
							<div
								className="overflow-hidden"
								style={{ width: "195px", height: "36px" }}
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src="/logo.svg"
									alt="MerkMetryx"
									style={{ marginTop: "-80px" }}
								/>
							</div>
						</Link>

						{/* Desktop nav links — centered */}
						<div className="relative hidden flex-1 items-center justify-center lg:flex">
							<div className="flex items-center gap-1">
								{/* Normal links */}
								{navLinks.map((link) => (
									<Link
										key={link.href}
										href={link.href}
										className={cn(
											"rounded-full px-4 py-2 text-base cursor-pointer transition-colors",
											pathname === link.href
												? "text-foreground"
												: "text-muted-foreground hover:text-foreground"
										)}
									>
										{link.label}
									</Link>
								))}

								{/* Resources dropdown */}
								<DropdownMenu label="Resources" links={resourceLinks} pathname={pathname} />

								{/* Company dropdown */}
								<DropdownMenu label="Company" links={companyLinks} pathname={pathname} />
							</div>
						</div>

						{/* Desktop right side */}
						<div className="hidden shrink-0 items-center gap-2 lg:flex">
							<AnimatedThemeToggler className="inline-flex size-9 items-center justify-center rounded-full text-foreground cursor-pointer transition-colors hover:text-foreground" />
							<Link
								href="/contact"
								className="inline-flex items-center rounded-full bg-foreground px-5 py-2.5 text-base font-medium text-background cursor-pointer transition-colors"
							>
								Book a call
							</Link>
						</div>

						{/* Mobile right side */}
						<div className="flex items-center gap-2 lg:hidden">
							<AnimatedThemeToggler className="inline-flex size-9 items-center justify-center rounded-full text-foreground cursor-pointer transition-colors hover:text-foreground p-2" />
							<button
								onClick={() => setMobileOpen(!mobileOpen)}
								className="inline-flex items-center justify-center rounded-full p-2 text-foreground cursor-pointer"
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
					<div className="mt-2 rounded-2xl border border-border/40 bg-background p-4 backdrop-blur-xl lg:hidden">
						<div className="flex flex-col gap-1">
							{mobileNavLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									onClick={() => setMobileOpen(false)}
									className={cn(
										"rounded-lg px-4 py-3 text-base cursor-pointer transition-colors",
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
									className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background cursor-pointer"
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