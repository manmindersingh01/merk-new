"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ApplyFormProps {
	appliedFor?: string;
}

export function ApplyForm({ appliedFor = "General Application" }: ApplyFormProps) {
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const phone = formData.get("phone") as string;
		const file = formData.get("resume") as File;
		const role = (formData.get("applied_for") as string) || appliedFor;

		if (!file || file.size === 0) {
			toast.error("Please upload a resume");
			return;
		}

		if (file.type !== "application/pdf") {
			toast.error("Only PDF resumes are allowed");
			return;
		}

		try {
			setLoading(true);

			// cleaner file name
			const fileExt = file.name.split(".").pop();
			const filePath = `${Date.now()}.${fileExt}`;

			// upload resume
			const { error: uploadError } = await supabase.storage
				.from("resumes")
				.upload(filePath, file);

			if (uploadError) throw uploadError;

			// store application
			const basePayload = {
				full_name: name,
				email,
				phone,
				resume_path: filePath,
			};

			// Save the role where supported; gracefully fallback for older schemas.
			let { error: dbError } = await supabase.from("job_applications").insert({
				...basePayload,
				applied_for: role,
			});

			if (dbError && /applied_for|column/i.test(dbError.message)) {
				const retry = await supabase
					.from("job_applications")
					.insert(basePayload);
				dbError = retry.error;
			}

			if (dbError) throw dbError;

			toast.success("Application submitted successfully 🎉");

			// reset form
			formRef.current?.reset();

			// close modal
			setOpen(false);
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Apply</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-sm">
				<DialogHeader>
					<DialogTitle>Apply for {appliedFor}</DialogTitle>
				</DialogHeader>

				<form ref={formRef} onSubmit={handleSubmit}>
					<input type="hidden" name="applied_for" value={appliedFor} />

					<FieldGroup>
						<Field>
							<Label>Name</Label>
							<Input name="name" required />
						</Field>

						<Field>
							<Label>Email</Label>
							<Input name="email" type="email" required />
						</Field>

						<Field>
							<Label>Phone</Label>
							<Input name="phone" />
						</Field>

						<Field>
							<Label>Resume (PDF)</Label>
							<Input
								name="resume"
								type="file"
								accept="application/pdf"
								required
							/>
						</Field>
					</FieldGroup>

					<DialogFooter className="mt-4">
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>

						<Button type="submit" disabled={loading}>
							{loading ? "Submitting..." : "Submit"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
