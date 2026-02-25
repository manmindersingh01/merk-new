"use server";

import { supabase } from "@/lib/supabase";

export async function trackPageView(path: string, referrer: string | null) {
	await supabase.from("page_views").insert([
		{
			path,
			referrer: referrer || null,
		},
	]);
}
