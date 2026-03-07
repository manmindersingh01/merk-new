import Link from "next/link";
import { ArrowRight, Briefcase, TrendingUp } from "lucide-react";
import { CaseStudy } from "@/types/case-study";
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

interface CaseStudyCardProps {
	caseStudy: CaseStudy;
	featured?: boolean;
}

export function CaseStudyCard({
	caseStudy,
	featured = false,
}: CaseStudyCardProps) {
	const gradient =
		industryGradients[caseStudy.industry ?? ""] ?? "from-primary to-primary/60";

	if (featured) {
		return (
			<Link href={`/case-studies/${caseStudy.slug}`} className="group block">
				<div className="grid overflow-hidden rounded-2xl border border-border/40 bg-card sm:rounded-3xl lg:grid-cols-2">
					{/* Cover */}
					<div
						className={cn(
							"relative flex min-h-56 items-end bg-gradient-to-br p-8 lg:min-h-80",
							gradient
						)}
					>
						{caseStudy.cover_image_url && (
							// eslint-disable-next-line @next/next/no-img-element
							<img
								src={caseStudy.cover_image_url}
								alt={caseStudy.title}
								className="absolute inset-0 h-full w-full object-cover"
							/>
						)}
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
						{caseStudy.industry && (
							<span className="relative rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
								{caseStudy.industry}
							</span>
						)}
					</div>

					{/* Content */}
					<div className="flex flex-col justify-between p-8">
						<div>
							<span className="mb-3 inline-block rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
								Featured
							</span>
							<h2 className="text-xl font-extrabold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">
								{caseStudy.title}
							</h2>
							{caseStudy.excerpt && (
								<p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
									{caseStudy.excerpt}
								</p>
							)}
						</div>

						<div className="mt-6 space-y-3 border-t border-border/40 pt-5">
							{caseStudy.client && (
								<p className="flex items-center gap-2 text-xs text-muted-foreground">
									<Briefcase className="size-3.5 shrink-0" />
									<span className="font-medium text-foreground">
										{caseStudy.client}
									</span>
								</p>
							)}
							{caseStudy.results && (
								<p className="flex items-center gap-2 text-xs text-muted-foreground">
									<TrendingUp className="size-3.5 shrink-0 text-emerald-500" />
									<span className="font-semibold text-emerald-600">
										{caseStudy.results}
									</span>
								</p>
							)}
							<p className="flex items-center gap-1 text-xs font-semibold text-primary">
								Read case study
								<ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
							</p>
						</div>
					</div>
				</div>
			</Link>
		);
	}

	return (
		<Link
			href={`/case-studies/${caseStudy.slug}`}
			className="group flex flex-col"
		>
			<div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-border/40 bg-card transition-shadow hover:shadow-md sm:rounded-3xl">
				{/* Cover */}
				<div
					className={cn(
						"relative flex h-44 items-end bg-gradient-to-br p-5",
						gradient
					)}
				>
					{caseStudy.cover_image_url && (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={caseStudy.cover_image_url}
							alt={caseStudy.title}
							className="absolute inset-0 h-full w-full object-cover"
						/>
					)}
					<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
					{caseStudy.industry && (
						<span className="relative rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
							{caseStudy.industry}
						</span>
					)}
				</div>

				{/* Content */}
				<div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
					<div>
						<h3 className="text-base font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-lg">
							{caseStudy.title}
						</h3>
						{caseStudy.excerpt && (
							<p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
								{caseStudy.excerpt}
							</p>
						)}
					</div>

					<div className="mt-5 space-y-2 border-t border-border/40 pt-4">
						{caseStudy.client && (
							<p className="flex items-center gap-1.5 text-xs text-muted-foreground">
								<Briefcase className="size-3 shrink-0" />
								{caseStudy.client}
							</p>
						)}
						{caseStudy.results && (
							<p className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
								<TrendingUp className="size-3 shrink-0" />
								{caseStudy.results}
							</p>
						)}
						<p className="flex items-center gap-1 pt-1 text-xs font-semibold text-primary">
							Read case study
							<ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
						</p>
					</div>
				</div>
			</div>
		</Link>
	);
}
