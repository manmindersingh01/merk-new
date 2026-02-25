"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { requireAdmin } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";

export async function deleteLead(id: string) {
	await requireAdmin();

	const { error } = await supabaseAdmin.from("leads").delete().eq("id", id);
	if (error) throw new Error(error.message);
	revalidatePath("/admin/leads");
}
