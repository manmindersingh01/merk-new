"use server";

import { supabase } from "@/lib/supabase";

export type ContactResult = { success: true } | { success: false; error: string };

export async function submitContact(formData: FormData): Promise<ContactResult> {
	const name = (formData.get("name") as string).trim();
	const company = (formData.get("company") as string).trim();
	const email = (formData.get("email") as string).trim();
	const phone = (formData.get("phone") as string).trim();
	const service = (formData.get("service") as string).trim();
	const message = (formData.get("message") as string).trim();

	if (!name || !email) {
		return { success: false, error: "Name and email are required." };
	}

	const { error } = await supabase.from("leads").insert([
		{
			name,
			company: company || null,
			email,
			phone: phone || null,
			service: service || null,
			message: message || null,
		},
	]);

	if (error) return { success: false, error: error.message };
	return { success: true };
}
