import { createClient } from "@supabase/supabase-js";

/**
 * SERVER-ONLY Supabase client using the service role key.
 * This bypasses Row Level Security and should NEVER be imported
 * in client components ("use client" files).
 *
 * Use this in:
 *  - Server actions (app/admin/*, app/(public)/contact/actions.ts)
 *  - Server components (app/admin/* pages)
 *
 * The anon-key client in lib/supabase.ts is only for client-side
 * Supabase Storage uploads in the post/case-study forms.
 */
export const supabaseAdmin = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ROLE_KEY!,
	{
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
	}
);
