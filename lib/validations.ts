import { z } from "zod";
import { CATEGORY_VALUES } from "@/types";

export const postCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
  category: z.enum(CATEGORY_VALUES),
  tags: z.array(z.string()).optional(),
  coverImage: z.string().optional(),
  published: z.boolean().optional(),
});

export const postUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  excerpt: z.string().optional(),
  category: z.enum(CATEGORY_VALUES).optional(),
  tags: z.array(z.string()).optional(),
  coverImage: z.string().optional(),
  published: z.boolean().optional(),
});
