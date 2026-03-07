import { supabaseAdmin as supabase } from "@/lib/supabase-admin";
import { ApplicantsTable } from "@/components/admin/applicants-table";
import { Users } from "lucide-react";

export default async function ApplicantsPage() {
	const { data: applicants } = await supabase
		.from("job_applications")
		.select("*")
		.order("created_at", { ascending: false });

	const allApplicants = applicants ?? [];

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const todayApplicants = allApplicants.filter(
		(a) => new Date(a.created_at) >= today
	).length;

	const monthApplicants = allApplicants.filter((a) => {
		const d = new Date(a.created_at);
		const now = new Date();
		return (
			d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
		);
	}).length;

	return (
		<div>
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-2xl font-extrabold tracking-tight text-foreground">
					Applicants
				</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					Job applications submitted from the careers page.
				</p>
			</div>

			{/* Stats */}
			<div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
				{[
					{
						icon: Users,
						label: "Total Applicants",
						value: allApplicants.length,
					},
					{ icon: Users, label: "New Today", value: todayApplicants },
					{ icon: Users, label: "This Month", value: monthApplicants },
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
			<ApplicantsTable applicants={allApplicants} />
		</div>
	);
}
