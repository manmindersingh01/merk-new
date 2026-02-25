"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { requireAdmin } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PostInsert } from "@/types/blog";

function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
}

function calcReadTime(content: string): number {
	const words = content.trim().split(/\s+/).length;
	return Math.max(1, Math.ceil(words / 200));
}

export async function createPost(formData: FormData) {
	await requireAdmin();

	const title = formData.get("title") as string;
	const excerpt = formData.get("excerpt") as string;
	const content = formData.get("content") as string;
	const author = formData.get("author") as string;
	const author_role = formData.get("author_role") as string;
	const category = formData.get("category") as string;
	const cover_image_url = formData.get("cover_image_url") as string;
	const published = formData.get("published") === "true";
	const tagsRaw = formData.get("tags") as string;
	const tags = tagsRaw
		? tagsRaw
				.split(",")
				.map((t) => t.trim())
				.filter(Boolean)
		: [];

	const slug = slugify(title);
	const read_time = calcReadTime(content);

	const payload: PostInsert = {
		title,
		slug,
		excerpt: excerpt || null,
		content: content || null,
		author: author || "MerkMetryx Team",
		author_role: author_role || null,
		category: category || null,
		tags: tags.length ? tags : null,
		cover_image_url: cover_image_url || null,
		published,
		published_at: published ? new Date().toISOString() : null,
		read_time,
	};

	const { error } = await supabaseAdmin.from("posts").insert([payload]);
	if (error) throw new Error(error.message);

	revalidatePath("/blog");
	revalidatePath("/admin");
	redirect("/admin");
}

export async function updatePost(id: string, formData: FormData) {
	await requireAdmin();

	const title = formData.get("title") as string;
	const excerpt = formData.get("excerpt") as string;
	const content = formData.get("content") as string;
	const author = formData.get("author") as string;
	const author_role = formData.get("author_role") as string;
	const category = formData.get("category") as string;
	const cover_image_url = formData.get("cover_image_url") as string;
	const published = formData.get("published") === "true";
	const tagsRaw = formData.get("tags") as string;
	const tags = tagsRaw
		? tagsRaw
				.split(",")
				.map((t) => t.trim())
				.filter(Boolean)
		: [];
	const read_time = calcReadTime(content);

	const payload = {
		title,
		excerpt: excerpt || null,
		content: content || null,
		author: author || "MerkMetryx Team",
		author_role: author_role || null,
		category: category || null,
		tags: tags.length ? tags : null,
		cover_image_url: cover_image_url || null,
		published,
		published_at: published ? new Date().toISOString() : null,
		read_time,
	};

	const { error } = await supabaseAdmin
		.from("posts")
		.update(payload)
		.eq("id", id);
	if (error) throw new Error(error.message);

	revalidatePath("/blog");
	revalidatePath("/admin");
	redirect("/admin");
}

export async function deletePost(id: string) {
	await requireAdmin();

	const { error } = await supabaseAdmin.from("posts").delete().eq("id", id);
	if (error) throw new Error(error.message);

	revalidatePath("/blog");
	revalidatePath("/admin");
}

export async function togglePublish(id: string, currentState: boolean) {
	await requireAdmin();

	const { error } = await supabaseAdmin
		.from("posts")
		.update({
			published: !currentState,
			published_at: !currentState ? new Date().toISOString() : null,
		})
		.eq("id", id);
	if (error) throw new Error(error.message);

	revalidatePath("/blog");
	revalidatePath("/admin");
}
