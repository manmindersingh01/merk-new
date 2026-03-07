import { supabaseAdmin as supabase } from "@/lib/supabase-admin";
import { DashboardCharts } from "@/components/admin/dashboard-charts";
import { Post } from "@/types/blog";
import Link from "next/link";
import {
	FileText,
	Globe,
	FileEdit,
	Users,
	Eye,
	TrendingUp,
} from "lucide-react";

export default async function AdminPage() {
	const [{ data: posts }, { data: leads }, { data: pageViews }] =
		await Promise.all([
			supabase
				.from("posts")
				.select("*")
				.order("created_at", { ascending: false }),
			supabase
				.from("leads")
				.select("id, created_at, location, service")
				.order("created_at", { ascending: false }),
			supabase
				.from("page_views")
				.select("id, path, created_at")
				.order("created_at", { ascending: false }),
		]);

	const allPosts: Post[] = posts ?? [];
	const allLeads = leads ?? [];
	const allPageViews = pageViews ?? [];
	const published = allPosts.filter((p) => p.published).length;
	const drafts = allPosts.filter((p) => !p.published).length;
	const totalLeads = allLeads.length;

	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const viewsToday = allPageViews.filter(
		(v) => new Date(v.created_at) >= today
	).length;

	return (
		<div>
			{/* Page header */}
			<div className="mb-8">
				<h1 className="text-2xl font-extrabold tracking-tight text-foreground">
					Dashboard
				</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					Overview of your content, leads, and site performance.
				</p>
			</div>

			{/* Stats row */}
			<div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
				{[
					{
						icon: Eye,
						label: "Total Views",
						value: allPageViews.length,
					},
					{
						icon: TrendingUp,
						label: "Views Today",
						value: viewsToday,
					},
					{
						icon: FileText,
						label: "Total Posts",
						value: allPosts.length,
					},
					{ icon: Globe, label: "Published", value: published },
					{ icon: FileEdit, label: "Drafts", value: drafts },
					{
						icon: Users,
						label: "Leads",
						value: totalLeads,
						href: "/admin/leads",
					},
				].map((stat) => {
					const Icon = stat.icon;
					const card = (
						<div className="rounded-2xl border border-border/40 bg-card px-5 py-4 transition-colors hover:border-border/60">
							<div className="mb-2 flex size-8 items-center justify-center rounded-lg bg-primary/10">
								<Icon className="size-4 text-primary" />
							</div>
							<p className="text-2xl font-extrabold text-foreground">
								{stat.value}
							</p>
							<p className="text-xs text-muted-foreground">{stat.label}</p>
						</div>
					);
					return stat.href ? (
						<Link key={stat.label} href={stat.href}>
							{card}
						</Link>
					) : (
						<div key={stat.label}>{card}</div>
					);
				})}
			</div>

			{/* Analytics charts */}
			<div className="mb-2">
				<h2 className="text-base font-bold text-foreground">Analytics</h2>
				<p className="mt-0.5 text-xs text-muted-foreground">
					Visitors, leads, and content performance overview.
				</p>
			</div>
			<DashboardCharts
				leads={allLeads}
				posts={allPosts}
				pageViews={allPageViews}
			/>
		</div>
	);
}
