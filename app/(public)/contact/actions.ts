"use server";

import { supabaseAdmin as supabase } from "@/lib/supabase-admin";
import { headers } from "next/headers";

export type ContactResult = { success: true } | { success: false; error: string };

async function getLocationFromIp(ip: string): Promise<string | null> {
	if (!ip || ip === "127.0.0.1" || ip === "::1" || ip === "unknown") {
		return null;
	}
	try {
		const res = await fetch(`https://ipapi.co/${ip}/json/`, {
			next: { revalidate: 0 },
			headers: { "User-Agent": "MerkMetryx/1.0" },
		});
		if (!res.ok) return null;
		const data = await res.json();
		if (data.error) return null;
		const parts = [data.city, data.country_name].filter(Boolean);
		return parts.length > 0 ? parts.join(", ") : null;
	} catch {
		return null;
	}
}

export async function submitContact(formData: FormData): Promise<ContactResult> {
	const name = (formData.get("name") as string).trim();
	const company = ((formData.get("company") as string) || "").trim();
	const email = (formData.get("email") as string).trim();
	const phone = ((formData.get("phone") as string) || "").trim();
	const service = ((formData.get("service") as string) || "").trim();
	const message = ((formData.get("message") as string) || "").trim();
	const locationInput = ((formData.get("location") as string) || "").trim();
	const plan = ((formData.get("plan") as string) || "").trim();
	const source = ((formData.get("source") as string) || "").trim();

	if (!name || !email) {
		return { success: false, error: "Name and email are required." };
	}

	// Get client IP from request headers
	const headersList = await headers();
	const forwardedFor = headersList.get("x-forwarded-for");
	const ip =
		forwardedFor?.split(",")[0]?.trim() ||
		headersList.get("x-real-ip") ||
		"";

	// Always resolve IP-based location (used for auto-fill or verification)
	const ipLocation = await getLocationFromIp(ip);

	// If user provided a location, store it as-is and keep ip_location for
	// cross-verification. If not, fall back to IP-detected location.
	const location = locationInput || ipLocation || null;
	const locationSource = locationInput ? "user" : ipLocation ? "ip" : null;

	const { error } = await supabase.from("leads").insert([
		{
			name,
			company: company || null,
			email,
			phone: phone || null,
			service: service || null,
			message: message || null,
			location,
			location_source: locationSource,
			ip_location: ipLocation,
			plan: plan || null,
			source: source || null,
		},
	]);

	if (error) return { success: false, error: error.message };
	return { success: true };
}
