"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	LayoutDashboard,
	FileText,
	Users,
	ExternalLink,
	LogOut,
	ChevronRight,
} from "lucide-react";
import { logoutAction } from "@/app/admin/login/actions";

const NAV = [
	{
		label: "Dashboard",
		href: "/admin",
		icon: LayoutDashboard,
		matchExact: true,
	},
	{
		label: "Blog Posts",
		href: "/admin/posts/new",
		icon: FileText,
		matchPrefix: "/admin/posts",
	},
	{
		label: "Leads",
		href: "/admin/leads",
		icon: Users,
		matchPrefix: "/admin/leads",
	},
];

function active(item: (typeof NAV)[0], pathname: string) {
	if ("matchExact" in item && item.matchExact) return pathname === "/admin";
	if ("matchPrefix" in item && item.matchPrefix)
		return pathname.startsWith(item.matchPrefix);
	return pathname === item.href;
}

export function AdminNav() {
	const pathname = usePathname();

	return (
		<>
			{/* Brand */}
			<div className="flex h-16 items-center gap-3 border-b border-border/40 px-5">
				<div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
					<LayoutDashboard className="size-4 text-primary" />
				</div>
				<div className="leading-tight">
					<p className="text-sm font-extrabold tracking-tight">
						<span className="text-primary">Merk</span>
						<span className="text-foreground">Metryx</span>
					</p>
					<p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
						Admin Panel
					</p>
				</div>
			</div>

			{/* Section label */}
			<div className="px-5 pb-1 pt-5">
				<p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
					Content
				</p>
			</div>

			{/* Nav links */}
			<nav className="flex flex-col gap-0.5 px-3">
				{NAV.map((item) => {
					const isActive = active(item, pathname);
					const Icon = item.icon;
					return (
						<Link
							key={item.label}
							href={item.href}
							className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
								isActive
									? "bg-primary/10 text-primary"
									: "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
							}`}
						>
							<span className="flex items-center gap-3">
								<Icon
									className={`size-4 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
								/>
								{item.label}
							</span>
							{isActive && <ChevronRight className="size-3.5 text-primary/60" />}
						</Link>
					);
				})}
			</nav>

			{/* Spacer */}
			<div className="flex-1" />

			{/* Footer */}
			<div className="border-t border-border/40 p-4">
				<Link
					href="/"
					target="_blank"
					className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground"
				>
					<ExternalLink className="size-3.5" />
					View public site
				</Link>
				<form action={logoutAction}>
					<button
						type="submit"
						className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
					>
						<LogOut className="size-3.5" />
						Sign out
					</button>
				</form>
			</div>
		</>
	);
}
