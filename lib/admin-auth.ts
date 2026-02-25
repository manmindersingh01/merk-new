import { cookies } from "next/headers";

/**
 * Call at the top of every admin server action.
 * Throws if the request doesn't carry a valid admin session cookie,
 * so mutations are rejected even if middleware is somehow bypassed.
 */
export async function requireAdmin(): Promise<void> {
	const cookieStore = await cookies();
	const session = cookieStore.get("admin-session");
	if (!session || session.value !== "authenticated") {
		throw new Error("Unauthorized.");
	}
}
