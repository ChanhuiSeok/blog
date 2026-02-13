export type Category = "tech" | "daily" | "devlog";

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  category: Category;
  tags: string[];
  coverImage: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PostCreateInput {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category: Category;
  tags?: string[];
  coverImage?: string;
  published?: boolean;
}

export interface PostUpdateInput {
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  category?: Category;
  tags?: string[];
  coverImage?: string;
  published?: boolean;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export const CATEGORIES: Record<Category, { label: string; icon: string }> = {
  tech: { label: "Tech", icon: "💻" },
  daily: { label: "Daily", icon: "📔" },
  devlog: { label: "DevLog", icon: "🛠️" },
};
