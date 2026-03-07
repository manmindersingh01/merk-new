"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";

export async function deleteApplicant(id: string) {
	await supabaseAdmin.from("job_applications").delete().eq("id", id);
}
