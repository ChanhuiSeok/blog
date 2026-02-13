export const CATEGORY_VALUES = ["tech", "daily", "devlog"] as const;
export type Category = (typeof CATEGORY_VALUES)[number];

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

export interface UploadResponse extends ApiResponse<{ url: string }> {}
export interface PreviewResponse extends ApiResponse<{ html: string }> {}

export const CATEGORIES: Record<
  Category,
  { label: string; icon: string; color: string }
> = {
  tech: {
    label: "Tech",
    icon: "💻",
    color: "text-indigo-600 dark:text-blue-400",
  },
  daily: {
    label: "Daily",
    icon: "📔",
    color: "text-amber-600 dark:text-amber-400",
  },
  devlog: {
    label: "DevLog",
    icon: "🛠️",
    color: "text-emerald-600 dark:text-emerald-400",
  },
};
