import { LoginForm } from "@/components/admin/login-form";

export default function LoginPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background px-4">
			<div className="w-full max-w-sm">
				<div className="mb-8 text-center">
					<h1 className="text-2xl font-extrabold tracking-tight">
						<span className="text-primary">Merk</span>
						<span className="text-foreground">Metryx</span>
					</h1>
					<p className="mt-1.5 text-sm text-muted-foreground">
						Admin access — authorised personnel only
					</p>
				</div>
				<LoginForm />
			</div>
		</div>
	);
}
