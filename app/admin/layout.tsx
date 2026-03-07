import { headers } from "next/headers";
import { AdminNav } from "@/components/admin/admin-nav";
import { logoutAction } from "./login/actions";
import Link from "next/link";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const headersList = await headers();
	const pathname = headersList.get("x-pathname") ?? "";

	// Login page gets no sidebar
	if (pathname === "/admin/login") {
		return <>{children}</>;
	}

	return (
		<div className="min-h-screen bg-background">
			{/* Sidebar */}
			<aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border/50 bg-card md:flex md:flex-col">
				<AdminNav />
			</aside>

			{/* Main */}
			<div className="flex min-h-screen flex-col md:ml-64">
				{/* Mobile topbar */}
				<header className="flex h-14 shrink-0 items-center justify-between border-b border-border/40 bg-card px-4 md:hidden">
					<span className="text-sm font-extrabold">
						<span className="text-primary">Merk</span>
						<span className="text-foreground">Metryx</span>{" "}
						<span className="font-normal text-muted-foreground">Admin</span>
					</span>

					<div className="flex items-center gap-3">
						<Link
							href="/"
							className="text-xs text-muted-foreground hover:text-foreground"
						>
							← Site
						</Link>

						<form action={logoutAction}>
							<button
								type="submit"
								className="text-xs text-muted-foreground hover:text-destructive"
							>
								Sign out
							</button>
						</form>
					</div>
				</header>

				<main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
			</div>
		</div>
	);
}
