"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { requireAdmin } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CaseStudyInsert } from "@/types/case-study";

function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
}

export async function createCaseStudy(formData: FormData) {
	await requireAdmin();

	const title = formData.get("title") as string;
	const excerpt = formData.get("excerpt") as string;
	const content = formData.get("content") as string;
	const client = formData.get("client") as string;
	const industry = formData.get("industry") as string;
	const results = formData.get("results") as string;
	const cover_image_url = formData.get("cover_image_url") as string;
	const published = formData.get("published") === "true";

	const slug = slugify(title);

	const payload: CaseStudyInsert = {
		title,
		slug,
		excerpt: excerpt || null,
		content: content || null,
		client: client || null,
		industry: industry || null,
		results: results || null,
		cover_image_url: cover_image_url || null,
		published,
		published_at: published ? new Date().toISOString() : null,
	};

	const { error } = await supabaseAdmin.from("case_studies").insert([payload]);
	if (error) throw new Error(error.message);

	revalidatePath("/case-studies");
	revalidatePath("/admin/case-studies");
	redirect("/admin/case-studies");
}

export async function updateCaseStudy(id: string, formData: FormData) {
	await requireAdmin();

	const title = formData.get("title") as string;
	const excerpt = formData.get("excerpt") as string;
	const content = formData.get("content") as string;
	const client = formData.get("client") as string;
	const industry = formData.get("industry") as string;
	const results = formData.get("results") as string;
	const cover_image_url = formData.get("cover_image_url") as string;
	const published = formData.get("published") === "true";

	const payload = {
		title,
		excerpt: excerpt || null,
		content: content || null,
		client: client || null,
		industry: industry || null,
		results: results || null,
		cover_image_url: cover_image_url || null,
		published,
		published_at: published ? new Date().toISOString() : null,
	};

	const { error } = await supabaseAdmin
		.from("case_studies")
		.update(payload)
		.eq("id", id);
	if (error) throw new Error(error.message);

	revalidatePath("/case-studies");
	revalidatePath("/admin/case-studies");
	redirect("/admin/case-studies");
}

export async function deleteCaseStudy(id: string) {
	await requireAdmin();

	const { error } = await supabaseAdmin
		.from("case_studies")
		.delete()
		.eq("id", id);
	if (error) throw new Error(error.message);

	revalidatePath("/case-studies");
	revalidatePath("/admin/case-studies");
}

export async function toggleCaseStudyPublish(
	id: string,
	currentState: boolean,
) {
	await requireAdmin();

	const { error } = await supabaseAdmin
		.from("case_studies")
		.update({
			published: !currentState,
			published_at: !currentState ? new Date().toISOString() : null,
		})
		.eq("id", id);
	if (error) throw new Error(error.message);

	revalidatePath("/case-studies");
	revalidatePath("/admin/case-studies");
}
