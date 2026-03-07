import { supabaseAdmin as supabase } from "@/lib/supabase-admin";
import { LeadsTable } from "@/components/admin/leads-table";
import { Users } from "lucide-react";

export default async function LeadsPage() {
	const { data: leads } = await supabase
		.from("leads")
		.select("*")
		.order("created_at", { ascending: false });

	const allLeads = leads ?? [];
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const todayLeads = allLeads.filter(
		(l) => new Date(l.created_at) >= today
	).length;

	return (
		<div>
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-2xl font-extrabold tracking-tight text-foreground">
					Leads
				</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					Contact form submissions from your website.
				</p>
			</div>

			{/* Stats */}
			<div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
				{[
					{ icon: Users, label: "Total Leads", value: allLeads.length },
					{ icon: Users, label: "New Today", value: todayLeads },
					{
						icon: Users,
						label: "This Month",
						value: allLeads.filter((l) => {
							const d = new Date(l.created_at);
							const now = new Date();
							return (
								d.getMonth() === now.getMonth() &&
								d.getFullYear() === now.getFullYear()
							);
						}).length,
					},
				].map((stat) => {
					const Icon = stat.icon;
					return (
						<div
							key={stat.label}
							className="rounded-2xl border border-border/40 bg-card px-5 py-4"
						>
							<div className="mb-2 flex size-8 items-center justify-center rounded-lg bg-primary/10">
								<Icon className="size-4 text-primary" />
							</div>
							<p className="text-2xl font-extrabold text-foreground">
								{stat.value}
							</p>
							<p className="text-xs text-muted-foreground">{stat.label}</p>
						</div>
					);
				})}
			</div>

			{/* Table */}
			<LeadsTable leads={allLeads} />
		</div>
	);
}
