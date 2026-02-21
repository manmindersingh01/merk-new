export interface Post {
	id: string;
	title: string;
	slug: string;
	excerpt: string | null;
	content: string | null;
	author: string;
	author_role: string | null;
	category: string | null;
	tags: string[] | null;
	cover_image_url: string | null;
	published: boolean;
	published_at: string | null;
	read_time: number;
	created_at: string;
	updated_at: string;
}

export type PostInsert = Omit<Post, "id" | "created_at" | "updated_at">;
export type PostUpdate = Partial<PostInsert>;
