export interface CaseStudy {
	id: string;
	title: string;
	slug: string;
	excerpt: string | null;
	content: string | null;
	client: string | null;
	industry: string | null;
	results: string | null;
	cover_image_url: string | null;
	published: boolean;
	published_at: string | null;
	created_at: string;
	updated_at: string;
}

export type CaseStudyInsert = Omit<CaseStudy, "id" | "created_at" | "updated_at">;
export type CaseStudyUpdate = Partial<CaseStudyInsert>;
