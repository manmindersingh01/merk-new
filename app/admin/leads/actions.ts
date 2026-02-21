"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function deleteLead(id: string) {
	const { error } = await supabase.from("leads").delete().eq("id", id);
	if (error) throw new Error(error.message);
	revalidatePath("/admin/leads");
}
