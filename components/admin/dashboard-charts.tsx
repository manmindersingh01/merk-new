"use client";

import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	AreaChart,
	Area,
} from "recharts";

/* ─── Types ─────────────────────────────────────────────────── */

interface Lead {
	id: string;
	created_at: string;
	location: string | null;
	service: string | null;
}

interface Post {
	id: string;
	published: boolean;
	category: string | null;
	created_at: string;
	published_at: string | null;
}

interface PageView {
	id: string;
	path: string;
	created_at: string;
}

interface DashboardChartsProps {
	leads: Lead[];
	posts: Post[];
	pageViews: PageView[];
}

/* ─── Palette ───────────────────────────────────────────────── */

const COLORS = [
	"#2f4fd8",
	"#6366f1",
	"#8b5cf6",
	"#0ea5e9",
	"#14b8a6",
	"#f59e0b",
	"#ef4444",
	"#ec4899",
	"#22c55e",
	"#f97316",
];

/* ─── Helpers ───────────────────────────────────────────────── */

function extractCountry(location: string | null): string {
	if (!location) return "Unknown";
	const parts = location.split(",").map((s) => s.trim());
	return parts[parts.length - 1] || "Unknown";
}

function getLeadsByCountry(leads: Lead[]) {
	const counts: Record<string, number> = {};
	leads.forEach((l) => {
		const country = extractCountry(l.location);
		counts[country] = (counts[country] || 0) + 1;
	});
	return Object.entries(counts)
		.map(([name, value]) => ({ name, value }))
		.sort((a, b) => b.value - a.value)
		.slice(0, 10);
}

function getLeadsByService(leads: Lead[]) {
	const counts: Record<string, number> = {};
	leads.forEach((l) => {
		const service = l.service || "Unspecified";
		counts[service] = (counts[service] || 0) + 1;
	});
	return Object.entries(counts)
		.map(([name, value]) => ({ name, value }))
		.sort((a, b) => b.value - a.value);
}

function getLeadsOverTime(leads: Lead[]) {
	const counts: Record<string, number> = {};
	leads.forEach((l) => {
		const date = new Date(l.created_at);
		const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
		counts[key] = (counts[key] || 0) + 1;
	});
	return Object.entries(counts)
		.sort(([a], [b]) => a.localeCompare(b))
		.slice(-12)
		.map(([month, count]) => {
			const [y, m] = month.split("-");
			const label = new Date(+y, +m - 1).toLocaleDateString("en-US", {
				month: "short",
				year: "2-digit",
			});
			return { name: label, leads: count };
		});
}

function getPostsByCategory(posts: Post[]) {
	const counts: Record<string, number> = {};
	posts.forEach((p) => {
		const cat = p.category || "Uncategorized";
		counts[cat] = (counts[cat] || 0) + 1;
	});
	return Object.entries(counts)
		.map(([name, value]) => ({ name, value }))
		.sort((a, b) => b.value - a.value);
}

function getPageViewsOverTime(views: PageView[]) {
	// Daily counts for the last 30 days
	const now = new Date();
	const thirtyDaysAgo = new Date(now);
	thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
	thirtyDaysAgo.setHours(0, 0, 0, 0);

	// Initialise all 30 days to 0
	const dayMap: Record<string, number> = {};
	for (let i = 0; i < 30; i++) {
		const d = new Date(thirtyDaysAgo);
		d.setDate(d.getDate() + i);
		const key = d.toISOString().slice(0, 10);
		dayMap[key] = 0;
	}

	views.forEach((v) => {
		const key = new Date(v.created_at).toISOString().slice(0, 10);
		if (key in dayMap) {
			dayMap[key]++;
		}
	});

	return Object.entries(dayMap)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([date, count]) => {
			const d = new Date(date + "T00:00:00");
			const label = d.toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
			});
			return { name: label, views: count };
		});
}

function getTopPages(views: PageView[]) {
	const counts: Record<string, number> = {};
	views.forEach((v) => {
		counts[v.path] = (counts[v.path] || 0) + 1;
	});
	return Object.entries(counts)
		.map(([name, value]) => ({
			name: name === "/" ? "Home" : name,
			value,
		}))
		.sort((a, b) => b.value - a.value)
		.slice(0, 8);
}

/* ─── Shared tooltip style ──────────────────────────────────── */

const tooltipStyle = {
	contentStyle: {
		background: "var(--card)",
		border: "1px solid var(--border)",
		borderRadius: "0.75rem",
		fontSize: "0.75rem",
		color: "var(--foreground)",
	},
	itemStyle: { color: "var(--foreground)" },
	labelStyle: { color: "var(--muted-foreground)", fontWeight: 600 },
};

/* ─── Component ─────────────────────────────────────────────── */

export function DashboardCharts({
	leads,
	posts,
	pageViews,
}: DashboardChartsProps) {
	const byCountry = getLeadsByCountry(leads);
	const byService = getLeadsByService(leads);
	const leadsOverTime = getLeadsOverTime(leads);
	const byCategory = getPostsByCategory(posts);
	const viewsOverTime = getPageViewsOverTime(pageViews);
	const topPages = getTopPages(pageViews);

	return (
		<div className="mb-8 grid gap-6 lg:grid-cols-2">
			{/* Page views over time (last 30 days) */}
			<ChartCard title="Page Views — Last 30 Days">
				{pageViews.length === 0 ? (
					<EmptyState />
				) : (
					<ResponsiveContainer width="100%" height={260}>
						<AreaChart data={viewsOverTime}>
							<defs>
								<linearGradient id="viewGrad" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
									<stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
								</linearGradient>
							</defs>
							<CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
							<XAxis
								dataKey="name"
								tick={{
									fontSize: 10,
									fill: "var(--muted-foreground)",
								}}
								axisLine={{ stroke: "var(--border)" }}
								tickLine={false}
								interval="preserveStartEnd"
							/>
							<YAxis
								allowDecimals={false}
								tick={{
									fontSize: 11,
									fill: "var(--muted-foreground)",
								}}
								axisLine={false}
								tickLine={false}
							/>
							<Tooltip {...tooltipStyle} />
							<Area
								type="monotone"
								dataKey="views"
								stroke="#14b8a6"
								strokeWidth={2}
								fill="url(#viewGrad)"
							/>
						</AreaChart>
					</ResponsiveContainer>
				)}
			</ChartCard>

			{/* Top pages */}
			<ChartCard title="Top Pages">
				{topPages.length === 0 ? (
					<EmptyState />
				) : (
					<ResponsiveContainer width="100%" height={260}>
						<BarChart data={topPages} layout="vertical" margin={{ left: 8 }}>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="var(--border)"
								horizontal={false}
							/>
							<XAxis
								type="number"
								allowDecimals={false}
								tick={{
									fontSize: 11,
									fill: "var(--muted-foreground)",
								}}
								axisLine={{ stroke: "var(--border)" }}
								tickLine={false}
							/>
							<YAxis
								dataKey="name"
								type="category"
								width={100}
								tick={{
									fontSize: 11,
									fill: "var(--muted-foreground)",
								}}
								axisLine={false}
								tickLine={false}
							/>
							<Tooltip {...tooltipStyle} />
							<Bar
								dataKey="value"
								name="Views"
								fill="#14b8a6"
								radius={[0, 6, 6, 0]}
								barSize={18}
							/>
						</BarChart>
					</ResponsiveContainer>
				)}
			</ChartCard>

			{/* Leads over time */}
			<ChartCard title="Leads Over Time">
				{leadsOverTime.length === 0 ? (
					<EmptyState />
				) : (
					<ResponsiveContainer width="100%" height={260}>
						<AreaChart data={leadsOverTime}>
							<defs>
								<linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="#2f4fd8" stopOpacity={0.3} />
									<stop offset="95%" stopColor="#2f4fd8" stopOpacity={0} />
								</linearGradient>
							</defs>
							<CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
							<XAxis
								dataKey="name"
								tick={{
									fontSize: 11,
									fill: "var(--muted-foreground)",
								}}
								axisLine={{ stroke: "var(--border)" }}
								tickLine={false}
							/>
							<YAxis
								allowDecimals={false}
								tick={{
									fontSize: 11,
									fill: "var(--muted-foreground)",
								}}
								axisLine={false}
								tickLine={false}
							/>
							<Tooltip {...tooltipStyle} />
							<Area
								type="monotone"
								dataKey="leads"
								stroke="#2f4fd8"
								strokeWidth={2}
								fill="url(#leadGrad)"
							/>
						</AreaChart>
					</ResponsiveContainer>
				)}
			</ChartCard>

			{/* Leads by country */}
			<ChartCard title="Leads by Country">
				{byCountry.length === 0 ? (
					<EmptyState />
				) : (
					<ResponsiveContainer width="100%" height={260}>
						<BarChart data={byCountry} layout="vertical" margin={{ left: 8 }}>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="var(--border)"
								horizontal={false}
							/>
							<XAxis
								type="number"
								allowDecimals={false}
								tick={{
									fontSize: 11,
									fill: "var(--muted-foreground)",
								}}
								axisLine={{ stroke: "var(--border)" }}
								tickLine={false}
							/>
							<YAxis
								dataKey="name"
								type="category"
								width={90}
								tick={{
									fontSize: 11,
									fill: "var(--muted-foreground)",
								}}
								axisLine={false}
								tickLine={false}
							/>
							<Tooltip {...tooltipStyle} />
							<Bar
								dataKey="value"
								name="Leads"
								fill="#2f4fd8"
								radius={[0, 6, 6, 0]}
								barSize={18}
							/>
						</BarChart>
					</ResponsiveContainer>
				)}
			</ChartCard>

			{/* Leads by service */}
			<ChartCard title="Leads by Service">
				{byService.length === 0 ? (
					<EmptyState />
				) : (
					<ResponsiveContainer width="100%" height={260}>
						<PieChart>
							<Pie
								data={byService}
								cx="50%"
								cy="50%"
								innerRadius={55}
								outerRadius={95}
								paddingAngle={3}
								dataKey="value"
								nameKey="name"
								stroke="none"
							>
								{byService.map((_, i) => (
									<Cell key={i} fill={COLORS[i % COLORS.length]} />
								))}
							</Pie>
							<Tooltip {...tooltipStyle} />
						</PieChart>
					</ResponsiveContainer>
				)}
				{byService.length > 0 && (
					<div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 px-1">
						{byService.map((s, i) => (
							<span
								key={s.name}
								className="flex items-center gap-1.5 text-xs text-muted-foreground"
							>
								<span
									className="inline-block size-2.5 rounded-full"
									style={{
										background: COLORS[i % COLORS.length],
									}}
								/>
								{s.name}{" "}
								<span className="font-semibold text-foreground">
									({s.value})
								</span>
							</span>
						))}
					</div>
				)}
			</ChartCard>

			{/* Posts by category */}
			<ChartCard title="Posts by Category">
				{byCategory.length === 0 ? (
					<EmptyState />
				) : (
					<ResponsiveContainer width="100%" height={260}>
						<BarChart data={byCategory}>
							<CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
							<XAxis
								dataKey="name"
								tick={{
									fontSize: 11,
									fill: "var(--muted-foreground)",
								}}
								axisLine={{ stroke: "var(--border)" }}
								tickLine={false}
							/>
							<YAxis
								allowDecimals={false}
								tick={{
									fontSize: 11,
									fill: "var(--muted-foreground)",
								}}
								axisLine={false}
								tickLine={false}
							/>
							<Tooltip {...tooltipStyle} />
							<Bar
								dataKey="value"
								name="Posts"
								radius={[6, 6, 0, 0]}
								barSize={32}
							>
								{byCategory.map((_, i) => (
									<Cell key={i} fill={COLORS[i % COLORS.length]} />
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				)}
			</ChartCard>
		</div>
	);
}

/* ─── Sub-components ────────────────────────────────────────── */

function ChartCard({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className="rounded-2xl border border-border/40 bg-card p-5">
			<h3 className="mb-4 text-sm font-bold text-foreground">{title}</h3>
			{children}
		</div>
	);
}

function EmptyState() {
	return (
		<div className="flex h-[260px] items-center justify-center">
			<p className="text-xs text-muted-foreground">No data yet.</p>
		</div>
	);
}
