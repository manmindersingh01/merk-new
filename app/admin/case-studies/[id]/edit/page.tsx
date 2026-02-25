import { supabaseAdmin as supabase } from "@/lib/supabase-admin";
import { CaseStudyForm } from "@/components/admin/case-study-form";
import { CaseStudy } from "@/types/case-study";
import { notFound } from "next/navigation";

interface EditCaseStudyPageProps {
	params: Promise<{ id: string }>;
}

export default async function EditCaseStudyPage({
	params,
}: EditCaseStudyPageProps) {
	const { id } = await params;

	const { data, error } = await supabase
		.from("case_studies")
		.select("*")
		.eq("id", id)
		.single();

	if (error || !data) notFound();

	return <CaseStudyForm caseStudy={data as CaseStudy} />;
}
