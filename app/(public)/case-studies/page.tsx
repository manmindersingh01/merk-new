import { supabase } from "@/lib/supabase";
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

export default async function CaseStudiesPage({
	searchParams,
}: CaseStudiesPageProps) {
	const { industry } = await searchParams;
	const activeIndustry = industry ?? "All";

	let query = supabase
		.from("case_studies")
		.select("*")
		.eq("published", true)
		.order("published_at", { ascending: false });

	if (activeIndustry !== "All") {
		query = query.eq("industry", activeIndustry);
	}

	const { data, error } = await query;

	if (error) console.error("Error fetching case studies:", error);

	const all: CaseStudy[] = data ?? [];
	const featured = all[0] ?? null;
	const rest = all.slice(1);

	return (
		<div className="min-h-screen bg-background">
			{/* Hero */}
			<section className="px-4 pb-16 pt-28 sm:px-6 md:px-10 md:pt-36 lg:px-16">
				<div className="mx-auto max-w-6xl">
					<div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
						<div>
							<div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs text-muted-foreground">
								<BarChart3 className="size-3 text-primary" />
								Real-World Impact
							</div>
							<h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
								Case{" "}
								<span className="text-primary">Studies</span>
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

			{/* Content */}
			<section className="px-4 pb-24 sm:px-6 md:px-10 lg:px-16">
				<div className="mx-auto max-w-6xl">
					{all.length === 0 ? (
						<div className="rounded-2xl border border-border/40 bg-card px-8 py-20 text-center">
							<p className="text-muted-foreground">
								No case studies in this category yet. Check back soon.
							</p>
						</div>
					) : (
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
					)}
				</div>
			</section>
		</div>
	);
}
