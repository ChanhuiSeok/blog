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

export const CATEGORIES: Record<
  Category,
  { label: string; icon: string; color: string; bgColor: string }
> = {
  tech: {
    label: "Tech",
    icon: "💻",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/50",
  },
  daily: {
    label: "Daily",
    icon: "📔",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-950/50",
  },
  devlog: {
    label: "DevLog",
    icon: "🛠️",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/50",
  },
};
