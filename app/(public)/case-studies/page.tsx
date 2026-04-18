import type { Metadata } from "next";
import { Suspense } from "react";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
	title: "MerkMetryx Case Studies – Real Results from Real Research",
	description:
		"See how businesses use MerkMetryx for market sizing, consumer insights, and product validation. Browse our case studies by industry.",
	alternates: {
		canonical: "/case-studies",
	},
	openGraph: {
		url: "https://merkmetryx.com/case-studies",
	},
};
import { CaseStudyCard } from "@/components/case-studies/case-study-card";
import { CaseStudy } from "@/types/case-study";
import { ArrowRight, BarChart3 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const INDUSTRIES = [
	"All",
	"Technology",
	"Healthcare",
	"Financial Services",
	"Retail & E-commerce",
	"Consumer Goods",
	"Manufacturing",
	"Media & Entertainment",
	"Education",
	"Real Estate",
	"Energy",
];

interface CaseStudiesPageProps {
	searchParams: Promise<{ industry?: string }>;
}

async function CaseStudiesList({ industry }: { industry: string }) {
	let query = supabase
		.from("case_studies")
		.select("*")
		.eq("published", true)
		.order("published_at", { ascending: false });

	if (industry !== "All") {
		query = query.eq("industry", industry);
	}

	const { data, error } = await query;

	if (error) console.error("Error fetching case studies:", error);

	const all: CaseStudy[] = data ?? [];
	const featured = all[0] ?? null;
	const rest = all.slice(1);

	if (all.length === 0) {
		return (
			<div className="rounded-2xl border border-border/40 bg-card px-8 py-20 text-center">
				<p className="text-muted-foreground">
					No case studies in this category yet. Check back soon.
				</p>
			</div>
		);
	}

	return (
		<>
			{featured && (
				<div className="mb-10">
					<CaseStudyCard caseStudy={featured} featured />
				</div>
			)}
			{rest.length > 0 && (
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{rest.map((cs) => (
						<CaseStudyCard key={cs.id} caseStudy={cs} />
					))}
				</div>
			)}
		</>
	);
}

function CaseStudiesSkeleton() {
	return (
		<>
			{/* Featured skeleton */}
			<div className="mb-10 overflow-hidden rounded-2xl border border-border/40 bg-card">
				<div className="grid md:grid-cols-2">
					<div className="h-64 animate-pulse rounded-none bg-muted/50 md:h-full" />
					<div className="flex flex-col justify-center gap-4 p-8">
						<div className="h-4 w-24 animate-pulse rounded-md bg-muted/50" />
						<div className="h-8 w-4/5 animate-pulse rounded-md bg-muted/50" />
						<div className="h-4 w-full animate-pulse rounded-md bg-muted/50" />
						<div className="h-4 w-3/4 animate-pulse rounded-md bg-muted/50" />
						<div className="mt-2 h-4 w-32 animate-pulse rounded-md bg-muted/50" />
					</div>
				</div>
			</div>

			{/* Grid skeleton */}
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{Array.from({ length: 6 }).map((_, i) => (
					<div
						key={i}
						className="overflow-hidden rounded-2xl border border-border/40 bg-card"
					>
						<div className="h-44 animate-pulse rounded-none bg-muted/50" />
						<div className="flex flex-col gap-3 p-5">
							<div className="h-3 w-20 animate-pulse rounded-md bg-muted/50" />
							<div className="h-5 w-4/5 animate-pulse rounded-md bg-muted/50" />
							<div className="h-3 w-full animate-pulse rounded-md bg-muted/50" />
							<div className="h-3 w-2/3 animate-pulse rounded-md bg-muted/50" />
							<div className="mt-1 h-3 w-24 animate-pulse rounded-md bg-muted/50" />
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default async function CaseStudiesPage({
	searchParams,
}: CaseStudiesPageProps) {
	const { industry } = await searchParams;
	const activeIndustry = industry ?? "All";

	return (
		<div className="min-h-screen bg-background">
			{/* Hero — renders immediately */}
			<section className="px-4 pb-16 pt-28 sm:px-6 md:px-10 md:pt-36 lg:px-16">
				<div className="mx-auto max-w-6xl">
					<div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
						<div>
							<div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs text-muted-foreground">
								<BarChart3 className="size-3 text-primary" />
								Real-World Impact
							</div>
							<h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
								Case <span className="text-primary">Studies</span>
							</h1>
							<p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
								See how leading brands use MerkMetryx to turn research into
								decisions that drive measurable growth.
							</p>
						</div>
						<Link href="/contact">
							<Button
								variant="outline"
								size="sm"
								className="shrink-0 rounded-full px-5"
							>
								Work with us
								<ArrowRight className="ml-1 size-3.5" />
							</Button>
						</Link>
					</div>

					{/* Industry filter */}
					<div className="mt-10 flex flex-wrap gap-2">
						{INDUSTRIES.map((ind) => (
							<Link
								key={ind}
								href={
									ind === "All"
										? "/case-studies"
										: `/case-studies?industry=${encodeURIComponent(ind)}`
								}
								className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
									activeIndustry === ind
										? "border-primary bg-primary text-primary-foreground"
										: "border-border/40 bg-card text-muted-foreground hover:text-foreground"
								}`}
							>
								{ind}
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Content — streams in independently */}
			<section className="px-4 pb-24 sm:px-6 md:px-10 lg:px-16">
				<div className="mx-auto max-w-6xl">
					<Suspense fallback={<CaseStudiesSkeleton />}>
						<CaseStudiesList industry={activeIndustry} />
					</Suspense>
				</div>
			</section>
		</div>
	);
}
