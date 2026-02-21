"use client";

import { useState, useTransition } from "react";
import { loginAction } from "@/app/admin/login/actions";
import { Button } from "@/components/ui/button";
import { Lock, Loader2 } from "lucide-react";

export function LoginForm() {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);
		const formData = new FormData(e.currentTarget);
		startTransition(async () => {
			try {
				await loginAction(formData);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Something went wrong.");
			}
		});
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm"
		>
			{error && (
				<div className="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
					{error}
				</div>
			)}
			<div className="mb-5">
				<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
					Password
				</label>
				<input
					name="password"
					type="password"
					required
					autoFocus
					placeholder="Enter admin password"
					className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
				/>
			</div>
			<Button type="submit" disabled={isPending} className="w-full rounded-xl">
				{isPending ? (
					<>
						<Loader2 className="mr-2 size-4 animate-spin" />
						Signing in…
					</>
				) : (
					<>
						<Lock className="mr-2 size-4" />
						Sign In
					</>
				)}
			</Button>
		</form>
	);
}
