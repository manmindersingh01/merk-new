"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
	const password = formData.get("password") as string;
	const adminPassword = process.env.ADMIN_PASSWORD;

	if (!adminPassword || password !== adminPassword) {
		throw new Error("Incorrect password.");
	}

	const cookieStore = await cookies();
	cookieStore.set("admin-session", "authenticated", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 60 * 60 * 24 * 7, // 7 days
		path: "/",
	});

	redirect("/admin");
}

export async function logoutAction() {
	const cookieStore = await cookies();
	cookieStore.delete("admin-session");
	redirect("/admin/login");
}
