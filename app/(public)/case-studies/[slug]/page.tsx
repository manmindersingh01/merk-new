import type { Metadata } from "next";
import { Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { MarkdownContent } from "@/components/blog/markdown-content";
import { CaseStudyCard } from "@/components/case-studies/case-study-card";
import { CaseStudy } from "@/types/case-study";
import { ArrowLeft, Briefcase, Building2, TrendingUp } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";

const industryGradients: Record<string, string> = {
	Technology: "from-blue-600 to-cyan-500",
	Healthcare: "from-emerald-600 to-teal-400",
	"Financial Services": "from-violet-600 to-indigo-400",
	"Retail & E-commerce": "from-orange-500 to-amber-400",
	"Consumer Goods": "from-pink-500 to-rose-400",
	Manufacturing: "from-slate-600 to-slate-400",
	"Media & Entertainment": "from-purple-600 to-fuchsia-400",
	Education: "from-sky-600 to-blue-400",
	"Real Estate": "from-amber-600 to-yellow-400",
	Energy: "from-lime-600 to-green-400",
};

interface CaseStudyPageProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({
	params,
}: CaseStudyPageProps): Promise<Metadata> {
	const { slug } = await params;

	const { data } = await supabase
		.from("case_studies")
		.select("*")
		.eq("slug", slug)
		.eq("published", true)
		.single();

	if (!data) {
		return {
			title: "Case Study Not Found",
		};
	}

	const cs = data as CaseStudy;
	const description =
		cs.excerpt ||
		`Case study: ${cs.title}${cs.client ? ` - ${cs.client}` : ""}${cs.results ? ` - ${cs.results}` : ""}`;

	return {
		title: `${cs.title} - Case Study`,
		description,
		alternates: {
			canonical: `/case-studies/${slug}`,
		},
		keywords: cs.industry
			? [cs.industry, "case study", "market research"]
			: undefined,
		openGraph: {
			title: `${cs.title} - Case Study`,
			description,
			type: "article",
			publishedTime: cs.published_at || undefined,
			images: cs.cover_image_url
				? [
						{
							url: cs.cover_image_url,
							alt: cs.title,
						},
					]
				: undefined,
		},
		twitter: {
			card: "summary_large_image",
			title: `${cs.title} - Case Study`,
			description,
			images: cs.cover_image_url ? [cs.cover_image_url] : undefined,
		},
	};
}

async function RelatedCaseStudies({
	caseStudyId,
	industry,
}: {
	caseStudyId: string;
	industry: string | null;
}) {
	if (!industry) return null;

	const { data: related } = await supabase
		.from("case_studies")
		.select("*")
		.eq("published", true)
		.eq("industry", industry)
		.neq("id", caseStudyId)
		.limit(3);

	const relatedItems: CaseStudy[] = related ?? [];
	if (!relatedItems.length) return null;

	return (
		<section className="border-t border-border/40 bg-card/40 px-4 py-16 sm:px-6 md:px-10">
			<div className="mx-auto max-w-6xl">
				<h2 className="mb-8 text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
					More in {industry}
				</h2>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{relatedItems.map((item) => (
						<CaseStudyCard key={item.id} caseStudy={item} />
					))}
				</div>
			</div>
		</section>
	);
}

function RelatedSkeleton() {
	return (
		<section className="border-t border-border/40 bg-card/40 px-4 py-16 sm:px-6 md:px-10">
			<div className="mx-auto max-w-6xl">
				<div className="mb-8 h-7 w-44 animate-pulse rounded-md bg-muted/50" />
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 3 }).map((_, i) => (
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
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

async function CaseStudyContent({ slug }: { slug: string }) {
	const { data, error } = await supabase
		.from("case_studies")
		.select("*")
		.eq("slug", slug)
		.eq("published", true)
		.single();

	if (error || !data) notFound();

	const cs = data as CaseStudy;
	const gradient =
		industryGradients[cs.industry ?? ""] ?? "from-primary to-primary/60";

	const date = cs.published_at
		? new Date(cs.published_at).toLocaleDateString("en-GB", {
				day: "numeric",
				month: "long",
				year: "numeric",
			})
		: null;

	const description =
		cs.excerpt ||
		`Case study: ${cs.title}${cs.client ? ` - ${cs.client}` : ""}${cs.results ? ` - ${cs.results}` : ""}`;

	// Generate structured data for Case Study
	const caseStudyStructuredData = {
		"@context": "https://schema.org",
		"@type": "Article",
		"@id": `https://merkmetryx.com/case-studies/${slug}`,
		headline: cs.title,
		description,
		image: cs.cover_image_url || undefined,
		datePublished: cs.published_at || undefined,
		dateModified: cs.updated_at || cs.published_at || undefined,
		author: {
			"@type": "Organization",
			"@id": "https://merkmetryx.com/#organization",
			name: "MerkMetryx",
		},
		publisher: {
			"@type": "Organization",
			"@id": "https://merkmetryx.com/#organization",
			name: "MerkMetryx",
			logo: {
				"@type": "ImageObject",
				url: "https://merkmetryx.com/logo.svg",
			},
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `https://merkmetryx.com/case-studies/${slug}`,
		},
		about: cs.industry
			? {
					"@type": "Thing",
					name: cs.industry,
				}
			: undefined,
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(caseStudyStructuredData),
				}}
			/>
			{/* Hero */}
			<div
				className={cn(
					"relative flex min-h-72 items-end bg-linear-to-br pt-28 sm:min-h-105",
					gradient
				)}
			>
				{cs.cover_image_url && (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={cs.cover_image_url}
						alt={cs.title}
						className="absolute inset-0 h-full w-full object-cover"
					/>
				)}
				<div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/30 to-transparent" />
				<div className="relative mx-auto w-full max-w-4xl px-4 pb-10 sm:px-6 md:px-10">
					<Link
						href="/case-studies"
						className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
					>
						<ArrowLeft className="size-4" />
						Back to Case Studies
					</Link>
					{cs.industry && (
						<span className="mb-3 block w-fit rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
							{cs.industry}
						</span>
					)}
					<h1 className="text-3xl font-extrabold leading-snug tracking-tight text-white sm:text-4xl md:text-5xl">
						{cs.title}
					</h1>
				</div>
			</div>

			{/* Key metrics bar */}
			<div className="border-b border-border/40 bg-card">
				<div className="mx-auto max-w-4xl px-4 py-5 sm:px-6 md:px-10">
					<div className="flex flex-wrap items-center gap-x-8 gap-y-3">
						{cs.client && (
							<div className="flex items-center gap-2.5">
								<div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
									<Briefcase className="size-4 text-primary" />
								</div>
								<div>
									<p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
										Client
									</p>
									<p className="text-sm font-semibold text-foreground">
										{cs.client}
									</p>
								</div>
							</div>
						)}
						{cs.industry && (
							<div className="flex items-center gap-2.5">
								<div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
									<Building2 className="size-4 text-primary" />
								</div>
								<div>
									<p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
										Industry
									</p>
									<p className="text-sm font-semibold text-foreground">
										{cs.industry}
									</p>
								</div>
							</div>
						)}
						{cs.results && (
							<div className="flex items-center gap-2.5">
								<div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10">
									<TrendingUp className="size-4 text-emerald-600" />
								</div>
								<div>
									<p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
										Key Result
									</p>
									<p className="text-sm font-bold text-emerald-600">
										{cs.results}
									</p>
								</div>
							</div>
						)}
						{date && (
							<p className="ml-auto text-xs text-muted-foreground">{date}</p>
						)}
					</div>
				</div>
			</div>

			{/* Article body */}
			<article className="px-4 py-12 sm:px-6 sm:py-16 md:px-10">
				<div className="mx-auto max-w-4xl">
					{cs.excerpt && (
						<p className="mb-8 text-lg font-medium leading-relaxed text-muted-foreground sm:text-xl">
							{cs.excerpt}
						</p>
					)}
					{cs.content && <MarkdownContent content={cs.content} />}
				</div>
			</article>

			{/* Related — streams in after main content */}
			<Suspense fallback={<RelatedSkeleton />}>
				<RelatedCaseStudies caseStudyId={cs.id} industry={cs.industry} />
			</Suspense>
		</>
	);
}

function CaseStudySkeleton() {
	return (
		<>
			{/* Hero skeleton */}
			<div className="relative flex min-h-72 items-end pt-28 sm:min-h-105">
				<div className="absolute inset-0 animate-pulse bg-muted/40" />
				<div className="relative mx-auto w-full max-w-4xl px-4 pb-10 sm:px-6 md:px-10">
					<div className="mb-6 h-4 w-36 animate-pulse rounded-md bg-muted/60" />
					<div className="mb-3 h-4 w-28 animate-pulse rounded-full bg-muted/60" />
					<div className="h-9 w-3/4 animate-pulse rounded-md bg-muted/60" />
					<div className="mt-2 h-9 w-1/2 animate-pulse rounded-md bg-muted/60" />
				</div>
			</div>

			{/* Metrics bar skeleton */}
			<div className="border-b border-border/40 bg-card px-4 py-5 sm:px-6 md:px-10">
				<div className="mx-auto flex max-w-4xl flex-wrap items-center gap-x-8 gap-y-3">
					{Array.from({ length: 3 }).map((_, i) => (
						<div key={i} className="flex items-center gap-2.5">
							<div className="size-8 animate-pulse rounded-lg bg-muted/50" />
							<div className="flex flex-col gap-1.5">
								<div className="h-2.5 w-12 animate-pulse rounded-md bg-muted/50" />
								<div className="h-3.5 w-20 animate-pulse rounded-md bg-muted/50" />
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Article skeleton */}
			<article className="px-4 py-12 sm:px-6 sm:py-16 md:px-10">
				<div className="mx-auto max-w-4xl space-y-3">
					<div className="h-5 w-full animate-pulse rounded-md bg-muted/50" />
					<div className="h-5 w-5/6 animate-pulse rounded-md bg-muted/50" />
					<div className="h-5 w-4/5 animate-pulse rounded-md bg-muted/50" />
					<div className="mt-6 h-5 w-full animate-pulse rounded-md bg-muted/50" />
					<div className="h-5 w-3/4 animate-pulse rounded-md bg-muted/50" />
					<div className="h-5 w-full animate-pulse rounded-md bg-muted/50" />
					<div className="h-5 w-2/3 animate-pulse rounded-md bg-muted/50" />
					<div className="mt-6 h-5 w-full animate-pulse rounded-md bg-muted/50" />
					<div className="h-5 w-4/5 animate-pulse rounded-md bg-muted/50" />
				</div>
			</article>
		</>
	);
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
	const { slug } = await params;

	return (
		<div className="min-h-screen bg-background">
			<Suspense fallback={<CaseStudySkeleton />}>
				<CaseStudyContent slug={slug} />
			</Suspense>
		</div>
	);
}
